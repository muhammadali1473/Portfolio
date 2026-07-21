import type { Metadata } from "next";
import { ClientWork } from "@/components/sections/ClientWork";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Client engagements across real estate, coaching, healthcare, and Web3 — serving businesses in the US, UK, UAE, Australia, Germany, and Canada.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <ClientWork />
      <Testimonials />
    </>
  );
}
