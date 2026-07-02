import { DefaultTheme } from "styled-components";
import { gradients } from "../colors";

/**
 * TEMA ALTO CONTRASTE - Para usuarios con problemas de visión
 *
 * Este tema proporciona máximo contraste usando colores vibrantes
 * sobre fondos contrastantes para mejorar la legibilidad.
 *
 * Características:
 * - Máximo contraste entre texto y fondo
 * - Colores vibrantes para elementos importantes
 * - Fondos blancos con texto negro
 * - Bordes negros definidos
 *
 * Compatible con: light, dark
 */
export const highContrastTheme: Partial<DefaultTheme> = {
  colors: {
    // Alto contraste: colores vibrantes sobre fondos contrastantes
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
    // Gradientes para alto contraste
    gradients: {
      ...gradients,
      hero: "linear-gradient(135deg, #ffffff 0%, #000000 100%)", // Blanco → Negro para texto negro
    },
  } as any,
  // Tipografía mejorada para legibilidad
  typography: {
    fontWeight: {
      light: 400,
      normal: 500,
      medium: 600,
      semibold: 700,
      bold: 800,
    },
  } as any,
};
