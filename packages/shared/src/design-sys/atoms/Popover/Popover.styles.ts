import { useThemeColors } from '../../hooks/useThemeColors';
import styled, { css, keyframes } from "styled-components";
import {
  StyledPopoverProps,
  StyledPopoverContentProps,
  StyledPopoverTitleProps,
  StyledPopoverBodyProps,
  StyledPopoverArrowProps,
  PopoverPlacement,
} from "./Popover.types";

// =============================================================================
// ANIMATIONS
// =============================================================================

const fallbackColors = {
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff",
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },
  background: {
    primary: "#ffffff",
    secondary: "#f5f5f5",
    card: "#ffffff",
    surface: "#ffffff",
    tertiary: "#f0f0f0",
  },
  text: {
    primary: "#333333",
    secondary: "#666666",
    tertiary: "#999999",
    inverse: "#ffffff",
  },
  border: {
    light: "#f0f0f0",
    normal: "#d9d9d9",
    dark: "#bfbfbf",
  },
  success: {
    500: "#52c41a",
  },
  warning: {
    500: "#faad14",
  },
  error: {
    500: "#ff4d4f",
  },
  info: {
    500: "#1890ff",
  },
} as const;

const resolveThemeColors = () => {
  const colors = useThemeColors();
  if (
    colors &&
    colors.primary &&
    colors.background &&
    colors.text &&
    colors.border
  ) {
    return colors;
  }
  return fallbackColors;
};

const popoverFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const popoverFadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const popoverSlideInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const popoverSlideInBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const popoverSlideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const popoverSlideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getPopoverAnimation = (placement: PopoverPlacement) => {
  if (placement.startsWith("top")) {
    return popoverSlideInTop;
  } else if (placement.startsWith("bottom")) {
    return popoverSlideInBottom;
  } else if (placement.startsWith("left")) {
    return popoverSlideInLeft;
  } else if (placement.startsWith("right")) {
    return popoverSlideInRight;
  }
  return popoverFadeIn;
};

const getPopoverZIndex = (trigger: string) => {
  const zIndexMap = {
    hover: 1030,
    click: 1040,
    focus: 1035,
    contextMenu: 1050,
    manual: 1030,
  };
  return zIndexMap[trigger as keyof typeof zIndexMap] || 1030;
};

// =============================================================================
// POPOVER CONTAINER
// =============================================================================

export const StyledPopover = styled.div<StyledPopoverProps>`
  ${({ $trigger, $placement, $open, accessibility }) => {
    const colors = resolveThemeColors();

    return css`
      position: relative;
      display: inline-block;

      &.popover-trigger {
        cursor: ${$trigger === "click" ? "pointer" : "default"};

        &:focus {
          outline: 2px solid ${colors.primary?.[500] || "#1890ff"};
          outline-offset: 2px;
        }
      }

      // Accessibility enhancements
      ${accessibility?.reducedMotion &&
      css`
        * {
          animation: none !important;
          transition: none !important;
        }
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 4px;
      `}
    `;
  }}
`;

// =============================================================================
// POPOVER CONTENT
// =============================================================================

export const StyledPopoverContent = styled.div<StyledPopoverContentProps>`
  ${({ $placement, $hasTitle, $hasArrow, accessibility }) => {
    const colors = resolveThemeColors();

    return css`
      position: absolute;
      z-index: ${getPopoverZIndex("click")};
      max-width: 276px;
      min-width: 32px;
      background: ${colors.background?.primary || "#ffffff"};
      border: 1px solid ${colors.border?.normal || "#d9d9d9"};
      border-radius: 6px;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      padding: 0;
      font-size: 14px;
      line-height: 1.5715;
      color: ${colors.text?.primary || "#333333"};
      word-wrap: break-word;
      pointer-events: auto;
      transform-origin: center;

      // Animation
      animation: ${getPopoverAnimation($placement)} 0.2s
        cubic-bezier(0.645, 0.045, 0.355, 1);

      &.popover-hidden {
        animation: ${popoverFadeOut} 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
        pointer-events: none;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: 16px;
        max-width: 320px;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 4px;
        max-width: 300px;
      `}

      ${accessibility?.highContrast &&
      css`
        border-width: 2px;
        border-color: ${colors.text?.primary || "#333333"};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      `}

      ${accessibility?.reducedMotion &&
      css`
        animation: none;

        &.popover-hidden {
          animation: none;
          opacity: 0;
        }
      `}

      // Mobile responsive
      @media (max-width: 768px) {
        max-width: calc(100% - 32px); // Usar 100% en lugar de 100vw para evitar overflow
        min-width: auto;
      }
    `;
  }}
