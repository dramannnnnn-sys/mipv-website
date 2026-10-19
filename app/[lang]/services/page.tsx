import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { photos } from "@/lib/media";
import { site } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "services", "services") : {};
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const sp = dict.servicesPage;
  const photo = photos.services;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(lang, [
            { name: dict.common.home, path: href(lang) },
            { name: dict.meta.pages.services.title, path: href(lang, "services") },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: sp.heading,
            itemListElement: dict.services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.title,
                description: s.description,
                provider: { "@id": `${site.url}/#organization` },
                areaServed: "MY",
              },
            })),
          },
        ]}
      />
      <PageHero
        heading={sp.heading}
        subheading={sp.subheading}
        intro={sp.intro}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(lang) }, current: dict.nav.services }}
        aside={
          photo ? (
            <Image
              src={photo.src}
              alt={photo.alt[lang]}
              width={1600}
              height={1000}
              priority
              sizes="40vw"
              className="cut-corner aspect-[4/3] w-full object-cover"
            />
          ) : (
            <Illustration name="architecture" priority className="mx-auto max-w-[24rem]" />
          )
        }
      />

      <section aria-label={sp.heading} className="py-12 md:py-20">
        <Container>
          <ol className="border-t-2 border-brand">
            {dict.services.map((s, i) => (
              <li key={s.id} id={s.id} className="scroll-mt-24 border-b border-line">
                <Reveal className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                  <div className="lg:col-span-1">
                    <span aria-hidden="true" className="font-heading text-5xl font-extrabold leading-none text-bar-1 lg:text-6xl">
                      {s.number}
                    </span>
                  </div>
                  <div className="lg:col-span-6">
                    <h2 className="type-card text-[clamp(1.375rem,0.8vw+1.15rem,1.875rem)]">{s.title}</h2>
                    <p className="type-lead mt-4 text-ink/85">{s.description}</p>
                    <ButtonLink
                      href={`${href(lang, "contact")}?service=${s.id}`}
                      variant={i % 2 === 0 ? "primary" : "outline"}
                      className="mt-7 w-full sm:w-auto"
                    >
                      {dict.common.enquireService}
                    </ButtonLink>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="h-full bg-paper p-6 lg:p-8">
                      <p className="font-heading text-[0.8125rem] font-extrabold tracking-[0.16em] text-brand">{dict.common.includesLabel}</p>
                      <ul className="mt-4 space-y-3">
                        {s.includes.map((inc) => (
                          <li key={inc} className="flex gap-3 text-ink">
                            <Check aria-hidden="true" size={19} strokeWidth={2.5} className="mt-1 shrink-0 text-crimson" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <aside aria-labelledby="scope" className="mt-12 grid gap-5 border-l-4 border-brand bg-rose-mist/60 p-7 md:grid-cols-[auto_1fr] md:p-9">
            <ShieldCheck aria-hidden="true" size={34} strokeWidth={1.8} className="text-brand" />
            <div>
              <h2 id="scope" className="font-heading text-lg font-extrabold tracking-[0.12em] text-brand">
                {sp.scope.heading}
              </h2>
              <p className="mt-2 text-ink/90">{sp.scope.text}</p>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand locale={lang} dict={dict} />
    </>
  );
}
