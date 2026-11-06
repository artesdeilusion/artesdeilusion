"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import styles from "@/styles/site.module.css";

const LABELS: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(en|tr)/, "") || "/";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.langDropdown}>
      <button
        type="button"
        className={styles.langTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((value) => !value)}
      >
        <Globe size={14} className={styles.langIcon} aria-hidden />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          size={13}
          className={`${styles.langCaret} ${open ? styles.langCaretOpen : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul className={styles.langMenu} role="listbox" aria-label="Language">
          {locales.map((code) => {
            const href = `/${code}${rest === "/" ? "" : rest}`;
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <Link
                  href={href}
                  hrefLang={code}
                  className={`${styles.langOption} ${active ? styles.langOptionActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span>{LABELS[code]}</span>
                  <span className={styles.langOptionCode}>
                    {code.toUpperCase()}
                    {active && <Check size={13} aria-hidden />}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
