import { DefaultTheme } from "styled-components";
import { colorScales, grayScale } from "../colors";

/**
 * TEMA DEUTERANOPIA - Para usuarios con dificultad para distinguir verdes
 *
 * La deuteranopia es un tipo de daltonismo donde los usuarios tienen dificultad
 * para distinguir entre verdes y rojos. Este tema ajusta los colores usando
 * la paleta centralizada para mejorar la distinción.
 *
 * Cambios principales:
 * - Reduce el uso de verdes puros
 * - Aumenta el contraste en elementos que dependen del color verde
 * - Usa naranjas y azules como colores de acento alternativos
 *
 * Compatible con: light, dark
 */
export const deuteranopiaTheme: Partial<DefaultTheme> = {
  colors: {
    // Usar escala de naranja para colores primarios
    primary: {
      50: colorScales.orange[10],
      100: colorScales.orange[20],
      200: colorScales.orange[30],
      300: colorScales.orange[40],
      400: colorScales.orange[50],
      500: colorScales.orange[60],
      600: colorScales.orange[70],
      700: colorScales.orange[80],
      800: colorScales.orange[90],
      900: colorScales.orange[100],
    },
    // Usar escala de azul para colores secundarios
    secondary: {
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
    // Usar escala de rosa para colores terciarios
    tertiary: {
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
    // Colores semánticos ajustados para deuteranopia
    success: {
      50: colorScales.emerald[10],
      500: colorScales.emerald[60],
      600: colorScales.emerald[70],
      700: colorScales.emerald[80],
    },
    warning: {
      50: colorScales.orange[10],
      500: colorScales.orange[60],
      600: colorScales.orange[70],
      700: colorScales.orange[80],
    },
    error: {
      50: colorScales.red[10],
      500: colorScales.red[60],
      600: colorScales.red[70],
      700: colorScales.red[80],
    },
    info: {
      50: colorScales.cyan[10],
      500: colorScales.cyan[60],
      600: colorScales.cyan[70],
      700: colorScales.cyan[80],
    },
    // Fondos optimizados para deuteranopia
    background: {
      primary: grayScale[0], // Blanco
      secondary: grayScale[5],
      tertiary: grayScale[10],
      surface: grayScale[0],
      card: grayScale[0],
    },
    // Textos optimizados para deuteranopia - usar colores de la paleta para mejor visibilidad
    text: {
      // Usar naranja oscuro para texto primary (paleta de deuteranopia)
      primary: colorScales.orange[80], // Naranja oscuro visible para deuteranopia
      // Usar naranja medio para texto secondary
      secondary: colorScales.orange[70], // Naranja medio legible
      // Usar naranja claro para texto tertiary
      tertiary: colorScales.orange[60], // Naranja medio-claro
      inverse: grayScale[0], // Blanco para fondos oscuros
    },
    // Bordes mejorados para mejor visibilidad
    border: {
      light: colorScales.orange[20],
      normal: colorScales.orange[30],
      dark: colorScales.orange[40],
    },
  } as any,
};
