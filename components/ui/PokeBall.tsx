"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface PokeBallProps {
  size?: number;
  className?: string;
  spinning?: boolean;
}

export function PokeBall({ size = 24, className = "", spinning = false }: PokeBallProps) {
  const uid = useId().replace(/:/g, "");
  const topGrad = `pb-top-${uid}`;
  const botGrad = `pb-bot-${uid}`;
  const bandGrad = `pb-band-${uid}`;
  const btnGrad = `pb-btn-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn(spinning && "animate-spin", className)}
      style={spinning ? { animationDuration: "1.1s" } : undefined}
    >
      <defs>
        <radialGradient id={topGrad} cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#9adcff" />
          <stop offset="45%" stopColor="#3ea0e6" />
          <stop offset="100%" stopColor="#1c6cb0" />
        </radialGradient>
        <radialGradient id={botGrad} cx="38%" cy="70%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f2f2f2" />
          <stop offset="100%" stopColor="#cfcfcf" />
        </radialGradient>
        <linearGradient id={bandGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="50%" stopColor="#161616" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <radialGradient id={btnGrad} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#dcdfe2" />
          <stop offset="100%" stopColor="#9aa0a6" />
        </radialGradient>
      </defs>

      {/* Bottom (white) hemisphere */}
      <path d="M3 24a21 21 0 0 0 42 0Z" fill={`url(#${botGrad})`} stroke="#1a1a1a" strokeWidth="2.25" />

      {/* Top (blue) hemisphere */}
      <path d="M3 24a21 21 0 0 1 42 0Z" fill={`url(#${topGrad})`} stroke="#1a1a1a" strokeWidth="2.25" />
      {/* Signature red side stripes */}
      <path d="M8 17c3-4 7-6 10-6.5-2 3-2 6-1 9-4 .5-7-.5-9-2.5Z" fill="#e8483a" stroke="#1a1a1a" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M40 17c-3-4-7-6-10-6.5 2 3 2 6 1 9 4 .5 7-.5 9-2.5Z" fill="#e8483a" stroke="#1a1a1a" strokeWidth="1.1" strokeLinejoin="round" />
      {/* Gloss highlight streak */}
      <path d="M13 10c3-2.2 6-3.4 9-3.6" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Center band */}
      <rect x="2" y="21.4" width="44" height="5.2" fill={`url(#${bandGrad})`} />
      <rect x="2" y="21.4" width="44" height="1.1" fill="#ffffff" fillOpacity="0.15" />

      {/* Outer ring + button */}
      <circle cx="24" cy="24" r="7.4" fill="#111111" />
      <circle cx="24" cy="24" r="6.1" fill={`url(#${btnGrad})`} stroke="#1a1a1a" strokeWidth="1.4" />
      <circle cx="21.8" cy="21.8" r="1.6" fill="#ffffff" fillOpacity="0.9" />

      {/* Outer contour */}
      <circle cx="24" cy="24" r="21" fill="none" stroke="#1a1a1a" strokeWidth="2.25" />
    </svg>
  );
}
