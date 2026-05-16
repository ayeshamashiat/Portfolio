import { AnimatedSection } from "@/components/ui/AnimatedSection";

const SKILL_CATEGORIES = [
  {
    name: "Languages",
    items: ["Python", "TypeScript", "Go", "SQL", "JavaScript", "C++"]
  },
  {
    name: "Backend_&_Architecture",
    items: ["Node.js", "Flask", "Next.js", "RESTful APIs", "Microservices", "Event-Driven Systems"]
  },
  {
    name: "Data_&_Infrastructure",
    items: ["PostgreSQL", "Redis", "SQLAlchemy", "Docker", "Git", "Linux/Bash"]
  },
  {
    name: "AI_&_Machine_Learning",
    items: ["Predictive Modeling", "Data Pipelines", "Model Integration", "Pandas", "Scikit-Learn"]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="text-muted-foreground font-mono text-sm">03.</span>
            System Capabilities
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <AnimatedSection key={category.name} delay={index * 0.1}>
              <div className="h-full border border-border p-6 bg-background">
                <div className="font-mono text-sm text-muted-foreground mb-6 pb-2 border-b border-border/50">
                  {`module::${category.name.toLowerCase()}`}
                </div>
                <ul className="space-y-3 font-mono text-sm">
                  {category.items.map((item, i) => (
                    <li key={item} className="flex items-center gap-3 group">
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{">"}</span>
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
