import { ArrowRight } from "lucide-react";
import { INVESTORS, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function CtaBand() {
  return (
    <section className={styles.ctaBand} aria-labelledby="contact-title">
      <div className={styles.ctaBandInner}>
        <span className={styles.ctaFrame} aria-hidden="true" />
        <p className={styles.kickerLight}>Write to us</p>
        <h2 id="contact-title" className={styles.ctaTitle}>
          {INVESTORS.ctaTitle}
        </h2>
        <p className={styles.ctaBandBody}>{INVESTORS.ctaBody}</p>
        <a className={styles.ctaPrimary} href={`mailto:${SITE.email}`}>
          {SITE.email}
          <ArrowRight size={15} aria-hidden />
        </a>
      </div>
    </section>
  );
}
