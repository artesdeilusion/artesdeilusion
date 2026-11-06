import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  Sparkles,
  Square,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { CitiesStrip } from "@/components/cities-strip";
import { CtaBand } from "@/components/cta-band";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { ALLOCATION_WEIGHTS, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

const SNAPSHOT_ICONS: Record<string, LucideIcon> = {
  Companies: Building2,
  "Main focus": Sparkles,
  Cities: Globe2,
  "In operations": Workflow,
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const preview = dict.investments.sections.slice(0, 4);

  return (
    <main id="top">
      <section className={styles.hero} aria-labelledby="brand">
        <div className={styles.heroStage} aria-hidden="true">
          <Image
            src="/cities/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroPhoto}
          />
          <span className={styles.heroShade} />
        </div>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>{SITE.name}</p>
          <h1 id="brand" className={styles.brand}>
            {dict.hero.tagline}
          </h1>
          <p className={styles.lede}>{dict.hero.subtitle}</p>
          <div className={styles.ctaRow}>
            <a className={styles.ctaPrimary} href={`mailto:${SITE.email}`}>
              {dict.hero.ctaPrimary}
              <ArrowRight size={15} aria-hidden />
            </a>
            <Link
              className={styles.ctaGhost}
              href={localePath(locale, "/investments")}
            >
              {dict.hero.ctaSecondary}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <CitiesStrip dict={dict} />

      <section className={styles.snapshot} aria-label={dict.snapshot.aria}>
        <ul className={styles.snapshotList}>
          {dict.snapshot.items.map((item) => {
            const Icon = SNAPSHOT_ICONS[item.icon] ?? Square;
            return (
              <li key={item.label}>
                <Icon className={styles.snapIcon} size={16} aria-hidden />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="home-about">
        <div className={styles.splitHead}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>{dict.home.aboutKicker}</p>
            <h2 id="home-about">{dict.home.aboutTitle}</h2>
            <p>{dict.home.aboutBody}</p>
            <Link className={styles.textLink} href={localePath(locale, "/about")}>
              {dict.home.aboutLink}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <blockquote className={styles.pullquote}>
            <p>{dict.home.quote}</p>
          </blockquote>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="thesis-title">
        <div className={styles.thesisInner}>
          <p className={styles.kickerLight}>{dict.home.approachKicker}</p>
          <h2 id="thesis-title" className={styles.thesisTitle}>
            {dict.home.approachTitle}
          </h2>
          <p className={styles.thesisBody}>{dict.home.approachBody}</p>
          <div className={styles.alloc}>
            <p className={styles.allocLabel}>{dict.home.allocLabel}</p>
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

      <section className={styles.sectionAlt} aria-labelledby="home-investments">
        <div className={styles.sectionAltInner}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>{dict.home.investmentsKicker}</p>
            <h2 id="home-investments">{dict.home.investmentsTitle}</h2>
            <p>{dict.home.investmentsBody}</p>
          </div>
          <ul className={styles.holdings}>
            {preview.map((section, index) => (
              <li key={section.heading}>
                <Link href={localePath(locale, "/investments")}>
                  <span className={styles.holdIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{section.heading}</h3>
                    <p>{section.body[0]}</p>
                  </div>
                  <ArrowUpRight
                    className={styles.workArrow}
                    size={18}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className={styles.textLink}
            href={localePath(locale, "/investments")}
          >
            {dict.home.investmentsLink}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="home-investors">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>{dict.home.investorsKicker}</p>
          <h2 id="home-investors">{dict.home.investorsTitle}</h2>
          <p>{dict.home.investorsBody}</p>
          <Link
            className={styles.textLink}
            href={localePath(locale, "/investors")}
          >
            {dict.home.investorsLink}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <CtaBand dict={dict} />
    </main>
  );
}

export const instant = false;
