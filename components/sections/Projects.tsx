"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, type MouseEvent } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProjectThumb } from "@/components/shared/ProjectThumb";
import { Reveal } from "@/components/shared/Reveal";
import { FEATURED_PROJECTS, type Project } from "@/lib/constants";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const rotX = useTransform(srx, (v) => `${v}deg`);
  const rotY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -6);
    ry.set(px * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-4 backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-glow-lg sm:p-5">
        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-primary-soft" />
        </div>

        <ProjectThumb slug={project.thumb} title={project.title} />

        <div className="mt-5 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-4 py-1.5 text-xs font-semibold text-white shadow-glow transition-all hover:brightness-110"
          >
            View Case Study
          </button>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:text-foreground"
            >
              <ExternalLink size={12} /> Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:text-foreground"
            >
              <Github size={12} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-surface/95 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10"
            >
              <X size={16} />
            </button>
            <ProjectThumb slug={project.thumb} title={project.title} />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="text-sm text-muted-foreground">{project.outcome}</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/90">
              {project.story}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow"
                >
                  <ExternalLink size={14} /> Open Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium"
                >
                  <Github size={14} /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28" style={{ perspective: 1400 }}>
      <div className="container">
        <SectionHeading
          eyebrow="Featured Work"
          title="A glimpse into"
          highlight="what I build."
          subtitle="Case studies from real client engagements and in-flight projects."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProjectCard project={p} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
