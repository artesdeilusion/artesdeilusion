import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link className={styles.footerBrand} href="/">
          ARTES
        </Link>
        <div className={styles.footerLinks}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>
          © 2026 Artes de Ilusion. All rights reserved.
        </p>
        <p className={styles.footerCopy}>{SITE.host}</p>
      </div>
    </footer>
  );
}
