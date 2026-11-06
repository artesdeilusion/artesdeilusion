import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CitiesStrip } from "@/components/cities-strip";
import { AllocationBar } from "@/components/home/allocation-bar";
import { CompareTable } from "@/components/home/compare-table";
import { HeroFacts } from "@/components/home/hero-facts";
import { InvestorCta } from "@/components/home/investor-cta";
import { Principles } from "@/components/home/principles";
import { Reveal } from "@/components/reveal";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import styles from "@/styles/home.module.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const words = dict.hero.tagline.split(" ");

  return (
    <main id="top" className={styles.main}>
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
          <span className={styles.heroGrid} />
          <span className={styles.heroGlow} />
        </div>

        <div className={styles.heroInner}>
          <h1 id="brand" className={styles.heroTitle} aria-label={dict.hero.tagline}>
            {words.map((word, i) => (
              <span key={i} className={styles.heroWord} aria-hidden="true">
                <span style={{ animationDelay: `${120 + i * 70}ms` }}>{word}</span>
              </span>
            ))}
          </h1>
          <p className={styles.heroLede}>{dict.hero.subtitle}</p>
          <HeroFacts dict={dict} />
        </div>
      </section>

      <CitiesStrip dict={dict} />

      <section id="about" className={styles.about} aria-labelledby="home-about">
        <div className={styles.aboutInner}>
          <Reveal direction="left" className={styles.aboutHead}>
            <p className={styles.kicker}>{dict.home.aboutKicker}</p>
            <h2 id="home-about" className={styles.sectionTitle}>
              {dict.home.aboutTitle}
            </h2>
            <p className={styles.sectionBody}>{dict.home.aboutBody}</p>
            <Link className={styles.textLink} href={localePath(locale, "/about")}>
              {dict.home.aboutLink}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>
          <CompareTable dict={dict} />
        </div>
      </section>

      <section className={styles.allocation} aria-labelledby="alloc-title">
        <div className={styles.allocationInner}>
          <Reveal direction="up" className={styles.allocationHead}>
            <div>
              <p className={styles.kickerLight}>{dict.home.approachKicker}</p>
              <h2 id="alloc-title" className={styles.sectionTitleLight}>
                {dict.home.approachTitle}
              </h2>
            </div>
            <p className={styles.sectionBodyLight}>{dict.home.approachBody}</p>
          </Reveal>
          <AllocationBar dict={dict} />
        </div>
      </section>

      <section
        id="investments"
        className={styles.investments}
        aria-labelledby="home-investments"
      >
        <div className={styles.investmentsInner}>
          <Principles
            dict={dict}
            detailsHref={localePath(locale, "/investments")}
          />
        </div>
      </section>

      <InvestorCta dict={dict} />
    </main>
  );
}

export const instant = false;
