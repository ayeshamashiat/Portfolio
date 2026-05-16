import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TerminalText } from "@/components/ui/TerminalText";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl">
        <AnimatedSection delay={0.1}>
          <div className="font-mono text-sm mb-4 text-muted-foreground uppercase tracking-widest">
            Ayesha Mashiat // Backend Engineer
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
            Building <br />
            <span className="text-muted-foreground">intelligent</span> systems.
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mb-12">
            <TerminalText text="system.start(); // Backend Engineer transitioning into AI." delay={0.8} />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium hover:bg-muted-foreground transition-colors">
              View Architecture
            </a>
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-foreground transition-colors">
              Initialize Contact
            </a>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={1.2} className="absolute bottom-12 left-6 md:left-12 lg:left-24">
        <a href="#about" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDown className="w-4 h-4 animate-bounce" />
          Scroll to explore
        </a>
      </AnimatedSection>
    </section>
  );
}
