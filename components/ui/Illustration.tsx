import Image from "next/image";
import { illustrations } from "@/lib/media";
import { cx } from "./primitives";

type Name = keyof typeof illustrations;

/** Original MIPV vector illustrations (decorative unless alt text is supplied). */
export function Illustration({
  name,
  alt = "",
  className,
  priority,
}: {
  name: Name;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const ill = illustrations[name];
  return (
    <Image
      src={ill.src}
      width={ill.width}
      height={ill.height}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      unoptimized
      className={cx("h-auto w-full", className)}
    />
  );
}
