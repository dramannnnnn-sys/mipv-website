import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { site, mailtoHref, telHref, tel2Href } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { BarMark } from "@/components/ui/primitives";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { VisitorCounter } from "./VisitorCounter";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav, services } = dict;
  const quick = [
    { slug: "about", label: nav.about },
    { slug: "expertise", label: nav.expertise },
    { slug: "services", label: nav.services },
    { slug: "approach", label: nav.approach },
    { slug: "industries", label: nav.industries },
    { slug: "contact", label: nav.contact },
  ];

  const headingCls = "font-heading text-[0.9375rem] font-extrabold tracking-[0.14em] text-brand";
  const linkCls = "text-[1rem] text-ink transition-colors hover:text-brand hover:underline underline-offset-4";

  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="container-site grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div className="lg:col-span-4">
          <Link href={href(locale)} aria-label={nav.homeLinkLabel} className="inline-block">
            <Logo alt="" className="h-10 w-auto" />
          </Link>
          <p className="mt-6 font-heading text-lg font-bold leading-snug text-ink">{footer.tagline}</p>
          <p className="mt-3 text-muted">{footer.description}</p>
          <BarMark className="mt-6" />
        </div>

        <nav aria-labelledby="footer-quick" className="lg:col-span-2">
          <h2 id="footer-quick" className={headingCls}>
            {footer.quickLinks}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {quick.map((q) => (
              <li key={q.slug}>
                <Link href={href(locale, q.slug)} className={linkCls}>
                  {q.label.charAt(0) + q.label.slice(1).toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services" className="lg:col-span-3">
          <h2 id="footer-services" className={headingCls}>
            {footer.servicesHeading}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`${href(locale, "services")}#${s.id}`} className={linkCls}>
                  {toTitle(s.title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingCls}>{footer.contactHeading}</h2>
          <ul className="mt-5 space-y-3.5 text-[1rem]">
            <li className="flex gap-3">
              <Mail aria-hidden="true" size={19} className="mt-1 shrink-0 text-brand" />
              <a href={mailtoHref} className={linkCls + " break-all"}>
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" size={19} className="mt-1 shrink-0 text-brand" />
              <span className="flex flex-col">
                <a href={telHref} className={linkCls}>
                  {site.phoneDisplay}
                </a>
                <a href={tel2Href} className={linkCls}>
                  {site.phone2Display}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <MessageCircle aria-hidden="true" size={19} className="mt-1 shrink-0 text-brand" />
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                WhatsApp
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden="true" size={19} className="mt-1 shrink-0 text-brand" />
              <span className="text-ink">{footer.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-deep text-white">
        <div className="container-site flex flex-col gap-4 py-6 text-[0.9375rem] lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="font-heading font-extrabold tracking-[0.08em]">{footer.copyright}</p>
            <p className="text-white/80">{footer.registration}</p>
            <VisitorCounter
              locale={locale}
              labels={{ today: footer.visitorsToday, month: footer.visitorsMonth, total: footer.visitorsTotal }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={href(locale, "privacy")} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
              {footer.privacy}
            </Link>
            <Link href={href(locale, "terms")} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
              {footer.terms}
            </Link>
            <Link href={href(locale, "contact")} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
              {footer.contact}
            </Link>
            <LanguageSwitcher locale={locale} label={nav.languageLabel} tone="light" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/** "CONSULTANCY & ADVISORY" → "Consultancy & Advisory" for compact link lists. */
function toTitle(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "&" ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}
