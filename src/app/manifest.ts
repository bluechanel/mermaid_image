import type { MetadataRoute } from "next";
import { DICTS } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: DICTS.zh.siteName,
    short_name: "Mermaid Editor",
    description: DICTS.zh.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#002FA7",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
