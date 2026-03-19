import { useLanguage } from "../../context/LanguageContext";
import styles from "./About.module.css";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className={`${styles.inner} container`}>
        <div className={styles.portrait}>
          {/* Replace with your singer's portrait image */}
          <div className={styles.portraitPlaceholder}>
            <span>♪</span>
          </div>
          {/* Uncomment and replace src when you have the image:
          <img src="/artist-portrait.jpg" alt="[SINGER_NAME]" loading="lazy" />
          */}
        </div>
        <div className={styles.text}>
          <h2 className={styles.heading}>
            {t("about.heading")}
          </h2>
          <p className={styles.bio}>{t("about.bio")}</p>
        </div>
      </div>
    </section>
  );
}
