import { useThemeColors } from '../../hooks/useThemeColors';
import styled, { css } from "styled-components";
import { normalizeLegacySize } from "../shared/sizes";
import { normalizeLegacyVariant } from "../shared/variants";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';
import {
  StyledPaginationProps,
  StyledPaginationItemProps,
  StyledPaginationSizeChangerProps,
  StyledPaginationJumperProps,
  StyledPaginationTotalProps,
  PaginationSize,
  PaginationVariant,
  PaginationPosition,
  AccessibilityProps,
} from "./Pagination.types";

// =============================================================================
// SIZE SYSTEM
// =============================================================================

const getPaginationSizeStyles = (size: PaginationSize) => {
  const normalizedSize = normalizeLegacySize(size);
  
  const sizeMap = {
    xs: {
      fontSize: "0.75rem",
      padding: "4px 8px",
      lineHeight: "1.2",
      gap: "4px",
      iconSize: "10px",
      height: "24px",
      minWidth: "24px",
    },
    sm: {
      fontSize: "0.8rem",
      padding: "6px 10px",
      lineHeight: "1.3",
      gap: "6px",
      iconSize: "12px",
      height: "28px",
      minWidth: "28px",
    },
    md: {
      fontSize: "0.875rem",
      padding: "8px 12px",
      lineHeight: "1.4",
      gap: "8px",
      iconSize: "14px",
      height: "32px",
      minWidth: "32px",
    },
    lg: {
      fontSize: "1rem",
      padding: "10px 16px",
      lineHeight: "1.5",
      gap: "10px",
      iconSize: "16px",
      height: "36px",
      minWidth: "36px",
    },
    xl: {
      fontSize: "1.125rem",
      padding: "12px 20px",
      lineHeight: "1.6",
      gap: "12px",
      iconSize: "18px",
      height: "40px",
      minWidth: "40px",
    },
    xxl: {
      fontSize: "1.25rem",
      padding: "14px 24px",
      lineHeight: "1.7",
      gap: "16px",
      iconSize: "20px",
      height: "44px",
      minWidth: "44px",
    },
  };

  return sizeMap[normalizedSize];
};

// =============================================================================
// VARIANT SYSTEM
// =============================================================================

