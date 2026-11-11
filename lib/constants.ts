import {
  Bot,
  Plug,
  Globe,
  Smartphone,
  Zap,
  Code2,
  Rocket,
  Handshake,
  Sparkles,
  DollarSign,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { GitHubIcon } from "@/components/shared/SocialIcons";

/**
 * The site is a one-pager: every section lives on `/`, and the nav, footer and
 * card grid all scroll to it via `anchor`.
 *
 * `href` is kept because each section ALSO still exists as a standalone route
 * with its own title and description — those stay reachable for deep links and
 * search, they are just no longer what the navigation points at.
 */
export type NavLink = {
  href: string;
  /** In-page target on the home page, e.g. `/#about`. What the nav links to. */
  anchor: string;
  label: string;
  blurb: string;
  /** Any icon component taking size/className — lucide glyphs or our own
   *  brand SVGs, so real logos can sit alongside generic icons. */
  icon: ComponentType<{ size?: string | number; className?: string }>;
  /** Hex (no #) used to tint this card's icon tile, so the grid reads as nine
   *  distinct topics rather than nine identical blue squares. GitHub uses its
   *  real brand black, which the card renders as theme foreground. */
  tint: string;
};

export const NAV_LINKS: NavLink[] = [
  {
    href: "/about",
    anchor: "/#about",
    label: "About",
    blurb: "My journey, what I build, and the stack I reach for.",
    icon: User,
    tint: "6B5B95",
  },
  {
    href: "/services",
    anchor: "/#services",
    label: "Services",
    blurb: "What I offer and how a project runs start to finish.",
    icon: Zap,
    tint: "9A6B25",
  },
  {
    href: "/projects",
    anchor: "/#projects",
    label: "Projects",
    blurb: "Selected work — AI agents, web apps, and iOS builds.",
    icon: Rocket,
    tint: "9B4A4A",
  },
  {
    href: "/mcp",
    anchor: "/#mcp",
    label: "MCP",
    blurb: "Model Context Protocol servers, my specialty.",
    icon: Plug,
    tint: "3F6B70",
  },
  {
    href: "/clients",
    anchor: "/#client-work",
    label: "Clients",
    blurb: "Client engagements and what they had to say.",
    icon: Handshake,
    tint: "4A7355",
  },
  {
    href: "/github",
    anchor: "/#github",
    label: "GitHub",
    blurb: "Open-source repositories, pulled live from GitHub.",
    icon: GitHubIcon,
    tint: "181717",
  },
  {
    href: "/pricing",
    anchor: "/#pricing",
    label: "Pricing",
    blurb: "Transparent packages and engagement models.",
    icon: DollarSign,
    tint: "5A7346",
  },
  {
    href: "/contact",
    anchor: "/#contact",
    label: "Contact",
    blurb: "Tell me about your project — I reply within a day.",
    icon: Mail,
    tint: "456A82",
  },
];

/**
 * Header/footer menu. Home is prepended here rather than added to NAV_LINKS so
 * the homepage card grid doesn't render a card pointing at itself.
 *
 * `href` here carries the ANCHOR, not the route — the menu drives in-page
 * scrolling. `id` is the bare element id, which the nav uses for scroll-spy.
 */
export const HEADER_LINKS: { href: string; label: string; id: string }[] = [
  { href: "/#top", label: "Home", id: "top" },
  ...NAV_LINKS.map(({ anchor, label }) => ({
    href: anchor,
    label,
    id: anchor.replace("/#", ""),
  })),
];

export type HeroStat = { value: string; label: string };

export const HERO_STATS: HeroStat[] = [
  { value: "4+", label: "Years Experience" },
  { value: "12+", label: "Projects Shipped" },
  { value: "2", label: "iOS Apps on App Store" },
  { value: "100%", label: "On-Time Delivery" },
];

export type ValueCard = { icon: LucideIcon; title: string; description: string };

export const VALUE_CARDS: ValueCard[] = [
  {
    icon: Rocket,
    title: "I build what I sell",
    description: "I use AI in my own workflow every single day.",
  },
  {
    icon: Globe,
    title: "Global mindset, premium delivery",
    description: "Serving founders in US, UK, UAE, Australia, Germany, and Canada.",
  },
  {
    icon: Handshake,
    title: "Long-term partner",
    description: "Not just a transaction — I invest in your growth.",
  },
];

export type TechItem = { name: string; level: 1 | 2 | 3 | 4 | 5; brand?: string };
export type TechCategory = { label: string; items: TechItem[] };

export const TECH_STACK: TechCategory[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", level: 5, brand: "react" },
      { name: "Next.js", level: 5, brand: "nextjs" },
      { name: "TypeScript", level: 5, brand: "typescript" },
      { name: "Tailwind CSS", level: 5, brand: "tailwind" },
      { name: "Framer Motion", level: 4, brand: "framer" },
      { name: "Three.js", level: 4, brand: "three" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", level: 5, brand: "node" },
      { name: "Python", level: 5, brand: "python" },
      { name: "FastAPI", level: 4, brand: "fastapi" },
      { name: "Express", level: 4, brand: "express" },
    ],
  },
  {
    label: "AI & ML",
    items: [
      { name: "Groq API", level: 5, brand: "groq" },
      { name: "Claude / OpenAI", level: 5, brand: "anthropic" },
      { name: "LangChain", level: 4, brand: "langchain" },
      { name: "Hugging Face", level: 4, brand: "huggingface" },
      { name: "MCP Protocol", level: 5, brand: "mcp" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", level: 5, brand: "postgres" },
      { name: "MongoDB", level: 4, brand: "mongodb" },
      { name: "Redis", level: 4, brand: "redis" },
      { name: "Supabase", level: 5, brand: "supabase" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 4, brand: "aws" },
      { name: "Vercel", level: 5, brand: "vercel" },
      { name: "Docker", level: 4, brand: "docker" },
      { name: "GitHub Actions", level: 4, brand: "githubactions" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", level: 4, brand: "react" },
      { name: "iOS (Swift)", level: 4, brand: "apple" },
      { name: "Flutter", level: 3, brand: "flutter" },
    ],
  },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  /** Hex (no #) tint for this card's icon tile — same idea as NavLink.tint,
   *  so six services don't read as six identical blue squares. */
  tint: string;
  /** Optional artwork bled across the top of the card, behind the content.
   *  Wide crops work best — it is rendered as a band, not a full cover. */
  image?: string;
};

export const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    description:
      "Custom AI assistants trained on your business — handle customer support, lead qualification, and FAQ automation 24/7.",
    tags: ["Chatbots", "Agents", "Support"],
    tint: "6B5B95",
    image: "/service-ai-agents.jpg",
  },
  {
    icon: Plug,
    title: "MCP Server Development",
    description:
      "Custom MCP (Model Context Protocol) servers that connect AI to LinkedIn, X/Twitter, CRMs, social media, and internal tools.",
    tags: ["MCP", "Protocol", "Integrations"],
    tint: "3F6B70",
    image: "/service-mcp.png",
  },
  {
    icon: Globe,
    title: "Modern Web Apps",
    description:
      "High-performance websites and web applications built with Next.js, React, and cutting-edge tech.",
    tags: ["Next.js", "React", "SaaS"],
    tint: "4A6285",
    image: "/service-web.png",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "iOS and cross-platform mobile apps. Two live on the App Store — Swipi and SpendWise. Fast, polished, approved.",
    tags: ["iOS", "React Native", "App Store"],
    tint: "9B4A4A",
    image: "/service-mobile.png",
  },
  {
    icon: Zap,
    title: "Business Automation",
    description:
      "Claude-powered MCP automation for Instagram, TikTok, Facebook and Reddit — comments, DMs and lead capture — plus email outreach and data processing.",
    tags: ["Instagram", "TikTok", "Facebook", "Reddit"],
    tint: "9A6B25",
    image: "/service-automation.jpg",
  },
  {
    icon: Code2,
    title: "API Integration",
    description:
      "Connect your tools — Stripe, Twilio, OpenAI, custom APIs. I make your systems talk to each other.",
    tags: ["APIs", "Stripe", "Webhooks"],
    tint: "4A7355",
    image: "/service-api.jpg",
  },
];

