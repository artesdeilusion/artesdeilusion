"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/brand-logo";
import { LocaleHtml } from "@/components/locale-html";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { NAV_HREFS, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const home = localePath(locale);

  useEffect(() => {
    setMounted(true);
    setActiveHash(window.location.hash);
    const onHash = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const menu =
    mounted &&
    createPortal(
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.mobileMenuBar}>
          <Link
            className={styles.navBrand}
            href={home}
            onClick={() => {
              setActiveHash("");
              setOpen(false);
            }}
          >
            <BrandWordmark size={28} />
          </Link>
          <button
            type="button"
            className={styles.mobileClose}
            aria-label={dict.nav.closeMenu}
            onClick={() => setOpen(false)}
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile">
          <ul>
            <li>
              <Link
                href={home}
                className={
                  pathname === home && !activeHash
                    ? styles.mobileActive
                    : undefined
                }
                onClick={() => {
                  setActiveHash("");
                  setOpen(false);
                }}
              >
                {dict.nav.home}
              </Link>
            </li>
            {NAV_HREFS.map((item) => {
              const href = localePath(locale, item.href);
              const active = pathname === home && activeHash === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    className={active ? styles.mobileActive : undefined}
                    onClick={() => {
                      setActiveHash(item.href);
                      setOpen(false);
                    }}
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a className={styles.mobileMail} href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </div>,
      document.body,
    );

  return (
    <>
      <LocaleHtml locale={locale} />
      <header className={styles.nav}>
        <Link
          className={styles.navBrand}
          href={home}
          onClick={() => {
            setActiveHash("");
            setOpen(false);
          }}
        >
          <BrandWordmark size={28} />
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.navLinks}>
            {NAV_HREFS.map((item) => {
              const href = localePath(locale, item.href);
              const active = pathname === home && activeHash === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    className={active ? styles.navActive : undefined}
                    onClick={() => setActiveHash(item.href)}
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.navToggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={22} aria-hidden />
          ) : (
            <Menu size={22} aria-hidden />
          )}
        </button>
      </header>
      {menu}
    </>
  );
}
