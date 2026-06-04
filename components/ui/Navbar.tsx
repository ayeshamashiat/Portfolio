"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
        <div className="relative flex items-center justify-between px-6 py-3 rounded-full border border-white/5 bg-background/30 backdrop-blur-xl shadow-2xl transition-all">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50 pointer-events-none" />
          
          <a href="#" className="relative z-10 text-sm font-light tracking-[0.25em] text-white uppercase hover:opacity-80 transition-opacity">
            Ayesha <span className="font-semibold text-primary">Mashiat</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-medium text-muted-foreground hover:text-white uppercase tracking-widest transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-white hover:text-primary transition-colors duration-200"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 p-1 text-muted-foreground hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
            className="absolute top-full left-0 right-0 mx-4 mt-2 p-6 rounded-3xl border border-white/5 bg-[#030014]/95 backdrop-blur-2xl shadow-3xl md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-white uppercase tracking-widest transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary hover:text-white transition-colors"
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
