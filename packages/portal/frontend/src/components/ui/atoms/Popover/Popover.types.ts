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

export type PopoverTrigger =
  | "hover"
  | "click"
  | "focus"
  | "contextMenu"
  | "manual";

export type PopoverPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

export type PopoverSize = AllSize;
export type PopoverVariant = AllVariant;

// =============================================================================
// POPOVER COMPONENT PROPS
// =============================================================================

export interface PopoverProps {
  // Content
  children?: React.ReactNode;
  content?: React.ReactNode;
  title?: React.ReactNode;

  // Behavior
  trigger?: PopoverTrigger | PopoverTrigger[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Positioning
  placement?: PopoverPlacement;
  autoAdjustOverflow?: boolean;
  getPopupContainer?: () => HTMLElement;

  // Timing
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;

  // Styling
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayInnerStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;

  // Arrow
  arrow?: boolean | { pointAtCenter?: boolean };
  showArrow?: boolean;

  // Interaction
  destroyTooltipOnHide?: boolean;
  fresh?: boolean;

  // Events
  onVisibleChange?: (visible: boolean) => void;
  afterOpenChange?: (open: boolean) => void;

  // Accessibility
  accessibility?: AccessibilityProps;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
  /** ID único del componente (opcional) - se concatena con "popover-" */
  id?: string;
}

// =============================================================================
// CONTENT COMPONENT PROPS
// =============================================================================

export interface PopoverContentProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  placement: PopoverPlacement;
  showArrow: boolean;
  onClose: () => void;
  style?: React.CSSProperties;
  className?: string;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledPopoverProps {
  $trigger: PopoverTrigger;
  $placement: PopoverPlacement;
  $open: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledPopoverContentProps {
  $placement: PopoverPlacement;
  $hasTitle: boolean;
  $hasArrow: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledPopoverTitleProps {
  accessibility?: AccessibilityProps;
}

export interface StyledPopoverBodyProps {
  accessibility?: AccessibilityProps;
}

export interface StyledPopoverArrowProps {
  $placement: PopoverPlacement;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// TOOLTIP COMPONENT PROPS (Extended from Popover)
// =============================================================================

export interface TooltipProps extends Omit<PopoverProps, "title" | "content"> {
  title?: React.ReactNode;
  color?: string;
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: PopoverTrigger | PopoverTrigger[];
  placement: PopoverPlacement;
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

// =============================================================================
// REF TYPES
// =============================================================================

export interface PopoverRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
  updatePosition: () => void;
  element: HTMLElement | null;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UsePopoverReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerProps: {
    ref: React.RefObject<HTMLElement>;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onContextMenu?: (e: React.MouseEvent) => void;
  };
  contentProps: {
    ref: React.RefObject<HTMLDivElement>;
    style: React.CSSProperties;
  };
}

// =============================================================================
// POSITIONING TYPES
// =============================================================================

export interface PopoverPosition {
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
  transform?: string;
}

export interface PopoverArrowPosition {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  transform?: string;
}

// =============================================================================
// PREDEFINED VARIANTS TYPES
// =============================================================================

export interface BasicPopoverProps extends Omit<PopoverProps, "placement"> {
  placement?: PopoverPlacement;
}

export interface TooltipPopoverProps
  extends Omit<PopoverProps, "trigger" | "content"> {
  title?: React.ReactNode;
}

export interface ConfirmPopoverProps extends PopoverProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
}

export interface MenuPopoverProps extends PopoverProps {
  menu?: {
    items: Array<{
      key: string;
      label: React.ReactNode;
      icon?: React.ReactNode;
      disabled?: boolean;
      onClick?: () => void;
    }>;
    onClick?: (key: string) => void;
  };
}

// =============================================================================
// ANIMATION TYPES
// =============================================================================

export type PopoverAnimationType = "fade" | "slide" | "zoom" | "none";

export interface PopoverAnimationConfig {
  type: PopoverAnimationType;
  duration: number;
  easing: string;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const POPOVER_DEFAULTS = {
  trigger: "hover" as PopoverTrigger,
  placement: "top" as PopoverPlacement,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  arrow: true,
  autoAdjustOverflow: true,
  destroyTooltipOnHide: false,
  fresh: false,
} as const;

export const POPOVER_PLACEMENTS = [
  "top",
  "topLeft",
  "topRight",
  "bottom",
  "bottomLeft",
  "bottomRight",
  "left",
  "leftTop",
  "leftBottom",
  "right",
  "rightTop",
  "rightBottom",
] as const;

export const POPOVER_TRIGGERS = [
  "hover",
  "click",
  "focus",
  "contextMenu",
  "manual",
] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getPopoverPlacementStyles = (
  placement: PopoverPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect
): PopoverPosition => {
  const styles: Record<PopoverPlacement, PopoverPosition> = {
    top: {
      bottom: triggerRect.height + 8,
      left: "50%",
      transform: "translateX(-50%)",
    },
    topLeft: {
      bottom: triggerRect.height + 8,
      left: 0,
    },
    topRight: {
      bottom: triggerRect.height + 8,
      right: 0,
    },
    bottom: {
      top: triggerRect.height + 8,
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottomLeft: {
      top: triggerRect.height + 8,
      left: 0,
    },
    bottomRight: {
      top: triggerRect.height + 8,
      right: 0,
    },
    left: {
      right: triggerRect.width + 8,
      top: "50%",
      transform: "translateY(-50%)",
    },
    leftTop: {
      right: triggerRect.width + 8,
      top: 0,
    },
    leftBottom: {
      right: triggerRect.width + 8,
      bottom: 0,
    },
    right: {
      left: triggerRect.width + 8,
      top: "50%",
      transform: "translateY(-50%)",
    },
    rightTop: {
      left: triggerRect.width + 8,
      top: 0,
    },
    rightBottom: {
      left: triggerRect.width + 8,
      bottom: 0,
    },
  };

  return styles[placement] || styles.top;
};

export const getPopoverArrowStyles = (
  placement: PopoverPlacement
): PopoverArrowPosition => {
  const arrows: Record<PopoverPlacement, PopoverArrowPosition> = {
    top: {
      bottom: "-4px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
    topLeft: {
      bottom: "-4px",
      left: "16px",
      transform: "rotate(45deg)",
    },
    topRight: {
      bottom: "-4px",
      right: "16px",
      transform: "rotate(45deg)",
    },
    bottom: {
      top: "-4px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
    bottomLeft: {
      top: "-4px",
      left: "16px",
      transform: "rotate(45deg)",
    },
    bottomRight: {
      top: "-4px",
      right: "16px",
      transform: "rotate(45deg)",
    },
    left: {
      right: "-4px",
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
    leftTop: {
      right: "-4px",
      top: "16px",
      transform: "rotate(45deg)",
    },
    leftBottom: {
      right: "-4px",
      bottom: "16px",
      transform: "rotate(45deg)",
    },
    right: {
      left: "-4px",
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
    rightTop: {
      left: "-4px",
      top: "16px",
      transform: "rotate(45deg)",
    },
    rightBottom: {
      left: "-4px",
      bottom: "16px",
      transform: "rotate(45deg)",
    },
  };

  return arrows[placement] || arrows.top;
};

export const getAccessibilityPopoverText = (
  trigger: PopoverTrigger | PopoverTrigger[],
  content: React.ReactNode
): string => {
  const triggerText = Array.isArray(trigger) ? trigger.join(" or ") : trigger;
  const contentText = typeof content === "string" ? content : "Popover content";

  return `Popover triggered by ${triggerText}: ${contentText}`;
};
