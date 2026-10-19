import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landmark, Building2, Briefcase, Factory, HardHat, GraduationCap, Users, Store, Info, type LucideIcon } from "lucide-react";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { IndustryIcon } from "@/content/types";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "industries", "industries") : {};
}

const icons: Record<IndustryIcon, LucideIcon> = {
  landmark: Landmark,
  building: Building2,
  briefcase: Briefcase,
  factory: Factory,
  hardhat: HardHat,
  graduation: GraduationCap,
  users: Users,
  store: Store,
};

export default async function IndustriesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const ip = dict.industriesPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: href(lang) },
          { name: dict.meta.pages.industries.title, path: href(lang, "industries") },
        ])}
      />
      <PageHero
        heading={ip.heading}
        subheading={ip.subheading}
        intro={ip.intro}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(lang) }, current: dict.nav.industries }}
      />

      <section aria-labelledby="sectors" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="sectors" heading={ip.listHeading} />
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {dict.industries.map((ind, i) => {
              const Icon = icons[ind.icon];
              return (
                <Reveal as="li" key={ind.name} delay={(i % 4) * 0.06} className="group relative bg-white p-7 lg:p-8">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="flex h-14 w-14 items-center justify-center bg-rose-mist text-brand">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-heading text-[1.1875rem] font-extrabold leading-snug text-ink">{ind.name}</h3>
                  <p className="mt-2.5 text-[1rem] text-ink/80">{ind.text}</p>
                </Reveal>
              );
            })}
          </ul>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
            <p className="flex gap-4 border-l-4 border-brand bg-paper p-6 text-ink/90 lg:col-span-5">
              <Info aria-hidden="true" size={22} className="mt-1 shrink-0 text-brand" />
              {ip.note}
            </p>
            <div className="lg:col-span-7">
              <Illustration name="malaysiaMap" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand locale={lang} dict={dict} />
    </>
  );
}
