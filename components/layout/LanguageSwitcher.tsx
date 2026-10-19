"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, switchLocalePath, type Locale } from "@/lib/i18n";
import { cx } from "@/components/ui/primitives";

/** EN | BM switcher that keeps the visitor on the equivalent page. */
export function LanguageSwitcher({
  locale,
  label,
  tone = "dark",
  className,
}: {
  locale: Locale;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={cx("flex items-center font-heading text-[0.9375rem] font-extrabold tracking-[0.12em]", className)}>
      {locales.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className={cx("mx-2", tone === "light" ? "text-white/50" : "text-line")}>
                |
              </span>
            )}
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={localeMeta[l].hreflang}
              lang={localeMeta[l].htmlLang}
              aria-current={active ? "true" : undefined}
              aria-label={localeMeta[l].label}
              className={cx(
                "inline-flex min-h-11 min-w-9 items-center justify-center px-1 transition-colors",
                tone === "light"
                  ? active
                    ? "text-white underline decoration-2 underline-offset-[6px]"
                    : "text-white/75 hover:text-white"
                  : active
                    ? "text-brand underline decoration-2 underline-offset-[6px]"
                    : "text-muted hover:text-brand",
              )}
            >
              {localeMeta[l].short}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
