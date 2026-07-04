import { useThemeColors } from '../../hooks/useThemeColors';
import styled, { css, keyframes } from "styled-components";
import { normalizeLegacySize } from "../shared/sizes";
import { normalizeLegacyVariant } from "../shared/variants";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';
import {
  StyledBackTopProps,
  StyledBackTopContentProps,
  BackTopSize,
  BackTopVariant,
  BackTopShape,
  BackTopPlacement,
  AccessibilityProps,
} from "./BackTop.types";

// =============================================================================
// ANIMATIONS
// =============================================================================

const backTopFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const backTopFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
  }
`;

const backTopPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(24, 144, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
  }
`;

const backTopRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getBackTopSizeStyles = (size: BackTopSize) => {
  const normalizedSize = normalizeLegacySize(size);
  const sizeMap = {
    xs: { width: "32px", height: "32px", fontSize: "12px", iconSize: "12px" },
    sm: { width: "36px", height: "36px", fontSize: "13px", iconSize: "14px" },
    md: { width: "40px", height: "40px", fontSize: "14px", iconSize: "16px" },
    lg: { width: "48px", height: "48px", fontSize: "16px", iconSize: "18px" },
    xl: { width: "56px", height: "56px", fontSize: "18px", iconSize: "20px" },
    xxl: { width: "64px", height: "64px", fontSize: "20px", iconSize: "24px" },
  };
  return sizeMap[normalizedSize] || sizeMap.md;
};

const getBackTopVariantStyles = (variant: BackTopVariant, colors: any) => {
  const normalizedVariant = normalizeLegacyVariant(variant);
  const variantMap = {
    primary: {
      background: colors.primary?.[600] || "#1890ff",
      color: "#ffffff",
      hoverBackground: colors.primary?.[500] || "#40a9ff",
      activeBackground: colors.primary?.[700] || "#096dd9",
      shadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
      hoverShadow: "0 4px 16px rgba(24, 144, 255, 0.4)",
    },
    secondary: {
      background: colors.text?.secondary || "#666666",
      color: "#ffffff",
      hoverBackground: colors.text?.primary || "#333333",
      activeBackground: "#1a1a1a",
      shadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      hoverShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    },
    tertiary: {
      background: colors.background?.primary || "#ffffff",
      color: colors.text?.primary || "#333333",
      hoverBackground: colors.background?.secondary || "#f5f5f5",
      activeBackground: "#e8e8e8",
      shadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      hoverShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    },
    outlined: {
      background: "transparent",
      color: colors.text?.primary || "#333333",
      hoverBackground: colors.primary?.[50] || "#e6f7ff",
      activeBackground: colors.primary?.[100] || "#bae7ff",
      shadow: "none",
      hoverShadow: "0 2px 8px rgba(24, 144, 255, 0.2)",
    },
    inverse: {
      background: "#000000",
      color: "#ffffff",
      hoverBackground: "#333333",
      activeBackground: "#666666",
      shadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
      hoverShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
    },
    success: {
      background: colors.success?.[600] || "#52c41a",
      color: "#ffffff",
      hoverBackground: colors.success?.[500] || "#73d13d",
      activeBackground: colors.success?.[700] || "#389e0d",
      shadow: "0 2px 8px rgba(82, 196, 26, 0.3)",
      hoverShadow: "0 4px 16px rgba(82, 196, 26, 0.4)",
    },
    warning: {
      background: colors.warning?.[600] || "#fa8c16",
      color: "#ffffff",
      hoverBackground: colors.warning?.[500] || "#ffa940",
      activeBackground: colors.warning?.[700] || "#d46b08",
      shadow: "0 2px 8px rgba(250, 140, 22, 0.3)",
      hoverShadow: "0 4px 16px rgba(250, 140, 22, 0.4)",
    },
    error: {
      background: colors.error?.[600] || "#f5222d",
      color: "#ffffff",
      hoverBackground: colors.error?.[500] || "#ff4d4f",
      activeBackground: colors.error?.[700] || "#cf1322",
      shadow: "0 2px 8px rgba(245, 34, 45, 0.3)",
      hoverShadow: "0 4px 16px rgba(245, 34, 45, 0.4)",
    },
    info: {
      background: colors.info?.[600] || "#1890ff",
      color: "#ffffff",
      hoverBackground: colors.info?.[500] || "#40a9ff",
      activeBackground: colors.info?.[700] || "#096dd9",
      shadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
      hoverShadow: "0 4px 16px rgba(24, 144, 255, 0.4)",
    },
    ghost: {
      background: "transparent",
      color: colors.text?.primary || "#333333",
      hoverBackground: colors.background?.secondary || "#f5f5f5",
      activeBackground: colors.background?.secondary || "#f5f5f5",
      shadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      hoverShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    },
    link: {
      background: "transparent",
      color: colors.primary?.[600] || "#1890ff",
      hoverBackground: colors.primary?.[50] || "#e6f7ff",
      activeBackground: colors.primary?.[100] || "#bae7ff",
      shadow: "none",
      hoverShadow: "0 2px 8px rgba(24, 144, 255, 0.2)",
    },
  };
  return variantMap[normalizedVariant] || variantMap.primary;
};

