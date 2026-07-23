import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import { getCombinedTheme } from "./themes";
import type { DefaultTheme } from "styled-components";
import { setTheme as setReduxTheme } from "../store/slices/uiSlice";

export type Theme = "light" | "dark";
export type AccessibilityTheme = "default" | "high-contrast" | "protanopia" | "deuteranopia" | "tritanopia";

export interface CustomColors {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
  accent?: string;
}

export interface ThemeConfig {
  theme: Theme;
  accessibility: AccessibilityTheme;
  autoDetect?: boolean;
  customColors?: CustomColors;
  customThemeName?: string;
}

interface ThemeContextType {
  theme: Theme;
  accessibility: AccessibilityTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccessibility: (accessibility: AccessibilityTheme) => void;
  currentTheme: DefaultTheme;
  themeConfig: ThemeConfig;
  setCustomColors: (colors: CustomColors | undefined) => void;
  clearCustomColors: () => void;
  setAutoDetect: (enabled: boolean) => void;
  saveCustomTheme: (name: string, colors: CustomColors) => void;
  loadCustomTheme: (name: string) => CustomColors | null;
  getSavedThemes: () => Array<{ name: string; colors: CustomColors }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = "zn-portal-user-theme";
const THEMES_KEY = "zn-portal-custom-themes";

function loadConfig(): ThemeConfig {
  try {
    // 1. Intentar cargar desde localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ThemeConfig;
      if (parsed && (parsed.theme === "light" || parsed.theme === "dark")) {
        return { ...parsed, autoDetect: false };
      }
    }
    // 2. Fallback: intentar cargar desde cookie
    const cookieMatch = document.cookie.match(new RegExp("(?:^|; )" + STORAGE_KEY + "=([^;]*)"));
    if (cookieMatch && (cookieMatch[1] === "light" || cookieMatch[1] === "dark")) {
      return { theme: cookieMatch[1] as Theme, accessibility: "default", autoDetect: false };
    }
  } catch {
    /* ignore */
  }
  return { theme: "light", accessibility: "default", autoDetect: false };
}

