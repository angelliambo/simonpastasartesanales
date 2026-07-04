import styled, { css, keyframes } from "styled-components";
import {
  StyledSwitchProps,
  SwitchHandleProps,
  SwitchInnerProps,
  SwitchLoadingProps,
} from "./Switch.types";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// =====================================
// ANIMATIONS
// =====================================

// Animación de loading spinner
const switchLoadingSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getSwitchDimensions = (size: string = "md") => {
  switch (size) {
    case "sm":
      return {
        width: 28,
        height: 16,
        handleSize: 12,
        handleMargin: 2,
        fontSize: 10,
        padding: 4,
      };
    case "md":
      return {
        width: 44,
        height: 22,
        handleSize: 18,
        handleMargin: 2,
        fontSize: 12,
        padding: 6,
      };
    case "lg":
      return {
        width: 56,
        height: 28,
        handleSize: 24,
        handleMargin: 2,
        fontSize: 14,
        padding: 8,
      };
    default:
      return {
        width: 44,
        height: 22,
        handleSize: 18,
        handleMargin: 2,
        fontSize: 12,
        padding: 6,
      };
  }
};

// Obtener colores basados en variante
const getSwitchColors = (variant: string = "primary", theme: any) => {
  const colors = theme?.colors || {};

  switch (variant) {
    case "primary":
      return {
        checked: colors.primary?.[500] || "#007bff",
        checkedHover: colors.primary?.[600] || "#0056b3",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
    case "secondary":
      return {
        checked: colors.secondary?.[500] || "#6c757d",
        checkedHover: colors.secondary?.[600] || "#545862",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
    case "success":
      return {
        checked: colors.success?.[500] || "#28a745",
        checkedHover: colors.success?.[600] || "#218838",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
    case "warning":
      return {
        checked: colors.warning?.[500] || "#ffc107",
        checkedHover: colors.warning?.[600] || "#e0a800",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
    case "error":
      return {
        checked: colors.error?.[500] || "#dc3545",
        checkedHover: colors.error?.[600] || "#c82333",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
    case "info":
      return {
        checked: colors.info?.[500] || "#17a2b8",
        checkedHover: colors.info?.[600] || "#138496",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
    default:
      return {
        checked: colors.primary?.[500] || "#007bff",
        checkedHover: colors.primary?.[600] || "#0056b3",
        unchecked: colors.background?.secondary || "#f8f9fa",
        uncheckedBorder: colors.border?.normal || "#ced4da",
        handle: "#ffffff",
        handleShadow: "0 2px 4px rgba(0,0,0,0.12)",
      };
  }
};

// =====================================
// MAIN SWITCH CONTAINER
// =====================================

export const StyledSwitch = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$checked",
    "$disabled",
    "$loading",
    "$size",
    "$variant",
    "accessibility",
  ]),
})<StyledSwitchProps>`
  /* Reset button styles */
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  /* Position and layout */
  position: relative;
  display: inline-block;
  vertical-align: middle;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSwitchDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      width: ${dims.width * spacingMultiplier}px;
      height: ${dims.height * spacingMultiplier}px;
      min-width: ${dims.width * spacingMultiplier}px;
    `;
  }}

  /* Background y colores usando theme */
  ${({ theme, $variant = "primary", $checked = false, $disabled = false }) => {
    const switchColors = getSwitchColors($variant, theme);

    if ($disabled) {
      return css`
        background-color: ${theme?.colors?.background?.secondary || "#e9ecef"};
        border: 1px solid ${theme?.colors?.border?.light || "#dee2e6"};
        cursor: not-allowed;
        opacity: 0.6;
      `;
    }

    if ($checked) {
      return css`
        background-color: ${switchColors.checked};
        border: 1px solid ${switchColors.checked};
      `;
    }

    return css`
      background-color: ${switchColors.unchecked};
      border: 1px solid ${switchColors.uncheckedBorder};
    `;
  }}
  
  /* Border radius */
  border-radius: ${({ $size = "md" }) => {
    const dims = getSwitchDimensions($size);
    return `${dims.height / 2}px`;
  }};

  /* Transiciones (respetando reduced motion) */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: all 0.2s ease-in-out;
        `}

  /* Estados hover */
  &:hover:not(:disabled) {
    ${({ theme, $variant = "primary", $checked = false }) => {
      const switchColors = getSwitchColors($variant, theme);

      if ($checked) {
        return css`
          background-color: ${switchColors.checkedHover};
          border-color: ${switchColors.checkedHover};
        `;
      }

      return css`
        border-color: ${switchColors.checked};
      `;
    }}
  }

  /* Focus states (accesibilidad) */
  &:focus-visible {
    outline: 2px solid
      ${({ theme, accessibility, $variant = "primary" }) => {
        const switchColors = getSwitchColors($variant, theme);
        return accessibility?.highContrast ? "#000000" : switchColors.checked;
      }};
    outline-offset: 2px;
  }

  /* Estados de loading */
  ${({ $loading = false }) =>
    $loading &&
    css`
      cursor: wait;
    `}

  /* Accesibilidad - Alto contraste */
  ${({ accessibility, theme, $variant = "primary" }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid #000000 !important;

      &:focus-visible {
        outline: 3px solid #000000;
        outline-offset: 2px;
      }
    `}