const getBackTopShapeStyles = (shape: BackTopShape) => {
  const shapeMap = {
    circle: css`
      border-radius: 50%;
    `,
    square: css`
      border-radius: 0;
    `,
    round: css`
      border-radius: 6px;
    `,
  };
  return shapeMap[shape] || shapeMap.circle;
};

const getBackTopPlacementStyles = (
  placement: BackTopPlacement,
  right?: number | string,
  left?: number | string
) => {
  if (placement === "center") {
    return css`
      left: 50%;
      transform: translateX(-50%);
    `;
  }
  
  if (placement === "left") {
    const leftValue = left !== undefined ? left : 50;
    return css`
      left: ${typeof leftValue === "number" ? `${leftValue}px` : leftValue};
    `;
  }
  
  // Default: right placement
  const rightValue = right !== undefined ? right : 50;
  return css`
    right: ${typeof rightValue === "number" ? `${rightValue}px` : rightValue};
  `;
};

// =============================================================================
// BACKTOP CONTAINER
// =============================================================================

export const StyledBackTop = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "$size",
    "$variant",
    "$shape",
    "$placement",
    "$visible",
    "$right",
    "$left",
    "$bottom",
    "$zIndex",
    "accessibility",
  ]),
})<StyledBackTopProps>`
  ${({ 
    $size, 
    $variant, 
    $shape, 
    $placement, 
    $visible, 
    $right, 
    $left, 
    $bottom, 
    $zIndex, 
    accessibility 
  }) => {
    const colors = useThemeColors();
    const sizeStyles = getBackTopSizeStyles($size);
    const variantStyles = getBackTopVariantStyles($variant, colors);

    return css`
      position: fixed;
      ${getBackTopPlacementStyles($placement, $right, $left)}
      bottom: ${typeof $bottom === "number" ? `${$bottom}px` : $bottom};
      z-index: ${$zIndex};
      
      /* Size and shape */
      width: ${sizeStyles.width};
      height: ${sizeStyles.height};
      ${getBackTopShapeStyles($shape)}
      
      /* Appearance */
      background: ${variantStyles.background};
      color: ${variantStyles.color};
      border: none;
      box-shadow: ${variantStyles.shadow};
      cursor: pointer;
      outline: none;
      
      /* Layout */
      display: flex;
      align-items: center;
      justify-content: center;
      
      /* Transitions */
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      
      /* Visibility */
      opacity: ${$visible ? 1 : 0};
      visibility: ${$visible ? "visible" : "hidden"};
      transform: ${$visible ? "translateY(0)" : "translateY(10px)"};
      pointer-events: ${$visible ? "auto" : "none"};
      
      /* Animation */
      animation: ${$visible ? backTopFadeIn : backTopFadeOut} 0.3s ease-out;
      
      /* Interactions */
      &:hover {
        background: ${variantStyles.hoverBackground};
        box-shadow: ${variantStyles.hoverShadow};
        transform: ${$visible ? "translateY(-2px)" : "translateY(10px)"};
      }
      
      &:active {
        background: ${variantStyles.activeBackground};
        transform: ${$visible ? "translateY(0)" : "translateY(10px)"};
      }
      
      &:focus {
        outline: 2px solid ${colors.primary?.[300] || "#91d5ff"};
        outline-offset: 2px;
      }
      
      /* Accessibility enhancements */
      ${accessibility?.reducedMotion &&
      css`
        animation: none;
        transition: opacity 0.2s ease;
        
        &:hover {
          transform: none;
        }
      `}

      ${accessibility?.increasedSpacing &&
      css`
        width: calc(${sizeStyles.width} + 8px);
        height: calc(${sizeStyles.height} + 8px);
      `}

      ${accessibility?.largeText &&
      css`
        font-size: calc(${sizeStyles.fontSize} * 1.2);
        width: calc(${sizeStyles.width} + 4px);
        height: calc(${sizeStyles.height} + 4px);
      `}

      ${accessibility?.highContrast &&
      css`
        background: #000000;
        color: #ffffff;
        border: 2px solid #ffffff;
        
        &:hover {
          background: #ffffff;
          color: #000000;
        }
      `}

      /* Mobile responsive */
      @media (max-width: 768px) {
        ${$placement === "center" && css`
          left: auto;
          right: 20px;
        `}
        
        bottom: ${typeof $bottom === "number" ? `${Math.max($bottom - 10, 20)}px` : "20px"};
        
        ${$placement === "left" && css`
          left: 20px;
        `}
        
        ${$placement === "right" && css`
          right: 20px;
        `}
      }
      
      /* Print styles */
      @media print {
        display: none;
      }
    `;
  }}
`;

