import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getCombinedTheme } from "./themes";
import type { DefaultTheme } from "styled-components";

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
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ThemeConfig;
      if (parsed.autoDetect !== false) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return { ...parsed, theme: prefersDark ? "dark" : "light" };
      }
      return parsed;
    }
  } catch {
    /* ignore */
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return { theme: prefersDark ? "dark" : "light", accessibility: "default", autoDetect: true };
}

function saveConfig(config: ThemeConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* localStorage may be unavailable */
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(loadConfig);

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    setThemeConfigState((prev) => {
      const next: ThemeConfig = { ...prev, ...updates };
      saveConfig(next);
      return next;
    });
  };

  const setTheme = (theme: Theme) => updateConfig({ theme });
  const setAccessibility = (accessibility: AccessibilityTheme) => updateConfig({ accessibility });

  const toggleTheme = () => {
    setThemeConfigState((prev) => {
      const next: ThemeConfig = { ...prev, theme: prev.theme === "light" ? "dark" : "light" };
      saveConfig(next);
      return next;
    });
  };

  const setCustomColors = (customColors: CustomColors | undefined) => updateConfig({ customColors });
  const clearCustomColors = () => updateConfig({ customColors: undefined, customThemeName: undefined });

  const setAutoDetect = (autoDetect: boolean) => {
    setThemeConfigState((prev) => {
      const next: ThemeConfig = { ...prev, autoDetect };
      saveConfig(next);
      return next;
    });
    if (autoDetect) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  };

  const saveCustomTheme = (name: string, colors: CustomColors) => {
    try {
      const savedThemes = JSON.parse(localStorage.getItem(THEMES_KEY) || "[]") as Array<{ name: string; colors: CustomColors }>;
      const existingIndex = savedThemes.findIndex((t) => t.name === name);
      if (existingIndex >= 0) savedThemes[existingIndex] = { name, colors };
      else savedThemes.push({ name, colors });
      localStorage.setItem(THEMES_KEY, JSON.stringify(savedThemes));
    } catch { /* ignore */ }
    updateConfig({ customColors: colors, customThemeName: name });
  };

  const loadCustomTheme = (name: string): CustomColors | null => {
    try {
      const savedThemes = JSON.parse(localStorage.getItem(THEMES_KEY) || "[]") as Array<{ name: string; colors: CustomColors }>;
      const theme = savedThemes.find((t) => t.name === name);
      if (theme) {
        updateConfig({ customColors: theme.colors, customThemeName: name });
        return theme.colors;
      }
    } catch { /* ignore */ }
    return null;
  };

  const getSavedThemes = (): Array<{ name: string; colors: CustomColors }> => {
    try {
      return JSON.parse(localStorage.getItem(THEMES_KEY) || "[]");
    } catch { return []; }
  };

  useEffect(() => {
    if (typeof document === "undefined" || !document.documentElement) return;
    document.documentElement.setAttribute("data-theme", themeConfig.theme);
    document.documentElement.setAttribute("data-accessibility", themeConfig.accessibility);
  }, [themeConfig.theme, themeConfig.accessibility]);

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
