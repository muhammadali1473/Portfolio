import { Hero } from "@/components/sections/Hero";
import { SectionLinks } from "@/components/sections/SectionLinks";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { McpExpertise } from "@/components/sections/McpExpertise";
import { ClientWork } from "@/components/sections/ClientWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { GitHubRepos } from "@/components/sections/GitHubRepos";
import { AiDemo } from "@/components/sections/AiDemo";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";

/**
 * The whole site, in order. Each section owns its own anchor id, which the nav,
 * footer and card grid scroll to.
 *
 * The standalone routes (/about, /services, …) still exist and render these
 * same components, so deep links and their per-page metadata keep working.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionLinks />
      <About />
      <TechStack />
      <Services />
      <Process />
      <Projects />
      <McpExpertise />
      <ClientWork />
      <Testimonials />
      <GitHubRepos />
      <AiDemo />
      <Pricing />
      <Contact />
    </>
  );
}
