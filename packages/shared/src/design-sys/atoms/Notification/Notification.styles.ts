import { useThemeColors } from '../../hooks/useThemeColors';
import styled, { css, keyframes } from "styled-components";
import {
  StyledNotificationProps,
  StyledNotificationWrapperProps,
  StyledNotificationIconProps,
  StyledNotificationContentProps,
  StyledNotificationHeaderProps,
  StyledNotificationBodyProps,
  StyledNotificationActionsProps,
  StyledCloseButtonProps,
  NotificationType,
  NotificationSize,
} from "./Notification.types";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getNotificationDimensions = (size: NotificationSize) => {
  const dimensions = {
    xs: {
      width: "320px",
      padding: "12px 16px",
      headerPadding: "0 0 4px 0",
      bodyPadding: "4px 0 0 0",
      actionsPadding: "8px 0 0 0",
      fontSize: "12px",
      headerFontSize: "13px",
      lineHeight: "18px",
      headerLineHeight: "20px",
      iconSize: "16px",
      borderRadius: "6px",
      gap: "8px",
    },
    sm: {
      width: "360px",
      padding: "14px 20px",
      headerPadding: "0 0 6px 0",
      bodyPadding: "6px 0 0 0",
      actionsPadding: "10px 0 0 0",
      fontSize: "14px",
      headerFontSize: "15px",
      lineHeight: "20px",
      headerLineHeight: "22px",
      iconSize: "18px",
      borderRadius: "8px",
      gap: "10px",
    },
    md: {
      width: "400px",
      padding: "16px 24px",
      headerPadding: "0 0 8px 0",
      bodyPadding: "8px 0 0 0",
      actionsPadding: "12px 0 0 0",
      fontSize: "16px",
      headerFontSize: "17px",
      lineHeight: "22px",
      headerLineHeight: "24px",
      iconSize: "20px",
      borderRadius: "10px",
      gap: "12px",
    },
    lg: {
      width: "440px",
      padding: "18px 28px",
      headerPadding: "0 0 10px 0",
      bodyPadding: "10px 0 0 0",
      actionsPadding: "14px 0 0 0",
      fontSize: "18px",
      headerFontSize: "19px",
      lineHeight: "24px",
      headerLineHeight: "26px",
      iconSize: "22px",
      borderRadius: "12px",
      gap: "14px",
    },
    xl: {
      width: "480px",
      padding: "20px 32px",
      headerPadding: "0 0 12px 0",
      bodyPadding: "12px 0 0 0",
      actionsPadding: "16px 0 0 0",
      fontSize: "20px",
      headerFontSize: "21px",
      lineHeight: "26px",
      headerLineHeight: "28px",
      iconSize: "24px",
      borderRadius: "14px",
      gap: "16px",
    },
    xxl: {
      width: "520px",
      padding: "22px 36px",
      headerPadding: "0 0 14px 0",
      bodyPadding: "14px 0 0 0",
      actionsPadding: "18px 0 0 0",
      fontSize: "22px",
      headerFontSize: "23px",
      lineHeight: "28px",
      headerLineHeight: "30px",
      iconSize: "26px",
      borderRadius: "16px",
      gap: "18px",
    },
  } as const;

  return dimensions[size as keyof typeof dimensions] || dimensions.md;
};

const getNotificationColors = (
  type: NotificationType,
  colors: ReturnType<typeof useThemeColors>
) => {
  const colorMap = {
    success: {
      background: colors.background?.primary || "#ffffff",
      border: colors.success?.[200] || "#b7eb8f",
      text: colors.text?.primary || "#333333",
      textSecondary: colors.text?.secondary || "#666666",
      icon: colors.success?.[500] || "#52c41a",
      accent: colors.success?.[50] || "#f6ffed",
    },
    error: {
      background: colors.background?.primary || "#ffffff",
      border: colors.error?.[200] || "#ffccc7",
      text: colors.text?.primary || "#333333",
      textSecondary: colors.text?.secondary || "#666666",
      icon: colors.error?.[500] || "#ff4d4f",
      accent: colors.error?.[50] || "#fff2f0",
    },
    warning: {
      background: colors.background?.primary || "#ffffff",
      border: colors.warning?.[200] || "#ffe58f",
      text: colors.text?.primary || "#333333",
      textSecondary: colors.text?.secondary || "#666666",
      icon: colors.warning?.[500] || "#faad14",
      accent: colors.warning?.[50] || "#fffbe6",
    },
    info: {
      background: colors.background?.primary || "#ffffff",
      border: colors.primary?.[200] || "#91d5ff",
      text: colors.text?.primary || "#333333",
      textSecondary: colors.text?.secondary || "#666666",
      icon: colors.primary?.[500] || "#1890ff",
      accent: colors.primary?.[50] || "#e6f7ff",
    },
    open: {
      background: colors.background?.primary || "#ffffff",
      border: colors.border?.normal || "#d9d9d9",
      text: colors.text?.primary || "#333333",
      textSecondary: colors.text?.secondary || "#666666",
      icon: colors.text?.secondary || "#666666",
      accent: colors.background?.secondary || "#fafafa",
    },
  };

  return colorMap[type] || colorMap.info;
};

