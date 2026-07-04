import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// INPUT COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Input acepta tamaños del shared system
export type InputSize = "sm" | "md" | "lg"; // Subset de AllSize para Input

// Input acepta variantes del shared system
export type InputVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

// Tipos de input soportados
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search";

// Estados de validación
export type InputStatus =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "validating";

// Props principales del Input
export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "suffix" | "onChange" | "onFocus" | "onBlur"
  > {
  // Contenido y valor
  value?: string; // Valor controlado
  defaultValue?: string; // Valor inicial no controlado

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático

  // Tipo y comportamiento
  type?: string; // Tipo de input
  placeholder?: string; // Texto placeholder
  disabled?: boolean; // Estado deshabilitado
  readOnly?: boolean; // Solo lectura

  // Validación y estado
  status?: InputStatus; // Estado de validación
  allowClear?: boolean; // Mostrar botón de limpiar
  showCount?: boolean; // Mostrar contador de caracteres
  maxLength?: number; // Longitud máxima
  minLength?: number; // Longitud mínima

  // Elementos adicionales
  prefix?: React.ReactNode; // Elemento antes del input
  suffix?: React.ReactNode; // Elemento después del input
  addonBefore?: React.ReactNode; // Addon antes del input
  addonAfter?: React.ReactNode; // Addon después del input

  // Estilos visuales
  bordered?: boolean; // Mostrar borde (default: true)

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
    largeText?: boolean;
    focusRing?: boolean;
  };

  // Props ARIA y semánticas
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  htmlTitle?: string; // HTML title attribute

  // Callbacks para eventos
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** @deprecated Use onKeyPress with e.key === "Enter" instead */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void; // Cuando se usa allowClear
  onSearch?: (
    value: string,
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>
  ) => void; // Para search type
}

// Props para TextArea (extensión del Input)
export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "size" | "onChange" | "onFocus" | "onBlur"
  > {
  // Contenido y valor
  value?: string;
  defaultValue?: string;

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize;
  variant?: AllVariant;

  // Comportamiento específico de textarea
  rows?: number; // Número de filas
  cols?: number; // Número de columnas
  autoSize?: boolean | { minRows?: number; maxRows?: number }; // Auto-resize

  // Validación y estado
  status?: InputStatus;
  allowClear?: boolean;
  showCount?: boolean;
  maxLength?: number;
  minLength?: number;

  // Estilos
  bordered?: boolean;

  // Layout y estilos
  className?: string;
  style?: React.CSSProperties;

  // Accesibilidad
  accessibility?: InputProps["accessibility"];

  // Props ARIA
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  htmlTitle?: string;

  // Callbacks
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onClear?: () => void;
  onResize?: (size: { width: number; height: number }) => void;
}

// Props para Password Input (extensión del Input)
export interface PasswordProps extends Omit<InputProps, "type" | "suffix"> {
  // Funcionalidad específica de password
  visibilityToggle?: boolean; // Mostrar toggle de visibilidad (default: true)
  iconRender?: (visible: boolean) => React.ReactNode; // Custom icon renderer

  // Strength indicator
  showStrength?: boolean; // Mostrar indicador de fortaleza
  strengthRules?: {
    minLength?: number;
    requireNumbers?: boolean;
    requireSymbols?: boolean;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
  };
}

