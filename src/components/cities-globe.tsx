"use client";

import { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { CITY_MARKERS } from "@/lib/site";
import styles from "@/styles/site.module.css";

type CityMarker = (typeof CITY_MARKERS)[number];

export function CitiesGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const globe = new Globe(host, { animateIn: !reduceMotion })
      .globeImageUrl(
        "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg",
      )
      .bumpImageUrl(
        "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png",
      )
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#e31837")
      .atmosphereAltitude(0.14)
      .htmlElementsData([...CITY_MARKERS])
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlAltitude(0.018)
      .htmlElement((d: object) => {
        const city = d as CityMarker;
        const el = document.createElement("button");
        el.type = "button";
        el.className = styles.globeMarker;
        el.setAttribute("aria-label", city.name);
        el.innerHTML = `
          <span class="${styles.globeDot}" aria-hidden="true"></span>
          <span class="${styles.globePin}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${city.name}</span>
          </span>
        `;
        return el;
      })
      .htmlElementVisibilityModifier((el: HTMLElement, isVisible: boolean) => {
        el.style.opacity = isVisible ? "1" : "0";
        el.style.pointerEvents = isVisible ? "auto" : "none";
      });

    const resize = () => {
      const width = host.clientWidth;
      const height = Math.min(Math.max(width * 0.7, 340), 580);
      globe.width(width).height(height);
    };
    resize();

    globe.pointOfView({ lat: 28, lng: 25, altitude: 2.05 }, 0);
    const controls = globe.controls();
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.72;

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      globe._destructor();
      host.replaceChildren();
    };
  }, []);

  return (
    <section className={styles.globeSection} aria-label="Cities we work across">
      <div className={styles.globeCopy}>
        <p className={styles.kickerLight}>Footprint</p>
        <h2 className={styles.globeTitle}>Across the map.</h2>
        <p className={styles.globeBody}>
          Hover a city to see where we operate.
        </p>
      </div>
      <div ref={hostRef} className={styles.globeHost} />
    </section>
  );
}
