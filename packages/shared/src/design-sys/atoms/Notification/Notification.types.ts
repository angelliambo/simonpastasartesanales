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

export type NotificationType =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "open";
export type NotificationPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "bottom";
export type NotificationDuration = number | null; // null = persistent

export type NotificationSize = AllSize;
export type NotificationVariant = AllVariant;

export interface NotificationAction {
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

// =============================================================================
// NOTIFICATION CONFIG TYPES
// =============================================================================

export interface NotificationConfig {
  top?: number;
  bottom?: number;
  duration?: NotificationDuration;
  getContainer?: () => HTMLElement;
  maxCount?: number;
  placement?: NotificationPlacement;
  rtl?: boolean;
  prefixCls?: string;
}

export interface NotificationArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  duration?: NotificationDuration;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
  btn?: React.ReactNode;
  top?: number;
  bottom?: number;
  placement?: NotificationPlacement;
}

export interface NotificationInstance {
  success: (config: CreateNotificationArgs | string) => string;
  error: (config: CreateNotificationArgs | string) => string;
  info: (config: CreateNotificationArgs | string) => string;
  warning: (config: CreateNotificationArgs | string) => string;
  open: (config: CreateNotificationArgs) => string;
  close: (key: string) => void;
  destroy: (key?: string) => void;
  config: (options: Partial<NotificationConfig>) => void;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface NotificationProps {
  // Content
  children?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;

  // Appearance
  type?: NotificationType;
  size?: NotificationSize;
  variant?: NotificationVariant;
  icon?: React.ReactNode;

  // Behavior
  duration?: NotificationDuration;
  showIcon?: boolean;
  closable?: boolean;

  // Position and Layout
  placement?: NotificationPlacement;
  top?: number;
  bottom?: number;

  // Actions
  btn?: React.ReactNode;
  closeIcon?: React.ReactNode;
  actions?: NotificationAction[];

  // Events
  onClose?: () => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  afterClose?: () => void;

  // Styling
  className?: string;
  style?: React.CSSProperties;
  getContainer?: () => HTMLElement;

  // Accessibility
  accessibility?: AccessibilityProps;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
}

export interface NotificationProviderProps {
  children: React.ReactNode;
  config?: NotificationConfig;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledNotificationProps {
  $type: NotificationType;
  $size: NotificationSize;
  $variant: NotificationVariant;
  $showIcon: boolean;
  $closable: boolean;
  $placement: NotificationPlacement;
  $hasDescription: boolean;
  $hasActions: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledNotificationWrapperProps {
  $placement: NotificationPlacement;
  $top?: number;
  $bottom?: number;
  accessibility?: AccessibilityProps;
}

export interface StyledNotificationIconProps {
  $type: NotificationType;
  $size: NotificationSize;
  accessibility?: AccessibilityProps;
}

export interface StyledNotificationContentProps {
  $size: NotificationSize;
  $hasIcon: boolean;
  $hasDescription: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledNotificationHeaderProps {
  $size: NotificationSize;
  accessibility?: AccessibilityProps;
}

export interface StyledNotificationBodyProps {
  $size: NotificationSize;
  accessibility?: AccessibilityProps;
}

export interface StyledNotificationActionsProps {
  $size: NotificationSize;
  accessibility?: AccessibilityProps;
}

export interface StyledCloseButtonProps {
  $size: NotificationSize;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// NOTIFICATION ITEM TYPES
// =============================================================================

export interface NotificationItem {
  key: string | number;
  message: React.ReactNode;
  description?: React.ReactNode;
  type: NotificationType;
  duration: NotificationDuration;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClose?: () => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  btn?: React.ReactNode;
  closeIcon?: React.ReactNode;
  actions?: NotificationAction[];
  placement: NotificationPlacement;
  size: NotificationSize;
  variant: NotificationVariant;
  showIcon: boolean;
  closable: boolean;
  accessibility?: AccessibilityProps;
  createdAt: number;
  top?: number;
  bottom?: number;
}

export interface NotificationContextValue {
  add: (
    notification: Omit<NotificationItem, "key" | "createdAt">
  ) => string | number;
  remove: (key: string | number) => void;
  removeAll: () => void;
  config: NotificationConfig;
  notifications: NotificationItem[];
}

// =============================================================================
// TOAST NOTIFICATION TYPES
// =============================================================================

export interface ToastNotificationProps {
  message: React.ReactNode;
  type?: NotificationType;
  duration?: NotificationDuration;
  position?: "top" | "bottom";
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  accessibility?: AccessibilityProps;
}

export interface ToastNotificationContextValue {
  showToast: (props: ToastNotificationProps) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

// =============================================================================
// DESKTOP NOTIFICATION TYPES
// =============================================================================

export interface DesktopNotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
  actions?: NotificationAction[];
  badge?: string;
  data?: any;
  dir?: "auto" | "ltr" | "rtl";
  lang?: string;
  renotify?: boolean;
  vibrate?: number | number[];
  onClick?: (event: Event) => void;
  onClose?: (event: Event) => void;
  onError?: (event: Event) => void;
  onShow?: (event: Event) => void;
}

export interface DesktopNotificationContextValue {
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (
    options: DesktopNotificationOptions
  ) => Promise<Notification | null>;
  closeNotification: (tag: string) => void;
  closeAllNotifications: () => void;
}

// =============================================================================
// API ARGUMENT TYPES
// =============================================================================

// Args for creating notifications via static API
export interface CreateNotificationArgs {
  message?: React.ReactNode;
  description?: React.ReactNode;
  duration?: NotificationDuration;
  placement?: NotificationPlacement;
  size?: NotificationSize;
  variant?: NotificationVariant;
  showIcon?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  actions?: NotificationAction[];
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
  afterClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
  getContainer?: () => HTMLElement;
  role?: string;
  tabIndex?: number;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const NOTIFICATION_DEFAULTS = {
  type: "info" as NotificationType,
  size: "md" as NotificationSize,
  variant: "default" as NotificationVariant,
  placement: "topRight" as NotificationPlacement,
  duration: 4500,
  showIcon: true,
  closable: true,
  top: 24,
  bottom: 24,
  maxCount: 10,
} as const;

export const NOTIFICATION_TYPES = [
  "success",
  "info",
  "warning",
  "error",
  "open",
] as const;
export const NOTIFICATION_PLACEMENTS = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
  "top",
  "bottom",
] as const;

export const NOTIFICATION_DURATIONS = {
  short: 3000,
  medium: 4500,
  long: 6000,
  persistent: null,
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getNotificationIcon = (
  type: NotificationType
): React.ReactNode => {
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
    open: "📄",
  };

  return icons[type] || icons.info;
};

export const getNotificationAutoCloseDelay = (
  message: React.ReactNode,
  description?: React.ReactNode,
  defaultDuration: NotificationDuration = NOTIFICATION_DEFAULTS.duration
): NotificationDuration => {
  if (defaultDuration === null) return null;

  let wordCount = 0;

  if (typeof message === "string") {
    wordCount += message.split(" ").length;
  }

  if (typeof description === "string") {
    wordCount += description.split(" ").length;
  }

  if (wordCount > 0) {
    // Longer notifications need more time to read
    const readingTime = Math.max(wordCount * 250, defaultDuration || 4500);
    return Math.min(readingTime, 12000); // Max 12 seconds
  }

  return defaultDuration;
};

export const getNotificationPlacementStyles = (
  placement: NotificationPlacement,
  top?: number,
  bottom?: number
) => {
  const styles: Record<NotificationPlacement, React.CSSProperties> = {
    topLeft: {
      top: top || NOTIFICATION_DEFAULTS.top,
      left: 24,
    },
    topRight: {
      top: top || NOTIFICATION_DEFAULTS.top,
      right: 24,
    },
    bottomLeft: {
      bottom: bottom || NOTIFICATION_DEFAULTS.bottom,
      left: 24,
    },
    bottomRight: {
      bottom: bottom || NOTIFICATION_DEFAULTS.bottom,
      right: 24,
    },
    top: {
      top: top || NOTIFICATION_DEFAULTS.top,
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottom: {
      bottom: bottom || NOTIFICATION_DEFAULTS.bottom,
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  return styles[placement] || styles.topRight;
};

export const getAccessibilityNotificationText = (
  type: NotificationType,
  message: React.ReactNode,
  description?: React.ReactNode
): string => {
  const typeMessages = {
    success: "Success notification",
    error: "Error notification",
    warning: "Warning notification",
    info: "Information notification",
    open: "Notification",
  };

  const typeText = typeMessages[type] || typeMessages.info;
  const messageText =
    typeof message === "string" ? message : "Notification displayed";
  const descriptionText =
    typeof description === "string" ? `: ${description}` : "";

  return `${typeText}: ${messageText}${descriptionText}`;
};

export const generateNotificationKey = (): string => {
  return `notification_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

export const isNotificationExpired = (
  createdAt: number,
  duration: NotificationDuration
): boolean => {
  if (duration === null) return false;
  return Date.now() - createdAt > duration;
};

export const sortNotificationsByPlacement = (
  notifications: NotificationItem[]
): Record<NotificationPlacement, NotificationItem[]> => {
  const grouped: Record<NotificationPlacement, NotificationItem[]> = {
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: [],
    top: [],
    bottom: [],
  };

  notifications.forEach((notification) => {
    grouped[notification.placement].push(notification);
  });

  // Sort by creation time - newest first for top placements, oldest first for bottom
  Object.keys(grouped).forEach((placement) => {
    const isTop = placement.includes("top");
    grouped[placement as NotificationPlacement].sort((a, b) =>
      isTop ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );
  });

  return grouped;
};

// =============================================================================
// DESKTOP NOTIFICATION UTILITIES
// =============================================================================

export const isDesktopNotificationSupported = (): boolean => {
  return "Notification" in window;
};

export const getDesktopNotificationPermission = (): NotificationPermission => {
  if (!isDesktopNotificationSupported()) {
    return "denied";
  }
  return Notification.permission;
};

export const requestDesktopNotificationPermission =
  (): Promise<NotificationPermission> => {
    if (!isDesktopNotificationSupported()) {
      return Promise.resolve("denied");
    }

    return Notification.requestPermission();
  };

export const showDesktopNotification = (
  options: DesktopNotificationOptions
): Promise<Notification | null> => {
  return new Promise((resolve) => {
    if (
      !isDesktopNotificationSupported() ||
      Notification.permission !== "granted"
    ) {
      resolve(null);
      return;
    }

    // Construir objeto de opciones solo con propiedades válidas de la API estándar
    const notificationOptions: NotificationOptions = {};
    
    if (options.body) notificationOptions.body = options.body;
    if (options.icon) notificationOptions.icon = options.icon;
    if (options.tag) notificationOptions.tag = options.tag;
    if (options.badge) notificationOptions.badge = options.badge;
    if (options.data) notificationOptions.data = options.data;
    if (options.dir) notificationOptions.dir = options.dir;
    if (options.lang) notificationOptions.lang = options.lang;
    if (options.requireInteraction !== undefined) {
      notificationOptions.requireInteraction = options.requireInteraction;
    }
    if (options.silent !== undefined) {
      notificationOptions.silent = options.silent;
    }
    
    // timestamp, renotify y vibrate no son parte de la API estándar de Notification
    // y TypeScript no las reconoce en NotificationOptions
    // El navegador maneja timestamp automáticamente
    // renotify se maneja automáticamente si se usa el mismo tag
    // vibrate no está en el estándar, se omite

    const notification = new Notification(options.title, notificationOptions);

    if (options.onClick) {
      notification.onclick = options.onClick;
    }

    if (options.onClose) {
      notification.onclose = options.onClose;
    }

    if (options.onError) {
      notification.onerror = options.onError;
    }

    if (options.onShow) {
      notification.onshow = options.onShow;
    }

    resolve(notification);
  });
};

// =============================================================================
// HOOK UTILITIES
// =============================================================================

export interface UseNotificationOptions {
  defaultDuration?: NotificationDuration;
  defaultPlacement?: NotificationPlacement;
  maxCount?: number;
  getContainer?: () => HTMLElement;
}

export type UseNotificationReturn = readonly [
  NotificationInstance,
  React.ReactElement
];

export interface UseDesktopNotificationOptions {
  requestPermissionOnMount?: boolean;
  defaultIcon?: string;
  defaultDuration?: number;
}

export interface UseDesktopNotificationReturn {
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (
    options: DesktopNotificationOptions
  ) => Promise<Notification | null>;
  closeNotification: (tag: string) => void;
  closeAllNotifications: () => void;
}

export interface UseToastNotificationOptions {
  defaultDuration?: NotificationDuration;
  defaultPosition?: ToastNotificationProps["position"];
  maxCount?: number;
}

export interface UseToastNotificationReturn {
  toast: {
    success: (
      message: React.ReactNode,
      options?: Partial<ToastNotificationProps>
    ) => void;
    error: (
      message: React.ReactNode,
      options?: Partial<ToastNotificationProps>
    ) => void;
    warning: (
      message: React.ReactNode,
      options?: Partial<ToastNotificationProps>
    ) => void;
    info: (
      message: React.ReactNode,
      options?: Partial<ToastNotificationProps>
    ) => void;
  };
  contextHolder: React.ReactElement;
}

// =============================================================================
// PROGRESSIVE WEB APP NOTIFICATION TYPES
// =============================================================================

export interface PWANotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
  actions?: NotificationAction[];
  vibrate?: number | number[];
}

export interface PWANotificationContextValue {
  isSupported: boolean;
  isServiceWorkerReady: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (options: PWANotificationOptions) => Promise<void>;
  subscribeToNotifications: () => Promise<PushSubscription | null>;
  unsubscribeFromNotifications: () => Promise<boolean>;
}

// =============================================================================
// NOTIFICATION CENTER TYPES
// =============================================================================

export interface NotificationCenterItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
  read: boolean;
  actions?: Array<{
    label: string;
    handler: () => void;
    primary?: boolean;
  }>;
  metadata?: Record<string, any>;
}

export interface NotificationCenterContextValue {
  notifications: NotificationCenterItem[];
  unreadCount: number;
  addNotification: (
    notification: Omit<NotificationCenterItem, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}
