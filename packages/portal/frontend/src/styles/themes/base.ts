import { DefaultTheme } from "styled-components";

/**
 * TEMA BASE - Configuración común para todos los temas
 *
 * Este archivo contiene la configuración base que se comparte entre todos los temas.
 * Incluye espaciado, bordes, sombras, breakpoints, tipografía base y z-index.
 *
 * Los colores específicos se definen en cada tema individual.
 */
export const baseTheme: Partial<DefaultTheme> = {
  spacing: {
    xs: "8px",
    sm: "13px",
    md: "21px",
    lg: "34px",
    xl: "55px",
    xxl: "89px",

    mobile: {
      xs: "4px",
      sm: "5px",
      md: "8px",
      lg: "13px",
      xl: "21px",
      xxl: "34px",
    },

    tablet: {
      xs: "5px",
      sm: "8px",
      md: "13px",
      lg: "21px",
      xl: "34px",
      xxl: "55px",
    },
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
    heavy: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      secondary: 'Georgia, "Times New Roman", Times, serif',
      mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "32px",
    },
    // Sistema de escalado de fuentes para accesibilidad
    fontScale: {
      normal: 0, // Tamaño base
      medium: 3, // +3px del tamaño base
      large: 6, // +6px del tamaño base
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
