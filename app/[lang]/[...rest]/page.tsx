import { notFound } from "next/navigation";

/**
 * Any unknown path under /en or /bm (e.g. /en/unknown-page) renders the
 * localised 404 page from app/[lang]/not-found.tsx inside the site layout.
 */
export default function CatchAll() {
  notFound();
}
