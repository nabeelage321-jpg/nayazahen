'use client';

/**
 * lib/lang.js
 *
 * Minimal scaffold for the useLang() hook referenced throughout the app.
 * If you already have a lib/lang.js with a different shape, keep yours —
 * this file just documents/assumes the contract the client components below
 * rely on:
 *
 *   const { lang, dir, isEn, pick, setLang } = useLang();
 *
 *   - lang:    'ur' | 'en' | 'pa' | 'sd' | 'ps'  (current language code)
 *   - dir:     'rtl' | 'ltr'                      (for the <html>/wrapper dir attr)
 *   - isEn:    boolean, true when lang === 'en'
 *   - pick(en, ur): returns `en` when isEn, otherwise `ur`. Punjabi/Sindhi/Pashto
 *     content isn't authored per-field yet in the data files, so they fall back
 *     to Urdu copy (still correct RTL + font-urdu), same as Urdu itself.
 *   - setLang(code): switches the active language.
 */

import { createContext, useContext, useState, useMemo } from 'react';

export const LANGS = {
  ur: { code: 'ur', label: 'اردو', dir: 'rtl' },
  en: { code: 'en', label: 'English', dir: 'ltr' },
  pa: { code: 'pa', label: 'پنجابی', dir: 'rtl' },
  sd: { code: 'sd', label: 'سنڌي', dir: 'rtl' },
  ps: { code: 'ps', label: 'پښتو', dir: 'rtl' },
};

const LangContext = createContext(null);

export function LangProvider({ children, initialLang = 'en' }) {
  const [lang, setLang] = useState(initialLang);

  const value = useMemo(() => {
    const meta = LANGS[lang] || LANGS.ur;
    const isEn = lang === 'en';
    return {
      lang,
      setLang,
      dir: meta.dir,
      isEn,
      meta,
      pick: (en, ur) => (isEn ? en : ur),
    };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Sensible default so pages don't crash if the provider isn't mounted yet
    return {
      lang: 'en',
      setLang: () => {},
      dir: 'ltr',
      isEn: true,
      meta: LANGS.en,
      pick: (en, ur) => en,
    };
  }
  return ctx;
}
