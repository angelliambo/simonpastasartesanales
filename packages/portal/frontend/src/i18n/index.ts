export { translate, getNestedValue, interpolate } from './t';
export { globals } from './globals';
export { useTranslation, I18nProvider, LANGUAGES } from './I18nProvider';

export type { TranslationValue, TranslationObject } from './t';

export const SUPPORTED_LOCALES = [
  'es',
  'en',
] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

export const FALLBACK_LOCALE = 'es';
