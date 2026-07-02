/**
 * SISTEMA UNIFICADO DE ESPACIADO - SHARED SPACING
 * 
 * Sistema centralizado para manejar margins, paddings, y gaps
 * de forma consistente entre todos los componentes UI.
 */

// =====================================
// 1. ESPACIADOS ESTÁNDAR UNIFICADOS
// =====================================

export type StandardSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type LegacySpacing = "small" | "medium" | "large" | "compact" | "comfortable";

export type AllSpacing = StandardSpacing | LegacySpacing | number | string;

// =====================================
// 2. MAPEOS DE COMPATIBILIDAD LEGACY
// =====================================

export const SPACING_MAP: Record<LegacySpacing, StandardSpacing> = {
  small: "sm",
  medium: "md",
  large: "lg",
  compact: "xs",
  comfortable: "xl",
};

// Función para normalizar spacing legacy a estándar
export const normalizeLegacySpacing = (
  spacing: AllSpacing
): StandardSpacing | number | string => {
  if (typeof spacing === "number") {
    return spacing;
  }

  if (typeof spacing === "string") {
    const trimmed = spacing.trim() as LegacySpacing | StandardSpacing;

    if (SPACING_MAP[trimmed as LegacySpacing]) {
      return SPACING_MAP[trimmed as LegacySpacing];
    }

    if (SPACING_VALUES[trimmed as StandardSpacing] !== undefined) {
      return trimmed as StandardSpacing;
    }

    return spacing;
  }

  return SPACING_MAP[spacing as LegacySpacing] || (spacing as StandardSpacing);
};

// =====================================
// 3. VALORES DE ESPACIADO EN PÍXELES
// =====================================

export const SPACING_VALUES: Record<StandardSpacing, number> = {
  xs: 4,     // 0.25rem
  sm: 8,     // 0.5rem
  md: 16,    // 1rem
  lg: 24,    // 1.5rem
  xl: 32,    // 2rem
  xxl: 48,   // 3rem
};

// =====================================
// 4. FUNCIONES DE CONVERSIÓN
// =====================================

/**
 * Convierte un valor de spacing a píxeles
 */
export function getSpacingValue(spacing: AllSpacing): number {
  // Si es un número, devolverlo directamente
  if (typeof spacing === "number") {
    return spacing;
  }

  // Si es un string numérico (ej: "16", "1rem"), intentar parsearlo
  if (typeof spacing === "string") {
    // Si contiene "rem", convertir a px (asumiendo 1rem = 16px)
    if (spacing.includes("rem")) {
      const remValue = parseFloat(spacing);
      return remValue * 16;
    }

    // Si contiene "px", extraer el número
    if (spacing.includes("px")) {
      return parseFloat(spacing);
    }

    // Si es solo un número como string
    const numValue = parseFloat(spacing);
    if (!isNaN(numValue)) {
      return numValue;
    }
  }

  // Si es un valor estándar o legacy, normalizarlo y obtener valor
  const normalized = normalizeLegacySpacing(spacing);
  if (typeof normalized === "string" && SPACING_VALUES[normalized as StandardSpacing]) {
    return SPACING_VALUES[normalized as StandardSpacing];
  }

  // Fallback
  return SPACING_VALUES.md;
}

/**
 * Convierte un valor de spacing a string CSS
 */
export function getSpacingCSS(spacing: AllSpacing, unit: string = "px"): string {
  const value = getSpacingValue(spacing);
  return `${value}${unit}`;
}

// =====================================
// 5. UTILIDADES PARA MÚLTIPLES LADOS
// =====================================

export type SpacingDirection = "top" | "right" | "bottom" | "left" | "vertical" | "horizontal" | "all";

export interface SpacingConfig {
  top?: AllSpacing;
  right?: AllSpacing;
  bottom?: AllSpacing;
  left?: AllSpacing;
  vertical?: AllSpacing; // top + bottom
  horizontal?: AllSpacing; // left + right
  all?: AllSpacing; // todos los lados
}

/**
 * Genera CSS para múltiples direcciones de spacing
 */
