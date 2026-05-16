import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-muted-foreground font-mono text-sm">01.</span>
          About Architecture
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        <AnimatedSection delay={0.2} className="space-y-6 text-lg text-muted-foreground">
          <p>
            I am a software engineering student specializing in backend architecture,
            currently focused on integrating artificial intelligence into complex distributed systems.
          </p>
          <p>
            My engineering philosophy centers on creating robust, scalable, and elegant solutions
            to complex problems. I believe that good code should be as readable as it is functional.
          </p>
          <p>
            Beyond standard CRUD applications, my interests lie in system optimization,
            machine learning pipelines, and building the infrastructure that powers AI models.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="border border-border p-6 font-mono text-sm">
            <div className="text-muted-foreground mb-4">{"// System specs"}</div>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Core.Entity</span>
                <span className="text-foreground">Ayesha Mashiat</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Core.Focus</span>
                <span className="text-foreground">Backend & AI Integration</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Architecture.Style</span>
                <span className="text-foreground">Microservices, Event-Driven</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Location</span>
                <span className="text-foreground">Dhaka, Bangladesh</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>System.Status</span>
                <span className="text-foreground">Online / Technical Ambitious</span>
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
