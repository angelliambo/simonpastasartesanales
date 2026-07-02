import styled, { css, keyframes } from "styled-components";
import {
  StyledButtonProps,
  LoadingSpinnerProps,
  ButtonIconProps,
} from "./Button.types";
import { createShouldForwardProp } from "../../../../utils/shouldForwardProp";

// Animación del spinner (de ui/Button.tsx)
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Loading Spinner mejorado
export const LoadingSpinner = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["size", "reducedMotion"]),
})<LoadingSpinnerProps>`
  width: ${({ size }) => {
    switch (size) {
      case "xs":
        return "12px";
      case "sm":
        return "16px";
      case "md":
        return "20px";
      case "lg":
        return "24px";
      case "xl":
        return "28px";
      default:
        return "20px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "xs":
        return "12px";
      case "sm":
        return "16px";
      case "md":
        return "20px";
      case "lg":
        return "24px";
      case "xl":
        return "28px";
      default:
        return "20px";
    }
  }};
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${({ reducedMotion }) =>
    reducedMotion
      ? "none"
      : css`
          ${spinAnimation} 1s linear infinite
        `};
`;

// Icon component (mejorado de ui/Button.tsx)
export const ButtonIcon = styled.span.withConfig({
  shouldForwardProp: createShouldForwardProp(["size", "position"]),
})<ButtonIconProps>`
  display: inline-flex;
  align-items: center;
  font-size: ${({ size }) => {
    switch (size) {
      case "xs":
        return "12px";
      case "sm":
        return "14px";
      case "md":
        return "16px";
      case "lg":
        return "18px";
      case "xl":
        return "20px";
      default:
        return "16px";
    }
  }};
  line-height: 1;

  ${({ position }) =>
    position === "left" &&
    css`
      margin-right: 8px;
    `}

  ${({ position }) =>
    position === "right" &&
    css`
      margin-left: 8px;
    `}
`;

