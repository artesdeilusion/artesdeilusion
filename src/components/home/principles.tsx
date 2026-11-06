"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/styles/home.module.css";

export function Principles({
  dict,
  detailsHref,
}: {
  dict: Dictionary;
  detailsHref: string;
}) {
  const items = dict.investments.sections;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const el of refs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={styles.principles}>
      <div className={styles.principlesAside}>
        <div className={styles.principlesSticky}>
          <p className={styles.kicker}>{dict.home.investmentsKicker}</p>
          <h2 id="home-investments" className={styles.sectionTitle}>
            {dict.home.investmentsTitle}
          </h2>
          <p className={styles.sectionBody}>{dict.home.investmentsBody}</p>

          <div className={styles.principlesCounter} aria-hidden="true">
            <span className={styles.principlesNum}>
              <span
                className={styles.principlesNumTrack}
                style={{ transform: `translateY(${-active}em)` }}
              >
                {items.map((_, i) => (
                  <span key={i}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span className={styles.principlesTotal}>/ {pad(items.length)}</span>
          </div>
          <Link className={styles.textLink} href={detailsHref}>
            {dict.home.investmentsLink}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>

      <ol className={styles.principlesList}>
        {items.map((item, i) => (
          <li
            key={item.heading}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            data-active={i === active}
            className={styles.principle}
          >
            <span className={styles.principleIndex}>{pad(i + 1)}</span>
            <h3>{item.heading}</h3>
            <p>{item.body[0]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
