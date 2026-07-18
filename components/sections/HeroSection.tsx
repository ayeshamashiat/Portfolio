"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, ChevronDown, RotateCw } from "lucide-react";
import { PokeBall } from "@/components/ui/PokeBall";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { TrainerSprite } from "@/components/ui/TrainerSprite";
import { TerminalText } from "@/components/ui/TerminalText";

function useTimePlayed() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const SYSTEM_LOG = [
  "FAVORITE STACK: Postgres (still tuning queries at 2am)",
  "SIGNATURE MOVE: sudo fix-it-anyway",
  "IDEAL TEAMMATE: someone who actually reads the logs",
  "CURRENT QUEST: ship side projects, hoard tea",
  "HIDDEN TALENT: explaining stack traces to rubber ducks",
];

function CardField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-pixel font-bold text-[11px] md:text-xs text-primary shrink-0">{label}/</span>
      <span className="font-pixel font-semibold text-xs md:text-sm text-[#eafcff] truncate">{value}</span>
    </div>
  );
}

function PokedexGrille() {
  return (
    <div className="grid grid-cols-2 gap-[3px]">
      {[0, 1, 2, 3].map(i => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-primary/50" />
      ))}
    </div>
  );
}

function PokedexLens() {
  return (
    <span
      className="w-3.5 h-3.5 rounded-full shrink-0"
      style={{
        background: "radial-gradient(circle at 35% 30%, #baffff, #00b3a6 55%, #062f2a 100%)",
        boxShadow: "0 0 0 1.5px rgba(0,0,0,0.45), 0 0 6px rgba(0,255,242,0.6)",
      }}
    />
  );
}

function PokedexDpad() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="opacity-60">
      <rect x="5.2" y="0" width="3.6" height="14" rx="1" fill="#00fff2" fillOpacity="0.35" />
      <rect x="0" y="5.2" width="14" height="3.6" rx="1" fill="#00fff2" fillOpacity="0.35" />
    </svg>
  );
}

function PokedexShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="absolute inset-0 rounded-[22px] shadow-2xl pokedex-shell flex flex-col overflow-hidden" style={style}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1.5 shrink-0">
        <PokedexGrille />
        <PokedexLens />
      </div>

      <div className="flex-1 mx-3 mb-1.5 rounded-[15px] bg-[#050810] p-[5px] pokedex-screen min-h-0">
        {children}
      </div>

      <div className="flex items-center justify-between px-4 pb-2.5 pt-1 shrink-0">
        <PokedexDpad />
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary/30" />
          <span className="w-2 h-2 rounded-full bg-secondary/30" />
        </div>
      </div>
    </div>
  );
}

function TrainerCard() {
  const [flipped, setFlipped] = useState(false);
  const timePlayed = useTimePlayed();

  return (
    <div className="w-full max-w-[380px] mx-auto lg:mx-0" style={{ perspective: 1200 }}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Flip access card"
        onClick={() => setFlipped(f => !f)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped(f => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full aspect-[16/10] cursor-pointer select-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <PokedexShell style={{ backfaceVisibility: "hidden" }}>
          <div className="relative w-full h-full rounded-[11px] bg-[#080c16] p-4 md:p-5 flex flex-col overflow-hidden scanlines">
            <div className="flex items-center gap-1.5 mb-3">
              <PokeBall size={14} />
              <span className="font-pixel font-bold text-[11px] text-primary tracking-wide">ACCESS.ID</span>
              <RotateCw className="w-3 h-3 text-primary/50 ml-auto" />
            </div>

            <div className="flex flex-1 gap-4">
              <div className="flex-1 flex flex-col justify-center gap-3 min-w-0">
                <CardField label="NAME" value="AYESHA MASHIAT" />
                <CardField label="ROLE" value="BACKEND DEVELOPER" />
                <CardField label="CLEARANCE" value="LVL 5 // ROOT" />
                <CardField label="UPTIME" value={timePlayed} />
              </div>
              <div className="shrink-0 flex items-end pb-1">
                <TrainerSprite size={58} />
              </div>
            </div>

            <span className="font-pixel font-semibold text-[10px] text-primary/50 text-right mt-2">TAP TO FLIP ↻</span>
          </div>
        </PokedexShell>

        {/* Back */}
        <PokedexShell style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="relative w-full h-full rounded-[11px] bg-[#080c16] p-4 md:p-5 flex flex-col overflow-hidden scanlines">
            <span className="font-pixel font-bold text-[11px] text-primary tracking-wide mb-3">SYSTEM.LOG</span>
            <ul className="space-y-2 flex-1">
              {SYSTEM_LOG.map(note => (
                <li key={note} className="font-pixel font-medium text-[10px] md:text-[11px] text-[#eafcff] leading-relaxed">
                  ▸ {note}
                </li>
              ))}
            </ul>
            <span className="font-pixel font-semibold text-[10px] text-primary/50 text-right">TAP TO FLIP ↻</span>
          </div>
        </PokedexShell>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-24 pb-12">
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Intro Column */}
        <div className="lg:col-span-7 space-y-7 text-left mt-8 lg:mt-0">
          <AnimatedSection delay={0.1}>
            <div className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2.5 font-display">
              <PokeBall size={18} />
              Ayesha Mashiat
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 leading-[1.05] text-foreground font-display">
              Ayesha{" "}
              <span className="glitch text-primary neon-text" data-text="Mashiat">
                Mashiat
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mt-4">
              Backend Developer &amp; Software Engineering Student
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.35} className="flex flex-wrap gap-2.5">
            <TypeBadge type="steel" label="Chrome · Backend" />
            <TypeBadge type="electric" label="Volt · AI / RAG" />
            <TypeBadge type="water" label="Flow · Databases" />
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              Building resilient backend systems and AI tools, one exploit-proof deploy at a time. Full access card on the right →
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <TerminalText
              text="whoami → backend_dev.exe // building systems that don't fall over"
              className="text-primary/80"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="poke-button inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-display text-base cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="poke-button-ghost inline-flex items-center justify-center px-6 py-3.5 font-display text-base cursor-pointer"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Right: Access Card */}
        <div className="lg:col-span-5 flex justify-center w-full relative z-10">
          <AnimatedSection delay={0.5} className="w-full">
            <TrainerCard />
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom Scroll Guide */}
      <AnimatedSection delay={1.0} className="absolute bottom-8 left-6 md:left-12 lg:left-24">
        <a href="#about" className="flex items-center gap-2 text-xs uppercase tracking-[0.20em] text-muted-foreground hover:text-foreground transition-colors font-display font-bold">
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
          <span>Scroll to explore</span>
        </a>
      </AnimatedSection>
    </section>
  );
}
