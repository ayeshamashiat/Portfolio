"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Server, Database, Brain, CheckCircle } from "lucide-react";

const VALUES = [
  {
    icon: <Server className="w-5 h-5 text-indigo-400" />,
    title: "System Architecture",
    description: "Designing structured backend engines engineered to run efficiently and scale reliably under high traffic."
  },
  {
    icon: <Database className="w-5 h-5 text-purple-400" />,
    title: "Data Orchestration",
    description: "Structuring pipelines, optimizing queries, and securing databases to ensure data flows smoothly and safely."
  },
  {
    icon: <Brain className="w-5 h-5 text-pink-400" />,
    title: "Intelligent Integration",
    description: "Seamlessly connecting AI models and predictive data pipelines into existing web and mobile environments."
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    title: "Clarity & Quality",
    description: "Writing transparent, well-tested code that remains maintainable and clear for engineering teams."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none -z-10" />

      <AnimatedSection>
        <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-semibold">01 / Behind the Screen</h2>
        <h3 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">My Approach to Building</h3>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-20">
        <AnimatedSection delay={0.2} className="lg:col-span-6 space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
          <p>
            I am a software engineer focused on architecting resilient backend systems and creating clear pathways for artificial intelligence integration. I build the unseen logic that makes applications fast, stable, and smart.
          </p>
          <p>
            My engineering philosophy centers on clarity and structural durability. I believe that backend architecture should perform silently under pressure, while remaining accessible and well-documented for long-term growth.
          </p>
          <p>
            I combine classic software engineering patterns with modern data processing to connect complex databases, machine learning workflows, and customer-facing interfaces seamlessly.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((val) => (
            <div 
              key={val.title}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-white/10 transition-all duration-300 group"
            >
              <div className="p-3 w-fit rounded-xl bg-white/[0.03] group-hover:bg-white/[0.06] border border-white/5 transition-colors mb-4">
                {val.icon}
              </div>
              <h4 className="text-base font-semibold text-white mb-2">{val.title}</h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{val.description}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
