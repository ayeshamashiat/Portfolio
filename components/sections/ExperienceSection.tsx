"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

const TIMELINE = [
  {
    type: "education",
    role: "B.Sc. Software Engineering",
    company: "Islamic University of Technology (IUT)",
    date: "2023 - Present",
    badge: "3rd Year",
    description:
      "Pursuing software engineering with focus on backend systems, databases, and cloud computing. Building real-world applications through coursework and independent projects.",
    highlights: [
      "Database Design & SQL Optimization",
      "REST API Architecture & Backend Systems",
      "Cloud Computing & AWS",
      "Data Structures & Algorithms",
      "Software Design Patterns",
      "System Design & Scalability",
    ],
  }
];

const BADGE_STYLES: Record<string, string> = {
  education: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  project:   "bg-purple-500/10 text-purple-400 border-purple-500/20",
  achievement: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const NODE_COLORS: Record<string, string> = {
  education: "border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]",
  project:   "border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
  achievement: "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-semibold">04 / Timeline</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Education & Experience</h3>
          
        </AnimatedSection>

        <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 space-y-16">
          {TIMELINE.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="relative">
                {/* Timeline node */}
                <div
                  className={`absolute -left-[39px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-background border-2 ${NODE_COLORS[item.type]}`}
                />

                {/* Date + badge row */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    {item.date}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${BADGE_STYLES[item.type]}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h4 className="text-xl md:text-2xl font-bold text-white mb-1">{item.role}</h4>
                <span className="text-neutral-300 font-medium block mb-4">{item.company}</span>
                <p className="text-muted-foreground text-base leading-relaxed font-light mb-5">
                  {item.description}
                </p>

                {/* Highlights grid */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-300 font-light"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {point}
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