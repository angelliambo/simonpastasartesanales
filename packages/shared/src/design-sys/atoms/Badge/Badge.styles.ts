import styled, { css, keyframes } from "styled-components";
import {
  BadgeWrapperProps,
  StyledBadgeProps,
  BadgeContentProps,
  BadgePlacement,
  BadgeStatus,
  STATUS_COLORS,
} from "./Badge.types";

// =====================================
// ANIMATIONS
// =====================================

// Animación de aparición
const badgeZoomIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animación de desaparición
const badgeZoomOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

// Animación de actualización (cuando cambia el count)
const badgeUpdate = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

// Animación de pulse para processing status
const badgePulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Animación de wave para status processing
const badgeWave = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getBadgeDimensions = (size: string = "md") => {
  switch (size) {
    case "xs":
      return {
        height: 16,
        fontSize: 10,
        padding: { horizontal: 4, vertical: 1 },
        dotSize: 6,
        minWidth: 16,
      };
    case "sm":
      return {
        height: 20,
        fontSize: 11,
        padding: { horizontal: 6, vertical: 2 },
        dotSize: 8,
        minWidth: 20,
      };
    case "md":
      return {
        height: 22,
        fontSize: 12,
        padding: { horizontal: 8, vertical: 3 },
        dotSize: 10,
        minWidth: 22,
      };
    case "lg":
      return {
        height: 26,
        fontSize: 14,
        padding: { horizontal: 10, vertical: 4 },
        dotSize: 12,
        minWidth: 26,
      };
    default:
      return {
        height: 22,
        fontSize: 12,
        padding: { horizontal: 8, vertical: 3 },
        dotSize: 10,
        minWidth: 22,
      };
  }
};

// Obtener colores basados en variante
const getBadgeColors = (
  variant: string = "primary",
  theme: any,
  customColor?: string
) => {
  // Si hay color personalizado, usarlo
  if (customColor) {
    return {
      background: customColor,
      color: "#ffffff",
    };
  }

  const colors = theme?.colors || {};

  const variantColors = {
    primary: {
      background: colors.primary?.[500] || "#007bff",
      color: "#ffffff",
    },
    secondary: {
      background: colors.secondary?.[500] || "#6c757d",
      color: "#ffffff",
    },
    success: {
      background: colors.success?.[500] || "#28a745",
      color: "#ffffff",
    },
    warning: {
      background: colors.warning?.[500] || "#ffc107",
      color: "#000000",
    },
    error: {
      background: colors.error?.[500] || "#dc3545",
      color: "#ffffff",
    },
    info: {
      background: colors.info?.[500] || "#17a2b8",
      color: "#ffffff",
    },
  };

  return (
    variantColors[variant as keyof typeof variantColors] ||
    variantColors.primary
  );
};

// Obtener colores para status badges
const getStatusColors = (status: BadgeStatus, theme: any) => {
  const colors = theme?.colors || {};

  switch (status) {
    case "success":
      return {
        background: colors.success?.[500] || STATUS_COLORS.success,
        color: "#ffffff",
      };
    case "error":
      return {
        background: colors.error?.[500] || STATUS_COLORS.error,
        color: "#ffffff",
      };
    case "warning":
      return {
        background: colors.warning?.[500] || STATUS_COLORS.warning,
        color: "#000000",
      };
    case "processing":
      return {
        background: colors.primary?.[500] || STATUS_COLORS.processing,
        color: "#ffffff",
      };
    case "default":
    default:
      return {
        background: STATUS_COLORS.default,
        color: "#000000",
      };
  }
};

