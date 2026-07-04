import React from "react";
import { AllSize, AllVariant } from "../shared";

// AccessibilityProps type definition
export interface AccessibilityProps {
  largeText?: boolean;
  reducedMotion?: boolean;
  textToSpeech?: boolean;
  increasedSpacing?: boolean;
  spacingMultiplier?: number;
  ariaLabel?: string;
  highContrast?: boolean;
}

// =============================================================================
// CORE TYPES
// =============================================================================

export type MessageType = "success" | "info" | "warning" | "error" | "loading";
export type MessagePlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";
export type MessageDuration = number | null; // null = persistent

export type MessageSize = AllSize;
export type MessageVariant = AllVariant;

// =============================================================================
// MESSAGE CONFIG TYPES
// =============================================================================

export interface MessageConfig {
  top?: number;
  bottom?: number;
  duration?: MessageDuration;
  getContainer?: () => HTMLElement;
  maxCount?: number;
  placement?: MessagePlacement;
  rtl?: boolean;
  prefixCls?: string;
}

export interface MessageArgsProps {
  content: React.ReactNode;
  duration?: MessageDuration;
  type?: MessageType;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface MessageInstance {
  success: (
    content: React.ReactNode | MessageArgsProps,
    duration?: MessageDuration,
    onClose?: () => void
  ) => void;
  error: (
    content: React.ReactNode | MessageArgsProps,
    duration?: MessageDuration,
    onClose?: () => void
  ) => void;
  info: (
    content: React.ReactNode | MessageArgsProps,
    duration?: MessageDuration,
    onClose?: () => void
  ) => void;
  warning: (
    content: React.ReactNode | MessageArgsProps,
    duration?: MessageDuration,
    onClose?: () => void
  ) => void;
  loading: (
    content: React.ReactNode | MessageArgsProps,
    duration?: MessageDuration,
    onClose?: () => void
  ) => void;
  open: (args: MessageArgsProps) => void;
  destroy: (key?: string | number) => void;
  config: (options: MessageConfig) => void;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface MessageProps {
  // Content
  children?: React.ReactNode;
  content?: React.ReactNode;

  // Appearance
  type?: MessageType;
  size?: MessageSize;
  variant?: MessageVariant;
  icon?: React.ReactNode;

  // Behavior
  duration?: MessageDuration;
  showIcon?: boolean;
  closable?: boolean;

  // Position and Layout
  placement?: MessagePlacement;
  top?: number;
  bottom?: number;

  // Events
  onClose?: () => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  afterClose?: () => void;

  // Styling
  className?: string;
  style?: React.CSSProperties;

  // Accessibility
  accessibility?: AccessibilityProps;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
}

export interface MessageProviderProps {
  children: React.ReactNode;
  config?: MessageConfig;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledMessageProps {
  $type: MessageType;
  $size: MessageSize;
  $variant: MessageVariant;
  $showIcon: boolean;
  $closable: boolean;
  $placement: MessagePlacement;
  accessibility?: AccessibilityProps;
}

export interface StyledMessageWrapperProps {
  $placement: MessagePlacement;
  $top?: number;
  $bottom?: number;
  accessibility?: AccessibilityProps;
}

export interface StyledMessageIconProps {
  $type: MessageType;
  $size: MessageSize;
  accessibility?: AccessibilityProps;
}

export interface StyledMessageContentProps {
  $size: MessageSize;
  $hasIcon: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledCloseButtonProps {
  $size: MessageSize;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// MESSAGE ITEM TYPES
// =============================================================================

export interface MessageItem {
  key: string | number;
  content: React.ReactNode;
  type: MessageType;
  duration: MessageDuration;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClose?: () => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  placement: MessagePlacement;
  size: MessageSize;
  variant: MessageVariant;
  showIcon: boolean;
  closable: boolean;
  accessibility?: AccessibilityProps;
  createdAt: number;
}

export interface MessageContextValue {
  add: (message: Omit<MessageItem, "key" | "createdAt">) => string | number;
  remove: (key: string | number) => void;
  removeAll: () => void;
  config: MessageConfig;
  messages: MessageItem[];
}

// =============================================================================
// NOTIFICATION TYPES (Extended from Message)
// =============================================================================

export interface NotificationProps extends Omit<MessageProps, "placement"> {
  // Extended properties for notifications
  title?: React.ReactNode;
  description?: React.ReactNode;
  placement?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "bottom";

  // Notification specific
  closeIcon?: React.ReactNode;
  key?: string | number;
  btn?: React.ReactNode;
  onClose?: (event?: React.MouseEvent<HTMLElement>) => void;
}

export interface NotificationInstance {
  success: (config: NotificationProps) => void;
  error: (config: NotificationProps) => void;
  info: (config: NotificationProps) => void;
  warning: (config: NotificationProps) => void;
  open: (config: NotificationProps) => void;
  close: (key: string | number) => void;
  destroy: () => void;
  config: (options: MessageConfig) => void;
}

// =============================================================================
// TOAST TYPES (Simplified Message)
// =============================================================================

export interface ToastProps {
  message: React.ReactNode;
  type?: MessageType;
  duration?: MessageDuration;
  position?: "top" | "bottom";
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  accessibility?: AccessibilityProps;
}

export interface ToastContextValue {
  showToast: (props: ToastProps) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const MESSAGE_DEFAULTS = {
  type: "info" as MessageType,
  size: "md" as MessageSize,
  variant: "default" as MessageVariant,
  placement: "top" as MessagePlacement,
  duration: 3000,
  showIcon: true,
  closable: false,
  top: 24,
  bottom: 24,
  maxCount: 10,
} as const;

export const MESSAGE_TYPES = [
  "success",
  "info",
  "warning",
  "error",
  "loading",
] as const;
export const MESSAGE_PLACEMENTS = [
  "top",
  "topLeft",
  "topRight",
  "bottom",
  "bottomLeft",
  "bottomRight",
] as const;

export const MESSAGE_DURATIONS = {
  short: 1500,
  medium: 3000,
  long: 5000,
  persistent: null,
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getMessageIcon = (type: MessageType): React.ReactNode => {
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
    loading: "⟳",
  };

  return icons[type] || icons.info;
};

export const getMessageAutoCloseDelay = (
  content: React.ReactNode,
  defaultDuration: MessageDuration = MESSAGE_DEFAULTS.duration
): MessageDuration => {
  if (typeof content === "string") {
    // Longer messages need more time to read
    const wordCount = content.split(" ").length;
    const readingTime = Math.max(wordCount * 200, defaultDuration || 3000);
    return Math.min(readingTime, 10000); // Max 10 seconds
  }

  return defaultDuration;
};

export const getMessagePlacementStyles = (
  placement: MessagePlacement,
  top?: number,
  bottom?: number
) => {
  const styles: Record<MessagePlacement, React.CSSProperties> = {
    top: {
      top: top || MESSAGE_DEFAULTS.top,
      left: "50%",
      transform: "translateX(-50%)",
    },
    topLeft: {
      top: top || MESSAGE_DEFAULTS.top,
      left: 24,
    },
    topRight: {
      top: top || MESSAGE_DEFAULTS.top,
      right: 24,
    },
    bottom: {
      bottom: bottom || MESSAGE_DEFAULTS.bottom,
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottomLeft: {
      bottom: bottom || MESSAGE_DEFAULTS.bottom,
      left: 24,
    },
    bottomRight: {
      bottom: bottom || MESSAGE_DEFAULTS.bottom,
      right: 24,
    },
  };

  return styles[placement] || styles.top;
};

export const getAccessibilityMessageText = (
  type: MessageType,
  content: React.ReactNode
): string => {
  const typeMessages = {
    success: "Success message",
    error: "Error message",
    warning: "Warning message",
    info: "Information message",
    loading: "Loading message",
  };

  const typeText = typeMessages[type] || typeMessages.info;
  const contentText =
    typeof content === "string" ? content : "Message displayed";

  return `${typeText}: ${contentText}`;
};

export const generateMessageKey = (): string => {
  return `message_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const isMessageExpired = (
  createdAt: number,
  duration: MessageDuration
): boolean => {
  if (duration === null) return false;
  return Date.now() - createdAt > duration;
};

export const sortMessagesByPlacement = (
  messages: MessageItem[]
): Record<MessagePlacement, MessageItem[]> => {
  const grouped: Record<MessagePlacement, MessageItem[]> = {
    top: [],
    topLeft: [],
    topRight: [],
    bottom: [],
    bottomLeft: [],
    bottomRight: [],
  };

  messages.forEach((message) => {
    grouped[message.placement].push(message);
  });

  // Sort by creation time - newest first for top placements, oldest first for bottom
  Object.keys(grouped).forEach((placement) => {
    const isTop = placement.includes("top");
    grouped[placement as MessagePlacement].sort((a, b) =>
      isTop ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );
  });

  return grouped;
};

// =============================================================================
// HOOK UTILITIES
// =============================================================================

export interface UseMessageOptions {
  defaultDuration?: MessageDuration;
  defaultPlacement?: MessagePlacement;
  maxCount?: number;
  getContainer?: () => HTMLElement;
}

export type UseMessageReturn = readonly [MessageInstance, React.ReactElement];

export interface UseNotificationOptions {
  defaultDuration?: MessageDuration;
  defaultPlacement?: NotificationProps["placement"];
  maxCount?: number;
  getContainer?: () => HTMLElement;
}

export interface UseNotificationReturn {
  notificationApi: NotificationInstance;
  contextHolder: React.ReactElement;
}

export interface UseToastOptions {
  defaultDuration?: MessageDuration;
  defaultPosition?: ToastProps["position"];
  maxCount?: number;
}

export interface UseToastReturn {
  toast: {
    success: (message: React.ReactNode, options?: Partial<ToastProps>) => void;
    error: (message: React.ReactNode, options?: Partial<ToastProps>) => void;
    warning: (message: React.ReactNode, options?: Partial<ToastProps>) => void;
    info: (message: React.ReactNode, options?: Partial<ToastProps>) => void;
    loading: (message: React.ReactNode, options?: Partial<ToastProps>) => void;
  };
  contextHolder: React.ReactElement;
}
