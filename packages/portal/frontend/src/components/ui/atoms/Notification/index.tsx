import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { usePersonalization } from "../../../../hooks/personalization/usePersonalization";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { CloseOutlined } from "@ant-design/icons";
import {
  NotificationProps,
  NotificationItem,
  NotificationConfig,
  NotificationContextValue,
  NotificationInstance,
  UseNotificationReturn,
  NotificationPlacement,
  NotificationType,
  NotificationSize,
  NotificationVariant,
  NotificationDuration,
  CreateNotificationArgs,
} from "./Notification.types";
import {
  StyledNotification,
  StyledNotificationWrapper,
  StyledNotificationIcon,
  StyledNotificationContent,
  StyledNotificationHeader,
  StyledNotificationBody,
  StyledNotificationActions,
  StyledCloseButton,
} from "./Notification.styles";

// =============================================================================
// CONSTANTS
// =============================================================================

const NOTIFICATION_DEFAULTS = {
  type: "info" as NotificationType,
  size: "md" as NotificationSize,
  variant: "standard" as NotificationVariant,
  duration: 4500 as NotificationDuration,
  placement: "topRight" as NotificationPlacement,
  showIcon: true,
  closable: true,
  destroyOnClose: true,
  getContainer: () => document.body,
  maxCount: 0,
  rtl: false,
  top: 24,
  bottom: 24,
} as const;

const DEFAULT_ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
  open: "●",
} as const;

const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 4500,
  LONG: 6000,
  PERSISTENT: null,
} as const;

// =============================================================================
// CONTEXT
// =============================================================================

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

// =============================================================================
// NOTIFICATION STATE MANAGEMENT
// =============================================================================

class NotificationState {
  private items: Map<string, NotificationItem> = new Map();
  private subscribers: Set<() => void> = new Set();
  private config: NotificationConfig = NOTIFICATION_DEFAULTS;
  private keyCounter = 0;

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notify() {
    this.subscribers.forEach((callback) => callback());
  }

  setConfig(config: Partial<NotificationConfig>) {
    this.config = { ...this.config, ...config };
    this.notify();
  }

  getConfig() {
    return this.config;
  }

  add(item: Omit<NotificationItem, "key" | "createdAt">): string {
    const key = `notification_${++this.keyCounter}`;
    const notification: NotificationItem = {
      ...item,
      key,
      createdAt: Date.now(),
    };

    this.items.set(key, notification);

    // Handle maxCount
    if (
      this.config.maxCount &&
      this.config.maxCount > 0 &&
      this.items.size > this.config.maxCount
    ) {
      const oldestKey = Array.from(this.items.keys())[0];
      this.items.delete(oldestKey);
    }

    this.notify();
    return key;
  }

  remove(key: string) {
    if (this.items.delete(key)) {
      this.notify();
    }
  }

  clear() {
    this.items.clear();
    this.notify();
  }