`;

// =============================================================================
// POPOVER TITLE
// =============================================================================

export const StyledPopoverTitle = styled.div<StyledPopoverTitleProps>`
  ${({ accessibility }) => {
    const colors = resolveThemeColors();

    return css`
      padding: 5px 16px 4px;
      margin: 0;
      font-size: 14px;
      line-height: 22px;
      font-weight: 600;
      color: ${colors.text?.primary || "#333333"};
      border-bottom: 1px solid ${colors.border?.light || "#f0f0f0"};
      word-wrap: break-word;

      &:empty {
        display: none;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: 16px;
        line-height: 24px;
        padding: 6px 18px 5px;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 8px 20px 6px;
      `}

      ${accessibility?.highContrast &&
      css`
        border-bottom-width: 2px;
      `}
    `;
  }}
`;

// =============================================================================
// POPOVER BODY
// =============================================================================

export const StyledPopoverBody = styled.div<StyledPopoverBodyProps>`
  ${({ accessibility }) => {
    const colors = resolveThemeColors();

    return css`
      padding: 12px 16px;
      font-size: 14px;
      line-height: 1.5715;
      color: ${colors.text?.primary || "#333333"};
      word-wrap: break-word;

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: 16px;
        line-height: 1.6;
        padding: 14px 18px;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 16px 20px;
      `}

      p {
        margin: 0;

        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }

      // Handle various content types
      ul,
      ol {
        margin: 0;
        padding-left: 20px;

        li {
          margin: 4px 0;
        }
      }

      img {
        max-width: 100%;
        height: auto;
      }

      code {
        padding: 2px 4px;
        background: ${colors.background?.secondary || "#f5f5f5"};
        border-radius: 3px;
        font-family: "Monaco", "Menlo", monospace;
        font-size: 12px;
      }

      pre {
        padding: 8px 12px;
        background: ${colors.background?.secondary || "#f5f5f5"};
        border-radius: 4px;
        overflow-x: auto;
        font-size: 12px;
        line-height: 1.4;
      }
    `;
  }}
`;

// =============================================================================
// POPOVER ARROW
// =============================================================================

export const StyledPopoverArrow = styled.div<StyledPopoverArrowProps>`
  ${({ $placement, accessibility }) => {
    const colors = resolveThemeColors();

    return css`
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${colors.background?.primary || "#ffffff"};
      border: 1px solid ${colors.border?.normal || "#d9d9d9"};
      transform: rotate(45deg);
      pointer-events: none;

      // Placement-specific positioning is handled by getPopoverArrowStyles
      ${$placement.startsWith("top") &&
      css`
        border-top: none;
        border-left: none;
      `}

      ${$placement.startsWith("bottom") &&
      css`
        border-bottom: none;
        border-right: none;
      `}

      ${$placement.startsWith("left") &&
      css`
        border-bottom: none;
        border-left: none;
      `}

      ${$placement.startsWith("right") &&
      css`
        border-top: none;
        border-right: none;
      `}

      // Accessibility
      ${accessibility?.highContrast &&
      css`
        border-width: 2px;
      `}
    `;
  }}
`;

// =============================================================================
// POPOVER OVERLAY
// =============================================================================

export const StyledPopoverOverlay = styled.div`
  ${() => {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1020;
      background: transparent;
      pointer-events: auto;
    `;
  }}
`;

// =============================================================================
// PREDEFINED VARIANTS
// =============================================================================

export const TooltipPopover = styled(StyledPopoverContent)`
  ${() => {
    const colors = resolveThemeColors();

    return css`
      max-width: 250px;
      background: ${colors.text?.primary || "#333333"};
      color: ${colors.background?.primary || "#ffffff"};
      border: none;
      font-size: 12px;
      padding: 6px 8px;
      border-radius: 4px;

      ${StyledPopoverArrow} {
        background: ${colors.text?.primary || "#333333"};
        border: none;
      }
    `;
  }}
`;

export const ConfirmPopover = styled(StyledPopoverContent)`
  ${() => {
    return css`
      max-width: 300px;

      .popover-confirm-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid #f0f0f0;

        button {
          padding: 4px 15px;
          font-size: 12px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            border-color: #40a9ff;
            color: #40a9ff;
          }

          &.confirm-btn {
            background: #1890ff;
            border-color: #1890ff;
            color: #ffffff;

            &:hover {
              background: #40a9ff;
              border-color: #40a9ff;
            }
          }
        }
      }
    `;
  }}
`;

