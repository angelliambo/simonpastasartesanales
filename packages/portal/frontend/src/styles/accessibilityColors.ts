// frontend/src/styles/accessibilityColors.ts
import { DefaultTheme } from "styled-components";
import lightTheme from "@design-sys/theme/light";
import darkTheme from "@design-sys/theme/dark";

// Paleta de colores suaves optimizada para accesibilidad
export const accessibilityColors = {
  // Colores primarios suaves y calmantes
  primary: {
    50: "#f0f4ff", // Azul muy suave
    100: "#e0e9ff", // Azul suave
    200: "#c7d7fe", // Azul medio-suave
    300: "#a5b8fc", // Azul medio
    400: "#8194f8", // Azul medio-fuerte
    500: "#667eea", // Azul principal
    600: "#5a67d8", // Azul fuerte
    700: "#4c51bf", // Azul muy fuerte
    800: "#434190", // Azul oscuro
    900: "#3c366b", // Azul muy oscuro
  },

  // Colores secundarios cálidos pero suaves
  secondary: {
    50: "#faf5ff", // Púrpura muy suave
    100: "#f3e8ff", // Púrpura suave
    200: "#e9d5ff", // Púrpura medio-suave
    300: "#d8b4fe", // Púrpura medio
    400: "#c084fc", // Púrpura medio-fuerte
    500: "#a855f7", // Púrpura principal
    600: "#9333ea", // Púrpura fuerte
    700: "#7c3aed", // Púrpura muy fuerte
    800: "#6b21a8", // Púrpura oscuro
    900: "#581c87", // Púrpura muy oscuro
  },

  // Colores de éxito suaves
  success: {
    50: "#f0fff4", // Verde muy suave
    100: "#dcfce7", // Verde suave
    200: "#bbf7d0", // Verde medio-suave
    300: "#86efac", // Verde medio
    400: "#4ade80", // Verde medio-fuerte
    500: "#22c55e", // Verde principal
    600: "#16a34a", // Verde fuerte
    700: "#15803d", // Verde muy fuerte
    800: "#166534", // Verde oscuro
    900: "#14532d", // Verde muy oscuro
  },

  // Colores de advertencia suaves
  warning: {
    50: "#fffbeb", // Amarillo muy suave
    100: "#fef3c7", // Amarillo suave
    200: "#fde68a", // Amarillo medio-suave
    300: "#fcd34d", // Amarillo medio
    400: "#fbbf24", // Amarillo medio-fuerte
    500: "#f59e0b", // Amarillo principal
    600: "#d97706", // Amarillo fuerte
    700: "#b45309", // Amarillo muy fuerte
    800: "#92400e", // Amarillo oscuro
    900: "#78350f", // Amarillo muy oscuro
  },

  // Colores de error suaves
  error: {
    50: "#fef2f2", // Rojo muy suave
    100: "#fee2e2", // Rojo suave
    200: "#fecaca", // Rojo medio-suave
    300: "#fca5a5", // Rojo medio
    400: "#f87171", // Rojo medio-fuerte
    500: "#ef4444", // Rojo principal
    600: "#dc2626", // Rojo fuerte
    700: "#b91c1c", // Rojo muy fuerte
    800: "#991b1b", // Rojo oscuro
    900: "#7f1d1d", // Rojo muy oscuro
  },

  // Colores neutros suaves
  neutral: {
    50: "#fafafa", // Gris muy claro
    100: "#f5f5f5", // Gris claro
    200: "#e5e5e5", // Gris medio-claro
    300: "#d4d4d4", // Gris medio
    400: "#a3a3a3", // Gris medio-oscuro
    500: "#737373", // Gris principal
    600: "#525252", // Gris oscuro
    700: "#404040", // Gris muy oscuro
    800: "#262626", // Gris casi negro
    900: "#171717", // Gris negro
  },
  tertiary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  info: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
};

// Tema claro optimizado para TEA
export const teaLightTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: accessibilityColors.primary,
    secondary: accessibilityColors.secondary,
    tertiary: accessibilityColors.tertiary,
    success: accessibilityColors.success,
    warning: accessibilityColors.warning,
    error: accessibilityColors.error,
    info: accessibilityColors.info,
    neutral: accessibilityColors.neutral,

    background: {
      primary: "#ffffff",
      secondary: accessibilityColors.neutral[50],
      tertiary: accessibilityColors.neutral[50],
      surface: "#ffffff",
      card: "#ffffff",
    },

    text: {
      primary: accessibilityColors.neutral[800],
      secondary: accessibilityColors.neutral[600],
      tertiary: accessibilityColors.neutral[500],
      inverse: "#ffffff",
    },

    border: {
      light: accessibilityColors.neutral[200],
      normal: accessibilityColors.neutral[400],
      dark: accessibilityColors.neutral[400],
    },
  },
};

// Tema oscuro optimizado para TEA
export const teaDarkTheme: DefaultTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: accessibilityColors.primary,
    secondary: accessibilityColors.secondary,
    tertiary: accessibilityColors.tertiary,
    success: accessibilityColors.success,
    warning: accessibilityColors.warning,
    error: accessibilityColors.error,
    info: accessibilityColors.info,
    neutral: accessibilityColors.neutral,

    background: {
      primary: accessibilityColors.neutral[900],
      secondary: accessibilityColors.neutral[800],
      tertiary: accessibilityColors.neutral[700],
      surface: accessibilityColors.neutral[800],
      card: accessibilityColors.neutral[800],
    },

    text: {
      primary: accessibilityColors.neutral[50],
      secondary: accessibilityColors.neutral[400],
      tertiary: accessibilityColors.neutral[400],
      inverse: "#000000",
    },

    border: {
      light: accessibilityColors.neutral[600],
      normal: accessibilityColors.neutral[700],
      dark: accessibilityColors.neutral[800],
    },
  },
};

// Tema de alto contraste para TEA
export const teaHighContrastTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#0000ff",
      600: "#0000cc",
      700: "#000099",
      800: "#000066",
      900: "#000033",
    },
    secondary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#ff0000",
      600: "#cc0000",
      700: "#990000",
      800: "#660000",
      900: "#330000",
    },
    tertiary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#00ff00",
      600: "#00cc00",
      700: "#009900",
      800: "#006600",
      900: "#003300",
    },
    success: {
      50: "#ffffff",
      500: "#00ff00",
      600: "#00cc00",
      700: "#009900",
    },
    warning: {
      50: "#ffffff",
      500: "#ffff00",
      600: "#cccc00",
      700: "#999900",
    },
    error: {
      50: "#ffffff",
      500: "#ff0000",
      600: "#cc0000",
      700: "#990000",
    },
    info: {
      50: "#ffffff",
      500: "#0000ff",
      600: "#0000cc",
      700: "#000099",
    },
    neutral: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#000000",
      600: "#000000",
      700: "#000000",
      800: "#000000",
      900: "#000000",
    },

    background: {
      primary: "#ffffff",
      secondary: "#ffffff",
      tertiary: "#ffffff",
      surface: "#ffffff",
      card: "#ffffff",
    },

    text: {
      primary: "#000000",
      secondary: "#000000",
      tertiary: "#000000",
      inverse: "#ffffff",
    },

    border: {
      light: "#000000",
      normal: "#000000",
      dark: "#000000",
    },
  },
};
