"use client";

import { useEffect, useState } from "react";
import { CountUp } from "@/components/home/count-up";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/styles/home.module.css";

export function HeroFacts({ dict }: { dict: Dictionary }) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRun(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <dl className={styles.heroFacts} aria-label={dict.snapshot.aria}>
      {dict.snapshot.items.map((item, i) => (
        <div
          key={item.label}
          className={styles.heroFact}
          style={{ animationDelay: `${600 + i * 110}ms` }}
        >
          <dt>{item.label}</dt>
          <dd>
            <CountUp value={item.value} run={run} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