`;

// =====================================
// SWITCH HANDLE (Círculo móvil)
// =====================================

export const SwitchHandle = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$checked",
    "$disabled",
    "$loading",
    "$size",
    "$variant",
    "accessibility",
  ]),
})<SwitchHandleProps>`
  position: absolute;
  top: 50%;
  left: ${({ $checked = false, $size = "md" }) => {
    const dims = getSwitchDimensions($size);
    return $checked
      ? `calc(100% - ${dims.handleSize + dims.handleMargin}px)`
      : `${dims.handleMargin}px`;
  }};

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSwitchDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      width: ${dims.handleSize * spacingMultiplier}px;
      height: ${dims.handleSize * spacingMultiplier}px;
    `;
  }}

  /* Posición centrada */
  transform: translateY(-50%);

  /* Estilos visuales */
  background-color: ${({ theme, $variant = "primary" }) => {
    const switchColors = getSwitchColors($variant, theme);
    return switchColors.handle;
  }};

  border-radius: 50%;
  box-shadow: ${({ theme, $variant = "primary" }) => {
    const switchColors = getSwitchColors($variant, theme);
    return switchColors.handleShadow;
  }};

  /* Transiciones suaves */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: left 0.2s ease-in-out, transform 0.2s ease-in-out;
        `}

  /* Estados disabled */
  ${({ $disabled = false }) =>
    $disabled &&
    css`
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    `}
  
  /* Accesibilidad - Alto contraste */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 1px solid #000000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    `}
`;

// =====================================
// SWITCH INNER CONTENT
// =====================================

export const SwitchInner = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$checked",
    "$size",
    "accessibility",
  ]),
})<SwitchInnerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Typography */
  ${({ $size = "md", accessibility }) => {
    const dims = getSwitchDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.fontSize * textMultiplier}px;
    `;
  }}

  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  line-height: 1;
  color: ${({ theme }) => theme?.colors?.text?.inverse || "#ffffff"};

  /* Visibilidad según estado */
  opacity: ${({ $checked = false }) => ($checked ? 1 : 0.7)};

  /* Transición suave */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: opacity 0.15s ease-in-out;
        `}

  /* Prevenir selección de texto */
  user-select: none;
  pointer-events: none;

  /* Accesibilidad - Text to speech */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// LOADING SPINNER
// =====================================

export const SwitchLoading = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<SwitchLoadingProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 🎯 Size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getSwitchDimensions($size);
    const spinnerSize = Math.max(dims.handleSize - 4, 8);

    return css`
      width: ${spinnerSize}px;
      height: ${spinnerSize}px;
    `;
  }}

  /* Spinner visual */
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;

  /* Animación (respetando reduced motion) */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          animation: none;
          &::after {
            content: "⏳";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.8em;
          }
        `
      : css`
          animation: ${switchLoadingSpin} 1s linear infinite;
        `}

  /* Color */
  color: ${({ theme }) => theme?.colors?.text?.secondary || "#6c757d"};
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Switch con estilo minimalista
export const MinimalSwitch = styled(StyledSwitch)`
  border: none;
  box-shadow: inset 0 0 0 1px
    ${({ theme }) => theme?.colors?.border?.light || "#dee2e6"};

  &:hover {
    box-shadow: inset 0 0 0 1px
      ${({ theme }) => theme?.colors?.primary?.[500] || "#007bff"};
  }
`;

// Switch con estilo elevado
export const ElevatedSwitch = styled(StyledSwitch)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

// Switch compacto (sin spacing adicional)
export const CompactSwitch = styled(StyledSwitch)`
  /* Forzar tamaño sm sin spacing multiplier */
  ${() => {
    const dims = getSwitchDimensions("sm");
    return css`
      width: ${dims.width}px !important;
      height: ${dims.height}px !important;
    `;
  }}
`;

// Switch con fondo personalizado para success/error
export const StatusSwitch = styled(StyledSwitch)`
  ${({ $checked, $variant, theme }) => {
    if (!$checked) return "";

    const gradients = {
      success: "linear-gradient(45deg, #28a745 0%, #20c997 100%)",
      error: "linear-gradient(45deg, #dc3545 0%, #fd7e14 100%)",
      warning: "linear-gradient(45deg, #ffc107 0%, #fd7e14 100%)",
      info: "linear-gradient(45deg, #17a2b8 0%, #6610f2 100%)",
    };

    const gradient = gradients[$variant as keyof typeof gradients];
    if (gradient) {
      return css`
        background: ${gradient};
      `;
    }

    return "";
  }}
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export { getSwitchDimensions, getSwitchColors };
