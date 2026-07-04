import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createContext,
} from "react";
import ReactDOM from "react-dom";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { mapSizeToAvailable } from "../shared";
import {
  MessageProps,
  MessageProviderProps,
  MessageItem,
  MessageContextValue,
  MessageInstance,
  MessageConfig,
  MessageArgsProps,
  MessageType,
  UseMessageReturn,
  getAccessibilityMessageText,
  getMessageAutoCloseDelay,
  MESSAGE_DEFAULTS,
  MESSAGE_DURATIONS,
  generateMessageKey,
  isMessageExpired,
  sortMessagesByPlacement,
} from "./Message.types";
import {
  StyledMessageWrapper,
  StyledMessage,
  StyledMessageIcon,
  StyledMessageContent,
  StyledCloseButton,
} from "./Message.styles";

// =============================================================================
// ICONS
// =============================================================================

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
    />
  </svg>
);

const ExclamationTriangleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
  </svg>
);

const LoadingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 0 1 7.75 6h-1.54a6.5 6.5 0 1 0-12.42 0H.25A8 8 0 0 1 8 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 4.586L10.293.293a1 1 0 0 1 1.414 1.414L7.414 6l4.293 4.293a1 1 0 0 1-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L4.586 6 .293 1.707A1 1 0 0 1 1.707.293L6 4.586z" />
  </svg>
);

// =============================================================================
// CONTEXT
// =============================================================================

const MessageContext = createContext<MessageContextValue | null>(null);

// =============================================================================
// HOOKS
// =============================================================================

const useMessageTimer = (duration: number | null, onExpire: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startTimer = useCallback(() => {
    if (duration === null) return;

    timerRef.current = setTimeout(() => {
      onExpire();
    }, duration);
  }, [duration, onExpire]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  return { pauseTimer, resumeTimer };
};

const useMessageState = (config: MessageConfig) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const add = useCallback(
    (message: Omit<MessageItem, "key" | "createdAt">): string | number => {
      const key = generateMessageKey();
      const newMessage: MessageItem = {
        ...message,
        key,
        createdAt: Date.now(),
      };

      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) => !isMessageExpired(msg.createdAt, msg.duration)
        );
        const newMessages = [...filtered, newMessage];

        // Respect maxCount
        if (config.maxCount && newMessages.length > config.maxCount) {
          return newMessages.slice(-config.maxCount);
        }

        return newMessages;
      });

      return key;
    },
    [config.maxCount]
  );

  const remove = useCallback((key: string | number) => {
    setMessages((prev) => prev.filter((msg) => msg.key !== key));
  }, []);

  const removeAll = useCallback(() => {
    setMessages([]);
  }, []);

  // Auto-cleanup expired messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) =>
        prev.filter((msg) => !isMessageExpired(msg.createdAt, msg.duration))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { messages, add, remove, removeAll };
};

// =============================================================================
// MESSAGE ITEM COMPONENT
// =============================================================================

const MessageItemComponent: React.FC<{
  message: MessageItem;
  onClose: (key: string | number) => void;
}> = ({ message, onClose }) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const personalizedProps = {
    accessibility: { ...contextAccessibility, ...message.accessibility },
  };

  const [isExiting, setIsExiting] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  // Mapped size for shared systems
  const mappedSize = mapSizeToAvailable(message.size, [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
  ]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(message.key);
      message.onClose?.();
    }, 300); // Animation duration
  }, [message.key, message.onClose, onClose]);

  const { pauseTimer, resumeTimer } = useMessageTimer(
    message.duration,
    handleClose
  );

  const handleMouseEnter = useCallback(() => {
    pauseTimer();
  }, [pauseTimer]);

  const handleMouseLeave = useCallback(() => {
    resumeTimer();
  }, [resumeTimer]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      message.onClick?.(event);
    },
    [message.onClick]
  );

  const renderIcon = () => {
    if (message.icon) {
      return message.icon;
    }

    if (!message.showIcon) {
      return null;
    }

    const iconMap = {
      success: <CheckCircleIcon />,
      error: <XCircleIcon />,
      warning: <ExclamationTriangleIcon />,
      info: <InfoCircleIcon />,
      loading: <LoadingIcon />,
    };

    return iconMap[message.type];
  };

  // Accessibility message
  const accessibilityMessage = getAccessibilityMessageText(
    message.type,
    message.content
  );

  return (
    <StyledMessage
      ref={messageRef}
      className={`${message.className || ""} ${
        isExiting ? "message-exit" : ""
      } ${message.duration ? "has-duration" : ""}`}
      style={{
        ...message.style,
        ...(message.duration &&
          ({ "--duration": `${message.duration}ms` } as any)),
      }}
      $type={message.type}
      $size={mappedSize}
      $variant={message.variant}
      $showIcon={message.showIcon}
      $closable={message.closable}
      $placement={message.placement}
      accessibility={personalizedProps.accessibility}
      role="alert"
      aria-live="polite"
      aria-label={accessibilityMessage}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {message.showIcon && (
        <StyledMessageIcon
          $type={message.type}
          $size={mappedSize}
          accessibility={personalizedProps.accessibility}
        >
          {renderIcon()}
        </StyledMessageIcon>
      )}

      <StyledMessageContent
        $size={mappedSize}
        $hasIcon={message.showIcon}
        accessibility={personalizedProps.accessibility}
      >
        {message.content}
      </StyledMessageContent>

      {message.closable && (
        <StyledCloseButton
          type="button"
          onClick={handleClose}
          $size={mappedSize}
          accessibility={personalizedProps.accessibility}
          aria-label="Close message"
        >
          <CloseIcon />
        </StyledCloseButton>
      )}
    </StyledMessage>
  );
};

