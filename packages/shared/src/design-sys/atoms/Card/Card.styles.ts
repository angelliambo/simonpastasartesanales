import styled, { css } from "styled-components";
import { StyledCardProps, SIZE_MAPPING } from "./Card.types";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// Helper para obtener tamaño normalizado
const getNormalizedSize = (size?: string) => {
  if (!size) return "md";
  return SIZE_MAPPING[size] || size;
};

// Styled Card principal (versión simplificada sin template literal complejos)
export const StyledCard = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<StyledCardProps>`
  font-family: ${({ theme }) =>
    theme.typography?.fontFamily?.primary || "inherit"};
  background-color: ${({ theme }) =>
    theme.colors?.background?.card || "#ffffff"};
  border-radius: ${({ theme }) => theme.borderRadius?.lg || "12px"};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "all 0.3s ease"};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  /* Variantes - versión simplificada */
  ${({ theme, $variant = "default", accessibility }) => {
    const colors = theme.colors || {};
    const shadows = theme.shadows || {};
    const highContrast = accessibility?.highContrast;

    if ($variant === "elevated") {
      return css`
        box-shadow: ${shadows.medium || "0 4px 12px rgba(0,0,0,0.15)"};
        border: ${highContrast ? "2px" : "1px"} solid
          ${colors.border?.normal || "#e1e5e9"};
      `;
    }

    if ($variant === "outlined") {
      return css`
        border: 2px solid ${colors.border?.normal || "#e1e5e9"};
        box-shadow: none;
      `;
    }

    if ($variant === "filled") {
      return css`
        background-color: ${colors.background?.secondary || "#f8f9fa"};
        border: none;
        box-shadow: none;
      `;
    }

    if ($variant === "glass") {
      const glassBg = theme.effects?.glassBackground || "rgba(255, 255, 255, 0.75)";
      const glassBorder = theme.effects?.glassBorder || "rgba(255, 255, 255, 0.3)";
      const glassShadow = theme.effects?.glassShadow || "0 8px 32px 0 rgba(31, 38, 135, 0.37)";
      const textPrimary = accessibility?.highContrast ? "#000000" : (theme.colors?.text?.primary || "#ffffff");

      return css`
        background: ${glassBg};
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid ${glassBorder};
        box-shadow: ${glassShadow};
        color: ${textPrimary};
      `;
    }

    // default
    return css`
      border: 1px solid ${colors.border?.light || "#e9ecef"};
      box-shadow: ${shadows.light || "0 2px 4px rgba(0,0,0,0.1)"};
    `;
  }}

  /* Tamaños - versión simplificada con sistema responsive */
  ${({ theme, $size = "md", accessibility }) => {
    const spacing = theme.spacing || {};
    const normalizedSize = getNormalizedSize($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    const spacingMultiplier = accessibility?.largeText ? 1.5 : 1;

    // Helper para obtener spacing responsive
    const getResponsiveSpacing = (sizeKey: "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => {
      // En mobile, usar spacing.mobile, en desktop usar spacing normal
      const mobileSpacing = spacing.mobile?.[sizeKey];
      const desktopSpacing = spacing[sizeKey];
      return mobileSpacing || desktopSpacing || "0px";
    };

    if (normalizedSize === "xs") {
      const paddingValue = Number(getResponsiveSpacing("md")) || 8; // Cambiar de sm a md
      return css`
        @media (max-width: 767px) {
          padding: ${(Number(spacing.mobile?.md) || 8) * spacingMultiplier}px; // Cambiar de sm a md
        }
        @media (min-width: 768px) {
          padding: ${paddingValue * spacingMultiplier}px;
        }
        font-size: ${12 * textMultiplier}px;
      `;
    }

    if (normalizedSize === "sm") {
      const paddingValue = Number(getResponsiveSpacing("md")) || 16;
      return css`
        @media (max-width: 767px) {
          padding: ${(Number(spacing.mobile?.md) || 8) * spacingMultiplier}px; // Cambiar de sm a md
        }
        @media (min-width: 768px) {
          padding: ${paddingValue * spacingMultiplier}px;
        }
        font-size: ${14 * textMultiplier}px;
      `;
    }

    if (normalizedSize === "lg") {
      const paddingValue = Number(getResponsiveSpacing("xl")) || 32;
      return css`
        @media (max-width: 767px) {
          padding: ${(Number(spacing.mobile?.md) || 8) * spacingMultiplier}px; // Cambiar de sm a md
        }
        @media (min-width: 768px) {
          padding: ${paddingValue * spacingMultiplier}px;
        }
        font-size: ${18 * textMultiplier}px;
      `;
    }

    if (normalizedSize === "xl") {
      const paddingValue = Number(getResponsiveSpacing("xxl")) || 40;
      return css`
        @media (max-width: 767px) {
          padding: ${(Number(spacing.mobile?.lg) || 13) * spacingMultiplier}px;
        }
        @media (min-width: 768px) {
          padding: ${paddingValue * spacingMultiplier}px;
        }
        font-size: ${20 * textMultiplier}px;
      `;
    }

    // md (default)
    const paddingValue = Number(getResponsiveSpacing("lg")) || 24;
    return css`
      @media (max-width: 767px) {
        padding: ${(Number(spacing.mobile?.md) || 8) * spacingMultiplier}px; // Cambiar de sm a md
      }
      @media (min-width: 768px) {
        padding: ${paddingValue * spacingMultiplier}px;
      }
      font-size: ${16 * textMultiplier}px;
    `;
  }}

  /* Interactividad - versión simplificada */
  ${({ $interactive, accessibility }) => {
    if ($interactive) {
      return css`
        cursor: pointer;

        &:hover {
          ${!accessibility?.reducedMotion && "transform: translateY(-2px);"}
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        &:active {
          transform: translateY(0);
        }

        &:focus-visible {
          outline: 3px solid
            ${accessibility?.highContrast ? "#000000" : "#007bff"};
          outline-offset: 2px;
        }
      `;
    }
    return css`
      cursor: default;
    `;
  }}
  
  /* Estado seleccionado */
  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-color: ${theme.colors?.primary?.[500] || "#007bff"};
      box-shadow: 0 0 0 3px ${theme.colors?.primary?.[200] || "#b8daff"};
    `}
