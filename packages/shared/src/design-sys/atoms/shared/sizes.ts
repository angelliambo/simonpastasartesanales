/**
 * SISTEMA UNIFICADO DE MEDIDAS - SHARED SIZES
 * 
 * Sistema centralizado para manejar tamaños de forma consistente
 * entre todos los componentes UI, con mapeo inteligente y 
 * compatibilidad legacy automática.
 */

// =====================================
// 1. TAMAÑOS ESTÁNDAR UNIFICADOS
// =====================================

export type StandardSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type LegacySize = "small" | "medium" | "large";

export type AllSize = StandardSize | LegacySize;

// =====================================
// 2. MAPEOS DE COMPATIBILIDAD LEGACY
// =====================================

export const SIZE_MAP: Record<LegacySize, StandardSize> = {
  small: "sm",
  medium: "md",
  large: "lg",
};

// Función para normalizar tamaños legacy a estándar
export const normalizeLegacySize = (size: AllSize): StandardSize => {
  return SIZE_MAP[size as LegacySize] || (size as StandardSize);
};

// =====================================
// 3. MAPEO INTELIGENTE POR COMPONENTE
// =====================================

/**
 * Mapea un tamaño solicitado al tamaño más cercano disponible
 * en el componente específico.
 * 
 * Ejemplos:
 * - Componente acepta [sm, md, lg], usuario pasa xs → devuelve sm
 * - Componente acepta [sm, md, lg], usuario pasa xxl → devuelve lg
 * - Componente acepta [xs, sm, md], usuario pasa xl → devuelve md
 */
export function mapSizeToAvailable<T extends StandardSize>(
  requestedSize: AllSize,
  availableSizes: readonly T[]
): T {
  // 1. Normalizar size legacy si es necesario
  const normalizedSize = normalizeLegacySize(requestedSize);

  // 2. Si el tamaño está disponible, devolverlo
  if (availableSizes.includes(normalizedSize as T)) {
    return normalizedSize as T;
  }

  // 3. Orden de tamaños para mapeo inteligente
  const sizeOrder: StandardSize[] = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const requestedIndex = sizeOrder.indexOf(normalizedSize);

  // 4. Encontrar el tamaño más cercano disponible
  let closestSize = availableSizes[0]; // fallback
  let minDistance = Infinity;

  for (const availableSize of availableSizes) {
    const availableIndex = sizeOrder.indexOf(availableSize);
    const distance = Math.abs(requestedIndex - availableIndex);

    if (distance < minDistance) {
      minDistance = distance;
      closestSize = availableSize;
    }
  }

  return closestSize;
}

// =====================================
// 4. DEFINICIONES POR COMPONENTE
// =====================================

// Button: Todos los tamaños disponibles
export const BUTTON_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type ButtonSize = typeof BUTTON_SIZES[number];

export function mapButtonSize(size: AllSize): ButtonSize {
  return mapSizeToAvailable(size, BUTTON_SIZES);
}

// Card: Tamaños específicos para cards
export const CARD_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type CardSize = typeof CARD_SIZES[number];

export function mapCardSize(size: AllSize): CardSize {
  return mapSizeToAvailable(size, CARD_SIZES);
}

// Text: Tamaños tipográficos extendidos
export const TEXT_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export type TextSize = typeof TEXT_SIZES[number];

export function mapTextSize(size: AllSize): TextSize {
  return mapSizeToAvailable(size, TEXT_SIZES);
}

// =====================================
// 5. UTILIDADES DE VALORES NUMÉRICOS
// =====================================

// Valores en píxeles para cada tamaño (base 16px)
export const SIZE_VALUES: Record<StandardSize, number> = {
  xs: 12,    // 0.75rem
  sm: 14,    // 0.875rem  
  md: 16,    // 1rem (base)
  lg: 18,    // 1.125rem
  xl: 20,    // 1.25rem
  xxl: 24,   // 1.5rem
};

// Función para obtener el valor numérico de un tamaño
export function getSizeValue(size: AllSize): number {
  const normalizedSize = normalizeLegacySize(size);
  return SIZE_VALUES[normalizedSize];
}

