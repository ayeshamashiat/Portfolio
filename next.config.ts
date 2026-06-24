import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute instead of 15 minutes
    pagesBufferLength: 2,      // Buffer 2 pages max in memory
  },
};

export default nextConfig;

