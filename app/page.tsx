import { NavBar } from "@/components/sections/nav-bar"
import { HeroSection } from "@/components/sections/hero-section"
import { StorySection } from "@/components/sections/story-section"
import { LineupSection } from "@/components/sections/lineup-section"
import { ThemeSection } from "@/components/sections/theme-section"
import { PerksSection } from "@/components/sections/perks-section"
import { JudgingSection } from "@/components/sections/judging-section"
import { CtaSection } from "@/components/sections/cta-section"
import { SiteFooter } from "@/components/sections/site-footer"
import { PixelDivider } from "@/components/pixel-divider"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HeroSection />
      <PixelDivider />
      <StorySection />
      <PixelDivider flip />
      <LineupSection />
      <ThemeSection />
      <PixelDivider />
      <PerksSection />
      <JudgingSection />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
