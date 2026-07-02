import type { PlanId, PlanStatus } from './plan';

export interface LicenseValidation {
  valid: boolean;
  plan: PlanId;
  status: PlanStatus;
  expiresAt?: string;
  message?: string;
}

export interface CheckoutResponse {
  url: string;
  variantId: number;
  email: string;
}
