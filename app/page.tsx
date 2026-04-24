import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { McpExpertise } from "@/components/sections/McpExpertise";
import { ClientWork } from "@/components/sections/ClientWork";
import { GitHubRepos } from "@/components/sections/GitHubRepos";
import { AiDemo } from "@/components/sections/AiDemo";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Services />
      <Projects />
      <McpExpertise />
      <ClientWork />
      <GitHubRepos />
      <AiDemo />
      <Pricing />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
