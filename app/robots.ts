import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return site.origin
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${site.origin}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
