import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { ArrowLink, Container, SectionHeader } from "@/components/ui/primitives";

/** Home page: six service delivery models in a ruled 3 × 2 grid. */
export function ServicesGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.home.services;
  return (
    <section aria-labelledby="home-services" className="border-y border-line bg-paper py-16 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader id="home-services" eyebrow={s.eyebrow} heading={s.heading} intro={s.intro} />
          <ArrowLink href={href(locale, "services")} className="shrink-0">
            {dict.common.viewAllServices}
          </ArrowLink>
        </div>
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {dict.services.map((svc) => (
            <li key={svc.id} className="bg-white">
              <Link
                href={`${href(locale, "services")}#${svc.id}`}
                className="group relative flex h-full flex-col p-7 transition-colors hover:bg-brand lg:p-9"
              >
                <span className="font-heading text-[0.9375rem] font-extrabold tracking-[0.16em] text-bar-2 group-hover:text-white/70">
                  {svc.number}
                </span>
                <h3 className="type-card mt-3 text-ink group-hover:text-white">{svc.title}</h3>
                <p className="mt-3 flex-1 text-ink/80 group-hover:text-white/90">{svc.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-heading text-[0.875rem] font-extrabold tracking-[0.1em] text-brand group-hover:text-white">
                  {dict.common.learnMore}
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
