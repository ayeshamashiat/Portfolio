import { AnimatedSection } from "@/components/ui/AnimatedSection";

const EXPERIENCE = [
  {
    role: "Software Engineering Student",
    company: "University / Self-Taught",
    date: "2023 - Present",
    description: "Deep dive into algorithms, distributed systems architecture, and machine learning infrastructure. Building complex full-stack and backend-heavy applications."
  },
  {
    role: "Backend Architecture Projects",
    company: "Independent",
    date: "2024 - Present",
    description: "Architected microservices, implemented caching layers with Redis, and built predictive models using Python for robust data pipelines."
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="text-muted-foreground font-mono text-sm">04.</span>
            Execution Log
          </h2>
        </AnimatedSection>

        <div className="space-y-12 border-l border-border pl-8 ml-4 md:ml-0 md:pl-12">
          {EXPERIENCE.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-background border border-foreground rounded-full" />
                
                <div className="font-mono text-sm text-muted-foreground mb-2">{exp.date}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">{exp.role}</h3>
                <div className="text-foreground/80 font-medium mb-4">{exp.company}</div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
