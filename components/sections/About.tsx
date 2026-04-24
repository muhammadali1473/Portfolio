"use client";

import { motion } from "framer-motion";
import { ProfileRing } from "@/components/shared/ProfileRing";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";
import { VALUE_CARDS } from "@/lib/constants";

const paragraphs = [
  {
    title: "My Journey",
    body: "I'm a full-stack developer with over 4 years of experience building modern web applications and AI systems. My journey started with traditional web development, but I fell in love with the potential of AI to transform how businesses operate.",
  },
  {
    title: "What I Do",
    body: "Today, I specialize in building AI agents, MCP servers, and smart automation systems that save businesses hours of manual work every week. I've shipped a LinkedIn MCP that helps with lead research and outreach, and I'm building solutions for clients across real estate, coaching, healthcare, and Web3.",
  },
  {
    title: "My Promise",
    body: "I don't just write code. I partner with founders and business owners to understand their challenges and deliver solutions that actually move the needle. Every project is a chance to build something meaningful.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="Developer by craft,"
          highlight="problem-solver by nature."
          subtitle="I build AI-first products for founders who care about details and outcomes."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-4 lg:items-start"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ProfileRing />
            </motion.div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              Remote developer · Building for founders in US, UK, UAE, Australia, Germany &amp; Canada 🌍
            </span>
          </motion.div>

          <div className="flex flex-col gap-8">
            {paragraphs.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="relative pl-6">
                  <span className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-primary/60 via-secondary/60 to-transparent" />
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VALUE_CARDS.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <GlowCard
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="h-full p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
                    <value.icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
