import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"
import { TerminalBadge } from "@/components/terminal-badge"
import { PixelDivider } from "@/components/pixel-divider"

export default function SubmissionsClosedPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-24">
        <div className="mx-auto max-w-lg text-center space-y-8">
          <div className="flex justify-center">
            <TerminalBadge label="SUBMISSIONS · CLOSED" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <GlitchText>Submissions Closed</GlitchText>
          </h1>

          <PixelDivider className="max-w-xs mx-auto" />

          <p className="text-lg text-muted-foreground leading-relaxed">
            The submission window for BuildByte has ended. If you have any
            questions or concerns, please reach out to the organizers.
          </p>

          <div
            className="inline-block rounded-lg border px-6 py-4 text-sm max-w-sm mx-auto"
            style={{ borderColor: "color-mix(in srgb, var(--magenta) 30%, transparent)", background: "color-mix(in srgb, var(--magenta) 8%, transparent)" }}
          >
            <p className="text-muted-foreground">
              Need help? Contact us at{" "}
              <a href="mailto:ieee@neduet.edu.pk" className="text-primary hover:underline" style={{ color: "var(--cyan)" }}>
                ieee@neduet.edu.pk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
