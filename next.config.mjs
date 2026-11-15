/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hides the floating Next.js dev badge in the corner. Dev-only UI — it never
  // shipped to production, this just removes it from the local view too.
  devIndicators: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "is1-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is2-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is3-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is4-ssl.mzstatic.com" },
      { protocol: "https", hostname: "is5-ssl.mzstatic.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // The old standalone pages were removed when the site became a one-pager.
  // Permanent-redirect their URLs to the matching section on the new site so
  // any shared or indexed links keep working instead of 404ing.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/services", destination: "/#service", permanent: true },
      { source: "/pricing", destination: "/#service", permanent: true },
      { source: "/mcp", destination: "/#service", permanent: true },
      { source: "/clients", destination: "/#experience", permanent: true },
      { source: "/github", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
