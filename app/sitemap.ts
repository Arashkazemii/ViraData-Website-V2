import type { MetadataRoute } from "next";
import { href, locales, pages, site } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.origin) return [];
  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${site.origin}${href(lang, page)}`,
      alternates: {
        languages: {
          fa: `${site.origin}${href("fa", page)}`,
          en: `${site.origin}${href("en", page)}`,
          "x-default": `${site.origin}${href("fa", page)}`,
        },
      },
    })),
  );
}
