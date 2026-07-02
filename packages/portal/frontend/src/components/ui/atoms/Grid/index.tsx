import React, { memo } from "react";
import { 
  RowProps, 
  ColProps, 
  ResponsiveColConfig,
  ROW_DEFAULTS, 
  COL_DEFAULTS,
  ColSpan 
} from "./Grid.types";
import {
  StyledRow,
  StyledCol,
  Container,
  FluidContainer,
  CompactRow,
  ComfortableRow,
  AutoCol,
  CenteredCol,
} from "./Grid.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { getSpacingValue } from "../shared";

// =====================================
// HELPER FUNCTIONS
// =====================================

// Procesar gutter usando shared systems
const processGutter = (gutter?: RowProps["gutter"]): [number, number] => {
  if (!gutter) return [0, 0];
  
  if (Array.isArray(gutter)) {
    const [horizontal, vertical] = gutter;
    return [
      typeof horizontal === "number" ? horizontal : getSpacingValue(horizontal),
      typeof vertical === "number" ? vertical : getSpacingValue(vertical)
    ];
  }
  
  // Single value se aplica como horizontal gutter
  const value = typeof gutter === "number" ? gutter : getSpacingValue(gutter);
  return [value, 0];
};

// Procesar responsive config
const processResponsiveConfig = (
  config?: ColSpan | ResponsiveColConfig
): ResponsiveColConfig | undefined => {
  if (!config) return undefined;
  
  // Si es un número, es el span
  if (typeof config === "number") {
    return { span: config };
  }
  
  // Si es objeto, devolverlo tal como está
  return config;
};

// =====================================
// ROW COMPONENT
// =====================================

/**
 * Row Component - Container flexbox del Grid System
 * 
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ gutter acepta AllSize con mapeo automático
 * - ✅ getSpacingValue() para valores consistentes
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Row
 * 
 * Reemplazo directo de Ant Design Row con sistema unificado.
 */
export const Row = memo<RowProps>(({
  children,
  gutter = ROW_DEFAULTS.gutter,
  align = ROW_DEFAULTS.align,
  justify = ROW_DEFAULTS.justify,
  wrap = ROW_DEFAULTS.wrap,
  className,
  style,
  id,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  role,
  // Spacing props del shared system
  margin,
  padding,
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
  const processedGutter = processGutter(gutter);
  
  // Aplicar estilos de accesibilidad dinámicos
  const getAccessibilityStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    // Spacing adicional del shared system
    if (margin) {
      styles.margin = typeof margin === "object"
        ? Object.entries(margin)
            .map(([key, value]) => `${key}: ${getSpacingValue(value)}px`)
            .join("; ")
        : `${getSpacingValue(margin)}px`;
    }
    
    if (padding) {
      styles.padding = typeof padding === "object"
        ? Object.entries(padding)
            .map(([key, value]) => `${key}: ${getSpacingValue(value)}px`)
            .join("; ")
        : `${getSpacingValue(padding)}px`;
    }
    
    return styles;
  };

  // Pasar gutter context a children
  const childrenWithGutter = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type === Col || 
        (child.type as any)?.displayName?.includes('Col'))) {
      return React.cloneElement(child, {
        ...(child.props || {}),
        __gutter: processedGutter, // Prop interno para pasar gutter
      } as any);
    }
    return child;
  });

  const finalId = id ? `row-${id}` : undefined;

  return (
    <StyledRow
      id={finalId}
      className={className}
      style={{
        ...getAccessibilityStyles(),
        ...style,
      }}
      role={role || "row"}
      aria-label={ariaLabel}
      
      // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
      $gutter={processedGutter}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      accessibility={accessibility}
      
      {...rest}
    >
      {childrenWithGutter}
    </StyledRow>
  );
});

Row.displayName = "Row";

// =====================================
// COL COMPONENT  
// =====================================

/**
 * Col Component - Columna individual del Grid System
 * 
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ Sistema de 24 columnas (1-24)
 * - ✅ Responsive breakpoints: xs, sm, md, lg, xl, xxl
 * - ✅ Gutter heredado del Row parent automáticamente
 * - ✅ Compatible 100% con Ant Design Col
 * 
 * Reemplazo directo de Ant Design Col con sistema unificado.
 */
export const Col = memo<ColProps & { __gutter?: [number, number] }>(({
  children,
  span = COL_DEFAULTS.span,
  offset = COL_DEFAULTS.offset,
  order = COL_DEFAULTS.order,
  pull,
  push,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
  style,
  id,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  role,
  // Props internos
  __gutter,
  // Spacing props del shared system
  margin,
  padding,
  ...rest
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)  
  const { accessibility: contextAccessibility } = usePersonalization();
  
  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };
  
  // Aplicar estilos de accesibilidad dinámicos
  const getAccessibilityStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    // Spacing adicional del shared system
    if (margin) {
      styles.margin = typeof margin === "object"
        ? Object.entries(margin)
            .map(([key, value]) => `${key}: ${getSpacingValue(value)}px`)
            .join("; ")
        : `${getSpacingValue(margin)}px`;
    }
    
    if (padding) {
      styles.padding = typeof padding === "object"
        ? Object.entries(padding)
            .map(([key, value]) => `${key}: ${getSpacingValue(value)}px`)
            .join("; ")
        : `${getSpacingValue(padding)}px`;
    }
    
    return styles;
  };

  const finalId = id ? `col-${id}` : undefined;

  return (
    <StyledCol
      id={finalId}
      className={className}
      style={{
        ...getAccessibilityStyles(),
        ...style,
      }}
      role={role}
      aria-label={ariaLabel}
      
      // 🎯 STYLED PROPS SISTEMA 24 COLUMNAS
      $span={span}
      $offset={offset}
      $order={order}
      $pull={pull}
      $push={push}
      $gutter={__gutter || [0, 0]}
      
      // 🎯 RESPONSIVE BREAKPOINTS
      $xs={processResponsiveConfig(xs)}
      $sm={processResponsiveConfig(sm)}
      $md={processResponsiveConfig(md)}
      $lg={processResponsiveConfig(lg)}
      $xl={processResponsiveConfig(xl)}
      $xxl={processResponsiveConfig(xxl)}
      
      accessibility={accessibility}
      
      {...rest}
    >
      {children}
    </StyledCol>
  );
});