// =============================================================================
// MESSAGE CONTAINER COMPONENT
// =============================================================================

const MessageContainerComponent: React.FC<{
  messages: MessageItem[];
  config: MessageConfig;
  onRemove: (key: string | number) => void;
}> = ({ messages, config, onRemove }) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const personalizedProps = {
    accessibility: { ...contextAccessibility },
  };

  const groupedMessages = sortMessagesByPlacement(messages);

  return (
    <>
      {Object.entries(groupedMessages).map(
        ([placement, placementMessages]) =>
          placementMessages.length > 0 && (
            <StyledMessageWrapper
              key={placement}
              $placement={placement as any}
              $top={config.top}
              $bottom={config.bottom}
              accessibility={personalizedProps.accessibility}
            >
              {placementMessages.map((message) => (
                <MessageItemComponent
                  key={message.key}
                  message={message}
                  onClose={onRemove}
                />
              ))}
            </StyledMessageWrapper>
          )
      )}
    </>
  );
};

// =============================================================================
// MESSAGE PROVIDER
// =============================================================================

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
  config: configProp = {},
}) => {
  const config: MessageConfig = useMemo(
    () => ({
      top: MESSAGE_DEFAULTS.top,
      bottom: MESSAGE_DEFAULTS.bottom,
      duration: MESSAGE_DEFAULTS.duration,
      maxCount: MESSAGE_DEFAULTS.maxCount,
      placement: MESSAGE_DEFAULTS.placement,
      ...configProp,
    }),
    [configProp]
  );

  const messageState = useMessageState(config);

  const contextValue: MessageContextValue = useMemo(
    () => ({
      ...messageState,
      config,
    }),
    [messageState, config]
  );

  const container = config.getContainer?.() || document.body;

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      {ReactDOM.createPortal(
        <MessageContainerComponent
          messages={messageState.messages}
          config={config}
          onRemove={messageState.remove}
        />,
        container
      )}
    </MessageContext.Provider>
  );
};

// =============================================================================
// BASE MESSAGE COMPONENT
// =============================================================================