// Props para Search Input (extensión del Input)
export interface SearchProps extends Omit<InputProps, "type" | "addonAfter"> {
  // Funcionalidad específica de search
  enterButton?: boolean | React.ReactNode; // Botón de búsqueda
  loading?: boolean; // Estado de carga
  onSearch?: (
    value: string,
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>
  ) => void;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el wrapper del input
export interface InputWrapperProps {
  $size?: InputSize;
  $variant?: InputVariant;
  $status?: InputStatus;
  $disabled?: boolean;
  $focused?: boolean;
  $bordered?: boolean;
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
  $hasAddonBefore?: boolean;
  $hasAddonAfter?: boolean;
  accessibility?: InputProps["accessibility"];
}

// Props para el input base
export interface StyledInputProps {
  $size?: InputSize;
  $variant?: InputVariant;
  $status?: InputStatus;
  $disabled?: boolean;
  $readOnly?: boolean;
  accessibility?: InputProps["accessibility"];
}

// Props para prefijos y sufijos
export interface InputAffixProps {
  $size?: InputSize;
  $disabled?: boolean;
  $type?: "prefix" | "suffix";
  accessibility?: InputProps["accessibility"];
}

// Props para addons
export interface InputAddonProps {
  $size?: InputSize;
  $disabled?: boolean;
  $type?: "before" | "after";
  accessibility?: InputProps["accessibility"];
}

// Props para el botón clear
export interface ClearButtonProps {
  $size?: InputSize;
  $disabled?: boolean;
  accessibility?: InputProps["accessibility"];
}

// Props para el contador de caracteres
export interface CountProps {
  $size?: InputSize;
  $status?: InputStatus;
  accessibility?: InputProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Input (subset de AllSize)
export const INPUT_SIZES = ["sm", "md", "lg"] as const;

// Variantes soportadas por Input (subset de AllVariant)
export const INPUT_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
] as const;

// Tipos de input soportados
export const INPUT_TYPES = [
  "text",
  "password",
  "email",
  "number",
  "tel",
  "url",
  "search",
] as const;

// Estados de validación soportados
export const INPUT_STATUSES = [
  "default",
  "success",
  "warning",
  "error",
  "validating",
] as const;

// Props por defecto optimizadas
export const INPUT_DEFAULTS = {
  size: "md" as AllSize,
  variant: "primary" as AllVariant,
  type: "text" as InputType,
  status: "default" as InputStatus,
  bordered: true,
  allowClear: false,
  showCount: false,
  disabled: false,
  readOnly: false,
} as const;

// Props por defecto para TextArea
export const TEXTAREA_DEFAULTS = {
  ...INPUT_DEFAULTS,
  rows: 4,
  autoSize: false,
} as const;

// Props por defecto para Password
export const PASSWORD_DEFAULTS = {
  ...INPUT_DEFAULTS,
  visibilityToggle: true,
  showStrength: false,
} as const;

// Props por defecto para Search
export const SEARCH_DEFAULTS = {
  ...INPUT_DEFAULTS,
  type: "search" as InputType,
  enterButton: false,
  loading: false,
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para inputs de formulario con validación
export interface FormInputProps extends InputProps {
  label?: string; // Etiqueta del campo
  required?: boolean; // Campo requerido
  error?: string; // Mensaje de error
  help?: string; // Texto de ayuda
  tooltip?: string; // Tooltip informativo
}

// Para inputs numéricos con configuración específica
export interface NumericInputProps extends Omit<InputProps, "type"> {
  min?: number; // Valor mínimo
  max?: number; // Valor máximo
  step?: number; // Incremento
  precision?: number; // Decimales
  formatter?: (value?: string | number) => string; // Formatear display
  parser?: (value?: string) => string; // Parsear valor
}

// Para inputs de validación de email
export interface EmailInputProps extends Omit<InputProps, "type"> {
  domains?: string[]; // Dominios sugeridos
  validateDomain?: boolean; // Validar dominio
  onDomainSuggestion?: (suggestions: string[]) => void; // Callback sugerencias
}

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a InputSize (subset específico)
export const SIZE_MAPPING_INPUT: { [_key in AllSize]?: InputSize } = {
  xs: "sm", // xs → sm (mínimo)
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
};

// Mapeo de AllVariant a InputVariant (subset específico)
export const VARIANT_MAPPING_INPUT: { [_key in AllVariant]?: InputVariant } = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "secondary", // tertiary → secondary
  inverse: "secondary", // inverse → secondary
  success: "success",
  warning: "warning",
  error: "error",
  info: "primary", // info → primary
  ghost: "secondary", // ghost → secondary
  link: "primary", // link → primary
  // Legacy mappings
  danger: "error", // danger → error
  confirm: "success", // confirm → success
  default: "primary", // default → primary
};

// =====================================
// HELPER FUNCTIONS
// =====================================

// Validar fortaleza de contraseña
export const validatePasswordStrength = (
  password: string,
  rules: PasswordProps["strengthRules"] = {}
): {
  score: number; // 0-100
  level: "weak" | "fair" | "good" | "strong";
  passed: string[];
  failed: string[];
} => {
  const {
    minLength = 8,
    requireNumbers = true,
    requireSymbols = true,
    requireUppercase = true,
    requireLowercase = true,
  } = rules;

  const checks = [
    {
      name: "minLength",
      test: () => password.length >= minLength,
      message: `Mínimo ${minLength} caracteres`,
    },
    {
      name: "numbers",
      test: () => /\d/.test(password),
      message: "Al menos un número",
      required: requireNumbers,
    },
    {
      name: "symbols",
      test: () => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: "Al menos un símbolo",
      required: requireSymbols,
    },
    {
      name: "uppercase",
      test: () => /[A-Z]/.test(password),
      message: "Al menos una mayúscula",
      required: requireUppercase,
    },
    {
      name: "lowercase",
      test: () => /[a-z]/.test(password),
      message: "Al menos una minúscula",
      required: requireLowercase,
    },
  ];

  const passed: string[] = [];
  const failed: string[] = [];
  let score = 0;

  checks.forEach((check) => {
    if (check.test()) {
      passed.push(check.message);
      score += check.required !== false ? 20 : 10;
    } else if (check.required !== false) {
      failed.push(check.message);
    }
  });

  // Bonus por longitud
  if (password.length > 12) score += 10;
  if (password.length > 16) score += 10;

  const level =
    score >= 80
      ? "strong"
      : score >= 60
      ? "good"
      : score >= 40
      ? "fair"
      : "weak";

  return { score: Math.min(score, 100), level, passed, failed };
};

// Validar email
export const validateEmail = (
  email: string
): {
  valid: boolean;
  domain: string | null;
  suggestions?: string[];
} => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailRegex.test(email);

