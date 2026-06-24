"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Server, Database, Brain, CheckCircle } from "lucide-react";

const VALUES = [
  {
    icon: <Server className="w-5 h-5 text-indigo-400" />,
    title: "RESTful API Design",
    description: "Building scalable, secure REST APIs with Node.js/Express.js and FastAPI that handle complex business logic and high-frequency transactions."
  },
  {
    icon: <Database className="w-5 h-5 text-purple-400" />,
    title: "Database Engineering",
    description: "Designing relational schemas in PostgreSQL/MySQL, implementing efficient ORMs with SQLAlchemy, and optimizing queries for performance."
  },
  {
    icon: <Brain className="w-5 h-5 text-pink-400" />,
    title: "AI-Powered Backends",
    description: "Integrating LLMs, RAG pipelines, and ML models into production systems; building intelligent CV tailoring and career guidance engines."
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    title: "Security & DevOps",
    description: "Implementing JWT authentication, role-based access control, Docker containerization, and AWS deployment for enterprise-grade applications."
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
            I'm a full-stack/backend developer and third-year Software Engineering student at IUT. I design and build scalable server systems, databases, and APIs that power web applications. I've worked on recruitment platforms, AI-powered career tools and donation management systems—each requiring secure authentication, efficient data handling, and reliable performance.
          </p>
          <p>
            I focus on writing clean, maintainable code and deploying systems that actually work in production. Whether it's architecting databases, integrating third-party services, or setting up cloud infrastructure, I approach each project with an emphasis on security, performance, and long-term stability.
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
