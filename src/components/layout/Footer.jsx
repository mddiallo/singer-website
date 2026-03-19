import { useLanguage } from "../../context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.name}>[SINGER_NAME]</p>

        <div className={styles.socials}>
          {/* Replace hrefs with your singer's actual social media links */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            Instagram
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            TikTok
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            YouTube
          </a>
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
            Spotify
          </a>
        </div>

        <p className={styles.copy}>
          © {year} [SINGER_NAME]. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
