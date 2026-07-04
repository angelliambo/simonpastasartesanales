import styled, { css, keyframes } from "styled-components";
import {
  StyledTagProps,
  TagContentProps,
  TagCloseProps,
  TagStyle,
  TagVariant,
  TagSize,
} from "./Tag.types";

// =====================================
// ANIMATIONS
// =====================================

// Animación de aparición
const tagSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

// Animación de desaparición
const tagSlideOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-10px);
  }
`;

// Animación de check/uncheck
const tagCheck = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Animación de hover
const tagBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getTagDimensions = (size: TagSize = "md") => {
  switch (size) {
    case "xs":
      return {
        height: 20,
        fontSize: 10,
        padding: { horizontal: 6, vertical: 2 },
        borderRadius: 10,
        closeSize: 12,
        closeOffset: 2,
      };
    case "sm":
      return {
        height: 24,
        fontSize: 12,
        padding: { horizontal: 8, vertical: 4 },
        borderRadius: 12,
        closeSize: 14,
        closeOffset: 2,
      };
    case "md":
      return {
        height: 28,
        fontSize: 14,
        padding: { horizontal: 10, vertical: 6 },
        borderRadius: 14,
        closeSize: 16,
        closeOffset: 3,
      };
    case "lg":
      return {
        height: 32,
        fontSize: 16,
        padding: { horizontal: 12, vertical: 8 },
        borderRadius: 16,
        closeSize: 18,
        closeOffset: 3,
      };
    default:
      return {
        height: 28,
        fontSize: 14,
        padding: { horizontal: 10, vertical: 6 },
        borderRadius: 14,
        closeSize: 16,
        closeOffset: 3,
      };
  }
};

// Obtener colores basados en variante y estilo
const getTagColors = (
  variant: TagVariant = "primary",
  tagStyle: TagStyle = "filled",
  theme: any,
  customColor?: string
) => {
  // Si hay color personalizado, usarlo
  if (customColor) {
    return getCustomTagColors(customColor, tagStyle);
  }

  const colors = theme?.colors || {};

  const baseColors = {
    primary: colors.primary?.[500] || "#007bff",
    secondary: colors.secondary?.[500] || "#6c757d",
    success: colors.success?.[500] || "#28a745",
    warning: colors.warning?.[500] || "#ffc107",
    error: colors.error?.[500] || "#dc3545",
    info: colors.info?.[500] || "#17a2b8",
  };

  const variantColor = baseColors[variant] || baseColors.primary;

  return getStyleColors(variantColor, tagStyle, colors);
};

// Generar colores para color personalizado
const getCustomTagColors = (customColor: string, tagStyle: TagStyle) => {
  switch (tagStyle) {
    case "filled":
      return {
        background: customColor,
        color: "#ffffff",
        border: customColor,
        hover: {
          background: `${customColor}dd`,
          color: "#ffffff",
          border: `${customColor}dd`,
        },
      };
    case "outlined":
      return {
        background: "transparent",
        color: customColor,
        border: customColor,
        hover: {
          background: `${customColor}10`,
          color: customColor,
          border: customColor,
        },
      };
    case "ghost":
      return {
        background: `${customColor}10`,
        color: customColor,
        border: "transparent",
        hover: {
          background: `${customColor}20`,
          color: customColor,
          border: "transparent",
        },
      };
    case "light":
      return {
        background: `${customColor}20`,
        color: customColor,
        border: `${customColor}30`,
        hover: {
          background: `${customColor}30`,
          color: customColor,
          border: `${customColor}40`,
        },
      };
    default:
      return {
        background: customColor,
        color: "#ffffff",
        border: customColor,
        hover: {
          background: `${customColor}dd`,
          color: "#ffffff",
          border: `${customColor}dd`,
        },
      };
  }
};

// Generar colores según estilo
const getStyleColors = (baseColor: string, tagStyle: TagStyle, colors: any) => {
  switch (tagStyle) {
    case "filled":
      return {
        background: baseColor,
        color: "#ffffff",
        border: baseColor,
        hover: {
          background: `${baseColor}dd`,
          color: "#ffffff",
          border: `${baseColor}dd`,
        },
      };
    case "outlined":
      return {
        background: "transparent",
        color: baseColor,
        border: baseColor,
        hover: {
          background: `${baseColor}10`,
          color: baseColor,
          border: baseColor,
        },
      };
    case "ghost":
      return {
        background: `${baseColor}10`,
        color: baseColor,
        border: "transparent",
        hover: {
          background: `${baseColor}20`,
          color: baseColor,
          border: "transparent",
        },
      };
    case "light":
      return {
        background: `${baseColor}20`,
        color: baseColor,
        border: `${baseColor}30`,
        hover: {
          background: `${baseColor}30`,
          color: baseColor,
          border: `${baseColor}40`,
        },
      };
    default:
      return {
        background: baseColor,
        color: "#ffffff",
        border: baseColor,
        hover: {
          background: `${baseColor}dd`,
          color: "#ffffff",
          border: `${baseColor}dd`,
        },
      };
  }
};

// =====================================
// TAG PRINCIPAL
// =====================================

export const StyledTag = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$tagStyle",
      "$checkable",
      "$checked",
      "$disabled",
      "$closable",
      "$customColor",
      "$bordered",
      "$interactive",
      "accessibility",
    ].includes(prop),
})<StyledTagProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  border: 1px solid transparent;
  box-sizing: border-box;
  user-select: none;
  vertical-align: middle;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getTagDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      height: ${dims.height * spacingMultiplier}px;
      padding: ${dims.padding.vertical * spacingMultiplier}px
        ${dims.padding.horizontal * spacingMultiplier}px;
      font-size: ${dims.fontSize * textMultiplier}px;
      border-radius: ${dims.borderRadius}px;
    `;
  }}

  /* 🎯 Colors usando variant + style system */
  ${({
    theme,
    $variant = "primary",
    $tagStyle = "filled",
    $customColor,
    accessibility,
  }) => {
    const tagColors = getTagColors($variant, $tagStyle, theme, $customColor);

    return css`
      background-color: ${tagColors.background};
      color: ${tagColors.color};
      border-color: ${tagColors.border};

      ${accessibility?.highContrast &&
      css`
        background-color: ${tagColors.color === "#ffffff"
          ? "#000000"
          : "#ffffff"};
        color: ${tagColors.color === "#ffffff" ? "#ffffff" : "#000000"};
        border: 2px solid #000000 !important;
        font-weight: ${theme?.typography?.fontWeight?.bold || 700};
      `}
    `;
  }}
  
  /* Bordered style */
  ${({ $bordered = true }) =>
    !$bordered &&
    css`
      border: none !important;
    `}
  
  /* Estados interactivos */
  ${({
    $interactive,
    $disabled,
    accessibility,
    theme,
    $variant = "primary",
    $tagStyle = "filled",
    $customColor,
  }) => {
    if ($disabled) {
      return css`
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      `;
    }

    if (!$interactive) {
      return css`
        cursor: default;
      `;
    }

    const tagColors = getTagColors($variant, $tagStyle, theme, $customColor);

    return css`
      cursor: pointer;
      transition: ${accessibility?.reducedMotion ? "none" : "all 0.2s ease"};

      &:hover {
        ${tagColors.hover &&
        css`
          background-color: ${tagColors.hover.background};
          color: ${tagColors.hover.color};
          border-color: ${tagColors.hover.border};
        `}

        transform: ${accessibility?.reducedMotion
          ? "none"
          : "translateY(-1px)"};
        box-shadow: ${accessibility?.reducedMotion
          ? "none"
          : "0 2px 4px rgba(0, 0, 0, 0.1)"};
      }

      &:active {
        transform: ${accessibility?.reducedMotion ? "none" : "translateY(0)"};
      }

      &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }

      ${accessibility?.focusRing &&
      css`
        &:focus-visible {
          outline: 3px solid currentColor;
          outline-offset: 3px;
        }
      `}
    `;
  }}
  
  /* Estado checked para checkable tags */
  ${({ $checkable, $checked, theme, $variant = "primary" }) => {
    if (!$checkable) return "";

    return css`
      position: relative;

      ${$checked &&
      css`
        &::before {
          content: "✓";
          position: absolute;
          left: 6px;
          font-size: 0.8em;
          font-weight: bold;
        }

        padding-left: ${theme?.spacing?.sm || "20px"};
      `}
    `;
  }}
  
  /* Animaciones */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          animation: ${tagSlideIn} 0.2s ease-out;

          &.checking {
            animation: ${tagCheck} 0.3s ease-out;
          }

          &.removing {
            animation: ${tagSlideOut} 0.2s ease-in forwards;
          }
        `}
  
  /* Accesibilidad - Text to speech */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// TAG CONTENT
// =====================================

export const TagContent = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$disabled", "accessibility"].includes(prop),
})<TagContentProps>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Typography específica */
  font-variant-numeric: tabular-nums;

  /* Spacing cuando hay close button */
  ${({ $size = "md" }) => {
    const dims = getTagDimensions($size);
    return css`
      margin-right: ${dims.closeOffset}px;
    `;
  }}
`;

