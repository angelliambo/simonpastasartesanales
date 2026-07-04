import styled, { css } from "styled-components";
import { StyledSpaceProps, SpaceItemProps } from "./Space.types";
import { getSpacingValue } from "../shared";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// =====================================
// MAIN SPACE CONTAINER
// =====================================

export const StyledSpace = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$direction",
    "$align",
    "$justify",
    "$wrap",
    "$gap",
    "$responsive",
  ]),
})<StyledSpaceProps>`
  display: flex;

  /* 🎯 Direction usando sistema unificado */
  flex-direction: ${({ $direction = "horizontal" }) =>
    $direction === "horizontal" ? "row" : "column"};

  /* Alignment */
  align-items: ${({ $align = "center" }) => {
    switch ($align) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      case "baseline":
        return "baseline";
      case "stretch":
        return "stretch";
      default:
        return "center";
    }
  }};

  justify-content: ${({ $justify = "start" }) => {
    switch ($justify) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      case "space-between":
        return "space-between";
      case "space-around":
        return "space-around";
      case "space-evenly":
        return "space-evenly";
      default:
        return "flex-start";
    }
  }};

  /* Wrapping */
  flex-wrap: ${({ $wrap = false }) => ($wrap ? "wrap" : "nowrap")};

  /* 🎯 Gap usando SHARED SPACING SYSTEM */
  gap: ${({ $gap }) => {
    if (typeof $gap === "number") {
      return `${$gap}px`;
    }
    if (typeof $gap === "string") {
      // Si es un valor del shared system, convertirlo
      try {
        const spacingValue = getSpacingValue($gap as any);
        return `${spacingValue}px`;
      } catch {
        // Si no es reconocido, usarlo directamente (ej: "1rem", "10px")
        return $gap;
      }
    }
    return "16px"; // fallback md
  }};

  /* 🎯 Responsive gap usando breakpoints del tema */
  ${({ $responsive, theme }) => {
    if (!$responsive) return "";

    let css = "";
    const breakpoints = theme?.breakpoints || {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    };

    // Aplicar responsive gaps
    Object.entries($responsive).forEach(([breakpoint, size]) => {
      const minWidth = breakpoints[breakpoint as keyof typeof breakpoints];
      if (minWidth && size) {
        const gapValue = getSpacingValue(size);
        css += `
          @media (min-width: ${minWidth}px) {
            gap: ${gapValue}px;
          }
        `;
      }
    });

    return css;
  }}

  /* Accesibilidad - Increased spacing */
  ${({ accessibility }) =>
    accessibility?.increasedSpacing &&
    css`
      gap: calc(var(--gap, 16px) * ${accessibility.spacingMultiplier || 1.5});
    `}
  
  /* Accesibilidad - Reduced motion */
  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      transition: none;
    `}
`;

// =====================================
// SPACE ITEM WRAPPER
// =====================================

export const SpaceItem = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$isLast", "$hasSplit", "accessibility"].includes(prop),
})<SpaceItemProps>`
  display: flex;
  align-items: inherit;

  /* Flex properties por defecto */
  flex-shrink: 0;

  /* Accesibilidad - Focus visible mejorado */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      &:focus-within {
        outline: 2px solid #000000;
        outline-offset: 2px;
      }
    `}
`;

// =====================================
// SPLIT DIVIDER
// =====================================

export const SpaceSplit = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$direction"]),
})<{
  $direction?: "horizontal" | "vertical";
  accessibility?: SpaceItemProps["accessibility"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  /* Orientación del divisor según la dirección del Space */
  ${({ $direction = "horizontal" }) =>
    $direction === "horizontal"
      ? css`
          height: 100%;
          min-height: 1px;
        `
      : css`
          width: 100%;
          min-width: 1px;
        `}

  /* Accesibilidad - Alto contraste */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-color: #000000;
      color: #000000;
    `}
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Space compacto
export const CompactSpace = styled(StyledSpace)`
  gap: ${getSpacingValue("xs")}px;
`;

// Space cómodo
export const ComfortableSpace = styled(StyledSpace)`
  gap: ${getSpacingValue("xl")}px;
`;

// Space para listas con bordes
export const ListSpace = styled(StyledSpace)`
  gap: 0;

  ${SpaceItem}:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme }) => theme.colors?.border?.light || "#dee2e6"};
    padding-bottom: ${getSpacingValue("sm")}px;
    margin-bottom: ${getSpacingValue("sm")}px;
  }
`;

// Space para toolbars/headers
export const ToolbarSpace = styled(StyledSpace)`
  gap: ${getSpacingValue("md")}px;
  align-items: center;
  justify-content: space-between;
  padding: ${getSpacingValue("sm")}px ${getSpacingValue("md")}px;

  /* Responsive para mobile */
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${getSpacingValue("sm")}px;
  }
`;

// Space para cards/grids
export const GridSpace = styled(StyledSpace)`
  gap: ${getSpacingValue("lg")}px;
  flex-wrap: wrap;

  ${SpaceItem} {
    flex: 1 1 calc(33.333% - ${getSpacingValue("lg")}px);
    min-width: 250px; /* Breakpoint mínimo */
  }

  /* Responsive grid */
  @media (max-width: 768px) {
    gap: ${getSpacingValue("md")}px;

    ${SpaceItem} {
      flex: 1 1 calc(50% - ${getSpacingValue("md")}px);
      min-width: 200px;
    }
  }

  @media (max-width: 480px) {
    gap: ${getSpacingValue("sm")}px;

    ${SpaceItem} {
      flex: 1 1 100%;
      min-width: auto;
    }
  }
`;
