import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { ButtonLink, Container } from "@/components/ui/primitives";

/** Closing call to action on the symmetric MIPV geometric background. */
export function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.home.cta;
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-white">
      <Image src="/images/bg-symmetric.webp" alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/75 md:bg-transparent" />
      <Container className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="cta-heading" className="type-section">
            {c.heading}
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-xl text-ink/85">{c.text}</p>
          <ButtonLink href={href(locale, "contact")} className="mt-9">
            {c.button}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
