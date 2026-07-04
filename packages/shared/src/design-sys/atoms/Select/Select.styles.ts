import styled, { css, keyframes } from "styled-components";
import {
  SelectWrapperProps,
  StyledSelectorProps,
  DropdownProps,
  OptionProps,
  TagProps,
  SearchInputProps,
  SelectSize,
  SelectVariant,
  SelectStatus,
  SelectMode,
} from "./Select.types";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// =====================================
// ANIMATIONS
// =====================================

// Animación de dropdown slide down
const dropdownSlideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.8);
    transform-origin: top;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
`;

// Animación de dropdown slide up
const dropdownSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scaleY(0.8);
    transform-origin: bottom;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
`;

// Animación de focus
const selectFocus = keyframes`
  0% { box-shadow: 0 0 0 0 currentColor; }
  100% { box-shadow: 0 0 0 2px currentColor; }
`;

// Animación de tag aparición
const tagSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
`;

// Animación de loading
const selectLoading = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getSelectDimensions = (size: SelectSize = "md") => {
  switch (size) {
    case "sm":
      return {
        height: 32,
        padding: { horizontal: 12, vertical: 4 },
        fontSize: 14,
        borderRadius: 6,
        iconSize: 16,
        tagHeight: 22,
        tagPadding: 6,
        optionPadding: 8,
      };
    case "md":
      return {
        height: 36,
        padding: { horizontal: 14, vertical: 6 },
        fontSize: 14,
        borderRadius: 8,
        iconSize: 18,
        tagHeight: 24,
        tagPadding: 8,
        optionPadding: 12,
      };
    case "lg":
      return {
        height: 40,
        padding: { horizontal: 16, vertical: 8 },
        fontSize: 16,
        borderRadius: 10,
        iconSize: 20,
        tagHeight: 28,
        tagPadding: 10,
        optionPadding: 16,
      };
    default:
      return {
        height: 36,
        padding: { horizontal: 14, vertical: 6 },
        fontSize: 14,
        borderRadius: 8,
        iconSize: 18,
        tagHeight: 24,
        tagPadding: 8,
        optionPadding: 12,
      };
  }
};

// Obtener colores basados en variante y estado
const getSelectColors = (
  variant: SelectVariant = "primary",
  status: SelectStatus = "default",
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
    loading: {
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
      background: "#f5f5f5",
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
// SELECT WRAPPER
// =====================================

export const SelectWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$status",
      "$disabled",
      "$focused",
      "$open",
      "$mode",
      "accessibility",
    ].includes(prop),
})<SelectWrapperProps>`
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      min-height: ${dims.height * spacingMultiplier}px;
      border-radius: ${dims.borderRadius}px;
    `;
  }}

  /* Colors and border */
  ${({
    $size = "md",
    $variant = "primary",
    $status = "default",
    $focused = false,
    $disabled = false,
    theme,
    accessibility,
  }) => {
    const colors = getSelectColors(
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
  
  /* Focus animation */
  ${({ $focused, accessibility }) =>
    $focused &&
    !accessibility?.reducedMotion &&
    css`
      animation: ${selectFocus} 0.2s ease-out;
    `}
  
  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

// =====================================
// SELECTOR (DISPLAY AREA)
// =====================================

export const StyledSelector = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$status",
      "$disabled",
      "$showArrow",
      "accessibility",
    ].includes(prop),
})<StyledSelectorProps>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: inherit;
  position: relative;

  /* 🎯 Padding usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      padding: ${dims.padding.vertical * spacingMultiplier}px
        ${dims.padding.horizontal * spacingMultiplier}px;
    `;
  }}

  /* Typography */
  ${({ $size = "md", theme, accessibility }) => {
    const dims = getSelectDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.fontSize * textMultiplier}px;
      font-family: ${theme?.typography?.fontFamily || "inherit"};
      line-height: 1.5;
    `;
  }}
  
  /* Arrow space */
  ${({ $showArrow = true, $size = "md" }) => {
    if (!$showArrow) return css``;

    const dims = getSelectDimensions($size);
    return css`
      padding-right: ${dims.padding.horizontal + dims.iconSize + 8}px;
    `;
  }}
`;

// =====================================
// SELECTION DISPLAY
// =====================================

export const SelectionDisplay = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$isEmpty", "$mode", "accessibility"].includes(prop),
})<{ $isEmpty?: boolean; $mode?: SelectMode; accessibility?: any }>`
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 20px;

  /* Empty state */
  ${({ $isEmpty, theme }) =>
    $isEmpty &&
    css`
      color: ${theme?.colors?.text?.secondary || "#999999"};
    `}

  /* Multi-select layout */
  ${({ $mode }) =>
    ($mode === "multiple" || $mode === "tags") &&
    css`
      gap: 6px;
      min-height: 24px;
    `}
`;

