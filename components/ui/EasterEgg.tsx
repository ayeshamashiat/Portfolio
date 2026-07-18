"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokeBall } from "@/components/ui/PokeBall";

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

interface FallingBall {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
}

export function EasterEgg() {
  const [active, setActive] = useState(false);
  const [balls, setBalls] = useState<FallingBall[]>([]);

  useEffect(() => {
    console.log(
      "%cpsst — try the konami code (↑↑↓↓←→←→ B A).",
      "font-weight: bold; font-family: monospace;"
    );

    let buffer: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      buffer.push(e.key.toLowerCase());
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
        buffer = [];
        setBalls(
          Array.from({ length: 26 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 2.2 + Math.random() * 1.6,
            size: 14 + Math.random() * 16,
            rotate: Math.random() > 0.5 ? 360 : -360,
          }))
        );
        setActive(true);
        setTimeout(() => setActive(false), 3800);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden">
          {balls.map((s) => (
            <motion.div
              key={s.id}
              initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: s.rotate }}
              transition={{ duration: s.duration, delay: s.delay, ease: "easeIn" }}
              className="absolute"
              style={{ left: `${s.left}%` }}
            >
              <PokeBall size={s.size} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 poke-card px-6 py-4 text-center"
          >
            <p className="font-display font-bold text-foreground text-base md:text-lg">
              ✨ Shiny variant unlocked
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              you found the secret trainer code. respect.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
