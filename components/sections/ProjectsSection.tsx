"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const PROJECTS = [
  {
    id: "01",
    title: "Jobscape Recruitment Backend",
    description:
      "A secure, resilient infrastructure powering a modern recruitment platform, featuring automated transactional notifications and optimized database interactions.",
    techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    highlights:
      "Maintains transactional rollbacks to ensure data integrity during communication failures.",
    github: "https://github.com/ayeshamashiat/Jobscape_Backend",
    live: "#",
    image: "/jobscape_preview.png",
    accent: "#6366f1",
    details: {
      overview:
        "Jobscape Backend was built to handle high-frequency candidate applications and recruiter actions. The system is designed with event-driven architectures to process automated transactions and notifications, while ensuring double-fetch protection on registration and email verification channels.",
      features: [
        "Event-Driven notifications for transactional communication.",
        "Double-fetch resilient authentication logic.",
        "Database rollback systems preventing stale user records on service failure.",
        "Query optimizations that reduce read times by 35% on high-load endpoints.",
      ],
    },
  },
  {
    id: "02",
    title: "Calorie Adventure",
    description:
      "An interactive 2D gameplay experience built to promote healthy eating habits, featuring a custom physics rendering loop and local database persistence.",
    techStack: ["Java", "Swing/AWT", "File System"],
    highlights:
      "Designed with a custom game state engine and flat-file storage for offline scores.",
    github: "https://github.com/ayeshamashiat/CalorieAdventureGame",
    live: "#",
    image: "/calorie_adventure_preview.png",
    accent: "#a855f7",
    video: "/resources/CalorieAdventureGame/CalorieAdventureGame.mp4",
    screenshots: [
      "/resources/CalorieAdventureGame/screenshot1.png",
      "/resources/CalorieAdventureGame/screenshot2.png",
      "/resources/CalorieAdventureGame/screenshot3.png",
    ],
    details: {
      overview:
        "Calorie Adventure is an offline 2D arcade game built in vanilla Java. Players control a cat character that navigates dynamic platform loops to collect healthy nutrition items. It features custom pixel collision detection and flat-file systems to manage persistent local scores and player levels.",
      features: [
        "Custom game loop running at a stable 60 FPS.",
        "Custom box-collision and intersection physics.",
        "Robust flat-file reader/writer for scoring history.",
        "Modular rendering architecture separating logical updates from draw operations.",
      ],
    },
  },
  {
    id: "03",
    title: "Kindle Hope",
    description:
      "A comprehensive charity and donation platform connecting donors with impactful causes, featuring secure payment gateways and transparent fund tracking.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    highlights:
      "Provides a transparent ledger for real-time tracking of charitable donations and fund allocation.",
    github: "https://github.com/adrita06/Kindle_Hope",
    live: "#",
    image: "/kindle_hope_preview.png",
    accent: "#f59e0b",
    details: {
      overview:
        "Kindle Hope is a full-stack web application designed to bridge the gap between philanthropists and meaningful causes. The platform ensures seamless and secure donation flows, empowering users to track the impact of their contributions over time.",
      features: [
        "Secure and seamless payment integration for donations.",
        "Real-time progress tracking for various charitable campaigns.",
        "User dashboard for managing contribution history and impact metrics.",
        "Responsive, accessible UI designed for high engagement and trust.",
      ],
    },
  },
  {
    id: "05",
    title: "CareerPilot CodeSprint",
    description:
      "An intelligent CV tailoring platform leveraging AI to optimize user resumes for specific job descriptions with persistent history tracking.",
    techStack: ["React", "Python", "Flask", "MongoDB"],
    highlights:
      "Integrates AI models for automated resume adjustments and maintains a robust CV generation history.",
    github: "https://github.com/ayeshamashiat/CareerPilor_CodeSprint",
    live: "#",
    image: "/career_pilot_preview.png",
    accent: "#10b981",
    video: "https://www.youtube.com/watch?v=_xa97LQYlAM",
    screenshots: [],
    details: {
      overview:
        "CareerPilot CodeSprint is an advanced CV enhancement tool that matches a user's resume against targeted job descriptions. It automates keyword optimization and layout structuring while storing tailored versions in a secure, persistent MongoDB database.",
      features: [
        "AI-driven CV parsing and keyword optimization algorithms.",
        "Persistent CV storage and detailed tailored CV history.",
        "Cloudinary integration for secure file uploads and management.",
        "Intuitive frontend flow supporting side-by-side job description comparisons.",
      ],
    },
  },
];

/* ─── Scroll speed constants ──────────────────────────────────────── */
const AUTO_SPEED = 0.6;     // px per frame — gentle drift
const EDGE_SPEED = 8;       // px per frame — fast when hovering edge zones

/* ─── Media gallery component ────────────────────────────────────── */
function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

