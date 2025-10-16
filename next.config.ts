import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  allowedDevOrigins: [
    "https://app.d1zz.xyz",
    "http://app.d1zz.xyz",
    "app.d1zz.xyz",
    "localhost:3000",
    "127.0.0.1:3000",
  ],

  async redirects() {
    return [
      {
        source: "/support",             
        destination: "https://t.me/youknowmynvmee",
        permanent: false,                
      },
    ];
  },
};

export default nextConfig;