// =====================================
// TAG CLOSE BUTTON
// =====================================

export const TagClose = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$disabled", "accessibility"].includes(prop),
})<TagCloseProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 🎯 Close button size */
  ${({ $size = "md" }) => {
    const dims = getTagDimensions($size);
    return css`
      width: ${dims.closeSize}px;
      height: ${dims.closeSize}px;
      margin-left: ${dims.closeOffset}px;
      border-radius: 50%;
    `;
  }}

  /* Color y hover states */
  color: currentColor;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 1px solid currentColor;
    outline-offset: 1px;
    opacity: 1;
  }

  /* Estados disabled */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    `}

  /* Transiciones */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: opacity 0.2s ease, background-color 0.2s ease;
        `}
  
  /* Accesibilidad - Focus ring */
  ${({ accessibility }) =>
    accessibility?.focusRing &&
    css`
      &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }
    `}
  
  /* Icon del close */
  &::before {
    content: "×";
    font-size: 1.2em;
    line-height: 1;
  }
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Tag elevado con sombra
export const ElevatedTag = styled(StyledTag)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

// Tag con animación bounce en hover
export const BouncyTag = styled(StyledTag)`
  ${({ accessibility }) =>
    !accessibility?.reducedMotion &&
    css`
      &:hover {
        animation: ${tagBounce} 0.3s ease-out;
      }
    `}
`;

