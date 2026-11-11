import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { ProjectThumb } from "@/components/shared/ProjectThumb";
import { ShareLinkButton } from "@/components/shared/ShareLinkButton";
import {
  CloudBackdrop,
  DarkButton,
  AvailablePill,
} from "@/components/portfolio/parts";

/**
 * One shareable page per project, styled to match the redesigned homepage: a
 * cloudy-grey backdrop with a floating white card — back link, tags, title,
 * live/contact CTAs, a Service / Timeline / Tools meta rail, and the screenshot.
 * The global header/footer are suppressed on `/projects/*` (see Navigation).
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
      ...(project.image && {
        images: [{ url: project.image, width: 1600, height: 900 }],
      }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  const meta = [
    { label: "Service", value: project.category },
    { label: "Timeline", value: project.delivered || project.status },
    { label: "Client", value: project.client },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  return (
    <div className="font-[family-name:var(--font-display)]">
      <CloudBackdrop />
      <div className="mx-auto max-w-[1200px] px-3 py-4 sm:px-5 sm:py-6">
        <div className="overflow-hidden rounded-[28px] bg-[#f4f4f5] px-6 py-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] sm:px-12 sm:py-12">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-transform hover:-translate-x-0.5"
            >
              <ArrowLeft size={16} /> Back
            </Link>
            <AvailablePill className="hidden sm:inline-flex" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Left: title block */}
            <div>
              <div className="flex flex-wrap gap-2">
                <Tag>{project.category}</Tag>
                {project.client && <Tag>{project.client.split("(")[0].trim()}</Tag>}
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl">
                {project.title.split(/[—-]/)[0].trim()}
                <span className="ml-3 align-middle text-lg font-medium text-neutral-400 sm:text-2xl">
                  /{project.category}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-500">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {project.demoUrl && (
                  <DarkButton href={project.demoUrl} external className="px-6">
                    Live Preview
                  </DarkButton>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
                >
                  Contact Me
                </Link>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
                  >
                    <Github size={15} /> Code
                  </a>
                )}
                <ShareLinkButton
                  path={`/projects/${project.id}`}
                  title={project.title}
                  className="rounded-full bg-white px-5 py-3 text-sm text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5"
                />
              </div>
            </div>

            {/* Right: meta rail */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:block lg:space-y-6 lg:text-right">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[13px] text-neutral-400">{m.label}</dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold text-neutral-900">
                    {m.value}
                  </dd>
                </div>
              ))}
              <div className="col-span-2 lg:col-span-1">
                <dt className="text-[13px] text-neutral-400">Tools</dt>
                <dd className="mt-2 flex flex-wrap gap-2 lg:justify-end">
                  {project.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </dd>
              </div>
            </div>
          </div>

          {/* Screenshot (or the project's bespoke mockup) */}
          <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-black/5 [&>div]:rounded-2xl [&>div]:border-0">
            <ProjectThumb
              slug={project.thumb}
              title={project.title}
              image={project.image}
            />
          </div>

          {/* Story */}
          <div className="mx-auto mt-12 max-w-2xl">
            <p className="text-[15px] leading-relaxed text-neutral-600">
              {project.story}
            </p>
            <p className="mt-6 text-sm font-medium text-neutral-500">
              Outcome — {project.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 ring-1 ring-black/5">
      {children}
    </span>
  );
}
