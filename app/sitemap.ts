import type { MetadataRoute } from "next";
import { href, locales, localeMeta, pages } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(href(locale, slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: slug === "" ? 1 : slug === "privacy" || slug === "terms" ? 0.3 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, absoluteUrl(href(l, slug))])),
      },
    })),
  );
}
