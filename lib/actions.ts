"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { connectDB } from "./db"
import { Registration } from "./schemas"

export async function loginAdmin(_prev: { error: string } | null, formData: FormData) {
  const password = formData.get("password") as string

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  redirect("/admin")
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin")
}

export async function getRegistrations(): Promise<{
  _id: string
  teamName: string
  teamSize: number
  participants: { name: string; email: string; department: string; rollNumber: string; phone: string }[]
  repoUrl: string
  registeredAt: string
  submittedAt: string | null
  judgments: { judge: string; verdict: string }[]
}[]> {
  await connectDB()
  const registrations = await Registration.find().sort({ registeredAt: -1 }).lean()
  return registrations.map((reg: Record<string, unknown>) => ({
    _id: String(reg._id),
    teamName: (reg.teamName as string) ?? "",
    teamSize: reg.teamSize as number,
    participants: (reg.participants as unknown as Array<Record<string, unknown>>).map((p) => {
      return { name: p.name as string, email: p.email as string, department: p.department as string, rollNumber: p.rollNumber as string, phone: p.phone as string }
    }),
    repoUrl: (reg.repoUrl as string) ?? "",
    registeredAt: reg.registeredAt instanceof Date ? reg.registeredAt.toISOString() : String(reg.registeredAt),
    submittedAt: reg.submittedAt instanceof Date ? reg.submittedAt.toISOString() : null,
    judgments: ((reg.judgments as unknown as Array<Record<string, unknown>>) ?? []).map((j) => ({
      judge: String(j.judge ?? ""),
      verdict: String(j.verdict ?? ""),
    })),
  }))
}

export async function lookupTeamByEmail(email: string) {
  await connectDB()
  const reg = await Registration.findOne({ "participants.email": email }).lean()
  if (!reg) return null
  return {
    _id: String(reg._id),
    teamName: (reg.teamName as string) ?? "",
    participants: (reg.participants as unknown as Array<Record<string, unknown>>).map((p) => ({
      name: p.name as string,
      email: p.email as string,
    })),
    repoUrl: (reg.repoUrl as string) ?? "",
  }
}

export async function submitRepo(email: string, repoUrl: string) {
  await connectDB()
  await Registration.findOneAndUpdate(
    { "participants.email": email },
    { $set: { repoUrl, submittedAt: new Date() } },
  )
  revalidatePath("/admin")
  return { success: true }
}

export async function judgeTeam(id: string, judge: string, verdict: "great" | "okay" | "rejected") {
  await connectDB()
  const reg = await Registration.findById(id)
  if (!reg) return { error: "Team not found" }

  const existing = (reg.judgments as Array<{ judge: string; verdict: string }>).find((j) => j.judge === judge)
  if (existing) {
    existing.verdict = verdict
  } else if ((reg.judgments as unknown as unknown[]).length < 3) {
    ;(reg.judgments as unknown as Array<{ judge: string; verdict: string }>).push({ judge, verdict })
  } else {
    return { error: "Team already has 3 judgments" }
  }

  await reg.save()
  revalidatePath("/admin")
  return { success: true }
}

export async function removeJudgeFromTeam(id: string, judge: string) {
  await connectDB()
  await Registration.findOneAndUpdate(
    { _id: id },
    { $pull: { judgments: { judge } } },
  )
  revalidatePath("/admin")
  return { success: true }
}

export async function checkExistingEmails(emails: string[]) {
  await connectDB()
  const existing = await Registration.find(
    { "participants.email": { $in: emails } },
    { "participants.email": 1 },
  ).lean()
  return existing.flatMap((r: Record<string, unknown>) =>
    (r.participants as unknown as Array<Record<string, unknown>>).map((p) => p.email as string),
  )
}

export async function registerTeam(data: {
  teamName: string
  teamSize: number
  participants: {
    name: string
    email: string
    department: string
    rollNumber: string
    phone: string
  }[]
}) {
  await connectDB()

  const registration = await Registration.create(data)
  const record = registration.toObject()

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)
      console.log("hello")
      await resend.emails.send({
        from: "BuildByte <noreply@iee.buildbyte.ukashaanwerali.dev",
        to: data.participants.map((p) => p.email),
        subject: "BuildByte Registration Confirmed",
        html: `<h1>Registration Successful</h1><p>Your team <strong>${data.teamName || "Solo Participant"}</strong> has been registered for BuildByte.</p>`,
      })
    } catch (e) {
      console.error("Resend email failed:", e)
    }
  }
  return { success: true, id: String(record._id) }
}

export async function exportParticipantsCsv(): Promise<string> {
  await connectDB()
  const registrations = await Registration.find().lean()

  const rows = [["Name", "Phone", "Email", "Team Name"]]

  for (const reg of registrations) {
    const teamName = (reg.teamName as string) ?? ""
    const participants = reg.participants as unknown as Array<Record<string, unknown>>
    for (const p of participants) {
      const name = String(p.name ?? "")
      const phone = String(p.phone ?? "")
      const email = String(p.email ?? "")
      rows.push([name, phone, email, teamName])
    }
  }

  return rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n")
}
