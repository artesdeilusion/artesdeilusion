import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ALLOCATION, APPROACH } from "@/lib/site";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Investments — How we invest and work",
  description: APPROACH.intro,
  alternates: { canonical: "/investments" },
  openGraph: {
    title: "Investments · Artes de Ilusión",
    description: APPROACH.intro,
    url: "https://artesdeilusion.com/investments",
    type: "article",
  },
};

export default function InvestmentsPage() {
  return (
    <main>
      <PageHero
        kicker={APPROACH.kicker}
        title={APPROACH.title}
        body={APPROACH.intro}
      />

      <section className={styles.section} aria-label="How we invest">
        <article className={styles.article}>
          <p className={styles.articleLead}>{APPROACH.lead}</p>

          {APPROACH.sections.map((section, index) => (
            <section key={section.heading} className={styles.articleSection}>
              <p className={styles.articleIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </section>

      <section className={styles.thesis} aria-labelledby="alloc-title">
        <div className={styles.thesisInner}>
          <p className={styles.kickerLight}>Focus</p>
          <h2 id="alloc-title" className={styles.thesisTitle}>
            Where we spend time.
          </h2>
          <p className={styles.thesisBody}>
            A rough mix of where our attention goes across the group. These are
            not audited financials — just an honest picture of our focus.
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
