import Link from "next/link"
import { Monitor, Globe, Trophy, Star, Users, Lightbulb } from "lucide-react"
import { PixelDivider } from "@/components/pixel-divider"
import { TerminalBadge } from "@/components/terminal-badge"
import { GlitchText } from "@/components/glitch-text"
import { StatStrip } from "@/components/stat-strip"
import { PolaroidCard } from "@/components/polaroid-card"
import { JudgingBar } from "@/components/judging-bar"

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

const lineup = [
  {
    badge: "D1", day: "15 July · Webinar", title: "Git & GitHub Fundamentals",
    desc: "Version control, collaboration workflows, and open-source basics — the toolkit every team needs before day one.",
  },
  {
    badge: "D2", day: "16 July · Webinar", title: "Choosing Your Tech Stack",
    desc: "AI tools, open-source resources, and picking the stack that gets your idea shipped in 24 hours, not 24 days.",
  },
  {
    badge: "D3", day: "17 July · Webinar", title: "From Idea to MVP",
    desc: "Ideation, feature planning, team roles — and how to scope something you can actually finish.",
  },
  {
    badge: "GO", day: "18 July · Hackathon", title: "The 24-Hour Build",
    desc: "Everything from the last 3 days, put to use. Submit, get judged, get recognized — all in one day.",
    finale: true,
  },
]

const perks = [
  { icon: Monitor, title: "24-Hour Virtual Hackathon", desc: "Join from anywhere. All you need is a laptop and an idea." },
  { icon: Globe, title: "Open to All Departments", desc: "CS, Engineering, Business — everyone's welcome to build." },
  { icon: Trophy, title: "Official IEEE Recognition", desc: "Certificates of participation, and runner-up & winner honors." },
  { icon: Star, title: "Real Project Experience", desc: "A shot at working on an official IEEE NEDUET project after.", featured: true, badge: "★ The Big One" },
  { icon: Users, title: "Teams of 1–3", desc: "Go solo or squad up — registration adapts to your group size." },
  { icon: Lightbulb, title: "Beginner Friendly", desc: "No prior hackathon experience needed. The webinars cover it." },
]

