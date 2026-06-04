"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ACHIEVEMENTS = [
  {
    id: "solvio",
    title: "SOLVIO Top 100",
    issuer: "SOLVIO Competition",
    date: "2025",
    team: "Team #336",
    category: "Hackathon",
    description:
      "Ranked in the Top 100 teams out of all participants in the SOLVIO competition — a national-level problem-solving and engineering challenge.",
    certificate: "/resources/Achievement/SOLVIO_Top100_Certificate_Team_336.png",
    accent: "#a855f7",
    badge: "Top 100",
  },
];

const CATEGORY_STYLES: Record<string, string> = {
  Hackathon: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Academic:    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Certificate: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export function AchievementsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="achievements" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-semibold">05 / Milestones</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Achievements</h3>
          <p className="text-muted-foreground font-light text-base mb-16 max-w-xl leading-relaxed">
            Recognition earned through competition, coursework, and independent work.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <div
                className="group relative rounded-2xl border border-white/5 bg-white/[0.012] hover:bg-white/[0.022] hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col"
                style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 8px 50px rgba(0,0,0,0.4), 0 0 40px -10px ${item.accent}44`;
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 30px rgba(0,0,0,0.3)";
                }}
              >
                {/* Accent top line */}
                <div
                  className="h-[1.5px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${item.accent}cc, transparent)` }}
                />

                {/* Certificate thumbnail */}
                <div
                  className="relative aspect-[4/3] overflow-hidden border-b border-white/5 cursor-zoom-in bg-neutral-900"
                  onClick={() => setLightbox(item.certificate)}
                >
                  <img
                    src={item.certificate}
                    alt={`${item.title} certificate`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
                      View Certificate
                    </span>
                  </div>
                  {/* Badge overlay */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                    style={{
                      background: `${item.accent}22`,
                      borderColor: `${item.accent}44`,
                      color: item.accent,
                    }}
                  >
                    {item.badge}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-white leading-snug">{item.title}</h4>
                      <span className="text-sm text-neutral-400 font-light">{item.issuer}</span>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${CATEGORY_STYLES[item.category]}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-neutral-500 font-light">
                    <span>{item.team}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 z-10 p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <img
                src={lightbox}
                alt="Certificate"
                className="w-full rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}