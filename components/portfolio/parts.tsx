"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  UpworkIcon,
} from "@/components/shared/SocialIcons";
import { FEATURED_PROJECTS, SERVICES } from "@/lib/constants";
import { site } from "@/lib/site";
import { Reveal, staggerItem, EASE } from "@/components/portfolio/motion";

/**
 * Building blocks for the redesigned one-page homepage: a greyscale cloudy
 * backdrop, a floating white "page card", a big outline+solid name, black pill
 * buttons, a green availability dot — all animated with framer-motion.
 */

const MotionLink = motion(Link);

export const WORK_COUNT = FEATURED_PROJECTS.length;
export const SERVICE_COUNT = SERVICES.length;

/* --------------------------------------------------------------------------- */
/* Page card with a cursor-following spotlight                                 */
/* --------------------------------------------------------------------------- */

/**
 * The floating white page card. A plain container — no cursor-following tint,
 * so moving the mouse never recolours the photo, the name or anything else
 * inside it. Works identically on touch and desktop.
 */
export function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#f4f4f5] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------- */
/* Shared bits                                                                 */
/* --------------------------------------------------------------------------- */

export function AvailablePill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.06)] ring-1 ring-black/5 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-70" />
        <span className="relative h-2 w-2 rounded-full bg-green-500" />
      </span>
      Available for New Project
    </span>
  );
}

