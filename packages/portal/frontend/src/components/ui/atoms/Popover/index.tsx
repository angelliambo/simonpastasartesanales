import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import {
  PopoverProps,
  PopoverRef,
  PopoverPlacement,
  PopoverTrigger,
  PopoverContentProps,
} from "./Popover.types";
import {
  StyledPopover,
  StyledPopoverContent,
  StyledPopoverTitle,
  StyledPopoverBody,
  StyledPopoverArrow,
  StyledPopoverOverlay,
  TooltipPopover,
  ConfirmPopover,
  MenuPopover,
  PopoverSkeleton,
  PopoverEmpty,
  PopoverCardLayout,
  PopoverListLayout,
} from "./Popover.styles";

// =============================================================================
// CONSTANTS
// =============================================================================

const POPOVER_DEFAULTS = {
  placement: "top" as PopoverPlacement,
  trigger: "hover" as PopoverTrigger,
  showArrow: true,
  autoAdjustOverflow: true,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  destroyTooltipOnHide: false,
  getPopupContainer: () => document.body,
};

const ARROW_POSITIONS: Record<PopoverPlacement, React.CSSProperties> = {
  top: {
    top: "100%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    marginTop: "-4px",
  },
  topLeft: {
    top: "100%",
    left: "16px",
    transform: "translateY(-50%)",
    marginTop: "-4px",
  },
  topRight: {
    top: "100%",
    right: "16px",
    transform: "translateY(-50%)",
    marginTop: "-4px",
  },
  bottom: {
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%) translateY(50%)",
    marginBottom: "-4px",
  },
  bottomLeft: {
    bottom: "100%",
    left: "16px",
    transform: "translateY(50%)",
    marginBottom: "-4px",
  },
  bottomRight: {
    bottom: "100%",
    right: "16px",
    transform: "translateY(50%)",
    marginBottom: "-4px",
  },
  left: {
    left: "100%",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    marginLeft: "-4px",
  },
  leftTop: {
    left: "100%",
    top: "16px",
    transform: "translateX(-50%)",
    marginLeft: "-4px",
  },
  leftBottom: {
    left: "100%",
    bottom: "16px",
    transform: "translateX(-50%)",
    marginLeft: "-4px",
  },
  right: {
    right: "100%",
    top: "50%",
    transform: "translateX(50%) translateY(-50%)",
    marginRight: "-4px",
  },
  rightTop: {
    right: "100%",
    top: "16px",
    transform: "translateX(50%)",
    marginRight: "-4px",
  },
  rightBottom: {
    right: "100%",
    bottom: "16px",
    transform: "translateX(50%)",
    marginRight: "-4px",
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getPopoverPosition = (
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  placement: PopoverPlacement,
  autoAdjustOverflow: boolean
): { style: React.CSSProperties; finalPlacement: PopoverPlacement } => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let finalPlacement = placement;
  let top = 0;
  let left = 0;

  // Calculate base position
  switch (placement) {
    case "top":
    case "topLeft":
    case "topRight":
      top = triggerRect.top + scrollY - popoverRect.height - 8;
      break;
    case "bottom":
    case "bottomLeft":
    case "bottomRight":
      top = triggerRect.bottom + scrollY + 8;
      break;
    case "left":
    case "leftTop":
    case "leftBottom":
      left = triggerRect.left + scrollX - popoverRect.width - 8;
      break;
    case "right":
    case "rightTop":
    case "rightBottom":
      left = triggerRect.right + scrollX + 8;
      break;
  }

  // Calculate left position for vertical placements
  if (placement.startsWith("top") || placement.startsWith("bottom")) {
    if (placement.endsWith("Left")) {
      left = triggerRect.left + scrollX;
    } else if (placement.endsWith("Right")) {
      left = triggerRect.right + scrollX - popoverRect.width;
    } else {
      left =
        triggerRect.left +
        scrollX +
        triggerRect.width / 2 -
        popoverRect.width / 2;
    }
  }

  // Calculate top position for horizontal placements
  if (placement.startsWith("left") || placement.startsWith("right")) {
    if (placement.endsWith("Top")) {
      top = triggerRect.top + scrollY;
    } else if (placement.endsWith("Bottom")) {
      top = triggerRect.bottom + scrollY - popoverRect.height;
    } else {
      top =
        triggerRect.top +
        scrollY +
        triggerRect.height / 2 -
        popoverRect.height / 2;
    }
  }

  // Auto-adjust for overflow if enabled
  if (autoAdjustOverflow) {
    // Check horizontal overflow
    if (left < scrollX + 8) {
      left = scrollX + 8;
      if (placement === "top") finalPlacement = "topLeft";
      if (placement === "bottom") finalPlacement = "bottomLeft";
    } else if (left + popoverRect.width > scrollX + viewportWidth - 8) {
      left = scrollX + viewportWidth - popoverRect.width - 8;
      if (placement === "top") finalPlacement = "topRight";
      if (placement === "bottom") finalPlacement = "bottomRight";
    }

    // Check vertical overflow
    if (top < scrollY + 8) {
      if (placement.startsWith("top")) {
        // Flip to bottom
        top = triggerRect.bottom + scrollY + 8;
        finalPlacement = placement.replace("top", "bottom") as PopoverPlacement;
      } else {
        top = scrollY + 8;
      }
    } else if (top + popoverRect.height > scrollY + viewportHeight - 8) {
      if (placement.startsWith("bottom")) {
        // Flip to top
        top = triggerRect.top + scrollY - popoverRect.height - 8;
        finalPlacement = placement.replace("bottom", "top") as PopoverPlacement;
      } else {
        top = scrollY + viewportHeight - popoverRect.height - 8;
      }
    }
  }

  return {
    style: {
      position: "absolute" as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 1050,
    },
    finalPlacement,
  };
};

