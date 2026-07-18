"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokeBall } from "@/components/ui/PokeBall";
import { TerminalText } from "@/components/ui/TerminalText";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const MATRIX_CHARS = "01アイウエオカキクケコ01ABCDEF01".split("");
const GLYPH_COLORS = ["#00fff2", "#ff2fd0", "#39ff88"];

interface FallingItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  kind: "core" | "char";
  char: string;
  color: string;
}

export function EasterEgg() {
  const [active, setActive] = useState(false);
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    console.log(
      "%cpsst — try the konami code (↑↑↓↓←→←→ B A) to breach the mainframe.",
      "font-weight: bold; font-family: monospace; color: #00fff2;"
    );

    let buffer: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      buffer.push(e.key.toLowerCase());
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
        buffer = [];
        setItems(
          Array.from({ length: 32 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 1.8 + Math.random() * 1.6,
            size: 12 + Math.random() * 16,
            rotate: Math.random() > 0.5 ? 360 : -360,
            kind: Math.random() > 0.7 ? "core" : "char",
            char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
            color: GLYPH_COLORS[Math.floor(Math.random() * GLYPH_COLORS.length)],
          }))
        );
        setActive(true);
        setTimeout(() => setActive(false), 4200);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
          />

          {items.map((s) => (
            <motion.div
              key={s.id}
              initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: s.rotate }}
              transition={{ duration: s.duration, delay: s.delay, ease: "easeIn" }}
              className="absolute font-mono font-bold"
              style={{ left: `${s.left}%`, color: s.color, fontSize: s.kind === "char" ? s.size : undefined }}
            >
              {s.kind === "core" ? <PokeBall size={s.size} /> : s.char}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 poke-card px-6 py-5 text-center min-w-[280px]"
          >
            <p className="font-display font-bold text-primary neon-text text-base md:text-lg tracking-wide">
              ACCESS GRANTED
            </p>
            <TerminalText
              text="konami sequence verified — welcome to the mainframe, runner."
              prefix="$ "
              className="mt-2 text-xs md:text-sm text-muted-foreground flex justify-center"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
