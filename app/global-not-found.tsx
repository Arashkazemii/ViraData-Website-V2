import "./globals.css";
import "@fontsource/inter/400.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد | ViraData",
  robots: { index: false, follow: false },
  metadataBase: new URL("https://unconfigured.example"),
};

export default function GlobalNotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main id="main" className="container not-found">
          <span className="eyebrow">404</span>
          <h1>این صفحه پیدا نشد.</h1>
          <p>
            <Link href="/fa">بازگشت به خانه</Link>
            <Link href="/en" lang="en" dir="ltr">
              English
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