const canUseDOM = () => {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
};

// =============================================================================
// POPOVER CONTENT COMPONENT
// =============================================================================

const PopoverContent: React.FC<PopoverContentProps> = ({
  title,
  content,
  placement,
  showArrow,
  onClose,
  style,
  className,
  overlayClassName,
  overlayStyle,
  children,
  ...props
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const accessibility = useMemo(
    () => ({
      reducedMotion:
        contextAccessibility.reduceMotion ||
        contextAccessibility.disableAnimations,
      highContrast: contextAccessibility.highContrast,
      largeText: contextAccessibility.fontSizeMultiplier > 1,
      increasedSpacing: contextAccessibility.increasedSpacing,
    }),
    [contextAccessibility]
  );

  return (
    <>
      {/* Overlay for click outside detection */}
      <StyledPopoverOverlay
        data-testid="popover-overlay"
        onClick={onClose}
        style={overlayStyle}
        className={overlayClassName}
      />

      {/* Popover content */}
      <StyledPopoverContent
        data-testid="popover-content"
        $placement={placement}
        $hasTitle={!!title}
        $hasArrow={showArrow}
        accessibility={accessibility}
        style={style}
        className={className}
        {...props}
      >
        {/* Arrow */}
        {showArrow && (
          <StyledPopoverArrow
            data-testid="popover-arrow"
            $placement={placement}
            accessibility={accessibility}
            style={ARROW_POSITIONS[placement]}
          />
        )}

        {/* Title */}
        {title && (
          <StyledPopoverTitle accessibility={accessibility}>
            {title}
          </StyledPopoverTitle>
        )}

        {/* Content */}
        <StyledPopoverBody accessibility={accessibility}>
          {content || children}
        </StyledPopoverBody>
      </StyledPopoverContent>
    </>
  );
};

// =============================================================================
// MAIN POPOVER COMPONENT
// =============================================================================

export const Popover = forwardRef<PopoverRef, PopoverProps>(
  (
    {
      children,
      content,
      title,
      placement = POPOVER_DEFAULTS.placement,
      trigger = POPOVER_DEFAULTS.trigger,
      open: openProp,
      defaultOpen = false,
      showArrow = POPOVER_DEFAULTS.showArrow,
      autoAdjustOverflow = POPOVER_DEFAULTS.autoAdjustOverflow,
      mouseEnterDelay = POPOVER_DEFAULTS.mouseEnterDelay,
      mouseLeaveDelay = POPOVER_DEFAULTS.mouseLeaveDelay,
      destroyTooltipOnHide = POPOVER_DEFAULTS.destroyTooltipOnHide,
      getPopupContainer = POPOVER_DEFAULTS.getPopupContainer,
      overlayClassName,
      overlayStyle,
      onOpenChange,
      onVisibleChange,
      className,
      style,
      id,
      ...props
    },
    ref
  ) => {
    // =============================================================================
    // STATE AND REFS
    // =============================================================================

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [finalPlacement, setFinalPlacement] = useState(placement);
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : internalOpen;

    const triggerRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const enterTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const leaveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [containerElement, setContainerElement] = useState<HTMLElement | null>(
      () => (canUseDOM() ? getPopupContainer() : null)
    );

    // =============================================================================
    // PERSONALIZATION AND ACCESSIBILITY
    // =============================================================================

    const { accessibility: contextAccessibility } = usePersonalization();
    const accessibility = useMemo(
      () => ({
        reducedMotion:
          contextAccessibility.reduceMotion ||
          contextAccessibility.disableAnimations,
        highContrast: contextAccessibility.highContrast,
        largeText: contextAccessibility.fontSizeMultiplier > 1,
        increasedSpacing: contextAccessibility.increasedSpacing,
      }),
      [contextAccessibility]
    );

    // =============================================================================
    // HANDLERS
    // =============================================================================

    const updateOpen = useCallback(
      (newOpen: boolean, event?: Event) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }

        onOpenChange?.(newOpen);
        onVisibleChange?.(newOpen);
      },
      [isControlled, onOpenChange, onVisibleChange]
    );

    const handleOpen = useCallback(
      (event?: Event) => {
        if (enterTimerRef.current) {
          clearTimeout(enterTimerRef.current);
        }
        if (leaveTimerRef.current) {
          clearTimeout(leaveTimerRef.current);
        }

        enterTimerRef.current = setTimeout(() => {
          updateOpen(true, event);
        }, mouseEnterDelay * 1000);
      },
      [mouseEnterDelay, updateOpen]
    );

    const handleClose = useCallback(
      (event?: Event) => {
        if (enterTimerRef.current) {
          clearTimeout(enterTimerRef.current);
        }
        if (leaveTimerRef.current) {
          clearTimeout(leaveTimerRef.current);
        }

        leaveTimerRef.current = setTimeout(() => {
          updateOpen(false, event);
        }, mouseLeaveDelay * 1000);
      },
      [mouseLeaveDelay, updateOpen]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        updateOpen(!open, event.nativeEvent);
      },
      [open, updateOpen]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent) => {
        handleOpen(event.nativeEvent);
      },
      [handleOpen]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent) => {
        // Only close if focus is moving outside the popover system
        if (!popoverRef.current?.contains(event.relatedTarget as Node)) {
          handleClose(event.nativeEvent);
        }
      },
      [handleClose]
    );

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent) => {
        handleOpen(event.nativeEvent);
      },
      [handleOpen]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent) => {
        handleClose(event.nativeEvent);
      },
      [handleClose]
    );

    const handleContextMenu = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        updateOpen(true, event.nativeEvent);
      },
      [updateOpen]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          updateOpen(false, event.nativeEvent);
        } else if (event.key === "Enter" || event.key === " ") {
          if (trigger === "click" || trigger === "focus") {
            event.preventDefault();
            updateOpen(!open, event.nativeEvent);
          }
        }
      },
      [open, trigger, updateOpen]
    );

    // =============================================================================
    // POSITION CALCULATION
    // =============================================================================

    const updatePosition = useCallback(() => {
      if (!open || !triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      const { style: newStyle, finalPlacement: newPlacement } =
        getPopoverPosition(
          triggerRect,
          popoverRect,
          placement,
          autoAdjustOverflow
        );

      setPopoverStyle(newStyle);
      setFinalPlacement(newPlacement);
    }, [open, placement, autoAdjustOverflow]);

    // =============================================================================
    // EFFECTS
    // =============================================================================

    // Update position when open changes or on scroll/resize
    useEffect(() => {
      if (open) {
        updatePosition();

        const handleUpdate = () => updatePosition();

        window.addEventListener("scroll", handleUpdate, true);
        window.addEventListener("resize", handleUpdate);

        return () => {
          window.removeEventListener("scroll", handleUpdate, true);
          window.removeEventListener("resize", handleUpdate);
        };
      }
    }, [open, updatePosition]);

    // Get container element
    useEffect(() => {
      if (canUseDOM()) {
        setContainerElement(getPopupContainer());
      }
    }, [getPopupContainer]);

    // Cleanup timers
    useEffect(() => {
      return () => {
        if (enterTimerRef.current) {
          clearTimeout(enterTimerRef.current);
        }
        if (leaveTimerRef.current) {
          clearTimeout(leaveTimerRef.current);
        }
      };
    }, []);

    // =============================================================================
    // CLICK OUTSIDE HANDLING
    // =============================================================================

    useClickOutside(
      popoverRef,
      useCallback(
        (event: Event) => {
          if (
            open &&
            trigger === "click" &&
            !triggerRef.current?.contains(event.target as Node)
          ) {
            updateOpen(false, event);
          }
        },
        [open, trigger, updateOpen]
      ),
      open
    );

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================

    useImperativeHandle(ref, () => ({
      open: () => updateOpen(true),
      close: () => updateOpen(false),
      toggle: () => updateOpen(!open),
      updatePosition,
      element: triggerRef.current,
    }));

    // =============================================================================
    // TRIGGER ELEMENT SETUP
    // =============================================================================

    const triggerElement = useMemo(() => {
      if (!isValidElement(children)) {
        return <span ref={triggerRef}>{children}</span>;
      }

      const triggerProps: Record<string, any> = {
        ref: (node: HTMLElement) => {
          triggerRef.current = node;
          if (typeof (children as any).ref === "function") {
            (children as any).ref(node);
          } else if ((children as any).ref) {
            (children as any).ref.current = node;
          }
        },
        onKeyDown: (event: React.KeyboardEvent) => {
          handleKeyDown(event);
          (children as any).props?.onKeyDown?.(event);
        },
      };

      // Add trigger-specific props
      if (trigger === "hover") {
        triggerProps.onMouseEnter = (event: React.MouseEvent) => {
          handleMouseEnter(event);
          (children as any).props?.onMouseEnter?.(event);
        };
        triggerProps.onMouseLeave = (event: React.MouseEvent) => {
          handleMouseLeave(event);
          (children as any).props?.onMouseLeave?.(event);
        };
      } else if (trigger === "click") {
        triggerProps.onClick = (event: React.MouseEvent) => {
          handleClick(event);
          (children as any).props?.onClick?.(event);
        };
      } else if (trigger === "focus") {
        triggerProps.onFocus = (event: React.FocusEvent) => {
          handleFocus(event);
          (children as any).props?.onFocus?.(event);
        };
        triggerProps.onBlur = (event: React.FocusEvent) => {
          handleBlur(event);
          (children as any).props?.onBlur?.(event);
        };
      } else if (trigger === "contextMenu") {
        triggerProps.onContextMenu = (event: React.MouseEvent) => {
          handleContextMenu(event);
          (children as any).props?.onContextMenu?.(event);
        };
      }

      return cloneElement(children as ReactElement, triggerProps);
    }, [
      children,
      trigger,
      handleClick,
      handleFocus,
      handleBlur,
      handleMouseEnter,
      handleMouseLeave,
      handleContextMenu,
      handleKeyDown,
    ]);

    // =============================================================================
    // RENDER
    // =============================================================================

    const finalId = id ? `popover-${id}` : undefined;

    return (
      <>
        <StyledPopover
          id={finalId}
          $trigger={Array.isArray(trigger) ? trigger[0] : trigger}
          $placement={finalPlacement}
          $open={open}
          accessibility={accessibility}
          className={className}
          style={style}
          {...props}
        >
          {triggerElement}
        </StyledPopover>

        {/* Portal for popover content */}
        {open &&
          containerElement &&
          canUseDOM() &&
          createPortal(
            <div ref={popoverRef}>
              <PopoverContent
                title={title}
                content={content}
                placement={finalPlacement}
                showArrow={showArrow}
                onClose={() => updateOpen(false)}
                style={popoverStyle}
                overlayClassName={overlayClassName}
                overlayStyle={overlayStyle}
              />
            </div>,
            containerElement
          )}
      </>
    );
  }
);

