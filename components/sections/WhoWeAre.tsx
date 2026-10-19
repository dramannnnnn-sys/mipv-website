import type { Dictionary } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { ArrowLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ConnectionsDiagram } from "./ConnectionsDiagram";

export function WhoWeAre({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.home.whoWeAre;
  return (
    <section aria-labelledby="who-we-are" className="border-t border-line bg-paper py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>{w.eyebrow}</Eyebrow>
            <h2 id="who-we-are" className="type-section mt-4">
              {w.heading}
            </h2>
            <div className="mt-6 space-y-5 text-ink/90">
              {w.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ArrowLink href={href(locale, "about")} className="mt-8">
              {dict.common.readMore}
            </ArrowLink>
          </div>
          <Reveal className="mx-auto w-full max-w-[34rem] lg:col-span-6">
            <p className="mb-2 text-center font-heading text-[0.875rem] font-extrabold tracking-[0.16em] text-muted">
              {w.connectionsLabel}
            </p>
            <ConnectionsDiagram labels={w.connections} title={w.connectionsLabel} />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {w.pillars.map((p, i) => (
            <div key={p.title} className="bg-white p-7 lg:p-9">
              <p className="font-heading text-[0.875rem] font-extrabold tracking-[0.16em] text-bar-2">0{i + 1}</p>
              <h3 className="mt-2 font-heading text-xl font-extrabold tracking-[0.04em] text-brand">{p.title}</h3>
              <p className="mt-3 text-ink/85">{p.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
