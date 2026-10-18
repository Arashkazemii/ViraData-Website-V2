import type { Metadata } from "next";
import { getMetadataCopy } from "./copy";
import { href, site, type Locale, type PageKey } from "./config";

export function pageMetadata(lang: Locale, page: PageKey): Metadata {
  const [title, description] = getMetadataCopy(lang, page);
  const path = href(lang, page);
  const origin = site.origin;
  const absolute = origin ? `${origin}${path}` : undefined;
  return {
    title,
    description,
    metadataBase: new URL(origin || "https://unconfigured.example"),
    robots: origin
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: origin
      ? {
          canonical: absolute,
          languages: {
            fa: `${origin}${href("fa", page)}`,
            en: `${origin}${href("en", page)}`,
            "x-default": `${origin}${href("fa", page)}`,
          },
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "fa" ? "fa_IR" : "en_US",
      url: absolute,
      siteName: "ViraData",
      images: origin ? [`${origin}/social-image`] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: origin ? [`${origin}/social-image`] : undefined,
    },
  };
}
