import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { INVESTORS } from "@/lib/site";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Investors",
  description: INVESTORS.body,
};

export default function InvestorsPage() {
  return (
    <main>
      <PageHero
        kicker={INVESTORS.kicker}
        title={INVESTORS.title}
        body={INVESTORS.body}
      />

      <section className={styles.section}>
        <p className={styles.note}>{INVESTORS.note}</p>
        <ul className={styles.statRow}>
          {INVESTORS.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.sectionHead}>
          <p className={styles.kicker}>IR desk</p>
          <h2>How we work with partners</h2>
        </div>
        <ol className={styles.pointList}>
          {INVESTORS.points.map((point) => (
            <li key={point}>
              <Check className={styles.pointIcon} size={16} aria-hidden />
              <p>{point}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.ctaBand} aria-labelledby="ir-contact">
        <div className={styles.ctaBandInner}>
          <span className={styles.ctaFrame} aria-hidden="true" />
          <p className={styles.kickerLight}>Request materials</p>
          <h2 id="ir-contact" className={styles.ctaTitle}>
            {INVESTORS.ctaTitle}
          </h2>
          <p className={styles.ctaBandBody}>{INVESTORS.ctaBody}</p>
          <Link className={styles.ctaPrimary} href="/contact">
            Go to contact
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
