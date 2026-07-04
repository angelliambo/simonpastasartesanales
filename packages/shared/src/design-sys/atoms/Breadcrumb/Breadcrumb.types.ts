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
// BREADCRUMB TYPES
// =============================================================================

export type BreadcrumbSize = AllSize;
export type BreadcrumbVariant = AllVariant;
export type BreadcrumbSeparator = "arrow" | "slash" | "dot" | "greater" | "pipe" | "chevron" | "custom";

// Single breadcrumb item
export interface BreadcrumbItem {
  key?: string | number;
  title: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dropdownProps?: BreadcrumbDropdownProps;
  menu?: BreadcrumbMenuProps;
}

// Breadcrumb dropdown props
export interface BreadcrumbDropdownProps {
  items?: BreadcrumbItem[];
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight";
  trigger?: "hover" | "click";
  overlay?: React.ReactElement;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

// Breadcrumb menu props
export interface BreadcrumbMenuProps {
  items: BreadcrumbItem[];
  selectedKeys?: string[];
  onClick?: (item: BreadcrumbItem) => void;
}

// Main breadcrumb props
export interface BreadcrumbProps {
  // Data
  items?: BreadcrumbItem[];
  routes?: BreadcrumbItem[]; // Alias for items (Ant Design compatibility)
  
  // Behavior
  onClick?: (item: BreadcrumbItem, event: React.MouseEvent<HTMLElement>) => void;
  
  // Appearance
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  separator?: BreadcrumbSeparator | React.ReactNode;
  
  // Layout
  maxItems?: number;
  itemRender?: (item: BreadcrumbItem, params: BreadcrumbItemRenderParams) => React.ReactNode;
  
  // Navigation
  autoGenerate?: boolean;
  homeUrl?: string;
  homeName?: string;
  homeIcon?: React.ReactNode;
  
  // Advanced
  responsive?: boolean;
  collapsedWidth?: number;
  expandText?: string;
  collapseText?: string;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility
  accessibility?: AccessibilityProps;
  
  // Events
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  
  // DOM attributes
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  
  // Children
  children?: React.ReactNode;
}

// Breadcrumb item render params
export interface BreadcrumbItemRenderParams {
  item: BreadcrumbItem;
  index: number;
  isLast: boolean;
  items: BreadcrumbItem[];
}

// Styled component props
export interface StyledBreadcrumbProps {
  $size: BreadcrumbSize;
  $variant: BreadcrumbVariant;
  $responsive: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledBreadcrumbItemProps {
  $size: BreadcrumbSize;
  $variant: BreadcrumbVariant;
  $disabled: boolean;
  $active: boolean;
  $clickable: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledBreadcrumbSeparatorProps {
  $size: BreadcrumbSize;
  $variant: BreadcrumbVariant;
  $separator: BreadcrumbSeparator;
  accessibility?: AccessibilityProps;
}

export interface StyledBreadcrumbLinkProps {
  $size: BreadcrumbSize;
  $variant: BreadcrumbVariant;
  $disabled: boolean;
  accessibility?: AccessibilityProps;
}

// Hook return types
export interface UseBreadcrumbNavigation {
  items: BreadcrumbItem[];
  currentPath: string;
  navigate: (item: BreadcrumbItem) => void;
  goHome: () => void;
  goBack: () => void;
}

export interface UseBreadcrumbCollapse {
  visibleItems: BreadcrumbItem[];
  collapsedItems: BreadcrumbItem[];
  isCollapsed: boolean;
  expand: () => void;
  collapse: () => void;
}

// Predefined component interfaces
export interface SimpleBreadcrumbProps extends Omit<BreadcrumbProps, "variant"> {
  variant?: "primary";
}

export interface NavigationBreadcrumbProps extends BreadcrumbProps {
  autoGenerate?: true;
  homeUrl?: string;
  homeIcon?: React.ReactNode;
}

export interface CollapsibleBreadcrumbProps extends BreadcrumbProps {
  maxItems?: number;
  responsive?: true;
  collapsedWidth?: number;
}

// =============================================================================
// CONSTANTS AND DEFAULTS
// =============================================================================

export const BREADCRUMB_DEFAULTS = {
  size: "md" as BreadcrumbSize,
  variant: "secondary" as BreadcrumbVariant,
  separator: "slash" as BreadcrumbSeparator,
  maxItems: 0,
  responsive: false,
  collapsedWidth: 50,
  expandText: "...",
  collapseText: "Collapse",
  autoGenerate: false,
  homeUrl: "/",
  homeName: "Home",
};

export const BREADCRUMB_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export const BREADCRUMB_VARIANTS = ["primary", "secondary", "success", "warning", "error", "info", "ghost"] as const;
export const BREADCRUMB_SEPARATORS = ["arrow", "slash", "dot", "greater", "pipe", "chevron", "custom"] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getBreadcrumbItems = (items?: BreadcrumbItem[], routes?: BreadcrumbItem[]): BreadcrumbItem[] => {
  return items || routes || [];
};

export const getVisibleItems = (items: BreadcrumbItem[], maxItems: number): { visible: BreadcrumbItem[], collapsed: BreadcrumbItem[] } => {
  if (maxItems <= 0 || items.length <= maxItems) {
    return { visible: items, collapsed: [] };
  }

  if (maxItems <= 2) {
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const collapsedItems = items.slice(1, items.length - 1);

    const visible = collapsedItems.length > 0 ? [firstItem, lastItem] : [firstItem];
    if (collapsedItems.length === 0 && items.length > 1) {
      visible.push(lastItem);
    }

    return {
      visible,
      collapsed: collapsedItems,
    };
  }
  
  // Show first item, collapsed indicator, and last items
  const firstItem = items[0];
  const lastItems = items.slice(-(maxItems - 2));
  const collapsedItems = items.slice(1, items.length - (maxItems - 2));
  
  const visible = [firstItem, ...lastItems];
  
  return { visible, collapsed: collapsedItems };
};

export const isLastBreadcrumbItem = (index: number, items: BreadcrumbItem[]): boolean => {
  return index === items.length - 1;
};

export const getBreadcrumbSeparatorIcon = (
  separator: BreadcrumbSeparator
): React.ReactNode => {
  const symbolMap: Record<BreadcrumbSeparator, string> = {
    arrow: "→",
    slash: "/",
    dot: "•",
    greater: ">",
    pipe: "|",
    chevron: "›",
    custom: "/",
  };

  const symbol = symbolMap[separator] ?? "/";
  const modifier =
    separator && separator !== "custom" ? ` breadcrumb-separator-${separator}` : "";

  return React.createElement(
    "span",
    {
      className: `breadcrumb-separator${modifier}`,
      "aria-hidden": true,
    },
    symbol
  );
};

export const getHomeBreadcrumbItem = (
  homeUrl: string = BREADCRUMB_DEFAULTS.homeUrl,
  homeName: string = BREADCRUMB_DEFAULTS.homeName,
  homeIcon?: React.ReactNode
): BreadcrumbItem => {
  return {
    key: "home",
    title: homeIcon ? React.createElement(
      "span",
      { style: { display: "flex", alignItems: "center", gap: "4px" } },
      homeIcon,
      homeName
    ) : homeName,
    href: homeUrl,
  };
};

export const generateBreadcrumbsFromPath = (
  pathname: string,
  homeUrl: string = BREADCRUMB_DEFAULTS.homeUrl,
  homeName: string = BREADCRUMB_DEFAULTS.homeName,
  homeIcon?: React.ReactNode
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [];
  
  // Add home item
  items.push(getHomeBreadcrumbItem(homeUrl, homeName, homeIcon));
  
  // Parse path segments
  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "";
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    
    items.push({
      key: currentPath,
      title: title,
      href: currentPath,
    });
  });
  
