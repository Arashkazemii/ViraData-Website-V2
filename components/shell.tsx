"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp, GlobeHemisphereWest, List, X } from "@phosphor-icons/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { href, pages, site, type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";
import { useSiteMotion } from "./motion-system";

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
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const { active } = useSiteMotion();
  useMotionValueEvent(scrollY, "change", (value) => {
    if (headerRef.current) headerRef.current.dataset.scrolled = String(value > 32);
  });
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  const alternate =
    path?.replace(/^\/(fa|en)(?=\/|$)/, `/${lang === "fa" ? "en" : "fa"}`) ||
    href(lang === "fa" ? "en" : "fa");
  return (
    <>
      <a className="skip-link" href="#main">
        {c.common.skip}
      </a>
      <header className="site-header" ref={headerRef} onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          headerRef.current?.querySelector<HTMLButtonElement>(".menu-button")?.focus();
        }
      }}>
        <motion.div className="page-progress" style={{ scaleX: scrollYProgress, opacity: active ? 1 : 0 }} aria-hidden="true" />
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
                aria-current={path === href(lang, page) ? "page" : undefined}
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
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
          <div className="header-actions">
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
              <GlobeHemisphereWest size={16} aria-hidden="true" />
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
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </header>
      <motion.div
        key={path}
        className="route-view"
        initial={active ? { opacity: 0.45, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: active ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand-block">
            <Link className="brand" href={href(lang)} aria-label="ViraData">
              <span className="brand-mark"><Image src={site.logoPath} alt="" width={42} height={42} /></span>
              <span className="brand-name">ViraData<span className="brand-dot">.</span></span>
            </Link>
            <p className="footer-statement">{c.common.footer}</p>
          </div>
          <Link
            className="footer-up"
            href={href(lang)}
            aria-label={c.common.back}
          >
            <ArrowUp size={22} aria-hidden="true" />
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
