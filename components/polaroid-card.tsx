interface PolaroidCardProps {
  person: string
  revealAt: string
  style?: React.CSSProperties
}

export function PolaroidCard({ person, revealAt, style }: PolaroidCardProps) {
  return (
    <div
      className="group rounded-[3px] relative transition-all duration-250"
      style={{
        background: "var(--elec)",
        padding: "14px 14px 26px",
        boxShadow: "0 12px 28px rgba(0,0,0,0.5), 3px 3px 0 var(--cyan)",
        ...style,
      }}
    >
      <span
        className="absolute top-[-8px] left-1/2 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 30%, #ffe4a3, var(--gold) 70%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
        }}
      />
      <div
        className="aspect-square rounded-[2px] relative overflow-hidden flex items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(111,227,255,0.35), transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(255,197,66,0.28), transparent 55%), linear-gradient(155deg, #12142c 0%, #05050c 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(111,227,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(111,227,255,0.06) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            top: "-60%", left: "-20%", width: "60%", height: "220%",
            background: "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%)",
            animation: "sheen 3.2s ease-in-out infinite",
          }}
        />
        <span
          className="relative z-10"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: 38,
            color: "var(--cyan)",
            textShadow: "2px 2px 0 var(--elec-2)",
            animation: "qfloat 2.4s ease-in-out infinite",
          }}
        >
          ?
        </span>
      </div>
      <div className="pt-3.5 text-center">
        <div className="font-semibold text-sm" style={{ fontFamily: "var(--font-sans)", color: "#fff" }}>{person}</div>
        <div
          className="text-[10px] uppercase tracking-wider mt-1"
          style={{ fontFamily: "var(--font-jetbrains)", color: "rgba(255,255,255,0.65)" }}
        >
          Revealed at <b style={{ color: "var(--cyan)" }}>{revealAt}</b>
        </div>
      </div>
    </div>
  )
}
