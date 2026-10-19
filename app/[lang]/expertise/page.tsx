import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info, Layers, ClipboardList, Network, Puzzle } from "lucide-react";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { Container, Eyebrow, cx } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, "expertise", "expertise") : {};
}

const integratedIcons = [Layers, ClipboardList, Network, Puzzle];

export default async function ExpertisePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const e = dict.expertisePage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: href(lang) },
          { name: dict.meta.pages.expertise.title, path: href(lang, "expertise") },
        ])}
      />
      <PageHero
        heading={e.heading}
        subheading={e.subheading}
        intro={e.intro}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(lang) }, current: dict.nav.expertise }}
        aside={<Illustration name="globe" priority className="mx-auto max-w-[24rem]" />}
      />

      {/* Domain navigation */}
      <nav aria-label={dict.common.onThisPage} className="border-b border-line bg-white">
        <Container>
          <ol className="grid gap-px py-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {dict.domains.map((d) => (
              <li key={d.id}>
                <a
                  href={`#${d.id}`}
                  className="group flex h-full items-start gap-3 border-l-[3px] border-line px-3 py-2 transition-colors hover:border-brand hover:bg-rose-mist/50"
                >
                  <span className="font-heading text-[0.9375rem] font-extrabold text-bar-1 group-hover:text-brand">{d.number}</span>
                  <span className="font-heading text-[0.8125rem] font-extrabold leading-snug tracking-[0.04em] text-ink group-hover:text-brand">
                    {d.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      {dict.domains.map((d, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={d.id}
            id={d.id}
            aria-labelledby={`${d.id}-title`}
            className={cx("scroll-mt-24 py-16 md:py-24", flip ? "bg-paper" : "bg-white", i > 0 && "border-t border-line")}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={cx("lg:col-span-5", flip && "lg:order-2")}>
                  <span aria-hidden="true" className="block font-heading text-[5rem] font-extrabold leading-none text-bar-1/60 md:text-[6.5rem]">
                    {d.number}
                  </span>
                  <h2 id={`${d.id}-title`} className="type-section mt-2 text-[clamp(1.6rem,1.2vw+1.15rem,2.25rem)]">
                    {d.title}
                  </h2>
                  <p className="type-sub mt-4 text-brand">{d.tagline}</p>
                  <p className="type-lead mt-6 text-ink">{d.intro}</p>
                  <p className="mt-4 text-ink/80">{d.context}</p>
                  <div className="mt-8 border-l-4 border-brand bg-rose-mist/60 px-5 py-4">
                    <p className="font-heading text-[0.8125rem] font-extrabold tracking-[0.16em] text-brand">{dict.common.focusLabel}</p>
                    <p className="mt-1 font-heading text-lg font-bold text-ink">{d.focus}</p>
                  </div>
                </div>

                <div className={cx("lg:col-span-7", flip && "lg:order-1")}>
                  <Reveal>
                    <ul className="grid border-t-2 border-brand sm:grid-cols-2 sm:gap-x-8">
                      {d.items.map((item, k) => (
                        <li key={item} className="flex items-start gap-4 border-b border-line py-4">
                          <span aria-hidden="true" className="mt-1 font-heading text-[0.8125rem] font-extrabold tabular-nums text-bar-2">
                            {String(k + 1).padStart(2, "0")}
                          </span>
                          <span className="font-semibold leading-snug text-ink">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  {d.scopeNote && (
                    <p className="mt-6 flex gap-3 border border-line bg-white p-5 text-[1rem] text-ink/85">
                      <Info aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-brand" />
                      {d.scopeNote}
                    </p>
                  )}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Integrated professional solutions */}
      <section aria-labelledby="integrated" className="diag-lines bg-brand-deep py-16 text-white md:py-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow light>{e.integrated.eyebrow}</Eyebrow>
            <h2 id="integrated" className="type-section mt-4 text-white">
              {e.integrated.heading}
            </h2>
            <p className="type-lead mt-5 text-white/85">{e.integrated.intro}</p>
          </div>
          <ul className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {e.integrated.items.map((item, i) => {
              const Icon = integratedIcons[i];
              return (
                <li key={item.title} className="bg-brand-deep p-7">
                  <Icon aria-hidden="true" size={30} strokeWidth={1.8} className="text-white" />
                  <h3 className="mt-5 font-heading text-lg font-extrabold tracking-[0.04em] text-white">{item.title}</h3>
                  <p className="mt-2 text-[1rem] text-white/80">{item.text}</p>
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
