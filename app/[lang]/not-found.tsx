"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";

export default function LocalNotFound() {
  const lang: Locale = usePathname()?.startsWith("/en") ? "en" : "fa";
  const c = getCopy(lang).common;
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404</span>
      <h1>{c.missing}</h1>
      <p>
        <Link href={href(lang)}>{c.back}</Link>
      </p>
    </main>
  );
}