// =============================================================================
// ANIMATIONS
// =============================================================================

const notificationSlideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const notificationSlideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const notificationSlideOutLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const notificationSlideOutRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const notificationSlideInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const notificationSlideInBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const notificationSlideOutTop = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const notificationSlideOutBottom = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const notificationFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const notificationFadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const notificationProgressBar = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const notificationShake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
`;

// =============================================================================
// NOTIFICATION CONTAINER STYLES
// =============================================================================

export const NotificationContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1010;
  font-family: inherit;
`;

export const StyledNotificationWrapper = styled.div<StyledNotificationWrapperProps>`
  ${({ $placement, $top, $bottom, accessibility }) => {
    return css`
      position: fixed;
      pointer-events: none;
      z-index: 1010;

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
      
      ${$placement === "top" &&
      css`
        top: ${$top || 24}px;
        left: 50%;
        transform: translateX(-50%);
      `}
      
      ${$placement === "bottom" &&
      css`
        bottom: ${$bottom || 24}px;
        left: 50%;
        transform: translateX(-50%);
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
// NOTIFICATION ITEM STYLES
// =============================================================================

export const StyledNotification = styled.div<StyledNotificationProps>`
  ${({
    $type,
    $size,
    $variant,
    $showIcon,
    $closable,
    $placement,
    $hasDescription,
    $hasActions,
    accessibility,
  }) => {
    const colors = useThemeColors();
    const dimensions = getNotificationDimensions($size);
    const notificationColors = getNotificationColors($type, colors);

    return css`
      display: flex;
      align-items: flex-start;
      width: ${dimensions.width};
      min-width: 300px;
      max-width: 520px;
      padding: ${dimensions.padding};
      margin-bottom: 16px;
      background: ${notificationColors.background};
      border: 1px solid ${notificationColors.border};
      border-left: 4px solid ${notificationColors.icon};
      border-radius: ${dimensions.borderRadius};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.12);
      font-size: ${dimensions.fontSize};
      line-height: ${dimensions.lineHeight};
      color: ${notificationColors.text};
      gap: ${dimensions.gap};
      position: relative;
      pointer-events: auto;
      cursor: default;
      transition: all 0.3s ease-in-out;
      word-wrap: break-word;
      overflow-wrap: break-word;

      // Animation based on placement
      ${$placement.includes("Left")
        ? css`
            animation: ${notificationSlideInLeft} 0.4s ease-out;
          `
        : $placement.includes("Right")
        ? css`
            animation: ${notificationSlideInRight} 0.4s ease-out;
          `
        : $placement === "top"
        ? css`
            animation: ${notificationSlideInTop} 0.4s ease-out;
          `
        : $placement === "bottom"
        ? css`
            animation: ${notificationSlideInBottom} 0.4s ease-out;
          `
        : css`
            animation: ${notificationFadeIn} 0.4s ease-out;
          `}

      &.notification-exit {
        ${$placement.includes("Left")
          ? css`
              animation: ${notificationSlideOutLeft} 0.3s ease-in forwards;
            `
          : $placement.includes("Right")
          ? css`
              animation: ${notificationSlideOutRight} 0.3s ease-in forwards;
            `
          : $placement === "top"
          ? css`
              animation: ${notificationSlideOutTop} 0.3s ease-in forwards;
            `
          : $placement === "bottom"
          ? css`
              animation: ${notificationSlideOutBottom} 0.3s ease-in forwards;
            `
          : css`
              animation: ${notificationFadeOut} 0.3s ease-in forwards;
            `}
      }

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12),
          0 3px 8px rgba(0, 0, 0, 0.16);
        transform: translateY(-2px);
      }

      &.notification-shake {
        animation: ${notificationShake} 0.6s ease-in-out;
      }

      // Progress bar for timed notifications
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: ${notificationColors.icon};
        border-radius: 0 0 4px 4px;
        opacity: 0.7;
        transform-origin: left;
        transition: width linear;
      }

      &.has-duration::after {
        animation: ${notificationProgressBar} var(--duration) linear;
      }

      // Closable padding adjustment
      ${$closable &&
      css`
        padding-right: calc(${dimensions.padding.split(" ")[1]} + 32px);
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
        border-left-width: 6px;
        color: ${$type === "error" ? "#000000" : notificationColors.text};
        background: ${$type === "error"
          ? "#ffebee"
          : notificationColors.background};
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

        &.notification-exit {
          animation: none;
          opacity: 0;
        }

        &.notification-shake {
          animation: none;
        }
      `}

      // Mobile responsive
      @media (max-width: 768px) {
        width: 100%;
        min-width: auto;
        max-width: none;
        font-size: calc(${dimensions.fontSize} * 0.9);
        padding: calc(${dimensions.padding.split(" ")[0]} * 0.8)
          calc(${dimensions.padding.split(" ")[1]} * 0.8);
        margin-bottom: 12px;
      }
    `;
  }}
`;

export const StyledNotificationIcon = styled.span<StyledNotificationIconProps>`
  ${({ $type, $size, accessibility }) => {
    const colors = useThemeColors();
    const dimensions = getNotificationDimensions($size);
    const notificationColors = getNotificationColors($type, colors);

    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${dimensions.iconSize};
      height: ${dimensions.iconSize};
      font-size: ${dimensions.iconSize};
      color: ${notificationColors.icon};
      flex-shrink: 0;
      margin-top: 2px;

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
    `;
  }}
`;

export const StyledNotificationContent = styled.div<StyledNotificationContentProps>`
  ${({ $size, $hasIcon, $hasDescription, accessibility }) => {
    const dimensions = getNotificationDimensions($size);

    return css`
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      word-break: break-word;

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}
    `;
  }}
`;

export const StyledNotificationHeader = styled.div<StyledNotificationHeaderProps>`
  ${({ $size, accessibility }) => {
    const dimensions = getNotificationDimensions($size);

    return css`
      padding: ${dimensions.headerPadding};
      font-size: ${dimensions.headerFontSize};
      line-height: ${dimensions.headerLineHeight};
      font-weight: 600;
      color: inherit;
      word-break: break-word;

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.headerFontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: calc(${dimensions.headerPadding.split(" ")[0]} * 1.5)
          calc(${dimensions.headerPadding.split(" ")[1] || "0px"} * 1.5);
      `}
    `;
  }}
