import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// TAG COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Tag acepta tamaños del shared system
export type TagSize = "xs" | "sm" | "md" | "lg"; // Subset de AllSize para Tag

// Tag acepta variantes del shared system
export type TagVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// Variaciones visuales del Tag
export type TagStyle = "filled" | "outlined" | "ghost" | "light";

// Estados de selección para tags interactivos
export type TagState = "default" | "selected" | "disabled";

// Props principales del Tag
export interface TagProps {
  // Contenido del tag
  children?: React.ReactNode; // Contenido principal del tag
  icon?: React.ReactNode; // Icono a mostrar antes del contenido (compatible con antd)

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático

  // Estilo visual
  tagStyle?: TagStyle; // Estilo visual del tag

  // Estados y funcionalidad
  closable?: boolean; // Puede cerrarse con X
  checkable?: boolean; // Puede seleccionarse (toggle)
  checked?: boolean; // Estado checked (para checkable)
  defaultChecked?: boolean; // Estado inicial checked
  disabled?: boolean; // Estado deshabilitado

  // Personalización visual
  color?: string; // Color personalizado (override variant)
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
  role?: string; // Default: "button" si interactivo, "text" si no
  htmlTitle?: string; // HTML title attribute
  id?: string;

  // Callbacks para interactividad
  onClose?: (e: React.MouseEvent<HTMLElement>) => void; // Cuando se cierra
  onClick?: (e: React.MouseEvent<HTMLElement>) => void; // Click general
  onCheck?: (checked: boolean, e: React.MouseEvent<HTMLElement>) => void; // Toggle checkable
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el tag principal
export interface StyledTagProps {
  $size?: TagSize; // Tamaño mapeado
  $variant?: TagVariant; // Variante mapeada
  $tagStyle?: TagStyle;
  $checkable?: boolean;
  $checked?: boolean;
  $disabled?: boolean;
  $closable?: boolean;
  $customColor?: string;
  $bordered?: boolean;
  $interactive?: boolean; // Si tiene onClick o es checkable
  accessibility?: TagProps["accessibility"];
}

// Props para el contenido del tag
export interface TagContentProps {
  $size?: TagSize;
  $disabled?: boolean;
  accessibility?: TagProps["accessibility"];
}

// Props para el botón de cerrar
export interface TagCloseProps {
  $size?: TagSize;
  $disabled?: boolean;
  accessibility?: TagProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Tag (subset de AllSize)
export const TAG_SIZES = ["xs", "sm", "md", "lg"] as const;

// Variantes soportadas por Tag (subset de AllVariant)
export const TAG_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const;

// Estilos visuales soportados
export const TAG_STYLES = ["filled", "outlined", "ghost", "light"] as const;

// Estados soportados
export const TAG_STATES = ["default", "selected", "disabled"] as const;

// Props por defecto optimizadas
export const TAG_DEFAULTS = {
  size: "md" as AllSize,
  variant: "primary" as AllVariant,
  tagStyle: "filled" as TagStyle,
  closable: false,
  checkable: false,
  checked: false,
  defaultChecked: false,
  disabled: false,
  bordered: true,
  role: "text", // Cambia a "button" si es interactivo
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para tags que funcionan como filtros
export interface FilterTagProps extends TagProps {
  active?: boolean; // Si el filtro está activo
  count?: number; // Número de items con este filtro
  onFilter?: (active: boolean) => void; // Callback para filtrar
}

// Para tags de estado/status
export interface StatusTagProps extends Omit<TagProps, "children"> {
  status: "online" | "offline" | "busy" | "away" | "invisible";
  showDot?: boolean; // Mostrar punto de estado
}

// Para tags de categorías
export interface CategoryTagProps extends TagProps {
  category: string; // Nombre de la categoría
  colorScheme?: "random" | "fixed"; // Esquema de colores
  onCategoryClick?: (category: string) => void;
}

// Para tags de habilidades/skills
export interface SkillTagProps extends TagProps {
  skill: string; // Nombre de la habilidad
  level?: 1 | 2 | 3 | 4 | 5; // Nivel de experiencia (1-5)
  showLevel?: boolean; // Mostrar nivel visualmente
}

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a TagSize (todos los tamaños válidos)
export const SIZE_MAPPING_TAG: { [_key in AllSize]?: TagSize } = {
  xs: "xs", // xs → xs
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
};

// Mapeo de AllVariant a TagVariant (subset específico)
export const VARIANT_MAPPING_TAG: { [_key in AllVariant]?: TagVariant } = {
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

// Generar descripción accesible del tag
export const getTagAccessibleDescription = (props: {
  children?: React.ReactNode;
  closable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  disabled?: boolean;
}): string => {
  const { children, closable, checkable, checked, disabled } = props;

  let description = "";

  // Añadir contenido
  if (children) {
    description += children.toString();
  }

  // Añadir estado
  if (disabled) {
    description += " (deshabilitado)";
  } else if (checkable) {
    description += checked ? " (seleccionado)" : " (no seleccionado)";
  }

  // Añadir funcionalidad
  if (closable) {
    description += ", presiona para cerrar";
  }
  if (checkable) {
    description +=
      ", presiona para " + (checked ? "deseleccionar" : "seleccionar");
  }

  return description.trim();
};

// Generar color aleatorio para categorías
export const generateCategoryColor = (category: string): string => {
  // Generar color basado en hash del string
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convertir a color HSL con saturación y luminosidad fijas
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
};

// =====================================
// ANIMATION TYPES
// =====================================

// Estados para animaciones
export type TagAnimationState =
  | "idle"
  | "appearing"
  | "disappearing"
  | "checking";

// Configuración de animaciones
export interface TagAnimationConfig {
  duration?: number; // Duración en ms
  easing?: string; // CSS easing function
  reducedMotion?: boolean; // Desactivar animaciones
}

// =====================================
// PRESETS DE COLORES
// =====================================

// Colores para status tags
export const STATUS_COLORS: {
  [_key in StatusTagProps["status"]]: {
    background: string;
    color: string;
    dot: string;
  };
} = {
  online: {
    background: "#52c41a",
    color: "#ffffff",
    dot: "#52c41a",
  },
  offline: {
    background: "#d9d9d9",
    color: "#000000",
    dot: "#d9d9d9",
  },
  busy: {
    background: "#ff4d4f",
    color: "#ffffff",
    dot: "#ff4d4f",
  },
  away: {
    background: "#faad14",
    color: "#000000",
    dot: "#faad14",
  },
  invisible: {
    background: "#722ed1",
    color: "#ffffff",
    dot: "#722ed1",
  },
};

// Colores para niveles de habilidad
export const SKILL_LEVEL_COLORS: { [key: number]: string } = {
  1: "#ff4d4f", // Principiante - Rojo
  2: "#faad14", // Básico - Naranja
  3: "#1890ff", // Intermedio - Azul
  4: "#52c41a", // Avanzado - Verde
  5: "#722ed1", // Experto - Morado
};

// =====================================
// ACCESSIBILITY HELPERS
// =====================================

// Determinar role apropiado
export const getTagRole = (props: {
  checkable?: boolean;
  closable?: boolean;
  onClick?: Function;
}): string => {
  const { checkable, closable, onClick } = props;

  if (checkable) return "checkbox";
  if (closable || onClick) return "button";
  return "text";
};

// Generar props ARIA apropiadas
export const getTagAriaProps = (props: {
  checkable?: boolean;
  checked?: boolean;
  disabled?: boolean;
  closable?: boolean;
}) => {
  const { checkable, checked, disabled, closable } = props;

  const ariaProps: { [key: string]: any } = {};

  if (checkable) {
    ariaProps["aria-checked"] = checked;
  }

  if (disabled) {
    ariaProps["aria-disabled"] = true;
  }

  if (closable) {
    ariaProps["aria-label"] = "Cerrar etiqueta";
  }

  return ariaProps;
};
