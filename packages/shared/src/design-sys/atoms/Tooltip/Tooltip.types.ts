import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// TOOLTIP COMPONENT TYPES - ANTD COMPATIBLE  
// =====================================

// Posiciones del tooltip (compatible con Ant Design)
export type TooltipPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

// Triggers del tooltip (compatible con Ant Design)
export type TooltipTrigger = "hover" | "focus" | "click" | "contextMenu";

// Tooltip acepta tamaños del shared system
export type TooltipSize = "xs" | "sm" | "md" | "lg"; // Subset de AllSize para Tooltip

// Tooltip acepta variantes del shared system
export type TooltipVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"  
  | "error"
  | "info"
  | "inverse"
  | "light"
  | "dark";

// Props principales del Tooltip
export interface TooltipProps {
  // Contenido y target
  children: React.ReactElement; // Elemento que dispara el tooltip
  title?: React.ReactNode; // Contenido del tooltip
  
  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático
  
  // Positioning y comportamiento
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger | TooltipTrigger[];
  visible?: boolean; // Controlled visibility
  defaultVisible?: boolean; // Uncontrolled default
  
  // Timing y delays
  mouseEnterDelay?: number; // ms para mostrar en hover
  mouseLeaveDelay?: number; // ms para ocultar en hover
  
  // Styling y arrow
  showArrow?: boolean;
  arrowPointAtCenter?: boolean;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  
  // Layout y contenedor
  getPopupContainer?: () => HTMLElement;
  zIndex?: number;
  
  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    textToSpeech?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
    focusRing?: boolean;
    largeText?: boolean; // Añadir largeText para consistencia
  };
  
  // Callbacks
  onVisibleChange?: (visible: boolean) => void;
  
  // Props ARIA y semánticas
  id?: string;
  role?: string;
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  
  // Props adicionales para casos específicos
  destroyTooltipOnHide?: boolean; // Performance optimization
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el overlay del tooltip
export interface TooltipOverlayProps {
  $placement?: TooltipPlacement;
  $size?: TooltipSize; // Tamaño mapeado
  $variant?: TooltipVariant; // Variante mapeada
  $visible?: boolean;
  accessibility?: TooltipProps["accessibility"];
  zIndex?: number;
}

// Props para el contenido del tooltip
export interface TooltipContentProps {
  $size?: TooltipSize;
  $variant?: TooltipVariant;
  accessibility?: TooltipProps["accessibility"];
}

// Props para la arrow del tooltip
export interface TooltipArrowProps {
  $placement?: TooltipPlacement;
  $size?: TooltipSize;
  $variant?: TooltipVariant;
  accessibility?: TooltipProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Tooltip (subset de AllSize)
export const TOOLTIP_SIZES = ["xs", "sm", "md", "lg"] as const;

// Variantes soportadas por Tooltip (subset de AllVariant)
export const TOOLTIP_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
  "inverse",
  "light",
  "dark",
] as const;

// Props por defecto optimizadas
export const TOOLTIP_DEFAULTS = {
  placement: "top" as TooltipPlacement,
  trigger: "hover" as TooltipTrigger,
  size: "md" as AllSize,
  variant: "dark" as AllVariant,
  showArrow: true,
  arrowPointAtCenter: false,
  mouseEnterDelay: 100, // ms
  mouseLeaveDelay: 100, // ms
  zIndex: 1060,
  destroyTooltipOnHide: false,
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para casos donde Tooltip se usa con confirmation
export interface TooltipConfirmProps extends TooltipProps {
  confirmTitle?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
}

// Para casos donde Tooltip muestra info compleja
export interface TooltipInfoProps extends TooltipProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
}

// Para casos de Tooltip con loading
export interface TooltipLoadingProps extends TooltipProps {
  loading?: boolean;
  loadingText?: string;
}

// =====================================
// POSITIONING TYPES
// =====================================

// Configuración de posicionamiento
export interface TooltipPositioning {
  x: number;
  y: number;
  placement: TooltipPlacement;
  arrowX?: number;
  arrowY?: number;
}

// Offset configuration
export interface TooltipOffset {
  main: number; // Offset perpendicular al elemento
  cross: number; // Offset paralelo al elemento
}

// =====================================
// ANIMATION TYPES
// =====================================

// Estados para animaciones
export type TooltipState = "hidden" | "showing" | "visible" | "hiding";

// Configuración de animaciones
export interface TooltipAnimationConfig {
  duration?: number; // Duración en ms
  easing?: string; // CSS easing function
  reducedMotion?: boolean; // Desactivar animaciones
}

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a TooltipSize (algunos tamaños válidos)
export const SIZE_MAPPING_TOOLTIP: { [_key in AllSize]?: TooltipSize } = {
  xs: "xs", // xs → xs
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
};

// Mapeo de AllVariant a TooltipVariant (subset específico)
export const VARIANT_MAPPING_TOOLTIP: { [_key in AllVariant]?: TooltipVariant } = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "secondary", // tertiary → secondary
  inverse: "inverse",
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  ghost: "light", // ghost → light
  link: "primary", // link → primary
  // Legacy mappings
  danger: "error", // danger → error
  confirm: "success", // confirm → success
  default: "dark", // default → dark (estilo tooltip clásico)
};

// Offset por defecto según placement
export const DEFAULT_OFFSETS: { [_key in TooltipPlacement]: TooltipOffset } = {
  top: { main: 8, cross: 0 },
  topLeft: { main: 8, cross: 0 },
  topRight: { main: 8, cross: 0 },
  bottom: { main: 8, cross: 0 },
  bottomLeft: { main: 8, cross: 0 },
  bottomRight: { main: 8, cross: 0 },
  left: { main: 8, cross: 0 },
  leftTop: { main: 8, cross: 0 },
  leftBottom: { main: 8, cross: 0 },
  right: { main: 8, cross: 0 },
  rightTop: { main: 8, cross: 0 },
  rightBottom: { main: 8, cross: 0 },
};
