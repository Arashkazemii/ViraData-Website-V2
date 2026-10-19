"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { href, pages, site, type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";
import { MotionToggle } from "./motion-system";

export function Shell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const c = getCopy(lang);
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const alternate =
    path?.replace(/^\/(fa|en)(?=\/|$)/, `/${lang === "fa" ? "en" : "fa"}`) ||
    href(lang === "fa" ? "en" : "fa");
  return (
    <>
      <a className="skip-link" href="#main">
        {c.common.skip}
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Link
            className="brand"
            href={href(lang)}
            aria-label={lang === "fa" ? "ویرا دیتا — خانه" : "ViraData — Home"}
          >
            <span className="brand-mark">
              <Image
                src={site.logoPath}
                alt=""
                width={42}
                height={42}
                priority
              />
            </span>
            <span className="brand-name">
              ViraData<span className="brand-dot">.</span>
            </span>
          </Link>
          <nav
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setOpen(false);
                document
                  .querySelector<HTMLButtonElement>(".menu-button")
                  ?.focus();
              }
            }}
            className={`site-nav ${open ? "site-nav--open" : ""}`}
            id="main-nav"
            aria-label={lang === "fa" ? "ناوبری اصلی" : "Main navigation"}
          >
            {pages.map((page, i) => (
              <Link
                key={page}
                className={
                  path === href(lang, page)
                    ? "nav-link nav-link--active"
                    : "nav-link"
                }
                href={href(lang, page)}
                onClick={() => setOpen(false)}
              >
                {c.nav[i]}
              </Link>
            ))}
            <Link
              className="nav-cta"
              href={href(lang, "contact")}
              onClick={() => setOpen(false)}
            >
              {c.common.talk}
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
          <div className="header-actions">
            <MotionToggle lang={lang} />
            <a
              className="language-link"
              href={alternate}
              onClick={(event) => {
                event.currentTarget.href = `${alternate}${window.location.search}${window.location.hash}`;
              }}
              hrefLang={lang === "fa" ? "en" : "fa"}
              lang={lang === "fa" ? "en" : "fa"}
              dir={lang === "fa" ? "ltr" : "rtl"}
            >
              {lang === "fa" ? "EN" : "فا"}
            </a>
            <button
              className="menu-button"
              type="button"
              aria-controls="main-nav"
              aria-expanded={open}
              aria-label={open ? c.common.close : c.common.menu}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="container footer-top">
          <p className="footer-statement">{c.common.footer}</p>
          <Link
            className="footer-up"
            href={href(lang)}
            aria-label={c.common.back}
          >
            ↑
          </Link>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} ViraData</span>
          <nav
            aria-label={
              lang === "fa" ? "ناوبری پایین صفحه" : "Footer navigation"
            }
          >
            {pages.map((page, i) => (
              <Link key={page} href={href(lang, page)}>
                {c.nav[i]}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