export function generateSpacingCSS(
  config: SpacingConfig | AllSpacing,
  property: "margin" | "padding" = "padding"
): string {
  // Si es un valor simple, aplicar a todos los lados
  if (typeof config !== "object" || config === null) {
    return `${property}: ${getSpacingCSS(config as AllSpacing)};`;
  }

  let css = "";

  // Aplicar 'all' primero si existe
  if (config.all !== undefined) {
    css += `${property}: ${getSpacingCSS(config.all)}; `;
  }

  // Aplicar direcciones específicas
  if (config.vertical !== undefined) {
    css += `${property}-top: ${getSpacingCSS(config.vertical)}; `;
    css += `${property}-bottom: ${getSpacingCSS(config.vertical)}; `;
  }

  if (config.horizontal !== undefined) {
    css += `${property}-left: ${getSpacingCSS(config.horizontal)}; `;
    css += `${property}-right: ${getSpacingCSS(config.horizontal)}; `;
  }

  // Aplicar lados individuales (sobrescriben vertical/horizontal)
  if (config.top !== undefined) {
    css += `${property}-top: ${getSpacingCSS(config.top)}; `;
  }
  if (config.right !== undefined) {
    css += `${property}-right: ${getSpacingCSS(config.right)}; `;
  }
  if (config.bottom !== undefined) {
    css += `${property}-bottom: ${getSpacingCSS(config.bottom)}; `;
  }
  if (config.left !== undefined) {
    css += `${property}-left: ${getSpacingCSS(config.left)}; `;
  }

  return css.trim();
}

// =====================================
// 6. ESPACIADO RESPONSIVO
// =====================================

export interface ResponsiveSpacing {
  xs?: AllSpacing;
  sm?: AllSpacing;
  md?: AllSpacing;
  lg?: AllSpacing;
  xl?: AllSpacing;
}

/**
 * Genera CSS responsivo para spacing
 */
export function generateResponsiveSpacingCSS(
  responsive: ResponsiveSpacing,
  property: "margin" | "padding" = "padding",
  breakpoints: Record<string, number> = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
): string {
  let css = "";

  // Base (xs)
  if (responsive.xs !== undefined) {
    css += `${property}: ${getSpacingCSS(responsive.xs)}; `;
  }

  // Media queries para otros breakpoints
  Object.entries(responsive).forEach(([breakpoint, spacing]) => {
    if (breakpoint === "xs" || spacing === undefined) return;

    const minWidth = breakpoints[breakpoint];
    if (minWidth) {
      css += `@media (min-width: ${minWidth}px) { ${property}: ${getSpacingCSS(spacing)}; } `;
    }
  });

  return css.trim();
}

// =====================================
// 7. UTILIDADES PARA FLEXBOX
// =====================================

/**
 * Genera CSS para gap de Flexbox/Grid
 */
export function generateGapCSS(
  gap: AllSpacing,
  rowGap?: AllSpacing,
  columnGap?: AllSpacing
): string {
  let css = `gap: ${getSpacingCSS(gap)}; `;

  if (rowGap !== undefined) {
    css += `row-gap: ${getSpacingCSS(rowGap)}; `;
  }

  if (columnGap !== undefined) {
    css += `column-gap: ${getSpacingCSS(columnGap)}; `;
  }

  return css.trim();
}

// =====================================
// 8. PROPS TYPES HELPERS
// =====================================

export interface SpacingProps {
  margin?: SpacingConfig | AllSpacing;
  padding?: SpacingConfig | AllSpacing;
  gap?: AllSpacing;
  rowGap?: AllSpacing;
  columnGap?: AllSpacing;
}

// =====================================
// 9. HOOK PERSONALIZADO
// =====================================

export function useSpacing(props: SpacingProps) {
  const marginCSS = props.margin ? generateSpacingCSS(props.margin, "margin") : "";
  const paddingCSS = props.padding ? generateSpacingCSS(props.padding, "padding") : "";
  const gapCSS = props.gap || props.rowGap || props.columnGap
    ? generateGapCSS(props.gap || 0, props.rowGap, props.columnGap)
    : "";

  return {
    marginCSS,
    paddingCSS,
    gapCSS,
    allCSS: [marginCSS, paddingCSS, gapCSS].filter(Boolean).join(" ")
  };
}

/**
 * EJEMPLOS DE USO:
 * 
 * // Spacing simple
 * padding: ${getSpacingCSS("md")}; // → padding: 16px;
 * margin: ${getSpacingCSS("large")}; // → margin: 24px; (legacy)
 * 
 * // Spacing múltiple
 * ${generateSpacingCSS({ vertical: "lg", horizontal: "sm" }, "padding")}
 * // → padding-top: 24px; padding-bottom: 24px; padding-left: 8px; padding-right: 8px;
 * 
 * // Gap para flexbox
 * ${generateGapCSS("md", "sm", "lg")} 
 * // → gap: 16px; row-gap: 8px; column-gap: 24px;
 * 
 * // En componente con hook
 * const { allCSS } = useSpacing({ padding: "lg", margin: { vertical: "md" } });
 */
