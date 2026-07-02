import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  email: string;
  plan: string;
  createdAt: string;
  lastLogin?: string;
  stats?: {
    readings: number;
    dictations: number;
    daysActive: number;
  };
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: () => initialState,
  },
});

export const { setProfile, setUserLoading, setUserError, reset } =
  userSlice.actions;
export default userSlice.reducer;
