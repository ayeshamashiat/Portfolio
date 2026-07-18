"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TypeIcon, TYPE_COLORS } from "@/components/ui/TypeBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useSkillFilter } from "@/components/SkillFilterProvider";
import { SKILL_CATEGORIES } from "@/lib/skills";

export function SkillsSection() {
  const { activeSkills, toggleSkill, clearSkills } = useSkillFilter();

  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 border-y border-border bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <AnimatedSection>
            <h2 className="text-sm uppercase tracking-[0.25em] text-primary mb-4 font-bold font-display">02 / Move Set</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-display">Core Competencies</h3>
            <AnimatePresence mode="wait">
              {activeSkills.size > 0 && (
                <motion.div
                  key={activeSkills.size}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-3 mt-3"
                >
                  <a
                    href="#projects"
                    className="text-xs text-muted-foreground font-bold hover:text-foreground transition-colors font-display"
                  >
                    ★ Filtering by {activeSkills.size} skill{activeSkills.size > 1 ? "s" : ""} — see matching projects ↓
                  </a>
                  <button
                    type="button"
                    onClick={clearSkills}
                    className="text-xs text-foreground/40 hover:text-foreground font-bold underline underline-offset-2 cursor-pointer font-display"
                  >
                    clear
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xs text-muted-foreground font-medium">
              Tap a skill to filter matching projects below.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, index) => {
            const meta = TYPE_COLORS[category.type];
            return (
              <AnimatedSection key={category.name} delay={index * 0.08}>
                <div className="h-full poke-card poke-card-hover p-6 relative group">
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
                    <TypeIcon type={category.type} size={28} />
                    <h4 className="text-xl font-bold text-foreground font-display flex-1">
                      {category.name}
                    </h4>
                    <span className="text-[10px] font-bold text-muted-foreground shrink-0">{category.items.length}</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {category.items.map((item) => {
                      const isPinned = activeSkills.has(item);
                      return (
                        <motion.button
                          key={item}
                          type="button"
                          onClick={() => toggleSkill(item)}
                          whileTap={{ scale: 0.9 }}
                          animate={isPinned ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                          transition={{ duration: 0.35 }}
                          title={`Filter projects using ${item}`}
                          className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer font-display"
                          style={
                            isPinned
                              ? { backgroundColor: meta.color, borderColor: meta.color, color: "#fff" }
                              : {
                                  backgroundColor: "transparent",
                                  borderColor: "var(--border)",
                                  color: "var(--muted-foreground)",
                                }
                          }
                        >
                          {item}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
