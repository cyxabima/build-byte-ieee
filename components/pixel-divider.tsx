import { cn } from "@/lib/utils"

export function PixelDivider({ flip, className }: { flip?: boolean; className?: string }) {
  return (
    <div
      className={cn("h-3.5 w-full", className)}
      style={{
        backgroundImage: `
          linear-gradient(90deg, var(--elec) 0 12px, transparent 12px 24px),
          linear-gradient(90deg, transparent 0 6px, var(--cyan) 6px 18px, transparent 18px 24px)
        `,
        backgroundSize: "24px 7px, 24px 7px",
        backgroundPosition: "0 0, 12px 7px",
        backgroundRepeat: "repeat-x",
        backgroundAttachment: "scroll",
        imageRendering: "pixelated",
        transform: flip ? "scaleX(-1)" : "none",
      }}
    />
  )
}
