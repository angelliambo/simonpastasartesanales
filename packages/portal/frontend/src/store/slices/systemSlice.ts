import { createSlice } from "@reduxjs/toolkit";

interface SystemState {
  version: string;
  isOnline: boolean;
}

const initialState: SystemState = {
  version: "1.0.0",
  isOnline: navigator.onLine,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = systemSlice.actions;
export default systemSlice.reducer;
