import React from "react";
import { AllSize } from "../shared";

// =====================================
// EMPTY COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Empty acepta tamaños del shared system
export type EmptySize = "sm" | "md" | "lg";

// Props principales del Empty
export interface EmptyProps {
  // Descripción
  description?: React.ReactNode;
  
  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  
  // Imagen
  image?: React.ReactNode | "default" | "simple";
  imageStyle?: React.CSSProperties;
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  
  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** ID único del componente (opcional) - se concatena con "empty-" */
  id?: string;
}

// Props para styled components internos
export interface StyledEmptyProps {
  $size?: EmptySize;
  accessibility?: EmptyProps["accessibility"];
}

// Preset images (compatible con Ant Design)
export const EMPTY_IMAGE_SIMPLE = "simple";
export const EMPTY_IMAGE_DEFAULT = "default";

// Default values
export const EMPTY_DEFAULTS = {
  size: "md" as EmptySize,
  image: "default" as const,
  description: "No hay datos",
};

// Mapeo de tamaños del shared system
export const SIZE_MAPPING_EMPTY: Record<string, EmptySize> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
  xxl: "lg",
  xxxl: "lg",
};

