"use client"

import { useRef } from "react"
import { motion, useScroll } from "motion/react"
import { GitBranch, Cpu, Lightbulb, Rocket } from "lucide-react"

const steps = [
  {
    day: "Day 1",
    icon: GitBranch,
    title: "Git & GitHub",
    description: "Learn version control, collaboration workflows, and open-source fundamentals.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    day: "Day 2",
    icon: Cpu,
    title: "Tech Stack & Tools",
    description: "Choose your stack and master the hackathon toolkit — frontend, backend, deployment.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    day: "Day 3",
    icon: Lightbulb,
    title: "Idea to MVP",
    description: "Transform your concept into a working prototype with expert mentorship and feedback.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    day: "Day 4",
    icon: Rocket,
    title: "The 24-Hour Build",
    description: "Ship your solution in a high-energy sprint. Final presentations and live judging.",
    gradient: "from-emerald-500 to-teal-500",
  },
]

export function JourneySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  return (
    <section ref={ref} id="journey" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.03]" />

      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-2xl text-center mb-16 md:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            The Path
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Your 4-Day Journey</h2>
          <p className="mt-4 text-muted-foreground text-lg">From zero to hackathon hero in four days.</p>
        </div>

        {/* Desktop: horizontal milestones */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 via-amber-500 to-emerald-500"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} p-0.5 shadow-lg`}>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                    <step.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                    {i + 1}
                  </span>
                </div>

                <span className={`inline-block bg-gradient-to-r ${step.gradient} bg-clip-text text-sm font-semibold text-transparent`}>
                  {step.day}
                </span>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[220px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-8 max-w-lg mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-5 group"
            >
              <div className="flex flex-col items-center">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient}`}>
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-1 w-[2px] flex-1 bg-gradient-to-b from-border to-transparent" />
                )}
              </div>
              <div className="pb-8 pt-1">
                <span className={`text-xs font-semibold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                  {step.day}
                </span>
                <h3 className="text-base font-semibold mt-0.5">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
