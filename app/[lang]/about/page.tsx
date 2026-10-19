import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Eye, Target, ShieldCheck, Scale, Lock, FileSearch } from "lucide-react";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { photos } from "@/lib/media";
import { ArrowLink, BarMark, Container, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { Reveal } from "@/components/ui/Reveal";
import { PrinciplesBands } from "@/components/sections/Principles";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "about", "about") : {};
}

const commitmentIcons = [ShieldCheck, Scale, Lock, FileSearch];

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const a = dict.about;
  const photo = photos.about;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: href(lang) },
          { name: dict.meta.pages.about.title, path: href(lang, "about") },
        ])}
      />
      <PageHero
        heading={a.heading}
        subheading={a.subheading}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(lang) }, current: dict.nav.about }}
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
            <Illustration name="architecture" priority className="mx-auto max-w-[26rem]" />
          )
        }
      />

      {/* Corporate overview + corporate information */}
      <section aria-labelledby="overview" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{a.overviewEyebrow}</Eyebrow>
              <h2 id="overview" className="sr-only">
                {a.overviewEyebrow}
              </h2>
              <p className="mt-6 font-heading text-[1.375rem] font-bold leading-snug text-ink md:text-[1.625rem]">
                {a.overview[0]}
              </p>
              <div className="mt-6 space-y-5 text-ink/85">
                {a.overview.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <aside aria-labelledby="facts" className="lg:col-span-5">
              <div className="border-t-[6px] border-brand bg-paper p-7 lg:p-9">
                <h2 id="facts" className="font-heading text-lg font-extrabold tracking-[0.12em] text-brand">
                  {a.factsHeading}
                </h2>
                <dl className="mt-5 divide-y divide-line">
                  {a.facts.map((f) => (
                    <div key={f.label} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="text-[0.9375rem] font-semibold text-muted">{f.label}</dt>
                      <dd className="font-semibold text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Corporate philosophy */}
      <section aria-labelledby="philosophy" className="border-t border-line bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="philosophy" eyebrow={a.philosophy.eyebrow} heading={a.philosophy.heading} intro={a.philosophy.intro} />
          <div className="mt-12">
            <PrinciplesBands principles={dict.principles} />
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section aria-labelledby="vision-mission" className="py-16 md:py-24">
        <Container>
          <div className="flex items-center gap-5">
            <BarMark />
            <h2 id="vision-mission" className="type-section">
              {a.visionMission.heading}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal className="cut-corner diag-lines flex flex-col bg-brand-deep p-8 text-white md:p-12">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-white text-brand">
                  <Eye aria-hidden="true" size={26} />
                </span>
                <h3 className="font-heading text-xl font-extrabold tracking-[0.12em] text-white">{a.visionMission.visionLabel}</h3>
              </div>
              <p className="mt-8 font-heading text-[1.3125rem] font-semibold leading-[1.5] text-white md:text-[1.5rem]">
                {a.visionMission.vision}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col border-2 border-brand bg-white p-8 md:p-12">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-brand text-white">
                  <Target aria-hidden="true" size={26} />
                </span>
                <h3 className="font-heading text-xl font-extrabold tracking-[0.12em] text-brand">{a.visionMission.missionLabel}</h3>
              </div>
              <p className="mt-8 font-heading text-[1.3125rem] font-semibold leading-[1.5] text-ink md:text-[1.5rem]">
                {a.visionMission.mission}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Operating model */}
      <section aria-labelledby="operating-model" className="border-t border-line bg-paper py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{a.operatingModel.eyebrow}</Eyebrow>
              <h2 id="operating-model" className="type-section mt-4">
                {a.operatingModel.heading}
              </h2>
              <div className="mt-6 space-y-5 text-ink/85">
                {a.operatingModel.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ArrowLink href={href(lang, "approach")} className="mt-7">
                {a.operatingModel.link}
              </ArrowLink>
            </div>
            <div className="lg:col-span-7">
              <Illustration name="malaysiaMap" />
            </div>
          </div>
        </Container>
      </section>

      {/* Professional commitment */}
      <section aria-labelledby="commitment" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="commitment" eyebrow={a.commitment.eyebrow} heading={a.commitment.heading} />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {a.commitment.items.map((item, i) => {
              const Icon = commitmentIcons[i];
              return (
                <li key={item.title} className="bg-white p-7 lg:p-8">
                  <Icon aria-hidden="true" size={30} strokeWidth={1.8} className="text-brand" />
                  <h3 className="mt-5 font-heading text-lg font-extrabold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-[1rem] text-ink/80">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand locale={lang} dict={dict} />
    </>
  );
}
