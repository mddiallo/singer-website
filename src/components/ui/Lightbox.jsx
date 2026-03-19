import { useEffect, useCallback } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Lightbox.module.css";

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const { t } = useLanguage();

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <button
        className={styles.close}
        onClick={onClose}
        aria-label={t("gallery.close")}
      >
        ✕
      </button>

      <button
        className={`${styles.arrow} ${styles.prev}`}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label={t("gallery.prev")}
      >
        ‹
      </button>

      <div className={styles.imageWrap} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`${t("gallery.image")} ${currentIndex + 1}`}
          className={styles.image}
        />
        <p className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      <button
        className={`${styles.arrow} ${styles.next}`}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label={t("gallery.next")}
      >
        ›
      </button>
    </div>
  );
}
