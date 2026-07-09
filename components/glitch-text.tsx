interface GlitchTextProps {
  children: string
}

export function GlitchText({ children }: GlitchTextProps) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          color: "var(--cyan)",
          opacity: 0.7,
          animation: "glitch1 4.5s infinite linear",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          color: "var(--magenta)",
          opacity: 0.5,
          animation: "glitch2 5.5s infinite linear",
        }}
      >
        {children}
      </span>
    </span>
  )
}
