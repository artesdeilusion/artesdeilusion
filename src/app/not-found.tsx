import Link from "next/link";
import styles from "@/styles/site.module.css";

export default function NotFound() {
  return (
    <main>
      <section className={styles.notFound} aria-labelledby="not-found-title">
        <div className={styles.notFoundInner}>
          <p className={styles.notFoundCode}>404</p>
          <h1 id="not-found-title" className={styles.notFoundTitle}>
            Page not found.
          </h1>
          <p className={styles.notFoundBody}>This page does not exist.</p>
          <Link className={styles.notFoundHome} href="/en">
            Back home
          </Link>
          <span className={styles.notFoundLangGap}>·</span>
          <Link className={styles.notFoundHome} href="/tr">
            Ana sayfa
          </Link>
        </div>
      </section>
    </main>
  );
}
