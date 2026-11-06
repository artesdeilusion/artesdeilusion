"use client";

import { useEffect, useState } from "react";
import {
  GlobeInteractive,
  type InteractiveMarker,
} from "@/components/ui/cobe-globe-interactive";
import type { Dictionary } from "@/i18n/dictionary";
import { CITY_MARKERS } from "@/lib/site";
import styles from "@/styles/site.module.css";

const STEP_MS = 3200;

const cities = CITY_MARKERS.map((city) => ({
  id: city.name.toLowerCase().replace(/\s+/g, "-"),
  location: [city.lat, city.lng] as [number, number],
  name: city.name,
  tz: city.tz,
}));

const markers: InteractiveMarker[] = cities.map(({ id, location, name }) => ({
  id,
  location,
  name,
}));

const count = cities.length;
const reel = [...cities, ...cities, ...cities];

function formatCoord(lat: number, lng: number) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns}  ${Math.abs(lng).toFixed(2)}° ${ew}`;
}

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

export function CitiesGlobe({ dict }: { dict: Dictionary }) {
  const [pos, setPos] = useState(count);
  const [snap, setSnap] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const activeIndex = pos % count;
  const current = cities[activeIndex]!;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSnap(false);
      setPos((p) => p + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [pos]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const jumpTo = (idx: number) => {
    setSnap(false);
    setPos(count + idx);
  };

  return (
    <section className={styles.globeSection} aria-label={dict.globe.aria}>
      <div className={styles.globeGrid}>
        <div className={styles.globeRail}>
          <div className={styles.globeIntro}>
            <p className={styles.kickerLight}>{dict.globe.kicker}</p>
            <h2 className={styles.globeTitle}>{dict.globe.title}</h2>
            <p className={styles.globeBody}>{dict.globe.body}</p>
          </div>

          <div className={styles.cityReel}>
            <ol
              className={styles.cityReelTrack}
              style={{
                transform: `translateY(calc(var(--row) * ${-(pos - 2)}))`,
                transition: snap ? "none" : undefined,
              }}
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget) return;
                if (pos >= count * 2) {
                  setSnap(true);
                  setPos((p) => p - count);
                }
              }}
            >
              {reel.map((city, i) => {
                const distance = Math.abs(i - pos);
                return (
                  <li
                    key={`${city.id}-${i}`}
                    className={styles.cityReelRow}
                    data-distance={Math.min(distance, 3)}
                    aria-hidden={i !== pos}
                  >
                    <button
                      type="button"
                      tabIndex={i >= count && i < count * 2 ? 0 : -1}
                      onClick={() => jumpTo(i % count)}
                    >
                      {city.name}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className={styles.cityReadout} aria-live="polite">
            <div>
              <span className={styles.cityReadoutLabel}>
                {dict.globe.localTime}
              </span>
              <strong className={styles.cityReadoutValue}>
                {formatTime(now, current.tz)}
              </strong>
            </div>
            <div>
              <span className={styles.cityReadoutLabel}>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <strong className={styles.cityReadoutCoord}>
                {formatCoord(current.location[0], current.location[1])}
              </strong>
            </div>
          </div>

          <div className={styles.citySegments} aria-hidden="true">
            {cities.map((city, idx) => (
              <span
                key={city.id}
                className={
                  idx < activeIndex
                    ? styles.citySegDone
                    : idx === activeIndex
                      ? styles.citySegActive
                      : undefined
                }
              >
                {idx === activeIndex ? (
                  <i key={pos} style={{ animationDuration: `${STEP_MS}ms` }} />
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.globeStage}>
          <div className={styles.globeHost}>
            <GlobeInteractive
              markers={markers}
              speed={0.0025}
              focusLocation={current.location}
              activeId={current.id}
              onSelectMarker={(id) => {
                const found = cities.findIndex((c) => c.id === id);
                if (found !== -1) jumpTo(found);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
