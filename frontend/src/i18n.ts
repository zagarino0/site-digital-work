import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations, type Language } from "./translations/translations";

const resources = {
  fr: {
    translation: translations.fr,
  },
  mg: {
    translation: translations.mg,
  },
  en: {
    translation: translations.en,
  },
};

const LANGUAGE_STORAGE_KEY = "digital-work-language";

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (saved === "fr" || saved === "mg" || saved === "en") {
    return saved;
  }

  return "fr";
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  if (language === "fr" || language === "mg" || language === "en") {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }
});

document.documentElement.lang = i18n.language;

export default i18n;