// Obtener posición del badge según placement
const getBadgePosition = (
  placement: BadgePlacement = "top-right",
  offset: [number, number] = [0, 0]
) => {
  const [offsetX, offsetY] = offset;

  const positions = {
    "top-right": {
      top: `${offsetY}px`,
      right: `${offsetX}px`,
      transform: "translate(50%, -50%)",
    },
    "top-left": {
      top: `${offsetY}px`,
      left: `${offsetX}px`,
      transform: "translate(-50%, -50%)",
    },
    "bottom-right": {
      bottom: `${offsetY}px`,
      right: `${offsetX}px`,
      transform: "translate(50%, 50%)",
    },
    "bottom-left": {
      bottom: `${offsetY}px`,
      left: `${offsetX}px`,
      transform: "translate(-50%, 50%)",
    },
    "top-center": {
      top: `${offsetY}px`,
      left: "50%",
      transform: `translate(calc(-50% + ${offsetX}px), -50%)`,
    },
    "bottom-center": {
      bottom: `${offsetY}px`,
      left: "50%",
      transform: `translate(calc(-50% + ${offsetX}px), 50%)`,
    },
    "left-center": {
      top: "50%",
      left: `${offsetX}px`,
      transform: `translate(-50%, calc(-50% + ${offsetY}px))`,
    },
    "right-center": {
      top: "50%",
      right: `${offsetX}px`,
      transform: `translate(50%, calc(-50% + ${offsetY}px))`,
    },
  };

  return positions[placement] || positions["top-right"];
};

// =====================================
// BADGE WRAPPER (cuando envuelve children)
// =====================================

export const BadgeWrapper = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$hasChildren", "accessibility"].includes(prop),
})<BadgeWrapperProps>`
  position: relative;
  display: ${({ $hasChildren }) =>
    $hasChildren ? "inline-block" : "inline-flex"};
  vertical-align: middle;

  /* Spacing para accesibilidad */
  ${({ accessibility }) => {
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      margin: ${2 * spacingMultiplier}px;
    `;
  }}
