/**
 * SHARED UI SYSTEMS - INDEX
 * 
 * Exportaciones centralizadas de todos los sistemas compartidos
 * para uso consistente entre componentes UI.
 */

// =====================================
// SIZES SYSTEM
// =====================================
export {
  // Types
  type StandardSize,
  type LegacySize,
  type AllSize,
  type ButtonSize,
  type CardSize,
  type TextSize,
  type MinimalSize,
  type StandardSizeSet,
  type ExtendedSizeSet,
  type SizeProps,

  // Constants
  SIZE_VALUES,
  SIZE_SPACING_VALUES,
  SIZE_MAP,
  BUTTON_SIZES,
  CARD_SIZES,
  TEXT_SIZES,
  MINIMAL_SIZES,
  STANDARD_SIZES,
  EXTENDED_SIZES,

  // Functions
  normalizeLegacySize,
  mapSizeToAvailable,
  mapButtonSize,
  mapCardSize,
  mapTextSize,
  getSizeValue,
  getSizeValueWithMultiplier,
  getSizeSpacingValue,
  generateSizeCSS,
  isValidSize,
  debugSizeMapping,
  useMappedSize,
} from "./sizes";

// =====================================
// VARIANTS SYSTEM
// =====================================
export {
  // Types
  type StandardVariant,
  type LegacyVariant,
  type AllVariant,
  type ButtonVariant,
  type AlertVariant,
  type CardVariant,
  type TextVariant,
  type SemanticVariant,
  type BasicVariant,
  type ExtendedVariant,

  // Constants
  VARIANT_MAP,
  BUTTON_VARIANTS,
  ALERT_VARIANTS,
  CARD_VARIANTS,
  TEXT_VARIANTS,
  SEMANTIC_VARIANTS,
  BASIC_VARIANTS,
  EXTENDED_VARIANTS,

  // Functions
  normalizeLegacyVariant,
  mapVariantToAvailable,
  mapButtonVariant,
  mapAlertVariant,
  mapTextVariant,
  isValidVariant,
  useMappedVariant,
} from "./variants";

// =====================================
// SPACING SYSTEM
// =====================================
export {
  // Types
  type StandardSpacing,
  type LegacySpacing,
  type AllSpacing,
  type SpacingDirection,
  type SpacingConfig,
  type ResponsiveSpacing,
  type SpacingProps,

  // Constants
  SPACING_MAP,

  // Functions
  normalizeLegacySpacing,
  getSpacingValue,
  getSpacingCSS,
  generateSpacingCSS,
  generateResponsiveSpacingCSS,
  generateGapCSS,
  useSpacing,
} from "./spacing";

// =====================================
// RADIUS SYSTEM
// =====================================
export {
  // Types
  type StandardRadius,
  type LegacyRadius,
  type AllRadius,
  type RadiusConfig,
  type ButtonRadius,
  type CardRadius,
  type InputRadius,
  type RadiusProps,

  // Constants
  RADIUS_VALUES,
  RADIUS_MAP,
  BUTTON_RADIUS,
  CARD_RADIUS,
  INPUT_RADIUS,

  // Functions
  normalizeLegacyRadius,
  getRadiusValue,
  getRadiusCSS,
  generateRadiusCSS,
  mapRadiusToAvailable,
  mapButtonRadius,
  mapCardRadius,
  mapInputRadius,
  isValidRadius,
  useRadius,
} from "./radius";

// =====================================
// EJEMPLOS DE USO
// =====================================

/**
 * EJEMPLOS DE USO:
 * 
 * // En un componente Button
 * import { mapButtonSize, mapButtonVariant } from "../shared";
 * 
 * const Button = ({ size = "md", variant = "primary" }) => {
 *   const mappedSize = mapButtonSize(size);      // "small" → "sm", xxl → "xl"
 *   const mappedVariant = mapButtonVariant(variant); // "danger" → "error"
 *   
 *   return <StyledButton $size={mappedSize} $variant={mappedVariant} />;
 * };
 * 
 * // En un componente Card
 * import { mapCardSize, getSpacingValue } from "../shared";
 * 
 * const Card = ({ size = "md", padding = "md" }) => {
 *   const mappedSize = mapCardSize(size);
 *   const paddingValue = getSpacingValue(padding);
 *   
 *   return <StyledCard $size={mappedSize} style={{ padding: paddingValue }} />;
 * };
 */
