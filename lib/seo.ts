import type { Metadata } from "next";
import { site } from "./site";
import { getDictionary, href, locales, localeMeta, type Locale } from "./i18n";
import type { Dictionary } from "@/content/types";

type PageKey = keyof Dictionary["meta"]["pages"];

export function absoluteUrl(path: string) {
  return `${site.url}${path}`;
}

/** Per-page metadata with canonical URL, hreflang alternates and Open Graph. */
export function buildMetadata(locale: Locale, page: PageKey, slug: string = ""): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta.pages[page];
  const path = href(locale, slug);

  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].hreflang] = absoluteUrl(href(l, slug));
  languages["x-default"] = absoluteUrl(href("en", slug));

  const isHome = page === "home";

  return {
    // The home title is already complete; other pages use the template.
    title: isHome ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: isHome ? meta.title : `${meta.title} | MIPV`,
      description: meta.description,
      url: absoluteUrl(path),
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [
        {
          url: absoluteUrl(site.ogImage.src),
          width: site.ogImage.width,
          height: site.ogImage.height,
          alt: "MIPV — Management. Innovation. Performance. Value.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? meta.title : `${meta.title} | MIPV`,
      description: meta.description,
      images: [absoluteUrl(site.ogImage.src)],
    },
  };
}

/** Organization / ProfessionalService structured data (schema.org). */
export function organizationJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl(site.logo.src),
    image: absoluteUrl(site.ogImage.src),
    slogan: dict.home.hero.tagline,
    description: dict.meta.defaultDescription,
    email: site.email,
    telephone: site.phoneE164,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Business Registration No.",
      value: site.registrationNo,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    areaServed: { "@type": "Country", name: "Malaysia" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.email,
        telephone: [site.phoneE164, site.phone2E164],
        availableLanguage: ["English", "Malay"],
        areaServed: "MY",
      },
    ],
    knowsAbout: dict.domains.map((d) => d.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.servicesPage.heading,
      itemListElement: dict.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
