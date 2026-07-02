import styled, { css } from "styled-components";
import type {
  SpacingSize,
  BackgroundVariant,
  BorderRadiusSize,
  ShadowVariant,
  ContainerProps,
  FlexContainerProps,
  GridContainerProps,
} from "./types";
import { createShouldForwardProp } from "../../utils/shouldForwardProp";

// Container base universal
export const Container = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "fullWidth",
    "maxWidth",
    "minHeight",
    "height",
    "padding",
    "margin",
    "backgroundColor",
    "borderRadius",
    "shadow",
  ]),
})<ContainerProps>`
  ${({
    theme,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
    fullWidth,
    maxWidth,
    minHeight,
    height,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${maxWidth ? `max-width: ${maxWidth};` : ""}
    ${minHeight ? `min-height: ${minHeight};` : ""}
    ${height ? `height: ${height};` : ""}
    
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// FlexContainer para layouts flexibles
export const FlexContainer = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "direction",
    "justify",
    "align",
    "wrap",
    "gap",
    "fullWidth",
    "fullHeight",
    "maxWidth",
    "minHeight",
    "height",
    "padding",
    "margin",
    "backgroundColor",
    "borderRadius",
    "shadow",
  ]),
})<FlexContainerProps>`
  display: flex;

  ${({
    theme,
    direction,
    justify,
    align,
    wrap,
    gap,
    fullWidth,
    fullHeight,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    
    ${direction && `flex-direction: ${direction};`}
    ${justify &&
    `justify-content: ${
      justify === "start"
        ? "flex-start"
        : justify === "end"
        ? "flex-end"
        : justify === "between"
        ? "space-between"
        : justify === "around"
        ? "space-around"
        : justify === "evenly"
        ? "space-evenly"
        : "center"
    };`}
    ${align &&
    `align-items: ${
      align === "start"
        ? "flex-start"
        : align === "end"
        ? "flex-end"
        : align === "stretch"
        ? "stretch"
        : align === "baseline"
        ? "baseline"
        : "center"
    };`}
    ${wrap && "flex-wrap: wrap;"}
    
    ${gap && `gap: ${theme.spacing[gap as keyof typeof theme.spacing]};`}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// GridContainer para layouts en grid
export const GridContainer = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "columns",
    "gap",
    "minColumnWidth",
    "fullWidth",
    "fullHeight",
    "maxWidth",
    "minHeight",
    "height",
    "padding",
    "margin",
    "backgroundColor",
    "borderRadius",
    "shadow",
  ]),
})<GridContainerProps>`
  display: grid;

  ${({
    theme,
    columns,
    gap,
    minColumnWidth,
    fullWidth,
    fullHeight,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    
    ${columns &&
    typeof columns === "number" &&
    `grid-template-columns: repeat(${columns}, 1fr);`}
    ${columns &&
    typeof columns === "string" &&
    minColumnWidth &&
    `
      grid-template-columns: repeat(${columns}, minmax(${minColumnWidth}, 1fr));
    `}
    
    ${gap && `gap: ${theme.spacing[gap as keyof typeof theme.spacing]};`}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// Section para secciones semánticas
export const Section = styled.section<{
  padding?: SpacingSize;
  margin?: SpacingSize;
  backgroundColor?: BackgroundVariant;
  borderRadius?: BorderRadiusSize;
  shadow?: ShadowVariant;
  fullWidth?: boolean;
  maxWidth?: string;
  minHeight?: string;
}>`
  ${({
    theme,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
    fullWidth,
    maxWidth,
    minHeight,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${maxWidth ? `max-width: ${maxWidth};` : ""}
    ${minHeight ? `min-height: ${minHeight};` : ""}
    
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// Article para contenido semántico
export const Article = styled.article<{
  padding?: SpacingSize;
  margin?: SpacingSize;
  backgroundColor?: BackgroundVariant;
  borderRadius?: BorderRadiusSize;
  shadow?: ShadowVariant;
  fullWidth?: boolean;
  maxWidth?: string;
}>`
  ${({
    theme,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
    fullWidth,
    maxWidth,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${maxWidth ? `max-width: ${maxWidth};` : ""}
    
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// Aside para contenido lateral
export const Aside = styled.aside<{
  padding?: SpacingSize;
  margin?: SpacingSize;
  backgroundColor?: BackgroundVariant;
  borderRadius?: BorderRadiusSize;
  shadow?: ShadowVariant;
  fullWidth?: boolean;
  maxWidth?: string;
}>`
  ${({
    theme,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
    fullWidth,
    maxWidth,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${maxWidth ? `max-width: ${maxWidth};` : ""}
    
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// Wrapper genérico para agrupaciones
export const Wrapper = styled.div<{
  padding?: SpacingSize;
  margin?: SpacingSize;
  backgroundColor?: BackgroundVariant;
  borderRadius?: BorderRadiusSize;
  shadow?: ShadowVariant;
  fullWidth?: boolean;
  fullHeight?: boolean;
  maxWidth?: string;
  minHeight?: string;
  height?: string;
  position?: "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
}>`
  ${({
    theme,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    shadow,
    fullWidth,
    fullHeight,
    maxWidth,
    minHeight,
    height,
    position,
    top,
    left,
    right,
    bottom,
    zIndex,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    ${maxWidth ? `max-width: ${maxWidth};` : ""}
    ${minHeight ? `min-height: ${minHeight};` : ""}
    ${height ? `height: ${height};` : ""}
    
    ${position && `position: ${position};`}
    ${top && `top: ${top};`}
    ${left && `left: ${left};`}
    ${right && `right: ${right};`}
    ${bottom && `bottom: ${bottom};`}
    ${zIndex && `z-index: ${zIndex};`}
    
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin &&
    `margin: ${theme.spacing[margin as keyof typeof theme.spacing]};`}
    
    ${backgroundColor &&
    backgroundColor !== "transparent" &&
    `
      background-color: ${theme.colors.background[backgroundColor]};
    `}
    
    ${borderRadius &&
    `
      border-radius: ${
        theme.borderRadius[borderRadius as keyof typeof theme.borderRadius]
      };
    `}
    
    ${shadow &&
    shadow !== "none" &&
    `
      box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows]};
    `}
  `}
`;

// Mixin para centrar contenido
export const centerContent = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Mixin para centrar horizontalmente
export const centerHorizontal = css`
  display: flex;
  justify-content: center;
`;

// Mixin para centrar verticalmente
export const centerVertical = css`
  display: flex;
  align-items: center;
`;

// Mixin para espacio entre elementos
export const spaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Mixin para espacio alrededor de elementos
export const spaceAround = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// Mixin para elementos distribuidos uniformemente
export const spaceEvenly = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
