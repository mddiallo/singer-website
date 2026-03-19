import { useLanguage } from "../../context/LanguageContext";
import { useFanSignup } from "../../hooks/useFanSignup";
import styles from "./FanSignup.module.css";

export default function FanSignup() {
  const { t } = useLanguage();
  const { name, setName, email, setEmail, errors, status, serverMsg, handleSubmit } =
    useFanSignup();

  if (status === "success") {
    return (
      <section id="fanclub" className={`${styles.section} section`}>
        <div className={`${styles.inner} container`}>
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            <h2>{t("signup.successTitle")}</h2>
            <p>{t("signup.successBody")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fanclub" className={`${styles.section} section`}>
      <div className={`${styles.inner} container`}>
        <h2 className={styles.heading}>{t("signup.heading")}</h2>
        <p className={styles.sub}>{t("signup.subheading")}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <input
              type="text"
              className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
              placeholder={t("signup.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
              disabled={status === "loading"}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
              placeholder={t("signup.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={status === "loading"}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "loading"}
          >
            {status === "loading" ? t("signup.submitting") : t("signup.submit")}
          </button>

          {status === "error" && (
            <p className={styles.serverError}>{serverMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
