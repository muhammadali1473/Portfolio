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

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${site.githubUsername}/repos?per_page=100&type=public&sort=updated`,
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
      const text = await res.text();
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}`, detail: text.slice(0, 200) },
        { status: 502 },
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
      // Most-recently updated first, then by stars as tiebreaker
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() ||
          b.stars - a.stars,
      );

    return NextResponse.json(
      { repos, username: site.githubUsername },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch repositories", detail: (err as Error).message },
      { status: 500 },
    );
  }
}
