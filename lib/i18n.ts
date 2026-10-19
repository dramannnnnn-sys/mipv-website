import { en } from "@/content/en";
import { bm } from "@/content/bm";
import type { Dictionary } from "@/content/types";

export const locales = ["en", "bm"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** BCP-47 tags for <html lang>, hreflang and Open Graph. */
export const localeMeta: Record<Locale, { htmlLang: string; hreflang: string; ogLocale: string; label: string; short: string }> = {
  en: { htmlLang: "en-MY", hreflang: "en-MY", ogLocale: "en_MY", label: "English", short: "EN" },
  bm: { htmlLang: "ms-MY", hreflang: "ms-MY", ogLocale: "ms_MY", label: "Bahasa Melayu", short: "BM" },
};

const dictionaries: Record<Locale, Dictionary> = { en, bm };

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Page slugs are shared by both languages (e.g. /en/about and /bm/about). */
export const pages = ["", "about", "expertise", "services", "approach", "industries", "contact", "privacy", "terms"] as const;
export type PageSlug = (typeof pages)[number];

/** Build an internal href such as /bm/services or /en. */
export function href(locale: Locale, slug: PageSlug | string = ""): string {
  const clean = slug.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Swap the locale segment of a pathname while preserving the rest of the
 * path, so the language switcher keeps the visitor on the same page.
 */
export function switchLocalePath(pathname: string | null, target: Locale): string {
  if (!pathname) return href(target);
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    parts[1] = target;
    return parts.join("/") || href(target);
  }
  return href(target);
}
