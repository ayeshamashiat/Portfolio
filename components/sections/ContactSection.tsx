import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TerminalText } from "@/components/ui/TerminalText";
import { Mail, Terminal, Cpu } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 border-t border-border bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-muted/20 via-background to-background pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <div className="inline-block border border-border p-4 mb-8 bg-background shadow-2xl">
            <TerminalText text="connection.establish({ protocol: 'mailto' });" delay={0.2} prefix="> " />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Initialize Contact</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            I am currently open to new opportunities. Whether you have a question about backend architecture, want to discuss AI integration, or just want to say hi, my inbox is open.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="mailto:hello@example.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-medium hover:bg-muted-foreground transition-colors group">
              <Mail className="w-5 h-5" />
              <span>Send Message</span>
            </a>
            
            <div className="flex gap-4">
              <a href="https://github.com/ayeshamashiat" className="p-4 border border-border hover:border-foreground text-muted-foreground hover:text-foreground transition-colors">
                <Terminal className="w-5 h-5" />
              </a>
              <a href="#" className="p-4 border border-border hover:border-foreground text-muted-foreground hover:text-foreground transition-colors">
                <Cpu className="w-5 h-5" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <div className="mt-32 text-center text-sm text-muted-foreground font-mono">
        <p>Built with Next.js, Tailwind & Framer Motion</p>
        <p className="mt-2">© {new Date().getFullYear()} Designed & Engineered</p>
      </div>
    </section>
  );
}
