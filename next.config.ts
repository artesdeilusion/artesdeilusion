import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      { source: "/apple-touch-icon.png", destination: "/apple-icon.png" },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/apple-icon.png",
      },
    ];
  },
};

export default nextConfig;