// Styled Button principal (mejorado de atoms/Button.tsx)
export const StyledButton = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "colors",
    "accessibility",
    "gap",
  ]),
})<StyledButtonProps>`
  font-family: var(--font-family, "Hind Vadodara", sans-serif);
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "all 0.3s ease"};
  text-decoration: none;
  outline: none;
  position: relative;
  overflow: hidden;

  // Tamaños (expandidos y mejorados)
  ${({ $size = "md", accessibility }) => {
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    const spacingMultiplier = accessibility?.largeText ? 1.5 : 1;

    switch ($size) {
      case "xs":
        return css`
          padding: ${4 * spacingMultiplier}px ${8 * spacingMultiplier}px;
          font-size: ${12 * textMultiplier}px;
          min-height: ${24 * spacingMultiplier}px;
        `;
      case "sm":
        return css`
          padding: ${6 * spacingMultiplier}px ${12 * spacingMultiplier}px;
          font-size: ${14 * textMultiplier}px;
          min-height: ${32 * spacingMultiplier}px;
        `;
      case "md":
        return css`
          padding: ${8 * spacingMultiplier}px ${16 * spacingMultiplier}px;
          font-size: ${14 * textMultiplier}px;
          min-height: ${40 * spacingMultiplier}px;
        `;
      case "lg":
        return css`
          padding: ${12 * spacingMultiplier}px ${20 * spacingMultiplier}px;
          font-size: ${16 * textMultiplier}px;
          min-height: ${48 * spacingMultiplier}px;
        `;
      case "xl":
        return css`
          padding: ${16 * spacingMultiplier}px ${24 * spacingMultiplier}px;
          font-size: ${18 * textMultiplier}px;
          min-height: ${56 * spacingMultiplier}px;
        `;
      default:
        return css`
          padding: ${8 * spacingMultiplier}px ${16 * spacingMultiplier}px;
          font-size: ${14 * textMultiplier}px;
          min-height: ${40 * spacingMultiplier}px;
        `;
    }
  }}

  // Variantes (de atoms/Button.tsx con mejoras)
  ${({ $variant = "primary", colors, accessibility }) => {
    const highContrast = accessibility?.highContrast;
    const backgroundColors = colors?.background || {};
    const backgroundCard =
      backgroundColors.card ??
      backgroundColors.surface ??
      backgroundColors.primary ??
      "#ffffff";
    const backgroundSecondary =
      backgroundColors.secondary ?? backgroundCard;
    const borderColors = colors?.border || {};
    const textColors = colors?.text || {};
    const textPrimary = textColors.primary ?? "#111827";
    const textInverse = textColors.inverse ?? "#ffffff";

    switch ($variant) {
      case "primary":
        return css`
          background-color: ${colors.primary[500]};
          color: ${highContrast ? "#ffffff" : textInverse};
          border-color: ${colors.primary[500]};

          &:hover:not(:disabled) {
            background-color: ${colors.primary[600]};
            border-color: ${colors.primary[600]};
            ${!accessibility?.reducedMotion &&
            css`
              transform: translateY(-1px);
              box-shadow: ${colors.shadow?.medium ||
              "0 4px 12px rgba(0,0,0,0.15)"};
            `}
          }

          &:active:not(:disabled) {
            background-color: ${colors.primary[700]};
            border-color: ${colors.primary[700]};
            transform: translateY(0);
          }

          ${highContrast &&
          css`
            border: 2px solid ${colors.border?.contrast || "#000000"};
            font-weight: 600;
          `}
        `;

      case "secondary":
        return css`
          background-color: ${backgroundCard};
          color: ${highContrast ? "#000000" : textPrimary};
          border-color: ${borderColors.normal ?? "#d1d5db"};

          &:hover:not(:disabled) {
            background-color: ${backgroundSecondary};
            border-color: ${colors.primary[500]};
            color: ${colors.primary[500]};
          }

          ${highContrast &&
          css`
            border: 2px solid ${borderColors?.contrast || "#000000"};
            font-weight: 600;
          `}
        `;

      case "outlined":
        return css`
          background-color: transparent;
          color: ${highContrast ? "#000000" : textPrimary};
          border: 2px solid ${borderColors.normal ?? "#d1d5db"};

          &:hover:not(:disabled) {
            background-color: transparent;
            border-color: ${colors.primary[500]};
            color: ${colors.primary[500]};
            ${!accessibility?.reducedMotion &&
            css`
              transform: translateY(-1px);
            `}
          }

          &:active:not(:disabled) {
            background-color: ${colors.primary[50]};
            border-color: ${colors.primary[600]};
            color: ${colors.primary[600]};
            transform: translateY(0);
          }

          ${highContrast &&
          css`
            border: 2px solid ${borderColors?.contrast || "#000000"};
            font-weight: 600;
          `}
        `;

      case "tertiary":
        return css`
          background-color: transparent;
          color: ${highContrast ? "#000000" : textPrimary};
          border-color: transparent;

          &:hover:not(:disabled) {
            background-color: ${backgroundSecondary};
          }

          ${highContrast &&
          css`
            border: 1px solid ${borderColors?.contrast || "#000000"};
          `}
        `;

      case "success":
        return css`
          background-color: ${colors.success[500]};
          color: ${highContrast ? "#ffffff" : textInverse};
          border-color: ${colors.success[500]};

          &:hover:not(:disabled) {
            background-color: ${colors.success[600]};
            border-color: ${colors.success[600]};
          }

          ${highContrast &&
          css`
            border: 2px solid ${colors.border?.contrast || "#000000"};
            font-weight: 600;
          `}
        `;

      case "warning":
        return css`
          background-color: ${colors.warning[500]};
          color: ${highContrast ? "#000000" : textInverse};
          border-color: ${colors.warning[500]};

          &:hover:not(:disabled) {
            background-color: ${colors.warning[600]};
            border-color: ${colors.warning[600]};
          }
        `;

      case "error":
        return css`
          background-color: ${colors.error[500]};
          color: ${highContrast ? "#ffffff" : textInverse};
          border-color: ${colors.error[500]};

          &:hover:not(:disabled) {
            background-color: ${colors.error[600]};
            border-color: ${colors.error[600]};
          }
        `;

      case "info":
        return css`
          background-color: ${colors.info[500]};
          color: ${highContrast ? "#ffffff" : textInverse};
          border-color: ${colors.info[500]};

          &:hover:not(:disabled) {
            background-color: ${colors.info[600]};
            border-color: ${colors.info[600]};
          }
        `;

      case "ghost":
        return css`
          background-color: transparent;
          color: ${highContrast ? "#000000" : textPrimary};
          border-color: ${borderColors.normal ?? "#d1d5db"};

          &:hover:not(:disabled) {
            background-color: ${backgroundSecondary};
            border-color: ${colors.primary[500]};
          }

          ${highContrast &&
          css`
            border: 2px solid ${borderColors?.contrast || "#000000"};
          `}
        `;

      case "link":
        return css`
          background-color: transparent;
          color: ${colors.primary[500]};
          border-color: transparent;
          text-decoration: underline;

          &:hover:not(:disabled) {
            color: ${colors.primary[600]};
            text-decoration: none;
          }

          ${highContrast &&
          css`
            text-decoration: underline;
            font-weight: 600;
          `}
        `;

      default:
        return css`
          background-color: ${colors.primary[500]};
          color: ${textInverse};
          border-color: ${colors.primary[500]};
        `;
    }
  }}
  
  // Estados
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    `}
  
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  
  // Focus (mejorado para accesibilidad)
  &:focus-visible {
    outline: 3px solid
      ${({ colors, accessibility }) =>
        accessibility?.highContrast
          ? "#000000"
          : colors.primary[200] || colors.primary[500]};
    outline-offset: 2px;
  }

  // Loading state
  ${({ $loading }) =>
    $loading &&
    css`
      position: relative;

      > *:not(${LoadingSpinner}) {
        opacity: 0.7;
      }
    `}
`;
