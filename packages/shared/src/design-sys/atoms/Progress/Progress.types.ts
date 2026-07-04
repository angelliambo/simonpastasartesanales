import React from "react";
import { AllSize } from "../shared";

// =====================================
// PROGRESS COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Progress acepta tamaños del shared system
export type ProgressSize = "sm" | "md" | "lg";

// Props principales del Progress
export interface ProgressProps {
  // Valor del progreso (0-100)
  percent?: number;
  
  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  
  // Estados visuales
  status?: "normal" | "success" | "exception" | "active";
  
  // Configuración
  showInfo?: boolean; // Mostrar porcentaje
  format?: (percent?: number) => React.ReactNode;
  strokeColor?: string | string[]; // Color de la barra
  strokeWidth?: number; // Grosor de la barra
  trailColor?: string; // Color de fondo
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  
  // Accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  
  // Tipos de progress
  type?: "line" | "circle" | "dashboard";
  
  // Solo para circle/dashboard
  width?: number; // Ancho del círculo en px
  gapDegree?: number; // Grado de gap (0-295) para dashboard type
  gapPosition?: "top" | "bottom" | "left" | "right";
  
  // Steps mode
  steps?: number; // Número de pasos para tipo steps
  
  /** ID único del componente (opcional) - se concatena con "progress-" */
  id?: string;
}

// Props para styled components internos
export interface StyledProgressProps {
  $size?: ProgressSize;
  $status?: ProgressProps["status"];
  $type?: ProgressProps["type"];
  accessibility?: ProgressProps["accessibility"];
}

// Default values
export const PROGRESS_DEFAULTS = {
  size: "md" as ProgressSize,
  percent: 0,
  status: "normal" as const,
  showInfo: true,
  type: "line" as const,
  strokeWidth: 8,
};

// Mapeo de tamaños del shared system
export const SIZE_MAPPING_PROGRESS: Record<string, ProgressSize> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
  xxl: "lg",
  xxxl: "lg",
};

