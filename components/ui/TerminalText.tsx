"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  text: string;
  className?: string;
  delay?: number;
  prefix?: string;
}

export function TerminalText({ text, className, delay = 0, prefix = "> " }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeChar, 50 + Math.random() * 50);
        } else {
          setIsTyping(false);
        }
      };
      typeChar();
    };

    const initialDelay = setTimeout(startTyping, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, delay]);

  return (
    <div className={cn("font-mono text-sm sm:text-base", className)}>
      <span className="text-muted-foreground mr-2">{prefix}</span>
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className={cn("inline-block w-2 h-4 sm:h-5 bg-foreground ml-1 align-middle", {
          "opacity-50": !isTyping,
        })}
      />
    </div>
  );
}
