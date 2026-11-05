"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/brand-logo";
import { NAV, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
            href="/"
            onClick={() => setOpen(false)}
          >
            <BrandWordmark size={28} />
          </Link>
          <button
            type="button"
            className={styles.mobileClose}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile">
          <ul>
            <li>
              <Link
                href="/"
                className={pathname === "/" ? styles.mobileActive : undefined}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={active ? styles.mobileActive : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
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
      <header className={styles.nav}>
        <Link
          className={styles.navBrand}
          href="/"
          onClick={() => setOpen(false)}
        >
          <BrandWordmark size={28} />
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.navLinks}>
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={active ? styles.navActive : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
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
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </header>
      {menu}
    </>
  );
}
