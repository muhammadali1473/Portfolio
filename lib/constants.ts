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
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#mcp", label: "MCP" },
  { href: "#client-work", label: "Clients" },
  { href: "#github", label: "GitHub" },
  { href: "#ai-demo", label: "AI Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

export type HeroStat = { value: string; label: string };

export const HERO_STATS: HeroStat[] = [
  { value: "4+", label: "Years Experience" },
  { value: "12+", label: "Projects Shipped" },
  { value: "2", label: "iOS Apps on App Store" },
  { value: "5+", label: "Countries Served" },
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
      { name: "GitHub Actions", level: 4, brand: "github" },
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
  emoji: string;
  title: string;
  description: string;
  tags: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Bot,
    emoji: "🤖",
    title: "AI Agents & Chatbots",
    description:
      "Custom AI assistants trained on your business — handle customer support, lead qualification, and FAQ automation 24/7.",
    tags: ["Chatbots", "Agents", "Support"],
  },
  {
    icon: Plug,
    emoji: "🔗",
    title: "MCP Server Development",
    description:
      "Custom MCP (Model Context Protocol) servers that connect AI to LinkedIn, X/Twitter, CRMs, social media, and internal tools.",
    tags: ["MCP", "Protocol", "Integrations"],
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Modern Web Apps",
    description:
      "High-performance websites and web applications built with Next.js, React, and cutting-edge tech.",
    tags: ["Next.js", "React", "SaaS"],
  },
  {
    icon: Smartphone,
    emoji: "📱",
    title: "Mobile Apps",
    description:
      "iOS and cross-platform mobile apps. Two live on the App Store — Swipi and SpendWise. Fast, polished, approved.",
    tags: ["iOS", "React Native", "App Store"],
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Business Automation",
    description:
      "Automate social posting, email outreach, and data processing — saving 20+ hours of manual work every week.",
    tags: ["Automation", "Workflows", "Ops"],
  },
  {
    icon: Code2,
    emoji: "🔧",
    title: "API Integration",
    description:
      "Connect your tools — Stripe, Twilio, OpenAI, custom APIs. I make your systems talk to each other.",
    tags: ["APIs", "Stripe", "Webhooks"],
  },
];

export type ProjectStatus = "shipped" | "in-progress";
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
  },
  {
    id: "capella-dubai",
    title: "Capella Dubai AI Real Estate",
    summary:
      "Next-gen real estate platform for the Dubai market with bilingual AI, property matching, and WhatsApp integration.",
    description:
      "Bilingual (English + Arabic) real estate concierge with AI-powered property matching, WhatsApp chat, and embedded virtual tours.",
    story:
      "A full concierge experience for a premium Dubai brokerage. Visitors describe their needs in plain English or Arabic; the AI matches listings, books viewings, and hands off hot leads to WhatsApp. The underlying data pipeline refreshes inventory hourly and keeps tour embeds lazy-loaded for speed.",
    tech: ["Next.js", "Groq / Claude", "TailwindCSS", "MongoDB"],
    status: "in-progress",
    outcome: "Launching Q2 — beta with select agents",
    client: "Capella Holdings (UAE)",
    role: "Full-stack lead",
    delivered: "Beta",
    category: "Client",
    demoUrl: "#",
    thumb: "capella-dubai",
  },
  {
    id: "dreamspire-therapy",
    title: "Dreamspire Therapy Portal",
    summary:
      "NDIS-compliant therapy clinic site — parent portal, AI FAQ, online booking, and session tracking.",
    description:
      "Production healthcare portal for a children's speech and behavior clinic. Parent portal, AI FAQ, bookings, and session notes.",
    story:
      "Healthcare means compliance. The portal meets NDIS requirements for record-keeping while staying friendly for busy parents. The AI FAQ answers intake questions in plain language, and therapists manage sessions through a clean admin surface.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Groq"],
    status: "in-progress",
    outcome: "Rolling out to full parent base",
    client: "Dreamspire Therapy (AUS)",
    role: "Full-stack lead",
    delivered: "Beta",
    category: "Client",
    demoUrl: "#",
    thumb: "dreamspire-therapy",
  },
  {
    id: "lisa-andrews",
    title: "Lisa Andrews Spiritual Platform",
    summary:
      "Mystical coaching platform with an AI psychic assistant, advanced booking, course platform, and lead magnets.",
    description:
      "Premium spiritual coaching platform. AI psychic assistant, waitlist-aware booking, courses, and evergreen lead magnets.",
    story:
      "A high-end spiritual brand needed a site that *felt* like the brand — mystical, cinematic, and personal. Stripe-powered courses, a booking flow with automated waitlists, and an AI psychic assistant that stays on-tone with Lisa's voice round out the experience.",
    tech: ["Next.js", "Stripe", "Groq", "TailwindCSS"],
    status: "in-progress",
    outcome: "Launching with 3 pre-sold courses",
    client: "Lisa Andrews Coaching (US)",
    role: "Full-stack lead",
    delivered: "Beta",
    category: "Client",
    demoUrl: "#",
    thumb: "lisa-andrews",
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
    priceUSD: 1500,
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
    priceUSD: 4000,
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
    priceUSD: 8000,
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
    priceUSD: 15000,
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

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Muhammad delivered beyond expectations. The AI chatbot he built handles 80% of our inquiries automatically. Best investment we made this year.",
    name: "Sarah K.",
    title: "Founder",
    company: "GrowthLabs",
    country: "UK",
    rating: 5,
    initials: "SK",
    accent: "from-fuchsia-500 to-blue-500",
  },
  {
    quote:
      "He shipped our MCP integration in under two weeks — clean code, clear docs, and zero hand-holding required. Hiring him for round two.",
    name: "Marcus R.",
    title: "CTO",
    company: "Vertex AI Studio",
    country: "USA",
    rating: 5,
    initials: "MR",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    quote:
      "We tried three agencies before Muhammad. He understood our business in one call and the bilingual AI he built for us is indistinguishable from a human agent.",
    name: "Fatima A.",
    title: "Operations Director",
    company: "Capella Holdings",
    country: "UAE",
    rating: 5,
    initials: "FA",
    accent: "from-amber-400 to-fuchsia-500",
  },
  {
    quote:
      "A rare blend of technical depth and business sense. He flagged three things in the scoping call that would have cost us weeks later. Five stars.",
    name: "James P.",
    title: "Head of Product",
    company: "Northwind Ventures",
    country: "Australia",
    rating: 5,
    initials: "JP",
    accent: "from-cyan-400 to-violet-500",
  },
];

export type AssistantQuickPrompt = { label: string; prompt: string };

export const ASSISTANT_QUICK_PROMPTS: AssistantQuickPrompt[] = [
  { label: "What do you build?", prompt: "What kinds of projects do you build?" },
  { label: "How much for a chatbot?", prompt: "How much does an AI chatbot cost?" },
  { label: "Timeline for an MCP?", prompt: "What's a realistic timeline for a custom MCP server?" },
  { label: "How do I reach you?", prompt: "How can I contact you directly — email, phone, or WhatsApp?" },
];

export const VALUES_ICON = Sparkles;

// Curated ordering helpers
export const FEATURED_PROJECTS = PROJECTS.filter((p) =>
  ["linkedin-mcp", "x-mcp-builder", "swipi", "spendwise"].includes(p.id),
);

export const CLIENT_DELIVERABLES = PROJECTS.filter((p) => p.category === "Client");
