import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { NAV_HREFS, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link className={styles.footerBrand} href={localePath(locale)}>
          ARTES
        </Link>
        <div className={styles.footerLinks}>
          {NAV_HREFS.map((item) => (
            <Link key={item.href} href={localePath(locale, item.href)}>
              {dict.nav[item.key]}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>{dict.footer.rights}</p>
        <p className={styles.footerCopy}>{SITE.host}</p>
      </div>
    </footer>
  );
}
