import { TerminalBadge } from "@/components/terminal-badge"

const lineup = [
  {
    badge: "D1", day: "15 July · Webinar", title: "Git & GitHub Fundamentals",
    desc: "Version control, collaboration workflows, and open-source basics the toolkit every team needs before day one.",
  },
  {
    badge: "D2", day: "16 July · Webinar", title: "Choosing Your Tech Stack",
    desc: "AI tools, open-source resources, and picking the stack that gets your idea shipped in 24 hours, not 24 days.",
  },
  {
    badge: "D3", day: "17 July · Webinar", title: "From Idea to MVP",
    desc: "Ideation, feature planning, team roles and how to scope something you can actually finish.",
  },
  {
    badge: "GO", day: "18 July · Hackathon", title: "The 24-Hour Build",
    desc: "Everything from the last 3 days, put to use. Submit, get judged, get recognized all in one day.",
    finale: true,
  },
]

export function LineupSection() {
  return (
    <section id="lineup" className="relative" style={{ padding: "100px 0 110px" }}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-[600px] mx-auto mb-5">
          <TerminalBadge label="the_path.exe" />
          <h2 className="text-[34px] font-bold mt-4 mb-3 text-white">3 webinars. 1 hackathon.</h2>
          <p className="text-[15.5px]" style={{ color: "var(--ice-dim)" }}>
            Never touched Git? Never shipped anything? Perfect. Three short sessions build the skills and drop the
            hints you&apos;ll need for the 24-hour build.
          </p>
        </div>
        <p
          className="text-center mb-16 text-sm"
          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--ice-dimmer)" }}
        >
          Bootcamp <span style={{ color: "var(--cyan)" }}>15–17 July</span> &nbsp;·&nbsp; Hackathon{" "}
          <span style={{ color: "var(--cyan)" }}>18 July</span> &nbsp;·&nbsp; Duration:   <span style={{ color: "var(--cyan)" }}>1 hr per webinar</span>
        </p>

        <div className="relative max-w-[920px] mx-auto">
          <div
            className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-[2px] z-0"
            style={{ background: "linear-gradient(90deg, var(--elec), var(--magenta))" }}
          />
          <div className="grid md:grid-cols-4 gap-4 relative z-[1]">
            {lineup.map((item) => (
              <div
                key={item.badge}
                className="rounded-[6px] text-left relative transition-all duration-180"
                style={{
                  padding: "24px 18px 22px",
                  background: item.finale
                    ? "linear-gradient(160deg, rgba(61,75,255,0.22), rgba(255,62,165,0.08) 90%), var(--panel)"
                    : "var(--panel)",
                  border: item.finale ? "2px solid var(--elec)" : "1px solid var(--line)",
                  boxShadow: item.finale
                    ? "0 0 0 1px rgba(111,227,255,0.15), 6px 6px 0 rgba(61,75,255,0.25)"
                    : "none",
                }}
              >
                <div
                  className="w-[38px] h-[38px] rounded-[4px] flex items-center justify-center mb-4 text-xs text-white"
                  style={{
                    fontFamily: "var(--font-press-start)",
                    background: item.finale ? "var(--elec)" : "var(--void)",
                    border: item.finale ? "2px solid var(--cyan)" : "2px solid var(--elec)",
                  }}
                >
                  {item.badge}
                </div>
                <div
                  className="text-[11px] uppercase tracking-wider mb-1.5"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: item.finale ? "var(--magenta)" : "var(--cyan)",
                  }}
                >
                  {item.day}
                </div>
                <h3 className="text-base text-white mb-2 leading-tight" style={{ minHeight: 42 }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ice-dim)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
