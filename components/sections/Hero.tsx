"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { ArrowRight, Calendar } from "lucide-react";
import { HERO_STATS } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { GradientText } from "@/components/shared/GradientText";
import { HeroPortrait } from "@/components/shared/HeroPortrait";

const ParticleNetwork = dynamic(() => import("@/components/three/ParticleNetwork"), {
  ssr: false,
});

const words = [
  "Building",
  "Intelligent",
  "Products",
  "for",
  "Ambitious",
  "Businesses",
];

const wordVariants = {
  hidden: { y: 26, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-40">
      <div className="absolute inset-0 -z-10">
        <ParticleNetwork />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30 mask-fade-bottom" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-[0.18] blur-3xl" />
      </div>

      <div className="container grid grid-cols-1 items-center gap-12 pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:pb-32">
        <div className="flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </motion.div>

          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <Balancer>
              {words.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  className="inline-block pr-3"
                >
                  {w === "Intelligent" || w === "Ambitious" ? (
                    <GradientText>{w}</GradientText>
                  ) : (
                    w
                  )}
                </motion.span>
              ))}
            </Balancer>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m Muhammad Ali — a full-stack developer specializing in AI agents,
            MCP servers, and modern digital solutions. I turn complex problems into
            beautiful, scalable software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href="/projects" size="lg" icon={<ArrowRight size={16} />}>
              View My Work
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline" size="lg" icon={<Calendar size={16} />}>
              Book a Free Call
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4 text-sm text-muted-foreground"
          >
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </span>
                  <span>{stat.label}</span>
                </div>
                {i < HERO_STATS.length - 1 && (
                  <span className="hidden h-4 w-px bg-white/10 sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-primary opacity-20 blur-3xl" />
          <HeroPortrait />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
