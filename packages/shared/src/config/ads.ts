/**
 * Shared Google AdSense & Monetization Configuration
 */

declare const process: { env: Record<string, string | undefined> };

/**
 * Master Feature Flag for Monetization & Ads.
 * Controlled globally via environment variable REACT_APP_ADS_ENABLED.
 */
export const ADS_ENABLED = (process?.env?.VITE_ADS_ENABLED || process?.env?.REACT_APP_ADS_ENABLED) !== 'false' && (process?.env?.VITE_ADS_ENABLED || process?.env?.REACT_APP_ADS_ENABLED) !== '0';

export const GOOGLE_ADSENSE_CLIENT_ID = process?.env?.VITE_GOOGLE_ADSENSE_CLIENT_ID || process?.env?.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID || '';

export const ADSENSE_SLOTS = {
  PORTAL_HOME_SUBHERO: process?.env?.VITE_ADSENSE_SLOT_HOME_SUBHERO || process?.env?.REACT_APP_ADSENSE_SLOT_HOME_SUBHERO || '',
  PORTAL_HOME_FOOTER: process?.env?.VITE_ADSENSE_SLOT_HOME_FOOTER || process?.env?.REACT_APP_ADSENSE_SLOT_HOME_FOOTER || '',
  PORTAL_LANDING_CONTENT: process?.env?.VITE_ADSENSE_SLOT_LANDING_CONTENT || process?.env?.REACT_APP_ADSENSE_SLOT_LANDING_CONTENT || '',
  PORTAL_LANDING_MID: process?.env?.VITE_ADSENSE_SLOT_LANDING_MID || process?.env?.REACT_APP_ADSENSE_SLOT_LANDING_MID || '',
  PORTAL_LANDING_FOOTER: process?.env?.VITE_ADSENSE_SLOT_LANDING_FOOTER || process?.env?.REACT_APP_ADSENSE_SLOT_LANDING_FOOTER || '',
  PORTAL_DASHBOARD_SIDEBAR: process?.env?.VITE_ADSENSE_SLOT_DASHBOARD_SIDEBAR || process?.env?.REACT_APP_ADSENSE_SLOT_DASHBOARD_SIDEBAR || '',
  PORTAL_WELCOME_FOOTER: process?.env?.VITE_ADSENSE_SLOT_WELCOME_FOOTER || process?.env?.REACT_APP_ADSENSE_SLOT_WELCOME_FOOTER || '',
};

export type AdSlotName = keyof typeof ADSENSE_SLOTS;

/**
 * Detects whether a given slot ID is a test/placeholder slot
 */
export function isPlaceholderAdSlot(slot: string | undefined | null): boolean {
  if (!slot) return true;
  const clean = slot.trim();
  if (clean === '' || clean.startsWith('10000000') || clean.toLowerCase().includes('test')) {
    return true;
  }
  return false;
}

/**
 * Validates if an ad slot ID is real and safe to send requests to Google AdSense SDK.
 */
export function isValidAdSlot(slot: string | undefined | null): boolean {
  return !isPlaceholderAdSlot(slot);
}
