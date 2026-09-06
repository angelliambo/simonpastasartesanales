/**
 * Shared Google AdSense & Monetization Configuration
 */

declare const process: { env: Record<string, string | undefined> };

/**
 * Master Feature Flag for Monetization & Ads.
 * Controlled globally via environment variable REACT_APP_ADS_ENABLED.
 * Defaults to true. If set to false, disables all ad units globally across Portal.
 */
export const ADS_ENABLED =
  typeof process !== 'undefined' && process.env?.REACT_APP_ADS_ENABLED !== undefined
    ? process.env.REACT_APP_ADS_ENABLED !== 'false' && process.env.REACT_APP_ADS_ENABLED !== '0'
    : true;

export const GOOGLE_ADSENSE_CLIENT_ID =
  typeof process !== 'undefined' && process.env?.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID
    ? process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID
    : 'ca-pub-6167435415786243';

export const ADSENSE_SLOTS = {
  PORTAL_HOME_SUBHERO:
    typeof process !== 'undefined' && process.env?.REACT_APP_ADSENSE_SLOT_SUBHERO
      ? process.env.REACT_APP_ADSENSE_SLOT_SUBHERO
      : '1000000001',
  PORTAL_HOME_FOOTER:
    typeof process !== 'undefined' && process.env?.REACT_APP_ADSENSE_SLOT_FOOTER
      ? process.env.REACT_APP_ADSENSE_SLOT_FOOTER
      : '1000000002',
  PORTAL_CATALOG_BANNER:
    typeof process !== 'undefined' && process.env?.REACT_APP_ADSENSE_SLOT_CATALOG
      ? process.env.REACT_APP_ADSENSE_SLOT_CATALOG
      : '1000000003',
  PORTAL_DASHBOARD_SIDEBAR:
    typeof process !== 'undefined' && process.env?.REACT_APP_ADSENSE_SLOT_DASHBOARD
      ? process.env.REACT_APP_ADSENSE_SLOT_DASHBOARD
      : '1000000004',
} as const;

export type AdSlotName = keyof typeof ADSENSE_SLOTS;
