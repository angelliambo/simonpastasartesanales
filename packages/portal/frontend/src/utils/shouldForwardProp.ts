/**
 * Helper centralizado para shouldForwardProp
 * 
 * Filtra props que no deben pasarse al DOM para evitar warnings de React.
 * Estas props son usadas solo para estilos en styled-components.
 * 
 * Props comunes que se filtran:
 * - Props de estilo: gap, colors, variant, weight, margin, padding, shadow
 * - Props de estado: isSelected, isActive, isFlipped, isMatched, isCompleted, etc.
 * - Props de accesibilidad: accessibility
 * - Props de posición: position, align
 * - Props de tamaño: size, maxWidth, height
 * - Props de juego/actividad: level, difficulty, intensity, timeLeft, totalTime
 * - Props de categoría: categoryColor, emotion, isMissing, isCounted
 * 
 * @param additionalProps - Props adicionales a filtrar (opcional)
 * @returns Función shouldForwardProp para usar en styled-components
 * 
 * @example
 * ```tsx
 * const StyledButton = styled(Button).withConfig({
 *   shouldForwardProp: createShouldForwardProp(['isSelected', 'variant'])
 * })<{ isSelected: boolean; variant: string }>`
 *   // estilos
 * `;
 * ```
 */
export const createShouldForwardProp = (
  additionalProps: string[] = []
): ((prop: string) => boolean) => {
  // Props comunes que NUNCA deben pasarse al DOM
  const defaultFilteredProps = [
    // Props de estilo
    "gap",
    "colors",
    "variant",
    "weight",
    "margin",
    "padding",
    "shadow",
    "color",
    "size",
    "maxWidth",
    "height",
    "position",
    "align",
    
    // Props de estado UI
    "isSelected",
    "isActive",
    "isFlipped",
    "isMatched",
    "isCompleted",
    "isMissing",
    "isCounted",
    "isProcessing",
    "isListening",
    
    // Props de accesibilidad
    "accessibility",
    
    // Props de juego/actividad
    "level",
    "difficulty",
    "intensity",
    "timeLeft",
    "totalTime",
    "emotion",
    
    // Props de categoría/color
    "categoryColor",
    "category",
    
    // Props de dirección (para Space, Flex)
    "$direction",
    "$size",
    "$spinning",
    "$strength",
    "$height",
    "$index",
    
    // Props de estado booleano
    "$disabled",
  ];

  const allFilteredProps = [...defaultFilteredProps, ...additionalProps];

  return (prop: string): boolean => {
    // Filtrar props que comienzan con $ (convención de styled-components)
    if (prop.startsWith("$")) {
      return false;
    }

    // Filtrar props en la lista
    return !allFilteredProps.includes(prop);
  };
};

/**
 * Lista completa de props que deben filtrarse (para documentación)
 */
export const FILTERED_PROPS = {
  style: [
    "gap",
    "colors",
    "variant",
    "weight",
    "margin",
    "padding",
    "shadow",
    "color",
    "size",
    "maxWidth",
    "height",
    "position",
    "align",
  ],
  state: [
    "isSelected",
    "isActive",
    "isFlipped",
    "isMatched",
    "isCompleted",
    "isMissing",
    "isCounted",
    "isProcessing",
    "isListening",
  ],
  accessibility: ["accessibility"],
  game: ["level", "difficulty", "intensity", "timeLeft", "totalTime", "emotion"],
  category: ["categoryColor", "category"],
  styled: ["$direction", "$size", "$spinning", "$strength", "$height", "$index", "$disabled"],
} as const;

