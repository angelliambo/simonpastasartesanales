import styled, { css } from "styled-components";
import { useThemeColors } from "../../../../hooks/useThemeColors";
import { normalizeLegacySize } from "../shared/sizes";
import { normalizeLegacyVariant } from "../shared/variants";
import { createShouldForwardProp } from "../../../../utils/shouldForwardProp";
import {
  StyledBreadcrumbProps,
  StyledBreadcrumbItemProps,
  StyledBreadcrumbSeparatorProps,
  StyledBreadcrumbLinkProps,
  BreadcrumbSize,
  BreadcrumbVariant,
  AccessibilityProps,
} from "./Breadcrumb.types";

// =============================================================================
// SIZE SYSTEM
// =============================================================================

const getBreadcrumbSizeStyles = (size: BreadcrumbSize) => {
  const normalizedSize = normalizeLegacySize(size);
  
  const sizeMap = {
    xs: {
      fontSize: "0.75rem",
      padding: "2px 4px",
      lineHeight: "1.2",
      gap: "4px",
      iconSize: "12px",
    },
    sm: {
      fontSize: "0.8rem",
      padding: "4px 6px",
      lineHeight: "1.3",
      gap: "6px",
      iconSize: "14px",
    },
    md: {
      fontSize: "0.875rem",
      padding: "6px 8px",
      lineHeight: "1.4",
      gap: "8px",
      iconSize: "16px",
    },
    lg: {
      fontSize: "1rem",
      padding: "8px 12px",
      lineHeight: "1.5",
      gap: "10px",
      iconSize: "18px",
    },
    xl: {
      fontSize: "1.125rem",
      padding: "10px 16px",
      lineHeight: "1.6",
      gap: "12px",
      iconSize: "20px",
    },
    xxl: {
      fontSize: "1.25rem",
      padding: "12px 20px",
      lineHeight: "1.7",
      gap: "16px",
      iconSize: "22px",
    },
  };

  return sizeMap[normalizedSize];
};

// =============================================================================
// VARIANT SYSTEM
// =============================================================================

const getBreadcrumbVariantColors = (variant: BreadcrumbVariant) => {
  const colors = useThemeColors();
  const normalizedVariant = normalizeLegacyVariant(variant);
  
  const variantMap = {
    primary: {
      default: {
        color: colors.primary[500],
        hoverColor: colors.primary[600],
        activeColor: colors.primary[700],
        disabledColor: colors.primary[200],
      },
      separator: colors.text.secondary,
    },
    secondary: {
      default: {
        color: colors.text.secondary,
        hoverColor: colors.text.primary,
        activeColor: colors.text.primary,
        disabledColor: colors.text.secondary,
      },
      separator: colors.text.secondary,
    },
    success: {
      default: {
        color: colors.success[500],
        hoverColor: colors.success[600],
        activeColor: colors.success[700],
        disabledColor: colors.success[200],
      },
      separator: colors.text.secondary,
    },
    warning: {
      default: {
        color: colors.warning[500],
        hoverColor: colors.warning[600],
        activeColor: colors.warning[700],
        disabledColor: colors.warning[200],
      },
      separator: colors.text.secondary,
    },
    error: {
      default: {
        color: colors.error[500],
        hoverColor: colors.error[600],
        activeColor: colors.error[700],
        disabledColor: colors.error[200],
      },
      separator: colors.text.secondary,
    },
    info: {
      default: {
        color: colors.info[500],
        hoverColor: colors.info[600],
        activeColor: colors.info[700],
        disabledColor: colors.info[200],
      },
      separator: colors.text.secondary,
    },
    ghost: {
      default: {
        color: colors.text.secondary,
        hoverColor: colors.text.primary,
        activeColor: colors.primary[500],
        disabledColor: colors.text.secondary,
      },
      separator: colors.text.secondary,
    },
    tertiary: {
      default: {
        color: colors.text.secondary,
        hoverColor: colors.text.primary,
        activeColor: colors.text.primary,
        disabledColor: colors.text.secondary,
      },
      separator: colors.text.secondary,
    },
    outlined: {
      default: {
        color: colors.text.primary,
        hoverColor: colors.primary[500],
        activeColor: colors.primary[600],
        disabledColor: colors.text.secondary,
      },
      separator: colors.border.normal,
    },
    inverse: {
      default: {
        color: colors.text.inverse,
        hoverColor: colors.text.primary,
        activeColor: colors.text.primary,
        disabledColor: colors.text.secondary,
      },
      separator: colors.text.secondary,
    },
    link: {
      default: {
        color: colors.primary[500],
        hoverColor: colors.primary[600],
        activeColor: colors.primary[700],
        disabledColor: colors.text.secondary,
      },
      separator: colors.text.secondary,
    },
  };

  return variantMap[normalizedVariant];
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
// MAIN BREADCRUMB CONTAINER
// =============================================================================

export const StyledBreadcrumb = styled.nav.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "$responsive",
    "accessibility",
  ]),
})<StyledBreadcrumbProps>`
  ${({ $size, $variant, $responsive, accessibility }) => {
    const sizeStyles = getBreadcrumbSizeStyles($size);
    const variantColors = getBreadcrumbVariantColors($variant);
    
    return css`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: ${sizeStyles.gap};
      font-size: ${sizeStyles.fontSize};
      line-height: ${sizeStyles.lineHeight};
      color: ${variantColors.default.color};
      
      ${$responsive && css`
        @media (max-width: 768px) {
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          
          &::-webkit-scrollbar {
            display: none;
          }
        }
      `}
      
      ${getAccessibilityStyles(accessibility)}
      
      .breadcrumb-separator {
        display: inline-flex;
        align-items: center;
        color: ${variantColors.separator};
        margin: 0 2px;
        user-select: none;
        flex-shrink: 0;
        
        svg {
          width: ${sizeStyles.iconSize};
          height: ${sizeStyles.iconSize};
        }
      }
    `;
  }}
`;

