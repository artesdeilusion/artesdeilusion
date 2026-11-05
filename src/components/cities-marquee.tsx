import { MapPin } from "lucide-react";
import { CITIES } from "@/lib/site";
import styles from "@/styles/site.module.css";

export function CitiesMarquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[...CITIES, ...CITIES].map((city, i) => (
          <span key={`${city}-${i}`}>
            <MapPin size={12} aria-hidden />
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}
