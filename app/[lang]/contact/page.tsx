import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone, MessageCircle, Globe, MapPin, Laptop, FileBadge, Building, ArrowUpRight } from "lucide-react";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site, mailtoHref, telHref, tel2Href } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { Logo } from "@/components/ui/Logo";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "contact", "contact") : {};
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const c = dict.contact;

  const actions = [
    { icon: Mail, label: c.labels.email, value: site.email, href: mailtoHref, external: false },
    { icon: Phone, label: c.labels.phone, value: site.phoneDisplay, href: telHref, external: false },
    { icon: Phone, label: c.labels.phone, value: site.phone2Display, href: tel2Href, external: false },
    { icon: MessageCircle, label: c.labels.whatsapp, value: c.whatsappAction, href: site.whatsappUrl, external: true },
  ];

  const details = [
    { icon: Building, label: c.labels.registeredName, value: site.legalName },
    { icon: FileBadge, label: c.labels.registration, value: site.registrationNo },
    { icon: MapPin, label: c.labels.location, value: c.locationValue },
    { icon: Laptop, label: c.labels.operations, value: c.operationsValue },
    { icon: Globe, label: c.labels.website, value: site.domainDisplay },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: href(lang) },
          { name: dict.meta.pages.contact.title, path: href(lang, "contact") },
        ])}
      />
      <PageHero
        heading={c.heading}
        subheading={c.subheading}
        intro={c.intro}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(lang) }, current: dict.nav.contact }}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Corporate contact details */}
            <aside aria-labelledby="contact-details" className="order-2 lg:order-1 lg:col-span-5">
              <div className="border border-line bg-white">
                <div className="border-b border-line p-7 lg:p-8">
                  <Logo alt="MIPV" className="h-10 w-auto" />
                  <h2 id="contact-details" className="mt-6 font-heading text-[0.9375rem] font-extrabold tracking-[0.14em] text-brand">
                    {c.detailsHeading}
                  </h2>
                                  </div>

                <ul className="divide-y divide-line">
                  {actions.map((a) => (
                    <li key={a.href}>
                      <a
                        href={a.href}
                        {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 px-7 py-5 transition-colors hover:bg-rose-mist/50 lg:px-8"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand text-white">
                          <a.icon aria-hidden="true" size={22} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.875rem] font-semibold uppercase tracking-[0.1em] text-muted">{a.label}</span>
                          <span className="block break-words font-heading text-[1.0625rem] font-bold text-ink group-hover:text-brand">
                            {a.value}
                          </span>
                        </span>
                        <ArrowUpRight aria-hidden="true" size={20} className="shrink-0 text-brand" />
                      </a>
                    </li>
                  ))}
                </ul>

                <dl className="divide-y divide-line border-t border-line bg-paper">
                  {details.map((d) => (
                    <div key={d.label} className="flex items-start gap-4 px-7 py-4 lg:px-8">
                      <d.icon aria-hidden="true" size={20} className="mt-1 shrink-0 text-brand" />
                      <div>
                        <dt className="text-[0.875rem] font-semibold uppercase tracking-[0.1em] text-muted">{d.label}</dt>
                        <dd className="font-semibold text-ink">{d.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <p className="border-t border-line px-7 py-5 text-[0.9375rem] text-ink/80 lg:px-8">{c.onsiteNote}</p>
              </div>
              <div className="mt-8 hidden lg:block">
                <Illustration name="malaysiaMap" />
              </div>
            </aside>

            {/* Enquiry form (shown first on mobile) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="border-t-[6px] border-brand bg-white pt-7 lg:border lg:border-t-[6px] lg:border-line lg:border-t-brand lg:p-10">
                <h2 className="type-card">{c.form.heading}</h2>
                <div className="mt-6">
                  <ContactForm
                    locale={lang}
                    t={c.form}
                    services={dict.services.map((s) => ({ id: s.id, title: s.title }))}
                    privacyHref={href(lang, "privacy")}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
