import styled, { css } from "styled-components";
import { StyledDividerProps } from "./Divider.types";

const SIZE_MAPPING: Record<string, number> = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 3,
  xxl: 3,
};

export const StyledDivider = styled.div<StyledDividerProps>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm || "14px"};
  line-height: ${({ theme }) => theme.lineHeight?.base || 1.5715};
  list-style: none;

  ${({
    $orientation,
    $type,
    $size,
    $hasText,
    $plain,
    theme,
    $accessibility,
  }: StyledDividerProps) => {
    const borderWidth = SIZE_MAPPING[$size] || SIZE_MAPPING.md;
    const highContrast = $accessibility?.highContrast;
    const borderColor = highContrast
      ? theme.colors?.border?.contrast || "#000"
      : theme.colors?.border?.light || "#e9ecef";

    if ($orientation === "vertical") {
      return css`
        position: relative;
        display: inline-block;
        width: ${borderWidth}px;
        height: 1em;
        margin: 0 8px;
        vertical-align: middle;
        border-top: 0;
        border-left: ${borderWidth}px
          ${$type === "dashed"
            ? "dashed"
            : $type === "dotted"
            ? "dotted"
            : "solid"}
          ${borderColor};
        border-bottom: 0;
        border-right: 0;
      `;
    }

    // Horizontal
    return css`
      display: flex;
      clear: both;
      width: 100%;
      min-width: 100%;
      margin: ${$hasText ? "16px" : "24px"} 0;
      border-top: ${borderWidth}px
        ${$type === "dashed"
          ? "dashed"
          : $type === "dotted"
          ? "dotted"
          : "solid"}
        ${borderColor};

      ${$hasText &&
      css`
        white-space: nowrap;
        text-align: center;

        &::before,
        &::after {
          position: relative;
          top: 50%;
          width: ${$plain ? "50%" : "auto"};
          border-top: ${borderWidth}px
            ${$type === "dashed"
              ? "dashed"
              : $type === "dotted"
              ? "dotted"
              : "solid"}
            ${borderColor};
          transform: translateY(50%);
          content: "";
        }

        ${!$plain &&
        css`
          &::before {
            width: 5%;
          }
          &::after {
            width: 95%;
          }
        `}
      `}

      ${!$hasText &&
      css`
        border-top: ${borderWidth}px
          ${$type === "dashed"
            ? "dashed"
            : $type === "dotted"
            ? "dotted"
            : "solid"}
          ${borderColor};
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
      `}
    `;
  }}
`;

export const DividerText = styled.span<{
  $plain: boolean;
  $accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
}>`
  display: inline-block;
  padding: ${({ $plain }) => ($plain ? "0 8px" : "0 16px")};
  font-size: ${({ theme, $accessibility }) =>
    $accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.sm) || 14) * 1.25}px`
      : `${theme.typography?.fontSize?.sm || 14}px`};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.medium || 500};
  white-space: nowrap;

  ${({ theme, $accessibility }) =>
    $accessibility?.highContrast &&
    css`
      color: ${theme.colors?.text?.primary || "#000"};
      font-weight: ${theme.typography?.fontWeight?.bold || 700};
    `}
`;
