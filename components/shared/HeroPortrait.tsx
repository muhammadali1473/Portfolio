"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hero portrait card. The slow float lives on an outer wrapper as a CSS
 * animation so it can't fight framer-motion's transform on the hover layer.
 */
export function HeroPortrait({
  src = "/hero-portrait.png",
  alt = "Muhammad Ali",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn("relative", className)}
    >
      <div className="animate-float-slow">
        <motion.div
          whileHover={{ scale: 1.03, y: -8 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className="group relative rounded-[2rem] bg-gradient-primary p-[2px] shadow-glow transition-shadow duration-500 hover:shadow-glow-lg"
        >
          <div className="relative aspect-square overflow-hidden rounded-[calc(2rem-2px)] bg-surface">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 448px, 520px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              style={{ objectPosition: "center 22%" }}
            />

            {/* Grounds the photo against the page and keeps the bottom edge soft */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />

            {/* Sheen that sweeps across on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[calc(2rem-2px)] ring-1 ring-inset ring-white/10"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
