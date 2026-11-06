"use client";

import {
  GlobeInteractive,
  type InteractiveMarker,
} from "@/components/ui/cobe-globe-interactive";
import type { Dictionary } from "@/i18n/dictionary";
import { CITY_MARKERS } from "@/lib/site";
import styles from "@/styles/site.module.css";

const markers: InteractiveMarker[] = CITY_MARKERS.map((city) => ({
  id: city.name.toLowerCase().replace(/\s+/g, "-"),
  location: [city.lat, city.lng],
  name: city.name,
}));

export function CitiesGlobe({ dict }: { dict: Dictionary }) {
  return (
    <section className={styles.globeSection} aria-label={dict.globe.aria}>
      <div className={styles.globeCopy}>
        <p className={styles.kickerLight}>{dict.globe.kicker}</p>
        <h2 className={styles.globeTitle}>{dict.globe.title}</h2>
        <p className={styles.globeBody}>{dict.globe.body}</p>
      </div>
      <div className={styles.globeHost}>
        <GlobeInteractive markers={markers} speed={0.0025} />
      </div>
    </section>
  );
}
