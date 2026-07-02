import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccessibilityState {
  highContrast: boolean;
  fontSize: number;
  reducedMotion: boolean;
}

const initialState: AccessibilityState = {
  highContrast: false,
  fontSize: 16,
  reducedMotion: false,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setHighContrast: (state, action: PayloadAction<boolean>) => {
      state.highContrast = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setHighContrast, setFontSize, setReducedMotion, reset } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
