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
                className="h-full p-6 sm:p-8"
              >
                {/*
                 * Artwork bled to the card edges behind the content. Negative
                 * insets cancel the card padding, and GlowCard's overflow-hidden
                 * clips it back to the rounded corners.
                 *
                 * It is a band rather than a full cover so a wide source keeps
                 * its composition instead of being cropped to its centre. The
                 * paper-coloured scrim thickens downward, so the image reads
                 * around the icon and is solid before the body copy starts.
                 */}
                {service.image && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-6 -right-6 -top-6 h-[54%] sm:-left-8 sm:-right-8 sm:-top-8"
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(250,247,242,0.04) 0%, rgba(250,247,242,0.12) 42%, rgba(250,247,242,0.44) 60%, rgba(250,247,242,0.88) 76%, rgba(250,247,242,0.99) 92%, #FAF7F2 100%)",
                      }}
                    />
                  </div>
                )}

                {/* `relative` so the content stacks above the absolute artwork —
                    without it, the positioned image would paint over this. */}
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 backdrop-blur-sm"
                    style={{
                      // Paper base under the tint, so the tile stays crisp where
                      // it sits directly on the artwork rather than going muddy.
                      backgroundColor: "rgba(250,247,242,0.82)",
                      backgroundImage: `linear-gradient(#${service.tint}26, #${service.tint}26)`,
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
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
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
