import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  locale: string;
  theme: "light" | "dark" | "auto";
  globalLoading: boolean;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  locale: "es-MX",
  theme: "auto",
  globalLoading: false,
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "auto">) => {
      state.theme = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    resetUI: () => initialState,
  },
});

export const {
  setLocale,
  setTheme,
  setGlobalLoading,
  toggleSidebar,
  setSidebarOpen,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
