import { NextResponse, type NextRequest } from "next/server";
import { getStore } from "@netlify/blobs";
import { rateLimit } from "@/lib/contact/rate-limit";
import { site } from "@/lib/site";

/**
 * Anonymous visitor counter, stored in Netlify Blobs (included free on Netlify).
 *  GET  /api/visits → { today, month, total }
 *  POST /api/visits → counts one visit, then returns { today, month, total }
 * The browser sends POST at most once per day (it remembers the date in
 * localStorage), so "today" ≈ unique visitors per day. No personal data is
 * stored: only a few numbers. Days and months follow Malaysia time.
 * If storage is unavailable (e.g. local development), returns 503 and the
 * counter is simply hidden.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Counts = { today: number; month: number; total: number };

function todayMY() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur" }).format(new Date());
}

function store() {
  return getStore({ name: "visits", consistency: "strong" });
}

function keys() {
  const day = todayMY(); // YYYY-MM-DD
  return { day: `day/${day}`, month: `month/${day.slice(0, 7)}`, total: "total" };
}

async function read(): Promise<Counts> {
  const s = store();
  const k = keys();
  const [day, month, total] = await Promise.all([
    s.get(k.day, { type: "json" }),
    s.get(k.month, { type: "json" }),
    s.get(k.total, { type: "json" }),
  ]);
  return { today: Number(day?.count) || 0, month: Number(month?.count) || 0, total: Number(total?.count) || 0 };
}

function clientIp(req: NextRequest) {
  const nf = req.headers.get("x-nf-client-connection-ip");
  if (nf) return nf.trim().slice(0, 64);
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "unknown").trim().slice(0, 64);
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin).host;
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
    const main = new URL(site.url).host;
    return o === host || o === main || o === `www.${main}`;
  } catch {
    return false;
  }
}

const headers = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    return NextResponse.json(await read(), { headers });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503, headers });
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "rejected" }, { status: 403, headers });
  try {
    // Ignore bots and repeated hits from the same address (counts are read-only for them).
    const ua = req.headers.get("user-agent") || "";
    if (/bot|crawl|spider|slurp|lighthouse|headless/i.test(ua) || !rateLimit(`visit:${clientIp(req)}`).allowed) {
      return NextResponse.json(await read(), { headers });
    }

    const s = store();
    const k = keys();
    const now = await read();
    const next: Counts = { today: now.today + 1, month: now.month + 1, total: now.total + 1 };
    await Promise.all([
      s.setJSON(k.day, { count: next.today }),
      s.setJSON(k.month, { count: next.month }),
      s.setJSON(k.total, { count: next.total }),
    ]);
    return NextResponse.json(next, { headers });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503, headers });
  }
}