// Tag con gradiente
export const GradientTag = styled(StyledTag)`
  ${({ theme, $variant = "primary" }) => {
    const colors = theme?.colors || {};
    const baseColor = colors[$variant]?.[500] || "#007bff";

    return css`
      background: linear-gradient(135deg, ${baseColor}, ${baseColor}CC);
      border-color: ${baseColor};
    `;
  }}
`;

// Tag con bordes redondeados
export const RoundedTag = styled(StyledTag)`
  border-radius: 20px !important;
`;

// Tag cuadrado/rectangular
export const SquareTag = styled(StyledTag)`
  border-radius: 4px !important;
`;

// Tag con animación pulse para status importantes
export const PulsingTag = styled(StyledTag)`
  ${({ accessibility, $variant }) =>
    !accessibility?.reducedMotion &&
    ($variant === "error" || $variant === "warning") &&
    css`
      animation: ${tagCheck} 2s ease-in-out infinite;
    `}
`;

// =====================================
// FILTER TAG ESPECÍFICO
// =====================================

export const FilterTag = styled(StyledTag)`
  ${({ theme, $checked }) => {
    const colors = theme?.colors || {};

    return css`
      position: relative;

      ${$checked &&
      css`
        background-color: ${colors.primary?.[500] || "#007bff"};
        color: #ffffff;
        border-color: ${colors.primary?.[500] || "#007bff"};

        &::after {
          content: "";
          position: absolute;
          top: -2px;
          right: -2px;
          width: 6px;
          height: 6px;
          background-color: ${colors.success?.[500] || "#28a745"};
          border-radius: 50%;
        }
      `}

      &:hover {
        transform: scale(1.05);
      }
    `;
  }}
`;

