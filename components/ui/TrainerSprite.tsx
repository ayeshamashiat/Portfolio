"use client";

// A small original blocky pixel-art trainer avatar — generic silhouette
// (cap, face, jacket, jeans) in the site's primary color, not tracing any
// official character sprite.
export function TrainerSprite({ size = 72, className = "" }: { size?: number; className?: string }) {
  const primary = "var(--primary, #e3350d)";
  const primaryDark = "color-mix(in srgb, var(--primary, #e3350d) 70%, black)";
  const skin = "#f2c08c";
  const denim = "#33455e";
  const shoe = "#20242b";

  return (
    <svg
      width={size}
      height={size * (17 / 12)}
      viewBox="0 0 12 17"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* cap */}
      <rect x="1" y="3" width="10" height="1.6" fill={primaryDark} />
      <rect x="2.5" y="0" width="7" height="3.4" fill={primary} />
      <rect x="7.6" y="0.6" width="1.6" height="1.2" fill="#ffffff" opacity="0.85" />

      {/* face */}
      <rect x="3" y="3.4" width="6" height="4" fill={skin} />
      <rect x="4" y="5.6" width="0.9" height="0.9" fill="#1a1a1a" />
      <rect x="7" y="5.6" width="0.9" height="0.9" fill="#1a1a1a" />

      {/* body / jacket */}
      <rect x="2" y="7.4" width="8" height="5" fill={primary} />
      <rect x="5.6" y="7.4" width="0.8" height="5" fill={primaryDark} />

      {/* arms */}
      <rect x="0.4" y="7.9" width="1.8" height="4" fill={primary} />
      <rect x="9.8" y="7.9" width="1.8" height="4" fill={primary} />
      <rect x="0.4" y="11.5" width="1.8" height="1.3" fill={skin} />
      <rect x="9.8" y="11.5" width="1.8" height="1.3" fill={skin} />

      {/* legs */}
      <rect x="2.8" y="12.4" width="2.8" height="3.6" fill={denim} />
      <rect x="6.4" y="12.4" width="2.8" height="3.6" fill={denim} />

      {/* shoes */}
      <rect x="2.8" y="15.6" width="2.8" height="1.1" fill={shoe} />
      <rect x="6.4" y="15.6" width="2.8" height="1.1" fill={shoe} />
    </svg>
  );
}
