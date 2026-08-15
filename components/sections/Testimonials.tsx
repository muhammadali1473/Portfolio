"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TRUST_BADGES } from "@/lib/constants";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Trusted by Builders"
          title="Trusted by founders"
          highlight="who care about outcomes."
        />

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
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

      </div>
    </section>
  );
}
