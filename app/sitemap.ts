import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { PROJECTS } from "@/lib/constants";

/**
 * One entry per real route. Hash fragments are not separate URLs to a crawler,
 * so the old "/#projects"-style entries were never indexable on their own.
 */
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/automation", priority: 0.85, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
  const projects = PROJECTS.map((p) => ({
    url: `${site.url}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...projects];
}
