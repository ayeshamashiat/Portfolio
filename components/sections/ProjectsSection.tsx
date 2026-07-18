"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, ArrowUpRight, ChevronLeft, ChevronRight, ChevronUp, Search } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TypeBadge, TYPE_COLORS, PokemonType } from "@/components/ui/TypeBadge";
import { useSkillFilter, skillMatchesTech } from "@/components/SkillFilterProvider";
import { PokeSilhouetteField, SILHOUETTES } from "@/components/ui/PokeSilhouettes";
import { ALL_SKILLS } from "@/lib/skills";

const PROJECTS_SILHOUETTES = [
  { Icon: SILHOUETTES[0], top: "4%", left: "2%", size: 44, rotate: -8 },
  { Icon: SILHOUETTES[1], top: "80%", left: "95%", size: 42, rotate: 10 },
  { Icon: SILHOUETTES[2], top: "50%", left: "97%", size: 38, rotate: -6 },
  { Icon: SILHOUETTES[3], top: "88%", left: "1%", size: 40, rotate: 8 },
];

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* ─── Data ─────────────────────────────────────────────────────── */
const PROJECTS: {
  id: string;
  title: string;
  fullTitle: string;
  description: string;
  techStack: string[];
  github: string;
  live: string;
  image: string;
  type: PokemonType;
  video?: string;
  screenshots?: string[];
  details: { overview: string; features: string[] };
}[] = [
  {
    id: "01",
    title: "Jobscape",
    fullTitle: "Jobscape Recruitment Backend",
    description:
      "A secure, resilient infrastructure powering a modern recruitment platform — automated transactional notifications, optimised DB interactions, and airtight rollback logic.",
    techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    github: "https://github.com/ayeshamashiat/Jobscape_Backend",
    live: "#",
    image: "/jobscape_preview.png",
    type: "water",
    details: {
      overview:
        "Jobscape Backend was built to handle high-frequency candidate applications and recruiter actions. The system uses event-driven architectures to process automated transactions and notifications, with double-fetch protection on registration and email verification channels.",
      features: [
        "Event-driven notifications for transactional communication.",
        "Double-fetch resilient authentication logic.",
        "Database rollback systems preventing stale user records on failure.",
        "Query optimisations reducing read times by 35% on high-load endpoints.",
      ],
    },
  },
  {
    id: "02",
    title: "CalorieAdventure",
    fullTitle: "Calorie Adventure Game",
    description:
      "An offline 2D arcade game in vanilla Java. A cat navigates platforms collecting healthy food, with custom collision physics and flat-file score persistence — running at a silky 60 FPS.",
    techStack: ["Java", "Swing/AWT", "File I/O"],
    github: "https://github.com/ayeshamashiat/CalorieAdventureGame",
    live: "#",
    image: "/calorie_adventure_preview.png",
    type: "grass",
    video: "/resources/CalorieAdventureGame/CalorieAdventureGame.mp4",
    screenshots: [
      "/resources/CalorieAdventureGame/screenshot1.png",
      "/resources/CalorieAdventureGame/screenshot2.png",
      "/resources/CalorieAdventureGame/screenshot3.png",
    ],
    details: {
      overview:
        "Calorie Adventure is an offline 2D arcade game built in vanilla Java. Players control a cat navigating dynamic platform loops to collect healthy items. Features custom pixel collision detection and flat-file systems for persistent local scores.",
      features: [
        "Custom game loop running at a stable 60 FPS.",
        "Custom box-collision and intersection physics.",
        "Robust flat-file reader/writer for scoring history.",
        "Modular rendering architecture separating logic from draw ops.",
      ],
    },
  },
  {
    id: "03",
    title: "KindleHope",
    fullTitle: "Kindle Hope — Charity Platform",
    description:
      "A full-stack donation platform bridging philanthropists with causes. Real-time fund tracking, secure payment gateway, and a transparent ledger that shows donors exactly where their money goes.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/adrita06/Kindle_Hope",
    live: "#",
    image: "/kindle_hope_preview.png",
    type: "fairy",
    details: {
      overview:
        "Kindle Hope bridges philanthropists and meaningful causes. Seamless donation flows, real-time campaign progress tracking, and a user dashboard for managing contribution history and impact metrics.",
      features: [
        "Secure and seamless payment integration for donations.",
        "Real-time progress tracking for charitable campaigns.",
        "User dashboard for contribution history and impact metrics.",
        "Responsive, accessible UI designed for trust and engagement.",
      ],
    },
  },
  {
    id: "04",
    title: "CareerPilot",
    fullTitle: "CareerPilot — AI CV Tailor",
    description:
      "RAG-powered agentic career co-pilot. Parses your CV against a job description, optimises keywords, structures layout, and persists every tailored version so you never start from scratch.",
    techStack: ["React", "FastAPI", "ChromaDB", "MongoDB", "Groq LLaMA"],
    github: "https://github.com/ayeshamashiat/CareerPilor_CodeSprint",
    live: "#",
    image: "/career_pilot_preview.png",
    type: "psychic",
    video: "https://www.youtube.com/watch?v=_xa97LQYlAM",
    screenshots: [],
    details: {
      overview:
        "CareerPilot matches your resume against targeted job descriptions, automating keyword optimisation and layout structuring while storing tailored versions in a secure, persistent MongoDB database.",
      features: [
        "AI-driven CV parsing and keyword optimisation algorithms.",
        "Persistent CV storage and detailed tailored CV history.",
        "Cloudinary integration for secure file uploads.",
        "Side-by-side job description comparison interface.",
      ],
    },
  },
];

