import styled, { css, keyframes } from "styled-components";
import {
  InputWrapperProps,
  StyledInputProps,
  InputAffixProps,
  InputAddonProps,
  ClearButtonProps,
  CountProps,
  InputSize,
  InputVariant,
  InputStatus,
} from "./Input.types";
import { createShouldForwardProp } from "../../../../utils/shouldForwardProp";

// =====================================
// ANIMATIONS
// =====================================

// Animación de focus
const inputFocus = keyframes`
  0% { box-shadow: 0 0 0 0 currentColor; }
  100% { box-shadow: 0 0 0 2px currentColor; }
`;

// Animación de validación success
const inputSuccess = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

// Animación de error shake
const inputError = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

// Animación de loading dots para validating state
const inputValidating = keyframes`
  0%, 20% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getInputDimensions = (size: InputSize = "md") => {
  switch (size) {
    case "sm":
      return {
        height: 32,
        padding: { horizontal: 12, vertical: 4 },
        fontSize: 14,
        borderRadius: 6,
        iconSize: 16,
        affixPadding: 8,
        addonPadding: 12,
      };
    case "md":
      return {
        height: 36,
        padding: { horizontal: 14, vertical: 6 },
        fontSize: 14,
        borderRadius: 8,
        iconSize: 18,
        affixPadding: 10,
        addonPadding: 14,
      };
    case "lg":
      return {
        height: 40,
        padding: { horizontal: 16, vertical: 8 },
        fontSize: 16,
        borderRadius: 10,
        iconSize: 20,
        affixPadding: 12,
        addonPadding: 16,
      };
    default:
      return {
        height: 36,
        padding: { horizontal: 14, vertical: 6 },
        fontSize: 14,
        borderRadius: 8,
        iconSize: 18,
        affixPadding: 10,
        addonPadding: 14,
      };
  }
};

// Obtener colores basados en variante y estado
const getInputColors = (
  variant: InputVariant = "primary",
  status: InputStatus = "default",
  theme: any,
  focused: boolean = false,
  disabled: boolean = false
) => {
  const colors = theme?.colors || {};

  // Colores base por estado
  const statusColors = {
    default: {
      border: colors.border?.light || "#d9d9d9",
      background: colors.background?.card || "#ffffff",
      text: colors.text?.primary || "#000000",
      placeholder: colors.text?.secondary || "#999999",
    },
    success: {
      border: colors.success?.[500] || "#52c41a",
      background: colors.success?.[50] || "#f6ffed",
      text: colors.text?.primary || "#000000",
      placeholder: colors.text?.secondary || "#999999",
    },
    warning: {
      border: colors.warning?.[500] || "#faad14",
      background: colors.warning?.[50] || "#fffbe6",
      text: colors.text?.primary || "#000000",
      placeholder: colors.text?.secondary || "#999999",
    },
    error: {
      border: colors.error?.[500] || "#ff4d4f",
      background: colors.error?.[50] || "#fff2f0",
      text: colors.text?.primary || "#000000",
      placeholder: colors.text?.secondary || "#999999",
    },
    validating: {
      border: colors.primary?.[300] || "#91d5ff",
      background: colors.primary?.[50] || "#e6f7ff",
      text: colors.text?.primary || "#000000",
      placeholder: colors.text?.secondary || "#999999",
    },
  };

  const baseColors = statusColors[status] || statusColors.default;

  // Colores de focus por variante
  const focusColors = {
    primary: colors.primary?.[500] || "#1890ff",
    secondary: colors.secondary?.[500] || "#6c757d",
    success: colors.success?.[500] || "#52c41a",
    warning: colors.warning?.[500] || "#faad14",
    error: colors.error?.[500] || "#ff4d4f",
  };

  const focusColor = focusColors[variant] || focusColors.primary;

  // Estados especiales
  if (disabled) {
    return {
      ...baseColors,
      border: colors.border?.light || "#d9d9d9",
      background: colors.background?.disabled || "#f5f5f5",
      text: "#999999",
      placeholder: "#cccccc",
      boxShadow: undefined,
    };
  }

  if (focused) {
    return {
      ...baseColors,
      border: focusColor,
      boxShadow: `0 0 0 2px ${focusColor}33`,
    };
  }

  return {
    ...baseColors,
    boxShadow: undefined,
  };
};

// =====================================
// INPUT WRAPPER
// =====================================

export const InputWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$status",
      "$disabled",
      "$focused",
      "$bordered",
      "$hasPrefix",
      "$hasSuffix",
      "$hasAddonBefore",
      "$hasAddonAfter",
      "accessibility",
    ].includes(prop),
})<InputWrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: stretch;
  width: 100%;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getInputDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      min-height: ${dims.height * spacingMultiplier}px;
      border-radius: ${dims.borderRadius}px;
    `;
  }}

  /* Border wrapper styling */
  ${({
    $bordered = true,
    $size = "md",
    $variant = "primary",
    $status = "default",
    $focused = false,
    $disabled = false,
    theme,
    accessibility,
  }) => {
    if (!$bordered) return css``;

    const colors = getInputColors(
      $variant,
      $status,
      theme,
      $focused,
      $disabled
    );

    return css`
      border: 1px solid ${colors.border};
      background-color: ${colors.background};

      ${colors.boxShadow &&
      css`
        box-shadow: ${colors.boxShadow};
      `}

      ${accessibility?.highContrast &&
      css`
        border: 2px solid #000000 !important;
        background-color: #ffffff !important;
      `}
    `;
  }}
  
  /* Focus states */
  ${({ $focused, accessibility }) =>
    $focused &&
    !accessibility?.reducedMotion &&
    css`
      animation: ${inputFocus} 0.2s ease-out;
    `}
  
  /* Status animations */
  ${({ $status, accessibility }) => {
    if (accessibility?.reducedMotion) return css``;

    switch ($status) {
      case "success":
        return css`
          animation: ${inputSuccess} 0.3s ease-out;
        `;
      case "error":
        return css`
          animation: ${inputError} 0.5s ease-out;
        `;
      default:
        return css``;
    }
  }}
  
  /* Layout adjustments for addons */
  ${({ $hasAddonBefore, $hasAddonAfter }) => {
    if ($hasAddonBefore || $hasAddonAfter) {
      return css`
        display: flex;

        ${$hasAddonBefore &&
        css`
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        `}

        ${$hasAddonAfter &&
        css`
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        `}
      `;
    }
    return css``;
  }}
  
  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;

