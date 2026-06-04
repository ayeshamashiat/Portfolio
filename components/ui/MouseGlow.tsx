"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MouseGlow({ className }: { className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
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
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.07) 0%, rgba(168, 85, 247, 0.03) 50%, transparent 80%)`,
      }}
    />
  );
}
