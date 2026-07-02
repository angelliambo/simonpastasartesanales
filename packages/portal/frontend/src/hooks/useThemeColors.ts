import React from "react";
import { DefaultTheme } from "styled-components";
import { useTheme } from "../styles/ThemeProvider";
import { useAccessibilityRedux } from "./useAccessibilityRedux";
import { getCombinedTheme, lightTheme } from "../styles/themes";

const createFallbackTheme = (): DefaultTheme => {
  try {
    return getCombinedTheme("light", "default");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "[useThemeColors] No se pudo cargar el tema combinado, usando lightTheme.",
      error
    );
    return lightTheme;
  }
};

export const useThemeColors = () => {
  const { currentTheme } = useTheme();
  const { preferences, lastUpdated } = useAccessibilityRedux();
  const fallbackThemeRef = React.useRef<DefaultTheme | null>(null);
  if (!fallbackThemeRef.current) {
    fallbackThemeRef.current = createFallbackTheme();
  }

  const resolvedTheme = React.useMemo(() => {
    if (
      currentTheme &&
      (currentTheme as DefaultTheme)?.colors &&
      (currentTheme as DefaultTheme)?.colors?.primary
    ) {
      return currentTheme as DefaultTheme;
    }
    return fallbackThemeRef.current!;
  }, [currentTheme]);

  // Forzar re-render cuando cambien las preferencias de accesibilidad
  // Esto asegura que todos los componentes se actualicen automáticamente
  React.useEffect(() => {
    // Este efecto se ejecuta cada vez que cambian las preferencias
    // y fuerza el re-render de todos los componentes que usan useThemeColors
  }, [
    preferences?.theme,
    preferences?.highContrast,
    (preferences as any)?.colorBlindSupport,
    lastUpdated,
  ]);

  // Función para obtener valores CSS de las variables de accesibilidad
  const getCSSVariable = (variable: string, fallback: string) => {
    if (typeof window !== "undefined") {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
      return value || fallback;
    }
    return fallback;
  };

  return {
    // Colores principales - usar variables CSS de accesibilidad si están disponibles
    primary: {
      50: getCSSVariable("--color-primary", resolvedTheme.colors.primary[50]),
      100: getCSSVariable("--color-primary", resolvedTheme.colors.primary[50]),
      200: getCSSVariable("--color-primary", resolvedTheme.colors.primary[200]),
      300: getCSSVariable("--color-primary", resolvedTheme.colors.primary[300]),
      400: getCSSVariable("--color-primary", resolvedTheme.colors.primary[400]),
      500: getCSSVariable("--color-primary", resolvedTheme.colors.primary[500]),
      600: getCSSVariable("--color-primary", resolvedTheme.colors.primary[600]),
      700: getCSSVariable("--color-primary", resolvedTheme.colors.primary[700]),
      800: getCSSVariable("--color-primary", resolvedTheme.colors.primary[800]),
      900: getCSSVariable("--color-primary", resolvedTheme.colors.primary[900]),
    },
    secondary: {
      50: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[50]
      ),
      100: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[100]
      ),
      200: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[200]
      ),
      300: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[300]
      ),
      400: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[400]
      ),
      500: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[500]
      ),
      600: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[600]
      ),
      700: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[700]
      ),
      800: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[800]
      ),
      900: getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[900]
      ),
    },
    tertiary: resolvedTheme.colors.tertiary,

    // Colores de fondo - usar el tema combinado directamente
    background: {
      primary: resolvedTheme.colors.background.primary,
      secondary: resolvedTheme.colors.background.secondary,
      card: resolvedTheme.colors.background.card,
      surface: resolvedTheme.colors.background.surface,
      tertiary: resolvedTheme.colors.background.tertiary,
      backgroundLayout: resolvedTheme.colors.background.primary,
    },

    // Colores de texto - usar el tema combinado directamente
    text: {
      primary: resolvedTheme.colors.text.primary,
      secondary: resolvedTheme.colors.text.secondary,
      tertiary: resolvedTheme.colors.text.tertiary,
      inverse: resolvedTheme.colors.text.inverse,
    },

    // Colores de borde - usar el tema combinado directamente
    border: {
      light: resolvedTheme.colors.border?.light || "#e0e0e0",
      medium: resolvedTheme.colors.border?.normal || "#d0d0d0",
      dark: resolvedTheme.colors.border?.dark || "#c0c0c0",
      normal: resolvedTheme.colors.border?.normal || "#d0d0d0",
    },

    // Colores semánticos - usar el tema combinado directamente
    success: {
      50: resolvedTheme.colors.success[50],
      100: resolvedTheme.colors.success[500],
      200: resolvedTheme.colors.success[500],
      300: resolvedTheme.colors.success[500],
      400: resolvedTheme.colors.success[500],
      500: resolvedTheme.colors.success[500],
      600: resolvedTheme.colors.success[600],
      700: resolvedTheme.colors.success[700],
      800: resolvedTheme.colors.success[700],
      900: resolvedTheme.colors.success[700],
    },
    warning: {
      50: resolvedTheme.colors.warning[50],
      100: resolvedTheme.colors.warning[500],
      200: resolvedTheme.colors.warning[500],
      300: resolvedTheme.colors.warning[500],
      400: resolvedTheme.colors.warning[500],
      500: resolvedTheme.colors.warning[500],
      600: resolvedTheme.colors.warning[600],
      700: resolvedTheme.colors.warning[700],
      800: resolvedTheme.colors.warning[700],
      900: resolvedTheme.colors.warning[700],
    },
    error: {
      50: resolvedTheme.colors.error[50],
      100: resolvedTheme.colors.error[500],
      200: resolvedTheme.colors.error[500],
      300: resolvedTheme.colors.error[500],
      400: resolvedTheme.colors.error[500],
      500: resolvedTheme.colors.error[500],
      600: resolvedTheme.colors.error[600],
      700: resolvedTheme.colors.error[700],
      800: resolvedTheme.colors.error[700],
      900: resolvedTheme.colors.error[700],
    },
    info: {
      50: resolvedTheme.colors.info[50],
      100: resolvedTheme.colors.info[500],
      200: resolvedTheme.colors.info[500],
      300: resolvedTheme.colors.info[500],
      400: resolvedTheme.colors.info[500],
      500: resolvedTheme.colors.info[500],
      600: resolvedTheme.colors.info[600],
      700: resolvedTheme.colors.info[700],
      800: resolvedTheme.colors.info[700],
      900: resolvedTheme.colors.info[700],
    },

    // Sombras - usar el tema combinado directamente
    shadow: {
      sm: resolvedTheme.shadows?.light || "0 1px 3px rgba(0, 0, 0, 0.1)",
      md: resolvedTheme.shadows?.medium || "0 4px 6px rgba(0, 0, 0, 0.1)",
      lg: resolvedTheme.shadows?.heavy || "0 10px 15px rgba(0, 0, 0, 0.1)",
      xl: resolvedTheme.shadows?.heavy || "0 20px 25px rgba(0, 0, 0, 0.1)",
      light: resolvedTheme.shadows?.light || "0 1px 3px rgba(0, 0, 0, 0.1)",
      medium: resolvedTheme.shadows?.medium || "0 4px 6px rgba(0, 0, 0, 0.1)",
      heavy: resolvedTheme.shadows?.heavy || "0 10px 15px rgba(0, 0, 0, 0.1)",
    },

    // Gradientes dinámicos basados en el tema
    gradients: {
      primary: `linear-gradient(135deg, ${getCSSVariable(
        "--color-primary",
        resolvedTheme.colors.primary[500]
      )} 0%, ${getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.primary[600]
      )} 100%)`,
      secondary: `linear-gradient(135deg, ${getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[500]
      )} 0%, ${getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[600]
      )} 100%)`,
      card: `linear-gradient(145deg, ${getCSSVariable(
        "--color-surface",
        resolvedTheme.colors.background.card
      )} 0%, ${getCSSVariable(
        "--color-surface",
        resolvedTheme.colors.background.surface
      )} 100%)`,
      hero: `linear-gradient(135deg, ${getCSSVariable(
        "--color-primary",
        resolvedTheme.colors.primary[500]
      )} 0%, ${getCSSVariable(
        "--color-secondary",
        resolvedTheme.colors.secondary[500]
      )} 100%)`,
    },

    // Overlay para modales y drawers
    overlay:
      getCSSVariable(
        "--color-background",
        resolvedTheme.colors.background.primary
      ) + "CC", // 80% opacity
  };
};
