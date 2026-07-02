import { useState, useCallback } from "react";

interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: "small" | "medium" | "large";
  screenReader: boolean;
  theme: "default" | "high-contrast" | "protanopia" | "deuteranopia" | "tritanopia";
}

interface UseAccessibilityReturn {
  settings: AccessibilitySettings;
  loading: boolean;
  error: string | null;
  updateSettings: (updates: Partial<AccessibilitySettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const STORAGE_KEY = "zn-portal-accessibility-settings";

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  reducedMotion: false,
  fontSize: "medium",
  screenReader: false,
  theme: "default",
};

const loadFromStorage = (): AccessibilitySettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return defaultSettings;
};

const saveToStorage = (settings: AccessibilitySettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
};

export const useAccessibility = (): UseAccessibilityReturn => {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadFromStorage());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = loadFromStorage();
      setSettings(stored);
    } catch (err) {
      setError("Error loading accessibility settings");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(
    async (updates: Partial<AccessibilitySettings>) => {
      setLoading(true);
      setError(null);
      try {
        const newSettings = { ...settings, ...updates };
        setSettings(newSettings);
        saveToStorage(newSettings);
      } catch {
        setError("Error saving accessibility settings");
      } finally {
        setLoading(false);
      }
    },
    [settings],
  );

  const resetSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setSettings(defaultSettings);
      saveToStorage(defaultSettings);
    } catch {
      setError("Error resetting accessibility settings");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    await loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    error,
    updateSettings,
    resetSettings,
    refreshSettings,
  };
};