// =====================================
// INPUT BASE
// =====================================

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$status",
      "$disabled",
      "$readOnly",
      "accessibility",
    ].includes(prop),
})<StyledInputProps>`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;

  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", theme, accessibility }) => {
    const dims = getInputDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      height: 100%;
      padding: ${dims.padding.vertical * spacingMultiplier}px
        ${dims.padding.horizontal * spacingMultiplier}px;
      font-size: ${dims.fontSize * textMultiplier}px;
      font-family: ${theme?.typography?.fontFamily || "inherit"};
      line-height: 1.5;
    `;
  }}

  /* Colors */
  ${({
    theme,
    $variant = "primary",
    $status = "default",
    $disabled = false,
  }) => {
    const colors = getInputColors($variant, $status, theme, false, $disabled);

    return css`
      color: ${colors.text};

      &::placeholder {
        color: ${colors.placeholder};
        opacity: 1;
      }

      &::-webkit-input-placeholder {
        color: ${colors.placeholder};
      }
      &::-moz-placeholder {
        color: ${colors.placeholder};
        opacity: 1;
      }
      &:-ms-input-placeholder {
        color: ${colors.placeholder};
      }
      &:-moz-placeholder {
        color: ${colors.placeholder};
        opacity: 1;
      }
    `;
  }}
  
  /* Estados especiales */
  ${({ $disabled, $readOnly }) => {
    if ($disabled) {
      return css`
        cursor: not-allowed;
        user-select: none;
      `;
    }

    if ($readOnly) {
      return css`
        cursor: default;
        user-select: text;
      `;
    }

    return css`
      cursor: text;
    `;
  }}
  
  /* Remove default styles */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* Accesibilidad - High contrast */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      color: #000000 !important;

      &::placeholder {
        color: #666666 !important;
      }
    `}
`;

