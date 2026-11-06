import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import { SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function CtaBand({ dict }: { dict: Dictionary }) {
  return (
    <section className={styles.ctaBand} aria-labelledby="contact-title">
      <div className={styles.ctaBandInner}>
        <span className={styles.ctaFrame} aria-hidden="true" />
        <p className={styles.kickerLight}>{dict.cta.kicker}</p>
        <h2 id="contact-title" className={styles.ctaTitle}>
          {dict.cta.title}
        </h2>
        <p className={styles.ctaBandBody}>{dict.cta.body}</p>
        <a className={styles.ctaPrimary} href={`mailto:${SITE.email}`}>
          {SITE.email}
          <ArrowRight size={15} aria-hidden />
        </a>
      </div>
    </section>
  );
}
