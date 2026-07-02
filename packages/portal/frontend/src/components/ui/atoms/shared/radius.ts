/**
 * SISTEMA UNIFICADO DE BORDER RADIUS - SHARED RADIUS
 * 
 * Sistema centralizado para manejar border-radius
 * de forma consistente entre todos los componentes UI.
 */

// =====================================
// 1. RADIUS ESTÁNDAR UNIFICADOS
// =====================================

export type StandardRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type LegacyRadius = "small" | "medium" | "large" | "round" | "circle";

export type AllRadius = StandardRadius | LegacyRadius | number | string;

// =====================================
// 2. MAPEOS DE COMPATIBILIDAD LEGACY
// =====================================

export const RADIUS_MAP: Record<LegacyRadius, StandardRadius> = {
  small: "sm",
  medium: "md",
  large: "lg",
  round: "xl",
  circle: "full",
};

// Función para normalizar radius legacy a estándar
export const normalizeLegacyRadius = (radius: AllRadius): StandardRadius | number | string => {
  if (typeof radius === "number" || typeof radius === "string") {
    return radius;
  }
  return RADIUS_MAP[radius as LegacyRadius] || (radius as StandardRadius);
};

// =====================================
// 3. VALORES DE RADIUS EN PÍXELES
// =====================================

export const RADIUS_VALUES: Record<StandardRadius, number | string> = {
  none: 0,        // Sin border-radius
  xs: 2,          // 2px - Muy sutil
  sm: 4,          // 4px - Sutil
  md: 6,          // 6px - Estándar  
  lg: 8,          // 8px - Pronunciado
  xl: 12,         // 12px - Muy pronunciado
  full: "9999px", // Completamente redondeado
};

// =====================================
// 4. FUNCIONES DE CONVERSIÓN
// =====================================

/**
 * Convierte un valor de radius a píxeles o string CSS
 */
export function getRadiusValue(radius: AllRadius): number | string {
  // Si es un número, devolverlo directamente
  if (typeof radius === "number") {
    return radius;
  }

  // Si es un string personalizado (ej: "50%", "1rem"), devolverlo
  if (typeof radius === "string") {
    // Si contiene unidades CSS válidas, devolverlo como está
    if (radius.includes("%") || radius.includes("rem") || radius.includes("em") || radius.includes("px")) {
      return radius;
    }

    // Si es solo un número como string
    const numValue = parseFloat(radius);
    if (!isNaN(numValue)) {
      return numValue;
    }
  }

  // Si es un valor estándar o legacy, normalizarlo y obtener valor
  const normalized = normalizeLegacyRadius(radius);
  if (typeof normalized === "string" && RADIUS_VALUES[normalized as StandardRadius] !== undefined) {
    return RADIUS_VALUES[normalized as StandardRadius];
  }

  // Fallback
  return RADIUS_VALUES.md;
}

/**
 * Convierte un valor de radius a string CSS
 */
export function getRadiusCSS(radius: AllRadius): string {
  const value = getRadiusValue(radius);

  // Si ya es un string con unidades, devolverlo
  if (typeof value === "string") {
    return value;
  }

  // Si es un número, agregar 'px'
  return `${value}px`;
}

// =====================================
// 5. UTILIDADES PARA MÚLTIPLES ESQUINAS
// =====================================

export interface RadiusConfig {
  topLeft?: AllRadius;
  topRight?: AllRadius;
  bottomRight?: AllRadius;
  bottomLeft?: AllRadius;
  top?: AllRadius;      // topLeft + topRight
  bottom?: AllRadius;   // bottomLeft + bottomRight  
  left?: AllRadius;     // topLeft + bottomLeft
  right?: AllRadius;    // topRight + bottomRight
  all?: AllRadius;      // todas las esquinas
}

/**
 * Genera CSS para múltiples esquinas de border-radius
 */
export function generateRadiusCSS(config: RadiusConfig | AllRadius): string {
  // Si es un valor simple, aplicar a todas las esquinas
  if (typeof config !== "object" || config === null) {
    return `border-radius: ${getRadiusCSS(config as AllRadius)};`;
  }

  let css = "";

  // Aplicar 'all' primero si existe
  if (config.all !== undefined) {
    css += `border-radius: ${getRadiusCSS(config.all)}; `;
  }

  // Aplicar lados específicos
  if (config.top !== undefined) {
    css += `border-top-left-radius: ${getRadiusCSS(config.top)}; `;
    css += `border-top-right-radius: ${getRadiusCSS(config.top)}; `;
  }

  if (config.bottom !== undefined) {
    css += `border-bottom-left-radius: ${getRadiusCSS(config.bottom)}; `;
    css += `border-bottom-right-radius: ${getRadiusCSS(config.bottom)}; `;
  }

  if (config.left !== undefined) {
    css += `border-top-left-radius: ${getRadiusCSS(config.left)}; `;
    css += `border-bottom-left-radius: ${getRadiusCSS(config.left)}; `;
  }

  if (config.right !== undefined) {
    css += `border-top-right-radius: ${getRadiusCSS(config.right)}; `;
    css += `border-bottom-right-radius: ${getRadiusCSS(config.right)}; `;
  }

  // Aplicar esquinas individuales (sobrescriben lados)
  if (config.topLeft !== undefined) {
    css += `border-top-left-radius: ${getRadiusCSS(config.topLeft)}; `;
  }
  if (config.topRight !== undefined) {
    css += `border-top-right-radius: ${getRadiusCSS(config.topRight)}; `;
  }
  if (config.bottomRight !== undefined) {
    css += `border-bottom-right-radius: ${getRadiusCSS(config.bottomRight)}; `;
  }
  if (config.bottomLeft !== undefined) {
    css += `border-bottom-left-radius: ${getRadiusCSS(config.bottomLeft)}; `;
  }

  return css.trim();
}

