import type { PlanConfig } from '../config/plans';

export type PlanId = 'free' | 'trial' | '6_meses' | '1_ano' | 'god_mode';

export type PlanStatus = 'free' | 'active' | 'expired' | 'cancelled';

export interface LicenseInfo {
  plan: PlanId;
  status: PlanStatus;
  expiresAt?: string;
  trialEndsAt?: string;
  variantId?: number;
}

export interface PlanWithStatus extends PlanConfig {
  status: PlanStatus;
  isPremium: boolean;
}
