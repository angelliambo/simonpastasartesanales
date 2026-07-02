import styled, { css } from "styled-components";
import type {
  FontSize,
  FontWeight,
  TextColor,
  TextAlign,
  LineHeight,
  TextProps,
} from "./types";

// Componente Text universal
export const Text = styled.span<TextProps>`
  ${({
    theme,
    size,
    weight,
    color,
    align,
    lineHeight,
    fullWidth,
    truncate,
    uppercase,
    lowercase,
    capitalize,
    italic,
    underline,
    strikethrough,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}

    ${size &&
    `
      font-size: calc(${theme.typography.fontSize[size]} + var(--font-size-scale, 0px));
      max-font-size: 30px;
    `}
    ${weight && `font-weight: ${theme.typography.fontWeight[weight]};`}
    ${lineHeight && `line-height: ${theme.typography.lineHeight[lineHeight]};`}
    ${align && `text-align: ${align};`}
    
    ${color &&
    `
      color: ${
        color === "primary"
          ? theme.colors.text.primary
          : color === "secondary"
          ? theme.colors.text.secondary
          : color === "tertiary"
          ? theme.colors.text.tertiary
          : color === "success"
          ? theme.colors.success[500]
          : color === "warning"
          ? theme.colors.warning[500]
          : color === "error"
          ? theme.colors.error[500]
          : color === "info"
          ? theme.colors.info[500]
          : theme.colors.text.inverse
      };
    `}
    
    ${truncate &&
    `
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
    
    ${uppercase && "text-transform: uppercase;"}
    ${lowercase && "text-transform: lowercase;"}
    ${capitalize && "text-transform: capitalize;"}
    ${italic && "font-style: italic;"}
    ${underline && "text-decoration: underline;"}
    ${strikethrough && "text-decoration: line-through;"}
  `}
`;

// Componente Heading para títulos
export const Heading = styled.h1<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: TextColor;
  align?: TextAlign;
  weight?: FontWeight;
  lineHeight?: LineHeight;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
}>`
  ${({
    theme,
    level,
    color,
    align,
    weight,
    lineHeight,
    fullWidth,
    margin,
    padding,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    ${level &&
    `
      font-size: calc(${
        level === 1
          ? theme.typography.fontSize.xxxl
          : level === 2
          ? theme.typography.fontSize.xxl
          : level === 3
          ? theme.typography.fontSize.xl
          : level === 4
          ? theme.typography.fontSize.lg
          : level === 5
          ? theme.typography.fontSize.md
          : theme.typography.fontSize.sm
      } + var(--font-size-scale, 0px));
    `}
    
    ${weight && `font-weight: ${theme.typography.fontWeight[weight]};`}
    ${lineHeight && `line-height: ${theme.typography.lineHeight[lineHeight]};`}
    ${align && `text-align: ${align};`}
    
    ${color &&
    `
      color: ${
        color === "primary"
          ? theme.colors.text.primary
          : color === "secondary"
          ? theme.colors.text.secondary
          : color === "tertiary"
          ? theme.colors.text.tertiary
          : color === "success"
          ? theme.colors.success[500]
          : color === "warning"
          ? theme.colors.warning[500]
          : color === "error"
          ? theme.colors.error[500]
          : color === "info"
          ? theme.colors.info[500]
          : theme.colors.text.inverse
      };
    `}
    
    font-family: ${theme.typography.fontFamily.primary};
    margin: 0;
  `}
