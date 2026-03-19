import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className={styles.hero}>
      {/* Replace the background: set a real image in Hero.module.css or use the heroImg variable below */}
      <div className={styles.overlay} />
      <div className={`${styles.content} container`}>
        <h1 className={styles.name}>[SINGER_NAME]</h1>
        <p className={styles.tagline}>{t("hero.tagline")}</p>
        <div className={styles.ctas}>
          <Button href="https://open.spotify.com" external>
            {t("hero.ctaListen")}
          </Button>
          <Button variant="outline" href="#tour">
            {t("hero.ctaTour")}
          </Button>
        </div>
      </div>
      <div className={styles.scrollHint} aria-hidden="true">↓</div>
    </section>
  );
}