`;

// Card Header
export const CardHeader = styled.div<{ $size?: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => Number(theme.spacing?.md) || 16}px;
  margin-bottom: ${({ theme, $size }) => {
    const spacing = theme.spacing || {};
    const normalizedSize = getNormalizedSize($size);

    if (normalizedSize === "xs") return Number(spacing.xs) || 8;
    if (normalizedSize === "sm") return Number(spacing.sm) || 12;
    if (normalizedSize === "lg") return Number(spacing.lg) || 20;
    if (normalizedSize === "xl") return Number(spacing.xl) || 24;
    return Number(spacing.md) || 16; // md default
  }}px;
`;

// Card Header Content (left side - title, subtitle, icon)
export const CardHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => Number(theme.spacing?.xs) || 4}px;
  flex: 1;
  min-width: 0; // Para evitar overflow
`;

// Card Extra (right side of header)
export const CardExtra = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

// Card Title
export const CardTitle = styled.h3.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ $size?: string; accessibility?: any }>`
  margin: 0;
  font-size: ${({ theme, $size, accessibility }) => {
    const fontSize = theme.typography?.fontSize || {};
    const normalizedSize = getNormalizedSize($size);
    const multiplier = accessibility?.largeText ? 1.25 : 1;

    if (normalizedSize === "xs")
      return (Number(fontSize.sm) || 14) * multiplier;
    if (normalizedSize === "sm")
      return (Number(fontSize.md) || 16) * multiplier;
    if (normalizedSize === "lg")
      return (Number(fontSize.xl) || 20) * multiplier;
    if (normalizedSize === "xl")
      return (Number(fontSize.xxl) || 24) * multiplier;
    return (Number(fontSize.lg) || 18) * multiplier; // md default
  }}px;

  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? "#000000"
      : theme.colors?.text?.primary || "#212529"};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => Number(theme.spacing?.sm) || 8}px;
  line-height: 1.2;
`;

// Card Subtitle
export const CardSubtitle = styled.p.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ $size?: string; accessibility?: any }>`
  margin: 0;
  font-size: ${({ theme, $size, accessibility }) => {
    const fontSize = theme.typography?.fontSize || {};
    const normalizedSize = getNormalizedSize($size);
    const multiplier = accessibility?.largeText ? 1.25 : 1;

    if (normalizedSize === "xs")
      return (Number(fontSize.xs) || 12) * multiplier;
    if (normalizedSize === "lg")
      return (Number(fontSize.md) || 16) * multiplier;
    if (normalizedSize === "xl")
      return (Number(fontSize.lg) || 18) * multiplier;
    return (Number(fontSize.sm) || 14) * multiplier; // sm, md default
  }}px;

  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? "#333333"
      : theme.colors?.text?.secondary || "#6c757d"};

  line-height: 1.4;
`;

// Card Icon
export const CardIcon = styled.span<{ $size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) => {
    const normalizedSize = getNormalizedSize($size);

    if (normalizedSize === "xs") return "16px";
    if (normalizedSize === "sm") return "20px";
    if (normalizedSize === "lg") return "28px";
    if (normalizedSize === "xl") return "32px";
    return "24px"; // md default
  }};

  line-height: 1;
  flex-shrink: 0;
`;

// Card Content
export const CardContent = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ accessibility?: any }>`
  flex: 1;
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? "#000000"
      : theme.colors?.text?.primary || "#212529"};

  line-height: 1.6;
  min-height: 0;
  word-break: break-word;
`;