Popover.displayName = "Popover";

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Basic Types
export const HoverPopover: React.FC<PopoverProps> = (props) => (
  <Popover trigger="hover" {...props} />
);

export const ClickPopover: React.FC<PopoverProps> = (props) => (
  <Popover trigger="click" {...props} />
);

export const FocusPopover: React.FC<PopoverProps> = (props) => (
  <Popover trigger="focus" {...props} />
);

export const ContextMenuPopover: React.FC<PopoverProps> = (props) => (
  <Popover trigger="contextMenu" {...props} />
);

export const ManualPopover: React.FC<PopoverProps> = (props) => (
  <Popover trigger="manual" {...props} />
);

// Placements
export const TopPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="top" {...props} />
);

export const BottomPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="bottom" {...props} />
);

export const LeftPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="left" {...props} />
);

export const RightPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="right" {...props} />
);

export const TopLeftPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="topLeft" {...props} />
);

export const TopRightPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="topRight" {...props} />
);

export const BottomLeftPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="bottomLeft" {...props} />
);

export const BottomRightPopover: React.FC<PopoverProps> = (props) => (
  <Popover placement="bottomRight" {...props} />
);

// Behaviors
export const ArrowlessPopover: React.FC<PopoverProps> = (props) => (
  <Popover showArrow={false} {...props} />
);

