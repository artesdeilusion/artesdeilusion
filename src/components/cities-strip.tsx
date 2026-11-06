"use client";

import dynamic from "next/dynamic";
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

export function CitiesStrip() {
  return <CitiesGlobe />;
}
