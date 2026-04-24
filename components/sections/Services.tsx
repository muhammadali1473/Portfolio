"use client";

import { motion } from "framer-motion";
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
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow"
                  >
                    <service.icon size={22} strokeWidth={2} />
                  </motion.div>
                  <span className="text-2xl opacity-70">{service.emoji}</span>
                </div>

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
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Learn More
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
