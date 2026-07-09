import { TerminalBadge } from "@/components/terminal-badge"
import { PolaroidCard } from "@/components/polaroid-card"

export function StorySection() {
  return (
    <section style={{ background: "var(--void-2)" }}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-[90px]">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <TerminalBadge label="the_journey.exe" />
          <h2 className="text-[34px] font-bold mt-[18px] mb-3.5 text-white">
            You&apos;ll meet three people this week
          </h2>
          <p className="text-[15.5px] leading-relaxed" style={{ color: "var(--ice-dim)" }}>
            Their stories are different. But across three webinars, you&apos;ll start to notice what they have in
            common — one revealed at a time, one per session.
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
          Each webinar hands you one story and one hint. By kickoff on <b style={{ color: "#fff", fontWeight: 600 }}>18 July</b>,
          you&apos;ll have all three — and the problem statement will finally make sense.
        </p>
      </div>
    </section>
  )
}
