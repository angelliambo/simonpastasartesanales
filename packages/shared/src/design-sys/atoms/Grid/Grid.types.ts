import React from "react";
import { AllSize, SpacingProps } from "../shared";

// =====================================
// GRID SYSTEM TYPES - ANTD COMPATIBLE
// =====================================

// Tipo base para span de columnas (sistema de 24 como Ant Design)
export type ColSpan = 
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

// Breakpoints responsivos (mismos nombres que Ant Design)
export interface ResponsiveBreakpoints {
  xs?: ColSpan; // ≥0px
  sm?: ColSpan; // ≥576px
  md?: ColSpan; // ≥768px
  lg?: ColSpan; // ≥992px
  xl?: ColSpan; // ≥1200px
  xxl?: ColSpan; // ≥1600px
}

// Props para Row (container principal)
export interface RowProps extends SpacingProps {
  children: React.ReactNode;
  
  // 🎯 USANDO SHARED SYSTEMS
  gutter?: AllSize | number | [AllSize | number, AllSize | number]; // [horizontal, vertical] o single value
  
  // Propiedades específicas de Row
  align?: "top" | "middle" | "bottom" | "stretch";
  justify?: 
    | "start" 
    | "end" 
    | "center" 
    | "space-around" 
    | "space-between" 
    | "space-evenly";
  
  // Wrapping
  wrap?: boolean;
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  
  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
  };
  
  // Props ARIA
  "aria-label"?: string;
  role?: string;
}

// Props para Col (columna individual)
export interface ColProps extends SpacingProps {
  children: React.ReactNode;
  
  // 🎯 SISTEMA 24 COLUMNAS + RESPONSIVE
  span?: ColSpan; // Ancho principal (1-24)
  offset?: ColSpan; // Offset izquierdo (0-23)
  order?: number; // Orden flexbox
  pull?: ColSpan; // Pull derecha (position relative)
  push?: ColSpan; // Push izquierda (position relative)
  
  // 🎯 RESPONSIVE BREAKPOINTS (como Ant Design)
  xs?: ColSpan | ResponsiveColConfig;
  sm?: ColSpan | ResponsiveColConfig;
  md?: ColSpan | ResponsiveColConfig;
  lg?: ColSpan | ResponsiveColConfig;
  xl?: ColSpan | ResponsiveColConfig;
  xxl?: ColSpan | ResponsiveColConfig;
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  
  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    focusRing?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
  };
  
  // Props ARIA
  "aria-label"?: string;
  role?: string;
  /** ID único del componente (opcional) - se concatena con "col-" */
  id?: string;
}

// Config avanzada para responsive (como Ant Design)
export interface ResponsiveColConfig {
  span?: ColSpan;
  offset?: ColSpan;
  order?: number;
  pull?: ColSpan;
  push?: ColSpan;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para styled Row
export interface StyledRowProps {
  $gutter?: [number, number]; // [horizontal, vertical] en pixels
  $align?: RowProps["align"];
  $justify?: RowProps["justify"];
  $wrap?: boolean;
  accessibility?: RowProps["accessibility"];
}

// Props para styled Col
export interface StyledColProps {
  $span?: ColSpan;
  $offset?: ColSpan;
  $order?: number;
  $pull?: ColSpan;
  $push?: ColSpan;
  $gutter?: [number, number]; // Heredado del Row
  
  // Responsive props mapeadas
  $xs?: ResponsiveColConfig;
  $sm?: ResponsiveColConfig;
  $md?: ResponsiveColConfig;
  $lg?: ResponsiveColConfig;
  $xl?: ResponsiveColConfig;
  $xxl?: ResponsiveColConfig;
  
  accessibility?: ColProps["accessibility"];
}

// =====================================
// UTILITY TYPES Y CONSTANTES
// =====================================

// Breakpoints (compatibles con tema)
export const GRID_BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export type BreakpointKey = keyof typeof GRID_BREAKPOINTS;

// Constantes del grid
export const GRID_COLUMNS = 24; // Sistema de 24 columnas como Ant Design
export const DEFAULT_GUTTER: [number, number] = [0, 0]; // Sin gutter por defecto

// Props por defecto optimizadas
export const ROW_DEFAULTS = {
  gutter: "md" as AllSize,
  align: "top" as const,
  justify: "start" as const,
  wrap: true,
} as const;

export const COL_DEFAULTS = {
  span: 24 as ColSpan, // Full width por defecto
  offset: 0 as ColSpan,
  order: 0,
} as const;

// =====================================
// HELPER TYPES
// =====================================

// Para casos donde Grid se usa como layout container
export interface GridContainerProps extends RowProps {
  container?: boolean; // Marca como container principal
  fluid?: boolean; // Sin max-width
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | string;
}

// Para casos específicos de layout
export interface AutoColProps extends Omit<ColProps, "span"> {
  auto?: boolean; // Ancho automático basado en contenido
  flex?: string | number; // Valor flex CSS
}

// Tipos para grid helpers
export interface GridHelpers {
  getColWidth: (span: ColSpan, total?: number) => string;
  getGutterValue: (gutter: AllSize | [AllSize, AllSize]) => [number, number];
  generateResponsiveStyles: (breakpoints: ResponsiveBreakpoints) => string;
}