  const domain = valid ? email.split("@")[1] : null;

  const commonDomains = [
    "gmail.com",
    "outlook.com",
    "yahoo.com",
    "hotmail.com",
  ];
  const suggestions =
    domain && !commonDomains.includes(domain)
      ? commonDomains.filter((d) => d.includes(domain.charAt(0)))
      : undefined;

  return { valid, domain, suggestions };
};

// Formatear valor numérico
export const formatNumericValue = (
  value: string | number,
  options: {
    precision?: number;
    thousands?: string;
    decimal?: string;
  } = {}
): string => {
  const { precision = 0, thousands = ",", decimal = "." } = options;

  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "";

  const fixed =
    precision > 0 ? num.toFixed(precision) : Math.round(num).toString();
  const parts = fixed.split(".");

  // Formatear parte entera con separador de miles
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

  return parts.join(decimal);
};

// Generar descripción accesible
export const getInputAccessibleDescription = (props: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  help?: string;
  maxLength?: number;
  showCount?: boolean;
  status?: InputStatus;
}): string => {
  const {
    label,
    placeholder,
    required,
    error,
    help,
    maxLength,
    showCount,
    status,
  } = props;

  let description = "";

  if (label) {
    description += label;
    if (required) description += " (requerido)";
  }

  if (placeholder && !label) {
    description += placeholder;
  }

  if (status && status !== "default") {
    const statusText = {
      success: "válido",
      warning: "advertencia",
      error: "error",
      validating: "validando",
    };
    description += `, estado: ${statusText[status]}`;
  }

  if (error) {
    description += `, error: ${error}`;
  }

  if (help) {
    description += `, ayuda: ${help}`;
  }

  if (showCount && maxLength) {
    description += `, máximo ${maxLength} caracteres`;
  }

  return description.trim();
};