export const PersistentPopover: React.FC<PopoverProps> = (props) => (
  <Popover destroyTooltipOnHide={false} {...props} />
);

export const DestroyablePopover: React.FC<PopoverProps> = (props) => (
  <Popover destroyTooltipOnHide={true} {...props} />
);

export const NoOverflowPopover: React.FC<PopoverProps> = (props) => (
  <Popover autoAdjustOverflow={false} {...props} />
);

// Delays
export const FastPopover: React.FC<PopoverProps> = (props) => (
  <Popover mouseEnterDelay={0} mouseLeaveDelay={0} {...props} />
);

export const SlowPopover: React.FC<PopoverProps> = (props) => (
  <Popover mouseEnterDelay={0.5} mouseLeaveDelay={0.5} {...props} />
);

// Variants and Use Cases
export const TooltipPopoverComponent: React.FC<PopoverProps> = (props) => (
  <Popover
    trigger="hover"
    placement="top"
    showArrow={true}
    mouseEnterDelay={0.1}
    mouseLeaveDelay={0.1}
    {...props}
  />
);

export const ConfirmPopoverComponent: React.FC<PopoverProps> = (props) => (
  <Popover
    trigger="click"
    placement="topLeft"
    showArrow={true}
    destroyTooltipOnHide={false}
    {...props}
  />
);

