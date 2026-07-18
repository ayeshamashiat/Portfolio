// Static full-viewport CRT scanline texture — subtle, non-interactive.
export function ScanlineOverlay() {
  return <div className="pointer-events-none fixed inset-0 z-40 crt-overlay" aria-hidden />;
}
