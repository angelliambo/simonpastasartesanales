import styled, { css, keyframes } from "styled-components";
import { StyledRadioProps } from "./Radio.types";

const SIZE_MAPPING: Record<string, { radio: number; dot: number }> = {
  xs: { radio: 12, dot: 4 },
  sm: { radio: 14, dot: 5 },
  md: { radio: 16, dot: 6 },
  lg: { radio: 18, dot: 7 },
  xl: { radio: 20, dot: 8 },
  xxl: { radio: 22, dot: 9 },
};

const radioCheck = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const RadioWrapper = styled.label<StyledRadioProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      font-size: ${({ theme }) =>
        `${(Number(theme.typography?.fontSize?.md) || 16) * 1.25}px`};
    `}
`;

export const HiddenInput = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

export const RadioButton = styled.span<StyledRadioProps>`
  position: relative;
  display: inline-block;
  width: ${({ $size }) =>
    SIZE_MAPPING[$size]?.radio || SIZE_MAPPING.md.radio}px;
  height: ${({ $size }) =>
    SIZE_MAPPING[$size]?.radio || SIZE_MAPPING.md.radio}px;
  border: 2px solid
    ${({ theme, $checked, accessibility }) =>
      $checked
        ? theme.colors?.primary?.[500] || "#007bff"
        : accessibility?.highContrast
        ? theme.colors?.border?.contrast || "#000"
        : theme.colors?.border?.normal || "#d9d9d9"};
  border-radius: 50%;
  background-color: ${({ theme, $checked }) =>
    $checked
      ? theme.colors?.background?.card || "#fff"
      : theme.colors?.background?.card || "#fff"};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "all 0.2s ease"};

  /* Círculo interior solo cuando está checked */
  ${({ theme, $checked, $size, accessibility }) =>
    $checked
      ? css`
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: ${SIZE_MAPPING[$size]?.dot || SIZE_MAPPING.md.dot}px;
            height: ${SIZE_MAPPING[$size]?.dot || SIZE_MAPPING.md.dot}px;
            background-color: ${theme.colors?.primary?.[500] || "#007bff"};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            ${accessibility?.reducedMotion
              ? ""
              : css`animation: ${radioCheck} 0.2s ease-out forwards;`}
          }
        `
      : css`
          /* Asegurar que ::after no aparezca cuando no está checked */
          &::after {
            content: none;
            display: none;
          }
        `}

  &:hover {
    ${({ $disabled, theme }) =>
      !$disabled &&
      css`
        border-color: ${theme.colors?.primary?.[400] || "#0056b3"};
      `}
  }

  &:focus-within {
    outline: 2px solid
      ${({ theme }) => theme.colors?.primary?.[500] || "#007bff"};
    outline-offset: 2px;
  }
`;

export const RadioLabel = styled.span<{
  accessibility?: StyledRadioProps["accessibility"];
}>`
  margin-left: ${({ theme }) => theme.spacing?.sm || "8px"};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.md) || 16) * 1.25}px`
      : `${theme.typography?.fontSize?.md || 16}px`};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.semibold || 600};
    `}
`;
