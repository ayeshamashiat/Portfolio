"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Mail, ArrowRight, Copy, Check, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PokeBall } from "@/components/ui/PokeBall";

const EMAIL = "ayesha.mashiat019@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ayesha-mashiat-89915429a/";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the mailto link below still works.
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 border-t border-border relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <div className="flex justify-center mb-4">
            <PokeBall size={32} />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-bold block font-display">06 / Poké Center</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground font-display">Let&apos;s build something together</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            I am always open to new project opportunities, collaborations, or discussing scalability, APIs, and systems design. Feel free to drop a message.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="flex flex-col items-center gap-3 mb-10">
          <span className="font-pixel font-bold text-xs text-primary tracking-wide">◇ PC HEAL STATION</span>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="poke-card relative overflow-hidden inline-flex items-center gap-3 px-5 py-3 cursor-pointer group max-w-full"
          >
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-white pointer-events-none"
                />
              )}
            </AnimatePresence>
            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="font-display font-bold text-xs sm:text-sm text-foreground truncate">{EMAIL}</span>
            <span className="w-px h-4 bg-border shrink-0" />
            {copied ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                <Check className="w-3.5 h-3.5" /> Copied
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                <Copy className="w-3.5 h-3.5" /> Copy
              </span>
            )}
          </button>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full sm:w-auto">
            <a
              href={`mailto:${EMAIL}`}
              className="poke-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 font-display text-base cursor-pointer group"
            >
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/resume.pdf"
              download
              className="poke-button-ghost w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 font-display text-base cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>

            <div className="flex gap-4">
              <a
                href="https://github.com/ayeshamashiat"
                target="_blank"
                rel="noreferrer"
                className="poke-button-ghost p-4 cursor-pointer"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="poke-button-ghost p-4 cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="mt-40 text-center text-xs tracking-wider text-muted-foreground">
        <p>© {new Date().getFullYear()} Ayesha Mashiat. All rights reserved.</p>
        <p className="mt-2 text-foreground/40 font-semibold">Designed &amp; engineered like a true trainer.</p>
      </div>
    </section>
  );
}
