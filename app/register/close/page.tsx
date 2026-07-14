import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"
import { TerminalBadge } from "@/components/terminal-badge"
import { PixelDivider } from "@/components/pixel-divider"

export default function RegistrationClosedPage() {
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
            <TerminalBadge label="REGISTRATION · CLOSED" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <GlitchText>Registration Closed</GlitchText>
          </h1>

          <PixelDivider className="max-w-xs mx-auto" />

          <p className="text-lg text-muted-foreground leading-relaxed">
            Registration for BuildByte has closed. Thank you to everyone who
            signed up. We look forward to seeing you at the event.
          </p>

          <div
            className="inline-block rounded-lg border px-6 py-4 text-sm max-w-sm mx-auto"
            style={{ borderColor: "color-mix(in srgb, var(--magenta) 30%, transparent)", background: "color-mix(in srgb, var(--magenta) 8%, transparent)" }}
          >
            <p className="text-muted-foreground">
              Questions? Contact{" "}
              Need help? Contact us at{" "}
              <a href="mailto:ieeesbneduet@gmail.com" className="text-primary hover:underline" style={{ color: "var(--cyan)" }}>
                ieeesbneduet@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
