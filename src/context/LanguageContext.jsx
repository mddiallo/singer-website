import { createContext, useContext, useState, useCallback } from "react";
import fr from "../locales/fr.json";
import en from "../locales/en.json";

const LOCALES = { fr, en };
const STORAGE_KEY = "singer_site_locale";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "fr"
  );

  const setLocale = useCallback((lang) => {
    setLocaleState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key) => {
      const parts = key.split(".");
      let result = LOCALES[locale];
      for (const part of parts) {
        if (result == null) break;
        result = result[part];
      }
      return result ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
