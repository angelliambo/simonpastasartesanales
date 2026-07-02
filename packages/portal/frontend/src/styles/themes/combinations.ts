import { DefaultTheme } from "styled-components";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { highContrastTheme } from "./accessibility/high-contrast";
import { grayScale, daltonismScales } from "./colors";

/**
 * Combina un tema base con un tema de accesibilidad
 */
function combineThemes(
  baseTheme: DefaultTheme,
  accessibilityTheme: Partial<DefaultTheme>
): DefaultTheme {
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...accessibilityTheme.colors, // Los colores de accesibilidad deben sobrescribir los base
    } as any,
    typography: {
      ...baseTheme.typography,
      ...accessibilityTheme.typography, // La tipografía de accesibilidad debe sobrescribir la base
    } as any,
    shadows: {
      ...baseTheme.shadows,
      ...accessibilityTheme.shadows, // Las sombras de accesibilidad deben sobrescribir las base
    } as any,
  };
}

/**
 * Aplica tema de daltonismo específico con manejo correcto de modo oscuro
 */
function applyDaltonismTheme(
  baseTheme: DefaultTheme,
  daltonismType: "protanopia" | "deuteranopia" | "tritanopia"
): Partial<DefaultTheme> {
  const isDark = baseTheme.colors.background.primary === grayScale[100];
  const daltonismScale = daltonismScales[daltonismType];

  return {
    colors: {
      // Colores primarios usando la escala específica del daltonismo
      primary: {
        50: isDark ? daltonismScale[20] : daltonismScale[10],
        100: isDark ? daltonismScale[30] : daltonismScale[20],
        200: isDark ? daltonismScale[40] : daltonismScale[30],
        300: isDark ? daltonismScale[50] : daltonismScale[40],
        400: isDark ? daltonismScale[60] : daltonismScale[50],
        500: isDark ? daltonismScale[70] : daltonismScale[60],
        600: isDark ? daltonismScale[80] : daltonismScale[70],
        700: isDark ? daltonismScale[90] : daltonismScale[80],
        800: isDark ? daltonismScale[100] : daltonismScale[90],
        900: isDark ? daltonismScale[100] : daltonismScale[100],
      },
      // Fondos y textos ajustados para modo oscuro
      background: {
        primary: isDark ? grayScale[100] : grayScale[0],
        secondary: isDark ? grayScale[90] : grayScale[5],
        tertiary: isDark ? grayScale[80] : grayScale[10],
        surface: isDark ? grayScale[100] : grayScale[0],
        card: isDark ? grayScale[85] : grayScale[0],
      },
      text: {
        primary: isDark ? grayScale[0] : grayScale[100],
        secondary: isDark ? grayScale[20] : grayScale[60],
        tertiary: isDark ? grayScale[40] : grayScale[50],
        inverse: grayScale[0], // Siempre blanco para texto sobre fondos oscuros
      },
      // Bordes usando colores del daltonismo para mejor visibilidad
      border: {
        light: isDark ? daltonismScale[30] : daltonismScale[20],
        normal: isDark ? daltonismScale[40] : daltonismScale[30],
        dark: isDark ? daltonismScale[50] : daltonismScale[40],
      },
    } as any,
  };
}

/**
 * Aplica ajustes específicos para alto contraste según el tema base
 */
function applyHighContrastAdjustments(
  baseTheme: DefaultTheme,
  highContrastTheme: Partial<DefaultTheme>
): Partial<DefaultTheme> {
  const isDark = baseTheme.colors.background.primary === grayScale[100]; // Check against the new dark primary background

  return {
    colors: {
      ...highContrastTheme.colors,
      background: {
        primary: isDark ? grayScale[100] : grayScale[0], // Negro o Blanco
        secondary: isDark ? grayScale[90] : grayScale[10], // Gris oscuro o gris claro
        tertiary: isDark ? grayScale[80] : grayScale[20], // Gris medio-oscuro o gris claro
        surface: isDark ? grayScale[100] : grayScale[0],
        card: isDark ? grayScale[85] : grayScale[15], // Gris para distinguir cards
      },
      text: {
        primary: isDark ? grayScale[0] : grayScale[100], // White or Black
        secondary: isDark ? grayScale[20] : grayScale[80], // Gris claro o gris oscuro
        tertiary: isDark ? grayScale[40] : grayScale[60], // Gris medio
        inverse: grayScale[0], // Siempre blanco para texto sobre fondos oscuros
      },
      primary: {
        50: isDark ? grayScale[20] : grayScale[80],
        100: isDark ? grayScale[30] : grayScale[70],
        200: isDark ? grayScale[40] : grayScale[60],
        300: isDark ? grayScale[50] : grayScale[50],
        400: isDark ? grayScale[60] : grayScale[40],
        500: isDark ? grayScale[70] : grayScale[30],
        600: isDark ? grayScale[80] : grayScale[20],
        700: isDark ? grayScale[90] : grayScale[10],
        800: isDark ? grayScale[95] : grayScale[5],
        900: isDark ? grayScale[100] : grayScale[0],
      },
      secondary: {
        50: isDark ? grayScale[15] : grayScale[85],
        100: isDark ? grayScale[25] : grayScale[75],
        200: isDark ? grayScale[35] : grayScale[65],
        300: isDark ? grayScale[45] : grayScale[55],
        400: isDark ? grayScale[55] : grayScale[45],
        500: isDark ? grayScale[65] : grayScale[35],
        600: isDark ? grayScale[75] : grayScale[25],
        700: isDark ? grayScale[85] : grayScale[15],
        800: isDark ? grayScale[95] : grayScale[5],
        900: isDark ? grayScale[100] : grayScale[0],
      },
      tertiary: {
        50: isDark ? grayScale[10] : grayScale[90],
        100: isDark ? grayScale[20] : grayScale[80],
        200: isDark ? grayScale[30] : grayScale[70],
        300: isDark ? grayScale[40] : grayScale[60],
        400: isDark ? grayScale[50] : grayScale[50],
        500: isDark ? grayScale[60] : grayScale[40],
        600: isDark ? grayScale[70] : grayScale[30],
        700: isDark ? grayScale[80] : grayScale[20],
        800: isDark ? grayScale[90] : grayScale[10],
        900: isDark ? grayScale[100] : grayScale[0],
      },
    } as any,
  };
}

