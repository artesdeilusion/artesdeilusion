"use client";

import { useState } from "react";
import { CountUp } from "@/components/home/count-up";
import { useInView } from "@/components/home/use-in-view";
import type { Dictionary } from "@/i18n/dictionary";
import { ALLOCATION_WEIGHTS } from "@/lib/site";
import styles from "@/styles/home.module.css";

const TONES = ["#e31837", "#ff6b7f", "#8f0f23", "#5a5a5a"];

export function AllocationBar({ dict }: { dict: Dictionary }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      ref={ref}
      className={styles.alloc}
      data-inview={inView}
      data-hover={hover !== null}
      onMouseLeave={() => setHover(null)}
    >
      <p className={styles.allocCaption}>{dict.home.allocLabel}</p>
      <div className={styles.allocBar} role="img" aria-label={dict.home.allocLabel}>
        {ALLOCATION_WEIGHTS.map((row, i) => (
          <span
            key={row.key}
            className={styles.allocSeg}
            data-active={hover === row.key}
            onMouseEnter={() => setHover(row.key)}
            style={{
              flexGrow: inView ? row.weight : 0.0001,
              background: TONES[i],
              transitionDelay: `${i * 140}ms`,
            }}
          />
        ))}
      </div>
      <ul className={styles.allocLegend}>
        {ALLOCATION_WEIGHTS.map((row, i) => (
          <li
            key={row.key}
            data-active={hover === row.key}
            onMouseEnter={() => setHover(row.key)}
          >
            <span
              className={styles.allocSwatch}
              style={{ background: TONES[i] }}
              aria-hidden="true"
            />
            <strong className={styles.allocValue}>
              <CountUp value={`${row.weight}%`} run={inView} duration={1600} />
            </strong>
            <span className={styles.allocName}>{dict.allocation[row.key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
