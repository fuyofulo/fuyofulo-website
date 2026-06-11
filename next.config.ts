import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/altitude", destination: "/altitude/index.html" },
      { source: "/resume", destination: "/resume.pdf" },
    ];
  },
};

export default nextConfig;
