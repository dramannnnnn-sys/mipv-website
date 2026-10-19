import type { Dictionary } from "@/content/types";
import { cx } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const tones = [
  { bar: "bg-bar-1", text: "text-bar-1" },
  { bar: "bg-bar-2", text: "text-bar-2" },
  { bar: "bg-bar-3", text: "text-bar-3" },
  { bar: "bg-bar-4", text: "text-bar-4" },
];

/**
 * The four principles. Each column takes the tone of one of the four stepped
 * bars in the MIPV logo (light → deep), from M to V.
 */
export function PrinciplesGrid({ principles }: { principles: Dictionary["principles"] }) {
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, i) => (
        <Reveal as="li" key={p.letter} delay={i * 0.08} className="relative bg-white p-7 pt-9 lg:p-8 lg:pt-10">
          <span aria-hidden="true" className={cx("absolute inset-x-0 top-0 h-1.5", tones[i].bar)} />
          <span
            aria-hidden="true"
            className={cx("block font-heading text-[5.5rem] font-extrabold leading-[0.85] lg:text-[6.5rem]", tones[i].text)}
          >
            {p.letter}
          </span>
          <h3 className="mt-6 font-heading text-[1.375rem] font-extrabold tracking-[0.04em] text-ink">
            <span className="sr-only">{p.letter} — </span>
            {p.title}
          </h3>
          {p.subtitle && <p className="text-[0.9375rem] font-semibold italic text-muted">{p.subtitle}</p>}
          <p className="mt-3 font-semibold leading-snug text-brand">{p.lead}</p>
          <p className="mt-3 text-ink/80">{p.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/**
 * Alternative presentation for the About page: four stacked bands that echo
 * the logo's bars, each widening from M to V.
 */
export function PrinciplesBands({ principles }: { principles: Dictionary["principles"] }) {
  const widths = ["lg:w-[82%]", "lg:w-[88%]", "lg:w-[94%]", "lg:w-full"];
  const bg = ["bg-bar-1", "bg-bar-2", "bg-bar-3", "bg-bar-4"];
  return (
    <ol className="space-y-3">
      {principles.map((p, i) => (
        <Reveal as="li" key={p.letter} delay={i * 0.07} className={cx("cut-corner-sm text-white", bg[i], widths[i])}>
          <div className="grid items-center gap-x-8 gap-y-2 px-6 py-6 sm:grid-cols-[5rem_1fr] md:grid-cols-[5rem_15rem_1fr] lg:px-10">
            <span aria-hidden="true" className="font-heading text-6xl font-extrabold leading-none text-white/95">
              {p.letter}
            </span>
            <div>
              <h3 className="font-heading text-xl font-extrabold tracking-[0.06em] text-white">{p.title}</h3>
              {p.subtitle && <p className="text-[0.9375rem] italic text-white/80">{p.subtitle}</p>}
            </div>
            <div className="sm:col-start-2 md:col-start-auto">
              <p className="font-semibold text-white">{p.lead}</p>
              <p className="mt-1 text-white/85">{p.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
