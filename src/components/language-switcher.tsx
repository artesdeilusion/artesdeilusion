"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import styles from "@/styles/site.module.css";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(en|tr)/, "") || "/";

  return (
    <div className={styles.langSwitch} aria-label="Language">
      {locales.map((code) => {
        const href = `/${code}${rest === "/" ? "" : rest}`;
        const active = code === locale;
        return (
          <Link
            key={code}
            href={href}
            className={active ? styles.langActive : undefined}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