// =============================================================================
// BACKTOP CONTENT
// =============================================================================

export const StyledBackTopContent = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<StyledBackTopContentProps>`
  ${({ $hasIcon, $hasText, accessibility }) => {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${$hasIcon && $hasText ? "4px" : "0"};
      flex-direction: ${$hasIcon && $hasText ? "column" : "row"};
      
      .backtop-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        
        svg {
          display: block;
          width: 1em;
          height: 1em;
        }
      }
      
      .backtop-text {
        font-size: 0.85em;
        font-weight: 500;
        white-space: nowrap;
        line-height: 1;
      }
      
      /* Accessibility */
      ${accessibility?.largeText &&
      css`
        .backtop-text {
          font-size: 1em;
        }
        
        gap: ${$hasIcon && $hasText ? "6px" : "0"};
      `}
    `;
  }}
`;

// =============================================================================
// PROGRESS INDICATOR
// =============================================================================

export const StyledProgressRing = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["accessibility"]),
})<{ $progress: number; accessibility?: AccessibilityProps }>`
  ${({ $progress, accessibility }) => {
    return css`
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: inherit;
      
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: rgba(255, 255, 255, 0.8);
        transform: rotate(${$progress * 360}deg);
        transition: transform 0.1s ease-out;
      }
      
      ${accessibility?.reducedMotion &&
      css`
        &::before {
          transition: none;
        }
      `}
    `;
  }}
`;

// =============================================================================
// PREDEFINED VARIANTS
// =============================================================================

export const CircleBackTop = styled(StyledBackTop)`
  ${() => css`
    border-radius: 50%;
  `}
`;

export const SquareBackTop = styled(StyledBackTop)`
  ${() => css`
    border-radius: 0;
  `}
`;

export const RoundBackTop = styled(StyledBackTop)`
  ${() => css`
    border-radius: 6px;
  `}
`;

export const FloatingBackTop = styled(StyledBackTop)`
  ${() => {
    const colors = useThemeColors();
    
    return css`
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.9);
      color: ${colors.text?.primary || "#333333"};
      border: 1px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.95);
      }
    `;
  }}
`;

export const PulsingBackTop = styled(StyledBackTop)`
  ${() => css`
    animation: ${backTopPulse} 2s infinite;
    
    &:hover {
      animation: none;
    }
  `}
`;

export const RotatingBackTop = styled(StyledBackTop)`
  ${() => css`
    .backtop-icon {
      animation: ${backTopRotate} 2s linear infinite;
    }
    
    &:hover .backtop-icon {
      animation-duration: 0.5s;
    }
  `}
`;

// =============================================================================
// LAYOUT VARIANTS
// =============================================================================

export const CompactBackTop = styled(StyledBackTop)`
  ${() => css`
    width: 32px;
    height: 32px;
    font-size: 12px;
  `}
`;

export const LargeBackTop = styled(StyledBackTop)`
  ${() => css`
    width: 56px;
    height: 56px;
    font-size: 18px;
  `}
`;

export const TextBackTop = styled(StyledBackTop)`
  ${() => css`
    width: auto;
    height: auto;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 500;
  `}
`;

// =============================================================================
// ACCESSIBILITY VARIANTS
// =============================================================================

export const HighContrastBackTop = styled(StyledBackTop)`
  ${() => css`
    background: #000000;
    color: #ffffff;
    border: 2px solid #ffffff;
    
    &:hover {
      background: #ffffff;
      color: #000000;
      border-color: #000000;
    }
    
    &:focus {
      outline: 3px solid #ffff00;
      outline-offset: 2px;
    }
  `}
`;

export const LargeTextBackTop = styled(StyledBackTop)`
  ${() => css`
    font-size: 18px;
    width: 48px;
    height: 48px;
    
    .backtop-text {
      font-size: 14px;
    }
  `}
`;

// =============================================================================
// LOADING AND EMPTY STATES
// =============================================================================

export const BackTopSkeleton = styled.div`
  ${() => css`
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f0f0f0;
    animation: ${backTopFadeIn} 1.5s ease-in-out infinite alternate;
  `}
`;

// =============================================================================
// MOBILE VARIANTS
// =============================================================================

export const MobileBackTop = styled(StyledBackTop)`
  ${() => css`
    @media (max-width: 768px) {
      width: 44px;
      height: 44px;
      right: 20px;
      bottom: 20px;
      
      /* Larger touch target */
      &::after {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
    }
  `}
`;
