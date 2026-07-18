"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface PokeBallProps {
  size?: number;
  className?: string;
  spinning?: boolean;
}

// A small glowing hex-chip "power core" mark — the site's logo, loader, and
// recurring UI glyph. Rotates slowly when `spinning` to read as "active/live".
export function PokeBall({ size = 24, className = "", spinning = false }: PokeBallProps) {
  const uid = useId().replace(/:/g, "");
  const coreGrad = `pc-core-${uid}`;
  const ringGrad = `pc-ring-${uid}`;
  const glow = `pc-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn(spinning && "animate-spin", className)}
      style={spinning ? { animationDuration: "2.2s" } : undefined}
    >
      <defs>
        <linearGradient id={ringGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00fff2" />
          <stop offset="100%" stopColor="#ff2fd0" />
        </linearGradient>
        <radialGradient id={coreGrad} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#00fff2" />
          <stop offset="100%" stopColor="#0a2a2e" />
        </radialGradient>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer hex chip outline */}
      <path
        d="M24 2 42.4 13v22L24 46 5.6 35V13Z"
        fill="rgba(10,16,26,0.6)"
        stroke={`url(#${ringGrad})`}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />

      {/* Circuit pins */}
      <g stroke={`url(#${ringGrad})`} strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
        <path d="M24 2v7" />
        <path d="M24 46v-7" />
        <path d="M5.6 13l6 3.5" />
        <path d="M42.4 35l-6-3.5" />
        <path d="M5.6 35l6-3.5" />
        <path d="M42.4 13l-6 3.5" />
      </g>

      {/* Inner diamond core */}
      <path
        d="M24 15 33 24 24 33 15 24Z"
        fill={`url(#${coreGrad})`}
        filter={`url(#${glow})`}
      />
      <path d="M24 15 33 24 24 33 15 24Z" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}