`;

// =====================================
// BADGE PRINCIPAL
// =====================================

export const StyledBadge = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$dot",
      "$placement",
      "$offset",
      "$isEmpty",
      "$customColor",
      "$status",
      "accessibility",
    ].includes(prop),
})<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  white-space: nowrap;
  text-align: center;
  border: 1px solid transparent;
  box-sizing: border-box;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", $dot = false, accessibility }) => {
    const dims = getBadgeDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    if ($dot) {
      return css`
        width: ${dims.dotSize * spacingMultiplier}px;
        height: ${dims.dotSize * spacingMultiplier}px;
        border-radius: 50%;
        padding: 0;
        min-width: unset;
      `;
    }

    return css`
      height: ${dims.height * spacingMultiplier}px;
      padding: ${dims.padding.vertical * spacingMultiplier}px
        ${dims.padding.horizontal * spacingMultiplier}px;
      font-size: ${dims.fontSize * textMultiplier}px;
      min-width: ${dims.minWidth}px;
      border-radius: ${dims.height / 2}px;
      line-height: 1;
    `;
  }}

  /* 🎯 Colors usando variant system */
  ${({ theme, $variant = "primary", $customColor, $status, accessibility }) => {
    let badgeColors;

    if ($status) {
      badgeColors = getStatusColors($status, theme);
    } else {
      badgeColors = getBadgeColors($variant, theme, $customColor);
    }

    return css`
      background-color: ${badgeColors.background};
      color: ${badgeColors.color};
      border-color: ${badgeColors.background};

      ${accessibility?.highContrast &&
      css`
        background-color: ${badgeColors.color === "#ffffff"
          ? "#000000"
          : "#ffffff"};
        color: ${badgeColors.color === "#ffffff" ? "#ffffff" : "#000000"};
        border: 2px solid #000000 !important;
        font-weight: ${theme?.typography?.fontWeight?.bold || 700};
      `}
    `;
  }}
  
  /* Positioning cuando está sobre elemento */
  ${({ $placement, $offset }) =>
    $placement &&
    css`
      position: absolute;
      z-index: 10;
      ${getBadgePosition($placement, $offset)}
    `}
  
  /* Ocultar cuando está vacío */
  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      display: none;
    `}
  
  /* Animaciones */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          animation: ${badgeZoomIn} 0.2s ease-out;
          transition: all 0.3s ease;

          &.updating {
            animation: ${badgeUpdate} 0.4s ease-out;
          }
        `}
  
  /* Processing animation para status */
  ${({ $status, accessibility }) =>
    $status === "processing" &&
    !accessibility?.reducedMotion &&
    css`
      animation: ${badgePulse} 1.5s ease-in-out infinite;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid currentColor;
        border-radius: inherit;
        animation: ${badgeWave} 1.5s ease-out infinite;
      }
    `}
  
  /* Focus states para interactividad */
  ${({ onClick, accessibility }) =>
    onClick &&
    css`
      cursor: pointer;

      &:hover {
        transform: ${accessibility?.reducedMotion ? "none" : "scale(1.1)"};
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
    `}
  
  /* Accesibilidad - Text to speech */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// BADGE CONTENT
// =====================================

export const BadgeContent = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$dot", "accessibility"].includes(prop),
})<BadgeContentProps>`
  ${({ $dot }) =>
    $dot &&
    css`
      display: none;
    `}

  /* Typography específica */
  font-variant-numeric: tabular-nums; /* Números tabulares */

  /* Truncate si es muy largo */
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Badge con sombra elevada
export const ElevatedBadge = styled(StyledBadge)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

// Badge con borde grueso
export const OutlinedBadge = styled(StyledBadge)`
  ${({ theme, $variant = "primary", $customColor }) => {
    const badgeColors = getBadgeColors($variant, theme, $customColor);
    return css`
      background-color: transparent;
      color: ${badgeColors.background};
      border: 2px solid ${badgeColors.background};
    `;
  }}
`;

// Badge cuadrado/rectangular
export const SquareBadge = styled(StyledBadge)`
  border-radius: 4px !important;
`;

// Badge extra redondeado
export const RoundedBadge = styled(StyledBadge)`
  border-radius: ${({ theme }) => theme?.borderRadius?.lg || "12px"} !important;
`;

// Badge con gradiente
export const GradientBadge = styled(StyledBadge)`
  ${({ theme, $variant = "primary" }) => {
    const badgeColors = getBadgeColors($variant, theme);
    return css`
      background: linear-gradient(
        135deg,
        ${badgeColors.background},
        ${badgeColors.background}CC
      );
    `;
  }}
`;

// Badge pulsante para notificaciones importantes
export const PulsingBadge = styled(StyledBadge)`
  ${({ accessibility }) =>
    !accessibility?.reducedMotion &&
    css`
      animation: ${badgePulse} 2s ease-in-out infinite;
    `}
`;

// =====================================
// STATUS BADGE ESPECÍFICO
// =====================================

export const StatusBadge = styled(StyledBadge)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
  min-width: unset;
  border: 2px solid
    ${({ theme }) => theme?.colors?.background?.card || "#ffffff"};
`;

// =====================================
// NOTIFICATION BADGE (para contadores altos)
// =====================================

export const NotificationBadge = styled(StyledBadge)`
  ${({ theme }) => {
    const colors = getBadgeColors("error", theme);
    return css`
      background-color: ${colors.background};
      color: ${colors.color};
      font-weight: ${theme?.typography?.fontWeight?.bold || 700};

      /* Más prominente para notificaciones */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      /* Animación suave */
      &.new-notification {
        animation: ${badgeUpdate} 0.6s ease-out;
      }
    `;
  }}
`;

// =====================================
// ONLINE STATUS INDICATOR
// =====================================

export const OnlineIndicator = styled(StyledBadge)`
  ${({ $status, theme }) => {
    const isOnline = $status === "success";
    const colors = getStatusColors(isOnline ? "success" : "default", theme);

    return css`
      width: 12px;
      height: 12px;
      border-radius: 50%;
      padding: 0;
      min-width: unset;
      background-color: ${colors.background};
      border: 2px solid ${theme?.colors?.background?.card || "#ffffff"};

      ${isOnline &&
      css`
        box-shadow: 0 0 6px ${colors.background}50;
      `}
    `;
  }}
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getBadgeDimensions,
  getBadgeColors,
  getStatusColors,
  getBadgePosition,
  badgeZoomIn,
  badgeZoomOut,
  badgeUpdate,
  badgePulse,
  badgeWave,
};
