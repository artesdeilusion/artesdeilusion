"use client";

import { useInView } from "@/components/home/use-in-view";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/styles/home.module.css";

export function CompareTable({ dict }: { dict: Dictionary }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const { compare } = dict;

  return (
    <div
      ref={ref}
      className={styles.compare}
      data-inview={inView}
      role="table"
      aria-label={compare.kicker}
    >
      <div className={styles.compareHead} role="row">
        <span role="columnheader" />
        <span role="columnheader" className={styles.compareHeadAccent}>
          {compare.built}
        </span>
        <span role="columnheader">{compare.backed}</span>
      </div>
      {compare.rows.map((row, i) => (
        <div
          key={row.label}
          className={styles.compareRow}
          role="row"
          style={{ ["--i" as string]: i }}
        >
          <span role="rowheader" className={styles.compareLabel}>
            {row.label}
          </span>
          <span role="cell" className={styles.compareCell}>
            {row.built}
          </span>
          <span role="cell" className={styles.compareCell}>
            {row.backed}
          </span>
        </div>
      ))}
    </div>
  );
}
