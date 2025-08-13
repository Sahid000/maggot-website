import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all hostnames
      },
      {
        protocol: "http",
        hostname: "**", // optional: allows HTTP as well
      },
    ],
  },
};

export default nextConfig;
