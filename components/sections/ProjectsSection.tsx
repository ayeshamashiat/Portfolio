"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Code, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Jobscape_Backend",
    description: "Architected a secure, double-fetch resilient authentication flow and robust email verification system for the Jobscape platform.",
    techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    architecture: "Event-driven transactional emails with transactional DB rollbacks on failure.",
    github: "https://github.com/ayeshamashiat/Jobscape_Backend",
    live: "#"
  },
  {
    id: "02",
    title: "CalorieAdventureGame",
    description: "An infinity loop game where we train our fat cat to eat healthy and avoid unhealthy foods. This 2D game is made using vanilla Java.",
    techStack: ["Java", "File System", "Swing/AWT"],
    architecture: "Custom game engine loop with file-system-based persistence for high scores and state management.",
    github: "https://github.com/ayeshamashiat/CalorieAdventureGame",
    live: "#"
  },
  {
    id: "03",
    title: "PAMS_Backend",
    description: "A backend service focused on managing complex data structures and providing a robust API for personal management systems.",
    techStack: ["JavaScript", "Node.js", "Express"],
    architecture: "Modular architecture with clean separation of concerns and optimized RESTful endpoints.",
    github: "https://github.com/ayeshamashiat/PAMS_Backend",
    live: "#"
  },
  {
    id: "04",
    title: "AlgoVisualizer",
    description: "Web-based, interactive platform designed to help users understand complex Data Structures and Algorithms through step-by-step visualization.",
    techStack: ["React", "JavaScript", "Algorithms"],
    architecture: "State-driven animation engine for real-time visualization of algorithm execution paths.",
    github: "https://github.com/ayeshamashiat/AlgoVisualizer",
    live: "#"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="text-muted-foreground font-mono text-sm">02.</span>
            Featured Engineering
          </h2>
        </AnimatedSection>

        <div className="space-y-24">
          {PROJECTS.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <div className="group relative border border-border p-8 md:p-12 hover:border-foreground transition-colors duration-500 bg-background z-10">
                <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-bold text-border group-hover:text-muted-foreground transition-colors -z-10">
                  {project.id}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mb-6 font-mono text-sm border-l-2 border-muted pl-4 py-1 space-y-2">
                      <div><span className="text-muted-foreground">{"// Architecture Highlight"}</span></div>
                      <div>{project.architecture}</div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
                    <div>
                      <div className="font-mono text-sm text-muted-foreground mb-3">Tech_Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-muted text-foreground text-xs font-mono uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                      <a href={project.github} className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors">
                        <Code className="w-5 h-5" />
                        <span>Source</span>
                      </a>
                      <a href={project.live} className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        <span>Live System</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
