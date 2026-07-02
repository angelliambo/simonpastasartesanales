import React from "react";
import { SpaceProps, SPACE_DEFAULTS } from "./Space.types";
import {
  StyledSpace,
  SpaceItem,
  SpaceSplit,
  CompactSpace,
  ComfortableSpace,
  ToolbarSpace,
  GridSpace,
} from "./Space.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { getSpacingValue } from "../shared";

/**
 * Space Component - Componente de espaciado flexbox unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ AllSize/AllSpacing para props size
 * - ✅ mapSizeToAvailable() para mapeo inteligente
 * - ✅ getSpacingValue() para valores consistentes
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Props semánticas y responsive behavior
 *
 * Reemplazo directo de Ant Design Space pero con nuestro sistema unificado.
 */
export const Space: React.FC<SpaceProps> = ({
  children,
  size = SPACE_DEFAULTS.size,
  direction = SPACE_DEFAULTS.direction,
  align = SPACE_DEFAULTS.align,
  justify = SPACE_DEFAULTS.justify,
  wrap = SPACE_DEFAULTS.wrap,
  split,
  responsive,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  role,
  id,
  // Spacing props del shared system
  margin,
  padding,
  gap,
  rowGap,
  columnGap,
  ...rest
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  // Space acepta tanto AllSize como AllSpacing, usar directamente getSpacingValue que maneja ambos
  const gapValue = getSpacingValue(size);

  // Procesar children en array
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  if (childrenArray.length === 0) {
    return null;
  }

  // Aplicar estilos de accesibilidad dinámicos
  const getAccessibilityStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    // Increased spacing multiplier
    if (accessibility.increasedSpacing) {
      const multiplier = accessibility.spacingMultiplier || 1.5;
      // No podemos usar setProperty en CSSProperties, usar gap directamente
      styles.gap = `${gapValue * multiplier}px`;
    }

    // Spacing adicional del shared system
    if (margin) {
      styles.margin =
        typeof margin === "object"
          ? Object.entries(margin)
              .map(([key, value]) => `${key}: ${getSpacingValue(value)}px`)
              .join("; ")
          : `${getSpacingValue(margin)}px`;
    }

    if (padding) {
      styles.padding =
        typeof padding === "object"
          ? Object.entries(padding)
              .map(([key, value]) => `${key}: ${getSpacingValue(value)}px`)
              .join("; ")
          : `${getSpacingValue(padding)}px`;
    }

    return styles;
  };

  const finalId = id ? `space-${id}` : undefined;

  // Renderizar children con split si se especifica
  const renderChildren = () => {
    return childrenArray.map((child, index) => {
      const isLast = index === childrenArray.length - 1;

      return (
        <React.Fragment key={index}>
          <SpaceItem
            $isLast={isLast}
            $hasSplit={!!split}
            accessibility={accessibility}
          >
            {child}
          </SpaceItem>

          {/* Renderizar split divisor si no es el último elemento */}
          {!isLast && split && (
            <SpaceSplit $direction={direction} accessibility={accessibility}>
              {split}
            </SpaceSplit>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <StyledSpace
      id={finalId}
      className={className}
      style={{
        ...getAccessibilityStyles(),
        ...style,
      }}
      role={role}
      aria-label={ariaLabel}
      // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
      $direction={direction}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      $gap={gapValue} // ← Valor mapeado del shared system
      $responsive={responsive}
      accessibility={accessibility}
      {...rest}
    >
      {renderChildren()}
    </StyledSpace>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS
// =====================================

// Space horizontal compacto
export const HorizontalSpace: React.FC<Omit<SpaceProps, "direction">> = (
  props
) => <Space direction="horizontal" {...props} />;

// Space vertical
export const VerticalSpace: React.FC<Omit<SpaceProps, "direction">> = (
  props
) => <Space direction="vertical" {...props} />;

// Space compacto (xs gap)
export const Compact: React.FC<SpaceProps> = (props) => (
  <CompactSpace as={Space} size="xs" {...props} />
);

// Space cómodo (xl gap)
export const Comfortable: React.FC<SpaceProps> = (props) => (
  <ComfortableSpace as={Space} size="xl" {...props} />
);

// Space para listas (renombrado para evitar conflicto con List component)
export const VerticalListSpace: React.FC<SpaceProps> = (props) => (
  <StyledSpace direction="vertical" {...props} />
);

// Space para toolbars
export const Toolbar: React.FC<SpaceProps> = (props) => (
  <ToolbarSpace
    as={Space}
    direction="horizontal"
    justify="space-between"
    {...props}
  />
);

// Space para grids responsivos
export const Grid: React.FC<SpaceProps> = (props) => (
  <GridSpace as={Space} direction="horizontal" wrap={true} {...props} />
);

// Space centrado
export const Centered: React.FC<SpaceProps> = (props) => (
  <Space align="center" justify="center" {...props} />
);

// Space distribuido uniformemente
export const Even: React.FC<SpaceProps> = (props) => (
  <Space justify="space-evenly" {...props} />
);

// Space con separación entre elementos
export const Between: React.FC<SpaceProps> = (props) => (
  <Space justify="space-between" {...props} />
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Space size="small" direction="vertical">  // "small" → "sm" automáticamente
 *   <Button>Item 1</Button>
 *   <Button>Item 2</Button>
 * </Space>
 *
 * // Con split divisor
 * <Space size="md" split={<Divider type="vertical" />}>
 *   <Button>Left</Button>
 *   <Button>Right</Button>
 * </Space>
 *
 * // Responsive con shared system
 * <Space
 *   size="lg"
 *   responsive={{ xs: "sm", md: "lg", xl: "xxl" }}
 *   wrap
 * >
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 * </Space>
 *
 * // Componentes predefinidos
 * <Toolbar>
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </Toolbar>
 *
 * <Grid size="xl">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // Con props de spacing del shared system
 * <Space
 *   size="md"
 *   padding={{ vertical: "lg", horizontal: "sm" }}
 *   margin="xl"
 * >
 *   Content with unified spacing
 * </Space>
 */

// Export por defecto
export default Space;
