import { TerminalBadge } from "@/components/terminal-badge"
import { JudgingBar } from "@/components/judging-bar"

const criteria = [
  { label: "Innovation / Creativity", pct: 30 },
  { label: "Technical Execution", pct: 25 },
  { label: "Impact / Practicality", pct: 20 },
  { label: "Theme Alignment", pct: 15 },
  { label: "Teamwork", pct: 10 },
]

const deliverables = [
  "<b>GitHub repo</b> with your full codebase",
  "<b>Working prototype</b> — no video or demo required",
  "<b>Figma files</b> for your design work",
  "<b>A real README</b> — this is your team's pitch",
  "<b>24 hours</b> from kickoff, plus a grace window",
]

export function JudgingSection() {
  return (
    <section id="judging" style={{ background: "var(--void-2)", padding: "90px 0" }}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-stretch">
        <div>
          <div className="text-center">
            <TerminalBadge label="how_youre_scored.exe" />
            <h2 className="text-[30px] font-bold mt-[18px] mb-6 text-white">Judging criteria</h2>
          </div>
          <div className="flex flex-col gap-[18px]">
            {criteria.map((c) => (
              <JudgingBar key={c.label} label={c.label} percentage={c.pct} />
            ))}
          </div>
        </div>
        <div
          className="rounded-[6px] p-[30px]"
          style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
        >
          <h4
            className="text-[11px] uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--cyan)" }}
          >
            What to submit
          </h4>
          <ul className="list-none space-y-0">
            {deliverables.map((d) => (
              <li
                key={d}
                className="flex gap-2.5 items-start text-[13.5px] py-[9px]"
                style={{ color: "var(--ice-dim)", borderBottom: "1px solid var(--line-soft)" }}
              >
                <span
                  className="w-4 h-4 shrink-0 mt-0.5 rounded-[3px] flex items-center justify-center"
                  style={{ background: "var(--elec)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span dangerouslySetInnerHTML={{ __html: d }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
