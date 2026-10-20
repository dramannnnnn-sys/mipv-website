import { NextResponse, type NextRequest } from "next/server";
import { normaliseEnquiry, validateEnquiry, type CleanEnquiry } from "@/lib/contact/validation";
import { rateLimit } from "@/lib/contact/rate-limit";
import { verifyTurnstile, turnstileEnabled } from "@/lib/contact/turnstile";
import { deliverEnquiry } from "@/lib/contact/delivery";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_TIME_MS = 3_000;

type ErrorCode = "validation" | "rejected" | "rate_limited" | "not_configured" | "failed";

function fail(code: ErrorCode, status: number, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error: code, ...extra }, { status, headers });
}

function clientIp(req: NextRequest) {
  const nf = req.headers.get("x-nf-client-connection-ip"); // Netlify
  if (nf) return nf.trim().slice(0, 64);
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip") || "unknown").trim().slice(0, 64);
}

/** Accept same-origin requests only (protects against cross-site form posting). */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // some privacy tools strip Origin; other checks still apply
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
    const allowed = new Set([host, new URL(site.url).host, `www.${new URL(site.url).host}`]);
    return allowed.has(o.host);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail("rejected", 403);

  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return fail("rejected", 415);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return fail("rejected", 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("bad body");
  } catch {
    return fail("rejected", 400);
  }

  const ip = clientIp(req);
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return fail("rate_limited", 429, {}, { "Retry-After": String(limit.retryAfterSeconds) });
  }

  // Spam signals: hidden honeypot field and an implausibly fast submission.
  // These are rejected with an error — never a fake success.
  const honeypot = typeof body.website === "string" ? body.website : "";
  const startedAt = Number(body.startedAt);
  if (honeypot.trim() !== "" || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return fail("rejected", 400);
  }

  if (turnstileEnabled()) {
    const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    if (!(await verifyTurnstile(token, ip))) return fail("rejected", 400, { field: "captcha" });
  }

  const enquiry = normaliseEnquiry(body);
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) return fail("validation", 422, { fields: errors });

  const locale = body.locale === "bm" ? "bm" : "en";
  const result = await deliverEnquiry(enquiry as CleanEnquiry, {
    locale,
    ip,
    userAgent: (req.headers.get("user-agent") || "unknown").slice(0, 300),
  });

  if (!result.ok) {
    return result.reason === "not_configured" ? fail("not_configured", 503) : fail("failed", 502);
  }

  // Success is returned ONLY after the email provider has accepted the message.
  return NextResponse.json({ ok: true }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
