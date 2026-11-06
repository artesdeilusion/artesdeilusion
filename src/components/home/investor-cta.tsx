"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useInView } from "@/components/home/use-in-view";
import type { Dictionary } from "@/i18n/dictionary";
import { SITE } from "@/lib/site";
import styles from "@/styles/home.module.css";

export function InvestorCta({ dict }: { dict: Dictionary }) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section
      ref={ref}
      id="investors"
      className={styles.investor}
      data-inview={inView}
      aria-labelledby="investor-title"
    >
      <div className={styles.investorInner}>
        <div className={styles.investorHead}>
          <p className={styles.kickerLight}>{dict.cta.kicker}</p>
          <h2 id="investor-title" className={styles.investorTitle}>
            {dict.cta.title}
          </h2>
          <p className={styles.investorBody}>{dict.cta.body}</p>
        </div>

        <div className={styles.investorMailRow}>
          <a className={styles.investorMail} href={`mailto:${SITE.email}`}>
            <span>{SITE.email}</span>
            <ArrowUpRight className={styles.investorMailArrow} aria-hidden />
          </a>
          <button
            type="button"
            className={styles.investorCopy}
            onClick={copy}
            aria-live="polite"
          >
            {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
            {copied ? dict.home.copied : dict.home.copy}
          </button>
        </div>

        <ol className={styles.investorPoints}>
          {dict.investors.points.map((point, i) => (
            <li key={point} style={{ ["--i" as string]: i }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{point}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
