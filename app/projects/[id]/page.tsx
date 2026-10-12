import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { ProjectThumb } from "@/components/shared/ProjectThumb";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ShareLinkButton } from "@/components/shared/ShareLinkButton";

/**
 * One shareable page per project — the same case study the homepage modal
 * shows, but at a real URL that can be pasted into WhatsApp, LinkedIn or a
 * proposal, with its own title, description and preview image.
 */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      // Screenshot projects preview with their real screenshot; the rest fall
      // back to the site-wide OG image.
      ...(project.image && { images: [{ url: project.image, width: 1600, height: 900 }] }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const facts = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Outcome", value: project.outcome },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <article className="container max-w-4xl pb-24 pt-32 sm:pt-36">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> All projects
      </Link>

      <ProjectThumb
        slug={project.thumb}
        title={project.title}
        image={project.image}
        className="mt-6"
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {project.category}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.description}</p>

      {facts.length > 0 && (
        <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {f.label}
              </dt>
              <dd className="mt-1 text-sm font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-8 text-base leading-relaxed text-foreground/90">{project.story}</p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            <ExternalLink size={14} /> Open live site
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium"
          >
            <Github size={14} /> GitHub
          </a>
        )}
        <ShareLinkButton
          path={`/projects/${project.id}`}
          title={project.title}
          className="px-5 py-2.5 text-sm"
        />
      </div>
    </article>
  );
}
