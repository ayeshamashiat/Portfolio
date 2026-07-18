"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PokeBall } from "@/components/ui/PokeBall";

const TIMELINE = [
  {
    role: "B.Sc. Software Engineering",
    company: "Islamic University of Technology (IUT)",
    date: "2023 - Present",
    badge: "3rd Year",
    description:
      "Specializing in software design, backend architectures, databases, and distributed systems. Applying academic patterns to construct production-ready web and AI applications.",
    highlights: [
      "Database Design & Query Tuning",
      "REST API Architecture & Integration",
      "Distributed Cloud Systems & AWS",
      "Data Structures & Algorithms",
      "Architectural Design Patterns",
      "Systems Scalability & Security",
    ],
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-bold font-display">04 / Trainer Journey</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-display">Education &amp; Journey</h3>
        </AnimatedSection>

        <div className="relative border-l-2 border-dashed border-border pl-8 md:pl-16 ml-4 md:ml-6 space-y-16">
          {TIMELINE.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="relative">
                {/* Route node */}
                <div className="absolute -left-[49px] md:-left-[82px] top-1.5 z-10 flex items-center justify-center bg-background border-2 border-primary rounded-full p-1.5 w-9 h-9 md:w-12 md:h-12 shadow-sm">
                  <PokeBall size={20} />
                </div>
                <span className="absolute -left-[42px] md:-left-[70px] -top-5 font-pixel font-bold text-[11px] text-primary whitespace-nowrap">
                  ROUTE {String(index + 1).padStart(2, "0")}
                </span>

                <div className="poke-card poke-card-hover p-6 md:p-8 relative">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-sm font-bold tracking-wider text-foreground/80 uppercase font-display">
                      {item.date}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-foreground mb-1 leading-snug font-display">{item.role}</h4>
                  <span className="text-foreground/80 font-semibold block mb-5">{item.company}</span>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="border-t border-border pt-5">
                    <span className="text-xs uppercase tracking-[0.20em] text-muted-foreground block mb-3 font-bold font-display">Core Learnings:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 text-sm font-semibold text-foreground/90"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}

          <div className="relative -mt-10">
            <div className="absolute -left-[49px] md:-left-[82px] top-0 flex items-center justify-center w-9 h-9 md:w-12 md:h-12">
              <span className="w-3 h-3 rounded-full bg-neon shadow-[0_0_10px_var(--color-neon)] animate-pulse" />
            </div>
            <span className="font-pixel font-bold text-xs text-neon tracking-wide">YOU ARE HERE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
