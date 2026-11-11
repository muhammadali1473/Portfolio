import {
  CloudBackdrop,
  PageCard,
  PortfolioNav,
  PortfolioHero,
  ServiceList,
  ContactCTA,
  MiniFooter,
} from "@/components/portfolio/parts";
import { SelectedWork } from "@/components/portfolio/SelectedWork";
import { SocialAutomationSection } from "@/components/portfolio/SocialAutomationSection";
import { ExperienceClients } from "@/components/portfolio/ExperienceClients";

/**
 * Redesigned one-page homepage. A soft cloudy-grey backdrop with a single
 * floating white "page card": nav → hero → selected work → service →
 * experience (client work) → contact. The global header and footer are
 * suppressed on `/` (see Navigation/Footer), so this page owns its own chrome.
 *
 * The previous section components (About, TechStack, Pricing, …) and their
 * standalone routes remain in the repo and reachable by deep link.
 */
export default function HomePage() {
  return (
    <div className="font-[family-name:var(--font-display)]">
      <CloudBackdrop />
      <div className="mx-auto max-w-[1200px] px-3 py-4 sm:px-5 sm:py-6">
        <PageCard>
          <PortfolioNav />
          <PortfolioHero />
          <SelectedWork />
          <SocialAutomationSection />
          <ServiceList />
          <ExperienceClients />
          <ContactCTA />
          <MiniFooter />
        </PageCard>
      </div>
    </div>
  );
}
