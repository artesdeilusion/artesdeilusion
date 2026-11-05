import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ALLOCATION, PORTFOLIO } from "@/lib/site";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Investments",
  description: PORTFOLIO.intro,
};

export default function InvestmentsPage() {
  return (
    <main>
      <PageHero
        kicker={PORTFOLIO.kicker}
        title={PORTFOLIO.title}
        body={PORTFOLIO.intro}
      />

      <section className={styles.section} aria-label="Investment research">
        <div className={styles.researchList}>
          {PORTFOLIO.items.map((item, index) => (
            <article key={item.id} className={styles.researchCard} id={item.id}>
              <header className={styles.researchHead}>
                <span className={styles.holdIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.holdSector}>{item.sector}</p>
                  <h2>{item.name}</h2>
                </div>
              </header>

              <p className={styles.researchThesis}>{item.thesis}</p>

              <div className={styles.researchBody}>
                {item.research.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="alloc-title">
        <div className={styles.thesisInner}>
          <p className={styles.kickerLight}>Focus</p>
          <h2 id="alloc-title" className={styles.thesisTitle}>
            Where we spend time.
          </h2>
          <p className={styles.thesisBody}>
            Rough mix of where we spend attention. Not audited financials.
          </p>
          <div className={styles.alloc}>
            <ul>
              {ALLOCATION.map((row) => (
                <li key={row.label}>
                  <div className={styles.allocMeta}>
                    <span>{row.label}</span>
                    <strong>{row.weight}%</strong>
                  </div>
                  <div className={styles.allocTrack}>
                    <span style={{ width: `${row.weight}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