const rules = [
  { k: "Tech stack", v: "No restrictions" },
  { k: "Pre-built code", v: "Not allowed" },
  { k: "AI tools", v: "Allowed*" },
  { k: "Your IP", v: "100% yours" },
  { k: "Team size", v: "1–3 members" },
  { k: "Solo allowed", v: "Yes" },
]

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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(5,5,12,0.72)", backdropFilter: "blur(14px)", borderColor: "var(--line-soft)" }}
      >
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-0.5 font-bold text-lg tracking-wide">
            Build<span style={{ color: "var(--cyan)" }}>Byte</span>
            <span
              className="inline-block w-[6px] h-[6px] ml-[6px]"
              style={{ background: "var(--cyan)", animation: "blink 1.4s steps(1) infinite" }}
            />
          </div>
          <div className="hidden md:flex items-center gap-[34px]">
            <a href="#lineup" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>The Lineup</a>
            <a href="#theme" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>Theme</a>
            <a href="#perks" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>Why Join</a>
            <a href="#judging" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>Judging</a>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-4 py-[9px] text-sm font-semibold rounded-[3px] text-white transition-all active:translate-y-0"
            style={{
              background: "var(--elec)",
              boxShadow: "3px 3px 0 var(--cyan)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse 900px 500px at 15% -10%, rgba(61,75,255,0.35), transparent 60%), radial-gradient(ellipse 600px 400px at 90% 10%, rgba(111,227,255,0.12), transparent 60%)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(111,227,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(111,227,255,0.05) 1px, transparent 1px)",
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
              animation: `twinkle 2.6s ease-in-out infinite`,
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

          <p
            className="text-[17px] max-w-[560px] mx-auto mb-2 leading-relaxed"
            style={{ color: "var(--ice-dim)" }}
          >
            A 3-day webinar bootcamp that turns beginners into confident first-time hackathon builders — then puts it to the test in one 24-hour build.
          </p>

          <p
            className="mb-[34px] tracking-wide text-sm"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--elec)" }}
          >
            15–18 JULY · <b style={{ color: "var(--cyan)", fontWeight: 600 }}>3 WEBINARS + 1 HACKATHON</b> · ZERO TO SHIPPED
          </p>

          <div className="flex gap-3.5 justify-center mb-14 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-[22px] py-[11px] text-sm font-semibold rounded-[3px] text-white transition-all duration-100"
              style={{
                background: "var(--elec)",
                boxShadow: "3px 3px 0 var(--cyan)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Register Now
            </Link>
            <a
              href="#lineup"
              className="inline-flex items-center gap-2 px-[22px] py-[11px] text-sm font-semibold rounded-[3px] transition-all duration-100"
              style={{
                background: "transparent",
                color: "var(--ice)",
                border: "2px solid var(--line)",
                fontFamily: "var(--font-sans)",
              }}
            >
              See the Lineup
            </a>
          </div>

          <StatStrip stats={stats} />
        </div>
      </section>

      <PixelDivider />

      {/* Story */}
      <section style={{ background: "var(--void-2)" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-[90px]">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <TerminalBadge label="the_journey.exe" />
            <h2 className="text-[34px] font-bold mt-[18px] mb-3.5 text-white">You&apos;ll meet three people this week</h2>
            <p className="text-[15.5px] leading-relaxed" style={{ color: "var(--ice-dim)" }}>
              Their stories are different. But across three webinars, you&apos;ll start to notice what they have in common — one revealed at a time, one per session.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-7 max-w-[900px] mx-auto mb-10">
            <PolaroidCard person="Person 01" revealAt="Webinar 1" style={{ transform: "rotate(-4deg)" }} />
            <PolaroidCard person="Person 02" revealAt="Webinar 2" style={{ transform: "rotate(2deg)" }} />
            <PolaroidCard person="Person 03" revealAt="Webinar 3" style={{ transform: "rotate(-2deg)" }} />
          </div>

          <p
            className="text-center max-w-[600px] mx-auto text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--ice-dim)" }}
          >
            Each webinar hands you one story and one hint. By kickoff on <b style={{ color: "#fff", fontWeight: 600 }}>18 July</b>, you&apos;ll have all three — and the problem statement will finally make sense.
          </p>
        </div>
      </section>

      <PixelDivider flip />

      {/* Lineup */}
      <section id="lineup" className="relative" style={{ padding: "100px 0 110px" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[600px] mx-auto mb-5">
            <TerminalBadge label="the_path.exe" />
            <h2 className="text-[34px] font-bold mt-4 mb-3 text-white">3 webinars. 1 hackathon.</h2>
            <p className="text-[15.5px]" style={{ color: "var(--ice-dim)" }}>
              Never touched Git? Never shipped anything? Perfect. Three short sessions build the skills — and drop the hints — you&apos;ll need for the 24-hour build.
            </p>
          </div>
          <p
            className="text-center mb-16 text-sm"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--ice-dimmer)" }}
          >
            Bootcamp <span style={{ color: "var(--cyan)" }}>15–17 July</span> &nbsp;·&nbsp; Hackathon <span style={{ color: "var(--cyan)" }}>18 July</span> &nbsp;·&nbsp; 1 hr max per webinar
          </p>

          <div className="relative max-w-[920px] mx-auto">
            <div
              className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-[2px] z-0"
              style={{ background: "repeating-linear-gradient(90deg, var(--elec) 0 8px, transparent 8px 14px)" }}
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
                    boxShadow: item.finale ? "0 0 0 1px rgba(111,227,255,0.15), 6px 6px 0 rgba(61,75,255,0.25)" : "none",
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
                    style={{ fontFamily: "var(--font-jetbrains)", color: item.finale ? "var(--magenta)" : "var(--cyan)" }}
                  >
                    {item.day}
                  </div>
                  <h3 className="text-base text-white mb-2 leading-tight" style={{ minHeight: 42 }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ice-dim)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theme */}
      <section id="theme" style={{ background: "var(--void-2)", padding: "90px 0" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <TerminalBadge label="how_it_works.exe" />
            <h2 className="text-[30px] font-bold mt-4 mb-4 text-white leading-tight">The problem drops on kickoff day</h2>
            <p className="text-[15px] leading-relaxed mb-2.5" style={{ color: "var(--ice-dim)" }}>
              You won&apos;t know the exact challenge until the hackathon starts on 18 July — that&apos;s by design. The three webinars beforehand aren&apos;t filler, they&apos;re preparation for whatever it turns out to be.
            </p>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--ice-dim)" }}>
              Show up, learn the toolkit, then find out what you&apos;re building. No pressure to know the answer in advance — just come ready to move fast once you do.
            </p>
          </div>
          <div
            className="rounded-[6px] p-[30px]"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
          >
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

      <PixelDivider />

      {/* Perks */}
      <section id="perks" style={{ padding: "100px 0" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <TerminalBadge label="perks.exe" />
            <h2 className="text-[34px] font-bold mt-4 mb-3 text-white">Why join BuildByte?</h2>
            <p className="text-[15.5px]" style={{ color: "var(--ice-dim)" }}>
              Everything you need to show up, learn fast, and ship something real.
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

      {/* Judging */}
      <section id="judging" style={{ background: "var(--void-2)", padding: "90px 0" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          <div>
            <TerminalBadge label="how_youre_scored.exe" />
            <h2 className="text-[30px] font-bold mt-[18px] mb-6 text-white">Judging criteria</h2>
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

      {/* CTA */}
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
            style={{
              background: "var(--elec)",
              boxShadow: "3px 3px 0 var(--cyan)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Register Your Team
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-[36px] text-center text-xs border-t"
        style={{ fontFamily: "var(--font-jetbrains)", color: "var(--ice-dimmer)", borderColor: "var(--line-soft)" }}
      >
        IEEE NED Student Branch · BuildByte 2026
      </footer>
    </div>
  )
}
