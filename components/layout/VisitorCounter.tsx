"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Counts = { today: number; month: number; total: number };

const KEY = "mipv-last-visit";

function todayMY() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur" }).format(new Date());
}

/**
 * Anonymous visitor counter shown in the footer (today / this month / total).
 * Each browser is counted at most once per Malaysian day: only the date of
 * the last visit is kept in localStorage. Nothing is shown until real numbers
 * arrive, and the counter stays hidden if the count service is unavailable.
 */
export function VisitorCounter({ locale, labels }: { locale: Locale; labels: { today: string; month: string; total: string } }) {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    let cancelled = false;
    const today = todayMY();
    let last: string | null = null;
    try {
      last = window.localStorage.getItem(KEY);
    } catch {
      /* storage blocked: count but do not remember */
    }
    const automated = navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent);
    const shouldCount = last !== today && !automated;

    fetch("/api/visits", { method: shouldCount ? "POST" : "GET", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Counts | null) => {
        if (cancelled || !data || typeof data.total !== "number") return;
        setCounts(data);
        if (shouldCount) {
          try {
            window.localStorage.setItem(KEY, today);
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!counts) return null;
  const fmt = new Intl.NumberFormat(locale === "bm" ? "ms-MY" : "en-MY");
  const items = [
    { label: labels.today, value: counts.today },
    { label: labels.month, value: counts.month },
    { label: labels.total, value: counts.total },
  ];

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-white/80">
      <Users aria-hidden="true" size={16} className="shrink-0 text-white/70" />
      {items.map((it, i) => (
        <span key={it.label} className="whitespace-nowrap">
          {i > 0 && <span aria-hidden="true" className="mr-3 hidden text-white/40 sm:inline">·</span>}
          {it.label}: <strong className="font-heading font-extrabold text-white">{fmt.format(it.value)}</strong>
        </span>
      ))}
    </p>
  );
}
