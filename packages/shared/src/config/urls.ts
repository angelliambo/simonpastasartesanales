export const PORTAL_URL = 'https://simonpastasartesanales.com.ar';
export const LICENSE_API_URL = `${PORTAL_URL}/api`;
export const LEGAL_TERMS_URL = `${PORTAL_URL}/legal/terms`;
export const LEGAL_PRIVACY_URL = `${PORTAL_URL}/legal/privacy`;

export const GA_MEASUREMENT_ID = '';
export const GA_API_SECRET = '';
export const GA_COLLECT_URL = 'https://www.google-analytics.com/mp/collect';
export const GA_DEBUG_URL = 'https://www.google-analytics.com/debug/mp/collect';

// Redes Sociales
export const SHOW_SOCIAL_LINKS = true;
export const SOCIAL_X_URL = 'https://x.com/<username>';
export const SOCIAL_FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61591495215614';
export const SOCIAL_THREADS_URL = 'https://www.threads.net/@simonpastasartesanales';

const instagramUser = (typeof process !== 'undefined' && (process.env.REACT_APP_INSTAGRAM_DEFAULT_USERNAME || process.env.INSTAGRAM_DEFAULT_USERNAME)) || 'simonpastasartesanales';
export const SOCIAL_INSTAGRAM_URL = `https://instagram.com/${instagramUser}`;

