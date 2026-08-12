import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/altitude", destination: "/altitude/index.html" },
      { source: "/resume", destination: "/resume.pdf" },
    ];
  },
  async redirects() {
    // Notes now runs locally on my laptop, exposed via Cloudflare Tunnel.
    // Keep the old fuyofulo.com/notes entry point working as a shortcut.
    // `permanent: false` (307) so browsers don't hard-cache it if the host changes.
    return [
      {
        source: "/notes",
        destination: "https://notes.fuyofulo.com",
        permanent: false,
      },
      {
        source: "/notes/:path*",
        destination: "https://notes.fuyofulo.com/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
