# MIPV — Corporate Website

**MANAGEMENT. INNOVATION. PERFORMANCE. VALUE.**
Integrated Expertise. Evidence-Based Solutions. Sustainable Value.

This is the bilingual (English / Bahasa Melayu) corporate website for MIPV (registered as MIPV Consultancy, 003830433-K). It is built with Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide icons and Motion.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (optional for local browsing)
npm run dev                  # http://localhost:3000  → redirects to /en
```

Production build:

```bash
npm run build && npm start
```

You need Node.js 20.9 or newer. See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for GitHub, Vercel, the domain, DNS, SSL and email setup.

## Routes

| English | Bahasa Melayu | Page |
|---|---|---|
| `/en` | `/bm` | Home |
| `/en/about` | `/bm/about` | About MIPV |
| `/en/expertise` | `/bm/expertise` | Our Expertise (5 domains, anchor links) |
| `/en/services` | `/bm/services` | Professional Services (6 models) |
| `/en/approach` | `/bm/approach` | Our Integrated Approach |
| `/en/industries` | `/bm/industries` | Industries & Sectors |
| `/en/contact` | `/bm/contact` | Contact + enquiry form |
| `/en/privacy` | `/bm/privacy` | Privacy Policy (PDPA 2010) |
| `/en/terms` | `/bm/terms` | Website Terms |

- `/` permanently redirects to `/en`, so there is no duplicate content at the root.
- `/ms/*` redirects to `/bm/*`.
- Service links such as `/en/contact?service=audit-review` prefill the enquiry form.

## Editing content

All text lives in two files, and both must keep the same structure:

- `content/en.ts`: English
- `content/bm.ts`: Bahasa Melayu (TypeScript reports an error if a translation is missing)

Corporate facts (registration number, email, phone, WhatsApp, domain) are kept in `lib/site.ts`.

## Brand assets

| File | Purpose |
|---|---|
| `public/images/mipv-logo.png` | Original MIPV logo. It is trimmed of empty margins only, and is never recoloured or stretched. |
| `public/images/bg-*.webp` | The supplied MIPV geometric backgrounds, optimised as WebP files. |
| `public/images/illustrations/*.svg` | Original vector illustrations (globe, Malaysia map, architecture). |
| `public/images/og-image.jpg` | Social sharing image (1200 × 630). |
| `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | Icons made from the logo's bar mark. |

**Adding photographs (optional).** Put the images in `public/images/photos/` and set the paths in `lib/media.ts`. Each photo then replaces the illustration on the About or Services page. Use only photos that MIPV owns or has licensed. Never present stock or AI-generated people as MIPV staff or clients.

## Project structure

```
app/
  [lang]/            Localised pages (layout, home, about, … , not-found)
  api/contact/       Enquiry endpoint (validation, spam protection, email)
  sitemap.ts         sitemap.xml with hreflang alternates
  robots.ts          robots.txt (blocks Vercel preview deployments)
  manifest.ts        Web app manifest
components/
  layout/            Header, Footer, LanguageSwitcher
  sections/          Page sections (hero, principles, timeline, …)
  ui/                Buttons, headings, Logo, PageHero, Reveal, Illustration
  contact/           ContactForm (client)
  seo/               JSON-LD helper
content/             en.ts, bm.ts, types.ts
lib/                 i18n, site facts, SEO helpers, media, contact/*
```

## Before launch

Have the Privacy Policy and Website Terms reviewed by your legal adviser. Check that every service description matches MIPV's verified professional scope and authorisations.