// Temas combinados
export const lightHighContrastTheme = combineThemes(
  lightTheme,
  applyHighContrastAdjustments(lightTheme, highContrastTheme)
);

export const darkHighContrastTheme = combineThemes(
  darkTheme,
  applyHighContrastAdjustments(darkTheme, highContrastTheme)
);

export const lightProtanopiaTheme = combineThemes(
  lightTheme,
  applyDaltonismTheme(lightTheme, "protanopia")
);
export const darkProtanopiaTheme = combineThemes(
  darkTheme,
  applyDaltonismTheme(darkTheme, "protanopia")
);

export const lightDeuteranopiaTheme = combineThemes(
  lightTheme,
  applyDaltonismTheme(lightTheme, "deuteranopia")
);
export const darkDeuteranopiaTheme = combineThemes(
  darkTheme,
  applyDaltonismTheme(darkTheme, "deuteranopia")
);

export const lightTritanopiaTheme = combineThemes(
  lightTheme,
  applyDaltonismTheme(lightTheme, "tritanopia")
);
export const darkTritanopiaTheme = combineThemes(
  darkTheme,
  applyDaltonismTheme(darkTheme, "tritanopia")
);

/**
 * Aplica colores personalizados a un tema
 */
function applyCustomColors(
  theme: DefaultTheme,
  customColors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    accent?: string;
  }
): DefaultTheme {
  if (!customColors || Object.keys(customColors).length === 0) {
    return theme;
  }

  // Crear una copia del tema para no mutar el original
  const customTheme = { ...theme };
  customTheme.colors = { ...theme.colors };

  // Aplicar colores personalizados si están definidos
  if (customColors.primary) {
    customTheme.colors.primary = {
      ...theme.colors.primary,
      500: customColors.primary, // Color principal personalizado
    } as any;
  }

  if (customColors.secondary) {
    customTheme.colors.secondary = {
      ...theme.colors.secondary,
      500: customColors.secondary,
    } as any;
  }

  if (customColors.background) {
    customTheme.colors.background = {
      ...theme.colors.background,
      primary: customColors.background,
      surface: customColors.background,
    } as any;
  }

  if (customColors.text) {
    customTheme.colors.text = {
      ...theme.colors.text,
      primary: customColors.text,
    } as any;
  }

  if (customColors.accent) {
    customTheme.colors.tertiary = {
      ...theme.colors.tertiary,
      500: customColors.accent,
    } as any;
  }

  return customTheme;
}

/**
 * Obtiene el tema combinado según la configuración
 * Con validación y fallback seguro para evitar crashes
 * Soporta colores personalizados opcionales
 */
export function getCombinedTheme(
  baseTheme: "light" | "dark",
  accessibilityTheme:
    | "default"
    | "high-contrast"
    | "protanopia"
    | "deuteranopia"
    | "tritanopia",
  customColors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    accent?: string;
  }
): DefaultTheme {
  try {
    // Validar parámetros
    const validBaseThemes = ["light", "dark"];
    const validAccessibilityThemes = [
      "default",
      "high-contrast",
      "protanopia",
      "deuteranopia",
      "tritanopia",
    ];

    const safeBaseTheme = validBaseThemes.includes(baseTheme)
      ? baseTheme
      : "light";
    const safeAccessibilityTheme = validAccessibilityThemes.includes(
      accessibilityTheme
    )
      ? accessibilityTheme
      : "default";

    let theme: DefaultTheme;

    switch (safeBaseTheme) {
      case "light":
        switch (safeAccessibilityTheme) {
          case "default":
            theme = lightTheme;
            break;
          case "high-contrast":
            theme = lightHighContrastTheme;
            break;
          case "protanopia":
            theme = lightProtanopiaTheme;
            break;
          case "deuteranopia":
            theme = lightDeuteranopiaTheme;
            break;
          case "tritanopia":
            theme = lightTritanopiaTheme;
            break;
          default:
            theme = lightTheme;
        }
        break;
      case "dark":
        switch (safeAccessibilityTheme) {
          case "default":
            theme = darkTheme;
            break;
          case "high-contrast":
            theme = darkHighContrastTheme;
            break;
          case "protanopia":
            theme = darkProtanopiaTheme;
            break;
          case "deuteranopia":
            theme = darkDeuteranopiaTheme;
            break;
          case "tritanopia":
            theme = darkTritanopiaTheme;
            break;
          default:
            theme = darkTheme;
        }
        break;
      default:
        theme = lightTheme;
    }

    // Validar que el tema tenga todas las propiedades necesarias
    if (
      !theme ||
      !theme.colors ||
      !theme.typography ||
      !theme.colors.primary ||
      !theme.colors.background
    ) {
      console.error("Tema generado es inválido, usando lightTheme como fallback");
      return lightTheme;
    }

    // Aplicar colores personalizados si están definidos
    const finalTheme = applyCustomColors(theme, customColors);

    return finalTheme;
  } catch (error) {
    console.error("Error en getCombinedTheme:", error);
    // Siempre retornar un tema válido como último recurso
    return lightTheme;
  }
}
