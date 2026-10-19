"use client";

import { usePathname } from "next/navigation";
import { getDictionary, href, isLocale, defaultLocale } from "@/lib/i18n";
import { ButtonLink, Container, BarMark } from "@/components/ui/primitives";

export default function NotFound() {
  const seg = usePathname()?.split("/")[1];
  const locale = isLocale(seg) ? seg : defaultLocale;
  const t = getDictionary(locale).notFound;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <BarMark />
          <p className="mt-6 font-heading text-7xl font-extrabold text-bar-1">404</p>
          <h1 className="type-page mt-4">{t.heading}</h1>
          <p className="type-lead mt-5 text-ink/80">{t.text}</p>
          <ButtonLink href={href(locale)} className="mt-9">
            {t.button}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
