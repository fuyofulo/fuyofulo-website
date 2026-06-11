import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/altitude", destination: "/altitude/index.html" },
    ];
  },
};

export default nextConfig;
