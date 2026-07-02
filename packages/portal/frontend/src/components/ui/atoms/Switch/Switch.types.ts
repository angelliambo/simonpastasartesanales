import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// SWITCH COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Switch acepta tamaños del shared system
export type SwitchSize = "sm" | "md" | "lg"; // Subset de AllSize para Switch

// Switch acepta variantes del shared system
export type SwitchVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// Props principales del Switch
export interface SwitchProps {
  // Estado y control
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático

  // Contenido y labels
  checkedChildren?: React.ReactNode; // Texto/icono cuando está ON
  unCheckedChildren?: React.ReactNode; // Texto/icono cuando está OFF

  // Callbacks
  onChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onClick?: (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;

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
    largeText?: boolean; // Añadir largeText para consistencia
  };

  // Props ARIA y semánticas
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  name?: string;
  value?: string | number;
  tabIndex?: number;
  autoFocus?: boolean;

  // Props adicionales para casos específicos
  title?: string; // Tooltip nativo
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el container principal del Switch
export interface StyledSwitchProps {
  $checked?: boolean;
  $disabled?: boolean;
  $loading?: boolean;
  $size?: SwitchSize; // Tamaño mapeado
  $variant?: SwitchVariant; // Variante mapeada
  accessibility?: SwitchProps["accessibility"];
}

// Props para el handle (círculo que se mueve)
export interface SwitchHandleProps {
  $checked?: boolean;
  $disabled?: boolean;
  $loading?: boolean;
  $size?: SwitchSize;
  $variant?: SwitchVariant; // Añadir variant para colores del handle
  accessibility?: SwitchProps["accessibility"];
}

// Props para el contenido interno (texto/iconos)
export interface SwitchInnerProps {
  $checked?: boolean;
  $size?: SwitchSize;
  accessibility?: SwitchProps["accessibility"];
}

// Props para el spinner de loading
export interface SwitchLoadingProps {
  $size?: SwitchSize;
  accessibility?: SwitchProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Switch (subset de AllSize)
export const SWITCH_SIZES = ["sm", "md", "lg"] as const;

// Variantes soportadas por Switch (subset de AllVariant)
export const SWITCH_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const;

// Props por defecto optimizadas
export const SWITCH_DEFAULTS = {
  checked: false,
  disabled: false,
  loading: false,
  size: "md" as AllSize,
  variant: "primary" as AllVariant,
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para casos donde Switch se usa en forms
export interface FormSwitchProps extends SwitchProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
}

// Para casos donde Switch controla otros elementos
export interface ControlledSwitchProps extends SwitchProps {
  target?: string; // ID del elemento controlado
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
}

// Para casos de Switch con confirmation
export interface ConfirmSwitchProps extends SwitchProps {
  confirmTitle?: string;
  confirmMessage?: string;
  onConfirm?: (checked: boolean) => void;
  onCancel?: () => void;
}

// =====================================
// ANIMATION TYPES
// =====================================

// Configuración de animaciones
export interface SwitchAnimationConfig {
  duration?: number; // Duración en ms
  easing?: string; // CSS easing function
  reducedMotion?: boolean; // Desactivar animaciones
}

// Estados para animaciones
export type SwitchState =
  | "unchecked"
  | "checking"
  | "checked"
  | "unchecking"
  | "disabled"
  | "loading";

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a SwitchSize (algunos tamaños no aplicables)
export const SIZE_MAPPING_SWITCH: { [_key in AllSize]?: SwitchSize } = {
  xs: "sm", // xs → sm
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
  small: "sm",
  medium: "md",
  large: "lg",
};

// Mapeo de AllVariant a SwitchVariant (algunas variantes no aplicables)
export const VARIANT_MAPPING_SWITCH: { [_key in AllVariant]?: SwitchVariant } = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "secondary", // tertiary → secondary
  inverse: "secondary", // inverse → secondary
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  ghost: "secondary", // ghost → secondary
  link: "secondary", // link → secondary
  // Legacy mappings
  danger: "error", // danger → error
  confirm: "success", // confirm → success
  default: "primary", // default → primary
};
