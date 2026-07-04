import { useThemeColors } from '../../hooks/useThemeColors';
import styled, { css, keyframes } from "styled-components";
import {
  StyledMessageProps,
  StyledMessageWrapperProps,
  StyledMessageIconProps,
  StyledMessageContentProps,
  StyledCloseButtonProps,
  MessageType,
  MessageSize,
} from "./Message.types";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getMessageDimensions = (size: MessageSize) => {
  const dimensions = {
    xs: {
      height: "32px",
      padding: "6px 12px",
      fontSize: "12px",
      lineHeight: "20px",
      iconSize: "14px",
      borderRadius: "4px",
      gap: "6px",
    },
    sm: {
      height: "36px",
      padding: "8px 16px",
      fontSize: "14px",
      lineHeight: "22px",
      iconSize: "16px",
      borderRadius: "6px",
      gap: "8px",
    },
    md: {
      height: "40px",
      padding: "10px 20px",
      fontSize: "16px",
      lineHeight: "24px",
      iconSize: "18px",
      borderRadius: "8px",
      gap: "10px",
    },
    lg: {
      height: "44px",
      padding: "12px 24px",
      fontSize: "18px",
      lineHeight: "26px",
      iconSize: "20px",
      borderRadius: "10px",
      gap: "12px",
    },
    xl: {
      height: "48px",
      padding: "14px 28px",
      fontSize: "20px",
      lineHeight: "28px",
      iconSize: "22px",
      borderRadius: "12px",
      gap: "14px",
    },
    xxl: {
      height: "52px",
      padding: "16px 32px",
      fontSize: "22px",
      lineHeight: "30px",
      iconSize: "24px",
      borderRadius: "14px",
      gap: "16px",
    },
  } as const;

  return dimensions[size as keyof typeof dimensions] || dimensions.md;
};

const getMessageColors = (
  type: MessageType,
  colors: ReturnType<typeof useThemeColors>
) => {
  const colorMap = {
    success: {
      background: colors.success?.[50] || "#f6ffed",
      border: colors.success?.[200] || "#b7eb8f",
      text: colors.success?.[800] || "#389e0d",
      icon: colors.success?.[500] || "#52c41a",
    },
    error: {
      background: colors.error?.[50] || "#fff2f0",
      border: colors.error?.[200] || "#ffccc7",
      text: colors.error?.[800] || "#cf1322",
      icon: colors.error?.[500] || "#ff4d4f",
    },
    warning: {
      background: colors.warning?.[50] || "#fffbe6",
      border: colors.warning?.[200] || "#ffe58f",
      text: colors.warning?.[800] || "#d46b08",
      icon: colors.warning?.[500] || "#faad14",
    },
    info: {
      background: colors.primary?.[50] || "#e6f7ff",
      border: colors.primary?.[200] || "#91d5ff",
      text: colors.primary?.[800] || "#0958d9",
      icon: colors.primary?.[500] || "#1890ff",
    },
    loading: {
      background: colors.primary?.[50] || "#e6f7ff",
      border: colors.primary?.[200] || "#91d5ff",
      text: colors.text?.primary || "#333333",
      icon: colors.primary?.[500] || "#1890ff",
    },
  };

  return colorMap[type] || colorMap.info;
};

const messageFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const messageFadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const messageIconSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const messageProgressBar = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

// =============================================================================
// MESSAGE CONTAINER STYLES
// =============================================================================

export const MessageContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1010;
  font-family: inherit;
`;

export const StyledMessageWrapper = styled.div<StyledMessageWrapperProps>`
  ${({ $placement, $top, $bottom, accessibility }) => {
    return css`
      position: fixed;
      pointer-events: none;
      z-index: 1010;
      max-width: 90vw;
      
      ${$placement === "top" &&
      css`
        top: ${$top || 24}px;
        left: 50%;
        transform: translateX(-50%);
      `}
      
      ${$placement === "topLeft" &&
      css`
        top: ${$top || 24}px;
        left: 24px;
      `}
      
      ${$placement === "topRight" &&
      css`
        top: ${$top || 24}px;
        right: 24px;
      `}
      
      ${$placement === "bottom" &&
      css`
        bottom: ${$bottom || 24}px;
        left: 50%;
        transform: translateX(-50%);
      `}
      
      ${$placement === "bottomLeft" &&
      css`
        bottom: ${$bottom || 24}px;
        left: 24px;
      `}
      
      ${$placement === "bottomRight" &&
      css`
        bottom: ${$bottom || 24}px;
        right: 24px;
      `}

      // Accessibility
      ${accessibility?.increasedSpacing &&
      css`
        gap: 16px;
      `}

      @media (max-width: 768px) {
        left: 16px !important;
        right: 16px !important;
        transform: none !important;
        max-width: calc(100% - 32px); // Usar 100% en lugar de 100vw para evitar overflow
      }
    `;
  }}
