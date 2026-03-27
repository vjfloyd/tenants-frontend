import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    // Allow projects using TENANTS_API to still work in browser code.
    TENANTS_API: process.env.TENANTS_API || process.env.NEXT_PUBLIC_TENANTS_API,
    NEXT_PUBLIC_TENANTS_API: process.env.NEXT_PUBLIC_TENANTS_API || process.env.TENANTS_API,
  },
  // This helps Next.js recognize older/newer builds better
  generateBuildId: async () => {
    console.log("-->", process.env.NEXT_PUBLIC_BUILD_ID);
    // We use an environment variable (e.g., Git SHA) to ensure a stable ID across containers
    return process.env.NEXT_PUBLIC_BUILD_ID || 'v1';
  },
};

export default nextConfig;
