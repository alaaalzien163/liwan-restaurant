import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {},

  // Image optimization config
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tjbdmrzcyzwmtvodgspt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Compiler options
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
};

export default nextConfig;
