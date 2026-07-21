import type { Metadata } from "next";
import { McpExpertise } from "@/components/sections/McpExpertise";

export const metadata: Metadata = {
  title: "MCP Expertise",
  description:
    "Model Context Protocol (MCP) server development — custom tools, resources, and integrations that connect AI assistants like Claude to real business systems.",
  alternates: { canonical: "/mcp" },
};

export default function McpPage() {
  return <McpExpertise />;
}
