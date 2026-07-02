import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translate } from './t';
import { globals } from './globals';
import type { TranslationObject } from './index';
import { locales as allLocales } from './locales';

const STORAGE_KEY = 'zn_portal_lang';
const DEFAULT_LANG = 'es';
const FALLBACK_LOCALE = 'es';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

const TRANSLATIONS = allLocales as unknown as Record<string, TranslationObject>;

interface I18nContextType {
  t: (key: string, params?: Record<string, string>) => string;
  lang: string;
  setLanguage: (lang: string) => void;
  languages: Language[];
}

const I18nContext = createContext<I18nContextType>({
  t: (key: string) => key,
  lang: DEFAULT_LANG,
  setLanguage: () => { },
  languages: LANGUAGES,
});

function loadLang(): string {
  const getSanitizedLang = (rawLang: string | null | undefined): string | null => {
    if (!rawLang) return null;
    const exactMatch = LANGUAGES.find((l) => l.code === rawLang);
    if (exactMatch) return exactMatch.code;
    const baseLang = rawLang.split('-')[0].toLowerCase();
    const baseMatch = LANGUAGES.find((l) => l.code.split('-')[0].toLowerCase() === baseLang);
    return baseMatch ? baseMatch.code : null;
  };

  try {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        const sanitized = getSanitizedLang(urlLang);
        if (sanitized) {
          localStorage.setItem(STORAGE_KEY, sanitized);
          return sanitized;
        }
      } catch { }
    }

    try {
      const portalLang = localStorage.getItem(STORAGE_KEY);
      const sanitized = getSanitizedLang(portalLang);
      if (sanitized) return sanitized;
    } catch { }

    const extLang = (typeof window !== 'undefined' ? (window as any).__ZN_LANG__ : undefined) as string | undefined;
    const sanitizedExt = getSanitizedLang(extLang);
    if (sanitizedExt) return sanitizedExt;

    try {
      const devExtLang = localStorage.getItem('zn_idiomaUI');
      if (devExtLang) {
        const parsed = JSON.parse(devExtLang);
        const sanitizedDevExt = getSanitizedLang(parsed);
        if (sanitizedDevExt) return sanitizedDevExt;
      }
    } catch { }

    if (typeof navigator !== 'undefined') {
      try {
        const navLang = navigator.language || (navigator as any).userLanguage;
        const sanitizedBrowser = getSanitizedLang(navLang);
        if (sanitizedBrowser) return sanitizedBrowser;
      } catch { }
    }
  } catch (err) {
    console.error('[SaaS Boilerplate] Fallo al inicializar la detección de idioma.', err);
  }

  return DEFAULT_LANG;
}

function saveLang(lang: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch { }
}

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState(loadLang);

  const setLang = useCallback((newLang: string) => {
    setLangState(newLang);
    saveLang(newLang);
    // Dispatch event to the page window
    window.dispatchEvent(new CustomEvent('zn-lang-ready', { detail: newLang }));
  }, []);

  // Sincronizar el parámetro lang en la URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') !== lang) {
        params.set('lang', lang);
        const newSearch = params.toString();
        const newUrl = `${window.location.pathname}?${newSearch}${window.location.hash}`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [lang]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | undefined;
      if (detail && LANGUAGES.some((l) => l.code === detail) && detail !== lang) {
        setLangState(detail);
      }
    };
    window.addEventListener('zn-lang-ready', handler as EventListener);
    return () => window.removeEventListener('zn-lang-ready', handler as EventListener);
  }, [lang]);

  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      try {
        return translate(key, TRANSLATIONS, lang, FALLBACK_LOCALE, { ...globals, ...params });
      } catch (err) {
        console.error(`[ZenithNexus] [ZN-ERR-WEB-301]: Fallo al traducir la clave "${key}".`, err);
        return key;
      }
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ t, lang, setLanguage: setLang, languages: LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation(): I18nContextType {
  return useContext(I18nContext);
}

export { LANGUAGES };
