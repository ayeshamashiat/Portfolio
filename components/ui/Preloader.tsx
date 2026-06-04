"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] text-white"
        >
          <div className="max-w-md w-full px-12">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-light tracking-[0.2em] text-white uppercase">Ayesha Mashiat</span>
              <span className="text-xs font-mono text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
              <span>Systems Engineering</span>
              <span>Intelligent Design</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
