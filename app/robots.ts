import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Block indexing of non-production deployments (Netlify deploy previews /
  // branch deploys, Vercel previews). Netlify sets CONTEXT, Vercel sets VERCEL_ENV.
  const ctx = process.env.CONTEXT || process.env.VERCEL_ENV;
  const isProduction = ctx ? ctx === "production" : true;
  return {
    rules: isProduction ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
