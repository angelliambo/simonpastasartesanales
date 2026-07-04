import styled, { css } from "styled-components";
import { StyledRowProps, StyledColProps, GRID_COLUMNS, GRID_BREAKPOINTS } from "./Grid.types";
import { getSpacingValue } from "../shared";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// =====================================
// GRID HELPERS
// =====================================

// Calcular ancho de columna en porcentaje
const getColWidth = (span: number, total: number = GRID_COLUMNS): string => {
  return `${(span / total) * 100}%`;
};

// Calcular offset en porcentaje  
const getColOffset = (offset: number, total: number = GRID_COLUMNS): string => {
  return `${(offset / total) * 100}%`;
};

// Generar media queries responsivas para styled-components
const generateMediaQuery = (breakpoint: keyof typeof GRID_BREAKPOINTS, stylesFunction: any) => {
  const minWidth = GRID_BREAKPOINTS[breakpoint];
  if (minWidth === 0) {
    return stylesFunction; // xs no necesita media query
  }
  return css`
    @media (min-width: ${minWidth}px) {
      ${stylesFunction}
    }
  `;
};

// =====================================
// ROW STYLED COMPONENT
// =====================================

export const StyledRow = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$gutter",
    "$align",
    "$justify",
    "$wrap",
    "accessibility",
  ]),
})<StyledRowProps>`
  display: flex;
  flex-flow: row wrap; /* Por defecto wrap activado */
  width: 100%; /* Asegurar que no exceda el ancho del contenedor */
  max-width: 100%; /* Prevenir overflow */
  box-sizing: border-box;
  
  /* 🎯 Gutter management usando SHARED SYSTEMS */
  ${({ $gutter = [0, 0] }) => {
    const [horizontal, vertical] = $gutter;
    
    // Solo aplicar margin negativo si hay gutter
    if (horizontal > 0 || vertical > 0) {
      return css`
        @media (max-width: 767px) {
          /* En mobile, reducir margin negativo o eliminarlo para evitar overflow */
          margin-left: 0;
          margin-right: 0;
          row-gap: ${vertical}px;
          column-gap: ${horizontal}px; /* Usar gap en lugar de margin negativo en mobile */
        }
        
        @media (min-width: 768px) {
          margin-left: -${horizontal / 2}px;
          margin-right: -${horizontal / 2}px;
          row-gap: ${vertical}px;
        }
      `;
    }
    return "";
  }}
  
  /* Alignment vertical */
  align-items: ${({ $align = "top" }) => {
    switch ($align) {
      case "top": return "flex-start";
      case "middle": return "center";
      case "bottom": return "flex-end";
      case "stretch": return "stretch";
      default: return "flex-start";
    }
  }};
  
  /* Justificación horizontal */
  justify-content: ${({ $justify = "start" }) => {
    switch ($justify) {
      case "start": return "flex-start";
      case "end": return "flex-end";
      case "center": return "center";
      case "space-around": return "space-around";
      case "space-between": return "space-between";
      case "space-evenly": return "space-evenly";
      default: return "flex-start";
    }
  }};
  
  /* Wrapping control */
  flex-wrap: ${({ $wrap = true }) => $wrap ? "wrap" : "nowrap"};
  
  /* Accesibilidad - Reduced motion */
  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      transition: none;
    `}
  
  /* Accesibilidad - Increased spacing */
  ${({ accessibility, $gutter = [0, 0] }) =>
    accessibility?.increasedSpacing &&
    css`
      ${() => {
        const multiplier = accessibility.spacingMultiplier || 1.5;
        const [horizontal, vertical] = $gutter;
        const increasedHorizontal = horizontal * multiplier;
        const increasedVertical = vertical * multiplier;
        
        return css`
          margin-left: -${increasedHorizontal / 2}px;
          margin-right: -${increasedHorizontal / 2}px;
          row-gap: ${increasedVertical}px;
        `;
      }}
    `}
