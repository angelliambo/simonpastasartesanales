// Paleta de colores armoniosa y profesional para ZenithNexus
export const colorPalette = {
  // Colores principales - Cyan suave y armonioso
  primary: {
    50: "#f0fdfa", // Muy claro, casi blanco
    100: "#ccfbf1", // Claro
    200: "#99f6e4", // Medio claro
    300: "#5eead4", // Medio
    400: "#2dd4bf", // Medio oscuro
    500: "#14b8a6", // Principal - Cyan suave
    600: "#0d9488", // Oscuro
    700: "#0f766e", // Más oscuro
    800: "#115e59", // Muy oscuro
    900: "#134e4a", // Extremo oscuro
  },

  // Colores secundarios - Azules suaves
  secondary: {
    50: "#f0f9ff", // Muy claro
    100: "#e0f2fe", // Claro
    200: "#bae6fd", // Medio claro
    300: "#7dd3fc", // Medio
    400: "#38bdf8", // Medio oscuro
    500: "#0ea5e9", // Principal - Azul suave
    600: "#0284c7", // Oscuro
    700: "#0369a1", // Más oscuro
    800: "#075985", // Muy oscuro
    900: "#0c4a6e", // Extremo oscuro
  },

  // Colores de acento - Verdes suaves
  accent: {
    50: "#f0fdf4", // Muy claro
    100: "#dcfce7", // Claro
    200: "#bbf7d0", // Medio claro
    300: "#86efac", // Medio
    400: "#4ade80", // Medio oscuro
    500: "#22c55e", // Principal - Verde suave
    600: "#16a34a", // Oscuro
    700: "#15803d", // Más oscuro
    800: "#166534", // Muy oscuro
    900: "#14532d", // Extremo oscuro
  },

  // Colores neutros - Grises cálidos
  neutral: {
    50: "#fafafa", // Muy claro
    100: "#f5f5f5", // Claro
    200: "#e5e5e5", // Medio claro
    300: "#d4d4d4", // Medio
    400: "#a3a3a3", // Medio oscuro
    500: "#737373", // Principal - Gris medio
    600: "#525252", // Oscuro
    700: "#404040", // Más oscuro
    800: "#262626", // Muy oscuro
    900: "#171717", // Extremo oscuro
  },

  // Colores de estado
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Colores de fondo
  background: {
    primary: "#f0f0f0", // Gris claro para distinguir cards blancas
    secondary: "#e8e8e8", // Más oscuro para mejor contraste
    tertiary: "#e0e0e0", // Gris medio
    card: "#ffffff", // Blanco puro para cards
    overlay: "rgba(0, 0, 0, 0.1)",
  },

  // Colores de texto
  text: {
    primary: "#1f2937", // Gris muy oscuro
    secondary: "#6b7280", // Gris medio
    tertiary: "#9ca3af", // Gris claro
    inverse: "#ffffff", // Blanco
    accent: "#14b8a6", // Cyan principal
  },

  // Colores de borde
  border: {
    light: "#e5e7eb", // Gris muy claro
    medium: "#d1d5db", // Gris claro
    dark: "#9ca3af", // Gris medio
  },

  // Sombras
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Gradientes
  gradients: {
    primary: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    secondary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    accent: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    hero: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
    card: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
  },
} as const;

export type ColorPalette = typeof colorPalette;
