import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register Your Team",
  description: "Register your team for BuildByte — the 24-hour virtual hackathon by IEEE NED Student Branch. Solo participants welcome.",
  openGraph: {
    title: "Register for BuildByte | IEEE NED Hackathon",
    description: "Sign up for the 24-hour virtual hackathon. Teams of 1-4, all departments welcome, no experience needed.",
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