// Función para obtener el valor con multiplicador (para espaciado)
export function getSizeValueWithMultiplier(
  size: AllSize,
  multiplier: number = 1
): number {
  return getSizeValue(size) * multiplier;
}

// =====================================
// 6. HELPERS PARA STYLED-COMPONENTS
// =====================================

// Helper para generar CSS con tamaños responsivos
export function generateSizeCSS(
  size: AllSize,
  property: string = "font-size",
  unit: string = "px"
): string {
  const value = getSizeValue(size);
  return `${property}: ${value}${unit};`;
}

// Helper para spacing (padding, margin) - DEPRECATED: usar spacing.ts
export const SIZE_SPACING_VALUES: Record<StandardSize, number> = {
  xs: 4,     // 0.25rem
  sm: 8,     // 0.5rem
  md: 16,    // 1rem
  lg: 24,    // 1.5rem  
  xl: 32,    // 2rem
  xxl: 48,   // 3rem
};

export function getSizeSpacingValue(size: AllSize): number {
  const normalizedSize = normalizeLegacySize(size);
  return SIZE_SPACING_VALUES[normalizedSize];
}

// =====================================
// 7. VALIDACIONES Y DEBUGGING
// =====================================

// Función para validar si un tamaño es válido
export function isValidSize(size: string): size is AllSize {
  const allSizes: AllSize[] = [...Object.keys(SIZE_VALUES) as StandardSize[], ...Object.keys(SIZE_MAP) as LegacySize[]];
  return allSizes.includes(size as AllSize);
}

// Función de debug para mostrar mapeos
export function debugSizeMapping(
  requestedSize: AllSize,
  availableSizes: readonly StandardSize[],
  componentName: string
): void {
  const mapped = mapSizeToAvailable(requestedSize, availableSizes);
  console.log(`[${componentName}] Size mapping: ${requestedSize} → ${mapped}`, {
    requested: requestedSize,
    available: availableSizes,
    mapped,
    normalized: normalizeLegacySize(requestedSize)
  });
}

// =====================================
// 8. TYPESCRIPT UTILITIES
// =====================================

// Utility type para crear props size con mapeo automático
export type SizeProps<T extends StandardSize = StandardSize> = {
  size?: AllSize;
  /** @internal - Tamaño normalizado y mapeado */
  _mappedSize?: T;
};

// Hook personalizado para usar en componentes
export function useMappedSize<T extends StandardSize>(
  requestedSize: AllSize | undefined,
  availableSizes: readonly T[],
  defaultSize: T
): T {
  if (!requestedSize) return defaultSize;
  return mapSizeToAvailable(requestedSize, availableSizes);
}

// =====================================
// 9. CONSTANTES PREDEFINIDAS
// =====================================

// Conjuntos comunes de tamaños para diferentes tipos de componentes
export const MINIMAL_SIZES = ["sm", "md", "lg"] as const;
export const STANDARD_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const EXTENDED_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;

export type MinimalSize = typeof MINIMAL_SIZES[number];
export type StandardSizeSet = typeof STANDARD_SIZES[number];
export type ExtendedSizeSet = typeof EXTENDED_SIZES[number];

// =====================================
// 10. EXAMPLES & DOCUMENTATION
// =====================================

/**
 * EJEMPLOS DE USO:
 * 
 * // En un componente Button que solo acepta sm, md, lg
 * const buttonSize = mapButtonSize("xs"); // → "sm" (más pequeño disponible)
 * const buttonSize2 = mapButtonSize("xxl"); // → "xl" (más grande disponible)
 * const buttonSize3 = mapButtonSize("small"); // → "sm" (legacy mapping)
 * 
 * // En un componente Card con todos los tamaños
 * const cardSize = mapCardSize("large"); // → "lg" (legacy mapping)
 * 
 * // Obtener valores numéricos
 * const fontSize = getSizeValue("md"); // → 16
 * const padding = getSpacingValue("lg"); // → 24
 * 
 * // En styled-components
 * font-size: ${getSizeValue(props.size)}px;
 * padding: ${getSpacingValue(props.size)}px;
 */