// =============================================================================
// BREADCRUMB ITEM
// =============================================================================

export const StyledBreadcrumbItem = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "$disabled",
    "$active",
    "$clickable",
    "accessibility",
  ]),
})<StyledBreadcrumbItemProps>`
  ${({ $size, $variant, $disabled, $active, $clickable, accessibility }) => {
    const sizeStyles = getBreadcrumbSizeStyles($size);
    const variantColors = getBreadcrumbVariantColors($variant);
    
    return css`
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
      
      ${$active && css`
        color: ${variantColors.default.activeColor};
        font-weight: 500;
      `}
      
      ${$disabled && css`
        color: ${variantColors.default.disabledColor};
        cursor: not-allowed;
        pointer-events: none;
      `}
      
      ${$clickable && !$disabled && css`
        cursor: pointer;
        transition: color 0.2s ease;
        
        &:hover {
          color: ${variantColors.default.hoverColor};
        }
        
        &:active {
          color: ${variantColors.default.activeColor};
        }
        
        &:focus-visible {
          outline: 2px solid ${variantColors.default.color};
          outline-offset: 2px;
          border-radius: 2px;
        }
      `}
      
      ${getAccessibilityStyles(accessibility)}
      
      .breadcrumb-icon {
        display: inline-flex;
        align-items: center;
        
        svg {
          width: ${sizeStyles.iconSize};
          height: ${sizeStyles.iconSize};
        }
      }
    `;
  }}
`;

// =============================================================================
// BREADCRUMB LINK
// =============================================================================

export const StyledBreadcrumbLink = styled.a<StyledBreadcrumbLinkProps>`
  ${({ $size, $variant, $disabled, accessibility }) => {
    const variantColors = getBreadcrumbVariantColors($variant);
    
    return css`
      color: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      
      ${!$disabled && css`
        transition: color 0.2s ease;
        
        &:hover {
          color: ${variantColors.default.hoverColor};
          text-decoration: underline;
        }
        
        &:active {
          color: ${variantColors.default.activeColor};
        }
        
        &:focus-visible {
          outline: 2px solid ${variantColors.default.color};
          outline-offset: 2px;
          border-radius: 2px;
        }
      `}
      
      ${$disabled && css`
        color: ${variantColors.default.disabledColor};
        cursor: not-allowed;
        pointer-events: none;
      `}
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// BREADCRUMB SEPARATOR
// =============================================================================

export const StyledBreadcrumbSeparator = styled.span.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "$separator",
    "accessibility",
  ]),
})<StyledBreadcrumbSeparatorProps>`
  ${({ $size, $variant, $separator, accessibility }) => {
    const sizeStyles = getBreadcrumbSizeStyles($size);
    const variantColors = getBreadcrumbVariantColors($variant);
    
    return css`
      display: inline-flex;
      align-items: center;
      color: ${variantColors.separator};
      margin: 0 2px;
      user-select: none;
      flex-shrink: 0;
      
      svg {
        width: ${sizeStyles.iconSize};
        height: ${sizeStyles.iconSize};
      }
      
      ${$separator === "arrow" && css`
        font-size: calc(${sizeStyles.fontSize} * 1.1);
      `}
      
      ${$separator === "chevron" && css`
        opacity: 0.7;
      `}
      
      ${$separator === "dot" && css`
        font-size: calc(${sizeStyles.fontSize} * 0.8);
        font-weight: bold;
      `}
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// BREADCRUMB COLLAPSED INDICATOR
// =============================================================================