// =====================================
// 6. MAPEO INTELIGENTE POR COMPONENTE
// =====================================

/**
 * Mapea un radius solicitado al radius más cercano disponible
 */
export function mapRadiusToAvailable<T extends StandardRadius>(
  requestedRadius: AllRadius,
  availableRadius: readonly T[]
): T {
  // 1. Normalizar radius legacy si es necesario
  const normalized = normalizeLegacyRadius(requestedRadius);

  // 2. Si es un valor personalizado (número/string), intentar mapear al más cercano
  if (typeof normalized === "number" || (typeof normalized === "string" && !RADIUS_VALUES[normalized as StandardRadius])) {
    const numValue = typeof normalized === "number" ? normalized : parseFloat(normalized as string);

    if (!isNaN(numValue)) {
      // Encontrar el radius estándar más cercano
      let closestRadius = availableRadius[0];
      let minDistance = Infinity;

      for (const radius of availableRadius) {
        const radiusValue = RADIUS_VALUES[radius];
        const radiusNum = typeof radiusValue === "number" ? radiusValue : 9999;
        const distance = Math.abs(numValue - radiusNum);

        if (distance < minDistance) {
          minDistance = distance;
          closestRadius = radius;
        }
      }

      return closestRadius;
    }
  }

  // 3. Si el radius está disponible, devolverlo
  if (availableRadius.includes(normalized as T)) {
    return normalized as T;
  }

  // 4. Fallback al primer disponible
  return availableRadius[0];
}

// =====================================
// 7. DEFINICIONES POR COMPONENTE
// =====================================

// Button: Radius moderados para botones
export const BUTTON_RADIUS = ["none", "xs", "sm", "md", "lg", "full"] as const;
export type ButtonRadius = typeof BUTTON_RADIUS[number];

export function mapButtonRadius(radius: AllRadius): ButtonRadius {
  return mapRadiusToAvailable(radius, BUTTON_RADIUS);
}

// Card: Radius suaves para cards
export const CARD_RADIUS = ["none", "xs", "sm", "md", "lg", "xl"] as const;
export type CardRadius = typeof CARD_RADIUS[number];

export function mapCardRadius(radius: AllRadius): CardRadius {
  return mapRadiusToAvailable(radius, CARD_RADIUS);
}

// Input: Radius sutiles para inputs
export const INPUT_RADIUS = ["none", "xs", "sm", "md"] as const;
export type InputRadius = typeof INPUT_RADIUS[number];

export function mapInputRadius(radius: AllRadius): InputRadius {
  return mapRadiusToAvailable(radius, INPUT_RADIUS);
}

// =====================================
// 8. PROPS TYPES HELPERS
// =====================================

export interface RadiusProps {
  radius?: RadiusConfig | AllRadius;
  borderRadius?: RadiusConfig | AllRadius; // Alias
}

// =====================================
// 9. HOOK PERSONALIZADO
// =====================================

export function useRadius(props: RadiusProps) {
  const radius = props.radius || props.borderRadius;
  const css = radius ? generateRadiusCSS(radius) : "";

  return {
    radiusCSS: css,
    radiusValue: radius ? getRadiusValue(radius as AllRadius) : undefined
  };
}

// =====================================
// 10. UTILIDADES
// =====================================

// Función para validar si un radius es válido
export function isValidRadius(radius: any): radius is AllRadius {
  if (typeof radius === "number") return true;
  if (typeof radius === "string") {
    const allRadius: (StandardRadius | LegacyRadius)[] = [
      ...Object.keys(RADIUS_VALUES) as StandardRadius[],
      ...Object.keys(RADIUS_MAP) as LegacyRadius[]
    ];
    return allRadius.includes(radius as any) || !isNaN(parseFloat(radius));
  }
  return false;
}

/**
 * EJEMPLOS DE USO:
 * 
 * // Radius simple
 * border-radius: ${getRadiusCSS("md")}; // → border-radius: 6px;
 * border-radius: ${getRadiusCSS("circle")}; // → border-radius: 9999px; (legacy)
 * 
 * // Radius múltiple
 * ${generateRadiusCSS({ top: "lg", bottom: "none" })}
 * // → border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;
 * 
 * // Mapeo inteligente
 * const buttonRadius = mapButtonRadius(25); // → "xl" (más cercano a 25px)
 * 
 * // En componente con hook
 * const { radiusCSS } = useRadius({ radius: "lg" });
 */
