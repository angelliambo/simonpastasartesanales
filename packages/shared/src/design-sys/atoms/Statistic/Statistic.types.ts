import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// STATISTIC COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Statistic acepta tamaños del shared system
export type StatisticSize = "sm" | "md" | "lg" | "xl"; // Subset de AllSize para Statistic

// Statistic acepta variantes del shared system
export type StatisticVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// Tipos de trend indicators
export type TrendType = "increase" | "decrease" | "stable";

// Props principales del Statistic
export interface StatisticProps {
  // Contenido principal
  title?: React.ReactNode; // Título/etiqueta del statistic
  value?: string | number; // Valor principal a mostrar

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático

  // Formateo de valores
  precision?: number; // Decimales para números (ej: 2 → 1,234.56)
  prefix?: React.ReactNode; // Elemento antes del valor ($, €, etc.)
  suffix?: React.ReactNode; // Elemento después del valor (%, etc.)
  formatter?: (value?: string | number) => React.ReactNode; // Formato personalizado

  // Separadores y formato
  groupSeparator?: string; // Separador de miles (default: ",")
  decimalSeparator?: string; // Separador decimal (default: ".")

  // Estados y funcionalidad
  loading?: boolean; // Estado de carga

  // Trend indicators
  trend?: TrendType; // Tipo de tendencia
  trendValue?: number; // Valor del cambio (ej: +5.2, -2.1)

  // Layout y estilos
  className?: string;
  style?: React.CSSProperties;
  valueStyle?: React.CSSProperties; // Estilos específicos para el valor

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
  role?: string; // Default: "img"
  htmlTitle?: string; // HTML title attribute
  id?: string;

  // Callbacks para interactividad
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el container principal del Statistic
export interface StyledStatisticProps {
  $size?: StatisticSize; // Tamaño mapeado
  $variant?: StatisticVariant; // Variante mapeada
  $loading?: boolean;
  $interactive?: boolean; // Si tiene onClick
  accessibility?: StatisticProps["accessibility"];
}

// Props para el título del Statistic
export interface StatisticTitleProps {
  $size?: StatisticSize;
  $variant?: StatisticVariant;
  accessibility?: StatisticProps["accessibility"];
}

// Props para el valor principal
export interface StatisticValueProps {
  $size?: StatisticSize;
  $variant?: StatisticVariant;
  $loading?: boolean;
  accessibility?: StatisticProps["accessibility"];
}

// Props para prefix y suffix
export interface StatisticAffixProps {
  $size?: StatisticSize;
  $variant?: StatisticVariant;
  $type?: "prefix" | "suffix";
  accessibility?: StatisticProps["accessibility"];
}

// Props para trend indicator
export interface StatisticTrendProps {
  $size?: StatisticSize;
  $trend?: TrendType;
  accessibility?: StatisticProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Statistic (subset de AllSize)
export const STATISTIC_SIZES = ["sm", "md", "lg", "xl"] as const;

// Variantes soportadas por Statistic (subset de AllVariant)
export const STATISTIC_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const;

// Tipos de trend soportados
export const TREND_TYPES = ["increase", "decrease", "stable"] as const;

// Props por defecto optimizadas
export const STATISTIC_DEFAULTS = {
  size: "md" as AllSize,
  variant: "primary" as AllVariant,
  precision: 0,
  groupSeparator: ",",
  decimalSeparator: ".",
  loading: false,
  role: "img",
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para casos donde Statistic necesita formateo específico
export interface CurrencyStatisticProps extends StatisticProps {
  currency?: string; // USD, EUR, etc.
  currencyDisplay?: "symbol" | "code" | "name"; // $, USD, US Dollar
}

// Para casos donde Statistic muestra porcentajes
export interface PercentageStatisticProps extends StatisticProps {
  showPercentSign?: boolean; // Mostrar símbolo %
  baseValue?: number; // Valor base para calcular porcentaje
}

// Para casos donde Statistic tiene countdown
export interface CountdownStatisticProps extends StatisticProps {
  targetDate?: Date | string | number; // Fecha objetivo
  onFinish?: () => void; // Callback cuando termina countdown
  format?: "HH:mm:ss" | "DD:HH:mm:ss" | "custom"; // Formato de tiempo
}

// =====================================
// ICONS Y SYMBOLS POR DEFECTO
// =====================================

// Iconos para trend indicators
export const TREND_ICONS: { [_key in TrendType]: string } = {
  increase: "↗️", // Arrow up-right
  decrease: "↘️", // Arrow down-right
  stable: "→", // Arrow right
};

// Símbolos de moneda comunes
export const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  KRW: "₩",
  ARS: "$",
  MXN: "$",
  BRL: "R$",
};

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a StatisticSize (subset específico)
export const SIZE_MAPPING_STATISTIC: { [_key in AllSize]?: StatisticSize } = {
  xs: "sm", // xs → sm
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "xl", // xl → xl
  xxl: "xl", // xxl → xl (máximo)
};

// Mapeo de AllVariant a StatisticVariant (subset específico)
export const VARIANT_MAPPING_STATISTIC: {
  [_key in AllVariant]?: StatisticVariant;
} = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "secondary", // tertiary → secondary
  inverse: "secondary", // inverse → secondary
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  ghost: "secondary", // ghost → secondary
  link: "primary", // link → primary
  // Legacy mappings
  danger: "error", // danger → error
  confirm: "success", // confirm → success
  default: "primary", // default → primary
};

// =====================================
// FORMATTERS PREDEFINIDOS
// =====================================

// Formatter para números con separadores de miles
export const numberFormatter = (
  value?: string | number,
  options?: {
    precision?: number;
    groupSeparator?: string;
    decimalSeparator?: string;
  }
): string => {
  if (value === null || value === undefined) return "0";

  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return String(value);

  const {
    precision = 0,
    groupSeparator = ",",
    decimalSeparator = ".",
  } = options || {};

  // Aplicar precisión
  const fixed = numValue.toFixed(precision);

  // Separar parte entera y decimal
  const parts = fixed.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Aplicar separador de miles
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    groupSeparator
  );