type Project = (typeof PROJECTS)[number];

/* ─── YouTube helper ──────────────────────────────────────────── */
function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}

/* ─── Media Gallery (in modal) ────────────────────────────────── */
function MediaGallery({ video, screenshots, title }: { video?: string; screenshots?: string[]; title: string }) {
  const [tab, setTab] = useState<"video" | "screenshots">(video ? "video" : "screenshots");
  const [shot, setShot] = useState(0);
  const hasBoth = !!video && !!screenshots?.length;

  return (
    <div className="space-y-3">
      {hasBoth && (
        <div className="flex gap-2">
          {[{ k: "video", label: "▶ Demo" }, { k: "screenshots", label: `📸 Screens (${screenshots!.length})` }].map(({ k, label }) => (
            <button key={k} onClick={() => setTab(k as "video" | "screenshots")}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer font-display ${tab === k ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {label}
            </button>
          ))}
        </div>
      )}
      {tab === "video" && video && (
        <div className="relative rounded-xl overflow-hidden border border-border">
          {getYouTubeEmbedUrl(video)
            ? <iframe src={getYouTubeEmbedUrl(video)!} className="w-full aspect-video" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            : <video src={video} controls className="w-full aspect-video object-cover" />}
        </div>
      )}
      {tab === "screenshots" && screenshots && screenshots.length > 0 && (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-border">
            <img src={screenshots[shot]} alt={`${title} ${shot + 1}`} className="w-full aspect-video object-cover" />
            {screenshots.length > 1 && (
              <>
                <button onClick={() => setShot(p => (p - 1 + screenshots.length) % screenshots.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 border border-border cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setShot(p => (p + 1) % screenshots.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 border border-border cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
              </>
            )}
          </div>
          {screenshots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {screenshots.map((src, i) => (
                <button key={i} onClick={() => setShot(i)} className={`shrink-0 w-20 aspect-video rounded-lg overflow-hidden border cursor-pointer transition-all ${i === shot ? "border-primary" : "border-border opacity-50 hover:opacity-100"}`}>
                  <img src={src} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Device chrome: lens, lights, buttons, D-pad ─────────────── */
function DexLens() {
  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center shrink-0 ring-2 ring-black/10">
      <div
        className="w-11 h-11 md:w-[52px] md:h-[52px] rounded-full relative overflow-hidden ring-1 ring-black/20"
        style={{ background: "radial-gradient(circle at 35% 30%, #a8e2ff, #2a8fd6 55%, #124a75 100%)" }}
      >
        <span className="absolute top-1.5 left-2.5 w-3 h-3 rounded-full bg-white/70 blur-[1px]" />
      </div>
    </div>
  );
}

function DexLights({ signal }: { signal: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-black/20 ${signal ? "bg-red-900/40" : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]"}`} />
      <span className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-yellow-400 border border-black/20 shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
      <span className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-black/20 ${signal ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)] animate-pulse" : "bg-green-900/40"}`} />
    </div>
  );
}

function DexAButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open full details"
      title="Full details"
      className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#161616] border-2 border-black/40 shadow-md flex items-center justify-center text-white font-black text-sm cursor-pointer active:scale-95 transition-transform shrink-0"
    >
      A
    </button>
  );
}

function DexPad({ onLeft, onRight, onUp }: { onLeft: () => void; onRight: () => void; onUp: () => void }) {
  const btnClass = "absolute flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer";
  return (
    <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] shrink-0">
      <div
        className="absolute inset-0"
        style={{
          background: "#161616",
          clipPath: "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
        }}
      />
      <button type="button" onClick={onUp} aria-label="Clear skill filters" title="Clear filters" className={`${btnClass} top-0 left-1/2 -translate-x-1/2 w-6 h-5`}>
        <ChevronUp className="w-4 h-4" />
      </button>
      <button type="button" onClick={onLeft} aria-label="Previous project" title="Previous" className={`${btnClass} left-0 top-1/2 -translate-y-1/2 w-5 h-6`}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button type="button" onClick={onRight} aria-label="Next project" title="Next" className={`${btnClass} right-0 top-1/2 -translate-y-1/2 w-5 h-6`}>
        <ChevronRight className="w-4 h-4" />
      </button>
      <span className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-[#2a2a2a] border border-black/40" />
    </div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { activeSkills, toggleSkill, clearSkills } = useSkillFilter();

  const filtered = useMemo(() => {
    if (activeSkills.size === 0) return PROJECTS;
    const skills = Array.from(activeSkills);
    return PROJECTS.filter(p => p.techStack.some(t => skills.some(s => skillMatchesTech(s, t))));
  }, [activeSkills]);

  const activeEntry = useMemo(() => {
    if (filtered.length === 0) return null;
    return filtered.find(p => p.id === activeId) ?? filtered[0];
  }, [filtered, activeId]);

  const step = (dir: 1 | -1) => {
    if (!activeEntry || filtered.length === 0) return;
    const i = filtered.findIndex(p => p.id === activeEntry.id);
    const next = (i + dir + filtered.length) % filtered.length;
    setActiveId(filtered[next].id);
  };

  const suggestions = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return ALL_SKILLS
      .filter(s => !activeSkills.has(s.name) && skillMatchesTech(q, s.name))
      .map(s => ({
        ...s,
        matchCount: PROJECTS.filter(p => p.techStack.some(t => skillMatchesTech(s.name, t))).length,
      }))
      .filter(s => s.matchCount > 0)
      .slice(0, 6);
  }, [query, activeSkills]);

  const selectSuggestion = (skill: string) => {
    toggleSkill(skill);
    setQuery("");
    setSearchFocused(false);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <PokeSilhouetteField items={PROJECTS_SILHOUETTES} />

      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-bold font-display">
            03 / Pokédex
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground font-display leading-tight">
            Selected Projects
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Device shell */}
          <div
            className="relative rounded-[1.75rem] p-4 md:p-6 shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(160deg, #e8483a 0%, #c92e22 55%, #a02318 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{ backgroundImage: "repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)" }}
            />

            {/* Top row: lens + lights */}
            <div className="relative flex items-center gap-4 mb-4 md:mb-5">
              <DexLens />
              <div className="flex-1" />
              <DexLights signal={!!activeEntry} />
            </div>

            {/* Main screen */}
            <div className="relative rounded-xl p-2 md:p-2.5 mb-4 md:mb-5" style={{ background: "linear-gradient(160deg, #f0f0f2, #b9bcc2)" }}>
              <div className="relative rounded-lg p-4 md:p-5 min-h-[380px] flex flex-col overflow-hidden" style={{ background: "#cfe7f5" }}>
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                </span>

                {/* Pip row */}
                {filtered.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-3 mt-3">
                    {filtered.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActiveId(p.id)}
                        aria-label={`View ${p.title}`}
                        className="cursor-pointer p-1"
                      >
                        <span
                          className="block rounded-full transition-all"
                          style={{
                            width: activeEntry?.id === p.id ? 18 : 7,
                            height: 7,
                            backgroundColor: activeEntry?.id === p.id ? TYPE_COLORS[p.type].color : "#1a1a1a30",
                          }}
                        />
                      </button>
                    ))}
                    <span className="ml-auto text-[11px] font-bold text-[#1a1a1a]/50">
                      Nº {activeEntry?.id} / {String(filtered.length).padStart(2, "0")}
                    </span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {activeEntry ? (
                    <motion.div
                      key={activeEntry.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col flex-1 gap-3"
                    >
                      <div className="relative rounded-lg overflow-hidden aspect-[16/9] border border-black/10">
                        <img src={activeEntry.image} alt={activeEntry.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-lg md:text-xl font-bold text-[#12222e] leading-tight">{activeEntry.fullTitle}</h3>
                        <TypeBadge type={activeEntry.type} />
                      </div>

                      <p className="text-xs md:text-sm text-[#2a3a44]/80 leading-relaxed line-clamp-3">{activeEntry.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {activeEntry.techStack.map(t => (
                          <span key={t} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#12222e]/70 border border-black/10 rounded-full bg-white/50">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-2">
                        <a
                          href={activeEntry.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full border border-black/15 hover:border-primary text-[#12222e]/60 hover:text-primary transition-colors cursor-pointer bg-white/40"
                          aria-label="GitHub repository"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelected(activeEntry)}
                          className="poke-button px-4 py-2 text-xs font-display cursor-pointer flex items-center gap-1.5 ml-auto"
                        >
                          Full Details <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-signal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col items-center justify-center gap-3 text-center"
                    >
                      <Search className="w-8 h-8 text-[#12222e]/30" />
                      <p className="text-xs font-bold text-[#12222e]/50 tracking-wide">No signal</p>
                      <p className="text-xs text-[#12222e]/50 max-w-[220px]">No projects match that combination of skills. Clear a filter to keep scanning.</p>
                      <button onClick={clearSkills} className="poke-button px-5 py-2.5 font-display text-xs cursor-pointer">
                        Clear filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-3 pt-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 border border-black/20" />
                  <div className="flex flex-col gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-9 h-0.5 rounded-full bg-black/10" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Control row */}
            <div className="relative flex items-end gap-3 md:gap-4">
              <DexAButton onClick={() => activeEntry && setSelected(activeEntry)} />

              <div className="flex flex-col gap-1.5 mb-1.5">
                <span className="w-12 md:w-14 h-2.5 rounded-full" style={{ background: "linear-gradient(160deg,#8a2018,#5c140f)" }} />
                <span className="w-12 md:w-14 h-2.5 rounded-full" style={{ background: "linear-gradient(160deg,#2a5f8a,#163c5c)" }} />
              </div>

              {/* Secondary screen: skill search */}
              <div className="flex-1 rounded-lg p-1.5" style={{ background: "linear-gradient(160deg, #f0f0f2, #b9bcc2)" }}>
                <div className="relative rounded bg-[#cfe7f5] px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Search className="w-3 h-3 text-[#12222e]/50 shrink-0" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                      placeholder="Search a skill..."
                      className="w-full bg-transparent text-[11px] md:text-xs text-[#12222e] placeholder:text-[#12222e]/40 focus:outline-none min-w-0"
                    />
                  </div>

                  <AnimatePresence>
                    {searchFocused && query.trim() && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-[#171a1f] border border-white/10 p-1.5 z-30 overflow-hidden shadow-xl"
                      >
                        {suggestions.length === 0 ? (
                          <p className="text-[11px] text-white/40 px-3 py-2">No skill matches &quot;{query}&quot;.</p>
                        ) : (
                          suggestions.map(s => {
                            const meta = TYPE_COLORS[s.type];
                            return (
                              <button
                                key={s.name}
                                type="button"
                                onClick={() => selectSuggestion(s.name)}
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-white/5 transition-colors cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                                <span className="text-sm font-semibold text-white">{s.name}</span>
                                <span className="ml-auto text-[11px] text-white/40 shrink-0">
                                  → {s.matchCount} proj{s.matchCount > 1 ? "s" : ""}
                                </span>
                              </button>
                            );
                          })
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <DexPad onLeft={() => step(-1)} onRight={() => step(1)} onUp={clearSkills} />
            </div>

            {activeSkills.size > 0 && (
              <div className="relative flex flex-wrap items-center gap-1.5 mt-4">
                {Array.from(activeSkills).map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/15 text-white cursor-pointer"
                  >
                    {skill}
                    <X className="w-2.5 h-2.5" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearSkills}
                  className="text-[10px] text-white/60 hover:text-white font-bold underline underline-offset-2 cursor-pointer"
                >
                  clear
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="poke-card w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 md:p-10 relative no-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 absolute top-6 left-6">
                <TypeBadge type={selected.type} />
              </div>

              <button onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all cursor-pointer z-10">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-8 mt-10">
                {(selected.video || selected.screenshots?.length) ? (
                  <MediaGallery video={selected.video} screenshots={selected.screenshots} title={selected.title} />
                ) : (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                    <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">{selected.fullTitle}</h3>
                    <div className="space-y-2">
                      <h5 className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-display">Overview</h5>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{selected.details.overview}</p>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-display">Key Features</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selected.details.features.map((f, i) => (
                          <li key={i} className="flex gap-3 text-sm font-medium text-foreground/80 p-4 rounded-xl border border-border bg-muted/50">
                            <span className="text-primary shrink-0">✓</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6 lg:pl-8 lg:border-l border-border">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold block mb-3 font-display">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {selected.techStack.map(t => (
                          <span key={t} className="px-3 py-1.5 text-xs font-bold border border-border bg-muted rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 pt-6 border-t border-border">
                      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold block font-display">Links</span>
                      {[
                        { href: selected.github, label: "GitHub Repository", icon: <GitHubIcon className="w-4 h-4 shrink-0" /> },
                        { href: selected.live, label: "Live Demo", icon: <Globe className="w-4 h-4 shrink-0" /> },
                      ].map(({ href, label, icon }) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer"
                          className="flex items-center gap-3 text-sm py-2.5 px-4 rounded-xl border border-border hover:border-primary bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors group/l">
                          {icon}
                          <span className="font-display font-bold">{label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover/l:opacity-100 transition-opacity" />
                        </a>
                      ))}
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
