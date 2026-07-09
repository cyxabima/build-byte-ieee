interface Stat {
  num: string
  label: string
}

interface StatStripProps {
  stats: Stat[]
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <div
      className="grid max-w-[760px] mx-auto border overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        borderColor: "var(--line)",
        borderRadius: 4,
        background: "rgba(13,15,36,0.5)",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="text-center px-3 py-5 last:border-r-0"
          style={{ borderRight: "1px solid var(--line)" }}
        >
          <span
            className="block mb-2"
            style={{ fontFamily: "var(--font-press-start)", fontSize: 19, color: "var(--cyan)" }}
          >
            {s.num}
          </span>
          <span
            className="block text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-jetbrains)", color: "var(--ice-dimmer)" }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}
