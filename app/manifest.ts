import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MIPV",
    short_name: "MIPV",
    description: "Integrated Expertise. Evidence-Based Solutions. Sustainable Value.",
    start_url: "/en",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#5f0718",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