// =====================================
// TEXTAREA
// =====================================

export const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$status",
      "$disabled",
      "$readOnly",
      "accessibility",
    ].includes(prop),
})<StyledInputProps>`
  ${StyledInput};

  resize: vertical;
  overflow: auto;

  /* Ajustes específicos para textarea */
  ${({ $size = "md", accessibility }) => {
    const dims = getInputDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      min-height: ${dims.height * 2 * spacingMultiplier}px;
      padding: ${dims.padding.vertical * spacingMultiplier}px
        ${dims.padding.horizontal * spacingMultiplier}px;
    `;
  }}
`;

// =====================================
// AFFIX ELEMENTS (PREFIX/SUFFIX)
// =====================================

export const InputAffix = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$disabled", "$type", "accessibility"].includes(prop),
})<InputAffixProps>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;

  /* 🎯 Spacing usando shared systems */
  ${({ $size = "md", $type = "prefix", accessibility }) => {
    const dims = getInputDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      padding: 0 ${dims.affixPadding * spacingMultiplier}px;

      ${$type === "prefix"
        ? css`
            padding-right: 0;
            margin-right: ${dims.affixPadding * spacingMultiplier}px;
          `
        : css`
            padding-left: 0;
            margin-left: ${dims.affixPadding * spacingMultiplier}px;
          `}
    `;
  }}

  /* Colors */
  ${({ theme, $disabled }) => {
    const colors = theme?.colors || {};

    return css`
      color: ${$disabled ? "#cccccc" : colors.text?.secondary || "#666666"};
    `;
  }}
  
  /* Icon styling */
  svg, .anticon {
    ${({ $size = "md" }) => {
      const dims = getInputDimensions($size);
      return css`
        width: ${dims.iconSize}px;
        height: ${dims.iconSize}px;
      `;
    }}
  }

  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

// =====================================
// ADDON ELEMENTS
// =====================================

export const InputAddon = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$disabled", "$type", "accessibility"].includes(prop),
})<InputAddonProps>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  border: 1px solid;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getInputDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      min-height: ${dims.height * spacingMultiplier}px;
      padding: 0 ${dims.addonPadding * spacingMultiplier}px;
      border-radius: ${dims.borderRadius}px;
    `;
  }}

  /* Colors */
  ${({ theme, $disabled }) => {
    const colors = theme?.colors || {};

    return css`
      background-color: ${colors.background?.secondary || "#fafafa"};
      border-color: ${colors.border?.light || "#d9d9d9"};
      color: ${$disabled ? "#cccccc" : colors.text?.secondary || "#666666"};
    `;
  }}
  
  /* Position-specific styling */
  ${({ $type }) => {
    if ($type === "before") {
      return css`
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `;
    } else {
      return css`
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `;
    }
  }}
  
  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

// =====================================
// CLEAR BUTTON
// =====================================

export const ClearButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$disabled", "accessibility"].includes(prop),
})<ClearButtonProps>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 1;

  /* 🎯 Size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getInputDimensions($size);
    return css`
      width: ${dims.iconSize}px;
      height: ${dims.iconSize}px;
    `;
  }}

  /* Colors */
  ${({ theme }) => {
    const colors = theme?.colors || {};

    return css`
      color: ${colors.text?.secondary || "#999999"};

      &:hover {
        color: ${colors.text?.primary || "#000000"};
        background-color: #f0f0f0;
        border-radius: 50%;
      }
    `;
  }}
  
  /* Icon */
  &::before {
    content: "×";
    font-size: 16px;
    line-height: 1;
  }

  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}

  /* Transitions */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: color 0.2s ease, background-color 0.2s ease;
        `}
