"use client";

import { ComponentType } from "react";

type SilhouetteProps = { size?: number; className?: string };

/* Original, generic tech-glyph doodles — drone, satellite dish, chip, eye,
   network node, circuit bolt. Stroke-only, single color, low detail. Quiet
   background texture evoking a surveillance/net-runner city, not decoration. */

function SilhouetteSpark({ size = 40, className = "" }: SilhouetteProps) {
  // Quadcopter drone
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="26" y="28" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M26 30 12 18M38 30 52 18M26 34 12 46M38 34 52 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="52" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="46" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="52" cy="46" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="1.8" fill="currentColor" />
    </svg>
  );
}

function SilhouetteEmber({ size = 40, className = "" }: SilhouetteProps) {
  // Satellite dish
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M10 34a22 22 0 0 1 38-15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 36c10-8 26-8 34 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M40 38c6-2 10 0 12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="30" r="2" fill="currentColor" />
      <path d="M24 30 44 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 50h12v6H38z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SilhouetteAqua({ size = 40, className = "" }: SilhouetteProps) {
  // Chip / processor
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <rect x="26" y="26" width="12" height="12" stroke="currentColor" strokeWidth="1.6" />
      <path d="M24 18v-6M32 18v-6M40 18v-6M24 46v6M32 46v6M40 46v6M18 24h-6M18 32h-6M18 40h-6M46 24h6M46 32h6M46 40h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SilhouetteLeaf({ size = 40, className = "" }: SilhouetteProps) {
  // Surveillance eye
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M6 32c6-10 16-16 26-16s20 6 26 16c-6 10-16 16-26 16S12 42 6 32Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="2.6" fill="currentColor" />
      <path d="M32 14v-6M32 56v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SilhouetteBreeze({ size = 40, className = "" }: SilhouetteProps) {
  // Network node with links
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="52" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="50" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="52" cy="50" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M26 27 15 19M38 27 49 19M26 37 15 47M38 37 49 47" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SilhouetteWisp({ size = 40, className = "" }: SilhouetteProps) {
  // Circuit bolt
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M36 6 18 34h12L26 58 48 28H36Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="18" cy="34" r="1.8" fill="currentColor" />
      <circle cx="48" cy="28" r="1.8" fill="currentColor" />
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

// A sparse, static field of outlined tech-glyph doodles behind section content —
// quiet texture, not decoration. Hidden on mobile so small screens stay clean.
export function PokeSilhouetteField({ items, className = "" }: { items: ScatterSpec[]; className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none hidden md:block ${className}`} aria-hidden>
      {items.map(({ Icon, top, left, size, rotate }, i) => (
        <div
          key={i}
          className="absolute text-primary opacity-[0.12]"
          style={{ top, left, transform: `rotate(${rotate}deg)` }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  );
}
