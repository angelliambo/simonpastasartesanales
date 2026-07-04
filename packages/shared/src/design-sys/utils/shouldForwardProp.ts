/**
 * Helper centralizado para shouldForwardProp en el Design System.
 * Filtra props que no deben pasarse al DOM para evitar warnings de React.
 */
export const createShouldForwardProp = (
  additionalProps: string[] = []
): ((prop: string) => boolean) => {
  const defaultFilteredProps = [
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
    "isSelected",
    "isActive",
    "isFlipped",
    "isMatched",
    "isCompleted",
    "isMissing",
    "isCounted",
    "isProcessing",
    "isListening",
    "accessibility",
    "level",
    "difficulty",
    "intensity",
    "timeLeft",
    "totalTime",
    "emotion",
    "categoryColor",
    "category",
    "$direction",
    "$size",
    "$spinning",
    "$strength",
    "$height",
    "$index",
    "$disabled",
  ];

  const allFilteredProps = [...defaultFilteredProps, ...additionalProps];

  return (prop: string): boolean => {
    if (prop.startsWith("$")) {
      return false;
    }
    return !allFilteredProps.includes(prop);
  };
};