export type ProjectStatus = "shipped" | "in-progress" | "proposal";
export type ProjectCategory = "Product" | "Client" | "Open Source" | "iOS App";

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  story: string;
  tech: string[];
  status: ProjectStatus;
  outcome: string;
  client?: string;
  role?: string;
  delivered?: string;
  category: ProjectCategory;
  demoUrl?: string;
  repoUrl?: string;
  thumb: string;
  /** Screenshot of the live site, served from /public. When set, the card
   *  renders it instead of the hand-built mock keyed off `thumb`. */
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "linkedin-mcp",
    title: "LinkedIn MCP Server",
    summary:
      "Custom Model Context Protocol server for LinkedIn automation — profile search, message drafting, and connection analysis.",
    description:
      "Production-grade MCP server that lets AI agents search profiles, draft outreach, and analyze connections with deep intelligence.",
    story:
      "Built from scratch to solve a real outreach bottleneck: manually researching prospects took hours per day. The server exposes LinkedIn actions as MCP tools, so any Claude-compatible client can drive profile research and personalized first messages in seconds. Used daily in live lead-generation workflows.",
    tech: ["Python", "FastAPI", "Groq API", "MCP Protocol"],
    status: "shipped",
    outcome: "Actively used in lead-generation workflows",
    client: "Personal / OSS",
    role: "Solo developer",
    delivered: "Shipped",
    category: "Open Source",
    repoUrl: "https://github.com/muhammadali1473",
    thumb: "linkedin-mcp",
    image: "/project-linkedin-mcp.png",
  },
  {
    id: "x-mcp-builder",
    title: "X MCP Builder",
    summary:
      "Custom MCP server for X (Twitter) — schedule posts, search tweets, analyze timelines, and drive AI-powered engagement.",
    description:
      "Model Context Protocol server for the X/Twitter API. Gives AI agents tools to post threads, search tweets, follow accounts, and run analytics — all from a single MCP endpoint.",
    story:
      "After the LinkedIn MCP took off internally, the next bottleneck was X. Building an MCP for X required careful rate-limit handling, OAuth flows, and a tool surface broad enough for real engagement work. The result plugs straight into any MCP client and turns X into a programmable channel.",
    tech: ["TypeScript", "MCP Protocol", "X API v2", "Node.js"],
    status: "shipped",
    outcome: "Used internally for scheduled threads + trend monitoring",
    client: "Personal / OSS",
    role: "Solo developer",
    delivered: "Shipped",
    category: "Open Source",
    repoUrl: "https://github.com/muhammadali1473",
    thumb: "x-mcp-builder",
    image: "/project-x-mcp-builder.png",
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot — Groq + LangChain",
    summary:
      "Conversational AI chatbot with memory, saved chat history, and a choice of open LLMs served on Groq.",
    description:
      "Full chat app built on Groq's low-latency inference. Remembers the conversation, saves and reopens past chats, and lets the user switch between Llama 3, Mixtral, and Gemma mid-session.",
    story:
      "Built to learn what makes a chatbot feel good rather than just work: replies that stream back almost instantly, memory that keeps context across turns, and a sidebar of titled past sessions you can jump back into. LangChain handles conversation memory; Groq keeps latency low enough that the bot feels conversational. The same patterns now power the assistants I build for clients.",
    tech: ["Python", "Streamlit", "Groq API", "LangChain"],
    status: "shipped",
    outcome: "Open source on GitHub",
    client: "Personal / OSS",
    role: "Solo developer",
    delivered: "Shipped",
    category: "Open Source",
    repoUrl: "https://github.com/muhammadali1473/Chatbot_AI",
    thumb: "ai-chatbot",
    image: "/project-ai-chatbot.png",
  },
  {
    id: "rag-chatbot",
    title: "RAG Document Chatbot",
    summary:
      "Upload a PDF, Word file, or text document and chat with it — answers come from your document, not the model's guesses.",
    description:
      "Mobile RAG app: upload PDF, DOCX, or TXT files to a document library, get auto-generated summaries, topics, and study questions, then ask questions answered from the document's own content.",
    story:
      "General chatbots make things up when they don't know your data. This app grounds every answer in the uploaded document: the backend extracts the text, injects the relevant content into the prompt, and Llama 3 on Groq answers from that alone. The same retrieval pattern is what lets a business chatbot answer from its own policies, price lists, and FAQs instead of guessing.",
    tech: ["React Native", "Expo", "Node.js", "Groq API", "RAG"],
    status: "shipped",
    outcome: "Open source on GitHub",
    client: "Personal / OSS",
    role: "Solo developer",
    delivered: "Shipped",
    category: "Open Source",
    repoUrl: "https://github.com/muhammadali1473/AI-Document-Analysis-Chat-App",
    thumb: "rag-chatbot",
    image: "/project-rag-chatbot.png",
  },
  {
    id: "lead-crm",
    title: "AI Lead CRM for Real Estate",
    summary:
      "Lead pipeline fed by Instagram and LinkedIn — Claude finds buyers, scores them 1–10, and matches each to the right off-plan project.",
    description:
      "CRM behind the Instagram and LinkedIn MCP servers. Every buyer the AI finds is saved with their source, a 1–10 score and a pipeline status, matched to projects by budget, area and bedrooms, and rolled up into a daily report.",
    story:
      "A real-estate agency's outreach was producing conversations nobody tracked. The fix was a CRM the AI writes to directly: when Claude spots a buyer in reel comments, new followers or LinkedIn posts, it saves them as a lead, scores how likely they are to buy, and filters out agents and brokers. Each lead is matched against live project inventory so the first DM offers something that actually fits, and the status moves from new to contacted to replied as the conversation goes.",
    tech: ["Claude", "MCP Protocol", "Unipile", "Lead scoring"],
    status: "shipped",
    outcome: "Runs daily for a Dubai real-estate agency",
    client: "Real estate agency (Dubai, UAE)",
    role: "Solo developer",
    delivered: "Shipped",
    category: "Client",
    thumb: "lead-crm",
  },
  {
    id: "social-automation",
    title: "Social Media Automation — MCP",
    summary:
      "One Claude-driven MCP hub that runs LinkedIn, Instagram, Facebook, TikTok, X and Reddit — comments, DMs, posts and lead capture, on autopilot.",
    description:
      "A single Model Context Protocol automation layer that gives Claude the tools to operate every major social channel from one place: search and comment, send DMs, publish posts, and capture leads across LinkedIn, Instagram, Facebook, TikTok, X and Reddit.",
    story:
      "Running outreach across six platforms by hand doesn't scale. This MCP hub turns each network into a set of Claude-callable tools, so one agent can watch for buying signals, reply in the person's language, publish on a schedule and log every qualified lead — with daily caps and human-safe pacing baked in. The cloud sits at the centre; every channel plugs into it.",
    tech: ["Claude", "MCP Protocol", "Python", "Unipile"],
    status: "shipped",
    outcome: "Runs daily across six social platforms",
    client: "Personal / OSS",
    role: "Solo developer",
    delivered: "Shipped",
    category: "Open Source",
    thumb: "social-automation",
  },
  {
    id: "swipi",
    title: "Swipi — Swipe Photo Cleaner",
    summary:
      "iOS app that makes cleaning up your camera roll feel like a game — Tinder-style swipes to keep or delete photos.",
    description:
      "Live on the App Store. Helps users clear gigabytes of junk photos in minutes with a beautiful swipe UX, monthly swipe summaries, and smart grouping.",
    story:
      "Built Swipi end-to-end — design, Swift/SwiftUI implementation, App Store submission, and ASO. The hardest parts: Photos framework permissions on iOS, batch-delete flows that feel safe, and an animation layer that stays buttery at 120 Hz on newer devices.",
    tech: ["Swift", "SwiftUI", "Photos Framework", "StoreKit"],
    status: "shipped",
    outcome: "Live on the App Store (AE, MENA)",
    client: "Personal product",
    role: "Solo developer",
    delivered: "Shipped to App Store",
    category: "iOS App",
    demoUrl:
      "https://apps.apple.com/ae/app/swipi-swipe-photo-cleaner/id6758861898",
    thumb: "swipi",
    image: "/project-swipi.jpg",
  },
  {
    id: "spendwise",
    title: "SpendWise — Budget Planner",
    summary:
      "iOS budget planner with smart category tracking, weekly insights, and a clean glass UI.",
    description:
      "Live on the App Store. Helps users understand where their money actually goes with auto-categorized transactions, weekly snapshots, and goal tracking.",
    story:
      "SpendWise started as a personal itch — existing budget apps were either over-engineered or hostile to use. Shipped a focused MVP with a clean setup flow, category-first view, and spend-vs-goal visuals. The backend is lightweight on-device storage with iCloud sync.",
    tech: ["Swift", "SwiftUI", "CloudKit", "Charts"],
    status: "shipped",
    outcome: "Live on the App Store (AE, MENA)",
    client: "Personal product",
    role: "Solo developer",
    delivered: "Shipped to App Store",
    category: "iOS App",
    demoUrl:
      "https://apps.apple.com/ae/app/budget-planner-app-spendwise/id6758571585",
    thumb: "spendwise",
    image: "/project-spendwise.jpg",
  },
  /*
   * Live client sites. Unlike the three concepts below these are shipped and
   * publicly reachable, so `demoUrl` points at the real domain and the card
   * shows a screenshot of the actual homepage rather than a mock.
   */
  {
    id: "msn-developments",
    title: "MSN Developments",
    summary:
      "Marketing site for a boutique Dubai real estate developer — project portfolio, media centre, and careers.",
    description:
      "Next.js site for MSN Developments, a Dubai-based boutique developer. Cinematic hero, a browsable project portfolio, an industry-insights media centre, and careers and enquiry funnels.",
    story:
      "A property developer's site has to sell the address before it sells the apartment, so the build leans on full-bleed imagery and restrained typography under the brand's 'Purpose in Every Detail' line. Alongside the project portfolio sits a media centre that keeps publishing market insights, so the site stays worth returning to between launches.",
    tech: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    status: "shipped",
    outcome: "Live at msndevelopments.com",
    client: "MSN Developments (Dubai, UAE)",
    category: "Client",
    demoUrl: "https://www.msndevelopments.com/",
    thumb: "msn-developments",
    image: "/project-msn-developments.jpg",
  },
  {
    id: "ere-group",
    title: "Earth Link Real Estate",
    summary:
      "Brokerage site for a licensed Dubai agency — property listings, developer directory, and consultation booking.",
    description:
      "Next.js site for Earth Link Real Estate (ERE Group), a licensed Dubai brokerage. Featured property listings, a developer directory, market-insight articles, consultation booking, and a newsletter capture.",
    story:
      "Brokerage sites live or die on lead capture, so every path — featured listings, the developer directory, the market-insight posts — resolves to booking a consultation. The listing and developer sections are built to be extended as inventory turns over, and the site carries the agency's decade of trading history as the trust signal buyers actually respond to.",
    tech: ["Next.js", "React", "TailwindCSS"],
    status: "shipped",
    outcome: "Live at eregroup.ae",
    client: "Earth Link Real Estate / ERE Group (Dubai, UAE)",
    category: "Client",
    demoUrl: "https://www.eregroup.ae/",
    thumb: "ere-group",
    image: "/project-ere-group.jpg",
  },
  {
    id: "shario",
    title: "Shario",
    summary:
      "Trilingual site for a Dubai digital marketing agency — English, Arabic, and Russian, with a services and insights stack.",
    description:
      "Next.js site for Shario, a founder-led Dubai marketing agency. Editorial homepage, service breakdown, insights section, and FAQ — served in English, Arabic, and Russian.",
    story:
      "Shario sells performance marketing to a Gulf audience that reads in three languages, so EN/AR/RU is a first-class switch rather than an afterthought — and Arabic means the layout has to survive right-to-left. The design goes deliberately editorial: heavy serif display type and a muted palette, positioning the agency as a brand studio rather than another performance shop.",
    tech: ["Next.js", "React", "TailwindCSS", "i18n (EN/AR/RU)"],
    status: "shipped",
    outcome: "Live at shario.ae",
    client: "Shario (Dubai, UAE)",
    category: "Client",
    demoUrl: "https://www.shario.ae/",
    thumb: "shario",
    image: "/project-shario.jpg",
  },
  {
    id: "shahid-nawaz",
    title: "Shahid Nawaz — CEO Personal Brand",
    summary:
      "Personal brand site for a Dubai real estate CEO advising family offices and high-net-worth investors.",
    description:
      "Next.js site for Shahid Nawaz, a Dubai CEO who structures developer capital across the Gulf. Editorial hero, the principal's profile, a services suite, an investment philosophy, a blog, and private-office and WhatsApp enquiry paths.",
    story:
      "His clients are family offices and high-net-worth investors, so the site had to read like a private bank, not a brokerage. That meant light editorial type with a single bronze accent, a dark studio portrait, and calm, understated copy. There are no listings or hard sells: every path leads to a private-office enquiry or a direct WhatsApp, the way this audience actually wants to make contact.",
    tech: ["Next.js", "React", "TailwindCSS"],
    status: "shipped",
    outcome: "Live at mshahidnawaz.com",
    client: "Shahid Nawaz (Dubai, UAE)",
    category: "Client",
    demoUrl: "https://www.mshahidnawaz.com/",
    thumb: "shahid-nawaz",
    image: "/project-shahid-nawaz.jpg",
  },
  {
    id: "dubai-real-estate",
    title: "Dubai Real Estate AI Platform (Concept)",
    summary:
      "Concept for a next-gen real estate platform — bilingual AI, property matching, and WhatsApp integration for the Dubai market.",
    description:
      "Proposal-stage concept: bilingual (English + Arabic) real estate concierge with AI-powered property matching, WhatsApp chat, and embedded virtual tours.",
    story:
      "A scoped concept designed for a UAE real estate client. Visitors describe their needs in plain English or Arabic; the AI matches listings, books viewings, and hands off hot leads to WhatsApp. The data pipeline refreshes inventory hourly and lazy-loads tour embeds for speed. Currently at proposal stage — not yet a signed engagement.",
    tech: ["Next.js", "Groq / Claude", "TailwindCSS", "MongoDB"],
    status: "proposal",
    outcome: "Proposal stage — awaiting client go-ahead",
    client: "Real Estate Client (UAE)",
    role: "Proposed full-stack lead",
    delivered: "Proposal",
    category: "Client",
    thumb: "dubai-real-estate",
  },
  {
    id: "therapy-portal",
    title: "Therapy Clinic Portal (Concept)",
    summary:
      "Proposal for an NDIS-compliant therapy clinic site — parent portal, AI FAQ, online booking, and session tracking.",
    description:
      "Proposal-stage concept: healthcare portal for a children's speech and behavior clinic. Parent portal, AI FAQ, bookings, and session notes.",
    story:
      "Healthcare means compliance. The concept meets NDIS record-keeping requirements while staying friendly for busy parents. The AI FAQ answers intake questions in plain language, and therapists manage sessions through a clean admin surface. Scoped and pitched — awaiting engagement.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Groq"],
    status: "proposal",
    outcome: "Proposal stage — awaiting client go-ahead",
    client: "Healthcare Client (AUS)",
    role: "Proposed full-stack lead",
    delivered: "Proposal",
    category: "Client",
    thumb: "therapy-portal",
  },
  {
    id: "spiritual-coaching",
    title: "Spiritual Coaching Platform (Concept)",
    summary:
      "Proposal for a mystical coaching platform — AI assistant, advanced booking, course platform, and lead magnets.",
    description:
      "Proposal-stage concept: premium spiritual coaching platform with an AI assistant, waitlist-aware booking, courses, and evergreen lead magnets.",
    story:
      "A scoped concept for a high-end spiritual brand that wanted a site reflecting their voice — mystical, cinematic, and personal. Stripe-powered courses, a booking flow with automated waitlists, and an on-tone AI assistant round out the experience. Currently at proposal stage.",
    tech: ["Next.js", "Stripe", "Groq", "TailwindCSS"],
    status: "proposal",
    outcome: "Proposal stage — awaiting client go-ahead",
    client: "Coaching Client (UK)",
    role: "Proposed full-stack lead",
    delivered: "Proposal",
    category: "Client",
    thumb: "spiritual-coaching",
  },
];

