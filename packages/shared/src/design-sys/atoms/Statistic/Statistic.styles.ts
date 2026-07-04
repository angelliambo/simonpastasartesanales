import styled, { css, keyframes } from "styled-components";
import {
  StyledStatisticProps,
  StatisticTitleProps,
  StatisticValueProps,
  StatisticAffixProps,
  StatisticTrendProps,
  TrendType,
} from "./Statistic.types";

// =====================================
// ANIMATIONS
// =====================================

// Animación de loading para el valor
const statisticLoading = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

// Animación para trend indicators
const trendPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

// Animación para valores que cambian
const valueUpdate = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getStatisticDimensions = (size: string = "md") => {
  switch (size) {
    case "sm":
      return {
        titleFontSize: 12,
        valueFontSize: 20,
        affixFontSize: 16,
        trendFontSize: 10,
        spacing: { title: 4, trend: 8, container: 12 },
        lineHeight: { title: 1.4, value: 1.2 },
      };
    case "md":
      return {
        titleFontSize: 14,
        valueFontSize: 24,
        affixFontSize: 18,
        trendFontSize: 12,
        spacing: { title: 6, trend: 10, container: 16 },
        lineHeight: { title: 1.4, value: 1.2 },
      };
    case "lg":
      return {
        titleFontSize: 16,
        valueFontSize: 32,
        affixFontSize: 24,
        trendFontSize: 14,
        spacing: { title: 8, trend: 12, container: 20 },
        lineHeight: { title: 1.4, value: 1.1 },
      };
    case "xl":
      return {
        titleFontSize: 18,
        valueFontSize: 40,
        affixFontSize: 30,
        trendFontSize: 16,
        spacing: { title: 10, trend: 14, container: 24 },
        lineHeight: { title: 1.4, value: 1.1 },
      };
    default:
      return {
        titleFontSize: 14,
        valueFontSize: 24,
        affixFontSize: 18,
        trendFontSize: 12,
        spacing: { title: 6, trend: 10, container: 16 },
        lineHeight: { title: 1.4, value: 1.2 },
      };
  }
};

// Obtener colores basados en variante
const getStatisticColors = (variant: string = "primary", theme: any) => {
  const colors = theme?.colors || {};

  const variantColors = {
    primary: {
      title: colors.text?.secondary || "#6c757d",
      value: colors.primary?.[600] || "#0056b3",
      valueSecondary: colors.primary?.[500] || "#007bff",
    },
    secondary: {
      title: colors.text?.secondary || "#6c757d",
      value: colors.text?.primary || "#212529",
      valueSecondary: colors.secondary?.[500] || "#6c757d",
    },
    success: {
      title: colors.text?.secondary || "#6c757d",
      value: colors.success?.[600] || "#1e7e34",
      valueSecondary: colors.success?.[500] || "#28a745",
    },
    warning: {
      title: colors.text?.secondary || "#6c757d",
      value: colors.warning?.[600] || "#d39e00",
      valueSecondary: colors.warning?.[500] || "#ffc107",
    },
    error: {
      title: colors.text?.secondary || "#6c757d",
      value: colors.error?.[600] || "#c82333",
      valueSecondary: colors.error?.[500] || "#dc3545",
    },
    info: {
      title: colors.text?.secondary || "#6c757d",
      value: colors.info?.[600] || "#138496",
      valueSecondary: colors.info?.[500] || "#17a2b8",
    },
  };

  return (
    variantColors[variant as keyof typeof variantColors] ||
    variantColors.primary
  );
};

// Obtener colores para trend indicators
const getTrendColors = (trend: TrendType, theme: any) => {
  const colors = theme?.colors || {};

  switch (trend) {
    case "increase":
      return {
        color: colors.success?.[500] || "#28a745",
        backgroundColor: colors.success?.[50] || "#d4edda",
      };
    case "decrease":
      return {
        color: colors.error?.[500] || "#dc3545",
        backgroundColor: colors.error?.[50] || "#f8d7da",
      };
    case "stable":
      return {
        color: colors.text?.secondary || "#6c757d",
        backgroundColor: colors.secondary?.[50] || "#e9ecef",
      };
    default:
      return {
        color: colors.text?.secondary || "#6c757d",
        backgroundColor: "transparent",
      };
  }
};

