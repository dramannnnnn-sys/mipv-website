#!/usr/bin/env node
/**
 * Reports which production settings are still missing.
 * Usage: npm run check:env   (reads variables from the current environment;
 * locally, export them or run with `node --env-file=.env.local scripts/check-env.mjs`)
 */
const env = process.env;
const rows = [];
const ok = (name, good, note) => rows.push({ name, status: good ? "OK" : "MISSING", note });

ok("NEXT_PUBLIC_SITE_URL", !!env.NEXT_PUBLIC_SITE_URL, env.NEXT_PUBLIC_SITE_URL || "defaults to https://mipv.com.my");
const provider = env.RESEND_API_KEY ? "Resend" : env.SMTP_HOST ? "SMTP" : null;
ok("Email provider", !!provider, provider ? `using ${provider}` : "set RESEND_API_KEY, or SMTP_HOST/SMTP_USER/SMTP_PASS");
if (provider === "SMTP") ok("SMTP_USER / SMTP_PASS", !!(env.SMTP_USER && env.SMTP_PASS), "SMTP credentials");
ok("CONTACT_FROM_EMAIL", !!env.CONTACT_FROM_EMAIL, "verified sender, e.g. MIPV Website <website@mipv.com.my>");
ok("CONTACT_TO_EMAIL", true, env.CONTACT_TO_EMAIL || "defaults to enquiry@mipv.com.my (mailbox must exist)");
const ts = !!(env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
rows.push({ name: "Cloudflare Turnstile", status: ts ? "OK" : "OPTIONAL", note: ts ? "enabled" : "recommended for spam protection" });

console.log("\nMIPV website — environment check\n");
for (const r of rows) console.log(`${r.status.padEnd(9)} ${r.name.padEnd(24)} ${r.note}`);
const missing = rows.filter((r) => r.status === "MISSING" && r.name !== "NEXT_PUBLIC_SITE_URL");
console.log(
  missing.length
    ? "\nThe enquiry form will show a 'not yet available' message until the missing items are configured.\n"
    : "\nEnquiry email delivery is configured.\n",
);
