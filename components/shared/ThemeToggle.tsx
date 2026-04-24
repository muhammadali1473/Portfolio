"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      onClick={toggleTheme}
      className={cn(
        "group relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-white/25 hover:bg-white/10",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="absolute grid place-items-center"
          >
            <Moon size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="absolute grid place-items-center"
          >
            <Sun size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
