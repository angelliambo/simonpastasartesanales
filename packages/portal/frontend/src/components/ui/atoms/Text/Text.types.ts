import React from "react";

// Tipos para las props del componente Text
export interface TextProps {
  children: React.ReactNode;

  // Variantes tipográficas (combinadas de todas las versiones)
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "body1"
    | "body2"
    | "caption"
    | "overline";

  // Colores (expandidos combinando todas las versiones)
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "inverse"
    | "success"
    | "warning"
    | "error"
    | "info";

  // Propiedades de estilo
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right" | "justify";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  lineHeight?: "tight" | "normal" | "relaxed";

  // Props adicionales de la versión typography/
  intensity?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fullWidth?: boolean;
  truncate?: boolean;

  // Modificadores de texto
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;

  // Estilos semánticos (de typography/)
  strong?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  delete?: boolean;

  // Estados
  disabled?: boolean;

  // Layout
  margin?: string | number;
  padding?: string | number;

  // Interactividad
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** ID único del componente (opcional) - se concatena con "text-" */
  id?: string;

  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    dyslexiaSupport?: boolean;
    reducedMotion?: boolean;
    fontSizeMultiplier?: number;
    textToSpeech?: boolean;
  };

  // Props ARIA
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;

  // Props específicas (de typography/)
  copyable?: boolean;
  editable?: boolean;
  ellipsis?: boolean | { rows?: number; expandable?: boolean };
}

// Props para styled components internos
export interface StyledTextProps {
  $variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  $color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "inverse"
    | "success"
    | "warning"
    | "error"
    | "info";
  $weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  $align?: "left" | "center" | "right" | "justify";
  $size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  $lineHeight?: "tight" | "normal" | "relaxed";
  $fullWidth?: boolean;
  $truncate?: boolean;
  $uppercase?: boolean;
  $lowercase?: boolean;
  $capitalize?: boolean;
  $italic?: boolean;
  $underline?: boolean;
  $strikethrough?: boolean;
  $strong?: boolean;
  $disabled?: boolean;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    dyslexiaSupport?: boolean;
    reducedMotion?: boolean;
    fontSizeMultiplier?: number;
    textToSpeech?: boolean;
  };
  intensity?: string;
}

// Props para componentes de utilidad
export interface TextUtilityProps {
  size?: TextProps["size"];
  variant?: TextProps["variant"];
  accessibility?: TextProps["accessibility"];
}

// Mapeo de variantes para compatibilidad
export type VariantMapping = {
  [key: string]: string;
};

export const VARIANT_MAPPING: VariantMapping = {
  // Variantes estándar
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "body1",
  body2: "body2",
  caption: "caption",
  overline: "overline",

  // Variantes alternativas → estándar
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
};

// Mapeo de componentes HTML por variante
export const HTML_ELEMENT_MAP: {
  [key: string]: keyof React.JSX.IntrinsicElements;
} = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
  body1: "span", // Cambiado de "p" a "span" para evitar anidación
  body2: "span", // Cambiado de "p" a "span" para evitar anidación
  caption: "span",
  overline: "span",
};

// Tipos de peso de fuente
export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;
