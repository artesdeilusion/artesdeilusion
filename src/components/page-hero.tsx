import styles from "@/styles/site.module.css";

type PageHeroProps = {
  kicker: string;
  title: string;
  body?: string;
};

export function PageHero({ kicker, title, body }: PageHeroProps) {
  return (
    <section className={styles.pageHero} aria-labelledby="page-title">
      <div className={styles.pageHeroInner}>
        <p className={styles.kickerLight}>{kicker}</p>
        <h1 id="page-title" className={styles.pageHeroTitle}>
          {title}
        </h1>
        {body ? <p className={styles.pageHeroBody}>{body}</p> : null}
      </div>
    </section>
  );
}
