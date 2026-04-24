"use client";

import { MessageSquareQuote, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ANIMATED_STATS, TRUST_BADGES } from "@/lib/constants";

const APP_STORE_CTAS = [
  {
    label: "View Swipi on App Store",
    href: "https://apps.apple.com/ae/app/swipi-swipe-photo-cleaner/id6758861898",
  },
  {
    label: "View SpendWise on App Store",
    href: "https://apps.apple.com/ae/app/budget-planner-app-spendwise/id6758571585",
  },
  {
    label: "View GitHub repos",
    href: "https://github.com/muhammadali1473",
  },
] as const;

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Trusted by Builders"
          title="Trusted by founders"
          highlight="who care about outcomes."
        />

        {/* Animated counters */}
        <div
          className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-surface/40 p-5 backdrop-blur sm:grid-cols-4 sm:p-6"
          role="list"
          aria-label="Portfolio stats"
        >
          {ANIMATED_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div role="listitem" className="flex flex-col items-center text-center">
                <AnimatedCounter
                  targetValue={s.targetValue}
                  display={s.display}
                  label={s.label}
                  className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl"
                />
                <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TRUST_BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" aria-hidden />
              {b}
            </span>
          ))}
        </div>

        {/* Honest "no testimonials yet" card */}
        <Reveal className="mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-8 backdrop-blur sm:p-10">
            <div
              className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-primary opacity-10 blur-3xl"
              aria-hidden
            />
            <div className="relative flex items-start gap-4">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
                <MessageSquareQuote size={18} aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Transparency note
                </p>
                <blockquote className="mt-2 text-balance text-lg leading-relaxed text-foreground/95 sm:text-xl">
                  Real testimonials coming soon. I&apos;m currently working with my
                  first client cohort — their feedback will live here once projects
                  launch. In the meantime, check out my shipped work on the App
                  Store and GitHub.
                </blockquote>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 pl-0 sm:pl-[60px]">
              {APP_STORE_CTAS.map((cta) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cta.label} (opens in new tab)`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground/90 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {cta.label}
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
