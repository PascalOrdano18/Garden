import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
    ],
    // alternativamente:
    // domains: ["apod.nasa.gov"],
  },
};

export default nextConfig;
