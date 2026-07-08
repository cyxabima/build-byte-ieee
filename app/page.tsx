import Link from "next/link"
import { ArrowRight, Lightbulb, Rocket, Code, Target, Users, Monitor, Trophy, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Spotlight } from "@/components/ui/spotlight"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { FlipWords } from "@/components/ui/flip-words"
import { JourneySection } from "@/components/journey-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-lg font-bold tracking-tight">
            Build<span className="text-primary">Byte</span>
          </span>
          <div className="flex items-center gap-4">
            <Link href="/register">
              <Button size="sm" className="rounded-full">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
          <BackgroundBeams className="opacity-25" />
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 pt-20 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              IEEE NED Student Branch presents
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl leading-none">
              BuildByte
            </h1>

            <div className="mt-6 text-xl font-medium text-muted-foreground sm:text-2xl">
              <FlipWords words={["Innovate", "Build", "Commit", "Create", "Ship"]} /> &middot; 24h Hackathon
            </div>

            <p className="mt-6 text-base text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
              A virtual 24-hour hackathon designed to turn beginners into confident first-time participants.
              <span className="block mt-2 text-primary font-medium">Open to all departments. No experience needed.</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 text-base h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                  Register Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#journey">
                <Button variant="outline" size="lg" className="text-base h-12 px-8 rounded-full">Learn More</Button>
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
              {[
                { value: "24h", label: "Build Sprint" },
                { value: "1-4", label: "Per Team" },
                { value: "Virtual", label: "From Anywhere" },
              ].map((stat) => (
                <div key={stat.value}>
                  <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Journey */}
        <JourneySection />

        {/* Why Join */}
        <section className="border-t py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16 md:mb-20">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Zap className="h-3.5 w-3.5" />
                Perks
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Join BuildByte?</h2>
              <p className="mt-4 text-muted-foreground text-lg">Everything you need to participate and succeed.</p>
            </div>

            <BentoGrid>
              {[
                {
                  title: "24-Hour Virtual Hackathon",
                  description: "Participate from anywhere. All you need is a laptop and an idea.",
                  icon: <Monitor className="h-5 w-5" />,
                  header: (
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center h-32">
                      <span className="text-5xl font-bold text-primary/30">24h</span>
                    </div>
                  ),
                },
                {
                  title: "Open to All Departments",
                  description: "CS, Engineering, Business &mdash; everyone is welcome to participate.",
                  icon: <Globe className="h-5 w-5" />,
                  header: (
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/5 flex items-center justify-center h-32">
                      <Users className="h-12 w-12 text-primary/30" />
                    </div>
                  ),
                  className: "md:col-span-2",
                },
                {
                  title: "Official Recognition",
                  description: "Get featured on IEEE official handles with certificates of participation.",
                  icon: <Trophy className="h-5 w-5" />,
                  header: (
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/5 flex items-center justify-center h-32">
                      <span className="text-4xl font-bold text-primary/30">IEEE</span>
                    </div>
                  ),
                },
                {
                  title: "Real Project Experience",
                  description: "Work on an official IEEE NEDUET project and build your portfolio.",
                  icon: <Code className="h-5 w-5" />,
                  header: (
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/5 flex items-center justify-center h-32">
                      <Rocket className="h-12 w-12 text-primary/30" />
                    </div>
                  ),
                  className: "md:col-span-2",
                },
                {
                  title: "Teams of 1-4 Members",
                  description: "Go solo or form a team. Dynamic registration adapts to your group size.",
                  icon: <Users className="h-5 w-5" />,
                  header: (
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/5 flex items-center justify-center h-32">
                      <span className="text-5xl font-bold text-primary/30">1-4</span>
                    </div>
                  ),
                },
                {
                  title: "Beginner Friendly",
                  description: "No prior hackathon experience needed. We guide you step by step.",
                  icon: <Lightbulb className="h-5 w-5" />,
                  header: (
                    <div className="flex-1 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/5 flex items-center justify-center h-32">
                      <span className="text-5xl font-bold text-primary/30">0</span>
                    </div>
                  ),
                  className: "md:col-span-2",
                },
              ].map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={item.className}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Challenge */}
        <section className="border-t relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Target className="h-3.5 w-3.5" />
                The Challenge
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                Build a digital solution that empowers communities through technology
              </h2>

              <p className="mt-6 text-lg text-muted-foreground">
                We&apos;re looking for ideas that make a real difference.
              </p>

              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                  { icon: Lightbulb, title: "Innovation", desc: "Creative solutions that address real-world problems.", gradient: "from-blue-500 to-cyan-500" },
                  { icon: Rocket, title: "Practical Impact", desc: "Solutions that make a tangible difference in people&apos;s lives.", gradient: "from-purple-500 to-pink-500" },
                  { icon: Code, title: "Technical Excellence", desc: "Well-built, functional prototypes with solid engineering.", gradient: "from-amber-500 to-orange-500" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative rounded-2xl border bg-card/50 p-6 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
          <div className="container mx-auto px-4 relative text-center">
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Rocket className="h-3.5 w-3.5" />
                Get Started
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to Build?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join IEEE NED Student Branch for an unforgettable 24-hour hackathon experience. Spaces are limited.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="gap-2 text-base h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                    Register Your Team <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>IEEE NED Student Branch &middot; BuildByte 2026</p>
        </div>
      </footer>
    </div>
  )
}
