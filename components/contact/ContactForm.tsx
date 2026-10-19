"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import {
  isServiceValue,
  normaliseEnquiry,
  validateEnquiry,
  LIMITS,
  type EnquiryField,
  type FieldErrors,
} from "@/lib/contact/validation";
import { cx } from "@/components/ui/primitives";

type Status = "idle" | "submitting" | "success" | "error";
type ServerError = keyof Dictionary["contact"]["form"]["server"];

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const empty = {
  fullName: "",
  organisation: "",
  email: "",
  phone: "",
  service: "",
  subject: "",
  message: "",
  consent: false,
};

export function ContactForm({
  locale,
  t,
  services,
  privacyHref,
}: {
  locale: Locale;
  t: Dictionary["contact"]["form"];
  services: Array<{ id: string; title: string }>;
  privacyHref: string;
}) {
  const uid = useId();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [captchaError, setCaptchaError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [token, setToken] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Prefill the service from ?service=… (links on the Services page).
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service") || "";
    if (isServiceValue(s)) setValues((v) => ({ ...v, service: s }));
  }, []);

  const renderTurnstile = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileRef.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      language: locale === "bm" ? "ms" : "en",
      theme: "light",
      callback: (tok: string) => {
        setToken(tok);
        setCaptchaError(false);
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
  }, [locale]);

  useEffect(() => {
    renderTurnstile();
  }, [renderTurnstile, status]);

  const set = (field: keyof typeof empty, value: string | boolean) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field as EnquiryField]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const msg = (field: EnquiryField) => {
    const code = errors[field];
    if (!code) return null;
    return code === "tooLong" ? t.errors.tooLong : t.errors[field];
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const normalised = normaliseEnquiry(values);
    const v = validateEnquiry(normalised);
    const needsCaptcha = Boolean(TURNSTILE_SITE_KEY) && !token;
    setErrors(v);
    setCaptchaError(needsCaptcha);
    if (Object.keys(v).length > 0 || needsCaptcha) {
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...normalised,
          locale,
          startedAt,
          website: honeypotRef.current?.value || "",
          turnstileToken: token,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string; fields?: FieldErrors; field?: string }
        | null;

      // Show success ONLY when the server confirms the email was accepted.
      if (res.ok && data && data.ok === true) {
        setStatus("success");
        setValues(empty);
        setErrors({});
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      const code = data && data.ok === false ? data.error : "";
      if (code === "validation" && data && "fields" in data && data.fields) setErrors(data.fields);
      if (data && "field" in data && data.field === "captcha") setCaptchaError(true);
      setServerError(
        code === "not_configured"
          ? "notConfigured"
          : code === "rate_limited"
            ? "rateLimited"
            : code === "rejected" || code === "validation"
              ? "rejected"
              : "failed",
      );
      if (code === "validation") setServerError(null);
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerError("network");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } finally {
      if (TURNSTILE_SITE_KEY && window.turnstile) {
        window.turnstile.reset(widgetId.current);
        setToken("");
      }
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border-t-[6px] border-brand bg-paper p-8 focus:outline-none md:p-10">
        <CircleCheck aria-hidden="true" size={44} className="text-brand" />
        <h3 className="mt-5 font-heading text-2xl font-extrabold leading-tight text-ink">{t.successHeading}</h3>
        <p className="mt-3 text-ink/85">{t.successText}</p>
        <button
          type="button"
          className="btn btn-outline mt-8"
          onClick={() => {
            widgetId.current = undefined;
            setStartedAt(Date.now());
            setStatus("idle");
          }}
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const fieldIds = (f: string) => ({ id: `${uid}-${f}`, errorId: `${uid}-${f}-error`, hintId: `${uid}-${f}-hint` });
  const hasFieldErrors = Object.values(errors).some(Boolean) || captchaError;

  const inputCls = (invalid: boolean) =>
    cx(
      "mt-2 block w-full border-2 bg-white px-4 py-3 text-[1.0625rem] text-ink placeholder:text-muted/70 transition-colors",
      "focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15",
      invalid ? "border-crimson bg-rose-mist/40" : "border-line hover:border-bar-1",
    );

  const label = (f: EnquiryField, text: string, required = true) => (
    <label htmlFor={fieldIds(f).id} className="block font-heading text-[0.9375rem] font-bold text-ink">
      {text}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-crimson">
          *
        </span>
      ) : (
        <span className="ml-1.5 font-sans text-[0.875rem] font-normal text-muted">{t.optional}</span>
      )}
    </label>
  );

  const errorText = (f: EnquiryField) => {
    const m = msg(f);
    return m ? (
      <p id={fieldIds(f).errorId} className="mt-2 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-crimson">
        <CircleAlert aria-hidden="true" size={17} className="mt-0.5 shrink-0" />
        {m}
      </p>
    ) : null;
  };

  const a11y = (f: EnquiryField, hint = false) => ({
    id: fieldIds(f).id,
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": cx(errors[f] && fieldIds(f).errorId, hint && fieldIds(f).hintId) || undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={`${uid}-required`}>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
      )}

      <p id={`${uid}-required`} className="text-[0.9375rem] text-muted">
        {t.requiredNote}
      </p>

      {status === "error" && (hasFieldErrors || serverError) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="flex gap-3 border-l-4 border-crimson bg-rose-mist/60 p-4 focus:outline-none">
          <CircleAlert aria-hidden="true" size={22} className="mt-0.5 shrink-0 text-crimson" />
          <p className="font-semibold text-ink">{serverError ? t.server[serverError] : t.errorSummary}</p>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input ref={honeypotRef} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("fullName", t.fullName)}
          <input
            {...a11y("fullName")}
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.fullName.max}
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={inputCls(!!errors.fullName)}
          />
          {errorText("fullName")}
        </div>
        <div>
          {label("organisation", t.organisation)}
          <input
            {...a11y("organisation")}
            type="text"
            autoComplete="organization"
            required
            maxLength={LIMITS.organisation.max}
            value={values.organisation}
            onChange={(e) => set("organisation", e.target.value)}
            className={inputCls(!!errors.organisation)}
          />
          {errorText("organisation")}
        </div>
        <div>
          {label("email", t.email)}
          <input
            {...a11y("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email.max}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls(!!errors.email)}
          />
          {errorText("email")}
        </div>
        <div>
          {label("phone", t.phone, false)}
          <input
            {...a11y("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone.max}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls(!!errors.phone)}
          />
          {errorText("phone")}
        </div>
      </div>

      <div>
        {label("service", t.service)}
        <select
          {...a11y("service")}
          required
          value={values.service}
          onChange={(e) => set("service", e.target.value)}
          className={cx(inputCls(!!errors.service), "appearance-none bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235f0718' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            {t.servicePlaceholder}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
          <option value="general">{t.generalEnquiry}</option>
        </select>
        {errorText("service")}
      </div>

      <div>
        {label("subject", t.subject)}
        <input
          {...a11y("subject")}
          type="text"
          required
          maxLength={LIMITS.subject.max}
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          className={inputCls(!!errors.subject)}
        />
        {errorText("subject")}
      </div>

      <div>
        {label("message", t.message)}
        <p id={fieldIds("message").hintId} className="mt-1 text-[0.9375rem] text-muted">
          {t.messageHint}
        </p>
        <textarea
          {...a11y("message", true)}
          required
          rows={6}
          maxLength={LIMITS.message.max}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={cx(inputCls(!!errors.message), "min-h-40 resize-y")}
        />
        <div className="flex items-start justify-between gap-4">
          {errorText("message") || <span />}
          <span aria-hidden="true" className="mt-2 text-[0.8125rem] tabular-nums text-muted">
            {values.message.length}/{LIMITS.message.max}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldIds("consent").id}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? fieldIds("consent").errorId : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-brand)]"
          />
          <label htmlFor={fieldIds("consent").id} className="text-[1rem] leading-relaxed text-ink">
            {t.consent}{" "}
            <Link href={privacyHref} className="font-semibold text-brand underline underline-offset-4" target="_blank">
              {t.consentLink}
            </Link>
            .<span aria-hidden="true" className="ml-1 text-crimson">*</span>
          </label>
        </div>
        {errorText("consent")}
      </div>

      {TURNSTILE_SITE_KEY && (
        <div>
          <div ref={turnstileRef} />
          {captchaError && (
            <p className="mt-2 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-crimson">
              <CircleAlert aria-hidden="true" size={17} className="mt-0.5 shrink-0" />
              {t.errors.captcha}
            </p>
          )}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />
            <span>{t.submitting}</span>
          </>
        ) : (
          <>
            <span>{t.submit}</span>
            <Send aria-hidden="true" size={18} />
          </>
        )}
      </button>
      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? t.submitting : ""}
      </p>
    </form>
  );
}
