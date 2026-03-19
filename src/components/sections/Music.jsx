import { useLanguage } from "../../context/LanguageContext";
import AlbumCard from "../ui/AlbumCard";
import { albums } from "../../data/albums";
import styles from "./Music.module.css";

export default function Music() {
  const { t } = useLanguage();

  return (
    <section id="music" className={`${styles.music} section`}>
      <div className="container">
        <h2 className="section-heading">{t("music.heading")}</h2>
        <div className={styles.track}>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </section>
  );
}
