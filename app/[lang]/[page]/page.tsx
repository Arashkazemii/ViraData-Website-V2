import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AboutPage,
  ContactPage,
  DemosPage,
  SolutionsPage,
} from "@/components/pages";
import { isLocale, isPage, locales, pages } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; page: string }> };
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    pages.filter((page) => page !== "").map((page) => ({ lang, page })),
  );
}
export const dynamicParams = true;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, page } = await params;
  return isLocale(lang) && isPage(page) ? pageMetadata(lang, page) : {};
}
export default async function Interior({ params }: Props) {
  const { lang, page } = await params;
  if (!isLocale(lang) || !isPage(page) || page === "") notFound();
  switch (page) {
    case "solutions":
      return <SolutionsPage lang={lang} />;
    case "demos":
      return <DemosPage lang={lang} />;
    case "about":
      return <AboutPage lang={lang} />;
    case "contact":
      return <ContactPage lang={lang} />;
  }
}
