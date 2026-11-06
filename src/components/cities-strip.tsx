"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/styles/site.module.css";

const CitiesGlobe = dynamic(
  () => import("@/components/cities-globe").then((m) => m.CitiesGlobe),
  {
    ssr: false,
    loading: () => (
      <section className={styles.globeSection} aria-hidden="true">
        <div className={styles.globeHost} />
      </section>
    ),
  },
);

export function CitiesStrip({ dict }: { dict: Dictionary }) {
  return <CitiesGlobe dict={dict} />;
}
