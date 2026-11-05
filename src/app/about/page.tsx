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
import { CitiesMarquee } from "@/components/cities-marquee";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ABOUT, RUN_BUILD, SECTORS } from "@/lib/site";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.body,
};

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

export default function AboutPage() {
  return (
    <main>
      <PageHero kicker={ABOUT.kicker} title={ABOUT.title} body={ABOUT.body} />
      <CitiesMarquee />

      <section className={styles.section}>
        <div className={styles.splitHead}>
          <div className={styles.aboutGrid} style={{ marginBottom: 0 }}>
            <article className={styles.panel}>
              <span className={styles.panelIndex}>01</span>
              <h2 className={styles.subhead}>What we do</h2>
              <p className={styles.aboutBody}>{ABOUT.whatWeDo}</p>
            </article>
            <article className={styles.panel}>
              <span className={styles.panelIndex}>02</span>
              <h2 className={styles.subhead}>Why AI matters to us</h2>
              <p className={styles.aboutBody}>{ABOUT.whyAi}</p>
            </article>
          </div>
          <blockquote className={styles.pullquote}>
            <Quote className={styles.pullMark} size={18} aria-hidden />
            <p>
              We put capital in, then stay in the room for product and
              operations.
            </p>
          </blockquote>
        </div>

        <ul className={styles.pillarList}>
          {ABOUT.pillars.map((pillar, index) => {
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
            <p className={styles.kicker}>Focus</p>
            <h2 id="sectors-title">{SECTORS.kicker}</h2>
            <p>{SECTORS.intro}</p>
          </div>
          <ul className={styles.sectorGrid}>
            {SECTORS.items.map((item, index) => {
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
          <p className={styles.kicker}>Practice</p>
          <h2 id="run-title">{RUN_BUILD.kicker}</h2>
        </div>
        <ul className={styles.practiceGrid}>
          {RUN_BUILD.items.map((item, index) => {
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

      <CtaBand />
    </main>
  );
}
