export type DemoStatus = "planned" | "preview" | "live";
export type DemoId = "dashboard" | "assistant";

export const demos: Record<DemoId, { status: DemoStatus; url?: string }> = {
  dashboard: { status: "planned" },
  assistant: { status: "planned" },
};

export const site = {
  origin: (() => {
    const value = process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "") || "";
    try {
      const url = new URL(value);
      return url.protocol === "https:" &&
        !["localhost", "127.0.0.1"].includes(url.hostname)
        ? url.origin
        : "";
    } catch {
      return "";
    }
  })(),
  logoPath: process.env.NEXT_PUBLIC_LOGO_PATH || "/logo-1.png",
};

export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];
export const pages = ["", "solutions", "demos", "about", "contact"] as const;
export type PageKey = (typeof pages)[number];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const isPage = (value: string): value is PageKey =>
  pages.includes(value as PageKey);
export const href = (lang: Locale, page: PageKey = "") =>
  `/${lang}${page ? `/${page}` : ""}`;