// =====================================
// TAG (MULTI-SELECT)
// =====================================

export const SelectTag = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$variant", "$disabled", "accessibility"].includes(prop),
})<TagProps>`
  display: inline-flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  max-width: 200px;
  overflow: hidden;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      height: ${dims.tagHeight * spacingMultiplier}px;
      padding: 0 ${dims.tagPadding * spacingMultiplier}px;
    `;
  }}

  /* Colors by variant */
  ${({ theme, $variant = "primary" }) => {
    const colors = theme?.colors || {};
    const variantColor = colors[$variant]?.[500] || "#1890ff";

    return css`
      background-color: ${variantColor}15;
      border-color: ${variantColor}40;
      color: ${variantColor};
    `;
  }}
  
  /* Animation */
  ${({ accessibility }) =>
    !accessibility?.reducedMotion &&
    css`
      animation: ${tagSlideIn} 0.2s ease-out;
    `}
  
  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

// =====================================
// TAG CONTENT
// =====================================

export const TagContent = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// =====================================
// TAG CLOSE BUTTON
// =====================================

export const TagClose = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp(["$disabled"]),
})<{ $disabled?: boolean; accessibility?: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  color: currentColor;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    background-color: currentColor;
    color: white;
  }

  &::before {
    content: "×";
    font-size: 12px;
    line-height: 1;
  }

  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.3;
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
          transition: opacity 0.2s ease, background-color 0.2s ease;
        `}
`;

// =====================================
// ARROW ICON
// =====================================

export const SelectArrow = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$open", "$loading", "accessibility"].includes(prop),
})<{
  $size?: SelectSize;
  $open?: boolean;
  $loading?: boolean;
  accessibility?: any;
}>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: #999999;

  /* 🎯 Icon size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getSelectDimensions($size);
    return css`
      width: ${dims.iconSize}px;
      height: ${dims.iconSize}px;
    `;
  }}

  /* Arrow rotation */
  ${({ $open, accessibility }) =>
    $open &&
    css`
      transform: translateY(-50%) rotate(180deg);
      transition: ${accessibility?.reducedMotion
        ? "none"
        : "transform 0.2s ease"};
    `}
  
  /* Loading animation */
  ${({ $loading, accessibility }) =>
    $loading
      ? css`
          &::before {
            content: "";
            width: 14px;
            height: 14px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: ${accessibility?.reducedMotion
              ? "none"
              : `${selectLoading} 1s linear infinite`};
          }
        `
      : css`
          &::before {
            content: "▼";
            font-size: 10px;
            line-height: 1;
          }
        `}
`;

// =====================================
// CLEAR BUTTON
// =====================================

export const ClearButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$disabled", "accessibility"].includes(prop),
})<{ $size?: SelectSize; $disabled?: boolean; accessibility?: any }>`
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;
  color: #999999;
  z-index: 1;

  /* 🎯 Size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getSelectDimensions($size);
    return css`
      width: ${dims.iconSize}px;
      height: ${dims.iconSize}px;
    `;
  }}

  &:hover {
    color: #666666;
    background-color: #f0f0f0;
  }

  &::before {
    content: "×";
    font-size: 14px;
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
// DROPDOWN
// =====================================

export const Dropdown = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$size",
      "$variant",
      "$placement",
      "$matchSelectWidth",
      "accessibility",
    ].includes(prop),
})<DropdownProps>`
  position: absolute;
  z-index: 1050;
  background-color: ${({ theme }) => theme.colors?.background?.card || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.28),
    0 3px 6px -4px rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.25);
  max-height: 256px;
  overflow-y: auto;

  /* Width matching */
  ${({ $matchSelectWidth }) => {
    if (typeof $matchSelectWidth === "number") {
      return css`
        width: ${$matchSelectWidth}px;
      `;
    }
    if ($matchSelectWidth) {
      return css`
        min-width: 100%;
      `;
    }
    return css`
      min-width: 200px;
    `;
  }}

  /* Placement */
  ${({ $placement = "bottomLeft" }) => {
    switch ($placement) {
      case "topLeft":
        return css`
          bottom: 100%;
          left: 0;
          margin-bottom: 4px;
        `;
      case "topRight":
        return css`
          bottom: 100%;
          right: 0;
          margin-bottom: 4px;
        `;
      case "bottomRight":
        return css`
          top: 100%;
          right: 0;
          margin-top: 4px;
        `;
      case "bottomLeft":
      default:
        return css`
          top: 100%;
          left: 0;
          margin-top: 4px;
        `;
    }
  }}
  
  /* Animation */
  ${({ accessibility, $placement = "bottomLeft" }) => {
    if (accessibility?.reducedMotion) return css``;

    const animation = $placement.startsWith("top")
      ? dropdownSlideUp
      : dropdownSlideDown;

    return css`
      animation: ${animation} 0.2s ease-out;
    `;
  }}
  
  /* Accessibility - High contrast */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid #000000 !important;
      background-color: #ffffff !important;
    `}
`;

