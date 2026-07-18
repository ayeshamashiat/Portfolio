"use client";

import { ComponentType } from "react";

type SilhouetteProps = { size?: number; className?: string };

/* Original, generic creature-silhouette doodles — evoke classic Gen-1-style
   archetypes (spark/ember/aqua/leaf/breeze/wisp) without tracing any
   copyrighted character design. Stroke-only, single color, low detail. */

function SilhouetteSpark({ size = 40, className = "" }: SilhouetteProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M20 30 L14 14 L24 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 30 L50 14 L40 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 24c11 0 18 8 18 17 0 10-8 15-18 15s-18-5-18-15c0-9 7-17 18-17Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="23" cy="42" r="2.4" fill="currentColor" />
      <circle cx="41" cy="42" r="2.4" fill="currentColor" />
      <path d="M46 56 L52 62 L44 60 L48 50Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SilhouetteEmber({ size = 40, className = "" }: SilhouetteProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M22 46c-6 0-10-6-10-13 0-9 7-16 16-16 8 0 14 5 15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 33c8-4 24-4 30 2 6 6 4 14-2 17-8 4-20 3-25-4-3-5-4-11-3-15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 40c6 2 10 8 8 14-1 4-5 6-8 4-4-3-4-9-2-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="36" r="2" fill="currentColor" />
      <path d="M18 22c2-3 5-4 8-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SilhouetteAqua({ size = 40, className = "" }: SilhouetteProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M12 38c0-11 9-20 20-20s20 9 20 20-9 16-20 16-20-5-20-16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 32c8-4 16-4 24 0M18 40c9 4 19 4 28 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 44c-3 2-5 5-4 8M50 44c3 2 5 5 4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="23" cy="23" r="1.6" fill="currentColor" />
    </svg>
  );
}

function SilhouetteLeaf({ size = 40, className = "" }: SilhouetteProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M16 42c0-9 7-16 16-16s16 7 16 16-7 12-16 12-16-3-16-12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 26c-2-6 1-12 6-14 2 6 0 11-3 14M36 26c2-6-1-12-6-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="40" r="1.8" fill="currentColor" />
      <circle cx="38" cy="40" r="1.8" fill="currentColor" />
      <path d="M18 48c3 3 6 3 8 1M46 48c-3 3-6 3-8 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SilhouetteBreeze({ size = 40, className = "" }: SilhouetteProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 20c7 0 12 6 12 14s-5 12-12 12-12-4-12-12 5-14 12-14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 26c-8-2-14 1-16 6 6 3 12 2 16-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 26c8-2 14 1 16 6-6 3-12 2-16-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 18 L32 12 L36 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
}

function SilhouetteWisp({ size = 40, className = "" }: SilhouetteProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M16 34c0-10 7-18 16-18s16 8 16 18v14c-2 2-4-2-6 0s-4 2-6 0-4 2-6 0-4 2-6 0-4 2-6 0-2-2-2-4V34Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="32" r="2" fill="currentColor" />
      <circle cx="38" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

export const SILHOUETTES: ComponentType<SilhouetteProps>[] = [
  SilhouetteSpark,
  SilhouetteEmber,
  SilhouetteAqua,
  SilhouetteLeaf,
  SilhouetteBreeze,
  SilhouetteWisp,
];

interface ScatterSpec {
  Icon: ComponentType<SilhouetteProps>;
  top: string;
  left: string;
  size: number;
  rotate: number;
}

// A sparse, static field of outlined creature doodles behind section content —
// quiet texture, not decoration. Hidden on mobile so small screens stay clean.
export function PokeSilhouetteField({ items, className = "" }: { items: ScatterSpec[]; className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none hidden md:block ${className}`} aria-hidden>
      {items.map(({ Icon, top, left, size, rotate }, i) => (
        <div
          key={i}
          className="absolute text-foreground opacity-[0.1]"
          style={{ top, left, transform: `rotate(${rotate}deg)` }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  );
}
