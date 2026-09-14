/**
 * Shared Google AdSense & Monetization Configuration
 */

declare const process: { env: Record<string, string | undefined> };

/**
 * Master Feature Flag for Monetization & Ads.
 * Controlled globally via environment variable REACT_APP_ADS_ENABLED.
 */
const getEnv = (key: string): string | undefined => {
  if (typeof process !== "undefined" && process.env) {
    if (process.env[key] !== undefined) return process.env[key];
  }
  return undefined;
};

export const ADS_ENABLED =
  getEnv("VITE_ADS_ENABLED") !== "false" &&
  getEnv("VITE_ADS_ENABLED") !== "0";

export const GOOGLE_ADSENSE_CLIENT_ID =
  getEnv("VITE_GOOGLE_ADSENSE_CLIENT_ID") ||
  "ca-pub-6167435415786243";

export const ADSENSE_SLOTS = {
  PORTAL_HOME_SUBHERO:
    getEnv("VITE_ADSENSE_SLOT_SUBHERO") || "1000000001",
  PORTAL_HOME_FOOTER:
    getEnv("VITE_ADSENSE_SLOT_FOOTER") || "1000000002",
  PORTAL_CATALOG_BANNER:
    getEnv("VITE_ADSENSE_SLOT_CATALOG") || "1000000003",
  PORTAL_DASHBOARD_SIDEBAR:
    getEnv("VITE_ADSENSE_SLOT_DASHBOARD") || "1000000004",
} as const;

export type AdSlotName = keyof typeof ADSENSE_SLOTS;

/**
 * Detects whether a given slot ID is a test/placeholder slot
 */
export function isPlaceholderAdSlot(slot: string | undefined | null): boolean {
  if (!slot) return true;
  const clean = slot.trim();
  if (clean === "" || clean.startsWith("10000000") || clean.toLowerCase().includes("test")) {
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