  return items;
};

export const getAccessibleBreadcrumbDescription = (
  items: BreadcrumbItem[],
  currentIndex: number,
  total: number
): string => {
  const currentItem = items[currentIndex];
  const titleText = typeof currentItem.title === "string" ? currentItem.title : "Navigation item";
  
  if (currentIndex === total - 1) {
    return `Current page: ${titleText}. Breadcrumb ${currentIndex + 1} of ${total}.`;
  } else {
    return `${titleText}. Breadcrumb ${currentIndex + 1} of ${total}. Press Enter to navigate.`;
  }
};

export const shouldCollapseBreadcrumbs = (
  items: BreadcrumbItem[],
  maxItems: number,
  responsive: boolean,
  containerWidth?: number,
  collapsedWidth?: number
): boolean => {
  if (!responsive && maxItems <= 0) {
    return false;
  }
  
  if (maxItems > 0 && items.length > maxItems) {
    return true;
  }
  
  if (responsive && containerWidth && collapsedWidth) {
    return containerWidth < collapsedWidth * items.length;
  }
  
  return false;
};

export const getDefaultBreadcrumbSeparator = (): React.ReactNode => {
  return React.createElement(
    "span",
    {
      className: "breadcrumb-separator",
      "aria-hidden": true,
    },
    "/"
  );
};

// Icon components for separators
export const getArrowSeparator = (): React.ReactNode => {
  return React.createElement(
    "span",
    {
      className: "breadcrumb-separator breadcrumb-separator-arrow",
      "aria-hidden": true,
    },
    "→"
  );
};

export const getChevronSeparator = (): React.ReactNode => {
  return React.createElement(
    "span",
    {
      className: "breadcrumb-separator breadcrumb-separator-chevron",
      "aria-hidden": true,
    },
    React.createElement(
      "svg",
      {
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg"
      },
      React.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.5 2L8.5 6L4.5 10L3.5 9L6.5 6L3.5 3L4.5 2Z"
      })
    )
  );
};

export const getHomeIcon = (): React.ReactNode => {
  return React.createElement(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg"
    },
    React.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M7 0L0 6V14H4V10H10V14H14V6L7 0ZM2 7.5L7 3.5L12 7.5V12H12V8H6V12H2V7.5Z"
    })
  );
};

export const extractTextFromBreadcrumbItem = (item: BreadcrumbItem): string => {
  if (typeof item.title === "string") {
    return item.title;
  }
  
  if (React.isValidElement(item.title)) {
    const element = item.title as React.ReactElement;
    if (element.props && (element.props as any).children) {
      const children = (element.props as any).children;
      if (typeof children === "string") {
        return children;
      }
    }
  }
  
  return "Navigation item";
};
