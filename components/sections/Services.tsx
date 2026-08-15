"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="What I Build"
          title="End-to-end digital solutions"
          highlight="for modern businesses."
          subtitle="From first idea to live product — and everything in between."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <GlowCard
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full"
              >
                {/*
                 * Artwork as a full-bleed band across the top of the card, with
                 * the copy stacked underneath rather than over it. Sitting the
                 * text on the image meant the scrim had to be heavy enough to
                 * read against, which left the artwork a barely-visible ghost.
                 *
                 * The six sources are a mixed bag — light line illustrations
                 * next to saturated stock photography — so the band applies a
                 * shared treatment: desaturate, a warm paper wash, and a fade
                 * into the card surface so the band has no hard seam.
                 */}
                {service.image && (
                  <div
                    aria-hidden
                    className="pointer-events-none relative h-32 w-full overflow-hidden sm:h-36"
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center saturate-[.55] sepia-[.32] brightness-[1.06] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Warm wash — the sepia above pulls the cool stock photos
                        toward the paper palette, this softens what is left. */}
                    <div className="absolute inset-0 bg-[hsl(var(--surface))] opacity-[0.18]" />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-[hsl(var(--surface))]" />
                  </div>
                )}

                {/* `relative` keeps the copy on its own layer above the band's
                    fade, so the gradient never paints over the icon tile. */}
                <div className="relative p-6 pt-5 sm:p-8 sm:pt-6">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="grid h-12 w-12 place-items-center rounded-xl"
                    style={{
                      backgroundColor: `#${service.tint}1F`,
                      border: `1px solid #${service.tint}2E`,
                      color: `#${service.tint}`,
                    }}
                  >
                    <service.icon size={22} strokeWidth={2} />
                  </motion.div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/#contact"
                    // py-2 with a matching -mb-2 grows the thumb target from
                    // 20px to 36px without moving anything visually.
                    className="mt-4 -mb-2 inline-flex items-center gap-1 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Learn More
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