export const MenuPopover = styled(StyledPopoverContent)`
  ${() => {
    const colors = resolveThemeColors();

    return css`
      padding: 4px 0;
      min-width: 120px;

      .popover-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 12px;
        font-size: 14px;
        line-height: 22px;
        color: ${colors.text?.primary || "#333333"};
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: ${colors.background?.secondary || "#f5f5f5"};
        }

        &:active {
          background: ${colors.primary?.[50] || "#e6f7ff"};
        }

        &.disabled {
          color: ${colors.text?.secondary || "#bfbfbf"};
          cursor: not-allowed;

          &:hover {
            background: transparent;
          }
        }

        .menu-item-icon {
          font-size: 14px;
          color: ${colors.text?.secondary || "#666666"};
        }

        .menu-item-label {
          flex: 1;
        }
      }

      .popover-menu-divider {
        height: 1px;
        margin: 4px 0;
        background: ${colors.border?.light || "#f0f0f0"};
      }
    `;
  }}
`;

// =============================================================================
// LOADING AND EMPTY STATES
// =============================================================================

export const PopoverSkeleton = styled.div`
  ${() => {
    return css`
      padding: 12px 16px;

      .skeleton-title {
        width: 60%;
        height: 14px;
        background: #f0f0f0;
        border-radius: 4px;
        margin-bottom: 8px;
        animation: ${popoverFadeIn} 1.5s ease-in-out infinite alternate;
      }

      .skeleton-content {
        width: 100%;
        height: 40px;
        background: #f0f0f0;
        border-radius: 4px;
        animation: ${popoverFadeIn} 1.5s ease-in-out infinite alternate;
      }
    `;
  }}
`;

export const PopoverEmpty = styled.div`
  ${() => {
    const colors = resolveThemeColors();

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

// =============================================================================
// COMPLEX LAYOUTS
// =============================================================================

export const PopoverCardLayout = styled(StyledPopoverContent)`
  ${() => {
    const colors = resolveThemeColors();

    return css`
      max-width: 350px;
      padding: 0;

      .popover-card-header {
        padding: 12px 16px;
        border-bottom: 1px solid ${colors.border?.light || "#f0f0f0"};
        background: ${colors.background?.secondary || "#fafafa"};

        .card-title {
          font-weight: 600;
          font-size: 16px;
          margin: 0;
        }

        .card-subtitle {
          font-size: 12px;
          color: ${colors.text?.secondary || "#666666"};
          margin: 4px 0 0 0;
        }
      }

      .popover-card-body {
        padding: 12px 16px;
      }

      .popover-card-footer {
        padding: 8px 16px;
        border-top: 1px solid ${colors.border?.light || "#f0f0f0"};
        background: ${colors.background?.secondary || "#fafafa"};
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `;
  }}
`;

export const PopoverListLayout = styled(StyledPopoverContent)`
  ${() => {
    const colors = resolveThemeColors();

    return css`
      padding: 8px 0;
      min-width: 160px;
      max-width: 240px;

      .popover-list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: ${colors.background?.secondary || "#f5f5f5"};
        }

        .list-item-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${colors.primary?.[100] || "#e6f7ff"};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: ${colors.primary?.[600] || "#1890ff"};
        }

        .list-item-content {
          flex: 1;
          min-width: 0;

          .item-title {
            font-size: 14px;
            font-weight: 500;
            margin: 0 0 2px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-description {
            font-size: 12px;
            color: ${colors.text?.secondary || "#666666"};
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .list-item-action {
          font-size: 12px;
          color: ${colors.text?.secondary || "#666666"};
        }
      }

      .popover-list-header {
        padding: 8px 16px;
        font-size: 12px;
        font-weight: 600;
        color: ${colors.text?.secondary || "#666666"};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid ${colors.border?.light || "#f0f0f0"};
        margin-bottom: 4px;
      }
    `;
  }}
`;
