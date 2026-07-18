"use client";

import { useId } from "react";

// A generic Hall of Fame trophy medallion, tinted per achievement. Stands in
// for gym badges without imitating any specific franchise artwork.
export function TrophyMedal({ color = "#f0c020", size = 56 }: { color?: string; size?: number }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `trophy-glow-${uid}`;
  const dark = `color-mix(in srgb, ${color} 65%, black)`;

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="40%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0c0e12" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill={`url(#${gradId})`} stroke={color} strokeWidth="2" />

      {/* handles */}
      <path d="M16 12c-4.2 0-6.5 2.2-6.5 5.4s2.3 5.6 6.5 5.6" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 12c4.2 0 6.5 2.2 6.5 5.4s-2.3 5.6-6.5 5.6" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

      {/* bowl */}
      <path d="M16 10h16v8.5a8 8 0 0 1-16 0V10Z" fill={color} stroke={dark} strokeWidth="0.6" />
      <ellipse cx="19.5" cy="14" rx="2.6" ry="3.4" fill="#ffffff" opacity="0.35" />

      {/* stem + base */}
      <rect x="21.3" y="26.5" width="5.4" height="6" fill={color} />
      <path d="M15.5 34.5h17l-1.8 4.2h-13.4Z" fill={color} />
      <rect x="13.5" y="38.7" width="21" height="3.4" rx="1.2" fill={dark} />

      {/* star */}
      <path d="M24 11.5 25.4 14.6 28.8 15 26.3 17.3 27 20.7 24 19 21 20.7 21.7 17.3 19.2 15 22.6 14.6Z" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
