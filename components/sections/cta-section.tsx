import Link from "next/link"
import { TerminalBadge } from "@/components/terminal-badge"

export function CtaSection() {
  return (
    <section
      className="text-center relative"
      style={{
        padding: "110px 0 100px",
        background: "radial-gradient(ellipse 700px 400px at 50% 100%, rgba(61,75,255,0.28), transparent 65%)",
      }}
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
        <TerminalBadge label="get_started.exe" />
        <h2
          className="mt-5 mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "clamp(20px, 4vw, 30px)",
            color: "#fff",
            textShadow: "3px 3px 0 var(--elec-2)",
          }}
        >
          READY TO<br />BUILD?
        </h2>
        <p className="text-[15px] max-w-[480px] mx-auto mb-[34px] leading-relaxed" style={{ color: "var(--ice-dim)" }}>
          Join IEEE NED Student Branch for a 4-day journey from your first commit to your first submission. Spaces are limited.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-[3px] text-white transition-all duration-100"
          style={{ background: "var(--elec)", boxShadow: "3px 3px 0 var(--cyan)" }}
        >
          Register Your Team
        </Link>
      </div>
    </section>
  )
}
