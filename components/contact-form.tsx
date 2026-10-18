"use client";

import { type FormEvent } from "react";
import { site, type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";

export function ContactForm({ lang }: { lang: Locale }) {
  const c = getCopy(lang).contact;
  const enabled = Boolean(site.contactEmail);
  function invalid(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "email" | "message",
  ) {
    const input = event.currentTarget;
    const message =
      field === "name"
        ? input.validity.tooShort
          ? c.validation.nameLength
          : c.validation.name
        : field === "message"
          ? input.validity.tooShort
            ? c.validation.messageLength
            : c.validation.message
          : c.validation.email;
    input.setCustomValidity(message);
  }
  function clearValidation(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    event.currentTarget.setCustomValidity("");
  }
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    const data = new FormData(event.currentTarget);
    const subject =
      lang === "fa"
        ? "گفت‌وگو درباره پروژه — ویرا دیتا"
        : "Project conversation — ViraData";
    const body = [
      `${c.labels.name}: ${data.get("name") || ""}`,
      `${c.labels.email}: ${data.get("email") || ""}`,
      `${c.labels.organization}: ${data.get("organization") || ""}`,
      `${c.labels.area}: ${data.get("area") || ""}`,
      "",
      `${c.labels.message}:`,
      String(data.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${encodeURIComponent(site.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <div
      className={`contact-panel ${!enabled ? "contact-panel--unavailable" : ""}`}
    >
      {!enabled && (
        <p className="availability-note" role="status">
          {c.unavailable}
        </p>
      )}
      <form onSubmit={prepare}>
        <fieldset disabled={!enabled}>
          <div className="form-grid">
            <label>
              {c.labels.name}
              <span aria-hidden="true"> *</span>
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                onInvalid={(event) => invalid(event, "name")}
                onInput={clearValidation}
              />
            </label>
            <label>
              {c.labels.email}
              <span aria-hidden="true"> *</span>
              <input
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                required
                onInvalid={(event) => invalid(event, "email")}
                onInput={clearValidation}
              />
            </label>
            <label>
              {c.labels.organization}
              <input name="organization" autoComplete="organization" />
            </label>
            <label>
              {c.labels.area}
              <select name="area" defaultValue="">
                <option value="">—</option>
                {c.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="message-label">
            {c.labels.message}
            <span aria-hidden="true"> *</span>
            <textarea
              name="message"
              required
              minLength={12}
              rows={6}
              onInvalid={(event) => invalid(event, "message")}
              onInput={clearValidation}
            />
          </label>
          <p className="privacy-note">{c.privacy}</p>
          {enabled && (
            <>
              <button className="button button-primary" type="submit">
                {c.prepare}
                <span aria-hidden="true">↗</span>
              </button>
              <p className="email-hint">{c.emailHint}</p>
            </>
          )}
        </fieldset>
      </form>
    </div>
  );
}
