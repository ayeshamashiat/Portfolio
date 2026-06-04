"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowDown, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Ambient background glow spheres */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 -left-10 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }} />
      
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mt-12">
        <AnimatedSection delay={0.1}>
          <div className="text-xs md:text-sm font-medium mb-6 text-primary uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-6 h-[1px] bg-primary"></span>
            Ayesha Mashiat
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]">
            I build the logic <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              that powers scale.
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
            I design and build reliable backend systems and integrate artificial intelligence to solve complex problems. Focused on performance, data integrity, and clean structures that scale effortlessly.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 hover:border-white/30 text-white font-medium bg-white/5 hover:bg-white/10 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={1.0} className="absolute bottom-12 left-6 md:left-12 lg:left-24">
        <a href="#about" className="flex items-center gap-2 text-xs uppercase tracking-[0.20em] text-muted-foreground hover:text-white transition-colors">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>Scroll to explore</span>
        </a>
      </AnimatedSection>
    </section>
  );
}