export type PricingPackage = {
  id: string;
  name: string;
  priceUSD: number;
  priceLabel?: string;
  deliveryWeeks: string;
  badge: string;
  popular?: boolean;
  cta: string;
  features: string[];
};

export const PRICING: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter",
    priceUSD: 500,
    deliveryWeeks: "2 weeks",
    badge: "Perfect for Solopreneurs",
    cta: "Get Started",
    features: [
      "Modern responsive website",
      "Basic AI chatbot",
      "Mobile-optimized design",
      "Contact form + basic SEO",
      "1 month support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    priceUSD: 1200,
    deliveryWeeks: "4 weeks",
    badge: "Most Popular",
    popular: true,
    cta: "Get Started",
    features: [
      "Everything in Starter",
      "Custom AI assistant (trained on your business)",
      "Booking + calendar integration",
      "WhatsApp Business integration",
      "Email automation",
      "Lead capture + basic CRM",
      "3 months support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceUSD: 2500,
    deliveryWeeks: "6–8 weeks",
    badge: "Best Value",
    cta: "Get Started",
    features: [
      "Everything in Professional",
      "Custom admin dashboard",
      "Social media automation (MCP tech)",
      "Multi-language support",
      "Advanced analytics",
      "Payment gateway integration",
      "E-commerce capabilities",
      "6 months support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceUSD: 5000,
    priceLabel: "From",
    deliveryWeeks: "10–12 weeks",
    badge: "Full Digital Transformation",
    cta: "Let's Talk",
    features: [
      "Everything in Premium",
      "Custom mobile app (iOS + Android)",
      "Advanced AI (predictive analytics)",
      "Multi-user admin system",
      "Third-party integrations",
      "Dedicated account manager",
      "12 months support + maintenance",
    ],
  },
];

export type CurrencyCode = "USD" | "GBP" | "AED" | "EUR";

export const CURRENCIES: { code: CurrencyCode; label: string; rate: number }[] = [
  { code: "USD", label: "USD", rate: 1 },
  { code: "GBP", label: "GBP", rate: 0.79 },
  { code: "AED", label: "AED", rate: 3.67 },
  { code: "EUR", label: "EUR", rate: 0.92 },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

import { PhoneCall, FileSignature, Hammer, Eye, PartyPopper } from "lucide-react";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call (Free)",
    description:
      "A 30-min call to understand your vision, goals, and challenges. No obligation.",
    icon: PhoneCall,
  },
  {
    number: "02",
    title: "Proposal & Agreement",
    description:
      "Detailed proposal with timeline, deliverables, and pricing. 50% upfront on approval.",
    icon: FileSignature,
  },
  {
    number: "03",
    title: "Design & Development",
    description:
      "I build with weekly progress updates. You preview everything in a staging environment.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Review & Refinement",
    description:
      "We review together and I make final tweaks based on your feedback. Final payment.",
    icon: Eye,
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "Your project goes live. I provide training and support so you're confident managing it.",
    icon: PartyPopper,
  },
];