`;

// =============================================================================
// MESSAGE ITEM STYLES
// =============================================================================

export const StyledMessage = styled.div<StyledMessageProps>`
  ${({
    $type,
    $size,
    $variant,
    $showIcon,
    $closable,
    $placement,
    accessibility,
  }) => {
    const colors = useThemeColors();
    const dimensions = getMessageDimensions($size);
    const messageColors = getMessageColors($type, colors);

    return css`
      display: flex;
      align-items: flex-start;
      min-height: ${dimensions.height};
      padding: ${dimensions.padding};
      margin-bottom: 8px;
      background: ${messageColors.background};
      border: 1px solid ${messageColors.border};
      border-radius: ${dimensions.borderRadius};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08);
      font-size: ${dimensions.fontSize};
      line-height: ${dimensions.lineHeight};
      color: ${messageColors.text};
      gap: ${dimensions.gap};
      position: relative;
      pointer-events: auto;
      cursor: default;
      transition: all 0.3s ease-in-out;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 500px;

      // Animation based on placement
      ${$placement.includes("top")
        ? css`
            animation: ${messageFadeIn} 0.3s ease-out;
          `
        : css`
            animation: ${messageFadeIn} 0.3s ease-out;
          `}

      &.message-exit {
        ${$placement.includes("top")
          ? css`
              animation: ${messageFadeOut} 0.3s ease-in forwards;
            `
          : css`
              animation: ${messageFadeOut} 0.3s ease-in forwards;
            `}
      }

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.12);
        transform: translateY(-1px);
      }

      // Progress bar for timed messages
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: ${messageColors.icon};
        border-radius: 0 0 4px 4px;
        opacity: 0.6;
        transform-origin: left;
        transition: width linear;
      }

      &.has-duration::after {
        animation: ${messageProgressBar} var(--duration) linear;
      }

      // Closable padding adjustment
      ${$closable &&
      css`
        padding-right: calc(${dimensions.padding.split(" ")[1]} + 24px);
      `}

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: calc(${dimensions.padding.split(" ")[0]} * 1.5)
          calc(${dimensions.padding.split(" ")[1]} * 1.5);
        gap: calc(${dimensions.gap} * 1.5);
      `}

      ${accessibility?.highContrast &&
      css`
        border-width: 2px;
        color: ${$type === "error" ? "#000000" : messageColors.text};
        background: ${$type === "error" ? "#ffebee" : messageColors.background};
      `}

      ${accessibility?.reducedMotion &&
      css`
        transition: none;
        animation: none;

        &:hover {
          transform: none;
        }

        &::after {
          animation: none;
        }
      `}

      // Mobile responsive
      @media (max-width: 768px) {
        font-size: calc(${dimensions.fontSize} * 0.9);
        padding: calc(${dimensions.padding.split(" ")[0]} * 0.8)
          calc(${dimensions.padding.split(" ")[1]} * 0.8);
        max-width: none;
        margin-bottom: 6px;
      }
    `;
  }}
`;

export const StyledMessageIcon = styled.span<StyledMessageIconProps>`
  ${({ $type, $size, accessibility }) => {
    const colors = useThemeColors();
    const dimensions = getMessageDimensions($size);
    const messageColors = getMessageColors($type, colors);

    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${dimensions.iconSize};
      height: ${dimensions.iconSize};
      font-size: ${dimensions.iconSize};
      color: ${messageColors.icon};
      flex-shrink: 0;
      margin-top: 2px;

      ${$type === "loading" &&
      css`
        animation: ${messageIconSpin} 1s linear infinite;
      `}

      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        width: calc(${dimensions.iconSize} * 1.2);
        height: calc(${dimensions.iconSize} * 1.2);
        font-size: calc(${dimensions.iconSize} * 1.2);
      `}

      ${accessibility?.reducedMotion &&
      css`
        animation: none;
      `}
    `;
  }}
`;

