"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrophyMedal } from "@/components/ui/Trophy";
import { TYPE_COLORS, PokemonType } from "@/components/ui/TypeBadge";

// Add new achievements here — each one gets a Hall of Fame trophy tinted by
// its Pokemon type, no manual badge art needed.
const ACHIEVEMENTS: {
  id: string;
  title: string;
  issuer: string;
  date: string;
  team: string;
  category: string;
  type: PokemonType;
  description: string;
  certificate: string;
}[] = [
  {
    id: "solvio",
    title: "SOLVIO Top 100",
    issuer: "SOLVIO Competition",
    date: "2025",
    team: "Team #336",
    category: "Hackathon",
    type: "dragon",
    description:
      "Ranked in the Top 100 teams out of all participants in the SOLVIO competition — a prestigious national-level engineering and complex systems problem-solving challenge.",
    certificate: "/resources/Achievement/SOLVIO_Top100_Certificate_Team_336.png",
  },
];

export function AchievementsSection() {
  const [selected, setSelected] = useState<(typeof ACHIEVEMENTS)[number] | null>(null);

  return (
    <section id="achievements" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-14">
          <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-bold font-display">05 / Hall of Fame</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-display">Hall of Fame</h3>
          <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-xl leading-relaxed">
            Competitions and challenges, enshrined one trophy at a time.
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap gap-6">
          {ACHIEVEMENTS.map((achievement, index) => {
            const color = TYPE_COLORS[achievement.type].color;
            return (
              <AnimatedSection key={achievement.id} delay={index * 0.1}>
                <button
                  type="button"
                  onClick={() => setSelected(achievement)}
                  className="poke-card poke-card-hover p-6 flex items-center gap-5 text-left cursor-pointer w-full sm:w-[340px]"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative shrink-0"
                  >
                    <TrophyMedal color={color} size={64} />
                    <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color, animationDuration: "3s" }} />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold text-foreground leading-tight">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.category} · {achievement.date}</p>
                  </div>
                </button>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* Certificate + achievement detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="poke-card relative max-w-3xl w-full max-h-[92vh] overflow-y-auto no-scrollbar p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 z-10 p-2 rounded-full border border-border text-foreground bg-background hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <TrophyMedal color={TYPE_COLORS[selected.type].color} size={48} />
                <h4 className="text-xl font-bold text-foreground font-display">{selected.title}</h4>
              </div>

              <img
                src={selected.certificate}
                alt={`${selected.title} certificate`}
                className="w-full rounded-xl border border-border shadow-lg mb-6"
              />

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{selected.description}</p>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border text-xs">
                <span className="px-2.5 py-1 rounded-full bg-muted text-foreground font-bold uppercase tracking-wide">{selected.category}</span>
                <span className="text-muted-foreground font-semibold">{selected.issuer}</span>
                <span className="ml-auto text-muted-foreground font-semibold">{selected.team} · {selected.date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
