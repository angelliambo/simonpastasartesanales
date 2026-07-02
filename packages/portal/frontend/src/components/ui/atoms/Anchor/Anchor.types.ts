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

export type AnchorSize = AllSize;
export type AnchorVariant = AllVariant;
export type AnchorDirection = "vertical" | "horizontal";
export type AnchorPlacement = "left" | "right" | "top" | "bottom";

export interface AnchorLinkItem {
  key: string;
  href: string;
  title: React.ReactNode;
  children?: AnchorLinkItem[];
}

// =============================================================================
// ANCHOR COMPONENT PROPS
// =============================================================================

export interface AnchorProps {
  // Content
  items?: AnchorLinkItem[];
  children?: React.ReactNode;

  // Behavior
  affix?: boolean;
  showInkInFixed?: boolean;
  getCurrentAnchor?: () => string;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  onChange?: (currentActiveLink: string) => void;
  
  // Scroll behavior
  targetOffset?: number;
  offsetTop?: number;
  bounds?: number;
  getContainer?: () => HTMLElement | Window;
  
  // Styling
  size?: AnchorSize;
  variant?: AnchorVariant;
  direction?: AnchorDirection;
  placement?: AnchorPlacement;
  
  // Customization
  replace?: boolean;
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility
  accessibility?: AccessibilityProps;
  "aria-label"?: string;
  role?: string;
  tabIndex?: number;
  /** ID único del componente (opcional) - se concatena con "anchor-" */
  id?: string;
}

export interface AnchorLinkProps {
  // Content
  href: string;
  title: React.ReactNode;
  target?: string;
  
  // Behavior
  replace?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility
  accessibility?: AccessibilityProps;
  "aria-label"?: string;
  role?: string;
  tabIndex?: number;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledAnchorProps {
  $size: AnchorSize;
  $variant: AnchorVariant;
  $direction: AnchorDirection;
  $placement: AnchorPlacement;
  $affix: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledAnchorLinkProps {
  $active: boolean;
  $level: number;
  accessibility?: AccessibilityProps;
}

export interface StyledAnchorInkProps {
  $direction: AnchorDirection;
  $offset: number;
  $height: number;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface AnchorContextValue {
  activeLink: string;
  setActiveLink: (link: string) => void;
  onClick: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  direction: AnchorDirection;
  targetOffset: number;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseAnchorScrollReturn {
  activeLink: string;
  scrollTo: (link: string) => void;
  registerLink: (link: string, element: HTMLElement) => void;
  unregisterLink: (link: string) => void;
}

export interface UseScrollSpyOptions {
  offset?: number;
  smooth?: boolean;
  container?: HTMLElement | Window;
  throttle?: number;
}

export interface UseScrollSpyReturn {
  activeId: string;
  scrollToId: (id: string) => void;
}

// =============================================================================
// PREDEFINED VARIANTS TYPES
// =============================================================================

export interface VerticalAnchorProps extends Omit<AnchorProps, "direction"> {
  direction?: "vertical";
}

export interface HorizontalAnchorProps extends Omit<AnchorProps, "direction"> {
  direction?: "horizontal";
}

export interface SidebarAnchorProps extends AnchorProps {
  affix?: true;
  placement?: "left" | "right";
  direction?: "vertical";
}

export interface TopAnchorProps extends AnchorProps {
  affix?: true;
  placement?: "top";
  direction?: "horizontal";
}

// =============================================================================
// ANIMATION TYPES
// =============================================================================

export interface AnchorScrollAnimation {
  duration: number;
  easing: string;
  smooth: boolean;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const ANCHOR_DEFAULTS = {
  size: "md" as AnchorSize,
  variant: "primary" as AnchorVariant,
  direction: "vertical" as AnchorDirection,
  placement: "left" as AnchorPlacement,
  affix: false,
  showInkInFixed: false,
  targetOffset: 0,
  offsetTop: 0,
  bounds: 5,
  replace: false,
  scrollAnimation: {
    duration: 300,
    easing: "ease-in-out",
    smooth: true,
  } as AnchorScrollAnimation,
} as const;

export const ANCHOR_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export const ANCHOR_VARIANTS = ["primary", "secondary", "success", "warning", "error", "info"] as const;
export const ANCHOR_DIRECTIONS = ["vertical", "horizontal"] as const;
export const ANCHOR_PLACEMENTS = ["left", "right", "top", "bottom"] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getElementTop = (element: HTMLElement, container?: HTMLElement | Window): number => {
  if (!element) return 0;

  if (!container || container === window) {
    return element.getBoundingClientRect().top + window.scrollY;
  }

  const containerRect = (container as HTMLElement).getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  
  return elementRect.top - containerRect.top + (container as HTMLElement).scrollTop;
};

export const scrollToElement = (
  element: HTMLElement,
  targetOffset: number = 0,
  animation: AnchorScrollAnimation = ANCHOR_DEFAULTS.scrollAnimation,
  container?: HTMLElement | Window
): void => {
  if (!element) return;

  const targetPosition = getElementTop(element, container) - targetOffset;
  
  if (!animation.smooth) {
    if (!container || container === window) {
      window.scrollTo(0, targetPosition);
    } else {
      (container as HTMLElement).scrollTop = targetPosition;
    }
    return;
  }

  const startPosition = !container || container === window 
    ? window.scrollY 
    : (container as HTMLElement).scrollTop;
  
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / animation.duration, 1);
    
    // Easing function (ease-in-out)
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    const currentPosition = startPosition + distance * easedProgress;
    
    if (!container || container === window) {
      window.scrollTo(0, currentPosition);
    } else {
      (container as HTMLElement).scrollTop = currentPosition;
    }
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export const getCurrentAnchor = (
  links: string[],
  targetOffset: number = 0,
  bounds: number = 5,
  container?: HTMLElement | Window
): string => {
  if (!links.length) return "";

  const scrollTop = !container || container === window 
    ? window.scrollY 
    : (container as HTMLElement).scrollTop;

  const currentLinks = links
    .map((link) => {
      const element = document.getElementById(link.replace("#", ""));
      if (!element) return null;
      
      const top = getElementTop(element, container);
      return { link, top, element };
    })
    .filter(Boolean)
    .sort((a, b) => a!.top - b!.top);

  // Find the active link based on scroll position
  for (let i = currentLinks.length - 1; i >= 0; i--) {
    const currentLink = currentLinks[i]!;
    const offsetTop = currentLink.top - targetOffset - bounds;
    
    if (scrollTop >= offsetTop) {
      return currentLink.link;
    }
  }

  return currentLinks[0]?.link || "";
};

export const getAccessibleAnchorDescription = (
  title: React.ReactNode,
  href: string,
  active: boolean
): string => {
  const titleText = typeof title === "string" ? title : "Anchor link";
  const activeText = active ? "Currently active" : "";
  const targetText = href.startsWith("#") ? "Navigate to section" : "Navigate to page";
  
  return `${titleText}. ${targetText}. ${activeText}`.trim();
};

export const extractTextFromReactNode = (node: React.ReactNode): string => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return extractTextFromReactNode((node.props as any).children);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join(" ");
  }
  return "";
};