export const StyledMessageContent = styled.div<StyledMessageContentProps>`
  ${({ $size, $hasIcon, accessibility }) => {
    const dimensions = getMessageDimensions($size);

    return css`
      flex: 1;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      word-break: break-word;
      min-height: ${dimensions.lineHeight};
      display: flex;
      align-items: center;

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      // Ensure proper text wrapping
      p {
        margin: 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
    `;
  }}
`;

export const StyledCloseButton = styled.button<StyledCloseButtonProps>`
  ${({ $size, accessibility }) => {
    const colors = useThemeColors();

    return css`
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: transparent;
      color: ${colors.text?.secondary || "#666666"};
      cursor: pointer;
      border-radius: 4px;
      font-size: 12px;
      line-height: 1;
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;

      &:hover {
        color: ${colors.text?.primary || "#333333"};
        background: rgba(0, 0, 0, 0.05);
      }

      &:focus {
        outline: 2px solid ${colors.primary?.[500] || "#1890ff"};
        outline-offset: 1px;
      }

      &:active {
        transform: translateY(-50%) scale(0.95);
      }

      svg {
        width: 12px;
        height: 12px;
        fill: currentColor;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        width: 24px;
        height: 24px;
        font-size: 14px;

        svg {
          width: 14px;
          height: 14px;
        }
      `}

      ${accessibility?.increasedSpacing &&
      css`
        right: 12px;
      `}

      ${accessibility?.highContrast &&
      css`
        border: 1px solid ${colors.text?.secondary || "#666666"};
        
        &:hover {
          border-color: ${colors.text?.primary || "#333333"};
        }
      `}

      ${accessibility?.reducedMotion &&
      css`
        transition: none;

        &:active {
          transform: translateY(-50%);
        }
      `}
    `;
  }}
`;

// =============================================================================
// NOTIFICATION STYLES (Extended Message)
// =============================================================================

export const StyledNotification = styled(StyledMessage)`
  max-width: 384px;
  min-width: 320px;
  padding: 16px 24px;
  
  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4;
`;

export const NotificationBody = styled.div`
  font-size: 0.875em;
  line-height: 1.5;
  color: inherit;
  opacity: 0.85;
  
  p {
    margin: 0;
  }
`;

export const NotificationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;

// =============================================================================
// TOAST STYLES (Simplified Message)
// =============================================================================

export const StyledToast = styled(StyledMessage)`
  max-width: 300px;
  min-height: 48px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    max-width: calc(100% - 32px); // Usar 100% en lugar de 100vw para evitar overflow
  }
`;

// =============================================================================
// LOADING AND EMPTY STATES
// =============================================================================

export const MessageSkeleton = styled.div<{ $size: MessageSize }>`
  ${({ $size }) => {
    const dimensions = getMessageDimensions($size);

    return css`
      display: flex;
      align-items: center;
      min-height: ${dimensions.height};
      padding: ${dimensions.padding};
      gap: ${dimensions.gap};
      background: #f5f5f5;
      border-radius: ${dimensions.borderRadius};
      margin-bottom: 8px;
      animation: ${messageFadeIn} 1.5s ease-in-out infinite alternate;

      .skeleton-icon {
        width: ${dimensions.iconSize};
        height: ${dimensions.iconSize};
        background: #e0e0e0;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .skeleton-content {
        flex: 1;
        height: ${dimensions.lineHeight};
        background: #e0e0e0;
        border-radius: 4px;
      }
    `;
  }}
`;

export const MessageEmpty = styled.div<{ $size: MessageSize }>`
  ${({ $size }) => {
    const dimensions = getMessageDimensions($size);

    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: calc(${dimensions.padding} * 2);
      color: #cccccc;
      font-size: ${dimensions.fontSize};
      text-align: center;
      min-height: 120px;

      .empty-icon {
        font-size: calc(${dimensions.fontSize} * 2);
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
// PREDEFINED VARIANTS
// =============================================================================

export const SuccessMessage = styled(StyledMessage).attrs({
  $type: "success",
})``;

export const ErrorMessage = styled(StyledMessage).attrs({
  $type: "error",
})``;

export const WarningMessage = styled(StyledMessage).attrs({
  $type: "warning",
})``;

export const InfoMessage = styled(StyledMessage).attrs({
  $type: "info",
})``;

export const LoadingMessage = styled(StyledMessage).attrs({
  $type: "loading",
})``;

export const CompactMessage = styled(StyledMessage).attrs({
  $size: "sm",
})``;

export const LargeMessage = styled(StyledMessage).attrs({
  $size: "lg",
})``;

export const PersistentMessage = styled(StyledMessage)`
  &::after {
    display: none;
  }
`;

export const ClosableMessage = styled(StyledMessage).attrs({
  $closable: true,
})``;

export const IconlessMessage = styled(StyledMessage).attrs({
  $showIcon: false,
})``;
