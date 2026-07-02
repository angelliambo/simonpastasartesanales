import { DefaultTheme } from "styled-components";
import { colorScales, grayScale } from "../colors";

/**
 * TEMA PROTANOPIA - Para usuarios con dificultad para distinguir rojos
 *
 * La protanopia es un tipo de daltonismo donde los usuarios tienen dificultad
 * para distinguir entre rojos y verdes. Este tema ajusta los colores usando
 * la paleta centralizada para mejorar la distinción.
 *
 * Cambios principales:
 * - Reduce el uso de rojos puros
 * - Aumenta el contraste en elementos que dependen del color rojo
 * - Usa azules y amarillos como colores de acento alternativos
 *
 * Compatible con: light, dark
 */
export const protanopiaTheme: Partial<DefaultTheme> = {
  colors: {
    // Usar escala de azul para colores primarios
    primary: {
      50: colorScales.blue[10],
      100: colorScales.blue[20],
      200: colorScales.blue[30],
      300: colorScales.blue[40],
      400: colorScales.blue[50],
      500: colorScales.blue[60],
      600: colorScales.blue[70],
      700: colorScales.blue[80],
      800: colorScales.blue[90],
      900: colorScales.blue[100],
    },
    // Usar escala de amarillo para colores secundarios
    secondary: {
      50: colorScales.yellow[10],
      100: colorScales.yellow[20],
      200: colorScales.yellow[30],
      300: colorScales.yellow[40],
      400: colorScales.yellow[50],
      500: colorScales.yellow[60],
      600: colorScales.yellow[70],
      700: colorScales.yellow[80],
      800: colorScales.yellow[90],
      900: colorScales.yellow[100],
    },
    // Usar escala de púrpura para colores terciarios
    tertiary: {
      50: colorScales.purple[10],
      100: colorScales.purple[20],
      200: colorScales.purple[30],
      300: colorScales.purple[40],
      400: colorScales.purple[50],
      500: colorScales.purple[60],
      600: colorScales.purple[70],
      700: colorScales.purple[80],
      800: colorScales.purple[90],
      900: colorScales.purple[100],
    },
    // Colores semánticos ajustados para protanopia
    success: {
      50: colorScales.green[10],
      500: colorScales.green[60],
      600: colorScales.green[70],
      700: colorScales.green[80],
    },
    warning: {
      50: colorScales.yellow[10],
      500: colorScales.yellow[60],
      600: colorScales.yellow[70],
      700: colorScales.yellow[80],
    },
    error: {
      50: colorScales.red[10],
      500: colorScales.red[60],
      600: colorScales.red[70],
      700: colorScales.red[80],
    },
    info: {
      50: colorScales.blue[10],
      500: colorScales.blue[60],
      600: colorScales.blue[70],
      700: colorScales.blue[80],
    },
    // Fondos optimizados para protanopia
    background: {
      primary: grayScale[0], // Blanco
      secondary: grayScale[5],
      tertiary: grayScale[10],
      surface: grayScale[0],
      card: grayScale[0],
    },
    // Textos optimizados para protanopia - usar colores de la paleta para mejor visibilidad
    text: {
      // Usar azul oscuro para texto primary (paleta de protanopia)
      primary: colorScales.blue[80], // Azul oscuro visible para protanopia
      // Usar azul medio para texto secondary
      secondary: colorScales.blue[70], // Azul medio legible
      // Usar azul claro para texto tertiary
      tertiary: colorScales.blue[60], // Azul medio-claro
      inverse: grayScale[0], // Blanco para fondos oscuros
    },
    // Bordes mejorados para mejor visibilidad
    border: {
      light: colorScales.blue[20],
      normal: colorScales.blue[30],
      dark: colorScales.blue[40],
    },
  } as any,
};
