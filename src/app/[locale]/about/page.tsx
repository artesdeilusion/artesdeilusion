import type { Metadata } from "next";
import {
  Bot,
  Building2,
  Cpu,
  Layers3,
  Quote,
  Rocket,
  Target,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { CitiesStrip } from "@/components/cities-strip";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

const SECTOR_ICONS: LucideIcon[] = [
  Bot,
  Cpu,
  Layers3,
  Workflow,
  Rocket,
  Target,
];

const PILLAR_ICONS: LucideIcon[] = [Building2, Rocket, Layers3];
const PRACTICE_ICONS: LucideIcon[] = [Bot, Cpu, Building2, Workflow, Rocket];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  return {
    title: dict.nav.about,
    description: dict.about.body,
    alternates: {
      canonical: localePath(locale, "/about"),
    },
    openGraph: {
      title: `${dict.nav.about} · ${SITE.name}`,
      description: dict.about.body,
      url: `${SITE.url}${localePath(locale, "/about")}`,
      type: "website",
    },
  };
}

export default async function AboutPage({
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
        kicker={dict.about.kicker}
        title={dict.about.title}
        body={dict.about.body}
      />
      <CitiesStrip dict={dict} />

      <section className={styles.section}>
        <div className={styles.splitHead}>
          <div className={styles.aboutGrid} style={{ marginBottom: 0 }}>
            <article className={styles.panel}>
              <span className={styles.panelIndex}>01</span>
              <h2 className={styles.subhead}>{dict.about.whatWeDoTitle}</h2>
              <p className={styles.aboutBody}>{dict.about.whatWeDo}</p>
            </article>
            <article className={styles.panel}>
              <span className={styles.panelIndex}>02</span>
              <h2 className={styles.subhead}>{dict.about.whyAiTitle}</h2>
              <p className={styles.aboutBody}>{dict.about.whyAi}</p>
            </article>
          </div>
          <blockquote className={styles.pullquote}>
            <Quote className={styles.pullMark} size={18} aria-hidden />
            <p>{dict.about.quote}</p>
          </blockquote>
        </div>

        <ul className={styles.pillarList}>
          {dict.about.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] ?? Building2;
            return (
              <li key={pillar.title}>
                <Icon className={styles.pillarIcon} size={18} aria-hidden />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="sectors-title">
        <div className={styles.sectionAltInner}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>{dict.about.focusKicker}</p>
            <h2 id="sectors-title">{dict.about.sectorsTitle}</h2>
            <p>{dict.about.sectorsIntro}</p>
          </div>
          <ul className={styles.sectorGrid}>
            {dict.about.sectors.map((item, index) => {
              const Icon = SECTOR_ICONS[index] ?? Target;
              return (
                <li key={item.title}>
                  <Icon className={styles.sectorIcon} size={18} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="run-title">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>{dict.about.practiceKicker}</p>
          <h2 id="run-title">{dict.about.practiceTitle}</h2>
        </div>
        <ul className={styles.practiceGrid}>
          {dict.about.practice.map((item, index) => {
            const Icon = PRACTICE_ICONS[index] ?? Rocket;
            return (
              <li key={item.title}>
                <Icon size={18} aria-hidden />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand dict={dict} />
    </main>
  );
}

export const instant = false;