`;

// Componente Paragraph para párrafos
export const Paragraph = styled.p<{
  size?: FontSize;
  weight?: FontWeight;
  color?: TextColor;
  align?: TextAlign;
  lineHeight?: LineHeight;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
  italic?: boolean;
}>`
  ${({
    theme,
    size,
    weight,
    color,
    align,
    lineHeight,
    fullWidth,
    margin,
    padding,
    italic,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    ${size &&
    `font-size: calc(${theme.typography.fontSize[size]} + var(--font-size-scale, 0px));`}
    ${weight && `font-weight: ${theme.typography.fontWeight[weight]};`}
    ${lineHeight && `line-height: ${theme.typography.lineHeight[lineHeight]};`}
    ${align && `text-align: ${align};`}
    ${italic && "font-style: italic;"}
    
    ${color &&
    `
      color: ${
        color === "primary"
          ? theme.colors.text.primary
          : color === "secondary"
          ? theme.colors.text.secondary
          : color === "tertiary"
          ? theme.colors.text.tertiary
          : color === "success"
          ? theme.colors.success[500]
          : color === "warning"
          ? theme.colors.warning[500]
          : color === "error"
          ? theme.colors.error[500]
          : color === "info"
          ? theme.colors.info[500]
          : theme.colors.text.inverse
      };
    `}
    
    font-family: ${theme.typography.fontFamily.primary};
    margin: 0;
  `}
`;

// Componente Label para etiquetas
export const Label = styled.label<{
  size?: FontSize;
  weight?: FontWeight;
  color?: TextColor;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
}>`
  ${({
    theme,
    size,
    weight,
    color,
    required,
    disabled,
    fullWidth,
    margin,
    padding,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    ${size &&
    `font-size: calc(${theme.typography.fontSize[size]} + var(--font-size-scale, 0px));`}
    ${weight && `font-weight: ${theme.typography.fontWeight[weight]};`}
    
    ${color &&
    `
      color: ${
        color === "primary"
          ? theme.colors.text.primary
          : color === "secondary"
          ? theme.colors.text.secondary
          : color === "tertiary"
          ? theme.colors.text.tertiary
          : color === "success"
          ? theme.colors.success[500]
          : color === "warning"
          ? theme.colors.warning[500]
          : color === "error"
          ? theme.colors.error[500]
          : color === "info"
          ? theme.colors.info[500]
          : theme.colors.text.inverse
      };
    `}
    
    ${disabled &&
    `
      color: ${theme.colors.text.tertiary};
      cursor: not-allowed;
    `}
    
    ${required &&
    `
      &::after {
        content: ' *';
        color: ${theme.colors.error[500]};
      }
    `}
    
    font-family: ${theme.typography.fontFamily.primary};
    display: block;
    cursor: pointer;
  `}
`;

// Componente Caption para texto pequeño
export const Caption = styled.span<{
  color?: TextColor;
  align?: TextAlign;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
  italic?: boolean;
}>`
  ${({ theme, color, align, fullWidth, margin, padding, italic }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    font-size: calc(${theme.typography.fontSize
      .xs} + var(--font-size-scale, 0px));
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: ${theme.typography.lineHeight.tight};
    ${align && `text-align: ${align};`}
    ${italic && "font-style: italic;"}
    
    ${color &&
    `
      color: ${
        color === "primary"
          ? theme.colors.text.primary
          : color === "secondary"
          ? theme.colors.text.secondary
          : color === "tertiary"
          ? theme.colors.text.tertiary
          : color === "success"
          ? theme.colors.success[500]
          : color === "warning"
          ? theme.colors.warning[500]
          : color === "error"
          ? theme.colors.error[500]
          : color === "info"
          ? theme.colors.info[500]
          : theme.colors.text.inverse
      };
    `}
    
    font-family: ${theme.typography.fontFamily.primary};
  `}
`;

// Componente Code para código
export const Code = styled.code<{
  size?: FontSize;
  color?: TextColor;
  background?: string;
  padding?: string;
  borderRadius?: string;
  fullWidth?: boolean;
}>`
  ${({
    theme,
    size,
    color,
    background,
    padding,
    borderRadius,
    fullWidth,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${padding && `padding: ${padding};`}
    ${borderRadius && `border-radius: ${borderRadius};`}
    
    font-family: ${theme.typography.fontFamily.mono};
    ${size &&
    `font-size: calc(${theme.typography.fontSize[size]} + var(--font-size-scale, 0px));`}

    ${color &&
    `
      color: ${
        color === "primary"
          ? theme.colors.text.primary
          : color === "secondary"
          ? theme.colors.text.secondary
          : color === "tertiary"
          ? theme.colors.text.tertiary
          : color === "success"
          ? theme.colors.success[500]
          : color === "warning"
          ? theme.colors.warning[500]
          : color === "error"
          ? theme.colors.error[500]
          : color === "info"
          ? theme.colors.info[500]
          : theme.colors.text.inverse
      };
    `}
    
    ${background && `background-color: ${background};`}
  `}
`;

// Mixin para texto truncado
export const textTruncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Mixin para texto multilinea truncado
export const textTruncateMultiline = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Mixin para texto seleccionable
export const textSelectable = css`
  user-select: text;
  cursor: text;
`;

// Mixin para texto no seleccionable
export const textNotSelectable = css`
  user-select: none;
  cursor: default;
`;

// Mixin para texto con break-word
export const textBreakWord = css`
  word-break: break-word;
  overflow-wrap: break-word;
`;

// Mixin para texto con break-all
export const textBreakAll = css`
  word-break: break-all;
`;

// Mixin para texto con hyphens
export const textHyphens = css`
  hyphens: auto;
`;
