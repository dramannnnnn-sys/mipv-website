import { Check } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { Container, Eyebrow } from "@/components/ui/primitives";

export function WhyMipv({ dict }: { dict: Dictionary }) {
  const w = dict.home.why;
  return (
    <section aria-labelledby="why-mipv" className="diag-lines relative isolate overflow-hidden bg-brand-deep py-16 text-white md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow light>{w.eyebrow}</Eyebrow>
            <h2 id="why-mipv" className="type-section mt-4 text-white">
              {w.heading}
            </h2>
            <ul className="mt-8 space-y-2 border-l-[3px] border-white/40 pl-6">
              {w.statements.map((s) => (
                <li key={s} className="font-heading text-xl font-bold leading-snug text-white lg:text-[1.375rem]">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-white/85">{w.closing}</p>
          </div>
          <ul className="grid content-start gap-px bg-white/15 sm:grid-cols-2 lg:col-span-7">
            {w.points.map((p) => (
              <li key={p.title} className="bg-brand-deep p-6 lg:p-7">
                <span className="flex h-10 w-10 items-center justify-center bg-white text-brand">
                  <Check aria-hidden="true" size={22} strokeWidth={3} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-extrabold leading-snug text-white">{p.title}</h3>
                <p className="mt-2 text-[1rem] text-white/80">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
