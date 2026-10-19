import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { ArrowLink, Container, SectionHeader } from "@/components/ui/primitives";
import { HomeHero } from "@/components/sections/HomeHero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { PrinciplesGrid } from "@/components/sections/Principles";
import { ExpertiseIndex } from "@/components/sections/ExpertiseIndex";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ApproachTimeline } from "@/components/sections/ApproachTimeline";
import { WhyMipv } from "@/components/sections/WhyMipv";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "home") : {};
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const h = dict.home;

  return (
    <>
      <HomeHero locale={lang} dict={dict} />
      <WhoWeAre locale={lang} dict={dict} />

      <section aria-labelledby="home-principles" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="home-principles" eyebrow={h.principles.eyebrow} heading={h.principles.heading} intro={h.principles.intro} />
          <div className="mt-12">
            <PrinciplesGrid principles={dict.principles} />
          </div>
        </Container>
      </section>

      <div className="border-t border-line">
        <ExpertiseIndex locale={lang} dict={dict} />
      </div>
      <ServicesGrid locale={lang} dict={dict} />

      <section aria-labelledby="home-approach" className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader id="home-approach" eyebrow={h.approach.eyebrow} heading={h.approach.heading} intro={h.approach.intro} />
            <ArrowLink href={href(lang, "approach")} className="shrink-0">
              {dict.common.discoverApproach}
            </ArrowLink>
          </div>
          <div className="mt-12 lg:mt-14">
            <ApproachTimeline stages={dict.approach} stageLabel={dict.common.stageLabel} />
          </div>
        </Container>
      </section>

      <WhyMipv dict={dict} />
      <CtaBand locale={lang} dict={dict} />
    </>
  );
}
