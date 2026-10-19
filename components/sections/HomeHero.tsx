import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Illustration } from "@/components/ui/Illustration";
import { Logo } from "@/components/ui/Logo";

export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const hero = dict.home.hero;
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Subtle diagonal rules echoing the corporate backgrounds */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-px w-[38rem] rotate-[-32deg] bg-brand/25" />
        <div className="absolute -left-10 bottom-16 hidden h-[3px] w-56 bg-gradient-to-r from-bar-1 to-brand lg:block" />
      </div>

      <div className="container-site grid items-center gap-10 py-10 md:py-12 lg:grid-cols-12 lg:gap-8 lg:py-12 xl:py-14">
        <div className="lg:col-span-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="type-hero mt-5">
            {hero.headline.map((word) => (
              <span key={word} className="block">
                {word.replace(/\.$/, "")}
                <span className="text-crimson">.</span>
              </span>
            ))}
          </h1>
          <p className="type-sub mt-5 text-brand">{hero.tagline}</p>
          <p className="type-lead mt-5 max-w-2xl text-ink/85">{hero.paragraph}</p>
          <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href={href(locale, "expertise")}>{hero.primaryCta}</ButtonLink>
            <ButtonLink href={href(locale, "contact")} variant="outline" arrow={false}>
              {hero.secondaryCta}
            </ButtonLink>
          </div>
          <p className="mt-7 flex items-center gap-2 text-[0.9375rem] font-semibold text-muted">
            <MapPin aria-hidden="true" size={18} className="text-brand" />
            {hero.operatingNote}
          </p>
        </div>

        {/* Visual: brand geometry, globe and the original logo */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem]">
            <div
              className="absolute inset-y-0 right-[-2.5rem] left-[18%] overflow-hidden"
              style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <Image
                src="/images/bg-diagonal.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 0px"
                className="object-cover object-[85%_50%]"
              />
            </div>
            <div className="absolute left-0 top-[12%] w-[86%] drop-shadow-[0_30px_40px_rgba(73,12,28,0.22)]">
              <Illustration name="globe" priority />
            </div>
            <div className="cut-corner-sm absolute bottom-[4%] left-0 w-[64%] bg-white px-6 py-5 shadow-[0_18px_40px_-18px_rgba(73,12,28,0.45)]">
              <Logo alt="MIPV" className="h-auto w-full" />
              <p className="mt-3 text-[0.9375rem] font-semibold leading-snug text-muted">{dict.footer.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
