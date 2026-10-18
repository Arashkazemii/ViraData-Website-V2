import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages";
import { isLocale, type Locale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? pageMetadata(lang, "") : {};
}
export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage lang={lang as Locale} />;
}
