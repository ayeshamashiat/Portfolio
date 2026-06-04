import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-white selection:text-black">
      <Preloader />
      <MouseGlow />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}