  // Combinar con separador decimal si hay decimales
  return decimalPart
    ? `${formattedInteger}${decimalSeparator}${decimalPart}`
    : formattedInteger;
};

// Formatter para moneda
export const currencyFormatter = (
  value?: string | number,
  currency = "USD",
  options?: {
    precision?: number;
    currencyDisplay?: "symbol" | "code" | "name";
  }
): string => {
  if (value === null || value === undefined) return "$0";

  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return String(value);

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: options?.precision ?? 2,
      maximumFractionDigits: options?.precision ?? 2,
      currencyDisplay: options?.currencyDisplay ?? "symbol",
    }).format(numValue);
  } catch {
    // Fallback si Intl no está disponible
    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    const formatted = numberFormatter(numValue, {
      precision: options?.precision ?? 2,
    });
    return `${symbol}${formatted}`;
  }
};

// Formatter para porcentajes
export const percentageFormatter = (
  value?: string | number,
  options?: {
    precision?: number;
    showSign?: boolean;
  }
): string => {
  if (value === null || value === undefined) return "0%";

  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return String(value);

  const { precision = 0, showSign = true } = options || {};
  const formatted = numberFormatter(numValue, { precision });

  return showSign ? `${formatted}%` : formatted;
};

// =====================================
// ANIMATION TYPES
// =====================================

// Estados para animaciones de valores
export type StatisticState = "idle" | "loading" | "updating" | "error";

// Configuración de animaciones
export interface StatisticAnimationConfig {
  duration?: number; // Duración en ms
  easing?: string; // CSS easing function
  reducedMotion?: boolean; // Desactivar animaciones
}

// =====================================
// ACCESSIBILITY HELPERS
// =====================================

// Generar descripción accesible del statistic
export const getAccessibleDescription = (props: {
  title?: React.ReactNode;
  value?: string | number;
  trend?: TrendType;
  trendValue?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}): string => {
  const { title, value, trend, trendValue, prefix, suffix } = props;

  let description = "";

  // Añadir título
  if (title) {
    description += `${title.toString()}: `;
  }

  // Añadir prefijo
  if (prefix) {
    description += `${prefix.toString()} `;
  }

  // Añadir valor
  if (value !== null && value !== undefined) {
    description += value.toString();
  }

  // Añadir sufijo
  if (suffix) {
    description += ` ${suffix.toString()}`;
  }

  // Añadir información de tendencia
  if (trend && trendValue !== undefined) {
    const trendText =
      trend === "increase"
        ? "aumento de"
        : trend === "decrease"
        ? "disminución de"
        : "sin cambios";
    description += `. ${trendText} ${Math.abs(trendValue)}`;
  }

  return description.trim();
};