function saveConfig(config: ThemeConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    document.cookie = `${STORAGE_KEY}=${config.theme}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* localStorage or cookies may be unavailable */
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(loadConfig);

  const currentTheme = useMemo(() => {
    try {
      const theme = getCombinedTheme(themeConfig.theme, themeConfig.accessibility, themeConfig.customColors);
      if (!theme || !theme.colors || !theme.typography) {
        return getCombinedTheme("light", "default");
      }
      return theme;
    } catch {
      return getCombinedTheme("light", "default");
    }
  }, [themeConfig.theme, themeConfig.accessibility, themeConfig.customColors]);

  const updateConfig = useCallback((updates: Partial<ThemeConfig>) => {
    setThemeConfigState((prev) => {
      const next: ThemeConfig = { ...prev, ...updates };
      saveConfig(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    updateConfig({ theme, autoDetect: false, customColors: undefined });
    dispatch(setReduxTheme(theme));
  }, [updateConfig, dispatch]);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = themeConfig.theme === "light" ? "dark" : "light";
    updateConfig({ theme: newTheme, autoDetect: false, customColors: undefined });
    dispatch(setReduxTheme(newTheme));
  }, [themeConfig.theme, updateConfig, dispatch]);

  const setAccessibility = useCallback((accessibility: AccessibilityTheme) => {
    updateConfig({ accessibility });
  }, [updateConfig]);

  const setCustomColors = useCallback((customColors: CustomColors | undefined) => {
    updateConfig({ customColors });
  }, [updateConfig]);

  const clearCustomColors = useCallback(() => {
    updateConfig({ customColors: undefined, customThemeName: undefined });
  }, [updateConfig]);

  const setAutoDetect = useCallback((autoDetect: boolean) => {
    updateConfig({ autoDetect });
    if (autoDetect) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newTheme: Theme = prefersDark ? "dark" : "light";
      updateConfig({ theme: newTheme, autoDetect: true });
      dispatch(setReduxTheme(newTheme));
    }
  }, [updateConfig, dispatch]);

  const saveCustomTheme = useCallback((name: string, colors: CustomColors) => {
    try {
      const savedThemes = JSON.parse(localStorage.getItem(THEMES_KEY) || "[]") as Array<{ name: string; colors: CustomColors }>;
      const existingIndex = savedThemes.findIndex((t) => t.name === name);
      if (existingIndex >= 0) savedThemes[existingIndex] = { name, colors };
      else savedThemes.push({ name, colors });
      localStorage.setItem(THEMES_KEY, JSON.stringify(savedThemes));
    } catch { /* ignore */ }
    updateConfig({ customColors: colors, customThemeName: name });
  }, [updateConfig]);

  const loadCustomTheme = useCallback((name: string): CustomColors | null => {
    try {
      const savedThemes = JSON.parse(localStorage.getItem(THEMES_KEY) || "[]") as Array<{ name: string; colors: CustomColors }>;
      const found = savedThemes.find((t) => t.name === name);
      if (found) {
        updateConfig({ customColors: found.colors, customThemeName: name });
        return found.colors;
      }
    } catch { /* ignore */ }
    return null;
  }, [updateConfig]);

  const getSavedThemes = useCallback((): Array<{ name: string; colors: CustomColors }> => {
    try {
      return JSON.parse(localStorage.getItem(THEMES_KEY) || "[]");
    } catch { return []; }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || !document.documentElement) return;
    const isDark = themeConfig.theme === "dark";
    const colors = currentTheme?.colors;

    document.documentElement.setAttribute("data-theme", themeConfig.theme);
    document.documentElement.setAttribute("data-accessibility", themeConfig.accessibility);

    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.body?.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body?.classList.remove("dark-mode");
    }

    if (colors && colors.background) {
      document.documentElement.style.setProperty("--color-background-primary", colors.background.primary);
      document.documentElement.style.setProperty("--color-background-secondary", colors.background.secondary);
      document.documentElement.style.setProperty("--color-background-card", colors.background.card);
      document.documentElement.style.setProperty("--color-background-surface", colors.background.surface);
      document.documentElement.style.setProperty("--color-text-primary", colors.text.primary);
      document.documentElement.style.setProperty("--color-text-secondary", colors.text.secondary);
      document.documentElement.style.setProperty("--color-border-light", colors.border.light);

      document.documentElement.style.removeProperty("--color-bg-primary");
      document.documentElement.style.removeProperty("--color-bg-secondary");
      document.documentElement.style.removeProperty("--color-bg-card");

      // Actualizar dinámicamente el fondo de HTML y Body para sobreescribir el estilo inyectado en la carga
      document.documentElement.style.backgroundColor = colors.background.primary;
      if (document.body) {
        document.body.style.backgroundColor = colors.background.primary;
        document.body.style.color = colors.text.primary;
      }
    }
  }, [themeConfig.theme, themeConfig.accessibility, currentTheme]);

  useEffect(() => {
    if (themeConfig.autoDetect !== false) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setThemeConfigState((prev) => {
          if (prev.autoDetect === false) return prev;
          const next: ThemeConfig = { ...prev, theme: e.matches ? "dark" : "light" };
          saveConfig(next);
          return next;
        });
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [themeConfig.autoDetect]);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme: themeConfig.theme,
      accessibility: themeConfig.accessibility,
      toggleTheme,
      setTheme,
      setAccessibility,
      currentTheme,
      themeConfig,
      setCustomColors,
      clearCustomColors,
      setAutoDetect,
      saveCustomTheme,
      loadCustomTheme,
      getSavedThemes,
    }),
    [themeConfig, toggleTheme, setTheme, setAccessibility, currentTheme, setCustomColors, clearCustomColors, setAutoDetect]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
