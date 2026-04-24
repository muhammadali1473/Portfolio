"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type GlowCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  intensity?: "subtle" | "strong";
  children?: ReactNode;
};

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(function GlowCard(
  { className, children, intensity = "subtle", ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass gradient-border",
        intensity === "strong" && "gradient-border-strong",
        "transition-transform duration-300",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.12), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});
