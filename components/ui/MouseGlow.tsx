"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MouseGlow({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-30 transition-opacity duration-300",
        className
      )}
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), color-mix(in srgb, var(--primary) 10%, transparent) 0%, color-mix(in srgb, var(--secondary) 5%, transparent) 45%, transparent 80%)`,
      }}
    />
  );
}

