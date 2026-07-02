import styled, { css, keyframes } from "styled-components";
import {
  StyledAlertProps,
  AlertContentProps,
  AlertIconProps,
  AlertCloseProps,
  AlertActionProps,
  AlertStyle,
} from "./Alert.types";
import { createShouldForwardProp } from "../../../../utils/shouldForwardProp";

// =====================================
// ANIMATIONS
// =====================================

// Animación de entrada
const alertSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animación de salida
const alertSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
`;

// Animación de pulse para estados importantes
const alertPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getAlertDimensions = (size: string = "md") => {
  switch (size) {
    case "sm":
      return {
        padding: { vertical: 8, horizontal: 12 },
        fontSize: 12,
        iconSize: 14,
        borderRadius: 4,
        minHeight: 32,
      };
    case "md":
      return {
        padding: { vertical: 12, horizontal: 16 },
        fontSize: 14,
        iconSize: 16,
        borderRadius: 6,
        minHeight: 40,
      };
    case "lg":
      return {
        padding: { vertical: 16, horizontal: 20 },
        fontSize: 16,
        iconSize: 20,
        borderRadius: 8,
        minHeight: 48,
      };
    default:
      return {
        padding: { vertical: 12, horizontal: 16 },
        fontSize: 14,
        iconSize: 16,
        borderRadius: 6,
        minHeight: 40,
      };
  }
};

// Obtener colores basados en variante y estilo
const getAlertColors = (
  variant: string = "info",
  style: AlertStyle = "soft",
  theme: any
) => {
  const colors = theme?.colors || {};

  const baseColors = {
    primary: colors.primary?.[500] || "#007bff",
    secondary: colors.secondary?.[500] || "#6c757d",
    success: colors.success?.[500] || "#28a745",
    warning: colors.warning?.[500] || "#ffc107",
    error: colors.error?.[500] || "#dc3545",
    info: colors.info?.[500] || "#17a2b8",
  };

  const variantColor =
    baseColors[variant as keyof typeof baseColors] || baseColors.info;

  // Generar variaciones de color
  const lighterShades = {
    primary: colors.primary?.[50] || "#e3f2fd",
    secondary: colors.secondary?.[50] || "#f8f9fa",
    success: colors.success?.[50] || "#d4edda",
    warning: colors.warning?.[50] || "#fff3cd",
    error: colors.error?.[50] || "#f8d7da",
    info: colors.info?.[50] || "#d1ecf1",
  };

  const borderShades = {
    primary: colors.primary?.[200] || "#90caf9",
    secondary: colors.secondary?.[200] || "#e9ecef",
    success: colors.success?.[200] || "#c3e6cb",
    warning: colors.warning?.[200] || "#ffeaa7",
    error: colors.error?.[200] || "#f5c6cb",
    info: colors.info?.[200] || "#bee5eb",
  };

  switch (style) {
    case "filled":
      return {
        background: variantColor,
        color: "#ffffff",
        border: variantColor,
        iconColor: "#ffffff",
      };
    case "outlined":
      return {
        background: colors.background?.card || "#ffffff",
        color: variantColor,
        border: variantColor,
        iconColor: variantColor,
      };
    case "soft":
      return {
        background:
          lighterShades[variant as keyof typeof lighterShades] ||
          lighterShades.info,
        color: variantColor,
        border:
          borderShades[variant as keyof typeof borderShades] ||
          borderShades.info,
        iconColor: variantColor,
      };
    case "minimal":
    default:
      return {
        background: "transparent",
        color: variantColor,
        border: "transparent",
        iconColor: variantColor,
      };
  }
};

// =====================================
// MAIN ALERT CONTAINER
// =====================================

export const StyledAlert = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$alertStyle",
      "$banner",
      "$closable",
      "accessibility",
    ].includes(prop),
})<StyledAlertProps>`
  position: relative;
  display: flex;
  align-items: flex-start;
  word-wrap: break-word;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", $banner = false, accessibility }) => {
    const dims = getAlertDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      padding: ${dims.padding.vertical * spacingMultiplier}px
        ${dims.padding.horizontal * spacingMultiplier}px;
      font-size: ${dims.fontSize * textMultiplier}px;
      min-height: ${dims.minHeight * textMultiplier}px;
      border-radius: ${$banner ? 0 : dims.borderRadius}px;
    `;
  }}

  /* 🎯 Colors usando variant + style system */
  ${({ theme, $variant = "info", $alertStyle = "soft", accessibility }) => {
    const alertColors = getAlertColors($variant, $alertStyle, theme);

    return css`
      background-color: ${alertColors.background};
      color: ${alertColors.color};
      border: 1px solid ${alertColors.border};

      ${accessibility?.highContrast &&
      css`
        background-color: ${alertColors.color === "#ffffff"
          ? "#000000"
          : "#ffffff"};
        color: ${alertColors.color === "#ffffff" ? "#ffffff" : "#000000"};
        border: 2px solid #000000 !important;
      `}
    `;
  }}
  
  /* Typography */
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.normal || 400};
  line-height: 1.5;

  /* Animación de entrada */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          animation: ${alertSlideIn} 0.3s ease-out;
          transition: all 0.3s ease;
        `}

  /* Banner mode */
  ${({ $banner }) =>
    $banner &&
    css`
      width: 100%;
      margin-left: 0;
      margin-right: 0;
      border-left: none;
      border-right: none;
    `}
  
  /* Padding adjustment para closable */
  ${({ $closable, $size = "md" }) => {
    if ($closable) {
      const dims = getAlertDimensions($size);
      return css`
        padding-right: ${dims.padding.horizontal + 24}px;
      `;
    }
    return "";
  }}
  
  /* Focus states (accesibilidad) */
  &:focus-within {
    outline: 2px solid
      ${({ theme, accessibility, $variant = "info" }) => {
        const alertColors = getAlertColors($variant, "soft", theme);
        return accessibility?.highContrast ? "#000000" : alertColors.iconColor;
      }};
    outline-offset: 2px;
  }

  /* Accesibilidad - Text to speech */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// ALERT ICON
