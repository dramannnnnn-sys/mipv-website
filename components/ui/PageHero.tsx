import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "./primitives";

/**
 * Interior page header: the light MIPV corner-accent background, breadcrumb,
 * uppercase H1 and supporting subheading. Optional illustration on the right.
 */
export function PageHero({
  heading,
  subheading,
  intro,
  breadcrumb,
  breadcrumbLabel,
  aside,
}: {
  heading: string;
  subheading: string;
  intro?: string;
  breadcrumb: { home: { label: string; href: string }; current: string };
  breadcrumbLabel: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-paper">
      <Image
        src="/images/bg-corners.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-90"
      />
      <div className={cx("container-site relative grid items-center gap-10 py-12 md:py-16 lg:py-20", aside && "lg:grid-cols-12")}>
        <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
          <nav aria-label={breadcrumbLabel}>
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.9375rem] font-semibold text-muted">
              <li>
                <Link href={breadcrumb.home.href} className="hover:text-brand hover:underline underline-offset-4">
                  {breadcrumb.home.label}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={16} />
              </li>
              <li aria-current="page" className="text-brand">
                {breadcrumb.current}
              </li>
            </ol>
          </nav>
          <h1 className="type-page mt-5">{heading}</h1>
          <p className="type-sub mt-4 text-brand">{subheading}</p>
          {intro && <p className="type-lead mt-6 max-w-3xl text-ink/85">{intro}</p>}
        </div>
        {aside && <div className="hidden lg:col-span-5 lg:block">{aside}</div>}
      </div>
    </section>
  );
}
