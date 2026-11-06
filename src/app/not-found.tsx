import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAV } from "@/lib/site";
import styles from "@/styles/site.module.css";

export default function NotFound() {
  return (
    <main>
      <section className={styles.notFound} aria-labelledby="not-found-title">
        <div className={styles.notFoundInner}>
          <p className={styles.kickerLight}>Missing page</p>
          <p className={styles.notFoundCode} aria-hidden="true">
            404
          </p>
          <h1 id="not-found-title" className={styles.notFoundTitle}>
            This page is not here.
          </h1>
          <p className={styles.notFoundBody}>
            The link may be wrong, or the page was moved. Go home or pick a
            section below.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.ctaPrimary} href="/">
              Back home
              <ArrowRight size={15} aria-hidden />
            </Link>
            <Link className={styles.ctaGhost} href="/investors">
              Investors
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <ul className={styles.notFoundLinks}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.label}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
