import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INVESTORS } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function CtaBand() {
  return (
    <section className={styles.ctaBand} aria-labelledby="contact-title">
      <div className={styles.ctaBandInner}>
        <span className={styles.ctaFrame} aria-hidden="true" />
        <p className={styles.kickerLight}>Contact</p>
        <h2 id="contact-title" className={styles.ctaTitle}>
          {INVESTORS.ctaTitle}
        </h2>
        <p className={styles.ctaBandBody}>{INVESTORS.ctaBody}</p>
        <Link className={styles.ctaPrimary} href="/contact">
          Go to contact
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
