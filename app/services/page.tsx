import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, MCP servers, web applications, iOS apps, and automation. What I build for clients and how each project runs from kickoff to delivery.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <Process />
    </>
  );
}
