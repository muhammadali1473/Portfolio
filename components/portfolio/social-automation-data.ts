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

export const PLATFORMS: { icon: SaIcon; bg: string; x: number; y: number }[] = [
  { icon: LINKEDIN, bg: "linear-gradient(145deg,#2b8cfe,#0A66C2)", x: 50, y: 8 },
  { icon: siInstagram, bg: "linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf)", x: 86, y: 19 },
  { icon: siFacebook, bg: "linear-gradient(145deg,#4e9bff,#1877F2)", x: 86, y: 41 },
  { icon: siTiktok, bg: "linear-gradient(145deg,#2b2b2b,#050505)", x: 50, y: 52 },
  { icon: siReddit, bg: "linear-gradient(145deg,#ff7a3d,#FF4500)", x: 14, y: 41 },
  { icon: siX, bg: "linear-gradient(145deg,#2b2b2b,#050505)", x: 14, y: 19 },
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
