export const site = {
  name: "Muhammad Ali",
  shortName: "M.A.",
  title:
    "Muhammad Ali | Full-Stack Developer & AI Specialist | AI Agents, MCPs, Modern Web Apps",
  description:
    "I help businesses build AI agents, MCP servers, and modern web applications that save time and drive growth. Serving clients globally from Pakistan. Book a free consultation.",
  keywords: [
    "AI developer",
    "MCP server",
    "AI agents",
    "full-stack developer",
    "Next.js developer",
    "Groq developer",
    "Pakistan developer",
    "freelance AI developer",
    "LangChain",
    "React developer",
    "iOS developer",
  ],
  tagline: "Building the future, one line of code at a time.",
  role: "Full-Stack Developer & AI Specialist",
  location: "Pakistan",
  email: "get.muhammad5@gmail.com",
  phone: "+92 335 4266488",
  linkedin: "https://linkedin.com/in/muhammad-ali-130166282",
  github: "https://github.com/muhammadali1473",
  githubUsername: "muhammadali1473",
  x: "https://x.com/get_Muham",
  xHandle: "@get_Muham",
  upwork: "https://www.upwork.com/freelancers/~01bd36b0801e739e81",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://muhammadali.dev",
};

export const socials = {
  email: process.env.NEXT_PUBLIC_EMAIL || site.email,
  phone: process.env.NEXT_PUBLIC_PHONE || site.phone,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || site.linkedin,
  github: process.env.NEXT_PUBLIC_GITHUB_URL || site.github,
  githubUsername: site.githubUsername,
  x: process.env.NEXT_PUBLIC_X_URL || site.x,
  upwork: process.env.NEXT_PUBLIC_UPWORK_URL || site.upwork,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.phone,
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
};

export function whatsappLink(message = "Hi Muhammad, I'd like to discuss a project.") {
  const number = socials.whatsapp.replace(/[^0-9]/g, "");
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  const number = socials.phone.replace(/[^0-9+]/g, "");
  if (!number) return "";
  return `tel:${number}`;
}
