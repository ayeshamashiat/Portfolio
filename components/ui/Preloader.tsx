"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PokeBall } from "@/components/ui/PokeBall";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
        >
          <div className="max-w-xs w-full px-12 flex flex-col items-center">
            <PokeBall size={56} spinning />

            <div className="mt-6 flex items-center justify-between w-full mb-2">
              <span className="text-xs font-bold tracking-[0.15em] text-foreground uppercase font-display">Booting Neural Link</span>
              <span className="text-xs font-mono text-primary">{progress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-muted relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-primary shadow-[0_0_12px_var(--primary)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground tracking-[0.1em] uppercase font-mono">
              &gt; establishing uplink // ayesha_mashiat.exe
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
