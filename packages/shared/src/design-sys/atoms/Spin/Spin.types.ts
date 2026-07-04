import React from "react";
import { AllSize } from "../shared";

// =====================================
// SPIN COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Spin acepta tamaños del shared system
export type SpinSize = "xs" | "sm" | "md" | "lg" | "xl"; // Subset de AllSize para Spin

// Tipos de indicadores de loading
export type SpinIndicator = "spinner" | "dots" | "bars" | "pulse" | "bounce";

// Props principales del Spin
export interface SpinProps {
  // Control de estado
  spinning?: boolean; // Si está girando

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático

  // Apariencia
  indicator?: SpinIndicator; // Tipo de indicador
  tip?: React.ReactNode; // Texto debajo del spinner

  // Overlay mode
  wrapperClassName?: string; // Clase para el wrapper

  // Contenido envuelto (cuando se usa como overlay)
  children?: React.ReactNode;

  // Delays y timing
  delay?: number; // Delay antes de mostrar (ms)

  // Layout y estilos
  className?: string;
  style?: React.CSSProperties;

  // Props adicionales para accesibilidad
  accessibility?: {
    reducedMotion?: boolean;
    textToSpeech?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
    largeText?: boolean; // Añadir largeText para consistencia
    ariaLabel?: string;
  };

  // Props ARIA y semánticas
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string; // Default: "status"
  "aria-live"?: "polite" | "assertive" | "off"; // Default: "polite"

  // Props adicionales
  id?: string;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el container principal del Spin
export interface StyledSpinProps {
  $spinning?: boolean;
  $size?: SpinSize; // Tamaño mapeado
  $indicator?: SpinIndicator;
  $hasChildren?: boolean; // Si envuelve contenido
  accessibility?: SpinProps["accessibility"];
}

// Props para el indicador específico
export interface SpinIndicatorProps {
  $size?: SpinSize;
  $indicator?: SpinIndicator;
  accessibility?: SpinProps["accessibility"];
}

// Props para el overlay (cuando envuelve contenido)
export interface SpinOverlayProps {
  $spinning?: boolean;
  accessibility?: SpinProps["accessibility"];
}

// Props para el contenido envuelto
export interface SpinContentProps {
  $spinning?: boolean;
  accessibility?: SpinProps["accessibility"];
}

// Props para el tip text
export interface SpinTipProps {
  $size?: SpinSize;
  accessibility?: SpinProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Spin (subset de AllSize)
export const SPIN_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

// Indicadores soportados
export const SPIN_INDICATORS = [
  "spinner",
  "dots",
  "bars",
  "pulse",
  "bounce",
] as const;

// Props por defecto optimizadas
export const SPIN_DEFAULTS = {
  spinning: true,
  size: "md" as AllSize,
  indicator: "spinner" as SpinIndicator,
  delay: 0,
  role: "status",
  "aria-live": "polite" as const,
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para casos donde Spin se usa con contenido específico
export interface SpinWithContentProps extends SpinProps {
  loadingText?: string;
  emptyText?: string;
}

// Para casos donde Spin necesita control fino
export interface SpinControlledProps extends SpinProps {
  onSpinStart?: () => void;
  onSpinEnd?: () => void;
  duration?: number; // Duración mínima antes de poder ocultar
}

// Para casos de Spin en botones
export interface SpinButtonProps extends SpinProps {
  position?: "left" | "right" | "center";
}

// =====================================
// ANIMATION TYPES
// =====================================

// Estados para animaciones
export type SpinState = "idle" | "spinning" | "delayed" | "stopping";

// Configuración de animaciones por tipo
export interface SpinAnimationConfig {
  duration?: string; // Duración CSS (ej: "1s", "0.8s")
  easing?: string; // CSS timing function
  iterationCount?: string; // CSS iteration count
  reducedMotion?: boolean;
}

// Configuraciones por tipo de indicador
export const ANIMATION_CONFIGS: {
  [_key in SpinIndicator]: SpinAnimationConfig;
} = {
  spinner: { duration: "1s", easing: "linear", iterationCount: "infinite" },
  dots: { duration: "1.4s", easing: "ease-in-out", iterationCount: "infinite" },
  bars: { duration: "1.2s", easing: "ease-in-out", iterationCount: "infinite" },
  pulse: { duration: "2s", easing: "ease-in-out", iterationCount: "infinite" },
  bounce: {
    duration: "1.6s",
    easing: "ease-in-out",
    iterationCount: "infinite",
  },
};

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a SpinSize (todos los tamaños válidos)
export const SIZE_MAPPING_SPIN: { [_key in AllSize]?: SpinSize } = {
  xs: "xs", // xs → xs
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "xl", // xl → xl
  xxl: "xl", // xxl → xl (máximo)
};

// =====================================
// MENSAJES POR DEFECTO
// =====================================

// Mensajes de accesibilidad por idioma
export const ACCESSIBILITY_MESSAGES = {
  es: {
    loading: "Cargando",
    processingData: "Procesando datos",
    pleaseWait: "Por favor, espere",
  },
  en: {
    loading: "Loading",
    processingData: "Processing data",
    pleaseWait: "Please wait",
  },
} as const;