// =====================================
// MAIN STATISTIC CONTAINER
// =====================================

export const StyledStatistic = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$loading",
      "$interactive",
      "accessibility",
    ].includes(prop),
})<StyledStatisticProps>`
  display: flex;
  flex-direction: column;

  /* 🎯 Spacing usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getStatisticDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      gap: ${dims.spacing.container * spacingMultiplier}px;
      padding: ${dims.spacing.container * spacingMultiplier}px 0;
    `;
  }}

  /* Interactive states */
  ${({ $interactive, accessibility }) =>
    $interactive &&
    css`
      cursor: pointer;
      transition: ${accessibility?.reducedMotion
        ? "none"
        : "transform 0.2s ease"};

      &:hover {
        transform: ${accessibility?.reducedMotion
          ? "none"
          : "translateY(-2px)"};
      }

      &:active {
        transform: ${accessibility?.reducedMotion ? "none" : "translateY(0)"};
      }
    `}
  
  /* Loading state */
  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}
  
  /* Focus ring para accesibilidad */
  ${({ accessibility, $interactive }) =>
    $interactive &&
    accessibility?.focusRing &&
    css`
      &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
        border-radius: 4px;
      }
    `}
`;

// =====================================
// STATISTIC TITLE
// =====================================

export const StatisticTitle = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$variant", "accessibility"].includes(prop),
})<StatisticTitleProps>`
  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", $variant = "primary", theme, accessibility }) => {
    const dims = getStatisticDimensions($size);
    const colors = getStatisticColors($variant, theme);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.titleFontSize * textMultiplier}px;
      line-height: ${dims.lineHeight.title};
      color: ${colors.title};
      font-weight: ${theme?.typography?.fontWeight?.normal || 400};
      margin: 0;
    `;
  }}

  /* Accesibilidad - High contrast */
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme?.colors?.text?.primary || "#000000"};
      font-weight: ${theme?.typography?.fontWeight?.medium || 500};
    `}
  
  /* Text to speech */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// STATISTIC VALUE CONTAINER
// =====================================

export const StatisticValueContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
`;

// =====================================
// STATISTIC VALUE (número principal)
// =====================================

export const StatisticValue = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$variant", "$loading", "accessibility"].includes(prop),
})<StatisticValueProps>`
  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", $variant = "primary", theme, accessibility }) => {
    const dims = getStatisticDimensions($size);
    const colors = getStatisticColors($variant, theme);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.valueFontSize * textMultiplier}px;
      line-height: ${dims.lineHeight.value};
      color: ${colors.value};
      font-weight: ${theme?.typography?.fontWeight?.semibold || 600};
      font-variant-numeric: tabular-nums; /* Números tabulares */
      margin: 0;
    `;
  }}

  /* Loading animation */
  ${({ $loading, accessibility }) =>
    $loading &&
    css`
      animation: ${accessibility?.reducedMotion
        ? "none"
        : `${statisticLoading} 1.5s ease-in-out infinite`};

      &::after {
        content: ${accessibility?.reducedMotion ? '"..."' : '""'};
      }
    `}
  
  /* Value update animation */
  ${({ accessibility }) =>
    !accessibility?.reducedMotion &&
    css`
      &.updating {
        animation: ${valueUpdate} 0.3s ease-out;
      }
    `}
  
  /* Accesibilidad - High contrast */
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme?.colors?.text?.primary || "#000000"};
      font-weight: ${theme?.typography?.fontWeight?.bold || 700};
    `}