// =====================================

export const AlertIcon = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$variant", "accessibility"].includes(prop),
})<AlertIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;

  /* 🎯 Icon size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getAlertDimensions($size);
    return css`
      width: ${dims.iconSize}px;
      height: ${dims.iconSize}px;
      font-size: ${dims.iconSize}px;
    `;
  }}

  /* Color del icono */
  ${({ theme, $variant = "info" }) => {
    const alertColors = getAlertColors($variant, "soft", theme);
    return css`
      color: ${alertColors.iconColor};
    `;
  }}
  
  /* Line height para emojis */
  line-height: 1;
`;

// =====================================
// ALERT CONTENT
// =====================================

export const AlertContent = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$hasDescription", "accessibility"].includes(prop),
})<AlertContentProps>`
  flex: 1;

  /* Spacing interno */
  ${({ $hasDescription }) =>
    $hasDescription &&
    css`
      > *:first-child {
        margin-bottom: 4px;
        font-weight: ${({ theme }) =>
          theme?.typography?.fontWeight?.medium || 500};
      }
    `}
`;

// =====================================
// ALERT MESSAGE (TÍTULO)
// =====================================

export const AlertMessage = styled.div`
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  margin-bottom: 0;

  /* Si hay descripción, añadir spacing */
  & + * {
    margin-top: 4px;
  }
`;

// =====================================
// ALERT DESCRIPTION
// =====================================

export const AlertDescription = styled.div`
  opacity: 0.85;
  margin-top: 4px;
  line-height: 1.6;
`;

// =====================================
// ALERT CLOSE BUTTON
// =====================================

export const AlertClose = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<AlertCloseProps>`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);

  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* 🎯 Close button size */
  ${({ $size = "md" }) => {
    const dims = getAlertDimensions($size);
    const closeSize = Math.max(dims.iconSize - 2, 12);
    return css`
      width: ${closeSize + 8}px;
      height: ${closeSize + 8}px;
      font-size: ${closeSize}px;
    `;
  }}

  /* Color y hover states */
  color: currentColor;
  opacity: 0.6;

  &:hover {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    opacity: 1;
  }

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
      &:focus {
        outline: 3px solid currentColor;
        outline-offset: 2px;
      }
    `}
`;

// =====================================
// ALERT ACTIONS
// =====================================

export const AlertActions = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<AlertActionProps>`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: center;

  /* Spacing adjustment por tamaño */
  ${({ $size = "md", accessibility }) => {
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      margin-top: ${8 * spacingMultiplier}px;
      gap: ${8 * spacingMultiplier}px;
    `;
  }}
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Alert con bordes redondeados extra
export const RoundedAlert = styled(StyledAlert)`
  border-radius: ${({ theme }) => theme?.borderRadius?.lg || "12px"} !important;
`;

// Alert con sombra elevada
export const ElevatedAlert = styled(StyledAlert)`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Alert compacto (padding reducido)
export const CompactAlert = styled(StyledAlert)`
  ${({ $size = "md" }) => {
    const dims = getAlertDimensions($size);
    return css`
      padding: ${dims.padding.vertical / 2}px ${dims.padding.horizontal / 2}px;
      min-height: ${dims.minHeight * 0.75}px;
    `;
  }}
`;

// Alert con border izquierdo grueso
export const BorderAlert = styled(StyledAlert)`
  border-left-width: 4px !important;
  padding-left: 16px;
`;

// Alert pulsante para estados críticos
export const PulsingAlert = styled(StyledAlert)`
  ${({ accessibility, $variant }) =>
    !accessibility?.reducedMotion &&
    ($variant === "error" || $variant === "warning") &&
    css`
      animation: ${alertPulse} 2s ease-in-out infinite;
    `}
`;

// =====================================
// ALERT NOTIFICATION (para toast systems)
// =====================================

export const AlertNotification = styled(StyledAlert)`
  position: fixed;
  z-index: 1000;
  max-width: 400px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;

  /* Animation de slide desde la posición */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          animation: ${alertSlideIn} 0.4s ease-out;
          transition: all 0.4s ease;
        `}
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getAlertDimensions,
  getAlertColors,
  alertSlideIn,
  alertSlideOut,
  alertPulse,
};
