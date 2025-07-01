import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fbi.gov",
        port: "",
        pathname: "/wanted/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
