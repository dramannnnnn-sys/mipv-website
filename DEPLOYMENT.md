# MIPV Website: Deployment Guide

This guide takes the project from your computer to **https://mipv.com.my** on Vercel. Nothing in this project changes DNS or connects the domain for you. Every step that touches the domain or email must be done, and confirmed, in your registrar, DNS and email provider accounts.

> **Status at hand-over**
> - Website source code: complete.
> - Domain `mipv.com.my`: **not yet connected** (complete steps 4–5).
> - Mailbox `enquiry@mipv.com.my`: **may not exist yet** (complete step 6).
> - Enquiry form email delivery: **not yet configured**. Until it is, the form tells visitors that online enquiries are not yet available and points them to email, telephone and WhatsApp. It never shows a false "sent" message.

---

## 1. Local development

Requirements: **Node.js 20.9+** (LTS recommended) and npm.

```bash
cd mipv-website
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. It redirects to `/en`. Check `/bm` as well.

Before deploying, check that the production build passes:

```bash
npm run typecheck
npm run build
npm start          # serves the production build on http://localhost:3000
```

> This project was written and tested in an environment without access to the npm registry. Rendering, layout, links, language switching, the form and the API logic were all verified there. Your first `npm install && npm run build` is the first full Next.js compile, so run it before you push. If the build reports anything, fix it then.

## 2. GitHub repository

1. Create a **private** repository on GitHub, for example `mipv-website`.
2. From the project folder:

```bash
git init
git add .
git commit -m "MIPV website: initial release"
git branch -M main
git remote add origin https://github.com/<your-account>/mipv-website.git
git push -u origin main
```

`.env.local` is ignored by `.gitignore`. Never commit API keys or passwords.

## 3. Deploy to Vercel

1. Sign in at https://vercel.com, ideally with the same GitHub account.
2. Choose **Add New → Project** and import the `mipv-website` repository.
3. Vercel detects **Next.js** automatically. Keep the default build settings.
4. Under **Environment Variables**, add the values from section 7. You can skip the email values for now and add them later.
5. Click **Deploy**. You will get a URL such as `mipv-website.vercel.app`. Test it (section 8).

Preview deployments (any branch other than `main`) automatically send `Disallow: /` in robots.txt, so search engines index only production.

## 4. Connect the custom domain

In Vercel, open **Project → Settings → Domains**:

1. Add `mipv.com.my`.
2. Add `www.mipv.com.my`. When Vercel asks, choose to **redirect `www.mipv.com.my` → `mipv.com.my`** (308). The apex domain is the canonical address used in the sitemap and SEO tags.
3. Vercel then shows the DNS records it needs. **Use the exact values Vercel displays for your project.** They usually look like this:

| Type | Name / Host | Value (confirm in Vercel) | Purpose |
|---|---|---|---|
| A | `@` (mipv.com.my) | `76.76.21.21`, or the project-specific IP Vercel shows | Apex domain |
| CNAME | `www` | `cname.vercel-dns.com`, or the project-specific target Vercel shows | www subdomain |

## 5. DNS records at your registrar

`.com.my` domains are managed through a MYNIC-accredited registrar or reseller. Log in to whichever company manages `mipv.com.my` and open its **DNS / Zone Editor**.

Confirm these points with the registrar or hosting provider before you change anything:

- **Where DNS is hosted.** It might be the registrar, a hosting company (cPanel), or Cloudflare. Records must be edited where the domain's **nameservers** point.
- **Existing A / CNAME records** for `@` and `www`, such as an old hosting page. Replace them with the Vercel values. Do not leave two conflicting A records for `@`.
- **MX records.** These control email (`enquiry@mipv.com.my`). **Do not delete or change MX records** when you connect the website. The website and the mailbox are separate services.
- **TTL.** A low TTL (300–3600 seconds) makes changes visible faster.

After saving, Vercel shows each domain as **Valid Configuration** once DNS has propagated. This takes from a few minutes up to 24–48 hours.

**Using Cloudflare DNS?** Set both records to **DNS only** (grey cloud) so that Vercel can issue the SSL certificate, or follow Vercel's Cloudflare guidance.

## 6. HTTPS / SSL

Vercel issues and renews SSL certificates automatically once the DNS records are correct. You do not need to buy or upload a certificate. The site also sends an HSTS header. Confirm the following:

- `https://mipv.com.my` loads with a valid padlock.
- `http://mipv.com.my` redirects to `https://`.
- `https://www.mipv.com.my` redirects to `https://mipv.com.my`.

## 7. Enquiry form email delivery

### 7a. Make sure the mailbox exists

`enquiry@mipv.com.my` must be a working mailbox or forwarding address. It can be set up with Google Workspace, Microsoft 365, Zoho Mail, or your hosting provider's email. Send it a test email from a personal account before going further. **The form can only deliver to a mailbox that receives mail.**

### 7b. Choose a sending provider

**Option A: Resend (recommended).** It is simple and reliable from Vercel.

1. Create an account at https://resend.com.
2. Go to **Domains → Add Domain** and enter `mipv.com.my`. Using a sending subdomain such as `send.mipv.com.my` keeps it separate from your mailbox records.
3. Resend shows several DNS records: SPF (TXT), DKIM (TXT) and an MX record for bounces on the sending subdomain. Add them **exactly as shown** at your DNS host. These records are in addition to your mailbox's existing MX records; they do not replace them.
4. Wait until Resend shows the domain as **Verified**.
5. Create an **API key** with sending access.
6. In Vercel, add:

```
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL=MIPV Website <website@mipv.com.my>
CONTACT_TO_EMAIL=enquiry@mipv.com.my
```

**Option B: SMTP.** Use this with Google Workspace, Microsoft 365, Zoho or cPanel mail.

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false        # true for port 465
SMTP_USER=website@mipv.com.my
SMTP_PASS=app-password-or-smtp-password
CONTACT_FROM_EMAIL=MIPV Website <website@mipv.com.my>
CONTACT_TO_EMAIL=enquiry@mipv.com.my
```

Use an **app password** wherever the provider requires one. Google and Microsoft accounts with 2FA do.

After you add or change variables, **redeploy** (Vercel → Deployments → Redeploy).

### How delivery behaves

- The visitor sees a success message **only after the provider accepts the email**.
- If email is not configured, the visitor is told the online form is not yet available, and the message is not sent.
- If the provider rejects the message, the visitor sees an error and is offered email, telephone and WhatsApp.
- Each email includes all form fields. **Reply-To** is set to the visitor's address, so you can reply directly.
- Server logs (Vercel → Project → Logs) record configuration problems, for example `Email delivery is not configured. Missing: …`.

### 7c. Spam protection

These protections are built in and need no setup:

- Server-side validation of every field
- Same-origin check
- Hidden honeypot field
- Minimum time-to-complete check
- Per-IP rate limit (5 submissions per 10 minutes)
- Header-injection protection
- Body size limit

**Recommended addition: Cloudflare Turnstile** (free and privacy-friendly):

1. In the Cloudflare dashboard, open **Turnstile → Add widget**. Add the hostnames `mipv.com.my` and `www.mipv.com.my`, and your `*.vercel.app` URL if you want to test there.
2. Add to Vercel:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

3. Redeploy. The widget appears above the submit button and is verified on the server for every submission.

### 7d. Production environment variables (summary)

| Variable | Required | Example / notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://mipv.com.my` |
| `CONTACT_TO_EMAIL` | Yes | `enquiry@mipv.com.my` (the mailbox must exist) |
| `CONTACT_FROM_EMAIL` | Yes | `MIPV Website <website@mipv.com.my>` (on a verified domain) |
| `RESEND_API_KEY` | Option A | From Resend |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | Option B | From your email provider |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Optional | Cloudflare Turnstile |

To see what is still missing locally, run `node --env-file=.env.local scripts/check-env.mjs`.

## 8. Testing checklist

Run these checks first on the `*.vercel.app` URL, then again on `https://mipv.com.my`.

**Pages and language**
- [ ] `/` redirects to `/en`. All 9 pages load in `/en/...` and `/bm/...`.
- [ ] EN | BM switcher keeps you on the same page (e.g. `/en/services` → `/bm/services`).
- [ ] An unknown page (e.g. `/en/xyz`) shows the branded 404 page.
- [ ] Mobile menu opens and closes, and Escape closes it.

**Enquiry form**
- [ ] Submitting an empty form shows the error summary and field errors.
- [ ] "Enquire about this service" on Services prefills the service on Contact.
- [ ] With email configured, a real submission shows the success message **and** the email arrives at `enquiry@mipv.com.my`. Check the spam folder too.
- [ ] Replying to that email goes to the visitor's address.
- [ ] Contact links work: email (`mailto:`), telephone (`tel:+60174449446`) and WhatsApp (`https://wa.me/60174449446`).

**SEO**
- [ ] `https://mipv.com.my/sitemap.xml` lists 18 URLs with hreflang alternates.
- [ ] `https://mipv.com.my/robots.txt` allows indexing and points to the sitemap.
- [ ] Page source shows `<link rel="canonical">` and `hreflang` links (`en-MY`, `ms-MY`, `x-default`).
- [ ] The sharing preview shows the MIPV image. Test with https://www.opengraph.xyz.
- [ ] Structured data passes https://search.google.com/test/rich-results.

**Quality**
- [ ] Lighthouse (Chrome DevTools) on Home and Contact shows high Performance, Accessibility, Best Practices and SEO scores.

## 9. Launch

1. Confirm that sections 4–8 are complete.
2. Add the site to **Google Search Console**. Verify `mipv.com.my` using a DNS TXT record, then submit `https://mipv.com.my/sitemap.xml`.
3. Optionally add a **Google Business Profile** as a service-area business without a public address. The business operates remotely from Nilai, so do not publish a street address.
4. Keep the Vercel project, GitHub repository, DNS, and email provider logins in a secure shared password manager.

## 10. Items needing credentials or confirmation before launch

| Item | Who / where |
|---|---|
| DNS access for `mipv.com.my` | Domain registrar or DNS host |
| Mailbox `enquiry@mipv.com.my` | Email provider (Google Workspace, Microsoft 365, Zoho, hosting) |
| Resend API key and domain verification, **or** SMTP credentials | Resend, or your email provider |
| Cloudflare Turnstile keys (optional) | Cloudflare account |
| Legal review of Privacy Policy and Website Terms | MIPV's legal adviser |
| Confirmation that service descriptions match verified professional scope | MIPV management |
