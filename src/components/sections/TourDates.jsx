import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/Button";
import { tourDates } from "../../data/tourDates";
import styles from "./TourDates.module.css";

function formatDate(dateStr, locale) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TourDates() {
  const { t, locale } = useLanguage();
  const today = new Date();

  const upcoming = tourDates.filter((show) => new Date(show.date) >= today);

  return (
    <section id="tour" className={`${styles.tour} section`}>
      <div className="container">
        <h2 className="section-heading">{t("tour.heading")}</h2>

        {upcoming.length === 0 ? (
          <p className={styles.empty}>{t("tour.noShows")}</p>
        ) : (
          <div className={styles.list}>
            {upcoming.map((show) => (
              <div key={show.id} className={styles.row}>
                <span className={styles.date}>{formatDate(show.date, locale)}</span>
                <span className={styles.city}>{show.city}</span>
                <span className={styles.venue}>{show.venue}</span>
                <div className={styles.action}>
                  {show.soldOut ? (
                    <span className={styles.soldOut}>{t("tour.soldOut")}</span>
                  ) : (
                    <Button href={show.ticketUrl} external variant="outline">
                      {t("tour.tickets")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