export const Message: React.FC<MessageProps> = ({
  children,
  content,

  // Appearance
  type = MESSAGE_DEFAULTS.type,
  size = MESSAGE_DEFAULTS.size,
  variant = MESSAGE_DEFAULTS.variant,
  icon,

  // Behavior
  duration = MESSAGE_DEFAULTS.duration,
  showIcon = MESSAGE_DEFAULTS.showIcon,
  closable = MESSAGE_DEFAULTS.closable,

  // Position and Layout
  placement = MESSAGE_DEFAULTS.placement,
  top,
  bottom,

  // Events
  onClose,
  onClick,
  afterClose,

  // Styling
  className,
  style,

  // Accessibility
  accessibility: accessibilityProp,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  role = "alert",

  ...rest
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const personalizedProps = {
    accessibility: { ...contextAccessibility, ...accessibilityProp },
  };

  // Mapped size for shared systems
  const mappedSize = mapSizeToAvailable(size, [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
  ]);

  const displayContent = content || children;
  const finalDuration =
    duration || getMessageAutoCloseDelay(displayContent, duration);

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
      afterClose?.();
    }, 300);
  }, [onClose, afterClose]);

  const { pauseTimer, resumeTimer } = useMessageTimer(
    finalDuration,
    handleClose
  );

  const handleMouseEnter = useCallback(() => {
    pauseTimer();
  }, [pauseTimer]);

  const handleMouseLeave = useCallback(() => {
    resumeTimer();
  }, [resumeTimer]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
    },
    [onClick]
  );

  const renderIcon = () => {
    if (icon) {
      return icon;
    }

    if (!showIcon) {
      return null;
    }

    const iconMap = {
      success: <CheckCircleIcon />,
      error: <XCircleIcon />,
      warning: <ExclamationTriangleIcon />,
      info: <InfoCircleIcon />,
      loading: <LoadingIcon />,
    };

    return iconMap[type];
  };

  if (!isVisible) {
    return null;
  }

  // Accessibility message
  const accessibilityMessage = getAccessibilityMessageText(
    type,
    displayContent
  );

  const finalId = id ? `message-${id}` : undefined;

  return (
    <StyledMessage
      id={finalId}
      className={`${className || ""} ${finalDuration ? "has-duration" : ""}`}
      style={{
        ...style,
        ...(finalDuration && ({ "--duration": `${finalDuration}ms` } as any)),
      }}
      $type={type}
      $size={mappedSize}
      $variant={variant}
      $showIcon={showIcon}
      $closable={closable}
      $placement={placement}
      accessibility={personalizedProps.accessibility}
      role={role}
      aria-live="polite"
      aria-label={ariaLabel || accessibilityMessage}
      aria-describedby={ariaDescribedby}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...rest}
    >
      {showIcon && (
        <StyledMessageIcon
          $type={type}
          $size={mappedSize}
          accessibility={personalizedProps.accessibility}
        >
          {renderIcon()}
        </StyledMessageIcon>
      )}

      <StyledMessageContent
        $size={mappedSize}
        $hasIcon={showIcon}
        accessibility={personalizedProps.accessibility}
      >
        {displayContent}
      </StyledMessageContent>

      {closable && (
        <StyledCloseButton
          type="button"
          onClick={handleClose}
          $size={mappedSize}
          accessibility={personalizedProps.accessibility}
          aria-label="Close message"
        >
          <CloseIcon />
        </StyledCloseButton>
      )}
    </StyledMessage>
  );
};

// =============================================================================
// MESSAGE API HOOK
// =============================================================================

export const useMessage = (): UseMessageReturn => {
  const [messageHolder, setMessageHolder] = useState<React.ReactElement | null>(
    null
  );
  const messageState = useMessageState({
    maxCount: MESSAGE_DEFAULTS.maxCount,
    duration: MESSAGE_DEFAULTS.duration,
    placement: MESSAGE_DEFAULTS.placement,
  });

  const messageApi: MessageInstance = useMemo(() => {
    const createMessage = (
      type: MessageType,
      content: React.ReactNode | MessageArgsProps,
      duration?: number | null,
      onClose?: () => void
    ) => {
      const messageProps: Omit<MessageItem, "key" | "createdAt"> = {
        type,
        content:
          content && typeof content === "object" && "content" in content
            ? content.content
            : content || "",
        duration: duration !== undefined ? duration : MESSAGE_DEFAULTS.duration,
        placement: MESSAGE_DEFAULTS.placement,
        size: MESSAGE_DEFAULTS.size,
        variant: MESSAGE_DEFAULTS.variant,
        showIcon: MESSAGE_DEFAULTS.showIcon,
        closable: MESSAGE_DEFAULTS.closable,
        onClose,
        ...(content && typeof content === "object" && "content" in content
          ? content
          : {}),
      };

      messageState.add(messageProps);
    };

    return {
      success: (content, duration, onClose) =>
        createMessage("success", content, duration, onClose),
      error: (content, duration, onClose) =>
        createMessage("error", content, duration, onClose),
      info: (content, duration, onClose) =>
        createMessage("info", content, duration, onClose),
      warning: (content, duration, onClose) =>
        createMessage("warning", content, duration, onClose),
      loading: (content, duration, onClose) =>
        createMessage("loading", content, duration, onClose),
      open: (args) => createMessage(args.type || "info", args),
      destroy: (key) => {
        if (key) {
          messageState.remove(key);
        } else {
          messageState.removeAll();
        }
      },
      config: () => {
        // Static config not supported in hook version
      },
    };
  }, [messageState]);

  useEffect(() => {
    setMessageHolder(
      <MessageContainerComponent
        messages={messageState.messages}
        config={{
          maxCount: MESSAGE_DEFAULTS.maxCount,
          duration: MESSAGE_DEFAULTS.duration,
          placement: MESSAGE_DEFAULTS.placement,
        }}
        onRemove={messageState.remove}
      />
    );
  }, [messageState.messages, messageState.remove]);

  return [messageApi, messageHolder || <div />] as const;
};

