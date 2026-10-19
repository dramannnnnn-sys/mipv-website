import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import { getDictionary, isLocale, locales, localeMeta } from "@/lib/i18n";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

// Fonts are downloaded at build time and self-hosted by Next.js
// (no runtime requests to Google).
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#5f0718",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.defaultTitle, template: dict.meta.titleTemplate },
    description: dict.meta.defaultDescription,
    applicationName: site.brand,
    authors: [{ name: site.brand }],
    creator: site.brand,
    publisher: site.brand,
    formatDetection: { telephone: false, email: false, address: false },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={localeMeta[lang].htmlLang} className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>
        <Header locale={lang} nav={dict.nav} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
        <JsonLd data={[organizationJsonLd(lang), websiteJsonLd(lang)]} />
      </body>
    </html>
  );
}
