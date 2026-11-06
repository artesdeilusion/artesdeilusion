import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { SITE } from "@/lib/site";
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
    title: dict.nav.investors,
    description: dict.investors.body,
    alternates: {
      canonical: localePath(locale, "/investors"),
      languages: {
        en: "/en/investors",
        tr: "/tr/investors",
      },
    },
    openGraph: {
      title: `${dict.nav.investors} · ${SITE.name}`,
      description: dict.investors.body,
      url: `${SITE.url}${localePath(locale, "/investors")}`,
      type: "website",
    },
  };
}

export default async function InvestorsPage({
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
        kicker={dict.investors.kicker}
        title={dict.investors.title}
        body={dict.investors.body}
      />

      <section className={styles.section}>
        <p className={styles.note}>{dict.investors.note}</p>
        <ul className={styles.statRow}>
          {dict.investors.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.sectionHead}>
          <p className={styles.kicker}>{dict.investors.deskKicker}</p>
          <h2>{dict.investors.deskTitle}</h2>
        </div>
        <ol className={styles.pointList}>
          {dict.investors.points.map((point) => (
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
          <p className={styles.kickerLight}>{dict.investors.requestKicker}</p>
          <h2 id="ir-contact" className={styles.ctaTitle}>
            {dict.investors.ctaTitle}
          </h2>
          <p className={styles.ctaBandBody}>{dict.investors.ctaBody}</p>
          <a className={styles.ctaPrimary} href={`mailto:${SITE.email}`}>
            {SITE.email}
            <ArrowRight size={15} aria-hidden />
          </a>
        </div>
      </section>
    </main>
  );
}

export const instant = false;