// =============================================================================
// STATIC MESSAGE API
// =============================================================================

let messageConfig: MessageConfig = {
  top: MESSAGE_DEFAULTS.top,
  bottom: MESSAGE_DEFAULTS.bottom,
  duration: MESSAGE_DEFAULTS.duration,
  maxCount: MESSAGE_DEFAULTS.maxCount,
  placement: MESSAGE_DEFAULTS.placement,
};

const messageQueue: MessageItem[] = [];
const messageRemovers: Set<(key: string | number) => void> = new Set();

const addMessageToQueue = (message: Omit<MessageItem, "key" | "createdAt">) => {
  const messageItem: MessageItem = {
    ...message,
    key: generateMessageKey(),
    createdAt: Date.now(),
  };

  messageQueue.push(messageItem);

  // Respect maxCount
  if (messageConfig.maxCount && messageQueue.length > messageConfig.maxCount) {
    messageQueue.splice(0, messageQueue.length - messageConfig.maxCount);
  }

  // Trigger re-render for all message containers
  messageRemovers.forEach((remove) => {
    // This is a simplified approach - in a real implementation,
    // you'd want to use a more sophisticated state management
  });

  return messageItem.key;
};

const removeMessageFromQueue = (key: string | number) => {
  const index = messageQueue.findIndex((msg) => msg.key === key);
  if (index !== -1) {
    messageQueue.splice(index, 1);
  }
};

const createStaticMessageMethod = (type: MessageType) => {
  return (
    content: React.ReactNode | MessageArgsProps,
    duration?: number | null,
    onClose?: () => void
  ) => {
    const messageProps: Omit<MessageItem, "key" | "createdAt"> = {
      type,
      content:
        content && typeof content === "object" && "content" in content
          ? content.content
          : content || "",
      duration:
        duration !== undefined
          ? duration
          : messageConfig.duration || MESSAGE_DEFAULTS.duration,
      placement: messageConfig.placement || MESSAGE_DEFAULTS.placement,
      size: MESSAGE_DEFAULTS.size,
      variant: MESSAGE_DEFAULTS.variant,
      showIcon: MESSAGE_DEFAULTS.showIcon,
      closable: MESSAGE_DEFAULTS.closable,
      onClose,
      ...(content && typeof content === "object" && "content" in content
        ? content
        : {}),
    };

    return addMessageToQueue(messageProps);
  };
};

// Static API
export const message: MessageInstance = {
  success: createStaticMessageMethod("success"),
  error: createStaticMessageMethod("error"),
  info: createStaticMessageMethod("info"),
  warning: createStaticMessageMethod("warning"),
  loading: createStaticMessageMethod("loading"),
  open: (args) => {
    const messageProps: Omit<MessageItem, "key" | "createdAt"> = {
      type: args.type || "info",
      content: args.content || "",
      duration:
        args.duration !== undefined
          ? args.duration
          : messageConfig.duration || MESSAGE_DEFAULTS.duration,
      placement: messageConfig.placement || MESSAGE_DEFAULTS.placement,
      size: MESSAGE_DEFAULTS.size,
      variant: MESSAGE_DEFAULTS.variant,
      showIcon: MESSAGE_DEFAULTS.showIcon,
      closable: MESSAGE_DEFAULTS.closable,
      onClose: args.onClose,
      onClick: args.onClick,
      icon: args.icon,
      style: args.style,
      className: args.className,
    };

    return addMessageToQueue(messageProps);
  },
  destroy: (key) => {
    if (key) {
      removeMessageFromQueue(key);
    } else {
      messageQueue.length = 0;
    }
  },
  config: (options) => {
    messageConfig = { ...messageConfig, ...options };
  },
};

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Message Types
export const SuccessMessageComponent: React.FC<Omit<MessageProps, "type">> = (
  props
) => <Message {...props} type="success" />;

export const ErrorMessageComponent: React.FC<Omit<MessageProps, "type">> = (
  props
) => <Message {...props} type="error" />;

export const WarningMessageComponent: React.FC<Omit<MessageProps, "type">> = (
  props
) => <Message {...props} type="warning" />;

