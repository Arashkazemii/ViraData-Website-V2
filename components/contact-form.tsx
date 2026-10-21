"use client";

import { useState, type FormEvent } from "react";
import { type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";

export function ContactForm({ lang }: { lang: Locale }) {
  const c = getCopy(lang).contact;
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const fa = lang === "fa";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        if (response.status === 429) throw new Error("rate_limited");
        if (response.status === 400 && result.error === "invalid") throw new Error("invalid");
        throw new Error("delivery_failed");
      }
      form.reset();
      setState("success");
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "delivery_failed";
      setError(code === "rate_limited"
        ? (fa ? "تعداد درخواست‌ها زیاد است. لطفاً چند دقیقه دیگر دوباره تلاش کنید." : "Too many requests. Please try again in a few minutes.")
        : code === "invalid"
          ? (fa ? "لطفاً اطلاعات فرم را بررسی و دوباره ارسال کنید." : "Please check your details and try again.")
          : (fa ? "ارسال درخواست انجام نشد. اطلاعات شما حفظ شده است؛ لطفاً دوباره تلاش کنید." : "Your request could not be sent. Your details are still here; please try again."));
      setState("error");
    }
  }

  return (
    <div className="contact-panel">
      <form onSubmit={submit}>
        <fieldset disabled={state === "sending"}>
          <div className="form-grid">
            <label htmlFor="contact-name">
              {c.labels.name}<span aria-hidden="true"> *</span>
              <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={120} />
            </label>
            <label htmlFor="contact-email">
              {fa ? "ایمیل کاری" : "Business email"}<span aria-hidden="true"> *</span>
              <input id="contact-email" name="email" type="email" dir="ltr" autoComplete="email" required maxLength={254} />
            </label>
            <label htmlFor="contact-organization">
              {c.labels.organization}
              <input id="contact-organization" name="organization" autoComplete="organization" maxLength={160} />
            </label>
            <label htmlFor="contact-phone">
              {fa ? "شماره تماس" : "Phone"}
              <input id="contact-phone" name="phone" type="tel" dir="ltr" autoComplete="tel" maxLength={40} />
            </label>
          </div>
          <label className="message-label" htmlFor="contact-message">
            {c.labels.message}<span aria-hidden="true"> *</span>
            <textarea id="contact-message" name="message" required minLength={12} maxLength={4000} rows={6} />
          </label>
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="privacy-note">{c.privacy}</p>
          {state === "success" && (
            <p className="contact-feedback contact-feedback--success" role="status">
              {fa
                ? "درخواست شما با موفقیت ثبت و برای تیم ویرا دیتا ارسال شد. در اولین فرصت با شما ارتباط خواهیم گرفت."
                : "Your request was sent to the ViraData team. We will contact you as soon as possible."}
            </p>
          )}
          {state === "error" && <p className="contact-feedback contact-feedback--error" role="alert">{error}</p>}
          <button className="button button-primary" type="submit" aria-busy={state === "sending"}>
            {state === "sending" ? (fa ? "در حال ارسال…" : "Sending…") : (fa ? "ارسال درخواست" : "Send request")}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
