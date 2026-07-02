import styled, { css, keyframes } from "styled-components";
import { useThemeColors } from "../../../../hooks/useThemeColors";
import { normalizeLegacySize } from "../shared/sizes";
import {
  StyledAnchorProps,
  StyledAnchorLinkProps,
  StyledAnchorInkProps,
  AnchorSize,
  AnchorDirection,
} from "./Anchor.types";

// =============================================================================
// ANIMATIONS
// =============================================================================

const anchorSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const inkBallAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getAnchorSizeStyles = (size: AnchorSize) => {
  const normalizedSize = normalizeLegacySize(size);
  const sizeMap = {
    xs: { fontSize: "11px", padding: "2px 0", lineHeight: "16px" },
    sm: { fontSize: "12px", padding: "4px 0", lineHeight: "18px" },
    md: { fontSize: "14px", padding: "6px 0", lineHeight: "20px" },
    lg: { fontSize: "16px", padding: "8px 0", lineHeight: "22px" },
    xl: { fontSize: "18px", padding: "10px 0", lineHeight: "24px" },
    xxl: { fontSize: "20px", padding: "12px 0", lineHeight: "26px" },
  };
  return sizeMap[normalizedSize] || sizeMap.md;
};

const getDirectionStyles = (direction: AnchorDirection) => {
  return direction === "vertical"
    ? css`
        flex-direction: column;
        
        .anchor-ink {
          width: 2px;
          height: 100%;
          left: 0;
          top: 0;
        }
        
        .anchor-link {
          padding-left: 16px;
          border-left: 2px solid transparent;
        }
      `
    : css`
        flex-direction: row;
        
        .anchor-ink {
          height: 2px;
          width: 100%;
          bottom: 0;
          left: 0;
        }
        
        .anchor-link {
          padding-bottom: 8px;
          border-bottom: 2px solid transparent;
        }
      `;
};

// =============================================================================
// ANCHOR CONTAINER
// =============================================================================

export const StyledAnchor = styled.nav<StyledAnchorProps>`
  ${({ $size, $variant, $direction, $placement, $affix, accessibility }) => {
    const colors = useThemeColors();
    const sizeStyles = getAnchorSizeStyles($size);

    return css`
      position: ${$affix ? "fixed" : "relative"};
      display: flex;
      font-size: ${sizeStyles.fontSize};
      line-height: ${sizeStyles.lineHeight};
      background: ${colors.background?.primary || "#ffffff"};
      z-index: ${$affix ? 10 : 1};
      
      ${getDirectionStyles($direction)}
      
      /* Affix positioning */
      ${$affix && css`
        ${$placement === "left" && css`
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
        `}
        
        ${$placement === "right" && css`
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
        `}
        
        ${$placement === "top" && css`
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 800px;
          padding: 12px 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        `}
        
        ${$placement === "bottom" && css`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 800px;
          padding: 12px 24px;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
        `}
      `}

      /* Accessibility enhancements */
      ${accessibility?.reducedMotion &&
      css`
        * {
          animation: none !important;
          transition: none !important;
        }
      `}

      ${accessibility?.increasedSpacing &&
      css`
        .anchor-link {
          padding: ${$direction === "vertical" ? "8px 0 8px 20px" : "12px 16px"};
        }
      `}

      ${accessibility?.largeText &&
      css`
        font-size: calc(${sizeStyles.fontSize} * 1.2);
        line-height: calc(${sizeStyles.lineHeight} * 1.2);
      `}

      /* Animation */
      animation: ${anchorSlideIn} 0.3s ease-out;

      /* Mobile responsive */
      @media (max-width: 768px) {
        ${$affix && css`
          position: static;
          transform: none;
          width: 100%;
          max-width: none;
          
          ${$direction === "vertical" && css`
            flex-direction: row;
            flex-wrap: wrap;
            
            .anchor-link {
              padding: 8px 12px;
              border-left: none;
              border-bottom: 2px solid transparent;
            }
            
            .anchor-ink {
              height: 2px;
              width: 100%;
              bottom: 0;
              top: auto;
              left: 0;
            }
          `}
        `}
      }
    `;
  }}
`;

// =============================================================================
// ANCHOR LINK
// =============================================================================

