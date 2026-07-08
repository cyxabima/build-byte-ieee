"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
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
  registeredAt: string
}[]> {
  await connectDB()
  const registrations = await Registration.find().sort({ registeredAt: -1 }).lean()
  return registrations.map((reg: Record<string, unknown>) => ({
    _id: String(reg._id),
    teamName: (reg.teamName as string) ?? "",
    teamSize: reg.teamSize as number,
    participants: (reg.participants as Array<Record<string, unknown>>).map((p) => {
      return { name: p.name as string, email: p.email as string, department: p.department as string, rollNumber: p.rollNumber as string, phone: p.phone as string }
    }),
    registeredAt: reg.registeredAt instanceof Date ? reg.registeredAt.toISOString() : String(reg.registeredAt),
  }))
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