export const MenuPopoverComponent: React.FC<PopoverProps> = (props) => (
  <Popover
    trigger="click"
    placement="bottomLeft"
    showArrow={false}
    destroyTooltipOnHide={true}
    {...props}
  />
);

export const HelpPopover: React.FC<PopoverProps> = (props) => (
  <Popover
    trigger="hover"
    placement="right"
    showArrow={true}
    mouseEnterDelay={0.3}
    mouseLeaveDelay={0.1}
    {...props}
  />
);

export const InfoPopover: React.FC<PopoverProps> = (props) => (
  <Popover
    trigger="click"
    placement="top"
    showArrow={true}
    autoAdjustOverflow={true}
    {...props}
  />
);

export const ActionPopover: React.FC<PopoverProps> = (props) => (
  <Popover
    trigger="click"
    placement="bottomRight"
    showArrow={false}
    destroyTooltipOnHide={true}
    {...props}
  />
);

// Layout Variants
export const CardPopover = PopoverCardLayout;
export const ListPopover = PopoverListLayout;
export const SimpleTooltip = TooltipPopover;
export const ConfirmDialog = ConfirmPopover;
export const ContextMenu = MenuPopover;

// Empty and Loading States
export const LoadingPopover: React.FC<PopoverProps> = (props) => (
  <Popover
    content={
      <PopoverSkeleton data-testid="popover-skeleton">
        <div className="skeleton-title" data-testid="popover-skeleton-title" />
        <div className="skeleton-content" data-testid="popover-skeleton-content" />
      </PopoverSkeleton>
    }
    trigger="click"
    placement="top"
    {...props}
  />
);

export const EmptyPopover: React.FC<PopoverProps> = (props) => (
  <Popover
    content={
      <PopoverEmpty>
        <div className="empty-icon">📝</div>
        <div className="empty-text">No content available</div>
      </PopoverEmpty>
    }
    trigger="click"
    placement="top"
    {...props}
  />
);

export default Popover;
