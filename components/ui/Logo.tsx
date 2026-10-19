import Image from "next/image";
import { site } from "@/lib/site";
import { cx } from "./primitives";

/**
 * The original MIPV logo, reproduced exactly (transparent PNG, native aspect
 * ratio 1581 × 325). Size it by height only — never stretch or recolour it.
 * It must always sit on a white or very light background.
 */
export function Logo({ className, priority, alt = "MIPV" }: { className?: string; priority?: boolean; alt?: string }) {
  return (
    <Image
      src={site.logo.src}
      width={site.logo.width}
      height={site.logo.height}
      alt={alt}
      priority={priority}
      sizes="(max-width: 640px) 160px, 320px"
      className={cx("select-none", className)}
    />
  );
}
