import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Liwan Restaurant Management",
    short_name: "Liwan",
    description: "Restaurant management system for Liwan",
    start_url: "/login",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#E97C11",
    icons: [
      {
        src: "/icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
