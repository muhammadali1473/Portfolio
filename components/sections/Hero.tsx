"use client";

import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { HERO_STATS } from "@/lib/constants";
import { socials } from "@/lib/site";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { GradientText } from "@/components/shared/GradientText";
import { HeroPortrait } from "@/components/shared/HeroPortrait";

/**
 * The three.js particle network, the blurred gradient orb behind the portrait
 * and the faint grid overlay are all gone. What carries the section now is
 * type scale, whitespace and a single gold rule.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative isolate pt-28 sm:pt-32 lg:pt-40">
      <div className="container grid grid-cols-1 items-center gap-14 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-32">
        <div className="flex flex-col items-start gap-7">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Available for new projects
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]"
          >
            <Balancer>
              Building <GradientText>Intelligent</GradientText> Products for{" "}
              <GradientText>Ambitious</GradientText> Businesses
            </Balancer>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            aria-hidden
            className="rule-gold h-px w-32"
          />

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m Muhammad Ali — a full-stack developer specializing in AI agents,
            MCP servers, and modern digital solutions. I turn complex problems into
            beautiful, scalable software.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            // w-full because the column parent is items-start: without it this
            // row shrinks to its widest button (~199px) and the phone CTAs sit
            // at half the screen width. Back to auto once they go side by side.
            className="flex w-full flex-col items-stretch gap-3 pt-1 sm:w-auto sm:flex-row sm:items-center"
          >
            <MagneticButton href="/#projects" size="lg" icon={<ArrowRight size={16} />}>
              View My Work
            </MagneticButton>
            <MagneticButton href="/#contact" variant="outline" size="lg" icon={<Calendar size={16} />}>
              Book a Free Call
            </MagneticButton>
            {/* Bordered like the call CTA so it reads as a real action — the
                paper fill and gold hairline keep it a step below the ink fill
                without dropping it to invisible grey text. */}
            {socials.resume && (
              <MagneticButton
                href={socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={<FileText size={16} />}
                className="border-primary/40 bg-surface/70 hover:border-primary/70"
              >
                View CV
              </MagneticButton>
            )}
          </motion.div>

          <motion.dl
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 grid w-full grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-7 text-sm text-muted-foreground sm:grid-cols-4"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
                <span aria-hidden className="font-mono text-[11px] uppercase tracking-[0.16em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