export const InfoMessageComponent: React.FC<Omit<MessageProps, "type">> = (
  props
) => <Message {...props} type="info" />;

export const LoadingMessageComponent: React.FC<Omit<MessageProps, "type">> = (
  props
) => <Message {...props} type="loading" />;

// Message Sizes
export const SmallMessage: React.FC<Omit<MessageProps, "size">> = (props) => (
  <Message {...props} size="sm" />
);

export const MediumMessage: React.FC<Omit<MessageProps, "size">> = (props) => (
  <Message {...props} size="md" />
);

export const LargeMessage: React.FC<Omit<MessageProps, "size">> = (props) => (
  <Message {...props} size="lg" />
);

export const ExtraLargeMessage: React.FC<Omit<MessageProps, "size">> = (
  props
) => <Message {...props} size="xl" />;

// Message Variants
export const PrimaryMessage: React.FC<Omit<MessageProps, "variant">> = (
  props
) => <Message {...props} variant="primary" />;

export const SecondaryMessage: React.FC<Omit<MessageProps, "variant">> = (
  props
) => <Message {...props} variant="secondary" />;

// Message Behaviors
export const PersistentMessage: React.FC<Omit<MessageProps, "duration">> = (
  props
) => <Message {...props} duration={null} />;

export const ClosableMessage: React.FC<Omit<MessageProps, "closable">> = (
  props
) => <Message {...props} closable />;

export const IconlessMessage: React.FC<Omit<MessageProps, "showIcon">> = (
  props
) => <Message {...props} showIcon={false} />;

// Message Placements
export const TopMessage: React.FC<Omit<MessageProps, "placement">> = (
  props
) => <Message {...props} placement="top" />;

export const TopLeftMessage: React.FC<Omit<MessageProps, "placement">> = (
  props
) => <Message {...props} placement="topLeft" />;

export const TopRightMessage: React.FC<Omit<MessageProps, "placement">> = (
  props
) => <Message {...props} placement="topRight" />;

export const BottomMessage: React.FC<Omit<MessageProps, "placement">> = (
  props
) => <Message {...props} placement="bottom" />;

export const BottomLeftMessage: React.FC<Omit<MessageProps, "placement">> = (
  props
) => <Message {...props} placement="bottomLeft" />;

export const BottomRightMessage: React.FC<Omit<MessageProps, "placement">> = (
  props
) => <Message {...props} placement="bottomRight" />;

// Specific Use Cases
export const ToastMessage: React.FC<MessageProps> = (props) => (
  <Message
    {...props}
    size="sm"
    duration={MESSAGE_DURATIONS.short}
    placement="top"
    showIcon
  />
);

export const NotificationMessage: React.FC<MessageProps> = (props) => (
  <Message
    {...props}
    size="md"
    duration={MESSAGE_DURATIONS.medium}
    placement="topRight"
    closable
    showIcon
  />
);

export const AlertMessage: React.FC<MessageProps> = (props) => (
  <Message
    {...props}
    size="lg"
    duration={null}
    placement="top"
    closable
    showIcon
  />
);

export const StatusMessage: React.FC<MessageProps> = (props) => (
  <Message
    {...props}
    size="sm"
    duration={MESSAGE_DURATIONS.long}
    placement="bottomLeft"
    showIcon={false}
  />
);

/**
 * Message Component
 *
 * A comprehensive message system for displaying notifications, alerts, and feedback
 * to users. Supports toast messages, global notifications, and contextual alerts
 * with full accessibility and positioning control.
 *
 * @example
 * // Basic message
 * <Message type="success">
 *   Operation completed successfully!
 * </Message>
 *
 * @example
 * // Using message API
 * const [messageApi, contextHolder] = useMessage();
 *
 * const showMessage = () => {
 *   messageApi.success('Hello world!');
 * };
 *
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={showMessage}>Show Message</Button>
 *   </>
 * );
 *
 * @example
 * // Static API
 * message.success('Success message');
 * message.error('Error message');
 * message.warning('Warning message');
 * message.info('Info message');
 * message.loading('Loading message');
 *
 * @example
 * // Message Provider
 * <MessageProvider config={{ placement: 'topRight', maxCount: 5 }}>
 *   <App />
 * </MessageProvider>
 *
 * @example
 * // Persistent closable message
 * <PersistentMessage type="warning" closable>
 *   This message stays until manually dismissed
 * </PersistentMessage>
 */
