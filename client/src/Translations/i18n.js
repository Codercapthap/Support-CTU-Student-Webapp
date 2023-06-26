import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// import moment from 'momentsjs';

import TRANSLATIONS_EN from './en/translation';
import TRANSLATIONS_VI from './vi/translation';

// Add translations
const resources = {
   en: {
      translation: TRANSLATIONS_EN
   },
   vi: {
      translation: TRANSLATIONS_VI
   }
};

// cofig Translations
i18n
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources,
      fallbackLng: 'vi',
      debug: false, //  if true: i18next: languageChanged en
      interpolation: {
         escapeValue: false // not needed for react as it escapes by default
         // format: function (value, format, lng) {
         //    // format date with YYYY/MM/DD and DD-MM-YYYY
         //    if (value instanceof Date) return moment(value).format(format);
         //    if (typeof value === 'number') return new Intl.NumberFormat().format(value);
         //    return value;
         // }
      }
   });

// change language with key
// i18n.changeLanguage('en');

export default i18n;
