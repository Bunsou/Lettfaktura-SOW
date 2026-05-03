import { createContext, useContext, useEffect, useState } from "react";
import { fetchTranslations } from "../services/translation-api.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "sv");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetchTranslations(lang).then((data) => setTranslations(data));
  }, [lang]);

  function changeLanguage(newLang) {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
  }

  function t(key) {
    return translations[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