`;

// =====================================
// CHARACTER COUNT
// =====================================

export const CharacterCount = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$status", "accessibility"].includes(prop),
})<CountProps>`
  position: absolute;
  right: 8px;
  bottom: 4px;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;

  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getInputDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${(dims.fontSize - 2) * textMultiplier}px;
    `;
  }}

  /* Colors by status */
  ${({ theme, $status = "default" }) => {
    const colors = theme?.colors || {};

    const statusColors = {
      default: colors.text?.secondary || "#999999",
      success: colors.success?.[500] || "#52c41a",
      warning: colors.warning?.[500] || "#faad14",
      error: colors.error?.[500] || "#ff4d4f",
      validating: colors.primary?.[500] || "#1890ff",
    };

    return css`
      color: ${statusColors[$status]};
    `;
  }}
`;

// =====================================
// PASSWORD STRENGTH INDICATOR
// =====================================

export const PasswordStrength = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$strength"]),
})<{ $strength: "weak" | "fair" | "good" | "strong"; accessibility?: any }>`
  margin-top: 4px;
  display: flex;
  gap: 4px;
`;

export const StrengthBar = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$active", "$level", "accessibility"].includes(prop),
})<{
  $active: boolean;
  $level: "weak" | "fair" | "good" | "strong";
  accessibility?: any;
}>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "background-color 0.3s ease"};

  ${({ $active, $level, theme }) => {
    const colors = theme?.colors || {};

    if (!$active) {
      return css`
        background-color: ${colors.border?.light || "#e0e0e0"};
      `;
    }

    const levelColors = {
      weak: colors.error?.[500] || "#ff4d4f",
      fair: colors.warning?.[500] || "#faad14",
      good: colors.primary?.[500] || "#1890ff",
      strong: colors.success?.[500] || "#52c41a",
    };

    return css`
      background-color: ${levelColors[$level]};
    `;
  }}
`;

// =====================================
// SEARCH BUTTON
// =====================================

export const SearchButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$loading", "accessibility"].includes(prop),
})<{ $size?: InputSize; $loading?: boolean; accessibility?: any }>`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 🎯 Size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getInputDimensions($size);
    return css`
      min-width: ${dims.height}px;
      height: ${dims.height}px;
      border-radius: 0 ${dims.borderRadius}px ${dims.borderRadius}px 0;
    `;
  }}

  /* Colors */
  ${({ theme }) => {
    const colors = theme?.colors || {};

    return css`
      background-color: ${colors.primary?.[500] || "#1890ff"};
      color: #ffffff;

      &:hover {
        background-color: ${colors.primary?.[600] || "#1677ff"};
      }

      &:active {
        background-color: ${colors.primary?.[700] || "#1666ff"};
      }
    `;
  }}
  
  /* Loading state */
  ${({ $loading, accessibility }) =>
    $loading &&
    css`
      cursor: not-allowed;

      &::before {
        content: "";
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: ${accessibility?.reducedMotion
          ? "none"
          : "spin 1s linear infinite"};
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
  
  /* Icon */
  ${({ $loading }) =>
    !$loading &&
    css`
      &::before {
        content: "🔍";
        font-size: 14px;
      }
    `}
  
  /* Transitions */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: background-color 0.2s ease;
        `}
`;

// =====================================
// VALIDATING INDICATOR
// =====================================

export const ValidatingIndicator = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([]),
})<{ accessibility?: any }>`
  display: flex;
  align-items: center;
  gap: 2px;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: currentColor;
    animation: ${({ accessibility }) =>
      accessibility?.reducedMotion
        ? "none"
        : `${inputValidating} 1.4s infinite`};

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getInputDimensions,
  getInputColors,
  inputFocus,
  inputSuccess,
  inputError,
  inputValidating,
};