export type Stat = { value: string; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: "12", suffix: "+", label: "Projects Shipped" },
  { value: "4", suffix: "+", label: "Years Experience" },
  { value: "2", suffix: "", label: "iOS Apps Live" },
  { value: "100", suffix: "%", label: "On-Time Delivery" },
];

// Parallel array used by the AnimatedCounter pipeline — targetValue is the
// final number (sans suffix) and `display` is what we render once the
// counter settles (preserves the "+" / "%" suffix from the design).
export type AnimatedStat = {
  targetValue: number;
  display: string;
  label: string;
};

export const ANIMATED_STATS: AnimatedStat[] = [
  { targetValue: 12, display: "12+", label: "Projects Shipped" },
  { targetValue: 4, display: "4+", label: "Years Experience" },
  { targetValue: 2, display: "2", label: "iOS Apps Live" },
  { targetValue: 100, display: "100%", label: "On-Time Delivery" },
];

export const TRUST_BADGES = [
  "Powered by Groq",
  "iOS App Store Approved",
  "Vercel Deployment Partner",
  "Stripe Integrated",
  "GitHub Open Source",
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  country: string;
  rating: number;
  initials: string;
  accent: string;
};

// No public testimonials yet — first client cohort in progress.
// The Testimonials section renders an honest placeholder plus App Store CTAs
// instead of carousel rotation.
export const TESTIMONIALS: Testimonial[] = [];

export type AssistantQuickPrompt = { label: string; prompt: string };

export const ASSISTANT_QUICK_PROMPTS: AssistantQuickPrompt[] = [
  { label: "What do you build?", prompt: "What kinds of projects do you build?" },
  { label: "How much for a chatbot?", prompt: "How much does an AI chatbot cost?" },
  { label: "Timeline for an MCP?", prompt: "What's a realistic timeline for a custom MCP server?" },
  { label: "How do I reach you?", prompt: "How can I contact you directly — email, phone, or WhatsApp?" },
];

export const VALUES_ICON = Sparkles;

// Curated ordering helpers
/** Ordered by `map`, not `filter`, so the running order is this list — live
 *  client sites lead, since shipped work for a paying client is the strongest
 *  proof on the page. */
export const FEATURED_PROJECTS = [
  "msn-developments",
  "ere-group",
  "shario",
  "shahid-nawaz",
  "linkedin-mcp",
  "x-mcp-builder",
  "ai-chatbot",
  "rag-chatbot",
  "lead-crm",
  "swipi",
  "spendwise",
]
  .map((id) => PROJECTS.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

export const CLIENT_DELIVERABLES = PROJECTS.filter((p) => p.category === "Client");
