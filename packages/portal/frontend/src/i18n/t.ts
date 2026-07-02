import { BRAND_CONFIG } from '@factory/shared/config/brand';

export type TranslationValue = string | Record<string, unknown>;
export type TranslationObject = Record<string, TranslationValue>;

export function getNestedValue(obj: TranslationObject, key: string): TranslationValue | undefined {
  const keys = key.split('.');
  let current: unknown = obj;
  for (const k of keys) {
    if (current === undefined || current === null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[k];
  }
  return current as TranslationValue | undefined;
}

export function interpolate(text: string, params: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? `{{${key}}}`);
}

export function translate(
  key: string,
  translations: Record<string, TranslationObject>,
  currentLang: string,
  fallbackLang: string,
  params: Record<string, string> = {},
): string {
  const mergedParams = { siteName: BRAND_CONFIG.siteName, ...params };
  const currentBase = currentLang.split('-')[0];
  const fallbackBase = fallbackLang.split('-')[0];

  let value = getNestedValue(translations[currentLang], key);

  if (value === undefined && currentLang !== currentBase) {
    value = getNestedValue(translations[currentBase], key);
  }

  if (value === undefined && currentLang !== fallbackLang) {
    value = getNestedValue(translations[fallbackLang], key);
  }

  if (value === undefined && currentBase !== fallbackBase) {
    value = getNestedValue(translations[fallbackBase], key);
  }

  if (value === undefined) {
    console.warn(`i18n: key not found: ${key}`);
    return '';
  }

  if (typeof value === 'string') {
    return interpolate(value, mergedParams);
  }

  return key;
}