`;

// =====================================
// COL STYLED COMPONENT
// =====================================

export const StyledCol = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$span",
    "$offset",
    "$order",
    "$pull",
    "$push",
    "$gutter",
    "$xs",
    "$sm",
    "$md",
    "$lg",
    "$xl",
    "$xxl",
    "accessibility",
  ]),
})<StyledColProps>`
  /* Base flex properties */
  flex: 0 0 auto;
  position: relative;
  
  /* 🎯 Gutter padding usando shared system */
  ${({ $gutter = [0, 0] }) => {
    const [horizontal] = $gutter;
    
    if (horizontal > 0) {
      return css`
        padding-left: ${horizontal / 2}px;
        padding-right: ${horizontal / 2}px;
      `;
    }
    return "";
  }}
  
  /* 🎯 Width basado en span (sistema de 24 columnas) */
  ${({ $span }) =>
    $span &&
    css`
      width: ${getColWidth($span)};
      max-width: ${getColWidth($span)};
    `}
  
  /* Offset (margin-left) */
  ${({ $offset }) =>
    $offset &&
    $offset > 0 &&
    css`
      margin-left: ${getColOffset($offset)};
    `}
  
  /* Flexbox order */
  ${({ $order }) =>
    $order !== undefined &&
    css`
      order: ${$order};
    `}
  
  /* Pull (position relative right) */
  ${({ $pull }) =>
    $pull &&
    $pull > 0 &&
    css`
      right: ${getColOffset($pull)};
    `}
  
  /* Push (position relative left) */
  ${({ $push }) =>
    $push &&
    $push > 0 &&
    css`
      left: ${getColOffset($push)};
    `}
  
  /* 🎯 RESPONSIVE BREAKPOINTS usando shared system */
  ${({ $xs }) =>
    $xs &&
    generateMediaQuery("xs", css`
      ${$xs.span && css`
        width: ${getColWidth($xs.span)};
        max-width: ${getColWidth($xs.span)};
      `}
      ${$xs.offset && css`margin-left: ${getColOffset($xs.offset)};`}
      ${$xs.order !== undefined && css`order: ${$xs.order};`}
      ${$xs.pull && css`right: ${getColOffset($xs.pull)};`}
      ${$xs.push && css`left: ${getColOffset($xs.push)};`}
    `)}
  
  ${({ $sm }) =>
    $sm &&
    generateMediaQuery("sm", css`
      ${$sm.span && css`
        width: ${getColWidth($sm.span)};
        max-width: ${getColWidth($sm.span)};
      `}
      ${$sm.offset && css`margin-left: ${getColOffset($sm.offset)};`}
      ${$sm.order !== undefined && css`order: ${$sm.order};`}
      ${$sm.pull && css`right: ${getColOffset($sm.pull)};`}
      ${$sm.push && css`left: ${getColOffset($sm.push)};`}
    `)}
  
  ${({ $md }) =>
    $md &&
    generateMediaQuery("md", css`
      ${$md.span && css`
        width: ${getColWidth($md.span)};
        max-width: ${getColWidth($md.span)};
      `}
      ${$md.offset && css`margin-left: ${getColOffset($md.offset)};`}
      ${$md.order !== undefined && css`order: ${$md.order};`}
      ${$md.pull && css`right: ${getColOffset($md.pull)};`}
      ${$md.push && css`left: ${getColOffset($md.push)};`}
    `)}
  
  ${({ $lg }) =>
    $lg &&
    generateMediaQuery("lg", css`
      ${$lg.span && css`
        width: ${getColWidth($lg.span)};
        max-width: ${getColWidth($lg.span)};
      `}
      ${$lg.offset && css`margin-left: ${getColOffset($lg.offset)};`}
      ${$lg.order !== undefined && css`order: ${$lg.order};`}
      ${$lg.pull && css`right: ${getColOffset($lg.pull)};`}
      ${$lg.push && css`left: ${getColOffset($lg.push)};`}
    `)}
  
  ${({ $xl }) =>
    $xl &&
    generateMediaQuery("xl", css`
      ${$xl.span && css`
        width: ${getColWidth($xl.span)};
        max-width: ${getColWidth($xl.span)};
      `}
      ${$xl.offset && css`margin-left: ${getColOffset($xl.offset)};`}
      ${$xl.order !== undefined && css`order: ${$xl.order};`}
      ${$xl.pull && css`right: ${getColOffset($xl.pull)};`}
      ${$xl.push && css`left: ${getColOffset($xl.push)};`}
    `)}
  
  ${({ $xxl }) =>
    $xxl &&
    generateMediaQuery("xxl", css`
      ${$xxl.span && css`
        width: ${getColWidth($xxl.span)};
        max-width: ${getColWidth($xxl.span)};
      `}
      ${$xxl.offset && css`margin-left: ${getColOffset($xxl.offset)};`}
      ${$xxl.order !== undefined && css`order: ${$xxl.order};`}
      ${$xxl.pull && css`right: ${getColOffset($xxl.pull)};`}
      ${$xxl.push && css`left: ${getColOffset($xxl.push)};`}
    `)}
  
  /* Accesibilidad - Focus ring mejorado */
  ${({ accessibility }) =>
    accessibility?.focusRing &&
    css`
      &:focus-within {
        outline: 2px solid ${({ theme }) => theme.colors?.primary?.[500] || "#007bff"};
        outline-offset: 2px;
      }
    `}
  
  /* Accesibilidad - High contrast */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      &:focus-within {
        outline: 3px solid #000000;
        outline-offset: 2px;
      }
    `}
  
  /* Accesibilidad - Increased spacing (gutter) */
  ${({ accessibility, $gutter = [0, 0] }) =>
    accessibility?.increasedSpacing &&
    css`
      ${() => {
        const multiplier = accessibility.spacingMultiplier || 1.5;
        const [horizontal] = $gutter;
        const increasedHorizontal = horizontal * multiplier;
        
        return css`
          padding-left: ${increasedHorizontal / 2}px;
          padding-right: ${increasedHorizontal / 2}px;
        `;
      }}
    `}
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Container con max-width
export const Container = styled(StyledRow)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${getSpacingValue("md")}px;
  
  /* Responsive container sizes */
  @media (min-width: ${GRID_BREAKPOINTS.sm}px) {
    max-width: 540px;
  }
  
  @media (min-width: ${GRID_BREAKPOINTS.md}px) {
    max-width: 720px;
  }
  
  @media (min-width: ${GRID_BREAKPOINTS.lg}px) {
    max-width: 960px;
  }
  
  @media (min-width: ${GRID_BREAKPOINTS.xl}px) {
    max-width: 1140px;
  }
  
  @media (min-width: ${GRID_BREAKPOINTS.xxl}px) {
    max-width: 1320px;
  }
`;

// Container fluido (sin max-width)
export const FluidContainer = styled(StyledRow)`
  width: 100%;
  padding: 0 ${getSpacingValue("md")}px;
`;

// Row con gutter compacto
export const CompactRow = styled(StyledRow)`
  /* Usa gutter xs por defecto */
`;

// Row con gutter cómodo  
export const ComfortableRow = styled(StyledRow)`
  /* Usa gutter xl por defecto */
`;

// Col auto (ancho basado en contenido)
export const AutoCol = styled(StyledCol)`
  flex: 1 1 auto;
  width: auto;
  max-width: none;
`;

// Col centrada
export const CenteredCol = styled(StyledCol)`
  margin: 0 auto;
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export { getColWidth, getColOffset, generateMediaQuery };