interface MediaGalleryProps {
  video?: string;
  screenshots?: string[];
  accent: string;
  title: string;
}

function MediaGallery({ video, screenshots, accent, title }: MediaGalleryProps) {
  const [activeTab, setActiveTab] = useState<"video" | "screenshots">(
    video ? "video" : "screenshots"
  );
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const hasBoth = !!video && !!screenshots?.length;

  return (
    <div className="space-y-3">
      {/* Tab bar — only shown when both exist */}
      {hasBoth && (
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
              activeTab === "video"
                ? "border-white/15 bg-white/[0.06] text-white"
                : "border-white/5 bg-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <Play className="w-3 h-3" />
            Gameplay Video
          </button>
          <button
            onClick={() => setActiveTab("screenshots")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
              activeTab === "screenshots"
                ? "border-white/15 bg-white/[0.06] text-white"
                : "border-white/5 bg-transparent text-muted-foreground hover:text-white"
            }`}
          >
            Screenshots ({screenshots!.length})
          </button>
        </div>
      )}

      {/* Video panel */}
      {activeTab === "video" && video && (
        <div
          className="relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-900"
          style={{ boxShadow: `0 0 60px -10px ${accent}33` }}
        >
          {/* Accent stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
          />
          {getYouTubeEmbedUrl(video) ? (
            <iframe
              src={getYouTubeEmbedUrl(video)!}
              className="w-full aspect-video"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <video
              src={video}
              controls
              className="w-full aspect-video object-cover"
              poster="/calorie_adventure_preview.png"
            />
          )}
        </div>
      )}

      {/* Screenshots panel */}
      {activeTab === "screenshots" && screenshots && screenshots.length > 0 && (
        <div className="space-y-3">
          {/* Main screenshot */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-900"
            style={{ boxShadow: `0 0 60px -10px ${accent}33` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] z-10"
              style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-[1]" />
            <img
              src={screenshots[activeScreenshot]}
              alt={`${title} screenshot ${activeScreenshot + 1}`}
              className="w-full aspect-video object-cover"
            />
            {/* Prev / Next arrows */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={() => setActiveScreenshot((p) => (p - 1 + screenshots.length) % screenshots.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/20 hover:border-white/40 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setActiveScreenshot((p) => (p + 1) % screenshots.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/20 hover:border-white/40 transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        i === activeScreenshot ? "w-4 opacity-100" : "opacity-40"
                      }`}
                      style={{ background: accent }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {screenshots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreenshot(i)}
                  className={`shrink-0 w-24 aspect-video rounded-lg overflow-hidden border transition-all duration-200 ${
                    i === activeScreenshot
                      ? "border-white/30 opacity-100"
                      : "border-white/5 opacity-50 hover:opacity-75"
                  }`}
                >
                  <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  // Paused states
  const isPausedRef = useRef(false);   // hovered a card
  const edgeRef = useRef<null | "left" | "right">(null); // hovered an edge zone

  const rafRef = useRef<number | null>(null);

  // Duplicate the list for infinite loop effect
  const cards = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  /* ── rAF loop ─────────────────────────────────────────────────── */
  const loop = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (edgeRef.current === "left") {
      el.scrollLeft -= EDGE_SPEED;
    } else if (edgeRef.current === "right") {
      el.scrollLeft += EDGE_SPEED;
    } else if (!isPausedRef.current) {
      el.scrollLeft += AUTO_SPEED;

      // Seamless loop: when we've scrolled past 2/3, reset to 1/3
      const third = el.scrollWidth / 3;
      if (el.scrollLeft >= third * 2) {
        el.scrollLeft -= third;
      }
      if (el.scrollLeft <= 0) {
        el.scrollLeft = third;
      }
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    // Kick off from the middle third so there's room to scroll either way
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth / 3;
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);

  return (
    <section
      id="projects"
      className="py-32 overflow-hidden relative"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none -z-10" />

      {/* ── Section header ──────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
                03 / Case Studies
              </p>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                Selected Projects
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-light max-w-xs leading-relaxed">
              Hover a card to pause — edge-hover to fast-scroll — click to explore details.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* ── Scroll strip ────────────────────────────────────────── */}
      <AnimatedSection delay={0.15}>
        <div className="relative">

          {/* Left fade + edge zone */}
          <div
            className="absolute left-0 top-0 h-full w-24 z-20 flex items-center justify-start pl-4 cursor-w-resize group/left pointer-events-auto select-none"
            style={{
              background:
                "linear-gradient(to right, rgba(3,0,20,0.92) 0%, rgba(3,0,20,0.4) 60%, transparent 100%)",
            }}
            onMouseEnter={() => { edgeRef.current = "left"; }}
            onMouseLeave={() => { edgeRef.current = null; }}
          >
            <div className="opacity-0 group-hover/left:opacity-100 transition-opacity duration-200 p-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </div>

          {/* Right fade + edge zone */}
          <div
            className="absolute right-0 top-0 h-full w-24 z-20 flex items-center justify-end pr-4 cursor-e-resize group/right pointer-events-auto select-none"
            style={{
              background:
                "linear-gradient(to left, rgba(3,0,20,0.92) 0%, rgba(3,0,20,0.4) 60%, transparent 100%)",
            }}
            onMouseEnter={() => { edgeRef.current = "right"; }}
            onMouseLeave={() => { edgeRef.current = null; }}
          >
            <div className="opacity-0 group-hover/right:opacity-100 transition-opacity duration-200 p-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 no-scrollbar"
            style={{
              scrollbarWidth: "none",
              paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
              paddingRight: "clamp(1.5rem, 6vw, 6rem)",
            }}
          >
            {cards.map((project, idx) => (
              <ProjectCard
                key={`${project.id}-${idx}`}
                project={project}
                onPause={() => { isPausedRef.current = true; }}
                onResume={() => { isPausedRef.current = false; }}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass-card rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 md:p-10 relative no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:border-white/40 text-white transition-all duration-200 cursor-pointer z-10 shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-8">
                {/* ── Media: video+screenshots for CalorieAdventure, static image for others ── */}
                {(selectedProject as any).video || (selectedProject as any).screenshots ? (
                  <MediaGallery
                    video={(selectedProject as any).video}
                    screenshots={(selectedProject as any).screenshots}
                    accent={selectedProject.accent}
                    title={selectedProject.title}
                  />
                ) : (
                  <div
                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-neutral-900"
                    style={{ boxShadow: `0 0 60px -10px ${selectedProject.accent}33` }}
                  >
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(to right, transparent, ${selectedProject.accent}, transparent)` }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left */}
                  <div className="lg:col-span-8 space-y-7">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl font-black text-white/5 select-none leading-none mt-1">
                        {selectedProject.id}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
                        Overview
                      </h5>
                      <p className="text-muted-foreground leading-relaxed font-light text-sm md:text-base">
                        {selectedProject.details.overview}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
                        Key Features
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.details.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm text-neutral-300 font-light leading-relaxed p-4 rounded-xl border border-white/5 bg-white/[0.015]"
                          >
                            <span style={{ color: selectedProject.accent }} className="font-bold shrink-0 mt-0.5">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right sidebar */}
                  <div className="lg:col-span-4 space-y-7 lg:pl-8 lg:border-l border-white/5">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-3 font-semibold">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-neutral-300 text-xs font-light"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block font-semibold">
                        Links
                      </span>
                      <div className="flex flex-col gap-2.5">
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors py-2.5 px-4 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.025] group/link"
                        >
                          <svg className="w-4 h-4 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          <span>GitHub Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                        <a
                          href={selectedProject.live}
                          className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors py-2.5 px-4 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.025] group/link"
                        >
                          <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Individual project card ────────────────────────────────────── */
interface CardProps {
  project: (typeof PROJECTS)[0];
  onPause: () => void;
  onResume: () => void;
  onClick: () => void;
}

function ProjectCard({ project, onPause, onResume, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      className="
        shrink-0 relative
        w-[88vw] sm:w-[70vw] md:w-[55vw] lg:w-[44vw] xl:w-[38vw]
        min-w-[280px] max-w-[720px]
        rounded-2xl
        border border-white/5
        bg-white/[0.012]
        hover:bg-white/[0.022]
        hover:border-white/10
        transition-all duration-500
        cursor-pointer
        overflow-hidden
        group
        flex flex-col
      "
      style={{
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 8px 50px rgba(0,0,0,0.4), 0 0 40px -10px ${project.accent}44`;
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 30px rgba(0,0,0,0.3)";
      }}
    >
      {/* Accent top line */}
      <div
        className="h-[1.5px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${project.accent}cc, transparent)` }}
      />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden border-b border-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* ID watermark */}
        <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.06] group-hover:text-white/[0.10] transition-colors select-none leading-none pointer-events-none">
          {project.id}
        </span>

        {/* View details pill (shows on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-4 py-2 rounded-full bg-black/60 border border-white/10 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-5 p-6 flex-1">
        {/* Title + description */}
        <div className="space-y-2 flex-1">
          <h4
            className="text-base md:text-lg font-bold text-white leading-snug transition-colors duration-300"
            style={{ color: undefined }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = project.accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "";
            }}
          >
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Key achievement */}
        <div
          className="rounded-xl px-4 py-3 text-xs font-light leading-relaxed text-neutral-300 border border-white/5 bg-white/[0.008]"
          style={{ borderLeft: `2px solid ${project.accent}55` }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.2em] font-semibold block mb-1"
            style={{ color: project.accent }}
          >
            Key Achievement
          </span>
          {project.highlights}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full bg-white/[0.025] border border-white/5 text-neutral-400 text-[10px] font-light tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}