// frontend/src/styles/accessibilityColors.ts
import { DefaultTheme } from "styled-components";

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
  colors: {
    primary: teaColors.primary,
    secondary: teaColors.secondary,
    tertiary: teaColors.tertiary,
    success: teaColors.success,
    warning: teaColors.warning,
    error: teaColors.error,
    info: teaColors.info,
    neutral: teaColors.neutral,

    background: {
      primary: "#ffffff",
      secondary: teaColors.neutral[50],
      tertiary: teaColors.neutral[50],
      surface: "#ffffff",
      card: "#ffffff",
    },

    text: {
      primary: teaColors.neutral[800],
      secondary: teaColors.neutral[600],
      tertiary: teaColors.neutral[500],
      inverse: "#ffffff",
    },

    border: {
      light: teaColors.neutral[200],
      normal: teaColors.neutral[400],
      dark: teaColors.neutral[400],
    },
  },

  typography: {
    fontFamily: {
      primary:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      secondary: "'Roboto', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },

    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "30px",
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },

    fontScale: {
      normal: 1,
      medium: 1.125,
      large: 1.25,
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  shadows: {
    light: "0 1px 2px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.07)",
    heavy: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },

  transitions: {
    fast: "0.15s ease",
    normal: "0.2s ease",
    slow: "0.3s ease",
  },
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "1024px",
    lg: "1280px",
    xl: "1536px",
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// Tema oscuro optimizado para TEA
export const teaDarkTheme: DefaultTheme = {
  colors: {
    primary: teaColors.primary,
    secondary: teaColors.secondary,
    tertiary: teaColors.tertiary,
    success: teaColors.success,
    warning: teaColors.warning,
    error: teaColors.error,
    info: teaColors.info,
    neutral: teaColors.neutral,

    background: {
      primary: teaColors.neutral[900],
      secondary: teaColors.neutral[800],
      tertiary: teaColors.neutral[700],
      surface: teaColors.neutral[800],
      card: teaColors.neutral[800],
    },

    text: {
      primary: teaColors.neutral[50],
      secondary: teaColors.neutral[400],
      tertiary: teaColors.neutral[400],
      inverse: "#000000",
    },

    border: {
      light: teaColors.neutral[600],
      normal: teaColors.neutral[700],
      dark: teaColors.neutral[800],
    },
  },

  typography: teaLightTheme.typography,
  spacing: teaLightTheme.spacing,
  borderRadius: teaLightTheme.borderRadius,
  shadows: teaLightTheme.shadows,
  transitions: teaLightTheme.transitions,
  breakpoints: teaLightTheme.breakpoints,
  zIndex: teaLightTheme.zIndex,
};

// Tema de alto contraste para TEA
export const teaHighContrastTheme: DefaultTheme = {
  colors: {
    primary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#0000ff", // Azul vibrante
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
      500: "#ff0000", // Rojo vibrante
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
      500: "#00ff00", // Verde vibrante
      600: "#00cc00",
      700: "#009900",
      800: "#006600",
      900: "#003300",
    },
    success: {
      50: "#ffffff",
      500: "#00ff00", // Verde brillante
      600: "#00cc00",
      700: "#009900",
    },
    warning: {
      50: "#ffffff",
      500: "#ffff00", // Amarillo brillante
      600: "#cccc00",
      700: "#999900",
    },
    error: {
      50: "#ffffff",
      500: "#ff0000", // Rojo brillante
      600: "#cc0000",
      700: "#990000",
    },
    info: {
      50: "#ffffff",
      500: "#0000ff", // Azul brillante
      600: "#0000cc",
      700: "#000099",
    },
    neutral: {
      50: "#ffffff", // Blanco puro
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#000000", // Negro puro
      600: "#000000",
      700: "#000000",
      800: "#000000",
      900: "#000000",
    },

    background: {
      primary: "#ffffff", // Fondo blanco
      secondary: "#ffffff",
      tertiary: "#ffffff",
      surface: "#ffffff",
      card: "#ffffff",
    },

    text: {
      primary: "#000000", // Texto negro
      secondary: "#000000",
      tertiary: "#000000",
      inverse: "#ffffff", // Texto blanco para fondos oscuros
    },

    border: {
      light: "#000000", // Bordes negros
      normal: "#000000",
      dark: "#000000",
    },
  },

  typography: {
    ...teaLightTheme.typography,
    fontWeight: {
      ...teaLightTheme.typography.fontWeight,
      normal: 500, // Texto más grueso para mejor legibilidad
    },
  },

  spacing: teaLightTheme.spacing,
  borderRadius: teaLightTheme.borderRadius,
  shadows: {
    light: "none",
    medium: "none",
    heavy: "none",
  },
  transitions: {
    fast: "0s",
    normal: "0s",
    slow: "0s",
  },
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "1024px",
    lg: "1280px",
    xl: "1536px",
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};
