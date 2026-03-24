import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // This helps Next.js recognize older/newer builds better
  generateBuildId: async () => {
    // We use an environment variable (e.g., Git SHA) to ensure a stable ID across containers
    return process.env.NEXT_PUBLIC_BUILD_ID || 'v1';
  },
};

export default nextConfig;
