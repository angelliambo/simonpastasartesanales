import { DefaultTheme } from "styled-components";
import { colorScales, grayScale } from "../colors";

/**
 * TEMA TRITANOPIA - Para usuarios con dificultad para distinguir azules
 *
 * La tritanopia es un tipo de daltonismo donde los usuarios tienen dificultad
 * para distinguir entre azules y amarillos. Este tema ajusta los colores usando
 * la paleta centralizada para mejorar la distinción.
 *
 * Cambios principales:
 * - Reduce el uso de azules puros
 * - Aumenta el contraste en elementos que dependen del color azul
 * - Usa rosas y verdes como colores de acento alternativos
 *
 * Compatible con: light, dark
 */
export const tritanopiaTheme: Partial<DefaultTheme> = {
  colors: {
    // Usar escala de rosa para colores primarios
    primary: {
      50: colorScales.pink[10],
      100: colorScales.pink[20],
      200: colorScales.pink[30],
      300: colorScales.pink[40],
      400: colorScales.pink[50],
      500: colorScales.pink[60],
      600: colorScales.pink[70],
      700: colorScales.pink[80],
      800: colorScales.pink[90],
      900: colorScales.pink[100],
    },
    // Usar escala de verde para colores secundarios
    secondary: {
      50: colorScales.green[10],
      100: colorScales.green[20],
      200: colorScales.green[30],
      300: colorScales.green[40],
      400: colorScales.green[50],
      500: colorScales.green[60],
      600: colorScales.green[70],
      700: colorScales.green[80],
      800: colorScales.green[90],
      900: colorScales.green[100],
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
    // Colores semánticos ajustados para tritanopia
    success: {
      50: colorScales.emerald[10],
      500: colorScales.emerald[60],
      600: colorScales.emerald[70],
      700: colorScales.emerald[80],
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
      50: colorScales.indigo[10],
      500: colorScales.indigo[60],
      600: colorScales.indigo[70],
      700: colorScales.indigo[80],
    },
    // Fondos optimizados para tritanopia
    background: {
      primary: grayScale[0], // Blanco
      secondary: grayScale[5],
      tertiary: grayScale[10],
      surface: grayScale[0],
      card: grayScale[0],
    },
    // Textos optimizados para tritanopia - usar colores de la paleta para mejor visibilidad
    text: {
      // Usar rosa oscuro para texto primary (paleta de tritanopia)
      primary: colorScales.pink[80], // Rosa oscuro visible para tritanopia
      // Usar rosa medio para texto secondary
      secondary: colorScales.pink[70], // Rosa medio legible
      // Usar rosa claro para texto tertiary
      tertiary: colorScales.pink[60], // Rosa medio-claro
      inverse: grayScale[0], // Blanco para fondos oscuros
    },
    // Bordes mejorados para mejor visibilidad
    border: {
      light: colorScales.pink[20],
      normal: colorScales.pink[30],
      dark: colorScales.pink[40],
    },
  } as any,
};
