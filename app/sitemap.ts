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
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mcp", priority: 0.85, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/clients", priority: 0.75, changeFrequency: "monthly" },
  { path: "/github", priority: 0.7, changeFrequency: "weekly" },
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
