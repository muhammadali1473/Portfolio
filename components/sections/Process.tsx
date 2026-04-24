"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="How We'll Work Together"
          title="A clear process"
          highlight="from idea to launch."
          subtitle="Predictable milestones, no surprises, weekly updates."
        />

        <div ref={ref} className="relative mt-20">
          {/* Desktop horizontal timeline */}
          <div className="relative hidden lg:block">
            <div className="absolute left-[5%] right-[5%] top-8 h-px bg-white/10" />
            <motion.div
              style={{ scaleX: lineScaleX }}
              className="absolute left-[5%] right-[5%] top-8 h-px origin-left bg-gradient-primary"
            />
            <div className="grid grid-cols-5 gap-4 px-[5%]">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-4 grid h-16 w-16 place-items-center rounded-full bg-background">
                    <div className="gradient-border gradient-border-strong flex h-full w-full items-center justify-center rounded-full bg-surface">
                      <step.icon size={22} className="text-foreground" />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Step {step.number}
                  </span>
                  <h3 className="mt-1.5 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="relative lg:hidden">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-white/10" />
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute left-7 top-0 bottom-0 w-px origin-top bg-gradient-primary"
            />
            <div className="flex flex-col gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative flex items-start gap-5 pl-1"
                >
                  <div className="relative z-10 grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-background">
                    <div className="gradient-border gradient-border-strong flex h-full w-full items-center justify-center rounded-full bg-surface">
                      <step.icon size={20} className="text-foreground" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Step {step.number}
                    </span>
                    <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
