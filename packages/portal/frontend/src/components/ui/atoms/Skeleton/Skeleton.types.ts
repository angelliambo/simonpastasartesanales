import React from "react";
import { AllSize } from "../shared";

// =====================================
// SKELETON COMPONENT TYPES
// =====================================

// Skeleton acepta tamaños del shared system
export type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Tipos de skeleton elements
export type SkeletonElementType = "rect" | "circle" | "text" | "avatar" | "button" | "input";

// Variantes de animación
export type SkeletonAnimation = "wave" | "pulse" | "none";

// Props principales del Skeleton
export interface SkeletonProps {
  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  
  // Apariencia
  active?: boolean; // Si está animado (default: true)
  animation?: SkeletonAnimation; // Tipo de animación
  
  // Dimensiones
  width?: number | string; // Ancho
  height?: number | string; // Alto
  round?: boolean; // Bordes redondeados
  
  // Elementos
  title?: boolean | { width?: number | string }; // Título placeholder
  paragraph?: boolean | { rows?: number; width?: number | string | Array<number | string> }; // Párrafos placeholder
  
  // Layout y estilos
  className?: string;
  style?: React.CSSProperties;
  
  // Props adicionales para accesibilidad
  accessibility?: {
    reducedMotion?: boolean;
    textToSpeech?: boolean;
    ariaLabel?: string;
  };
  
  // Props ARIA y semánticas
  "aria-label"?: string;
  "aria-busy"?: boolean;
  
  // Props adicionales
  id?: string;
}

// Props para Skeleton.Button
export interface SkeletonButtonProps extends Omit<SkeletonProps, "title" | "paragraph"> {
  size?: AllSize;
  block?: boolean;
}

// Props para Skeleton.Input
export interface SkeletonInputProps extends Omit<SkeletonProps, "title" | "paragraph"> {
  size?: AllSize;
  block?: boolean;
}

// Props para Skeleton.Avatar
export interface SkeletonAvatarProps extends Omit<SkeletonProps, "title" | "paragraph"> {
  size?: AllSize;
  shape?: "circle" | "square";
}

// Props para Skeleton.Image
export interface SkeletonImageProps extends Omit<SkeletonProps, "title" | "paragraph"> {
  size?: AllSize;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el container principal del Skeleton
export interface StyledSkeletonProps {
  $size?: SkeletonSize;
  $active?: boolean;
  $animation?: SkeletonAnimation;
  $width?: number | string;
  $height?: number | string;
  $round?: boolean;
  accessibility?: SkeletonProps["accessibility"];
}

// Props para elementos específicos
export interface SkeletonTitleProps {
  $size?: SkeletonSize;
  $width?: number | string;
  $active?: boolean;
  $animation?: SkeletonAnimation;
  accessibility?: SkeletonProps["accessibility"];
}

export interface SkeletonParagraphProps {
  $size?: SkeletonSize;
  $rows?: number;
  $widths?: Array<number | string>;
  $active?: boolean;
  $animation?: SkeletonAnimation;
  accessibility?: SkeletonProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Skeleton
export const SKELETON_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

// Animaciones soportadas
export const SKELETON_ANIMATIONS = ["wave", "pulse", "none"] as const;

// Props por defecto
export const SKELETON_DEFAULTS = {
  active: true,
  animation: "wave" as SkeletonAnimation,
  size: "md" as AllSize,
  round: false,
  title: true,
  paragraph: { rows: 3 },
} as const;

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a SkeletonSize
export const SIZE_MAPPING_SKELETON: { [_key in AllSize]?: SkeletonSize } = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xl",
};

// =====================================
// MENSAJES DE ACCESIBILIDAD
// =====================================

export const ACCESSIBILITY_MESSAGES = {
  es: {
    loading: "Cargando contenido",
    placeholder: "Placeholder de contenido",
  },
  en: {
    loading: "Loading content",
    placeholder: "Content placeholder",
  },
} as const;

