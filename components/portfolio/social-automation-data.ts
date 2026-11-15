import {
  siInstagram,
  siFacebook,
  siTiktok,
  siReddit,
  siX,
  siClaude,
} from "simple-icons";

/**
 * Shared geometry + brand icons for the Social Media Automation pitch, used by
 * both the full animated homepage section and the compact animated thumbnail
 * so the two never drift apart.
 */

export type SaIcon = { path: string; hex: string; title: string };

// simple-icons dropped the LinkedIn mark over trademark policy, so it is kept
// locally (the same path the site's SocialIcons uses).
export const LINKEDIN: SaIcon = {
  title: "LinkedIn",
  hex: "0A66C2",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z",
};

export const SA_CLAUDE: SaIcon = siClaude;

// Positions in a 100 × 60 stage, a hexagon around the central cloud.
export const CLOUD = { x: 50, y: 30 };

export type Platform = {
  icon: SaIcon;
  bg: string;
  x: number;
  y: number;
  /** Stable id used for the detail-page anchor, e.g. `/automation#x`. */
  slug: string;
  name: string;
};

export const PLATFORMS: Platform[] = [
  { slug: "linkedin", name: "LinkedIn", icon: LINKEDIN, bg: "linear-gradient(145deg,#2b8cfe,#0A66C2)", x: 50, y: 8 },
  { slug: "instagram", name: "Instagram", icon: siInstagram, bg: "linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf)", x: 86, y: 19 },
  { slug: "facebook", name: "Facebook", icon: siFacebook, bg: "linear-gradient(145deg,#4e9bff,#1877F2)", x: 86, y: 41 },
  { slug: "tiktok", name: "TikTok", icon: siTiktok, bg: "linear-gradient(145deg,#2b2b2b,#050505)", x: 50, y: 52 },
  { slug: "reddit", name: "Reddit", icon: siReddit, bg: "linear-gradient(145deg,#ff7a3d,#FF4500)", x: 14, y: 41 },
  { slug: "x", name: "X", icon: siX, bg: "linear-gradient(145deg,#2b2b2b,#050505)", x: 14, y: 19 },
];

/**
 * Per-platform "how the automation helps you" content for the /automation
 * detail page. Each entry explains what Claude does on that channel and how it
 * turns into followers and real conversations.
 */
export type PlatformHelp = {
  slug: string;
  name: string;
  hex: string;
  tagline: string;
  does: string[];
  growth: string;
};

export const PLATFORM_HELP: PlatformHelp[] = [
  {
    slug: "x",
    name: "X (Twitter)",
    hex: "111111",
    tagline: "Turn X into a programmable growth channel.",
    does: [
      "Finds people posting about your space in real time",
      "Replies in your voice and follows the right accounts",
      "Publishes scheduled threads and posts",
      "Tracks trends so you join conversations early",
    ],
    growth:
      "Claude watches for buying signals and relevant conversations, engages the accounts most likely to follow back, and keeps a steady posting cadence — so your audience compounds without you living in the app.",
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    hex: "0A66C2",
    tagline: "Find decision-makers and start real conversations.",
    does: [
      "Searches for buyers and decision-makers by role and intent",
      "Sends personalised connection notes and follow-ups",
      "Comments helpfully on the posts your audience reads",
      "Captures every warm reply into your pipeline",
    ],
    growth:
      "Instead of cold blasting, Claude qualifies each person first, writes a note that references what they actually posted, and only pushes the ones who reply into your CRM — so connections become conversations.",
  },
  {
    slug: "instagram",
    name: "Instagram",
    hex: "d62976",
    tagline: "Get discovered by the people already interested.",
    does: [
      "Scans reels, hashtags and competitor comments for your audience",
      "Likes and comments to get on their radar",
      "Replies to DMs, story mentions and comments",
      "Saves interested buyers as leads automatically",
    ],
    growth:
      "The automation targets people already engaging with content like yours, warms them with a genuine comment, then moves the warmest ones into a DM conversation — the fastest path to a follow and a sale.",
  },
  {
    slug: "facebook",
    name: "Facebook",
    hex: "1877F2",
    tagline: "Work the groups and pages where your buyers gather.",
    does: [
      "Monitors groups and pages in your niche",
      "Answers questions and joins relevant threads",
      "Runs page posts and comment replies",
      "Routes enquiries straight to you",
    ],
    growth:
      "Facebook groups are full of people asking exactly what you solve. Claude spots those threads, replies with real help, and hands you the warm enquiries — presence without the grind.",
  },
  {
    slug: "tiktok",
    name: "TikTok",
    hex: "111111",
    tagline: "Ride trends and convert commenters into DMs.",
    does: [
      "Tracks trending content and commenters in your niche",
      "Engages the warmest viewers first",
      "Turns comment threads into DM conversations",
      "Flags creators and buyers worth following",
    ],
    growth:
      "Reach on TikTok comes from momentum. Claude finds the videos your buyers are already watching, engages their comment sections, and opens DMs with the people showing the most intent.",
  },
  {
    slug: "reddit",
    name: "Reddit",
    hex: "FF4500",
    tagline: "Be genuinely helpful where your buyers do their research.",
    does: [
      "Watches the subreddits your buyers live in",
      "Answers with genuinely useful replies",
      "Surfaces threads where your offer fits",
      "Avoids spam with human-safe pacing and caps",
    ],
    growth:
      "Reddit punishes selling and rewards helping. Claude monitors the right subreddits, answers questions properly, and only mentions your offer where it truly fits — building trust that converts later.",
  },
];

/** A gently-curled arrow path, trimmed at both ends so the arrowhead lands in
 *  the open space just before the icon and the tail clears the cloud. */
export function curlPath(cx: number, cy: number, ex: number, ey: number) {
  const dx = ex - cx;
  const dy = ey - cy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const sx = cx + ux * 7;
  const sy = cy + uy * 7;
  const tx = ex - ux * 7;
  const ty = ey - uy * 7;
  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2;
  const k = 0.22; // curliness
  const ox = -(ty - sy) * k;
  const oy = (tx - sx) * k;
  return `M${sx} ${sy} Q ${mx + ox} ${my + oy} ${tx} ${ty}`;
}
