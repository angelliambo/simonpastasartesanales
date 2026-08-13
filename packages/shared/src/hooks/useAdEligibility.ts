import { ADS_ENABLED } from '../config/ads';

export interface AdEligibilityParams {
  isAuthenticated?: boolean;
  plan?: string | null;
  isTrialExpired?: boolean;
}

/**
 * Custom hook / helper to evaluate if a user is eligible to be served Google Ads.
 * Evaluates the global ADS_ENABLED feature flag and strictly guarantees that active paid
 * users (6_meses, 1_ano, god_mode, pro, enterprise) or active trials are 100% excluded.
 */
export function isUserEligibleForAds(params: AdEligibilityParams): boolean {
  // Global Master Feature Flag check: If ADS_ENABLED is false, return false globally
  if (!ADS_ENABLED) {
    return false;
  }

  const { isAuthenticated = false, plan = 'free', isTrialExpired = false } = params;

  // Unauthenticated users on public portal pages always receive ads
  if (!isAuthenticated) {
    return true;
  }

  const normalizedPlan = (plan || 'free').toLowerCase();

  // Paid plans or god_mode NEVER see ads
  if (['6_meses', '1_ano', 'god_mode', 'pro', 'enterprise'].includes(normalizedPlan)) {
    return false;
  }

  // Active trial users DO NOT see ads during their active trial period
  if (normalizedPlan === 'trial' && !isTrialExpired) {
    return false;
  }

  // Free users or users with expired trials see ads
  return true;
}
