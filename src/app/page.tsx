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
import { CitiesStrip } from "@/components/cities-strip";
import { CtaBand } from "@/components/cta-band";
import { ALLOCATION, APPROACH, SITE, SNAPSHOT } from "@/lib/site";
import styles from "@/styles/site.module.css";

const SNAPSHOT_ICONS: Record<string, LucideIcon> = {
  Companies: Building2,
  "Main focus": Sparkles,
  Cities: Globe2,
  "In operations": Workflow,
};

export default function HomePage() {
  const preview = APPROACH.sections.slice(0, 4);

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
            {SITE.tagline}
          </h1>
          <p className={styles.lede}>{SITE.subtitle}</p>
          <div className={styles.ctaRow}>
            <Link className={styles.ctaPrimary} href="/contact">
              Get in touch
              <ArrowRight size={15} aria-hidden />
            </Link>
            <Link className={styles.ctaGhost} href="/investments">
              View investments
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <CitiesStrip />

      <section className={styles.snapshot} aria-label="Group snapshot">
        <ul className={styles.snapshotList}>
          {SNAPSHOT.map((item) => {
            const Icon = SNAPSHOT_ICONS[item.label] ?? Square;
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
            <p className={styles.kicker}>About</p>
            <h2 id="home-about">Operators at the head of many companies.</h2>
            <p>
              Artes de Ilusión sits at the head of a portfolio of companies in
              AI, software, and digital products. We don&apos;t just invest — we
              lead, build, and run them.
            </p>
            <Link className={styles.textLink} href="/about">
              About the group
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <blockquote className={styles.pullquote}>
            <p>
              We put capital in, then stay in the room for product and
              operations.
            </p>
          </blockquote>
        </div>
      </section>

      <section className={styles.thesis} aria-labelledby="thesis-title">
        <div className={styles.thesisInner}>
          <p className={styles.kickerLight}>Approach</p>
          <h2 id="thesis-title" className={styles.thesisTitle}>
            We invest where we can help run the work.
          </h2>
          <p className={styles.thesisBody}>
            We put money into companies where we can stay close to product and
            day-to-day work — especially in AI and software.
          </p>
          <div className={styles.alloc}>
            <p className={styles.allocLabel}>Indicative allocation of attention</p>
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

      <section className={styles.sectionAlt} aria-labelledby="home-investments">
        <div className={styles.sectionAltInner}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Investments</p>
            <h2 id="home-investments">How we invest.</h2>
            <p>
              We are an operating group, not a passive fund. Capital is where a
              relationship starts — most of what we bring shows up in the work
              that follows.
            </p>
          </div>
          <ul className={styles.holdings}>
            {preview.map((section, index) => (
              <li key={section.heading}>
                <Link href="/investments">
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
          <Link className={styles.textLink} href="/investments">
            Read how we invest
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="home-investors">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Investors</p>
          <h2 id="home-investors">Work with people who run the companies.</h2>
          <p>
            Partners deal with the team that builds and operates — day to day.
          </p>
          <Link className={styles.textLink} href="/investors">
            Investor relations
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
