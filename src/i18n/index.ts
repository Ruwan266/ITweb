import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { loadLocale, messages } from './local/index';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: messages,
    interpolation: {
      escapeValue: false,
    },
  });

/** Loads a language's translations if needed, then switches to it. */
export async function setLanguage(code: string): Promise<void> {
  if (!i18n.hasResourceBundle(code, 'translation')) {
    const bundle = await loadLocale(code);
    if (bundle) i18n.addResourceBundle(code, 'translation', bundle);
  }
  await i18n.changeLanguage(code);
}

export default i18n;
