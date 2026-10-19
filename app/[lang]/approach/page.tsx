import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserCheck, Users, Wrench, BadgeCheck, Lock, RefreshCw, MapPin, RotateCcw } from "lucide-react";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { ApproachTimeline } from "@/components/sections/ApproachTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "approach", "approach") : {};
}

const attributeIcons = [UserCheck, Users, Wrench, BadgeCheck, Lock, RefreshCw];

export default async function ApproachPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const ap = dict.approachPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: href(lang) },
          { name: dict.meta.pages.approach.title, path: href(lang, "approach") },
        ])}
      />
      <PageHero
        heading={ap.heading}
        subheading={ap.subheading}
        intro={ap.intro}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(lang) }, current: dict.nav.approach }}
      />

      <section aria-labelledby="framework" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="framework" eyebrow={ap.frameworkEyebrow} heading={ap.frameworkHeading} />
          <div className="mt-12 lg:mt-16">
            <ApproachTimeline stages={dict.approach} stageLabel={dict.common.stageLabel} detailed />
          </div>
          <p className="mt-12 flex items-start gap-4 border-t border-line pt-8 text-ink/85 lg:max-w-4xl">
            <RotateCcw aria-hidden="true" size={24} className="mt-0.5 shrink-0 text-brand" />
            {ap.cycleNote}
          </p>
        </Container>
      </section>

      <section aria-labelledby="operating-model" className="border-t border-line bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>{ap.model.eyebrow}</Eyebrow>
              <h2 id="operating-model" className="type-section mt-4">
                {ap.model.heading}
              </h2>
              <div className="mt-6 space-y-5 text-ink/85">
                {ap.model.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-6 flex gap-3 font-semibold text-ink">
                <MapPin aria-hidden="true" size={20} className="mt-1 shrink-0 text-brand" />
                {ap.model.note}
              </p>
              <div className="mt-10 hidden max-w-[20rem] lg:block">
                <Illustration name="globe" />
              </div>
            </div>
            <ul className="grid content-start gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {ap.model.attributes.map((attr, i) => {
                const Icon = attributeIcons[i];
                return (
                  <li key={attr.title} className="bg-white p-7">
                    <span className="flex h-12 w-12 items-center justify-center bg-brand text-white">
                      <Icon aria-hidden="true" size={24} />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-extrabold tracking-[0.06em] text-ink">{attr.title}</h3>
                    <p className="mt-1.5 text-ink/80">{attr.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand locale={lang} dict={dict} />
    </>
  );
}
