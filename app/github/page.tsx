import type { Metadata } from "next";
import { GitHubRepos } from "@/components/sections/GitHubRepos";

export const metadata: Metadata = {
  title: "GitHub",
  description:
    "Open-source repositories by Muhammad Ali, pulled live from GitHub — MCP servers, AI tooling, and web projects.",
  alternates: { canonical: "/github" },
};

export default function GitHubPage() {
  return <GitHubRepos />;
}
