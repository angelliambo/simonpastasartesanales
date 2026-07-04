/**
 * SISTEMA UNIFICADO DE VARIANTES - SHARED VARIANTS
 * 
 * Sistema centralizado para manejar variantes de color/tipo
 * de forma consistente entre todos los componentes UI.
 */

// =====================================
// 1. VARIANTES ESTÁNDAR UNIFICADAS  
// =====================================

export type StandardVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outlined"
  | "inverse"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ghost"
  | "link";

export type LegacyVariant =
  | "default"
  | "danger"
  | "confirm"
  | "cancel";

export type AllVariant = StandardVariant | LegacyVariant;

// =====================================
// 2. MAPEOS DE COMPATIBILIDAD LEGACY
// =====================================

export const VARIANT_MAP: Record<LegacyVariant, StandardVariant> = {
  default: "primary",
  danger: "error",
  confirm: "success",
  cancel: "secondary",
};

// Función para normalizar variantes legacy a estándar
export const normalizeLegacyVariant = (variant: AllVariant): StandardVariant => {
  return VARIANT_MAP[variant as LegacyVariant] || (variant as StandardVariant);
};

// =====================================
// 3. MAPEO INTELIGENTE POR COMPONENTE
// =====================================

/**
 * Mapea una variante solicitada a la variante más cercana disponible
 * en el componente específico.
 */
export function mapVariantToAvailable<T extends StandardVariant>(
  requestedVariant: AllVariant,
  availableVariants: readonly T[]
): T {
  // 1. Normalizar variante legacy si es necesario
  const normalizedVariant = normalizeLegacyVariant(requestedVariant);

  // 2. Si la variante está disponible, devolverla
  if (availableVariants.includes(normalizedVariant as T)) {
    return normalizedVariant as T;
  }

  // 3. Mapeo de fallback por prioridad
  const fallbackOrder: StandardVariant[] = [
    "primary", "secondary", "tertiary", "success", "warning", "error", "info"
  ];

  // 4. Encontrar la primera variante disponible en orden de prioridad
  for (const fallback of fallbackOrder) {
    if (availableVariants.includes(fallback as T)) {
      return fallback as T;
    }
  }

  // 5. Último recurso: primera disponible
  return availableVariants[0];
}

// =====================================
// 4. DEFINICIONES POR COMPONENTE
// =====================================

// Button: Todas las variantes disponibles
export const BUTTON_VARIANTS = [
  "primary", "secondary", "tertiary", "outlined", "success", "warning", "error", "info", "ghost", "link"
] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

export function mapButtonVariant(variant: AllVariant): ButtonVariant {
  return mapVariantToAvailable(variant, BUTTON_VARIANTS);
}

// Alert: Variantes específicas para alertas
export const ALERT_VARIANTS = ["success", "warning", "error", "info"] as const;
export type AlertVariant = typeof ALERT_VARIANTS[number];

export function mapAlertVariant(variant: AllVariant): AlertVariant {
  return mapVariantToAvailable(variant, ALERT_VARIANTS);
}

// Card: Variantes de estilo de card
export const CARD_VARIANTS = ["default", "elevated", "outlined", "filled"] as const;
export type CardVariant = typeof CARD_VARIANTS[number];

// Text: Variantes de color semántico
export const TEXT_VARIANTS = [
  "primary", "secondary", "tertiary", "inverse", "success", "warning", "error", "info"
] as const;
export type TextVariant = typeof TEXT_VARIANTS[number];

export function mapTextVariant(variant: AllVariant): TextVariant {
  return mapVariantToAvailable(variant, TEXT_VARIANTS);
}

// =====================================
// 5. CONJUNTOS PREDEFINIDOS
// =====================================

// Conjuntos comunes de variantes para diferentes tipos de componentes
export const SEMANTIC_VARIANTS = ["success", "warning", "error", "info"] as const;
export const BASIC_VARIANTS = ["primary", "secondary"] as const;
export const EXTENDED_VARIANTS = ["primary", "secondary", "tertiary"] as const;

export type SemanticVariant = typeof SEMANTIC_VARIANTS[number];
export type BasicVariant = typeof BASIC_VARIANTS[number];
export type ExtendedVariant = typeof EXTENDED_VARIANTS[number];

// =====================================
// 6. UTILIDADES
// =====================================

// Función para validar si una variante es válida
export function isValidVariant(variant: string): variant is AllVariant {
  const allVariants: AllVariant[] = [
    ...Object.keys({ primary: 1, secondary: 1, tertiary: 1, success: 1, warning: 1, error: 1, info: 1 }) as StandardVariant[],
    ...Object.keys(VARIANT_MAP) as LegacyVariant[]
  ];
  return allVariants.includes(variant as AllVariant);
}

// Hook personalizado para usar en componentes
export function useMappedVariant<T extends StandardVariant>(
  requestedVariant: AllVariant | undefined,
  availableVariants: readonly T[],
  defaultVariant: T
): T {
  if (!requestedVariant) return defaultVariant;
  return mapVariantToAvailable(requestedVariant, availableVariants);
}

/**
 * EJEMPLOS DE USO:
 * 
 * // En un componente Alert que solo acepta variantes semánticas
 * const alertVariant = mapAlertVariant("primary"); // → "info" (fallback)
 * const alertVariant2 = mapAlertVariant("danger"); // → "error" (legacy mapping)
 * 
 * // En un componente Button con todas las variantes
 * const buttonVariant = mapButtonVariant("confirm"); // → "success" (legacy mapping)
 */
