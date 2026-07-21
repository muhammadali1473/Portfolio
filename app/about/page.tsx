import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Ali — full-stack developer with 4+ years building AI agents, MCP servers, and modern web applications. My journey, approach, and technology stack.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <TechStack />
    </>
  );
}
