"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The portrait, cut out and standing directly on the page — no card, no frame,
 * no mount. The background was removed with a human-segmentation model, so the
 * silhouette (including hair edges) is genuine rather than a rectangle.
 *
 * Two details keep it from reading as a sticker:
 *  - the torso is masked out at the bottom, so he dissolves into the page
 *    instead of ending on a hard crop line
 *  - a soft band-coloured halo sits behind him, echoing the backdrop colour the
 *    photograph was actually shot against
 */
export function HeroPortrait({
  src = "/hero-photo.png",
  alt = "Muhammad Ali",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn("relative", className)}
    >
      {/* Warm halo — the photograph's own backdrop colour, diffused. Gives the
          figure something to sit against so he does not float in dead space. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[78%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-band opacity-30 blur-3xl"
      />

      <div className="relative aspect-[1141/1144] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 420px, 680px"
          className="object-contain object-bottom"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.55) 89%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.55) 89%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
