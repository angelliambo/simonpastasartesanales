// Exportaciones centralizadas de todos los mixins
// Este archivo permite importar todos los componentes base desde un solo lugar

// Tipos centralizados
export * from "./types";

// Responsive y breakpoints
export * from "./responsive";

// Componentes base universales
export * from "./base";

// Tipografía
export * from "./typography";

// Botones
export * from "./buttons";

// Formularios
export * from "./forms";

// Tarjetas
export * from "./cards";

// Navegación
export * from "./navigation";

// Personalización
export * from "./personalization";

// Progreso
export * from "./progress";

// Helpers y utilidades
export * from "./helpers";

// Layouts de páginas
export * from "./page-layouts";

// Comunicación
export * from "./communication";

// Exportar breakpoints y media queries para uso directo
export { breakpoints, media } from "./responsive";

// Exportar mixins útiles para uso directo
export {
  centerContent,
  centerHorizontal,
  centerVertical,
  spaceBetween,
  spaceAround,
  spaceEvenly,
} from "./base";

export {
  textTruncate,
  textTruncateMultiline,
  textSelectable,
  textNotSelectable,
  textBreakWord,
  textBreakAll,
  textHyphens,
} from "./typography";

export { buttonLoading, buttonRipple, buttonGradient } from "./buttons";

export { inputWithIcon, inputWithButton } from "./forms";

export {
  cardGradient,
  cardPattern,
  cardAnimatedBorder,
  cardGlassmorphism,
  cardNeumorphism,
} from "./cards";
