import { useAccessibility } from "../useAccessibility";

export const useAccessibilityPreferences = () => {
  const { settings, loading, error } = useAccessibility();

  return {
    preferences: {
      highContrast: settings.highContrast,
      reducedMotion: settings.reducedMotion,
      largeText: settings.fontSize === "large",
      fontSize: settings.fontSize,
    },
    isLoading: loading,
    error,
  };
};
