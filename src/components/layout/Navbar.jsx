import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageToggle from "../ui/LanguageToggle";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { key: "nav.about",   href: "#about" },
    { key: "nav.music",   href: "#music" },
    { key: "nav.tour",    href: "#tour" },
    { key: "nav.gallery", href: "#gallery" },
    { key: "nav.fanclub", href: "#fanclub" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`${styles.nav} container`}>
        <a href="#hero" className={styles.logo}>
          {/* Replace [SINGER_NAME] with your singer's name */}
          [SINGER_NAME]
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {links.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <LanguageToggle />
          <button
            className={styles.burger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