// =====================================
// STATUS TAG ESPECÍFICO
// =====================================

export const StatusTag = styled(StyledTag)`
  ${({ $variant, theme }) => {
    const colors = theme?.colors || {};

    const statusColors = {
      success: colors.success?.[500] || "#28a745",
      warning: colors.warning?.[500] || "#ffc107",
      error: colors.error?.[500] || "#dc3545",
      info: colors.info?.[500] || "#17a2b8",
    };

    const statusColor =
      statusColors[$variant as keyof typeof statusColors] || statusColors.info;

    return css`
      position: relative;
      padding-left: 20px;

      &::before {
        content: "";
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        background-color: ${statusColor};
        border-radius: 50%;
        box-shadow: 0 0 4px ${statusColor}50;
      }
    `;
  }}
`;

// =====================================
// SKILL TAG ESPECÍFICO
// =====================================

export const SkillTag = styled(StyledTag)`
  ${({ theme }) => {
    // Usar CSS variable para el nivel
    const level = "var(--skill-level, 1)";

    return css`
      --level: ${level};
      --level-color-1: #ff4d4f;
      --level-color-2: #faad14;
      --level-color-3: #1890ff;
      --level-color-4: #52c41a;
      --level-color-5: #722ed1;

      background: linear-gradient(
        90deg,
        var(--skill-level) == 1 ? var(--level-color-1): var(--skill-level) == 2
          ? var(--level-color-2): var(--skill-level) == 3 ? var(--level-color-3):
          var(--skill-level) == 4 ? var(--level-color-4): var(--level-color-5)
          calc(var(--skill-level) * 20%),
        #f0f0f0 calc(var(--skill-level) * 20%)
      );
      color: ${theme?.colors?.text?.primary || "#000000"};
      position: relative;

      /* Simplificar para evitar problemas CSS complejos */
      &[style*="--skill-level: 1"] {
        background: linear-gradient(90deg, #ff4d4f 20%, #f0f0f0 20%);
      }
      &[style*="--skill-level: 2"] {
        background: linear-gradient(90deg, #faad14 40%, #f0f0f0 40%);
      }
      &[style*="--skill-level: 3"] {
        background: linear-gradient(90deg, #1890ff 60%, #f0f0f0 60%);
        color: #ffffff;
      }
      &[style*="--skill-level: 4"] {
        background: linear-gradient(90deg, #52c41a 80%, #f0f0f0 80%);
        color: #ffffff;
      }
      &[style*="--skill-level: 5"] {
        background: linear-gradient(90deg, #722ed1 100%, #f0f0f0 100%);
        color: #ffffff;
      }
    `;
  }}
`;

// =====================================
// CATEGORY TAG ESPECÍFICO
// =====================================

export const CategoryTag = styled(StyledTag)`
  ${({ $customColor }) => {
    // Color generado por hash de la categoría
    return css`
      background-color: ${$customColor || "#007bff"};
      color: #ffffff;
      border-color: ${$customColor || "#007bff"};

      &:hover {
        filter: brightness(1.1);
      }
    `;
  }}
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getTagDimensions,
  getTagColors,
  getCustomTagColors,
  getStyleColors,
  tagSlideIn,
  tagSlideOut,
  tagCheck,
  tagBounce,
};
