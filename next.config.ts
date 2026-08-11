import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins: ['10.233.76.96'],
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      ],
    },
};

export default nextConfig;
