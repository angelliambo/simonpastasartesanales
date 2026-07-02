import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// ALERT COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Alert acepta tamaños del shared system
export type AlertSize = "sm" | "md" | "lg"; // Subset de AllSize para Alert

// Alert acepta variantes del shared system
export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// Tipos de Alert según su propósito
export type AlertType = "success" | "info" | "warning" | "error";

// Estilos visuales del Alert
export type AlertStyle = "filled" | "outlined" | "soft" | "minimal";

// Props principales del Alert
export interface AlertProps {
  // Contenido principal
  message?: React.ReactNode; // Título principal
  description?: React.ReactNode; // Descripción adicional
  children?: React.ReactNode; // Contenido personalizado

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático
  type?: AlertType; // Shorthand para variant (success|info|warning|error)

  // Estilo visual
  alertStyle?: AlertStyle;

  // Funcionalidades
  closable?: boolean; // Puede cerrarse
  showIcon?: boolean; // Mostrar icono automático
  banner?: boolean; // Estilo banner (full width, sin border-radius)

  // Callbacks
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterClose?: () => void; // Callback después de animación close

  // Layout y estilos
  className?: string;
  style?: React.CSSProperties;

  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    textToSpeech?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
    focusRing?: boolean;
    largeText?: boolean;
  };

  // Props ARIA y semánticas
  role?: "alert" | "alertdialog" | "status"; // Default: "alert"
  "aria-live"?: "polite" | "assertive" | "off"; // Default: "polite"
  "aria-label"?: string;
  "aria-describedby"?: string;
  id?: string;

  // Props adicionales para casos específicos
  action?: React.ReactNode; // Botones de acción
  icon?: React.ReactNode; // Icono personalizado
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el container principal del Alert
export interface StyledAlertProps {
  $size?: AlertSize; // Tamaño mapeado
  $variant?: AlertVariant; // Variante mapeada
  $alertStyle?: AlertStyle;
  $banner?: boolean;
  $closable?: boolean;
  accessibility?: AlertProps["accessibility"];
}

// Props para el contenido del Alert
export interface AlertContentProps {
  $size?: AlertSize;
  $hasDescription?: boolean;
  accessibility?: AlertProps["accessibility"];
}

// Props para el icono del Alert
export interface AlertIconProps {
  $size?: AlertSize;
  $variant?: AlertVariant;
  accessibility?: AlertProps["accessibility"];
}

// Props para el botón de cerrar
export interface AlertCloseProps {
  $size?: AlertSize;
  accessibility?: AlertProps["accessibility"];
}

// Props para las acciones
export interface AlertActionProps {
  $size?: AlertSize;
  accessibility?: AlertProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Alert (subset de AllSize)
export const ALERT_SIZES = ["sm", "md", "lg"] as const;

// Variantes soportadas por Alert (subset de AllVariant)
export const ALERT_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const;

// Estilos visuales soportados
export const ALERT_STYLES = ["filled", "outlined", "soft", "minimal"] as const;

// Props por defecto optimizadas
export const ALERT_DEFAULTS = {
  size: "md" as AllSize,
  variant: "info" as AllVariant,
  alertStyle: "soft" as AlertStyle,
  showIcon: true,
  closable: false,
  banner: false,
  role: "alert" as const,
  "aria-live": "polite" as const,
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para casos donde Alert se usa como notificación
export interface AlertNotificationProps extends AlertProps {
  duration?: number; // Auto-close después de X ms
  placement?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "bottom";
  onAutoClose?: () => void;
}

// Para casos donde Alert necesita confirmación
export interface AlertConfirmProps extends AlertProps {
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Para casos de Alert con loading
export interface AlertLoadingProps extends AlertProps {
  loading?: boolean;
  loadingText?: string;
}

// =====================================
// ICONOS POR DEFECTO
// =====================================

// Mapeo de variantes a iconos por defecto
export const DEFAULT_ICONS: { [_key in AlertVariant]: string } = {
  primary: "ℹ️",
  secondary: "ℹ️",
  success: "✅",
  warning: "⚠️",
  error: "❌",
  info: "ℹ️",
};

// =====================================
// ANIMATION TYPES
// =====================================

// Estados para animaciones
export type AlertState = "entering" | "visible" | "exiting" | "hidden";

// Configuración de animaciones
export interface AlertAnimationConfig {
  duration?: number; // Duración en ms
  easing?: string; // CSS easing function
  reducedMotion?: boolean; // Desactivar animaciones
}

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a AlertSize (algunos tamaños no aplicables)
export const SIZE_MAPPING_ALERT: { [_key in AllSize]?: AlertSize } = {
  xs: "sm", // xs → sm
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
};

// Mapeo de AllVariant a AlertVariant (subset específico)
export const VARIANT_MAPPING_ALERT: { [_key in AllVariant]?: AlertVariant } = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "info", // tertiary → info
  inverse: "secondary", // inverse → secondary
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  ghost: "secondary", // ghost → secondary
  link: "info", // link → info
  // Legacy mappings
  danger: "error", // danger → error
  confirm: "success", // confirm → success
  default: "info", // default → info
};

// Mapeo de AlertType a AlertVariant (para prop type)
export const TYPE_TO_VARIANT_MAPPING: { [_key in AlertType]: AlertVariant } = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};
