export { translate, getNestedValue, interpolate } from './t';
export { globals } from './globals';

export type { TranslationValue, TranslationObject } from './t';

export const SUPPORTED_LOCALES = [
  'es',
] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

export const FALLBACK_LOCALE = 'es';