/** Solid black pill button with a hover/tap micro-interaction. */
export function DarkButton({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white ${className}`;
  const hover = { scale: 1.04 };
  const tap = { scale: 0.96 };
  const inner = (
    <>
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </>
  );
  return external ? (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      whileHover={hover}
      whileTap={tap}
    >
      {inner}
    </motion.a>
  ) : (
    <MotionLink href={href} className={cls} whileHover={hover} whileTap={tap}>
      {inner}
    </MotionLink>
  );
}

/* --------------------------------------------------------------------------- */
/* Cloudy backdrop                                                             */
/* --------------------------------------------------------------------------- */

export function CloudBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[#b4b8ba]"
    >
      {/* Real greyscale overcast-sky photo, drifting almost imperceptibly. */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/clouds-backdrop.jpg')" }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 18, ease: "easeOut" }}
      />
      {/* Soft vignette: keeps the edges calm and the white page-card popping. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 18%, rgba(255,255,255,0.10), rgba(120,124,127,0.32) 86%)",
        }}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------- */
/* Top navigation                                                              */
/* --------------------------------------------------------------------------- */

const NAV = [
  { label: "Work", meta: `[${WORK_COUNT}]`, href: "#work" },
  { label: "Service", meta: `[${SERVICE_COUNT}]`, href: "#service" },
  { label: "Experience", meta: "[4y+]", href: "#experience" },
  { label: "Contact", meta: "", href: "#contact" },
];

export function PortfolioNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-7"
    >
      <span className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-neutral-900 sm:hidden">
        Muhammad Ali
      </span>
      <AvailablePill className="hidden sm:inline-flex" />
      <nav className="hidden items-center gap-7 md:flex">
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="group relative inline-flex items-center gap-1 text-[15px] font-medium text-neutral-700 transition-colors hover:text-neutral-950"
          >
            {n.label}
            {n.meta && (
              <span className="text-[11px] text-neutral-400 group-hover:text-neutral-500">
                {n.meta}
              </span>
            )}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <DarkButton href="#contact" className="px-5 py-2.5">
        Let&apos;s Talk
      </DarkButton>
    </motion.header>
  );
}

/* --------------------------------------------------------------------------- */
/* Hero                                                                        */
/* --------------------------------------------------------------------------- */

const SOCIALS = [
  { label: "GitHub", href: site.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedInIcon },
  { label: "X", href: site.x, Icon: XIcon },
  { label: "Upwork", href: site.upwork, Icon: UpworkIcon },
];

function SocialPill({
  label,
  href,
  Icon,
}: {
  label: string;
  href: string;
  Icon: (p: { size?: number; className?: string }) => React.ReactElement;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: -4, scale: 1.04 }}
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5"
    >
      <Icon size={15} className="text-neutral-700" />
      {label}
    </motion.a>
  );
}

function RoleBlock() {
  return (
    <div className="max-w-xs">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-neutral-900 sm:text-[28px]">
        Full-Stack &amp; AI Developer
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
        Building AI agents, MCP servers and web apps that are clear, usable and
        built to convert.
      </p>
      <DarkButton href="#contact" className="mt-5">
        Let&apos;s collaborate
      </DarkButton>
    </div>
  );
}

export function PortfolioHero() {
  return (
    <section id="top" className="relative px-5 pb-10 pt-8 sm:px-8">
      {/* Giant one-line name — first name outlined, last name solid */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="select-none whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[clamp(1.6rem,10vw,8rem)] font-extrabold leading-none tracking-tight"
      >
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: "2px #1a1a1a" }}
        >
          MUHAMMAD
        </span>{" "}
        <span className="text-neutral-900">ALI</span>
      </motion.h1>

      {/* Composition: portrait centered, head rising into the name; role block
          and social rail pinned to the lower corners on desktop. */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="relative z-10 -mt-[7vw] flex justify-center lg:-mt-24"
        >
          <Image
            src="/hero-photo.png"
            alt="Muhammad Ali"
            width={620}
            height={720}
            priority
            className="h-[min(56vh,520px)] w-auto object-contain grayscale transition duration-700 ease-out hover:grayscale-0"
          />
        </motion.div>

        {/* Desktop: absolute lower corners */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          className="absolute bottom-2 left-0 z-20 hidden sm:block"
        >
          <RoleBlock />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
          className="absolute bottom-2 right-0 z-20 hidden flex-col items-end gap-3 sm:flex"
        >
          {SOCIALS.map((s) => (
            <motion.div key={s.label} variants={staggerItem}>
              <SocialPill {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: stacked below the portrait */}
      <div className="mt-6 flex flex-col items-center gap-6 text-center sm:hidden">
        <RoleBlock />
        <div className="flex flex-wrap justify-center gap-2">
          {SOCIALS.map((s) => (
            <SocialPill key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* Service (big-row list)                                                      */
/* --------------------------------------------------------------------------- */

export function ServiceList() {
  return (
    <section id="service" className="relative px-5 py-16 sm:px-10 sm:py-24">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -z-0 -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[16vw] font-extrabold uppercase tracking-tight text-neutral-200/60"
      >
        Service
      </span>

      <Reveal>
        <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          <span className="text-neutral-400">/</span>SERVICE
        </h2>
      </Reveal>

      <div className="relative mt-10 border-y border-neutral-200">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            className={i > 0 ? "border-t border-neutral-200" : ""}
          >
            <Link
              href="#contact"
              className="group relative flex items-center gap-4 py-6 sm:gap-6"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium uppercase tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-neutral-950 sm:text-[2rem]">
                  {s.title}
                </h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm text-neutral-500 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                  {s.description}
                </p>
              </div>

              {/* Service artwork — always shown, grows on hover */}
              {s.image && (
                <div
                  className="h-14 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-200 bg-cover bg-center ring-1 ring-black/5 grayscale transition-all duration-300 group-hover:grayscale-0 sm:h-16 sm:w-32"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
              )}

              <ArrowUpRight
                size={26}
                className="shrink-0 text-neutral-300 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-neutral-900"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* Contact CTA + compact footer                                                */
/* --------------------------------------------------------------------------- */

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center px-5 py-24 text-center sm:py-32"
    >
      <Reveal>
        <AvailablePill />
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-6xl">
          Have a project in mind?
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-500">
          Together, we can build something clear and impactful. Let&apos;s
          collaborate to bring your idea to life in a way that actually converts.
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <DarkButton href="/contact" className="mt-7 px-7 py-3.5">
          Contact Me
        </DarkButton>
      </Reveal>
    </section>
  );
}

export function MiniFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 px-6 py-6 text-sm text-neutral-500 sm:flex-row sm:px-10">
      <span>
        © {year} {site.name}
      </span>
      <div className="flex items-center gap-5">
        {SOCIALS.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="text-neutral-500 transition-colors hover:text-neutral-900"
            aria-label={s.label}
          >
            <s.Icon size={17} />
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
