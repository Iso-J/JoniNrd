
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { post_en } from './blogEntries/languages/en/post.js';
import { post_fi } from './blogEntries/languages/fi/post.js';
import global_fi from "./translations/fi/global.json";
import global_en from "./translations/en/global.json";

i18next
.use(LanguageDetector)
.init({
  interpolation:{escapeValue:false},
  fallbackLng: 'en',
  resources:{
    en:{
      global: global_en,
      post: post_en,
    },
    fi:{
      global: global_fi,
      post: post_fi,
    }, 
  },
  ns: ['global', 'post'],
  defaultNS: 'global',
});

export default i18next;