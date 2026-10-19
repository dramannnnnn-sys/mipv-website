/**
 * Visual assets.
 *
 * Illustrations are original vector artwork drawn for MIPV (no licensing
 * restrictions). Photographs are OPTIONAL: when a path is set to an image in
 * /public/images/photos/, that photograph is shown in place of the
 * illustration. Leave the value as null to keep the illustration.
 *
 * Use only photographs MIPV owns or has licensed. Do not present stock or
 * AI-generated people as MIPV staff, clients or project participants.
 */
export const illustrations = {
  globe: { src: "/images/illustrations/globe.svg", width: 640, height: 640 },
  malaysiaMap: { src: "/images/illustrations/malaysia-map.svg", width: 1050, height: 385 },
  architecture: { src: "/images/illustrations/architecture.svg", width: 840, height: 740 },
} as const;

export type PhotoSlot = { src: string; alt: { en: string; bm: string } } | null;

export const photos: {
  /** About page — corporate overview (landscape, min. 1600 × 1000). */
  about: PhotoSlot;
  /** Services page — training / workshop context (landscape). */
  services: PhotoSlot;
} = {
  about: null,
  services: null,
};
