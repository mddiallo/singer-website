import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Lightbox from "../ui/Lightbox";
import styles from "./Gallery.module.css";

// Replace these placeholder images with your singer's actual photos.
// Import them at the top or use public folder URLs like "/gallery/photo-01.jpg"
const galleryImages = [
  // "https://via.placeholder.com/800x600/1a1a1a/C9A84C?text=Photo+1",
  // Add your image paths here, e.g.:
  // "/gallery/photo-01.jpg",
  // "/gallery/photo-02.jpg",
];

// Placeholder items shown when no images are added yet
const PLACEHOLDER_COUNT = 6;

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const hasImages = galleryImages.length > 0;

  return (
    <section id="gallery" className={`${styles.gallery} section`}>
      <div className="container">
        <h2 className="section-heading">{t("gallery.heading")}</h2>

        {hasImages ? (
          <div className={styles.grid}>
            {galleryImages.map((src, i) => (
              <button
                key={i}
                className={styles.item}
                onClick={() => setSelectedIndex(i)}
                aria-label={`${t("gallery.image")} ${i + 1}`}
              >
                <img src={src} alt={`${t("gallery.image")} ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <div key={i} className={`${styles.item} ${styles.placeholder}`}>
                <span>♪</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIndex !== null && hasImages && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
          onNext={() => setSelectedIndex((i) => (i + 1) % galleryImages.length)}
        />
      )}
    </section>
  );
}
