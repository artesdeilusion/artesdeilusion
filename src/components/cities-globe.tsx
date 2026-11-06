"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
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

function formatCoord(lat: number, lng: number) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns} · ${Math.abs(lng).toFixed(2)}° ${ew}`;
}

export function CitiesGlobe({ dict }: { dict: Dictionary }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % markers.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = markers[activeIndex] ?? markers[0]!;

  return (
    <section
      className={styles.globeSection}
      aria-label={dict.globe.aria}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.globeGrid}>
        <div className={styles.globeRail}>
          <div className={styles.globeIntro}>
            <p className={styles.kickerLight}>{dict.globe.kicker}</p>
            <h2 className={styles.globeTitle}>{dict.globe.title}</h2>
            <p className={styles.globeBody}>{dict.globe.body}</p>
          </div>

          <div className={styles.citySpotlight} key={current.id}>
            <div className={styles.citySpotMeta}>
              <span className={styles.citySpotIndex}>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(markers.length).padStart(2, "0")}
              </span>
              <span className={styles.citySpotCoord}>
                {formatCoord(current.location[0], current.location[1])}
              </span>
            </div>
            <div className={styles.citySpotTitleRow}>
              <MapPin size={20} className={styles.citySpotPin} aria-hidden />
              <strong className={styles.citySpotName}>{current.name}</strong>
            </div>
            <span className={styles.citySpotBar} aria-hidden="true" />
          </div>

          <ol className={styles.cityTicker}>
            {markers.map((marker, idx) => {
              const active = idx === activeIndex;
              return (
                <li key={marker.id}>
                  <button
                    type="button"
                    className={`${styles.cityTickBtn} ${active ? styles.cityTickActive : ""}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <span className={styles.cityTickNum}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.cityTickLabel}>{marker.name}</span>
                    <MapPin
                      size={13}
                      className={styles.cityTickPin}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.globeStage}>
          <div className={styles.globeRing} aria-hidden="true" />
          <div className={styles.globeHost}>
            <GlobeInteractive
              markers={markers}
              speed={0.0025}
              focusLocation={current.location}
              activeId={current.id}
              onSelectMarker={(id) => {
                const found = markers.findIndex((m) => m.id === id);
                if (found !== -1) setActiveIndex(found);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
