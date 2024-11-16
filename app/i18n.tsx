import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "~/locales/en/translations.json";
import es from "~/locales/es/translations.json"; 

import enSEO from "~/locales/en/seo.json"
import esSEO from "~/locales/es/seo.json"; 

import enAlert from "~/locales/en/alerts.json"
import esAlert from "~/locales/es/alerts.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en, 
        seo: enSEO, 
        alerts: enAlert
      },
      es: {
        alerts: esAlert,
        translation: es,
        seo: esSEO
      }
    },
    lng: "en", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
