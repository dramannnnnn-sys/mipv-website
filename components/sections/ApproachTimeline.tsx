import { Check } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { cx } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Five-stage delivery framework.
 * Desktop: horizontal timeline with diamond markers on a connecting rule.
 * Mobile/tablet: vertical, well-spaced process.
 * `detailed` adds the full description and typical activities (Approach page).
 */
export function ApproachTimeline({
  stages,
  stageLabel,
  detailed = false,
}: {
  stages: Dictionary["approach"];
  stageLabel: string;
  detailed?: boolean;
}) {
  return (
    <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-6">
      {stages.map((st, i) => (
        <Reveal
          as="li"
          key={st.number}
          delay={i * 0.08}
          className="relative grid grid-cols-[4.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
        >
          {i < stages.length - 1 && (
            <>
              {/* Connector to the next stage: vertical on mobile, horizontal on desktop */}
              <span aria-hidden="true" className="absolute bottom-0 left-[2.25rem] top-[4.5rem] w-[3px] -translate-x-1/2 bg-line lg:hidden" />
              <span
                aria-hidden="true"
                className={cx(
                  "absolute left-[2.25rem] top-[2.25rem] hidden h-[3px] w-[calc(100%+1.5rem)] -translate-y-1/2 lg:block",
                  ["bg-bar-1", "bg-bar-2", "bg-bar-3", "bg-bar-4"][i],
                )}
              />
            </>
          )}
          <span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center">
            <span aria-hidden="true" className={cx("absolute inset-[0.6rem] rotate-45 border-[3px] border-white shadow-[0_0_0_2px_var(--color-brand)]", i === stages.length - 1 ? "bg-brand" : "bg-brand-deep")} />
            <span className="relative font-heading text-lg font-extrabold text-white">
              <span className="sr-only">{stageLabel} </span>
              {st.number}
            </span>
          </span>
          <div className="pt-3 lg:pt-6">
            <h3 className="font-heading text-[1.375rem] font-extrabold tracking-[0.06em] text-ink lg:text-xl xl:text-[1.375rem]">{st.title}</h3>
            <p className={cx("mt-2", detailed ? "font-semibold text-brand" : "text-ink/80")}>{detailed ? st.description : st.short}</p>
            {detailed && (
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {st.activities.map((a) => (
                  <li key={a} className="flex gap-2.5 text-[1rem] text-ink/85">
                    <Check aria-hidden="true" size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-crimson" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
