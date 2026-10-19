import { serviceIds, type ServiceId } from "@/content/types";

/**
 * Shared enquiry validation — used by the browser for instant feedback and
 * re-run on the server, which is the authority. Never trust client input.
 */

export type EnquiryField = "fullName" | "organisation" | "email" | "phone" | "service" | "subject" | "message" | "consent";
export type FieldError = "invalid" | "tooLong";
export type FieldErrors = Partial<Record<EnquiryField, FieldError>>;

export type EnquiryInput = {
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  service: ServiceId | "general" | "";
  subject: string;
  message: string;
  consent: boolean;
};

export type CleanEnquiry = Omit<EnquiryInput, "service"> & { service: ServiceId | "general" };

export const LIMITS = {
  fullName: { min: 2, max: 120 },
  organisation: { min: 2, max: 160 },
  email: { max: 254 },
  phone: { max: 25 },
  subject: { min: 3, max: 160 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,25}$/;

/** Collapse whitespace and strip control characters (prevents header injection). */
export function cleanLine(v: unknown): string {
  return typeof v === "string"
    ? v
        .replace(/[\u0000-\u001F\u007F]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

/** Keep line breaks in the message body but remove other control characters. */
export function cleanText(v: unknown): string {
  return typeof v === "string"
    ? v
        .replace(/\r\n?/g, "\n")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g, "")
        .replace(/\n{4,}/g, "\n\n\n")
        .trim()
    : "";
}

export function isServiceValue(v: string): v is ServiceId | "general" {
  return v === "general" || (serviceIds as string[]).includes(v);
}

export function normaliseEnquiry(raw: Record<string, unknown>): EnquiryInput {
  const service = cleanLine(raw.service);
  return {
    fullName: cleanLine(raw.fullName),
    organisation: cleanLine(raw.organisation),
    email: cleanLine(raw.email).toLowerCase(),
    phone: cleanLine(raw.phone),
    service: isServiceValue(service) ? service : "",
    subject: cleanLine(raw.subject),
    message: cleanText(raw.message),
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  };
}

export function validateEnquiry(v: EnquiryInput): FieldErrors {
  const e: FieldErrors = {};
  const len = (field: "fullName" | "organisation" | "subject" | "message") => {
    const { min, max } = LIMITS[field];
    if (v[field].length > max) e[field] = "tooLong";
    else if (v[field].length < min) e[field] = "invalid";
  };
  len("fullName");
  len("organisation");
  if (v.email.length > LIMITS.email.max) e.email = "tooLong";
  else if (!EMAIL_RE.test(v.email)) e.email = "invalid";
  if (v.phone) {
    if (v.phone.length > LIMITS.phone.max) e.phone = "tooLong";
    else if (!PHONE_RE.test(v.phone) || v.phone.replace(/\D/g, "").length < 7) e.phone = "invalid";
  }
  if (!v.service) e.service = "invalid";
  len("subject");
  len("message");
  if (!v.consent) e.consent = "invalid";
  return e;
}