  getAll(): NotificationItem[] {
    return Array.from(this.items.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  get(key: string): NotificationItem | undefined {
    return this.items.get(key);
  }

  getByPlacement(placement: NotificationPlacement): NotificationItem[] {
    return this.getAll().filter((item) => item.placement === placement);
  }
}

// Global notification state
const globalNotificationState = new NotificationState();

// Helper function to build notification item with defaults
const buildNotificationItemWithDefaults = (
  type: NotificationType,
  config: CreateNotificationArgs | string,
  baseConfig: Partial<NotificationConfig> = NOTIFICATION_DEFAULTS
): Omit<NotificationItem, "key" | "createdAt"> => {
  const notificationConfig =
    typeof config === "string" ? { message: config } : config;

  return {
    ...baseConfig,
    ...notificationConfig,
    type,
    message: notificationConfig.message || "Notification",
    size: notificationConfig.size || NOTIFICATION_DEFAULTS.size,
    variant: notificationConfig.variant || NOTIFICATION_DEFAULTS.variant,
    placement:
      notificationConfig.placement ||
      baseConfig.placement ||
      NOTIFICATION_DEFAULTS.placement,
    duration:
      notificationConfig.duration !== undefined
        ? notificationConfig.duration
        : baseConfig.duration || NOTIFICATION_DEFAULTS.duration,
    showIcon:
      notificationConfig.showIcon !== undefined
        ? notificationConfig.showIcon
        : NOTIFICATION_DEFAULTS.showIcon,
    closable:
      notificationConfig.closable !== undefined
        ? notificationConfig.closable
        : NOTIFICATION_DEFAULTS.closable,
  };
};

// =============================================================================
// NOTIFICATION ITEM COMPONENT
// =============================================================================

const NotificationItemComponent: React.FC<{
  notification: NotificationItem;
  onClose: (key: string) => void;
  onExpire: (key: string) => void;
}> = React.memo(({ notification, onClose, onExpire }) => {
  const personalizationData = usePersonalization();
  const accessibility = {
    largeText:
      personalizationData.currentProfile?.preferences?.accessibility
        ?.largeText || false,
    increasedSpacing: false, // No disponible en UserProfile
    highContrast:
      personalizationData.currentProfile?.preferences?.accessibility
        ?.highContrast || false,
    reducedMotion:
      !personalizationData.currentProfile?.preferences?.accessibility
        ?.animations || false,
  };
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const startTimer = useCallback(() => {
    if (notification.duration === null || notification.duration === 0) return;

    timerRef.current = setTimeout(() => {
      onExpire(String(notification.key));
    }, notification.duration);
  }, [notification.duration, notification.key, onExpire]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    clearTimer();
  }, [clearTimer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startTimer();
  }, [startTimer]);

  const handleClose = useCallback(() => {
    clearTimer();
    setIsVisible(false);
    setTimeout(() => {
      onClose(String(notification.key));
    }, 300);
  }, [clearTimer, onClose, notification.key]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (notification.onClick) {
        notification.onClick(event);
      }
    },
    [notification.onClick]
  );

  useEffect(() => {
    if (isVisible && !isHovered) {
      startTimer();
    }
    return clearTimer;
  }, [isVisible, isHovered, startTimer, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const iconElement = useMemo(() => {
    if (!notification.showIcon) return null;

    if (notification.icon) {
      return (
        <StyledNotificationIcon
          $type={notification.type}
          $size={notification.size}
          accessibility={accessibility}
        >
          {notification.icon}
        </StyledNotificationIcon>
      );
    }

    const defaultIcon = DEFAULT_ICONS[notification.type];
    if (defaultIcon) {
      return (
        <StyledNotificationIcon
          $type={notification.type}
          $size={notification.size}
          accessibility={accessibility}
        >
          {defaultIcon}
        </StyledNotificationIcon>
      );
    }

    return null;
  }, [
    notification.showIcon,
    notification.icon,
    notification.type,
    notification.size,
    accessibility,
  ]);

  const actionsElement = useMemo(() => {
    if (!notification.actions || notification.actions.length === 0) return null;

    return (
      <StyledNotificationActions
        $size={notification.size}
        accessibility={accessibility}
      >
        {notification.actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            style={{
              padding: "4px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "transparent",
              cursor: action.disabled ? "not-allowed" : "pointer",
              fontSize: "14px",
              ...action.style,
            }}
          >
            {action.label}
          </button>
        ))}
      </StyledNotificationActions>
    );
  }, [notification.actions, notification.size, accessibility]);

  return (
    <StyledNotification
      $type={notification.type}
      $size={notification.size}
      $variant={notification.variant}
      $showIcon={notification.showIcon}
      $closable={notification.closable}
      $placement={notification.placement}
      $hasDescription={!!notification.description}
      $hasActions={!!(notification.actions && notification.actions.length > 0)}
      accessibility={accessibility}
      className={`notification-item ${!isVisible ? "notification-exit" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--duration": notification.duration
            ? `${notification.duration}ms`
            : "0s",
          cursor: notification.onClick ? "pointer" : "default",
          ...notification.style,
        } as React.CSSProperties
      }
      role="alert"
      aria-live={notification.type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      {iconElement}

      <StyledNotificationContent
        $size={notification.size}
        $hasIcon={notification.showIcon}
        $hasDescription={!!notification.description}
        accessibility={accessibility}
      >
        {notification.message && (
          <StyledNotificationHeader
            $size={notification.size}
            accessibility={accessibility}
          >
            {notification.message}
          </StyledNotificationHeader>
        )}

        {notification.description && (
          <StyledNotificationBody
            $size={notification.size}
            accessibility={accessibility}
          >
            {notification.description}
          </StyledNotificationBody>
        )}

        {actionsElement}
      </StyledNotificationContent>

      {notification.closable && (
        <StyledCloseButton
          $size={notification.size}
          accessibility={accessibility}
          onClick={handleClose}
          aria-label="Close notification"
          type="button"
        >
          <ZnIcon icon={CloseOutlined} />
        </StyledCloseButton>
      )}
    </StyledNotification>
  );
});

NotificationItemComponent.displayName = "NotificationItem";

// =============================================================================
// NOTIFICATION WRAPPER COMPONENT
// =============================================================================

const NotificationWrapperComponent: React.FC<{
  placement: NotificationPlacement;
  notifications: NotificationItem[];
  config: NotificationConfig;
  onClose: (key: string) => void;
  onExpire: (key: string) => void;
}> = ({ placement, notifications, config, onClose, onExpire }) => {
  const personalizationData = usePersonalization();
  const accessibility = {
    largeText:
      personalizationData.currentProfile?.preferences?.accessibility
        ?.largeText || false,
    increasedSpacing: false,
    highContrast:
      personalizationData.currentProfile?.preferences?.accessibility
        ?.highContrast || false,
    reducedMotion:
      !personalizationData.currentProfile?.preferences?.accessibility
        ?.animations || false,
  };

  if (notifications.length === 0) return null;

  return (
    <StyledNotificationWrapper
      $placement={placement}
      $top={config.top}
      $bottom={config.bottom}
      accessibility={accessibility}
      className={`notification-wrapper notification-wrapper-${placement}`}
    >
      {notifications.map((notification) => (
        <NotificationItemComponent
          key={notification.key}
          notification={notification}
          onClose={onClose}
          onExpire={onExpire}
        />
      ))}
    </StyledNotificationWrapper>
  );
};

// =============================================================================
// NOTIFICATION PROVIDER
// =============================================================================

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<NotificationConfig>;
}> = ({ children, config = {} }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const currentConfig = useMemo<NotificationConfig>(
    () => ({
      ...NOTIFICATION_DEFAULTS,
      ...config,
    }),
    [config]
  );

  useEffect(() => {
    globalNotificationState.setConfig(currentConfig);
  }, [currentConfig]);

  useEffect(() => {
    const unsubscribe = globalNotificationState.subscribe(() => {
      setNotifications(globalNotificationState.getAll());
    });

    return unsubscribe;
  }, []);

  const handleClose = useCallback((key: string) => {
    globalNotificationState.remove(key);
  }, []);

  const handleExpire = useCallback((key: string) => {
    const notification = globalNotificationState.get(key);
    if (notification?.onClose) {
      notification.onClose();
    }
    globalNotificationState.remove(key);
  }, []);

  const contextValue = useMemo<NotificationContextValue>(
    () => ({
      add: (notification: Omit<NotificationItem, "key" | "createdAt">) => {
        return globalNotificationState.add(notification);
      },
      remove: (key: string | number) => {
        globalNotificationState.remove(String(key));
      },
      removeAll: () => {
        globalNotificationState.clear();
      },
      config: currentConfig,
      notifications: notifications,
    }),
    [notifications, currentConfig]
  );

  // Group notifications by placement
  const notificationsByPlacement = useMemo(() => {
    const grouped: Record<NotificationPlacement, NotificationItem[]> = {
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
      top: [],
      bottom: [],
    };

    notifications.forEach((notification) => {
      const placement = notification.placement || currentConfig.placement;
      if (grouped[placement]) {
        grouped[placement].push(notification);
      }
    });

    return grouped;
  }, [notifications, currentConfig.placement]);

  const container = currentConfig.getContainer
    ? currentConfig.getContainer()
    : document.body;

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {container &&
        createPortal(
          <div className="notification-portal">
            {Object.entries(notificationsByPlacement).map(
              ([placement, items]) => (
                <NotificationWrapperComponent
                  key={placement}
                  placement={placement as NotificationPlacement}
                  notifications={items}
                  config={currentConfig}
                  onClose={handleClose}
                  onExpire={handleExpire}
                />
              )
            )}
          </div>,
          container
        )}
    </NotificationContext.Provider>
  );
};

// =============================================================================
// HOOKS
// =============================================================================

export const useNotification = (): UseNotificationReturn => {
  const context = useContext(NotificationContext);

  if (!context) {
    // Fallback to global state when no provider
    const notificationApi: NotificationInstance = {
      success: (config) => {
        return globalNotificationState.add(
          buildNotificationItemWithDefaults("success", config)
        );
      },
      error: (config) => {
        return globalNotificationState.add(
          buildNotificationItemWithDefaults("error", config)
        );
      },
      info: (config) => {
        return globalNotificationState.add(
          buildNotificationItemWithDefaults("info", config)
        );
      },
      warning: (config) => {
        return globalNotificationState.add(
          buildNotificationItemWithDefaults("warning", config)
        );
      },
      open: (config) => {
        return globalNotificationState.add(
          buildNotificationItemWithDefaults("open", config)
        );
      },
      close: (key: string) => {
        globalNotificationState.remove(key);
      },
      destroy: (key?: string) => {
        if (key) {
          globalNotificationState.remove(key);
        } else {
          globalNotificationState.clear();
        }
      },
      config: (config) => {
        globalNotificationState.setConfig(config);
      },
    };

    return [notificationApi, <div />] as const;
  }

  // Create a compatible NotificationInstance from context
  const contextNotificationApi: NotificationInstance = {
    success: (config) => {
      return String(
        context.add(buildNotificationItemWithDefaults("success", config))
      );
    },
    error: (config) => {
      return String(
        context.add(buildNotificationItemWithDefaults("error", config))
      );
    },
    info: (config) => {
      return String(
        context.add(buildNotificationItemWithDefaults("info", config))
      );
    },
    warning: (config) => {
      return String(
        context.add(buildNotificationItemWithDefaults("warning", config))
      );
    },
    open: (config) => {
      return String(
        context.add(buildNotificationItemWithDefaults("open", config))
      );
    },
    close: (key: string) => {
      context.remove(key);
    },
    destroy: (key?: string) => {
      if (key) {
        context.remove(key);
      } else {
        context.removeAll();
      }
    },
    config: (config) => {
      // Not available in context API
    },
  };

  return [contextNotificationApi, <div />] as const;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  return context;
};

// =============================================================================
// STATIC API
// =============================================================================

const createStaticNotificationMethod = (type: NotificationType) => {
  return (args: CreateNotificationArgs) => {
    const { message, description, ...rest } = args;
    const notificationProps: Omit<NotificationItem, "key" | "createdAt"> = {
      type,
      message: message || "",
      description,
      duration:
        rest.duration !== undefined
          ? rest.duration
          : globalNotificationState.getConfig().duration ||
            NOTIFICATION_DEFAULTS.duration,
      placement:
        globalNotificationState.getConfig().placement ||
        NOTIFICATION_DEFAULTS.placement,
      size: NOTIFICATION_DEFAULTS.size,
      variant: NOTIFICATION_DEFAULTS.variant,
      showIcon: NOTIFICATION_DEFAULTS.showIcon,
      closable: NOTIFICATION_DEFAULTS.closable,
      ...rest,
    };

    return globalNotificationState.add(notificationProps);
  };
};

const addNotificationToQueue = (
  notification: Omit<NotificationItem, "key" | "createdAt">
) => {
  return globalNotificationState.add(notification);
};

export const notification = {
  success: createStaticNotificationMethod("success"),
  error: createStaticNotificationMethod("error"),
  info: createStaticNotificationMethod("info"),
  warning: createStaticNotificationMethod("warning"),
  open: (args: CreateNotificationArgs) => {
    const notificationProps: Omit<NotificationItem, "key" | "createdAt"> = {
      type: "open",
      message: args.message || "",
      description: args.description,
      duration:
        args.duration !== undefined
          ? args.duration
          : globalNotificationState.getConfig().duration ||
            NOTIFICATION_DEFAULTS.duration,
      placement:
        globalNotificationState.getConfig().placement ||
        NOTIFICATION_DEFAULTS.placement,
      size: NOTIFICATION_DEFAULTS.size,
      variant: NOTIFICATION_DEFAULTS.variant,
      showIcon: NOTIFICATION_DEFAULTS.showIcon,
      closable: NOTIFICATION_DEFAULTS.closable,
      ...args,
    };

    return addNotificationToQueue(notificationProps);
  },
  destroy: (key?: string) => {
    if (key) {
      globalNotificationState.remove(key);
    } else {
      globalNotificationState.clear();
    }
  },
  config: (config: Partial<NotificationConfig>) => {
    globalNotificationState.setConfig(config);
  },
};

// =============================================================================
// MAIN NOTIFICATION COMPONENT
// =============================================================================

export const Notification: React.FC<NotificationProps> = ({
  type = NOTIFICATION_DEFAULTS.type,
  size = NOTIFICATION_DEFAULTS.size,
  variant = NOTIFICATION_DEFAULTS.variant,
  message,
  description,
  duration = NOTIFICATION_DEFAULTS.duration,
  placement = NOTIFICATION_DEFAULTS.placement,
  showIcon = NOTIFICATION_DEFAULTS.showIcon,
  icon,
  closable = NOTIFICATION_DEFAULTS.closable,
  closeIcon,
  actions,
  onClick,
  onClose,
  afterClose,
  style,
  className,
  getContainer,
  id,
  role = "alert",
  tabIndex,
  accessibility,
  ...rest
}) => {
  const personalizationData = usePersonalization();
  const personalizedAccessibility = {
    largeText:
      personalizationData.currentProfile?.preferences?.accessibility
        ?.largeText || false,
    increasedSpacing: false,
    highContrast:
      personalizationData.currentProfile?.preferences?.accessibility
        ?.highContrast || false,
    reducedMotion:
      !personalizationData.currentProfile?.preferences?.accessibility
        ?.animations || false,
  };
  const finalAccessibility = accessibility || personalizedAccessibility;
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    clearTimer();
    setIsVisible(false);
    onClose?.();

    setTimeout(() => {
      afterClose?.();
    }, 300);
  }, [clearTimer, onClose, afterClose]);

  const startTimer = useCallback(() => {
    if (duration === null || duration === 0) {
      clearTimer();
      return;
    }

    clearTimer();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, duration);
  }, [duration, handleClose, clearTimer]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    clearTimer();
  }, [clearTimer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (!isHovered) {
      startTimer();
    }

    return clearTimer;
  }, [isVisible, isHovered, startTimer, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
    },
    [onClick]
  );

  const iconElement = useMemo(() => {
    if (!showIcon) return null;

    if (icon) {
      return (
        <StyledNotificationIcon
          $type={type}
          $size={size}
          accessibility={finalAccessibility}
        >
          {icon}
        </StyledNotificationIcon>
      );
    }

    const defaultIcon = DEFAULT_ICONS[type];
    if (defaultIcon) {
      return (
        <StyledNotificationIcon
          $type={type}
          $size={size}
          accessibility={finalAccessibility}
        >
          {defaultIcon}
        </StyledNotificationIcon>
      );
    }

    return null;
  }, [showIcon, icon, type, size, finalAccessibility]);

  const actionsElement = useMemo(() => {
    if (!actions || actions.length === 0) return null;

    return (
      <StyledNotificationActions
        $size={size}
        accessibility={finalAccessibility}
      >
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            style={{
              padding: "4px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "transparent",
              cursor: action.disabled ? "not-allowed" : "pointer",
              fontSize: "14px",
              ...action.style,
            }}
          >
            {action.label}
          </button>
        ))}
      </StyledNotificationActions>
    );
  }, [actions, size, finalAccessibility]);

  if (!isVisible) return null;

  const combinedClassName = ["notification-item", className]
    .filter(Boolean)
    .join(" ");

  const inlineStyle = {
    "--duration": duration ? `${duration}ms` : "0s",
    ...(onClick ? { cursor: "pointer" } : {}),
    ...style,
  } as React.CSSProperties;

  return (
    <StyledNotification
      ref={notificationRef}
      $type={type}
      $size={size}
      $variant={variant}
      $showIcon={showIcon}
      $closable={closable}
      $placement={placement}
      $hasDescription={!!description}
      $hasActions={!!(actions && actions.length > 0)}
      accessibility={finalAccessibility}
      className={combinedClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={inlineStyle}
      onClick={handleClick}
      role={role}
      tabIndex={tabIndex}
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      id={id ? `notification-${id}` : undefined}
      {...rest}
    >
      {iconElement}

      <StyledNotificationContent
        $size={size}
        $hasIcon={showIcon}
        $hasDescription={!!description}
        accessibility={finalAccessibility}
      >
        {message && (
          <StyledNotificationHeader
            $size={size}
            accessibility={finalAccessibility}
          >
            {message}
          </StyledNotificationHeader>
        )}

        {description && (
          <StyledNotificationBody
            $size={size}
            accessibility={finalAccessibility}
          >
            {description}
          </StyledNotificationBody>
        )}

        {actionsElement}
      </StyledNotificationContent>

      {closable && (
        <StyledCloseButton
          $size={size}
          accessibility={finalAccessibility}
          onClick={handleClose}
          aria-label="Close notification"
          type="button"
        >
          {closeIcon || <ZnIcon icon={CloseOutlined} />}
        </StyledCloseButton>
      )}
    </StyledNotification>
  );
};

// =============================================================================
// PREDEFINED NOTIFICATION COMPONENTS
// =============================================================================

// Type variations
export const SuccessNotificationComponent: React.FC<
  Omit<NotificationProps, "type">
> = (props) => <Notification {...props} type="success" />;

export const ErrorNotificationComponent: React.FC<
  Omit<NotificationProps, "type">
> = (props) => <Notification {...props} type="error" />;

export const WarningNotificationComponent: React.FC<
  Omit<NotificationProps, "type">
> = (props) => <Notification {...props} type="warning" />;

export const InfoNotificationComponent: React.FC<
  Omit<NotificationProps, "type">
> = (props) => <Notification {...props} type="info" />;

export const OpenNotificationComponent: React.FC<
  Omit<NotificationProps, "type">
> = (props) => <Notification {...props} type="open" />;

// Size variations
export const SmallNotificationComponent: React.FC<
  Omit<NotificationProps, "size">
> = (props) => <Notification {...props} size="sm" />;

export const MediumNotificationComponent: React.FC<
  Omit<NotificationProps, "size">
> = (props) => <Notification {...props} size="md" />;

export const LargeNotificationComponent: React.FC<
  Omit<NotificationProps, "size">
> = (props) => <Notification {...props} size="lg" />;

export const ExtraLargeNotificationComponent: React.FC<
  Omit<NotificationProps, "size">
> = (props) => <Notification {...props} size="xl" />;

// Variant variations
export const PrimaryNotificationComponent: React.FC<
  Omit<NotificationProps, "variant">
> = (props) => <Notification {...props} variant="primary" />;

export const SecondaryNotificationComponent: React.FC<
  Omit<NotificationProps, "variant">
> = (props) => <Notification {...props} variant="secondary" />;

// Behavior variations
export const PersistentNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} duration={null} />;

export const ClosableNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} closable={true} />;

export const IconlessNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} showIcon={false} />;

// Placement variations
export const TopLeftNotificationComponent: React.FC<
  Omit<NotificationProps, "placement">
> = (props) => <Notification {...props} placement="topLeft" />;

export const TopRightNotificationComponent: React.FC<
  Omit<NotificationProps, "placement">
> = (props) => <Notification {...props} placement="topRight" />;

export const BottomLeftNotificationComponent: React.FC<
  Omit<NotificationProps, "placement">
> = (props) => <Notification {...props} placement="bottomLeft" />;

export const BottomRightNotificationComponent: React.FC<
  Omit<NotificationProps, "placement">
> = (props) => <Notification {...props} placement="bottomRight" />;

export const TopNotificationComponent: React.FC<
  Omit<NotificationProps, "placement">
> = (props) => <Notification {...props} placement="top" />;

export const BottomNotificationComponent: React.FC<
  Omit<NotificationProps, "placement">
> = (props) => <Notification {...props} placement="bottom" />;

// Use case variations
export const ToastNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} size="sm" duration={3000} placement="top" />;

export const DesktopNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} size="md" duration={null} placement="topRight" />;

export const AlertNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} size="lg" duration={null} type="error" />;

export const StatusNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} size="sm" duration={2000} showIcon={true} />;

export const SystemNotificationComponent: React.FC<NotificationProps> = (
  props
) => <Notification {...props} size="md" type="info" placement="topRight" />;

// Specialized components
export const LoadingNotificationComponent: React.FC<NotificationProps> = (
  props
) => (
  <Notification
    {...props}
    type="info"
    duration={null}
    closable={false}
    icon="⏳"
  />
);

export const ProgressNotificationComponent: React.FC<NotificationProps> = (
  props
) => (
  <Notification
    {...props}
    type="info"
    duration={null}
    closable={true}
    showIcon={false}
  />
);

export const FeedbackNotificationComponent: React.FC<NotificationProps> = (
  props
) => (
  <Notification {...props} size="md" duration={4000} placement="bottomRight" />
);

// =============================================================================
// EXPORTS
// =============================================================================

export default Notification;

export {
  type NotificationProps,
  type NotificationItem,
  type NotificationConfig,
  type NotificationInstance,
  type UseNotificationReturn,
  type NotificationType,
  type NotificationSize,
  type NotificationVariant,
  type NotificationPlacement,
  type NotificationDuration,
  NOTIFICATION_DEFAULTS,
  NOTIFICATION_DURATION,
};