`;

// =====================================
// STATISTIC PREFIX/SUFFIX
// =====================================

export const StatisticAffix = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$variant", "$type", "accessibility"].includes(prop),
})<StatisticAffixProps>`
  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", $variant = "primary", theme, accessibility }) => {
    const dims = getStatisticDimensions($size);
    const colors = getStatisticColors($variant, theme);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.affixFontSize * textMultiplier}px;
      color: ${colors.valueSecondary};
      font-weight: ${theme?.typography?.fontWeight?.medium || 500};
      line-height: 1;
    `;
  }}

  /* Spacing según tipo */
  ${({ $type }) =>
    $type === "prefix" &&
    css`
      margin-right: 2px;
    `}
    
  ${({ $type }) =>
    $type === "suffix" &&
    css`
      margin-left: 2px;
    `}
  
  /* Accesibilidad - High contrast */
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme?.colors?.text?.primary || "#000000"};
    `}
`;

// =====================================
// STATISTIC TREND INDICATOR
// =====================================

export const StatisticTrend = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$trend", "accessibility"].includes(prop),
})<StatisticTrendProps>`
  display: flex;
  align-items: center;
  gap: 4px;

  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", $trend = "stable", theme, accessibility }) => {
    const dims = getStatisticDimensions($size);
    const trendColors = getTrendColors($trend, theme);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.trendFontSize * textMultiplier}px;
      color: ${trendColors.color};
      background-color: ${trendColors.backgroundColor};
      padding: 2px 6px;
      border-radius: 12px;
      font-weight: ${theme?.typography?.fontWeight?.medium || 500};
    `;
  }}

  /* Trend animation */
  ${({ accessibility, $trend }) =>
    !accessibility?.reducedMotion &&
    $trend !== "stable" &&
    css`
      animation: ${trendPulse} 2s ease-in-out infinite;
    `}
  
  /* Icon styling */
  .trend-icon {
    font-size: 1em;
    display: inline-flex;
    align-items: center;
  }

  /* Accesibilidad - High contrast */
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      background-color: transparent;
      border: 1px solid currentColor;
      color: ${theme?.colors?.text?.primary || "#000000"};
    `}
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Statistic con fondo tipo card
export const CardStatistic = styled(StyledStatistic)`
  ${({ theme }) => {
    const colors = theme?.colors || {};
    return css`
      background-color: ${colors.background?.card || "#ffffff"};
      border: 1px solid ${colors.border?.light || "#e9ecef"};
      border-radius: ${theme?.borderRadius?.md || "8px"};
      padding: 16px 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
  }}
`;

// Statistic compacto (horizontal layout)
export const CompactStatistic = styled(StyledStatistic)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${StatisticTitle} {
    margin-right: 16px;
    flex: 1;
  }

  ${StatisticValueContainer} {
    flex-shrink: 0;
  }
`;

// Statistic centrado
export const CenteredStatistic = styled(StyledStatistic)`
  align-items: center;
  text-align: center;
`;

// Statistic con borde lateral (para dashboards)
export const BorderedStatistic = styled(StyledStatistic)`
  ${({ $variant = "primary", theme }) => {
    const colors = getStatisticColors($variant, theme);
    return css`
      border-left: 4px solid ${colors.value};
      padding-left: 16px;
    `;
  }}
`;

// Statistic con gradiente
export const GradientStatistic = styled(StyledStatistic)`
  ${({ $variant = "primary", theme }) => {
    const colors = getStatisticColors($variant, theme);
    return css`
      background: linear-gradient(
        135deg,
        ${colors.valueSecondary}10,
        ${colors.value}10
      );
      border-radius: ${theme?.borderRadius?.md || "8px"};
      padding: 16px;
    `;
  }}
`;

// =====================================
// LOADING SKELETON
// =====================================

export const StatisticSkeleton = styled.div`
  ${({ theme }) => css`
    .skeleton-title {
      width: 60%;
      height: 16px;
      background-color: ${theme?.colors?.background?.secondary || "#f8f9fa"};
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .skeleton-value {
      width: 80%;
      height: 28px;
      background-color: ${theme?.colors?.background?.secondary || "#f8f9fa"};
      border-radius: 4px;
    }

    .skeleton-title,
    .skeleton-value {
      animation: ${statisticLoading} 1.5s ease-in-out infinite;
    }
  `}
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getStatisticDimensions,
  getStatisticColors,
  getTrendColors,
  statisticLoading,
  trendPulse,
  valueUpdate,
};
