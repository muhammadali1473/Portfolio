"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Info, Loader2, Star } from "lucide-react";
// The real Octocat, not lucide's stylised outline of it.
import { GitHubIcon as Github } from "@/components/shared/SocialIcons";
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
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/github", { signal: controller.signal });
        const data = await res.json();
        if (controller.signal.aborted) return;
        setRepos(data.repos || []);
        setIsFallback(Boolean(data.fallback));
      } catch {
        // Keep empty — the API route itself now returns fallbacks. This catch
        // only fires on a network-level failure of our own endpoint.
        setIsFallback(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
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
              {/* GitHub's brand colour is near-black, so the tile follows the
                  theme foreground rather than painting an invisible logo. */}
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground">
                <Github size={22} aria-hidden />
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
                      <Star size={12} fill="currentColor" aria-hidden />
                      {totalStars}
                    </span>
                  )}
                </p>
              </div>
            </div>
            {languages.length > 0 && (
              <div
                className="flex flex-wrap items-center gap-2"
                role="list"
                aria-label="Languages used across repos"
              >
                {languages.map((lang) => (
                  <span
                    key={lang}
                    role="listitem"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        LANG_COLORS[lang] || "bg-white/40",
                      )}
                      aria-hidden
                    />
                    {lang}
                  </span>
                ))}
              </div>
            )}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Muhammad Ali's GitHub profile (opens in new tab)`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              View on GitHub
              <ExternalLink size={13} aria-hidden />
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
                  aria-hidden
                />
              ))}
              <div
                className="col-span-full flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <Loader2 size={12} className="animate-spin" aria-hidden />
                Fetching public repositories…
              </div>
            </div>
          )}

          {!loading && repos.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-surface/40 p-10 text-center text-sm text-muted-foreground">
              No public repositories to show yet. Head over to{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @{site.githubUsername}
              </a>
              .
            </div>
          )}

          {!loading && repos.length > 0 && (
            <>
              {isFallback && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-surface/40 px-4 py-2.5 text-xs text-muted-foreground">
                  <Info size={13} aria-hidden />
                  GitHub API is currently rate-limited — showing a curated snapshot. Full
                  list lives on GitHub.
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.slice(0, 6).map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${repo.name} repository on GitHub (opens in new tab)`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-5 backdrop-blur transition-all hover:border-white/20 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Github size={16} className="text-muted-foreground" aria-hidden />
                        <span className="truncate text-sm font-semibold">
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink
                        size={14}
                        className="flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
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
                            aria-hidden
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1" aria-label={`${repo.stars} stars`}>
                        <Star size={11} fill="currentColor" aria-hidden />
                        {repo.stars}
                      </span>
                      <span className="inline-flex items-center gap-1" aria-label={`${repo.forks} forks`}>
                        <GitFork size={11} aria-hidden />
                        {repo.forks}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View all repositories on GitHub (opens in new tab)`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <Github size={15} aria-hidden />
                  View All on GitHub
                  <ExternalLink size={13} aria-hidden />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
