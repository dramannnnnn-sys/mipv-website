/**
 * Corporate facts used across the website.
 * Edit these values in one place; every page, the footer, metadata and
 * structured data read from here.
 */
export const site = {
  brand: "MIPV",
  legalName: "MIPV Consultancy",
  registrationNo: "003830433-K",
  email: "enquiry@mipv.com.my",
  phoneDisplay: "+60 17-444 9446",
  phoneE164: "+60174449446",
  /** Second line (telephone only; WhatsApp stays on the main number). */
  phone2Display: "+60 18-955 3551",
  phone2E164: "+60189553551",
  whatsappUrl: "https://wa.me/60174449446",
  domainDisplay: "www.mipv.com.my",
  locality: "Nilai",
  region: "Negeri Sembilan",
  country: "Malaysia",
  countryCode: "MY",
  /** Production URL. Override with NEXT_PUBLIC_SITE_URL for previews/staging. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://mipv.com.my").replace(/\/+$/, ""),
  copyrightYear: 2026,
  logo: {
    src: "/images/mipv-logo.png",
    width: 1581,
    height: 325,
  },
  ogImage: {
    src: "/images/og-image.jpg",
    width: 1200,
    height: 630,
  },
} as const;

export const mailtoHref = `mailto:${site.email}`;
export const telHref = `tel:${site.phoneE164}`;
export const tel2Href = `tel:${site.phone2E164}`;
