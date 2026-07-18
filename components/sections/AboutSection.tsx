"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TypeIcon, TYPE_COLORS, PokemonType } from "@/components/ui/TypeBadge";
import { motion } from "framer-motion";

const VALUES: { title: string; description: string; type: PokemonType; level: number }[] = [
  {
    title: "RESTful API Design",
    description: "Building resilient, secure REST APIs with Express.js, Flask, and FastAPI that manage complex business logic and handle high transactional frequency.",
    type: "water",
    level: 95,
  },
  {
    title: "Database Engineering",
    description: "Designing relational schemas in PostgreSQL/MySQL, writing optimized ORM interactions with SQLAlchemy, and tuning queries to reduce load latency.",
    type: "ground",
    level: 90,
  },
  {
    title: "AI-Powered Systems",
    description: "Integrating Large Language Models and building Retrieval-Augmented Generation (RAG) pipelines into backend platforms for tailored intelligent tools.",
    type: "psychic",
    level: 85,
  },
  {
    title: "DevOps & Security",
    description: "Implementing JWT authentication, role-based access control (RBAC), API rate-limiting, and deploying containerized environments using Docker.",
    type: "steel",
    level: 90,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
      <AnimatedSection>
        <h2 className="text-xs uppercase tracking-[0.25em] text-primary neon-text mb-3 font-bold font-display">01 / USER.PROFILE</h2>
        <h3 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground font-display">My Approach to Building</h3>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-20">
        <AnimatedSection delay={0.2} className="lg:col-span-5">
          <div className="poke-card p-6 md:p-7 space-y-4">
            <span className="font-pixel font-bold text-xs text-primary tracking-wide block pb-4 border-b border-border">USER.ID</span>
            {[
              { label: "SCHOOL", value: "Islamic University of Technology" },
              { label: "YEAR", value: "3rd Year, Software Engineering" },
              { label: "FOCUS", value: "Backend Systems & AI Tooling" },
              { label: "STYLE", value: "Clean code, zero-downtime deploys" },
            ].map(field => (
              <div key={field.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-pixel font-bold text-[11px] text-muted-foreground shrink-0 sm:w-20">{field.label}/</span>
                <span className="text-sm font-semibold text-foreground">{field.value}</span>
              </div>
            ))}
            <p className="text-sm text-muted-foreground italic pt-4 border-t border-border leading-relaxed">
              &quot;I believe in structural stability and deploying systems that actually work under stress — no smoke, no mirrors.&quot;
            </p>
          </div>
        </AnimatedSection>

        {/* Trainer Stats screen */}
        <AnimatedSection delay={0.4} className="lg:col-span-7">
          <div className="poke-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="font-pixel font-bold text-xs text-primary tracking-wide">STAT.MONITOR</span>
              <span className="font-pixel font-bold text-xs text-muted-foreground tracking-wide">4 SKILLS</span>
            </div>

            <div className="space-y-6">
              {VALUES.map((val, i) => (
                <div key={val.title}>
                  <div className="flex items-center gap-3 mb-2">
                    <TypeIcon type={val.type} size={26} />
                    <h4 className="text-sm md:text-base font-bold text-foreground font-display flex-1 min-w-0 truncate">{val.title}</h4>
                    <span className="text-xs font-bold tabular-nums shrink-0" style={{ color: TYPE_COLORS[val.type].color }}>
                      {val.level}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden mb-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${val.level}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: TYPE_COLORS[val.type].color }}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
