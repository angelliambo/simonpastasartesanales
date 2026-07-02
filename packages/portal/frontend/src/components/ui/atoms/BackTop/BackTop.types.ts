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

export type BackTopSize = AllSize;
export type BackTopVariant = AllVariant;
export type BackTopShape = "circle" | "square" | "round";
export type BackTopPlacement = "right" | "left" | "center";

// =============================================================================
// BACKTOP COMPONENT PROPS
// =============================================================================

export interface BackTopProps {
  // Behavior
  visibilityHeight?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: () => HTMLElement | Window;
  
  // Animation
  duration?: number;
  easing?: string;
  smooth?: boolean;
  
  // Styling
  size?: BackTopSize;
  variant?: BackTopVariant;
  shape?: BackTopShape;
  placement?: BackTopPlacement;
  
  // Content
  children?: React.ReactNode;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  
  // Positioning
  right?: number | string;
  left?: number | string;
  bottom?: number | string;
  zIndex?: number;
  
  // Customization
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility
  accessibility?: AccessibilityProps;
  "aria-label"?: string;
  role?: string;
  tabIndex?: number;
  /** ID único del componente (opcional) - se concatena con "back-top-" */
  id?: string;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledBackTopProps {
  $size: BackTopSize;
  $variant: BackTopVariant;
  $shape: BackTopShape;
  $placement: BackTopPlacement;
  $visible: boolean;
  $right?: number | string;
  $left?: number | string;
  $bottom: number | string;
  $zIndex: number;
  accessibility?: AccessibilityProps;
}

export interface StyledBackTopContentProps {
  $hasIcon: boolean;
  $hasText: boolean;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseBackTopReturn {
  visible: boolean;
  scrollToTop: () => void;
  scrollProgress: number;
}

export interface UseScrollProgressOptions {
  container?: HTMLElement | Window;
  throttle?: number;
}

export interface UseScrollProgressReturn {
  scrollTop: number;
  scrollProgress: number;
  documentHeight: number;
  viewportHeight: number;
}

// =============================================================================
// ANIMATION TYPES
// =============================================================================

export interface BackTopScrollAnimation {
  duration: number;
  easing: string;
  smooth: boolean;
}

export type BackTopAnimationType = "fade" | "slide" | "bounce" | "zoom" | "none";

// =============================================================================
// PREDEFINED VARIANTS TYPES
// =============================================================================

export interface CircleBackTopProps extends Omit<BackTopProps, "shape"> {
  shape?: "circle";
}

export interface SquareBackTopProps extends Omit<BackTopProps, "shape"> {
  shape?: "square";
}

export interface RoundBackTopProps extends Omit<BackTopProps, "shape"> {
  shape?: "round";
}

export interface FloatingBackTopProps extends BackTopProps {
  visibilityHeight?: number;
  placement?: BackTopPlacement;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const BACKTOP_DEFAULTS = {
  size: "md" as BackTopSize,
  variant: "primary" as BackTopVariant,
  shape: "circle" as BackTopShape,
  placement: "right" as BackTopPlacement,
  visibilityHeight: 400,
  duration: 450,
  easing: "ease-in-out",
  smooth: true,
  right: 50,
  bottom: 50,
  zIndex: 1000,
  scrollAnimation: {
    duration: 450,
    easing: "ease-in-out",
    smooth: true,
  } as BackTopScrollAnimation,
} as const;

export const BACKTOP_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export const BACKTOP_VARIANTS = ["primary", "secondary", "success", "warning", "error", "info"] as const;
export const BACKTOP_SHAPES = ["circle", "square", "round"] as const;
export const BACKTOP_PLACEMENTS = ["right", "left", "center"] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getScrollTop = (target?: HTMLElement | Window): number => {
  if (!target || target === window) {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  return (target as HTMLElement).scrollTop;
};

export const getDocumentHeight = (target?: HTMLElement | Window): number => {
  if (!target || target === window) {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }
  return (target as HTMLElement).scrollHeight;
};

export const getViewportHeight = (target?: HTMLElement | Window): number => {
  if (!target || target === window) {
    return window.innerHeight || document.documentElement.clientHeight;
  }
  return (target as HTMLElement).clientHeight;
};

export const scrollToTop = (
  target?: HTMLElement | Window,
  animation: BackTopScrollAnimation = BACKTOP_DEFAULTS.scrollAnimation
): void => {
  if (!animation.smooth) {
    if (!target || target === window) {
      window.scrollTo(0, 0);
    } else {
      (target as HTMLElement).scrollTop = 0;
    }
    return;
  }

  const startPosition = getScrollTop(target);
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / animation.duration, 1);
    
    // Easing function based on CSS easing
    let easedProgress = progress;
    if (animation.easing === "ease-in") {
      easedProgress = progress * progress;
    } else if (animation.easing === "ease-out") {
      easedProgress = 1 - Math.pow(1 - progress, 2);
    } else if (animation.easing === "ease-in-out") {
      easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    }
    
    const currentPosition = startPosition * (1 - easedProgress);
    
    if (!target || target === window) {
      window.scrollTo(0, currentPosition);
    } else {
      (target as HTMLElement).scrollTop = currentPosition;
    }
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export const calculateScrollProgress = (
  scrollTop: number,
  documentHeight: number,
  viewportHeight: number
): number => {
  const maxScroll = Math.max(0, documentHeight - viewportHeight);
  return maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
};

export const shouldShowBackTop = (
  scrollTop: number,
  visibilityHeight: number
): boolean => {
  return scrollTop >= visibilityHeight;
};

export const getAccessibleBackTopDescription = (
  scrollProgress: number,
  visible: boolean
): string => {
  const progressText = Math.round(scrollProgress * 100);
  const visibilityText = visible ? "visible" : "hidden";
  
  return `Back to top button. Scroll progress: ${progressText}%. Currently ${visibilityText}.`;
};

export const formatScrollPosition = (scrollTop: number, unit: "px" | "%" = "px"): string => {
  if (unit === "px") {
    return `${Math.round(scrollTop)}px`;
  }
  return `${Math.round(scrollTop)}%`;
};

export const getBackTopIcon = (): React.ReactNode => {
  return React.createElement(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg"
    },
    React.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8 2.5L4.5 6H7V13.5H9V6H11.5L8 2.5Z"
    })
  );
};

