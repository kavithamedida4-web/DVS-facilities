import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-f471c3e24db144a6a94c290eececee02.r2.dev",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin/login",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/product",
        destination: "/products",
        permanent: false,
      },
      {
        source: "/product/:path*",
        destination: "/products/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