Col.displayName = "Col";

// =====================================
// COMPONENTES PREDEFINIDOS
// =====================================

// Container con max-width responsivo
export const GridContainer: React.FC<Omit<RowProps, "as">> = (props) => (
  <Container as={Row} {...props} />
);

// Container fluido (sin max-width)
export const FluidRow: React.FC<RowProps> = (props) => (
  <FluidContainer as={Row} {...props} />
);

// Row sin gutter  
export const NoGutterRow: React.FC<RowProps> = (props) => (
  <Row gutter={[0, 0]} {...props} />
);

// Row con gutter compacto
export const CompactGrid: React.FC<RowProps> = (props) => (
  <CompactRow as={Row} gutter="xs" {...props} />
);

// Row con gutter cómodo
export const ComfortableGrid: React.FC<RowProps> = (props) => (
  <ComfortableRow as={Row} gutter="xl" {...props} />
);

// Row centrado
export const CenteredRow: React.FC<RowProps> = (props) => (
  <Row justify="center" align="middle" {...props} />
);

// =====================================
// COL PREDEFINIDOS
// =====================================

// Col auto (ancho basado en contenido)
export const AutoColumn: React.FC<ColProps> = (props) => (
  <AutoCol as={Col} span={undefined as any} {...props} />
);

// Col centrado  
export const CenteredColumn: React.FC<ColProps> = (props) => (
  <CenteredCol as={Col} {...props} />
);

// Columnas predefinidas comunes
export const HalfCol: React.FC<Omit<ColProps, "span">> = (props) => (
  <Col span={12} {...props} />
);

export const ThirdCol: React.FC<Omit<ColProps, "span">> = (props) => (
  <Col span={8} {...props} />
);

export const QuarterCol: React.FC<Omit<ColProps, "span">> = (props) => (
  <Col span={6} {...props} />
);

export const FullCol: React.FC<Omit<ColProps, "span">> = (props) => (
  <Col span={24} {...props} />
);

// =====================================
// RESPONSIVE HELPERS
// =====================================

// Col responsive común para mobile-first
export const ResponsiveCol: React.FC<ColProps> = (props) => (
  <Col
    xs={24}  // Full width en mobile
    sm={12}  // Half width en tablet
    md={8}   // Third width en desktop
    lg={6}   // Quarter width en large desktop
    {...props}
  />
);

// Col para sidebar layouts
export const MainCol: React.FC<ColProps> = (props) => (
  <Col
    xs={24}  // Full width en mobile
    md={18}  // 3/4 width en desktop
    {...props}
  />
);

export const SidebarCol: React.FC<ColProps> = (props) => (
  <Col
    xs={24}  // Full width en mobile (se apila)
    md={6}   // 1/4 width en desktop
    {...props}
  />
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 * 
 * // Grid básico con gutter usando shared system
 * <Row gutter="md">              // "md" → 16px gutter automáticamente
 *   <Col span={12}>Left</Col>
 *   <Col span={12}>Right</Col>
 * </Row>
 * 
 * // Gutter vertical y horizontal
 * <Row gutter={["lg", "sm"]}>    // [horizontal: 24px, vertical: 8px]
 *   <Col span={8}>Item 1</Col>
 *   <Col span={8}>Item 2</Col>
 *   <Col span={8}>Item 3</Col>
 * </Row>
 * 
 * // Responsive completo
 * <Row gutter="xl">
 *   <Col 
 *     xs={24}                    // Mobile: full width
 *     sm={12}                   // Tablet: half width  
 *     md={8}                    // Desktop: third width
 *     lg={6}                    // Large: quarter width
 *   >
 *     Responsive Content
 *   </Col>
 * </Row>
 * 
 * // Componentes predefinidos
 * <GridContainer gutter="lg">   // Container con max-width + gutter
 *   <ResponsiveCol>Item 1</ResponsiveCol>
 *   <ResponsiveCol>Item 2</ResponsiveCol>
 *   <ResponsiveCol>Item 3</ResponsiveCol>
 * </GridContainer>
 * 
 * // Layout sidebar
 * <Row gutter="md">
 *   <MainCol>Main content</MainCol>
 *   <SidebarCol>Sidebar content</SidebarCol>
 * </Row>
 * 
 * // Con props del shared system
 * <Row 
 *   gutter="lg"
 *   padding={{ vertical: "xl", horizontal: "md" }}
 *   margin="lg"
 * >
 *   Content with unified spacing
 * </Row>
 */

// Export por defecto
const Grid = { Row, Col };
export default Grid;
