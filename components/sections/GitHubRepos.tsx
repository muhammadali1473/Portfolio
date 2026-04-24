"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Github, Loader2, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { GithubRepo } from "@/app/api/github/route";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-sky-400",
  JavaScript: "bg-yellow-300",
  Python: "bg-blue-400",
  Swift: "bg-orange-400",
  Go: "bg-cyan-400",
  Rust: "bg-amber-500",
  HTML: "bg-rose-400",
  CSS: "bg-purple-400",
  Shell: "bg-emerald-400",
  Dart: "bg-sky-300",
};

export function GitHubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error || "Failed to load repos");
        setRepos(data.repos || []);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean) as string[]),
  ).slice(0, 6);

  return (
    <section id="github" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Open Source"
          title="Public work on"
          highlight="GitHub."
          subtitle="Live from GitHub — only public, non-archived repos. Private work stays private."
        />

        {/* Profile header */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-surface/40 p-5 backdrop-blur sm:p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
                <Github size={22} />
              </div>
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  @{site.githubUsername}
                </p>
                <p className="text-lg font-semibold">
                  {loading
                    ? "Loading…"
                    : `${repos.length} public repositor${repos.length === 1 ? "y" : "ies"}`}
                  {!loading && totalStars > 0 && (
                    <span className="ml-3 inline-flex items-center gap-1 text-sm font-normal text-muted-foreground">
                      <Star size={12} fill="currentColor" />
                      {totalStars}
                    </span>
                  )}
                </p>
              </div>
            </div>
            {languages.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        LANG_COLORS[lang] || "bg-white/40",
                      )}
                    />
                    {lang}
                  </span>
                ))}
              </div>
            )}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              View on GitHub
              <ExternalLink size={13} />
            </a>
          </div>
        </Reveal>

        {/* Repo grid */}
        <div className="mt-8">
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl border border-white/10 bg-surface/30"
                />
              ))}
              <div className="col-span-full flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                <Loader2 size={12} className="animate-spin" />
                Fetching public repositories…
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
              Couldn&apos;t load GitHub repositories: {error}
              <div className="mt-2 text-xs opacity-80">
                You can still view them directly at{" "}
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {site.github}
                </a>
                .
              </div>
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-surface/40 p-10 text-center text-sm text-muted-foreground">
              No public repositories yet — stay tuned.
            </div>
          )}

          {!loading && repos.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.slice(0, 12).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-5 backdrop-blur transition-all hover:border-white/20 hover:shadow-glow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Github size={16} className="text-muted-foreground" />
                      <span className="truncate text-sm font-semibold">
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLink
                      size={14}
                      className="flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {repo.description || "No description provided."}
                  </p>
                  {repo.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            LANG_COLORS[repo.language] || "bg-white/40",
                          )}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star size={11} fill="currentColor" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <GitFork size={11} />
                        {repo.forks}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
