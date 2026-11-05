import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  Building2,
  Handshake,
  Newspaper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CONTACT_GUIDE, SITE } from "@/lib/site";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Artes de Ilusión — investor relations, co-building and ventures, holdings, press and introductions. Email info@artesdeilusion.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Artes de Ilusión",
    description: "How and when to reach Artes de Ilusión.",
    url: "https://artesdeilusion.com/contact",
    type: "website",
  },
};

const TOPIC_ICONS: LucideIcon[] = [
  Handshake,
  Building2,
  BriefcaseBusiness,
  Newspaper,
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        kicker="Contact"
        title="Get in touch."
        body={CONTACT_GUIDE.intro}
      />

      <section className={styles.section} aria-labelledby="topics-title">
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Topics</p>
          <h2 id="topics-title">What to write about</h2>
          <p>Pick the lane that matches your ask — it helps us route faster.</p>
        </div>
        <ul className={styles.guideGrid}>
          {CONTACT_GUIDE.topics.map((topic, index) => {
            const Icon = TOPIC_ICONS[index] ?? Building2;
            return (
              <li key={topic.title}>
                <Icon className={styles.sectorIcon} size={18} aria-hidden />
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
                <p className={styles.guideSubject}>
                  Subject: <span>{topic.subject}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="how-title">
        <div className={styles.sectionAltInner}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>How</p>
            <h2 id="how-title">How to reach us</h2>
          </div>
          <ol className={styles.guideSteps}>
            {CONTACT_GUIDE.how.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <p className={styles.note}>{CONTACT_GUIDE.note}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.contactAside}>
          <p className={styles.kicker}>Direct line</p>
          <a className={styles.mailDark} href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </section>
    </main>
  );
}
