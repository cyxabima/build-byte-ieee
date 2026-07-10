import { Monitor, Globe, Trophy, Star, Users, Lightbulb } from "lucide-react"
import { TerminalBadge } from "@/components/terminal-badge"

const perks = [
  { icon: Monitor, title: "24-Hour Virtual Hackathon", desc: "Join from anywhere. All you need is a laptop and an idea." },
  { icon: Globe, title: "Open to All Departments", desc: "CS, Engineering, Finance — everyone's welcome to build." },
  { icon: Trophy, title: "Official IEEE Recognition", desc: "Certificates of participation, and runner-up & winner honors." },
  { icon: Star, title: "Real Project Experience", desc: "A shot at working on an official IEEE NEDUET project after.", featured: true, badge: "★ The Big One" },
  { icon: Users, title: "Teams of 1–3", desc: "Go solo or squad up — registration adapts to your group size." },
  { icon: Lightbulb, title: "Beginner Friendly", desc: "No prior hackathon experience needed. The webinars cover it." },
]

export function PerksSection() {
  return (
    <section id="perks" style={{ padding: "100px 0" }}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-[600px] mx-auto">
          <TerminalBadge label="perks.exe" />
          <h2 className="text-[34px] font-bold mt-4 mb-3 text-white">Why join BuildByte?</h2>
          <p className="text-[15.5px]" style={{ color: "var(--ice-dim)" }}>
            Here&apos;s all you can expect and will need to show up, learn fast, and ship something real.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-[6px] p-6 relative overflow-hidden transition-colors duration-150"
              style={{
                background: perk.featured
                  ? "linear-gradient(160deg, rgba(255,197,66,0.14), rgba(13,15,36,1) 75%)"
                  : "var(--panel)",
                border: perk.featured ? "2px solid var(--gold)" : "1px solid var(--line)",
                boxShadow: perk.featured ? "0 0 0 1px rgba(255,197,66,0.15), 6px 6px 0 rgba(255,197,66,0.18)" : "none",
              }}
            >
              {perk.featured && (
                <span
                  className="absolute top-0 right-0 text-[9.5px] font-bold px-2.5 py-[5px]"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "#1a1200",
                    background: "linear-gradient(100deg, var(--gold), #ffe4a3)",
                    borderRadius: "0 5px 0 6px",
                  }}
                >
                  {perk.badge}
                </span>
              )}
              <div
                className="w-10 h-10 rounded-[4px] flex items-center justify-center mb-4"
                style={{
                  background: perk.featured ? "rgba(255,197,66,0.16)" : "rgba(61,75,255,0.12)",
                  border: perk.featured ? "1px solid rgba(255,197,66,0.45)" : "1px solid rgba(111,227,255,0.25)",
                }}
              >
                <perk.icon className="w-5 h-5" style={{ stroke: perk.featured ? "var(--gold)" : "var(--cyan)" }} />
              </div>
              <h3 className="text-[15px] mb-2" style={{ color: perk.featured ? "#ffe4a3" : "#fff" }}>
                {perk.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--ice-dim)" }}>{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
