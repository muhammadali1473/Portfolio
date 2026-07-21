import type { Metadata } from "next";
import { AiDemo } from "@/components/sections/AiDemo";

export const metadata: Metadata = {
  title: "AI Demo",
  description:
    "Try it live — chat with an AI assistant that knows my work, or get an instant estimate for your project. Both run on Groq.",
  alternates: { canonical: "/ai-demo" },
};

export default function AiDemoPage() {
  return <AiDemo />;
}
