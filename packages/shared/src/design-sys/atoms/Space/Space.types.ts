import React from "react";
import { AllSize, AllSpacing, SpacingProps } from "../shared";

// =====================================
// SPACE COMPONENT TYPES
// =====================================

export interface SpaceProps extends SpacingProps {
  children: React.ReactNode;

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize | AllSpacing; // Usa sistema unificado de spacing

  // Propiedades específicas de Space
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

  // Wrapping y distribución
  wrap?: boolean;
  split?: React.ReactNode; // Divisor entre elementos

  // Responsive behavior
  responsive?: {
    xs?: AllSize;
    sm?: AllSize;
    md?: AllSize;
    lg?: AllSize;
    xl?: AllSize;
  };

  // Layout
  className?: string;
  style?: React.CSSProperties;

  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
  };

  // Props ARIA para casos específicos
  "aria-label"?: string;
  role?: string;
  /** ID único del componente (opcional) - se concatena con "space-" */
  id?: string;
}

// Props para styled components internos
export interface StyledSpaceProps {
  $direction?: "horizontal" | "vertical";
  $align?: SpaceProps["align"];
  $justify?: SpaceProps["justify"];
  $wrap?: boolean;
  $gap?: number | string;
  $responsive?: SpaceProps["responsive"];
  accessibility?: SpaceProps["accessibility"];
}

// Props para elementos individuales del Space
export interface SpaceItemProps {
  $isLast?: boolean;
  $hasSplit?: boolean;
  accessibility?: SpaceProps["accessibility"];
}

// =====================================
// MAPEO ESPECÍFICO PARA SPACE
// =====================================

// Space acepta todos los tamaños de spacing
export const SPACE_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export type SpaceSize = (typeof SPACE_SIZES)[number];

// =====================================
// UTILITY TYPES
// =====================================

// Para casos donde Space se usa como layout container
export interface SpaceLayoutProps extends SpaceProps {
  as?: keyof React.JSX.IntrinsicElements;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

// Para casos específicos de listas con separadores
export interface SpaceListProps extends SpaceProps {
  items?: React.ReactNode[];
  renderItem?: (item: React.ReactNode, index: number) => React.ReactNode;
}

// =====================================
// CONSTANTES
// =====================================

// Valores por defecto optimizados
export const SPACE_DEFAULTS = {
  size: "md" as AllSize,
  direction: "horizontal" as const,
  align: "center" as const,
  justify: "start" as const,
  wrap: false,
} as const;
