import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("container-site", className)}>{children}</div>;
}

export function Eyebrow({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={cx("eyebrow", light && "eyebrow-light", className)}>{children}</p>;
}

/** Standard section header: eyebrow, uppercase H2 and optional intro. */
export function SectionHeader({
  eyebrow,
  heading,
  intro,
  id,
  light,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  id?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag id={id} className={cx("type-section mt-4", light && "text-white")}>
        {heading}
      </Tag>
      {intro && <p className={cx("type-lead mt-5", light ? "text-white/85" : "text-muted")}>{intro}</p>}
    </div>
  );
}

type Variant = "primary" | "outline" | "light" | "ghost-light";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className,
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className" | "children"
>) {
  return (
    <Link href={href} className={cx("btn", `btn-${variant}`, className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />}
    </Link>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cx("link-arrow", className)}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={17} strokeWidth={2.5} />
    </Link>
  );
}

/** The four stepped bars from the MIPV logo, used as a quiet brand marker. */
export function BarMark({ className, vertical }: { className?: string; vertical?: boolean }) {
  const tones = ["bg-bar-1", "bg-bar-2", "bg-bar-3", "bg-bar-4"];
  if (vertical) {
    return (
      <span aria-hidden="true" className={cx("flex gap-[3px]", className)}>
        {tones.map((t) => (
          <span key={t} className={cx("block h-full w-[5px]", t)} />
        ))}
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={cx("bar-stack w-12", className)}>
      {tones.map((t) => (
        <span key={t} className={t} />
      ))}
    </span>
  );
}
