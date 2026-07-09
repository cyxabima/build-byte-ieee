interface TerminalBadgeProps {
  label: string
}

export function TerminalBadge({ label }: TerminalBadgeProps) {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs tracking-wider" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--ice-dimmer)" }}>
      &gt; {label}
      <span
          className="inline-block w-[7px] h-[14px] align-middle"
        style={{ background: "var(--cyan)", animation: "blink 1s steps(1) infinite" }}
      />
    </span>
  )
}
