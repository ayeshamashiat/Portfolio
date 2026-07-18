"use client";

// A small original blocky pixel-art netrunner avatar — spiky hair, a neon
// visor, and a chrome jacket, built from the same rect grid as before.
export function TrainerSprite({ size = 72, className = "" }: { size?: number; className?: string }) {
  const primary = "var(--primary, #00fff2)";
  const primaryDark = "color-mix(in srgb, var(--primary, #00fff2) 55%, black)";
  const hair = "var(--secondary, #ff2fd0)";
  const skin = "#c99a7a";
  const visor = "#0a0e14";
  const jacket = "#171c26";
  const shoe = "var(--secondary, #ff2fd0)";

  return (
    <svg
      width={size}
      height={size * (17 / 12)}
      viewBox="0 0 12 17"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* spiky hair */}
      <rect x="2" y="0" width="1" height="1.6" fill={hair} />
      <rect x="4" y="0" width="1" height="2" fill={hair} />
      <rect x="7" y="0" width="1" height="2" fill={hair} />
      <rect x="9" y="0" width="1" height="1.6" fill={hair} />
      <rect x="2.5" y="1.4" width="7" height="2" fill={hair} />

      {/* face */}
      <rect x="3" y="3.4" width="6" height="4" fill={skin} />

      {/* neon visor */}
      <rect x="3" y="4.9" width="6" height="1.4" fill={visor} />
      <rect x="3.4" y="5.2" width="1.8" height="0.8" fill={primary} opacity="0.9" />
      <rect x="6.8" y="5.2" width="1.8" height="0.8" fill={primary} opacity="0.9" />

      {/* body / jacket */}
      <rect x="2" y="7.4" width="8" height="5" fill={jacket} />
      <rect x="5.6" y="7.4" width="0.8" height="5" fill={primary} />
      <rect x="2" y="7.4" width="8" height="0.9" fill={primaryDark} />

      {/* arms */}
      <rect x="0.4" y="7.9" width="1.8" height="4" fill={jacket} />
      <rect x="9.8" y="7.9" width="1.8" height="4" fill={jacket} />
      <rect x="0.4" y="11.5" width="1.8" height="1.3" fill={primary} />
      <rect x="9.8" y="11.5" width="1.8" height="1.3" fill={primary} />

      {/* legs */}
      <rect x="2.8" y="12.4" width="2.8" height="3.6" fill="#0d1118" />
      <rect x="6.4" y="12.4" width="2.8" height="3.6" fill="#0d1118" />
      <rect x="2.8" y="12.4" width="0.6" height="3.6" fill={hair} opacity="0.8" />
      <rect x="8.6" y="12.4" width="0.6" height="3.6" fill={primary} opacity="0.8" />

      {/* shoes */}
      <rect x="2.8" y="15.6" width="2.8" height="1.1" fill={shoe} />
      <rect x="6.4" y="15.6" width="2.8" height="1.1" fill={shoe} />
    </svg>
  );
}
