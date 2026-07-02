export type PlanId = 'free' | 'trial' | 'god_mode' | string;
export type PlanStatus = 'active' | 'expired' | 'trialing' | 'cancelled' | string;

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
