"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type GlowCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  intensity?: "subtle" | "strong";
  children?: ReactNode;
};

/**
 * Name kept for its ~14 call sites; the glow is not. The purple radial that
 * used to track the cursor is replaced by a warm paper surface, a hairline, and
 * a shadow that lifts a few pixels on hover — the card behaves like card stock.
 */
export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(function GlowCard(
  { className, children, intensity = "subtle", ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/70",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-surface hover:shadow-glow",
        intensity === "strong" && "bg-surface shadow-glow",
        className,
      )}
      {...props}
    >
      {/* Gold hairline along the top edge, revealed on hover */}
      <div
        aria-hidden
        className="rule-gold pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});
