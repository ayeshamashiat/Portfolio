"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

const SKILL_CATEGORIES = [
  {
    name: "Programming",
    items: ["Python", "TypeScript", "Go", "SQL", "JavaScript", "C++"]
  },
  {
    name: "Systems & Architecture",
    items: ["Node.js", "FastAPI", "Next.js", "RESTful APIs", "Microservices", "System Design"]
  },
  {
    name: "Data & Operations",
    items: ["PostgreSQL", "Redis", "SQLAlchemy", "Docker", "Git", "Linux & Bash"]
  },
  {
    name: "AI & Machine Learning",
    items: ["Predictive Modeling", "Data Pipelines", "Model Integration", "Pandas", "Scikit-Learn"]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-semibold">02 / Toolkit</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">Core Competencies</h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <AnimatedSection key={category.name} delay={index * 0.1}>
              <div className="h-full rounded-2xl border border-white/5 bg-background/50 p-6 hover:border-white/10 transition-all duration-300">
                <h4 className="text-base font-semibold text-white mb-6 pb-3 border-b border-white/5">
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-primary/20 text-muted-foreground hover:text-white transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
