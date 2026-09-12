import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  version: string;
  isOnline: boolean;
  versions: { portal: string; frontend?: string; backend?: string };
  isLoading: boolean;
  error: string | null;
  lastUpdated?: string;
}

const initialState: SystemState = {
  version: "1.0.0",
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  versions: { portal: "1.0.0" },
  isLoading: false,
  error: null,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setPortalVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
      state.versions.portal = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setPortalVersion, setLoading, setError, reset } = systemSlice.actions;
export default systemSlice.reducer;
