interface JudgingBarProps {
  label: string
  percentage: number
}

export function JudgingBar({ label, percentage }: JudgingBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-semibold" style={{ color: "var(--ice)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-jetbrains)", color: "var(--cyan)" }}>{percentage}%</span>
      </div>
      <div
        className="h-2.5 overflow-hidden"
        style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 2 }}
      >
        <div
          className="h-full rounded-[2px]"
          style={{
            width: `${percentage}%`,
            background: "repeating-linear-gradient(90deg, var(--elec) 0 6px, var(--elec-2) 6px 10px)",
          }}
        />
      </div>
    </div>
  )
}