`;

export const StyledNotificationBody = styled.div<StyledNotificationBodyProps>`
  ${({ $size, accessibility }) => {
    const colors = useThemeColors();
    const dimensions = getNotificationDimensions($size);

    return css`
      padding: ${dimensions.bodyPadding};
      font-size: ${dimensions.fontSize};
      line-height: ${dimensions.lineHeight};
      color: ${colors.text?.secondary || "#666666"};
      opacity: 0.9;
      word-break: break-word;

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: calc(${dimensions.bodyPadding.split(" ")[0]} * 1.5)
          calc(${dimensions.bodyPadding.split(" ")[1] || "0px"} * 1.5);
      `}

      p {
        margin: 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
    `;
  }}
`;

export const StyledNotificationActions = styled.div<StyledNotificationActionsProps>`
  ${({ $size, accessibility }) => {
    const dimensions = getNotificationDimensions($size);

    return css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      padding: ${dimensions.actionsPadding};

      // Accessibility
      ${accessibility?.increasedSpacing &&
      css`
        gap: 12px;
        padding: calc(${dimensions.actionsPadding.split(" ")[0]} * 1.5)
          calc(${dimensions.actionsPadding.split(" ")[1] || "0px"} * 1.5);
      `}
    `;
  }}
`;

export const StyledCloseButton = styled.button<StyledCloseButtonProps>`
  ${({ $size, accessibility }) => {
    const colors = useThemeColors();

    return css`
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      color: ${colors.text?.secondary || "#666666"};
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
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
        transform: scale(0.95);
      }

      svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        width: 28px;
        height: 28px;
        font-size: 16px;

        svg {
          width: 16px;
          height: 16px;
        }
      `}

      ${accessibility?.increasedSpacing &&
      css`
        top: 16px;
        right: 16px;
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
          transform: none;
        }
      `}
    `;
  }}
`;

// =============================================================================
// NOTIFICATION LOADING AND EMPTY STATES
// =============================================================================

export const NotificationSkeleton = styled.div<{ $size: NotificationSize }>`
  ${({ $size }) => {
    const dimensions = getNotificationDimensions($size);

    return css`
      display: flex;
      align-items: flex-start;
      width: ${dimensions.width};
      padding: ${dimensions.padding};
      gap: ${dimensions.gap};
      background: #f5f5f5;
      border-radius: ${dimensions.borderRadius};
      margin-bottom: 16px;
      animation: ${notificationFadeIn} 1.5s ease-in-out infinite alternate;

      .skeleton-icon {
        width: ${dimensions.iconSize};
        height: ${dimensions.iconSize};
        background: #e0e0e0;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .skeleton-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;

        .skeleton-title {
          width: 60%;
          height: ${dimensions.headerLineHeight};
          background: #e0e0e0;
          border-radius: 4px;
        }

        .skeleton-description {
          width: 90%;
          height: ${dimensions.lineHeight};
          background: #e0e0e0;
          border-radius: 4px;
        }
      }
    `;
  }}
`;

export const NotificationEmpty = styled.div<{ $size: NotificationSize }>`
  ${({ $size }) => {
    const dimensions = getNotificationDimensions($size);

    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: ${dimensions.width};
      padding: calc(${dimensions.padding} * 2);
      color: #cccccc;
      font-size: ${dimensions.fontSize};
      text-align: center;
      min-height: 160px;

      .empty-icon {
        font-size: calc(${dimensions.fontSize} * 2.5);
        margin-bottom: 12px;
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

export const SuccessNotification = styled(StyledNotification).attrs({
  $type: "success",
})``;

export const ErrorNotification = styled(StyledNotification).attrs({
  $type: "error",
})``;

export const WarningNotification = styled(StyledNotification).attrs({
  $type: "warning",
})``;

export const InfoNotification = styled(StyledNotification).attrs({
  $type: "info",
})``;

export const OpenNotification = styled(StyledNotification).attrs({
  $type: "open",
})``;

export const CompactNotification = styled(StyledNotification).attrs({
  $size: "sm",
})``;

export const LargeNotification = styled(StyledNotification).attrs({
  $size: "lg",
})``;

export const PersistentNotification = styled(StyledNotification)`
  &::after {
    display: none;
  }
`;

export const ClosableNotification = styled(StyledNotification).attrs({
  $closable: true,
})``;

export const IconlessNotification = styled(StyledNotification).attrs({
  $showIcon: false,
})``;

// =============================================================================
// TOAST NOTIFICATION STYLES
// =============================================================================

export const StyledToastNotification = styled(StyledNotification)`
  min-width: 280px;
  max-width: 400px;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
`;

// =============================================================================
// DESKTOP NOTIFICATION STYLES
// =============================================================================

export const DesktopNotificationPreview = styled.div<{
  $type: NotificationType;
}>`
  ${({ $type }) => {
    const colors = useThemeColors();
    const notificationColors = getNotificationColors($type, colors);

    return css`
      display: flex;
      align-items: flex-start;
      padding: 16px;
      background: ${notificationColors.background};
      border: 1px solid ${notificationColors.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      max-width: 400px;
      gap: 12px;

      .preview-icon {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: ${notificationColors.accent};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${notificationColors.icon};
        font-size: 24px;
        flex-shrink: 0;
      }

      .preview-content {
        flex: 1;
        min-width: 0;

        .preview-title {
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: ${notificationColors.text};
          margin-bottom: 4px;
        }

        .preview-body {
          font-size: 14px;
          line-height: 18px;
          color: ${notificationColors.textSecondary};
          opacity: 0.9;
        }
      }
    `;
  }}
`;
