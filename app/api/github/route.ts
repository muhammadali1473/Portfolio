import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";
// Cache for 1 hour on the server — avoids hitting GitHub's 60-req/hr unauthenticated limit
export const revalidate = 3600;

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  homepage: string | null;
};

// Fallback data if the GitHub API is unreachable or rate-limited.
// Keeps the "Open Source" section from stalling on "Loading…" forever.
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: -1,
    name: "linkedin-mcp-server",
    description: "Custom MCP server for LinkedIn automation",
    htmlUrl: `${site.github}/linkedin-mcp-server`,
    language: "Python",
    stars: 0,
    forks: 0,
    topics: ["mcp", "linkedin", "python", "ai-agents"],
    updatedAt: new Date().toISOString(),
    homepage: null,
  },
  {
    id: -2,
    name: "x-mcp-builder",
    description: "MCP server for X/Twitter scheduling and analytics",
    htmlUrl: `${site.github}/x-mcp-builder`,
    language: "TypeScript",
    stars: 0,
    forks: 0,
    topics: ["mcp", "twitter", "x", "typescript"],
    updatedAt: new Date().toISOString(),
    homepage: null,
  },
  {
    id: -3,
    name: "ai-portfolio-site",
    description: "My portfolio with live AI demos powered by Groq",
    htmlUrl: `${site.github}/ai-portfolio-site`,
    language: "TypeScript",
    stars: 0,
    forks: 0,
    topics: ["nextjs", "groq", "portfolio"],
    updatedAt: new Date().toISOString(),
    homepage: null,
  },
  {
    id: -4,
    name: "swipi-photo-cleaner",
    description: "iOS app for Tinder-style photo cleanup",
    htmlUrl: `${site.github}/swipi-photo-cleaner`,
    language: "Swift",
    stars: 0,
    forks: 0,
    topics: ["ios", "swift", "photos"],
    updatedAt: new Date().toISOString(),
    homepage: null,
  },
];

export async function GET() {
  try {
    // Spec: sort=updated, per_page=6 — filter out archived below.
    const res = await fetch(
      `https://api.github.com/users/${site.githubUsername}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "muhammadali-portfolio",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { repos: FALLBACK_REPOS, username: site.githubUsername, fallback: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        },
      );
    }

    const raw = (await res.json()) as Array<{
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      topics: string[];
      updated_at: string;
      homepage: string | null;
      private: boolean;
      fork: boolean;
      archived: boolean;
    }>;

    const repos: GithubRepo[] = raw
      // Only public, non-fork, non-archived
      .filter((r) => !r.private && !r.fork && !r.archived)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        htmlUrl: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        topics: r.topics ?? [],
        updatedAt: r.updated_at,
        homepage: r.homepage,
      }))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() ||
          b.stars - a.stars,
      );

    // If API returned zero (e.g. user has none yet), fall back to curated list
    // instead of a blank section.
    if (repos.length === 0) {
      return NextResponse.json(
        { repos: FALLBACK_REPOS, username: site.githubUsername, fallback: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        },
      );
    }

    return NextResponse.json(
      { repos, username: site.githubUsername, fallback: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { repos: FALLBACK_REPOS, username: site.githubUsername, fallback: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  }
}
