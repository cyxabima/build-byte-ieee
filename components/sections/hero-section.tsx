import Link from "next/link"
import { TerminalBadge } from "@/components/terminal-badge"
import { GlitchText } from "@/components/glitch-text"
import { StatStrip } from "@/components/stat-strip"

const sparkles = [
  { label: "✦", className: "top-[120px] left-[6%] text-xl", delay: "0s", color: "var(--cyan)" },
  { label: "✧", className: "top-[210px] right-[9%] text-sm", delay: "0.6s", color: "var(--magenta)" },
  { label: "✦", className: "top-[340px] left-[13%] text-[10px]", delay: "1.2s", color: "var(--cyan)" },
  { label: "✧", className: "top-[150px] right-[20%] text-[10px]", delay: "1.8s", color: "var(--cyan)" },
]

const stats = [
  { num: "4", label: "Days total" },
  { num: "1–3", label: "Per team" },
  { num: "24h", label: "Build sprint" },
  { num: "0", label: "Exp. required" },
]

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 900px 500px at 15% -10%, rgba(61,75,255,0.35), transparent 60%), radial-gradient(ellipse 600px 400px at 90% 10%, rgba(111,227,255,0.12), transparent 60%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(111,227,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(111,227,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      {sparkles.map((s) => (
        <span
          key={s.label + s.delay}
          aria-hidden
          className={`absolute pointer-events-none ${s.className} hidden sm:block`}
          style={{
            fontFamily: "var(--font-press-start)",
            color: s.color,
            opacity: 0.55,
            animation: "twinkle 2.6s ease-in-out infinite",
            animationDelay: s.delay,
          }}
        >
          {s.label}
        </span>
      ))}

      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 relative z-[2] text-center pb-[70px] pt-14">
        <TerminalBadge label="IEEE_NED_STUDENT_BRANCH.exe presents" />

        <h1
          className="mt-[34px] mb-5"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "clamp(30px, 7vw, 56px)",
            lineHeight: 1.15,
            color: "#fff",
            textShadow: "3px 3px 0 var(--elec-2), -1px 0 var(--magenta)",
          }}
        >
          <GlitchText>BuildByte</GlitchText>
        </h1>

        <p className="text-[17px] max-w-[560px] mx-auto mb-2 leading-relaxed" style={{ color: "var(--ice-dim)" }}>
          A 3-day webinar bootcamp that turns beginners into confident first-time hackathon builders — then puts it to
          the test in one 24-hour build.
        </p>

        <p className="mb-[34px] tracking-wide text-sm" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--elec)" }}>
          15–18 JULY · <b style={{ color: "var(--cyan)", fontWeight: 600 }}>3 WEBINARS + 1 HACKATHON</b> · ZERO TO SHIPPED
        </p>

        <div className="flex gap-3.5 justify-center mb-14 flex-wrap">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-[22px] py-[11px] text-sm font-semibold rounded-[3px] text-white transition-all duration-100"
            style={{ background: "var(--elec)", boxShadow: "3px 3px 0 var(--cyan)" }}
          >
            Register Now
          </Link>
          <a
            href="#lineup"
            className="inline-flex items-center gap-2 px-[22px] py-[11px] text-sm font-semibold rounded-[3px] transition-all duration-100"
            style={{ background: "transparent", color: "var(--ice)", border: "2px solid var(--line)" }}
          >
            See the Lineup
          </a>
        </div>

        <StatStrip stats={stats} />
      </div>
    </section>
  )
}
