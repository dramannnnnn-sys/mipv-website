import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { ArrowLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Illustration } from "@/components/ui/Illustration";

/** Home page: the five domains as an editorial index, each linking to its detail. */
export function ExpertiseIndex({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.home.expertise;
  return (
    <section aria-labelledby="home-expertise" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h2 id="home-expertise" className="type-section mt-4">
                {s.heading}
              </h2>
              <p className="type-lead mt-5 text-muted">{s.intro}</p>
              <ArrowLink href={href(locale, "expertise")} className="mt-7">
                {dict.common.viewAllExpertise}
              </ArrowLink>
              <div className="mt-10 hidden max-w-[22rem] lg:block">
                <Illustration name="architecture" />
              </div>
            </div>
          </div>

          <ol className="border-t-2 border-brand lg:col-span-8">
            {dict.domains.map((d) => (
              <li key={d.id} className="border-b border-line">
                <Link
                  href={`${href(locale, "expertise")}#${d.id}`}
                  className="group grid grid-cols-[3.25rem_1fr_auto] items-start gap-x-4 py-7 transition-colors hover:bg-rose-mist/60 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-6 sm:px-4 lg:py-8"
                >
                  <span className="font-heading text-3xl font-extrabold leading-none text-bar-1 transition-colors group-hover:text-brand sm:text-[2.75rem]">
                    {d.number}
                  </span>
                  <span>
                    <span className="type-card block text-ink group-hover:text-brand">{d.title}</span>
                    <span className="mt-2 block text-ink/75">{d.short}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={26}
                    className="mt-1 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
