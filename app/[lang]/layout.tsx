import "@/app/globals.css";
import "@/app/experience.css";
import "@/app/polish.css";
import "@fontsource-variable/manrope";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MotionSystem } from "@/components/motion-system";
import { Shell } from "@/components/shell";
import { isLocale, locales, site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin || "https://unconfigured.example"),
};
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = true;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      dir={lang === "fa" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
    >
      <body>
        <MotionSystem>
          <Shell lang={lang}>{children}</Shell>
        </MotionSystem>
      </body>
    </html>
  );
}
