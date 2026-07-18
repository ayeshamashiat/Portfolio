"use client";

export type PokemonType =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "steel"
  | "ground"
  | "fairy"
  | "normal"
  | "ghost"
  | "dragon";

export const TYPE_COLORS: Record<PokemonType, { color: string; label: string }> = {
  fire: { color: "#ee8130", label: "Fire" },
  water: { color: "#6390f0", label: "Water" },
  grass: { color: "#7ac74c", label: "Grass" },
  electric: { color: "#e8c200", label: "Electric" },
  psychic: { color: "#f95587", label: "Psychic" },
  steel: { color: "#8f9bb3", label: "Steel" },
  ground: { color: "#b6875a", label: "Ground" },
  fairy: { color: "#d685ad", label: "Fairy" },
  normal: { color: "#a0a29e", label: "Normal" },
  ghost: { color: "#735797", label: "Ghost" },
  dragon: { color: "#6f35fc", label: "Dragon" },
};

// Small original glyphs, one per type — a shared visual vocabulary reused as
// a colored dot's replacement everywhere a type shows up on the site.
function TypeGlyph({ type, size = 10 }: { type: PokemonType; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (type) {
    case "fire":
      return (
        <svg {...common}>
          <path d="M12 2c1.5 3.5-1 4.5-1.5 7a3.5 3.5 0 1 0 7 0c0-1.3-.8-2.2-1.2-3.3 2.3 1.3 3.7 3.6 3.7 6.3a6 6 0 1 1-12 0c0-4 2.7-7 4-10Z" />
        </svg>
      );
    case "water":
      return (
        <svg {...common}>
          <path d="M12 2c3.5 4.6 7 9 7 13a7 7 0 1 1-14 0c0-4 3.5-8.4 7-13Z" />
        </svg>
      );
    case "grass":
      return (
        <svg {...common}>
          <path d="M4 21C4 10.5 12.5 3 21 3c0 10.5-8.5 18-17 18Zm0 0c2-4 5-7 9-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "electric":
      return (
        <svg {...common}>
          <path d="M13 2 4.5 14H11l-1.5 8 9-13H12l1-7Z" />
        </svg>
      );
    case "psychic":
      return (
        <svg {...common}>
          <path d="M2 12s4.5-7 10-7 10 7 10 7-4.5 7-10 7-10-7-10-7Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "steel":
      return (
        <svg {...common}>
          <path d="M12 3 16.5 5.6 16.5 11 21 14 16.5 17 16.5 20.4 12 23 7.5 20.4 7.5 17 3 14 7.5 11 7.5 5.6Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="2.6" />
        </svg>
      );
    case "ground":
      return (
        <svg {...common}>
          <path d="M2 19a10 6 0 0 1 20 0Z" />
          <path d="M8 19a4 3 0 0 1 8 0" fill="none" stroke="#00000030" strokeWidth="1.4" />
        </svg>
      );
    case "fairy":
      return (
        <svg {...common}>
          <path d="M12 2 14 9.5 21.5 11.5 14 13.5 12 21 10 13.5 2.5 11.5 10 9.5Z" />
        </svg>
      );
    case "normal":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.6" />
        </svg>
      );
    case "ghost":
      return (
        <svg {...common}>
          <path d="M6 20V11a6 6 0 0 1 12 0v9c-1 1-2-1-3 0s-2 1-3 0-2 1-3 0-2 1-3 0Z" />
          <circle cx="9.5" cy="11" r="1.1" fill="#00000060" />
          <circle cx="14.5" cy="11" r="1.1" fill="#00000060" />
        </svg>
      );
    case "dragon":
      return (
        <svg {...common}>
          <path d="M3 13c4-2 8-2 10 0 2-4 5-7 8-8-1 4-3 7-6 9 2 0 4 1 5 3-4 1-8 0-10-2-2 3-4 5-7 6 1-3 1-6 0-8Z" />
        </svg>
      );
  }
}

export function TypeBadge({
  type,
  label,
  className = "",
}: {
  type: PokemonType;
  label?: string;
  className?: string;
}) {
  const meta = TYPE_COLORS[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-display tracking-wide ${className}`}
      style={{
        color: meta.color,
        backgroundColor: `color-mix(in srgb, ${meta.color} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${meta.color} 35%, transparent)`,
      }}
    >
      <TypeGlyph type={type} size={11} />
      {label ?? meta.label}
    </span>
  );
}

export function TypeIcon({ type, size = 20, className = "" }: { type: PokemonType; size?: number; className?: string }) {
  const meta = TYPE_COLORS[type];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        color: meta.color,
        backgroundColor: `color-mix(in srgb, ${meta.color} 16%, transparent)`,
        border: `1px solid color-mix(in srgb, ${meta.color} 40%, transparent)`,
      }}
    >
      <TypeGlyph type={type} size={size * 0.55} />
    </span>
  );
}
