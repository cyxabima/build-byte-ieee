import Link from "next/link"
import Image from "next/image"

export function NavBar() {
  return (
    <nav
      className="sticky top-0 z-40 border-b"
      style={{ background: "rgba(5,5,12,0.72)", backdropFilter: "blur(14px)", borderColor: "var(--line-soft)" }}
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-3 font-bold text-lg tracking-wide">
          <Image src="/logo.jpg" alt="IEEE NED SB" width={36} height={36} className="rounded-sm" />
          Build<span style={{ color: "var(--cyan)" }}>Byte</span>
          <span
            className="inline-block w-[6px] h-[6px] ml-[6px]"
            style={{ background: "var(--cyan)", animation: "blink 1.4s steps(1) infinite" }}
          />
        </div>
        {/* <div className="hidden md:flex items-center gap-[34px]"> */}
        {/*   <a href="#lineup" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>The Lineup</a> */}
        {/*   <a href="#theme" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>Theme</a> */}
        {/*   <a href="#perks" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>Why Join</a> */}
        {/*   <a href="#judging" className="text-sm transition-colors" style={{ color: "var(--ice-dim)" }}>Judging</a> */}
        {/* </div> */}
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
  )
}
