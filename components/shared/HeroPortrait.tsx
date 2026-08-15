"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The portrait, mounted rather than decorated.
 *
 * The frame is filled with `band` (#B8A68F) — the exact backdrop colour sampled
 * from the photograph — so the image edge meets the mount with no visible seam,
 * and the whole block reads as one warm shape sitting on the lighter page.
 *
 * Gone from the previous version: the slow float, the gradient border, the
 * purple glow, and the sheen that swept across on hover. A still photograph
 * should stay still.
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
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn("relative", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-band shadow-glow">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 448px, 520px"
          className="object-cover"
          style={{ objectPosition: "center 18%" }}
        />

        {/* Hairline mount edge, drawn inside so it survives the rounded corners */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10"
        />
      </div>

      {/* A single gold rule under the portrait, echoing the heading underline */}
      <div
        aria-hidden
        className="rule-gold mt-5 h-px w-2/3"
      />
    </motion.div>
  );
}
