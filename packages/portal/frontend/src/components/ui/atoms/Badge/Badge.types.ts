import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// BADGE COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Badge acepta tamaños del shared system
export type BadgeSize = "xs" | "sm" | "md" | "lg"; // Subset de AllSize para Badge

// Badge acepta variantes del shared system
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// Posiciones para badge sobre elementos
export type BadgePlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "right-center";

// Estados para status badges
export type BadgeStatus =
  | "default"
  | "processing"
  | "success"
  | "error"
  | "warning";

// Props principales del Badge
export interface BadgeProps {
  // Contenido del badge
  count?: number; // Número a mostrar
  text?: React.ReactNode; // Texto personalizado (alternativa a count)

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático

  // Configuración de comportamiento
  dot?: boolean; // Mostrar solo punto sin texto/número
  showZero?: boolean; // Mostrar badge cuando count es 0
  overflowCount?: number; // Máximo antes de mostrar "99+" (default: 99)

  // Posicionamiento (cuando wrappea children)
  children?: React.ReactNode; // Elemento a wrappear
  placement?: BadgePlacement; // Posición del badge
  offset?: [number, number]; // Offset [x, y] en pixels

  // Status badge (alternativa a count/text)
  status?: BadgeStatus; // Estado del badge

  // Personalización visual
  color?: string; // Color personalizado (override variant)

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
  role?: string; // Default: "status"
  htmlTitle?: string; // HTML title attribute
  id?: string;

  // Callbacks para interactividad
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el wrapper principal (cuando tiene children)
export interface BadgeWrapperProps {
  $hasChildren?: boolean;
  accessibility?: BadgeProps["accessibility"];
}

// Props para el badge indicator
export interface StyledBadgeProps {
  $size?: BadgeSize; // Tamaño mapeado
  $variant?: BadgeVariant; // Variante mapeada
  $dot?: boolean;
  $placement?: BadgePlacement;
  $offset?: [number, number];
  $isEmpty?: boolean; // Si no tiene contenido visible
  $customColor?: string;
  $status?: BadgeStatus;
  accessibility?: BadgeProps["accessibility"];
}

// Props para el contenido del badge
export interface BadgeContentProps {
  $size?: BadgeSize;
  $dot?: boolean;
  accessibility?: BadgeProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Badge (subset de AllSize)
export const BADGE_SIZES = ["xs", "sm", "md", "lg"] as const;

// Variantes soportadas por Badge (subset de AllVariant)
export const BADGE_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const;

// Posiciones soportadas
export const BADGE_PLACEMENTS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "top-center",
  "bottom-center",
  "left-center",
  "right-center",
] as const;

// Estados soportados
export const BADGE_STATUSES = [
  "default",
  "processing",
  "success",
  "error",
  "warning",
] as const;

// Props por defecto optimizadas
export const BADGE_DEFAULTS = {
  size: "md" as AllSize,
  variant: "primary" as AllVariant,
  placement: "top-right" as BadgePlacement,
  overflowCount: 99,
  showZero: false,
  dot: false,
  role: "status",
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para badges que necesitan actualizaciones en tiempo real
export interface LiveBadgeProps extends BadgeProps {
  liveUpdate?: boolean; // Animación cuando cambia el count
  updateInterval?: number; // Intervalo de actualización en ms
  onUpdate?: (newCount: number) => void;
}

// Para badges de notificaciones
export interface NotificationBadgeProps extends BadgeProps {
  unreadCount?: number; // Número de no leídas
  maxDisplay?: number; // Máximo a mostrar (default: 99)
  markAsRead?: () => void; // Callback para marcar como leído
}

// Para badges de estado online/offline
export interface StatusIndicatorProps
  extends Omit<BadgeProps, "count" | "text"> {
  isOnline?: boolean; // Estado online/offline
  lastSeen?: Date | string; // Última vez visto
  showLastSeen?: boolean; // Mostrar información de última conexión
}

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a BadgeSize (todos los tamaños válidos)
export const SIZE_MAPPING_BADGE: { [_key in AllSize]?: BadgeSize } = {
  xs: "xs", // xs → xs
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
};

// Mapeo de AllVariant a BadgeVariant (subset específico)
export const VARIANT_MAPPING_BADGE: { [_key in AllVariant]?: BadgeVariant } = {
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
// HELPER FUNCTIONS
// =====================================

// Formatear número para display (ej: 99+ para overflow)
export const formatBadgeCount = (
  count?: number,
  overflowCount: number = 99,
  showZero: boolean = false
): string | null => {
  if (count === undefined || count === null) return null;
  if (count === 0 && !showZero) return null;
  if (count > overflowCount) return `${overflowCount}+`;
  return count.toString();
};

// Generar descripción accesible del badge
export const getBadgeAccessibleDescription = (props: {
  count?: number;
  text?: React.ReactNode;
  dot?: boolean;
  status?: BadgeStatus;
  children?: React.ReactNode;
}): string => {
  const { count, text, dot, status, children } = props;

  let description = "";

  // Si es dot badge
  if (dot) {
    description = "Indicador activo";
  }
  // Si tiene texto personalizado
  else if (text) {
    description = `Badge: ${text.toString()}`;
  }
  // Si tiene count
  else if (count !== undefined && count !== null) {
    if (count === 0) {
      description = "Sin notificaciones";
    } else if (count === 1) {
      description = "1 notificación";
    } else {
      description = `${count} notificaciones`;
    }
  }
  // Si es status badge
  else if (status) {
    const statusMessages = {
      default: "Estado por defecto",
      processing: "En proceso",
      success: "Completado exitosamente",
      error: "Error",
      warning: "Advertencia",
    };
    description = statusMessages[status];
  }

  // Si wrappea children, añadir contexto
  if (children) {
    description += " en elemento";
  }

  return description.trim();
};

// =====================================
// ANIMATION TYPES
// =====================================

// Estados para animaciones
export type BadgeAnimationState =
  | "idle"
  | "updating"
  | "appearing"
  | "disappearing";

// Configuración de animaciones
export interface BadgeAnimationConfig {
  duration?: number; // Duración en ms
  easing?: string; // CSS easing function
  reducedMotion?: boolean; // Desactivar animaciones
}

// =====================================
// COLORES POR DEFECTO
// =====================================

// Colores para status badges
export const STATUS_COLORS: { [_key in BadgeStatus]: string } = {
  default: "#d9d9d9",
  processing: "#1890ff",
  success: "#52c41a",
  error: "#ff4d4f",
  warning: "#faad14",
};

// =====================================
// OFFSET PRESETS
// =====================================

// Offsets por defecto según placement
export const DEFAULT_OFFSETS: { [_key in BadgePlacement]: [number, number] } = {
  "top-right": [0, 0],
  "top-left": [0, 0],
  "bottom-right": [0, 0],
  "bottom-left": [0, 0],
  "top-center": [0, 0],
  "bottom-center": [0, 0],
  "left-center": [0, 0],
  "right-center": [0, 0],
};
