"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BrandIcon } from "@/components/shared/BrandIcons";
import { SkillDots } from "@/components/shared/SkillDots";
import { TECH_STACK } from "@/lib/constants";

export function TechStack() {
  return (
    <section id="tech" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Tools I Master"
          title="The stack behind"
          highlight="my work."
          subtitle="A practical toolkit battle-tested across dozens of real projects."
        />

        <div className="mt-14 flex flex-col gap-10">
          {TECH_STACK.map((category, catIdx) => (
            <div key={category.label}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex items-center gap-3"
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {String(catIdx + 1).padStart(2, "0")} / {category.label}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {category.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.06] hover:shadow-glow"
                  >
                    <BrandIcon brand={item.brand} />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium">{item.name}</span>
                      <SkillDots level={item.level} className="mt-1 opacity-60 transition-opacity group-hover:opacity-100" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
