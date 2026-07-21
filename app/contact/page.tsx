import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Muhammad Ali. Tell me what you're building and I'll reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
