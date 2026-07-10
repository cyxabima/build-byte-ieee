import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submit Your Repo – BuildByte",
  robots: { index: false },
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children
}
