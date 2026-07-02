import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlanType = "free" | "6_meses" | "1_ano" | "god_mode" | "trial";
export type LicenseStatusType = "none" | "active" | "expired";

export interface LicenseState {
  plan: PlanType;
  status: LicenseStatusType;
  expiresAt: string | null;
  trialEndsAt: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: LicenseState = {
  plan: "free",
  status: "none",
  expiresAt: null,
  trialEndsAt: null,
  loading: false,
  error: null,
};

const licenseSlice = createSlice({
  name: "license",
  initialState,
  reducers: {
    setLicense: (
      state,
      action: PayloadAction<{
        plan: PlanType;
        status: LicenseStatusType;
        expiresAt?: string | null;
        trialEndsAt?: string | null;
      }>
    ) => {
      state.plan = action.payload.plan;
      state.status = action.payload.status;
      state.expiresAt = action.payload.expiresAt ?? null;
      state.trialEndsAt = action.payload.trialEndsAt ?? null;
      state.error = null;
    },
    setLicenseLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLicenseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const { setLicense, setLicenseLoading, setLicenseError, reset } =
  licenseSlice.actions;
export default licenseSlice.reducer;
