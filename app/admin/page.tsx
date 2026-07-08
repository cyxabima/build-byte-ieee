import { cookies } from "next/headers"
import { LoginForm } from "./login-form"
import { Dashboard } from "./dashboard"
import { getRegistrations } from "@/lib/actions"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (session?.value !== "true") {
    return <LoginForm />
  }

  const registrations = await getRegistrations()
  return <Dashboard registrations={registrations} />
}
