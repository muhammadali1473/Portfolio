"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { STATS, TESTIMONIALS, TRUST_BADGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((v) => (v + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused]);

  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Trusted by Builders"
          title="Trusted by founders"
          highlight="who care about outcomes."
        />

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-surface/40 p-5 backdrop-blur sm:grid-cols-4 sm:p-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold tracking-tight">
                  <AnimatedCounter
                    value={Number(s.value)}
                    suffix={s.suffix}
                    className="gradient-text"
                  />
                </div>
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
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
              {b}
            </span>
          ))}
        </div>

        {/* Testimonial carousel */}
        <div
          className="mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-8 backdrop-blur sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#FCD34D"
                      stroke="#FCD34D"
                      className="drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]"
                    />
                  ))}
                </div>
                <blockquote className="mt-6 text-balance text-xl leading-relaxed text-foreground/95 sm:text-2xl">
                  “{active.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-semibold text-white",
                      active.accent,
                    )}
                  >
                    {active.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{active.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {active.title}, {active.company} · {active.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index ? "w-6 bg-gradient-primary" : "w-1.5 bg-white/20",
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() =>
                    setIndex((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                  }
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => setIndex((v) => (v + 1) % TESTIMONIALS.length)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