export const StyledAnchorLink = styled.a<StyledAnchorLinkProps>`
  ${({ $active, $level, accessibility }) => {
    const colors = useThemeColors();

    return css`
      display: block;
      position: relative;
      color: ${$active ? colors.primary?.[600] || "#1890ff" : colors.text?.primary || "#333333"};
      text-decoration: none;
      padding: 6px 0;
      font-weight: ${$active ? 500 : 400};
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      cursor: pointer;
      outline: none;
      
      /* Nested level indentation */
      ${$level > 0 && css`
        padding-left: ${16 + $level * 12}px;
        font-size: 0.9em;
        opacity: 0.85;
      `}

      &:hover {
        color: ${colors.primary?.[500] || "#40a9ff"};
        transform: translateX(2px);
      }

      &:focus {
        color: ${colors.primary?.[600] || "#1890ff"};
        outline: 2px solid ${colors.primary?.[300] || "#91d5ff"};
        outline-offset: 2px;
      }

      &:active {
        color: ${colors.primary?.[700] || "#096dd9"};
      }

      /* Active state styling */
      ${$active && css`
        color: ${colors.primary?.[600] || "#1890ff"};
        font-weight: 500;
        
        &::before {
          content: "";
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${colors.primary?.[600] || "#1890ff"};
          animation: ${inkBallAnimation} 2s infinite;
        }
      `}

      /* Accessibility enhancements */
      ${accessibility?.largeText &&
      css`
        font-size: 1.1em;
        line-height: 1.4;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 10px 0;
        margin: 2px 0;
      `}

      ${accessibility?.highContrast &&
      css`
        color: ${$active ? "#000000" : "#333333"};
        border: ${$active ? "2px solid #000000" : "1px solid transparent"};
        
        &:hover {
          color: #000000;
          border-color: #666666;
        }
      `}
    `;
  }}
`;

// =============================================================================
// ANCHOR INK (PROGRESS INDICATOR)
// =============================================================================

export const StyledAnchorInk = styled.div<StyledAnchorInkProps>`
  ${({ $direction, $offset, $height, accessibility }) => {
    const colors = useThemeColors();

    return css`
      position: absolute;
      background: ${colors.border?.light || "#f0f0f0"};
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      pointer-events: none;
      
      &::after {
        content: "";
        position: absolute;
        background: ${colors.primary?.[600] || "#1890ff"};
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        
        ${$direction === "vertical" ? css`
          width: 2px;
          height: ${$height}px;
          top: ${$offset}px;
          left: 0;
        ` : css`
          height: 2px;
          width: ${$height}px;
          left: ${$offset}px;
          top: 0;
        `}
      }

      /* Accessibility */
      ${accessibility?.reducedMotion &&
      css`
        transition: none;
        
        &::after {
          transition: none;
        }
      `}

      ${accessibility?.highContrast &&
      css`
        background: #666666;
        
        &::after {
          background: #000000;
        }
      `}
    `;
  }}
`;

// =============================================================================
// PREDEFINED VARIANTS
// =============================================================================

export const VerticalAnchor = styled(StyledAnchor)`
  ${() => css`
    flex-direction: column;
    
    .anchor-ink {
      width: 2px;
      height: 100%;
      left: 0;
    }
    
    .anchor-link {
      padding-left: 16px;
      border-left: 2px solid transparent;
    }
  `}
`;

export const HorizontalAnchor = styled(StyledAnchor)`
  ${() => css`
    flex-direction: row;
    
    .anchor-ink {
      height: 2px;
      width: 100%;
      bottom: 0;
    }
    
    .anchor-link {
      padding: 8px 16px;
      border-bottom: 2px solid transparent;
    }
  `}
`;

export const SidebarAnchor = styled(VerticalAnchor)`
  ${() => {
    const colors = useThemeColors();
    
    return css`
      position: fixed;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      background: ${colors.background?.primary || "#ffffff"};
      border: 1px solid ${colors.border?.light || "#f0f0f0"};
      border-radius: 6px;
      padding: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-height: 70vh;
      overflow-y: auto;
      
      .anchor-link {
        padding: 8px 12px;
        white-space: nowrap;
        
        &:hover {
          background: ${colors.background?.secondary || "#f5f5f5"};
          border-radius: 4px;
        }
      }
    `;
  }}
`;

