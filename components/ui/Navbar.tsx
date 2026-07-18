"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { PokeBall } from "@/components/ui/PokeBall";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative flex items-center justify-between px-5 py-2.5 rounded-full glass-nav">
          <a href="#" className="relative z-10 flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity font-display">
            <PokeBall size={26} />
            Ayesha <span className="text-primary neon-text">Mashiat</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-bold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200 font-display flex items-center"
              >
                <span className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 w-0 group-hover:w-3 overflow-hidden">
                  ▸
                </span>
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative z-10 p-1.5 rounded-full border border-border hover:border-primary transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                <PokeBall size={20} spinning={false} />
              </button>
            )}
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_6px_var(--color-neon)] animate-pulse" />
              Online
            </span>
            <a
              href="#contact"
              className="poke-button inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider cursor-pointer font-display"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="md:hidden flex items-center gap-3 relative z-10">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1 rounded-full border border-border cursor-pointer"
                aria-label="Toggle theme"
              >
                <PokeBall size={18} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 p-6 rounded-3xl glass-nav md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-2 text-lg font-bold text-muted-foreground hover:text-foreground transition-colors font-display"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-lg font-bold text-primary transition-colors font-display"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