const getPaginationVariantColors = (variant: PaginationVariant) => {
  const colors = useThemeColors();
  const normalizedVariant = normalizeLegacyVariant(variant);
  
  const variantMap = {
    primary: {
      default: {
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.primary[500],
        hoverBackgroundColor: colors.primary[50],
        hoverBorderColor: colors.primary[300],
        activeColor: colors.primary[600],
        activeBackgroundColor: colors.primary[500],
        activeBorderColor: colors.primary[500],
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    secondary: {
      default: {
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.text.primary,
        hoverBackgroundColor: colors.background.secondary,
        hoverBorderColor: colors.border.normal,
        activeColor: colors.text.primary,
        activeBackgroundColor: colors.background.tertiary,
        activeBorderColor: colors.border.normal,
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    success: {
      default: {
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.success[500],
        hoverBackgroundColor: colors.success[50],
        hoverBorderColor: colors.success[300],
        activeColor: colors.success[600],
        activeBackgroundColor: colors.success[500],
        activeBorderColor: colors.success[500],
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    warning: {
      default: {
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.warning[500],
        hoverBackgroundColor: colors.warning[50],
        hoverBorderColor: colors.warning[300],
        activeColor: colors.warning[600],
        activeBackgroundColor: colors.warning[500],
        activeBorderColor: colors.warning[500],
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    error: {
      default: {
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.error[500],
        hoverBackgroundColor: colors.error[50],
        hoverBorderColor: colors.error[300],
        activeColor: colors.error[600],
        activeBackgroundColor: colors.error[500],
        activeBorderColor: colors.error[500],
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    info: {
      default: {
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.info[500],
        hoverBackgroundColor: colors.info[50],
        hoverBorderColor: colors.info[300],
        activeColor: colors.info[600],
        activeBackgroundColor: colors.info[500],
        activeBorderColor: colors.info[500],
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    ghost: {
      default: {
        color: colors.text.primary,
        backgroundColor: "transparent",
        borderColor: "transparent",
        hoverColor: colors.primary[500],
        hoverBackgroundColor: colors.background.secondary,
        hoverBorderColor: "transparent",
        activeColor: colors.primary[600],
        activeBackgroundColor: colors.background.tertiary,
        activeBorderColor: "transparent",
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: "transparent",
        disabledBorderColor: "transparent",
      },
    },
    tertiary: {
      default: {
        color: colors.text.secondary,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.light,
        hoverColor: colors.text.primary,
        hoverBackgroundColor: colors.background.secondary,
        hoverBorderColor: colors.border.normal,
        activeColor: colors.text.primary,
        activeBackgroundColor: colors.background.tertiary,
        activeBorderColor: colors.border.normal,
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    outlined: {
      default: {
        color: colors.text.primary,
        backgroundColor: "transparent",
        borderColor: colors.border.normal,
        hoverColor: colors.primary[500],
        hoverBackgroundColor: "transparent",
        hoverBorderColor: colors.primary[500],
        activeColor: colors.primary[600],
        activeBackgroundColor: colors.primary[50],
        activeBorderColor: colors.primary[600],
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: "transparent",
        disabledBorderColor: colors.border.light,
      },
    },
    inverse: {
      default: {
        color: colors.text.inverse,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.normal,
        hoverColor: colors.text.primary,
        hoverBackgroundColor: colors.background.secondary,
        hoverBorderColor: colors.border.normal,
        activeColor: colors.text.primary,
        activeBackgroundColor: colors.background.tertiary,
        activeBorderColor: colors.border.normal,
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: colors.background.secondary,
        disabledBorderColor: colors.border.light,
      },
    },
    link: {
      default: {
        color: colors.primary[500],
        backgroundColor: "transparent",
        borderColor: "transparent",
        hoverColor: colors.primary[600],
        hoverBackgroundColor: "transparent",
        hoverBorderColor: "transparent",
        activeColor: colors.primary[700],
        activeBackgroundColor: "transparent",
        activeBorderColor: "transparent",
        disabledColor: colors.text.secondary,
        disabledBackgroundColor: "transparent",
        disabledBorderColor: "transparent",
      },
    },
  };

  return variantMap[normalizedVariant];
};

// =============================================================================
// POSITION SYSTEM
// =============================================================================

const getPaginationPositionStyles = (position: PaginationPosition) => {
  const positionMap = {
    left: css`
      justify-content: flex-start;
    `,
    center: css`
      justify-content: center;
    `,
    right: css`
      justify-content: flex-end;
    `,
  };

  return positionMap[position];
};

// =============================================================================
// ACCESSIBILITY STYLES
// =============================================================================

const getAccessibilityStyles = (accessibility?: AccessibilityProps) => {
  if (!accessibility) return css``;

  return css`
    ${accessibility.largeText && css`
      font-size: calc(1em * 1.2);
      line-height: calc(1.4 * 1.2);
    `}

    ${accessibility.highContrast && css`
      color: #000000;
      background-color: #ffffff;
      border: 2px solid #000000;
    `}

    ${accessibility.increasedSpacing && css`
      padding: calc(0.5em * 1.5);
      gap: calc(0.5em * 1.5);
    `}

    ${accessibility.reducedMotion && css`
      transition: none !important;
      animation: none !important;
    `}
  `;
};

// =============================================================================
// MAIN PAGINATION CONTAINER
// =============================================================================

export const StyledPagination = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "$position",
    "$simple",
    "$responsive",
    "accessibility",
  ]),
})<StyledPaginationProps>`
  ${({ $size, $variant, $position, $simple, $responsive, accessibility }) => {
    const sizeStyles = getPaginationSizeStyles($size);
    const variantColors = getPaginationVariantColors($variant);
    const positionStyles = getPaginationPositionStyles($position);
    
    return css`
      display: flex;
      align-items: center;
      gap: ${sizeStyles.gap};
      font-size: ${sizeStyles.fontSize};
      line-height: ${sizeStyles.lineHeight};
      color: ${variantColors.default.color};
      
      ${positionStyles}
      
      ${$simple && css`
        .pagination-item:not(.pagination-prev):not(.pagination-next):not(.pagination-current) {
          display: none;
        }
      `}
      
      ${$responsive && css`
        @media (max-width: 768px) {
          gap: calc(${sizeStyles.gap} * 0.5);
          
          .pagination-total,
          .pagination-size-changer,
          .pagination-jumper {
            display: none;
          }
          
          .pagination-item {
            min-width: ${sizeStyles.minWidth};
            padding: calc(${sizeStyles.padding.split(' ')[0]} * 0.8) calc(${sizeStyles.padding.split(' ')[1]} * 0.8);
          }
        }
        
        @media (max-width: 480px) {
          .pagination-item:not(.pagination-prev):not(.pagination-next):not(.pagination-current) {
            display: none;
          }
        }
      `}
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// PAGINATION ITEM
// =============================================================================

export const StyledPaginationItem = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "$active",
    "$disabled",
    "$type",
    "accessibility",
  ]),
})<StyledPaginationItemProps>`
  ${({ $size, $variant, $active, $disabled, $type, accessibility }) => {
    const sizeStyles = getPaginationSizeStyles($size);
    const variantColors = getPaginationVariantColors($variant);
    
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: ${sizeStyles.minWidth};
      height: ${sizeStyles.height};
      padding: ${sizeStyles.padding};
      font-size: ${sizeStyles.fontSize};
      line-height: ${sizeStyles.lineHeight};
      border: 1px solid ${variantColors.default.borderColor};
      border-radius: 4px;
      background-color: ${variantColors.default.backgroundColor};
      color: ${variantColors.default.color};
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      text-decoration: none;
      
      &:hover:not(:disabled) {
        color: ${variantColors.default.hoverColor};
        background-color: ${variantColors.default.hoverBackgroundColor};
        border-color: ${variantColors.default.hoverBorderColor};
      }
      
      &:active:not(:disabled) {
        color: ${variantColors.default.activeColor};
        background-color: ${variantColors.default.activeBackgroundColor};
        border-color: ${variantColors.default.activeBorderColor};
      }
      
      &:focus-visible {
        outline: 2px solid ${variantColors.default.hoverColor};
        outline-offset: 2px;
      }
      
      ${$active && css`
        color: ${variantColors.default.activeColor};
        background-color: ${variantColors.default.activeBackgroundColor};
        border-color: ${variantColors.default.activeBorderColor};
        font-weight: 500;
        
        &:hover {
          color: ${variantColors.default.activeColor};
          background-color: ${variantColors.default.activeBackgroundColor};
          border-color: ${variantColors.default.activeBorderColor};
        }
      `}
      
      ${$disabled && css`
        color: ${variantColors.default.disabledColor};
        background-color: ${variantColors.default.disabledBackgroundColor};
        border-color: ${variantColors.default.disabledBorderColor};
        cursor: not-allowed;
        pointer-events: none;
      `}
      
      ${($type === "jump-prev" || $type === "jump-next") && css`
        border: none;
        background: transparent;
        color: ${variantColors.default.color};
        font-weight: bold;
        
        &:hover:not(:disabled) {
          color: ${variantColors.default.hoverColor};
          background-color: ${variantColors.default.hoverBackgroundColor};
        }
      `}
      
      svg {
        width: ${sizeStyles.iconSize};
        height: ${sizeStyles.iconSize};
        flex-shrink: 0;
      }
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// PAGINATION SIZE CHANGER
// =============================================================================

export const StyledPaginationSizeChanger = styled.select.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "accessibility",
  ]),
})<StyledPaginationSizeChangerProps>`
  ${({ $size, $variant, accessibility }) => {
    const sizeStyles = getPaginationSizeStyles($size);
    const variantColors = getPaginationVariantColors($variant);
    
    return css`
      display: inline-flex;
      align-items: center;
      height: ${sizeStyles.height};
      padding: ${sizeStyles.padding};
      font-size: ${sizeStyles.fontSize};
      line-height: ${sizeStyles.lineHeight};
      border: 1px solid ${variantColors.default.borderColor};
      border-radius: 4px;
      background-color: ${variantColors.default.backgroundColor};
      color: ${variantColors.default.color};
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        border-color: ${variantColors.default.hoverBorderColor};
      }
      
      &:focus {
        outline: 2px solid ${variantColors.default.hoverColor};
        outline-offset: 2px;
        border-color: ${variantColors.default.hoverBorderColor};
      }
      
      option {
        color: ${variantColors.default.color};
        background-color: ${variantColors.default.backgroundColor};
      }
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// PAGINATION JUMPER
// =============================================================================

export const StyledPaginationJumper = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "accessibility",
  ]),
})<StyledPaginationJumperProps>`
  ${({ $size, $variant, accessibility }) => {
    const sizeStyles = getPaginationSizeStyles($size);
    
    return css`
      display: inline-flex;
      align-items: center;
      gap: ${sizeStyles.gap};
      font-size: ${sizeStyles.fontSize};
      
      .pagination-jumper-text {
        color: inherit;
      }
      
      .pagination-jumper-input {
        width: 60px;
        height: ${sizeStyles.height};
        padding: ${sizeStyles.padding};
        font-size: ${sizeStyles.fontSize};
        line-height: ${sizeStyles.lineHeight};
        border: 1px solid ${useThemeColors().border.normal};
        border-radius: 4px;
        background-color: ${useThemeColors().background.primary};
        color: ${useThemeColors().text.primary};
        text-align: center;
        transition: all 0.2s ease;
        
        &:hover {
          border-color: ${useThemeColors().primary[300]};
        }
        
        &:focus {
          outline: 2px solid ${useThemeColors().primary[500]};
          outline-offset: 2px;
          border-color: ${useThemeColors().primary[500]};
        }
      }
      
      .pagination-jumper-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: ${sizeStyles.height};
        padding: ${sizeStyles.padding};
        font-size: ${sizeStyles.fontSize};
        border: 1px solid ${useThemeColors().border.normal};
        border-radius: 4px;
        background-color: ${useThemeColors().background.primary};
        color: ${useThemeColors().text.primary};
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          color: ${useThemeColors().primary[500]};
          border-color: ${useThemeColors().primary[300]};
          background-color: ${useThemeColors().primary[50]};
        }
        
        &:active {
          color: ${useThemeColors().primary[600]};
          background-color: ${useThemeColors().primary[100]};
        }
        
        &:focus-visible {
          outline: 2px solid ${useThemeColors().primary[500]};
          outline-offset: 2px;
        }
        
        svg {
          width: ${sizeStyles.iconSize};
          height: ${sizeStyles.iconSize};
        }
      }
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// PAGINATION TOTAL
// =============================================================================

export const StyledPaginationTotal = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "accessibility",
  ]),
})<StyledPaginationTotalProps>`
  ${({ $size, $variant, accessibility }) => {
    const sizeStyles = getPaginationSizeStyles($size);
    const variantColors = getPaginationVariantColors($variant);
    
    return css`
      display: inline-flex;
      align-items: center;
      font-size: ${sizeStyles.fontSize};
      line-height: ${sizeStyles.lineHeight};
      color: ${variantColors.default.color};
      margin-right: ${sizeStyles.gap};
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// PREDEFINED COMPONENT LAYOUTS
// =============================================================================

// Simple pagination
export const SimplePagination = styled(StyledPagination)`
  .pagination-item:not(.pagination-prev):not(.pagination-next):not(.pagination-current) {
    display: none;
  }
`;

// Complete pagination
export const CompletePagination = styled(StyledPagination)`
  flex-wrap: wrap;
  gap: 12px;
  
  .pagination-options {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }
`;

// Compact pagination
export const CompactPagination = styled(StyledPagination)`
  gap: 4px;
  
  ${StyledPaginationItem} {
    min-width: 24px;
    height: 24px;
    padding: 4px 6px;
    font-size: 0.75rem;
  }
`;

// Large pagination
export const LargePagination = styled(StyledPagination)`
  gap: 12px;
  
  ${StyledPaginationItem} {
    min-width: 40px;
    height: 40px;
    padding: 12px 16px;
    font-size: 1rem;
  }
`;

// Responsive pagination
export const ResponsivePagination = styled(StyledPagination)`
  @media (max-width: 768px) {
    gap: 4px;
    
    .pagination-total,
    .pagination-size-changer,
    .pagination-jumper {
      display: none;
    }
    
    ${StyledPaginationItem} {
      min-width: 28px;
      padding: 6px 8px;
    }
  }
  
  @media (max-width: 480px) {
    .pagination-item:not(.pagination-prev):not(.pagination-next):not(.pagination-current) {
      display: none !important;
    }
  }
`;

// Minimal pagination
export const MinimalPagination = styled(StyledPagination)`
  ${StyledPaginationItem} {
    border: none;
    background: transparent;
    
    &:hover:not(:disabled) {
      background-color: ${props => {
        const colors = useThemeColors();
        return colors.background.secondary;
      }};
    }
  }
`;

// Rounded pagination
export const RoundedPagination = styled(StyledPagination)`
  ${StyledPaginationItem} {
    border-radius: 50%;
  }
`;

// Skeleton loading
export const PaginationSkeleton = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ accessibility?: AccessibilityProps }>`
  ${({ accessibility }) => {
    const colors = useThemeColors();
    
    return css`
      display: flex;
      align-items: center;
      gap: 8px;
      
      .pagination-skeleton-item {
        height: 32px;
        background: ${colors.background.secondary};
        border-radius: 4px;
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      .pagination-skeleton-item:nth-child(1) { width: 60px; }
      .pagination-skeleton-item:nth-child(2) { width: 32px; }
      .pagination-skeleton-item:nth-child(3) { width: 32px; }
      .pagination-skeleton-item:nth-child(4) { width: 32px; }
      .pagination-skeleton-item:nth-child(5) { width: 32px; }
      .pagination-skeleton-item:nth-child(6) { width: 32px; }
      .pagination-skeleton-item:nth-child(7) { width: 100px; }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      ${accessibility?.reducedMotion && css`
        .pagination-skeleton-item {
          animation: none;
          opacity: 0.7;
        }
      `}
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// High contrast pagination
export const HighContrastPagination = styled(StyledPagination)`
  ${StyledPaginationItem} {
    color: #000000;
    background-color: #ffffff;
    border: 2px solid #000000;
    
    &:hover:not(:disabled) {
      background-color: #ffff00;
    }
    
    &.pagination-active {
      background-color: #000000;
      color: #ffffff;
    }
  }
`;

// Large text pagination
export const LargeTextPagination = styled(StyledPagination)`
  font-size: calc(1rem * 1.3);
  line-height: calc(1.5 * 1.3);
  gap: calc(8px * 1.3);
  
  ${StyledPaginationItem} {
    height: calc(32px * 1.3);
    min-width: calc(32px * 1.3);
    padding: calc(8px * 1.3) calc(12px * 1.3);
  }
`;
