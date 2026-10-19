"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { cx } from "@/components/ui/primitives";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname() || href(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const items = [
    { slug: "", label: nav.home },
    { slug: "about", label: nav.about },
    { slug: "expertise", label: nav.expertise },
    { slug: "services", label: nav.services },
    { slug: "approach", label: nav.approach },
    { slug: "industries", label: nav.industries },
    { slug: "contact", label: nav.contact },
  ];

  const isActive = (slug: string) => {
    const target = href(locale, slug);
    return slug === "" ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  };

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b bg-white transition-shadow",
        scrolled ? "border-line shadow-[0_6px_24px_-12px_rgba(73,12,28,0.25)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
        <Link href={href(locale)} aria-label={nav.homeLinkLabel} className="shrink-0">
          <Logo priority alt="" className="h-8 w-auto lg:h-9" />
        </Link>

        <nav aria-label={nav.mainNavLabel} className="hidden xl:block">
          <ul className="flex items-center gap-5 2xl:gap-7">
            {items.map((item) => {
              const active = isActive(item.slug);
              return (
                <li key={item.slug || "home"}>
                  <Link
                    href={href(locale, item.slug)}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative inline-flex min-h-11 items-center font-heading text-[0.875rem] font-extrabold tracking-[0.08em] whitespace-nowrap transition-colors",
                      active ? "text-brand" : "text-ink hover:text-brand",
                      "after:absolute after:inset-x-0 after:bottom-1.5 after:h-[3px] after:origin-left after:bg-brand after:transition-transform",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <LanguageSwitcher locale={locale} label={nav.languageLabel} className="hidden sm:flex" />
          <Link
            href={href(locale, "contact")}
            className="btn btn-primary hidden min-h-11 px-5 text-[0.8125rem] xl:inline-flex"
          >
            {nav.cta}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-brand xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet navigation */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-white lg:top-20 xl:hidden"
      >
        <nav aria-label={nav.mainNavLabel} className="container-site py-6">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => {
              const active = isActive(item.slug);
              return (
                <li key={item.slug || "home"}>
                  <Link
                    href={href(locale, item.slug)}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex min-h-14 items-center justify-between py-3 font-heading text-lg font-extrabold tracking-[0.06em]",
                      active ? "text-brand" : "text-ink",
                    )}
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" size={20} className={active ? "text-brand" : "text-bar-1"} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-6">
            <Link href={href(locale, "contact")} className="btn btn-primary w-full">
              {nav.cta}
            </Link>
            <LanguageSwitcher locale={locale} label={nav.languageLabel} className="sm:hidden" />
          </div>
        </nav>
      </div>
    </header>
  );
}
