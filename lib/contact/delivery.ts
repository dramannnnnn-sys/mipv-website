import "server-only";
import type { CleanEnquiry } from "./validation";
import { en } from "@/content/en";
import { site } from "@/lib/site";

/**
 * Email delivery for website enquiries.
 *
 * Provider selection (first match wins):
 *   1. Resend API      — RESEND_API_KEY
 *   2. SMTP (any host) — SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * CONTACT_FROM_EMAIL is required for either provider.
 * If nothing is configured the API reports "not configured" — it never
 * pretends a message was sent.
 */

export type DeliveryResult =
  | { ok: true; provider: "resend" | "smtp"; id?: string }
  | { ok: false; reason: "not_configured" | "provider_error"; detail?: string };

export function deliveryConfig() {
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "";
  const resendKey = process.env.RESEND_API_KEY || "";
  const smtpHost = process.env.SMTP_HOST || "";
  const provider: "resend" | "smtp" | null = resendKey ? "resend" : smtpHost ? "smtp" : null;
  const missing: string[] = [];
  if (!provider) missing.push("RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS");
  if (!from) missing.push("CONTACT_FROM_EMAIL");
  if (provider === "smtp" && (!process.env.SMTP_USER || !process.env.SMTP_PASS)) missing.push("SMTP_USER/SMTP_PASS");
  return { to, from, provider, configured: missing.length === 0, missing };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function serviceLabel(id: CleanEnquiry["service"]) {
  if (id === "general") return en.contact.form.generalEnquiry;
  return en.services.find((s) => s.id === id)?.title ?? id;
}

export function composeEmail(e: CleanEnquiry, meta: { locale: string; ip: string; userAgent: string }) {
  const rows: Array<[string, string]> = [
    ["Full name", e.fullName],
    ["Organisation", e.organisation],
    ["Email", e.email],
    ["Contact number", e.phone || "—"],
    ["Service of interest", serviceLabel(e.service)],
    ["Subject", e.subject],
    ["Site language", meta.locale.toUpperCase()],
    ["Privacy consent", e.consent ? "Given" : "Not given"],
  ];
  const submitted = new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur", dateStyle: "full", timeStyle: "short" });

  const subject = `[MIPV Website] ${e.subject}`.slice(0, 200);

  const text = [
    "New enquiry received through mipv.com.my",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    e.message,
    "",
    "—",
    `Submitted: ${submitted} (MYT)`,
    `IP: ${meta.ip} · User agent: ${meta.userAgent}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f8f6f5;font-family:Arial,Helvetica,sans-serif;color:#262326">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f5;padding:24px 0"><tr><td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-top:6px solid #5f0718">
<tr><td style="padding:28px 32px 8px"><div style="font-size:13px;letter-spacing:2px;font-weight:bold;color:#5f0718">MIPV · WEBSITE ENQUIRY</div>
<h1 style="margin:10px 0 0;font-size:22px;line-height:1.3;color:#262326">${escapeHtml(e.subject)}</h1></td></tr>
<tr><td style="padding:16px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 0;border-bottom:1px solid #e5dedd;color:#625d60;width:170px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid #e5dedd;font-weight:bold">${escapeHtml(v)}</td></tr>`,
  )
  .join("")}
</table></td></tr>
<tr><td style="padding:8px 32px 24px"><div style="font-size:13px;letter-spacing:2px;font-weight:bold;color:#5f0718;margin-bottom:8px">MESSAGE</div>
<div style="font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(e.message)}</div></td></tr>
<tr><td style="padding:16px 32px;background:#f8f6f5;font-size:12px;color:#625d60">Submitted ${escapeHtml(submitted)} (MYT). Reply directly to this email to respond to the sender.</td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
}

export async function deliverEnquiry(
  enquiry: CleanEnquiry,
  meta: { locale: string; ip: string; userAgent: string },
): Promise<DeliveryResult> {
  const cfg = deliveryConfig();
  if (!cfg.configured || !cfg.provider) {
    console.error(`[contact] Email delivery is not configured. Missing: ${cfg.missing.join(", ")}`);
    return { ok: false, reason: "not_configured" };
  }
  const mail = composeEmail(enquiry, meta);

  try {
    if (cfg.provider === "resend") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: cfg.from,
          to: cfg.to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: enquiry.email,
          subject: mail.subject,
          text: mail.text,
          html: mail.html,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
      if (!res.ok || !body.id) {
        console.error("[contact] Resend rejected the message", res.status, body?.message);
        return { ok: false, reason: "provider_error", detail: `resend ${res.status}` };
      }
      return { ok: true, provider: "resend", id: body.id };
    }

    // SMTP via Nodemailer (loaded only when needed).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = await import("nodemailer");
    const nodemailer = mod.default ?? mod;
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    const info = await transporter.sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: enquiry.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    if (!info.accepted || info.accepted.length === 0) {
      console.error("[contact] SMTP server did not accept any recipient", info.rejected);
      return { ok: false, reason: "provider_error", detail: "smtp rejected" };
    }
    return { ok: true, provider: "smtp", id: info.messageId };
  } catch (err) {
    console.error("[contact] Delivery failed", err instanceof Error ? err.message : err);
    return { ok: false, reason: "provider_error" };
  }
}