// =====================================
// DROPDOWN OPTION
// =====================================

export const Option = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$selected", "$focused", "$disabled", "accessibility"].includes(
      prop
    ),
})<OptionProps>`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border: none;
  background: none;
  text-align: left;
  overflow: hidden;
  position: relative;

  /* 🎯 Padding usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      padding: ${dims.optionPadding * spacingMultiplier}px;
      min-height: ${dims.height * 0.8 * spacingMultiplier}px;
    `;
  }}

  /* Typography */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.fontSize * textMultiplier}px;
    `;
  }}
  
  /* States */
  ${({ $selected, $focused, $disabled, theme }) => {
    const colors = theme?.colors || {};

    if ($disabled) {
      return css`
        color: #999999;
        cursor: not-allowed;
        opacity: 0.5;
      `;
    }

    if ($selected) {
      return css`
        background-color: ${colors.primary?.[50] || "#e6f7ff"};
        color: ${colors.primary?.[600] || "#1677ff"};
        font-weight: 500;

        &::after {
          content: "✓";
          position: absolute;
          right: 12px;
          color: ${colors.primary?.[500] || "#1890ff"};
        }
      `;
    }

    if ($focused) {
      return css`
        background-color: ${({ theme }) => theme.colors?.background?.primary || "#f5f5f5"};
      `;
    }

    return css`
      color: ${colors.text?.primary || "#000000"};

      &:hover {
        background-color: ${({ theme }) => theme.colors?.background?.primary || "#f5f5f5"};
      }
    `;
  }}
  
  /* Accessibility - High contrast */
  ${({ accessibility, $selected }) =>
    accessibility?.highContrast &&
    css`
      color: #000000 !important;

      ${$selected &&
      css`
        background-color: #000000 !important;
        color: #ffffff !important;

        &::after {
          color: #ffffff !important;
        }
      `}
    `}
`;

// =====================================
// OPTION GROUP
// =====================================

export const OptionGroup = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<{ $size?: SelectSize; accessibility?: any }>`
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors?.border?.light || "#f0f0f0"};
    margin-top: 4px;
    padding-top: 4px;
  }
`;

export const OptionGroupLabel = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<{ $size?: SelectSize; accessibility?: any }>`
  padding: 8px 12px 4px;
  font-size: 12px;
  color: #999999;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  /* 🎯 Typography usando shared systems */
  ${({ accessibility }) => {
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${12 * textMultiplier}px;
    `;
  }}
`;

// =====================================
// SEARCH INPUT (INSIDE DROPDOWN)
// =====================================

export const SearchInput = styled.input.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<SearchInputProps>`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border?.light || "#f0f0f0"};
  margin-bottom: 4px;

  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      padding: ${dims.optionPadding * spacingMultiplier}px;
      font-size: ${dims.fontSize * textMultiplier}px;
    `;
  }}

  &::placeholder {
    color: #999999;
  }

  &:focus {
    border-bottom-color: #1890ff;
  }
`;

// =====================================
// EMPTY STATE
// =====================================

export const EmptyState = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<{ $size?: SelectSize; accessibility?: any }>`
  padding: 20px;
  text-align: center;
  color: #999999;

  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.fontSize * textMultiplier}px;
    `;
  }}
`;

// =====================================
// VIRTUAL LIST CONTAINER
// =====================================

export const VirtualListContainer = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$height"]),
})<{ $height?: number }>`
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height}px;
      overflow-y: auto;
    `}
`;

export const VirtualListItem = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$height", "$index"]),
})<{ $height?: number; $index?: number }>`
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height}px;
      display: flex;
      align-items: center;
    `}
`;

// =====================================
// LOADING STATE
// =====================================

export const LoadingState = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size"]),
})<{ $size?: SelectSize; accessibility?: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #999999;

  /* 🎯 Typography usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getSelectDimensions($size);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.fontSize * textMultiplier}px;
    `;
  }}

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    margin-right: 8px;
    animation: ${({ accessibility }) =>
      accessibility?.reducedMotion
        ? "none"
        : `${selectLoading} 1s linear infinite`};
  }
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getSelectDimensions,
  getSelectColors,
  dropdownSlideDown,
  dropdownSlideUp,
  selectFocus,
  tagSlideIn,
  selectLoading,
};
