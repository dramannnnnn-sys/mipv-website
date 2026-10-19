import type { Dictionary } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";

type Doc = Dictionary["legal"]["privacy"];

export function LegalPage({ locale, dict, doc, current }: { locale: Locale; dict: Dictionary; doc: Doc; current: string }) {
  return (
    <>
      <PageHero
        heading={doc.heading}
        subheading={doc.subheading}
        breadcrumbLabel={dict.common.breadcrumbLabel}
        breadcrumb={{ home: { label: dict.common.home, href: href(locale) }, current }}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="prose-legal max-w-3xl">
            <p className="text-[0.9375rem] font-semibold text-muted">
              {dict.legal.lastUpdatedLabel}: {dict.legal.lastUpdated}
            </p>
            {doc.sections.map((s) => (
              <section key={s.title} aria-labelledby={slug(s.title)}>
                <h2 id={slug(s.title)}>{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
