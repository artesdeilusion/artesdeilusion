import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { ALLOCATION_WEIGHTS, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  return {
    title: dict.nav.investments,
    description: dict.investments.intro,
    alternates: {
      canonical: localePath(locale, "/investments"),
      languages: {
        en: "/en/investments",
        tr: "/tr/investments",
      },
    },
    openGraph: {
      title: `${dict.nav.investments} · ${SITE.name}`,
      description: dict.investments.intro,
      url: `${SITE.url}${localePath(locale, "/investments")}`,
      type: "article",
    },
  };
}

export default async function InvestmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <main>
      <PageHero
        kicker={dict.investments.kicker}
        title={dict.investments.title}
        body={dict.investments.intro}
      />

      <section className={styles.section} aria-label={dict.investments.kicker}>
        <article className={styles.article}>
          <p className={styles.articleLead}>{dict.investments.lead}</p>

          {dict.investments.sections.map((section, index) => (
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
          <p className={styles.kickerLight}>{dict.investments.focusKicker}</p>
          <h2 id="alloc-title" className={styles.thesisTitle}>
            {dict.investments.focusTitle}
          </h2>
          <p className={styles.thesisBody}>{dict.investments.focusBody}</p>
          <div className={styles.alloc}>
            <ul>
              {ALLOCATION_WEIGHTS.map((row) => (
                <li key={row.key}>
                  <div className={styles.allocMeta}>
                    <span>{dict.allocation[row.key]}</span>
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

      <CtaBand dict={dict} />
    </main>
  );
}

export const instant = false;
