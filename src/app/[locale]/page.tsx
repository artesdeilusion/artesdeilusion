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
import { Reveal } from "@/components/reveal";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { ALLOCATION_WEIGHTS } from "@/lib/site";
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
    <main id="top" className={styles.homeMain}>
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
          <span className={styles.heroGridFX} />
          <span className={styles.heroBeam} />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroSplit}>
            <div>
              <h1 id="brand" className={styles.brand}>
                {dict.hero.tagline}
              </h1>
              <p className={styles.lede}>{dict.hero.subtitle}</p>
            </div>

            <aside className={styles.heroDeck} aria-hidden="true">
              {dict.snapshot.items.map((item, i) => {
                const Icon = SNAPSHOT_ICONS[item.icon] ?? Square;
                return (
                  <div
                    key={item.label}
                    className={`${styles.heroCard} ${i % 2 === 1 ? styles.heroCardOffset : ""}`}
                    style={{ animationDelay: `${160 + i * 90}ms` }}
                  >
                    <Icon size={15} className={styles.snapIcon} />
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </aside>
          </div>
        </div>
      </section>

      <CitiesStrip dict={dict} />

      <section
        id="about"
        className={styles.section}
        aria-labelledby="home-about"
      >
        <div className={styles.ZigRow}>
          <Reveal direction="left" className={styles.zigLeft}>
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>{dict.home.aboutKicker}</p>
              <h2 id="home-about">{dict.home.aboutTitle}</h2>
              <p>{dict.home.aboutBody}</p>
              <Link
                className={styles.textLink}
                href={localePath(locale, "/about")}
              >
                {dict.home.aboutLink}
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120} className={styles.zigRight}>
            <blockquote className={styles.pullquoteFX}>
              <span className={styles.pullCorner} aria-hidden="true" />
              <p>{dict.home.quote}</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="thesis-title">
        <div className={styles.thesisInner}>
          <div className={styles.thesisSplit}>
            <Reveal direction="left">
              <p className={styles.kickerLight}>{dict.home.approachKicker}</p>
              <h2 id="thesis-title" className={styles.thesisTitle}>
                {dict.home.approachTitle}
              </h2>
              <p className={styles.thesisBody}>{dict.home.approachBody}</p>
            </Reveal>

            <Reveal direction="right" delay={140}>
              <div className={styles.allocCard}>
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
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="investments"
        className={styles.sectionAlt}
        aria-labelledby="home-investments"
      >
        <div className={styles.sectionAltInner}>
          <Reveal direction="up">
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>{dict.home.investmentsKicker}</p>
              <h2 id="home-investments">{dict.home.investmentsTitle}</h2>
              <p>{dict.home.investmentsBody}</p>
            </div>
          </Reveal>

          <ul className={styles.staggerHoldings}>
            {preview.map((section, index) => {
              const fromRight = index % 2 === 1;
              return (
                <li
                  key={section.heading}
                  className={
                    fromRight ? styles.staggerRight : styles.staggerLeft
                  }
                >
                  <Reveal
                    direction={fromRight ? "right" : "left"}
                    delay={index * 80}
                  >
                    <Link
                      href={localePath(locale, "/investments")}
                      className={styles.staggerCard}
                    >
                      <span className={styles.staggerNum}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className={styles.staggerContent}>
                        <h3>{section.heading}</h3>
                        <p>{section.body[0]}</p>
                      </div>
                      <ArrowUpRight
                        className={styles.workArrow}
                        size={20}
                        aria-hidden
                      />
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal direction="up" delay={160}>
            <Link
              className={styles.textLink}
              href={localePath(locale, "/investments")}
            >
              {dict.home.investmentsLink}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <div id="investors">
        <CtaBand dict={dict} />
      </div>
    </main>
  );
}

export const instant = false;
