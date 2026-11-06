import Image from "next/image";
import { CITY_PHOTOS } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function CitiesStrip() {
  return (
    <section className={styles.citiesStrip} aria-label="Cities we work across">
      <ul className={styles.citiesStripList}>
        {CITY_PHOTOS.map((city) => (
          <li key={city.slug}>
            <Image
              src={city.src}
              alt=""
              fill
              sizes="(max-width: 700px) 70vw, 22vw"
              className={styles.citiesStripImg}
            />
            <span className={styles.citiesStripLabel}>{city.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
