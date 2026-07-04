import React from "react";

// Tipos para las props del componente Card
export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "default" | "elevated" | "outlined" | "filled" | "glass";

  // Soporte para ambos sistemas de tamaños (compatibilidad)
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";

  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  // Interactividad y accesibilidad
  interactive?: boolean;
  selected?: boolean;
  role?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;

  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };

  // Props para header (de ui/Card.tsx)
  icon?: React.ReactNode;
  extra?: React.ReactNode; // Contenido adicional en el header (compatible con antd)

  // Props heredadas para compatibilidad
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /** ID único del componente (opcional) - se concatena con prefijo "card-" */
  id?: string;
}

// Props para styled components internos
export interface StyledCardProps extends CardProps {
  $variant?: CardProps["variant"];
  $size?: "xs" | "sm" | "md" | "lg" | "xl"; // Solo tamaños normalizados
  $interactive?: boolean;
  $selected?: boolean;
}

// Props para componentes de header
export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  size?: CardProps["size"];
}

// Mapeo de tamaños para compatibilidad
export type SizeMapping = {
  [key: string]: string;
};

export const SIZE_MAPPING: SizeMapping = {
  // Tamaños nuevos
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",

  // Tamaños legacy -> nuevos
  small: "sm",
  medium: "md",
  large: "lg",
};