export const TopAnchor = styled(HorizontalAnchor)`
  ${() => {
    const colors = useThemeColors();
    
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: ${colors.background?.primary || "#ffffff"};
      border-bottom: 1px solid ${colors.border?.light || "#f0f0f0"};
      padding: 12px 24px;
      justify-content: center;
      
      .anchor-link {
        padding: 8px 16px;
        margin: 0 4px;
        border-radius: 4px;
        
        &:hover {
          background: ${colors.background?.secondary || "#f5f5f5"};
        }
      }
    `;
  }}
`;

// =============================================================================
// SPECIAL LAYOUTS
// =============================================================================

export const CompactAnchor = styled(StyledAnchor)`
  ${() => css`
    .anchor-link {
      padding: 4px 0;
      font-size: 0.9em;
    }
  `}
`;

export const SpacedAnchor = styled(StyledAnchor)`
  ${() => css`
    .anchor-link {
      padding: 12px 0;
      margin: 4px 0;
    }
  `}
`;

export const BorderedAnchor = styled(StyledAnchor)`
  ${() => {
    const colors = useThemeColors();
    
    return css`
      border: 1px solid ${colors.border?.light || "#f0f0f0"};
      border-radius: 6px;
      padding: 12px;
      background: ${colors.background?.secondary || "#fafafa"};
      
      .anchor-link {
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        
        &:hover {
          background: ${colors.background?.primary || "#ffffff"};
        }
        
        &.active {
          background: ${colors.primary?.[50] || "#e6f7ff"};
          color: ${colors.primary?.[600] || "#1890ff"};
        }
      }
    `;
  }}
`;

// =============================================================================
// ACCESSIBILITY VARIANTS
// =============================================================================

export const HighContrastAnchor = styled(StyledAnchor)`
  ${() => css`
    .anchor-link {
      color: #000000;
      border: 1px solid transparent;
      
      &:hover {
        color: #000000;
        border-color: #666666;
        background: #f0f0f0;
      }
      
      &.active {
        color: #000000;
        border-color: #000000;
        background: #ffffff;
        font-weight: 700;
      }
    }
    
    .anchor-ink {
      background: #666666;
      
      &::after {
        background: #000000;
      }
    }
  `}
`;

export const LargeTextAnchor = styled(StyledAnchor)`
  ${() => css`
    font-size: 18px;
    line-height: 1.6;
    
    .anchor-link {
      padding: 12px 0;
      
      &[data-level="1"] {
        padding-left: 24px;
      }
      
      &[data-level="2"] {
        padding-left: 36px;
      }
    }
  `}
`;

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

export const AnimatedAnchor = styled(StyledAnchor)`
  ${() => css`
    .anchor-link {
      position: relative;
      overflow: hidden;
      
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(24, 144, 255, 0.1),
          transparent
        );
        transition: left 0.6s;
      }
      
      &:hover::before {
        left: 100%;
      }
      
      &.active {
        animation: ${inkBallAnimation} 2s infinite;
      }
    }
  `}
`;

// =============================================================================
// LOADING AND EMPTY STATES
// =============================================================================

export const AnchorSkeleton = styled.div`
  ${() => css`
    .skeleton-link {
      height: 20px;
      background: #f0f0f0;
      border-radius: 4px;
      margin: 6px 0;
      animation: ${anchorSlideIn} 1.5s ease-in-out infinite alternate;
      
      &:nth-child(1) { width: 80%; }
      &:nth-child(2) { width: 60%; margin-left: 16px; }
      &:nth-child(3) { width: 70%; }
      &:nth-child(4) { width: 50%; margin-left: 16px; }
      &:nth-child(5) { width: 90%; }
    }
  `}
`;

export const AnchorEmpty = styled.div`
  ${() => {
    const colors = useThemeColors();
    
    return css`
      padding: 24px 16px;
      text-align: center;
      color: ${colors.text?.secondary || "#666666"};
      font-size: 14px;
      
      .empty-icon {
        font-size: 24px;
        margin-bottom: 8px;
        opacity: 0.5;
      }
      
      .empty-text {
        opacity: 0.8;
      }
    `;
  }}
`;