export const StyledBreadcrumbCollapsed = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "accessibility",
  ]),
})<StyledBreadcrumbItemProps>`
  ${({ $size, $variant, accessibility }) => {
    const sizeStyles = getBreadcrumbSizeStyles($size);
    const variantColors = getBreadcrumbVariantColors($variant);
    
    return css`
      display: inline-flex;
      align-items: center;
      padding: ${sizeStyles.padding};
      cursor: pointer;
      transition: color 0.2s ease;
      user-select: none;
      font-weight: 500;
      
      &:hover {
        color: ${variantColors.default.hoverColor};
      }
      
      &:active {
        color: ${variantColors.default.activeColor};
      }
      
      &:focus-visible {
        outline: 2px solid ${variantColors.default.color};
        outline-offset: 2px;
        border-radius: 2px;
      }
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// BREADCRUMB DROPDOWN MENU
// =============================================================================

export const StyledBreadcrumbDropdown = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ accessibility?: AccessibilityProps }>`
  ${({ accessibility }) => {
    const colors = useThemeColors();
    
    return css`
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      min-width: 160px;
      background: ${colors.background.primary};
      border: 1px solid ${colors.border.normal};
      border-radius: 4px;
      box-shadow: ${colors.shadow};
      padding: 4px 0;
      margin-top: 4px;
      
      .breadcrumb-dropdown-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: ${colors.background.secondary};
        }
        
        &:active {
          background-color: ${colors.background.tertiary};
        }
        
        &.disabled {
          color: ${colors.text.secondary};
          cursor: not-allowed;
          pointer-events: none;
        }
      }
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// =============================================================================
// PREDEFINED COMPONENT LAYOUTS
// =============================================================================

// Simple breadcrumb
export const SimpleBreadcrumb = styled(StyledBreadcrumb)`
  gap: 8px;
  font-size: 0.875rem;
`;

// Navigation breadcrumb
export const NavigationBreadcrumb = styled(StyledBreadcrumb)`
  padding: 8px 0;
  border-bottom: 1px solid ${props => {
    const colors = useThemeColors();
    return colors.border.light;
  }};
`;

// Compact breadcrumb
export const CompactBreadcrumb = styled(StyledBreadcrumb)`
  gap: 4px;
  font-size: 0.75rem;
  
  .breadcrumb-separator {
    margin: 0 1px;
  }
`;

// Large breadcrumb
export const LargeBreadcrumb = styled(StyledBreadcrumb)`
  gap: 12px;
  font-size: 1.125rem;
  padding: 12px 0;
`;

// Responsive breadcrumb
export const ResponsiveBreadcrumb = styled(StyledBreadcrumb)`
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    ${StyledBreadcrumbItem} {
      white-space: nowrap;
    }
  }
`;

// Card breadcrumb
export const CardBreadcrumb = styled(StyledBreadcrumb)`
  background: ${props => {
    const colors = useThemeColors();
    return colors.background.secondary;
  }};
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${props => {
    const colors = useThemeColors();
    return colors.border.light;
  }};
`;

// Minimal breadcrumb
export const MinimalBreadcrumb = styled(StyledBreadcrumb)`
  gap: 6px;
  
  .breadcrumb-separator {
    opacity: 0.5;
  }
`;

// Home breadcrumb
export const HomeBreadcrumb = styled(StyledBreadcrumb)`
  .breadcrumb-home-icon {
    margin-right: 4px;
  }
`;

// Mobile breadcrumb
export const MobileBreadcrumb = styled(StyledBreadcrumb)`
  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 6px;
    
    ${StyledBreadcrumbItem} {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

// Skeleton loading
export const BreadcrumbSkeletonContainer = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ accessibility?: AccessibilityProps }>`
  ${({ accessibility }) => {
    const colors = useThemeColors();
    
    return css`
      display: flex;
      align-items: center;
      gap: 8px;
      
      .breadcrumb-skeleton-item {
        height: 16px;
        background: ${colors.background.secondary};
        border-radius: 4px;
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      .breadcrumb-skeleton-item:nth-child(1) { width: 60px; }
      .breadcrumb-skeleton-item:nth-child(2) { width: 8px; }
      .breadcrumb-skeleton-item:nth-child(3) { width: 80px; }
      .breadcrumb-skeleton-item:nth-child(4) { width: 8px; }
      .breadcrumb-skeleton-item:nth-child(5) { width: 100px; }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      ${accessibility?.reducedMotion && css`
        .breadcrumb-skeleton-item {
          animation: none;
          opacity: 0.7;
        }
      `}
      
      ${getAccessibilityStyles(accessibility)}
    `;
  }}
`;

// High contrast breadcrumb
export const HighContrastBreadcrumb = styled(StyledBreadcrumb)`
  color: #000000;
  
  ${StyledBreadcrumbItem} {
    color: #000000;
    
    &:hover {
      background-color: #ffff00;
    }
  }
  
  .breadcrumb-separator {
    color: #000000;
    font-weight: bold;
  }
`;

// Large text breadcrumb
export const LargeTextBreadcrumb = styled(StyledBreadcrumb)`
  font-size: calc(1rem * 1.3);
  line-height: calc(1.5 * 1.3);
  gap: calc(8px * 1.3);
  
  .breadcrumb-separator {
    margin: 0 calc(2px * 1.3);
  }
`;
