import { TerminalBadge } from "@/components/terminal-badge"

const rules = [
  { k: "Tech stack", v: "No restrictions" },
  { k: "Pre-built code", v: "Not allowed" },
  { k: "AI tools", v: "Allowed*" },
  { k: "Your IP", v: "100% yours" },
  { k: "Team size", v: "1–3 members" },
  { k: "Solo allowed", v: "Yes" },
]

export function ThemeSection() {
  return (
    <section id="theme" style={{ background: "var(--void-2)", padding: "90px 0" }}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <TerminalBadge label="how_it_works.exe" />
          <h2 className="text-[30px] font-bold mt-4 mb-4 text-white leading-tight">The problem drops on kickoff day</h2>
          <p className="text-[15px] leading-relaxed mb-2.5" style={{ color: "var(--ice-dim)" }}>
            You won&apos;t know the exact challenge until the hackathon starts on 18 July — that&apos;s by design. The
            three webinars beforehand aren&apos;t filler, they&apos;re preparation for whatever it turns out to be.
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ice-dim)" }}>
            Show up, learn the toolkit, then find out what you&apos;re building. No pressure to know the answer in
            advance — just come ready to move fast once you do.
          </p>
        </div>
        <div className="rounded-[6px] p-[30px]" style={{ background: "var(--panel)", border: "1px solid var(--line)" }}>
          <h4
            className="text-[11px] uppercase tracking-wider mb-[18px]"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--cyan)" }}
          >
            Quick Rules
          </h4>
          {rules.map((r) => (
            <div
              key={r.k}
              className="flex justify-between items-center py-3 text-[13.5px]"
              style={{ borderBottom: "1px solid var(--line-soft)" }}
            >
              <span style={{ color: "var(--ice-dim)" }}>{r.k}</span>
              <span className="font-semibold text-right text-white">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
