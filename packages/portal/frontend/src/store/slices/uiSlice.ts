import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  locale: string;
  theme: "light" | "dark" | "auto";
  globalLoading: boolean;
  sidebarOpen: boolean;
}

const getSavedTheme = (): "light" | "dark" | "auto" => {
  try {
    const saved = localStorage.getItem("zn-portal-user-theme");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.theme === "dark" || parsed?.theme === "light") {
        return parsed.theme;
      }
    }
  } catch { /* ignore */ }
  return "light";
};

const initialState: UIState = {
  locale: "es-MX",
  theme: getSavedTheme(),
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
