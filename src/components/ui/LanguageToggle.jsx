import { useLanguage } from "../../context/LanguageContext";
import styles from "./LanguageToggle.module.css";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={styles.toggle} role="group" aria-label="Language selector">
      <button
        className={`${styles.btn} ${locale === "fr" ? styles.active : ""}`}
        onClick={() => setLocale("fr")}
        aria-pressed={locale === "fr"}
      >
        FR
      </button>
      <span className={styles.divider}>|</span>
      <button
        className={`${styles.btn} ${locale === "en" ? styles.active : ""}`}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
