"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface SkillFilterContextValue {
  activeSkills: Set<string>;
  toggleSkill: (skill: string) => void;
  clearSkills: () => void;
}

const SkillFilterContext = createContext<SkillFilterContextValue | null>(null);

export function SkillFilterProvider({ children }: { children: ReactNode }) {
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set());

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  }, []);

  const clearSkills = useCallback(() => setActiveSkills(new Set()), []);

  return (
    <SkillFilterContext.Provider value={{ activeSkills, toggleSkill, clearSkills }}>
      {children}
    </SkillFilterContext.Provider>
  );
}

export function useSkillFilter() {
  const ctx = useContext(SkillFilterContext);
  if (!ctx) throw new Error("useSkillFilter must be used within a SkillFilterProvider");
  return ctx;
}

// Case-insensitive, substring-tolerant match so e.g. "Express" (project tag)
// still matches "Express.js" (skill tag) without requiring identical strings.
export function skillMatchesTech(skill: string, tech: string) {
  const a = skill.trim().toLowerCase();
  const b = tech.trim().toLowerCase();
  return a === b || a.includes(b) || b.includes(a);
}
