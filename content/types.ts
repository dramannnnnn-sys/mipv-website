import type { en } from "./en";

/**
 * The English dictionary defines the shape of all site content.
 * The Bahasa Melayu dictionary must satisfy the same type, so a missing
 * translation is a TypeScript error rather than a blank space on the page.
 */
export type Dictionary = typeof en;

export type ServiceId =
  | "consultancy-advisory"
  | "assessment-diagnostics"
  | "research-evaluation"
  | "training-capacity"
  | "audit-review"
  | "implementation-improvement";

export type DomainId = "governance" | "quality-safety" | "human-capital" | "strategy-performance" | "research-innovation";

export type IndustryIcon =
  | "landmark"
  | "building"
  | "briefcase"
  | "factory"
  | "hardhat"
  | "graduation"
  | "users"
  | "store";

export const serviceIds: ServiceId[] = [
  "consultancy-advisory",
  "assessment-diagnostics",
  "research-evaluation",
  "training-capacity",
  "audit-review",
  "implementation-improvement",
];
