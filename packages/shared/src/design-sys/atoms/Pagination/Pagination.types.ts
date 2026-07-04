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
// PAGINATION TYPES
// =============================================================================

export type PaginationSize = AllSize;
export type PaginationVariant = AllVariant;
export type PaginationPosition = "left" | "center" | "right";
export type PaginationShowTotal = (total: number, range: [number, number]) => React.ReactNode;

// Main pagination props
export interface PaginationProps {
  // Data
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  
  // Behavior
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  disabled?: boolean;
  
  // Appearance
  size?: PaginationSize;
  variant?: PaginationVariant;
  simple?: boolean;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean | PaginationShowTotal;
  showPrevNextJumpers?: boolean;
  showLessItems?: boolean;
  responsive?: boolean;
  
  // Navigation
  showTitle?: boolean;
  itemRender?: (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactElement
  ) => React.ReactNode;
  
  // Size changer
  pageSizeOptions?: string[] | number[];
  
  // Quick jumper
  goButton?: React.ReactNode | boolean;
  
  // Layout
  position?: PaginationPosition;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility
  accessibility?: AccessibilityProps;
  
  // Events
  onPageChange?: (page: number) => void;
  
  // DOM attributes
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  
  // Children
  children?: React.ReactNode;
}

// Pagination item props
export interface PaginationItemProps {
  page: number;
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next";
  active?: boolean;
  disabled?: boolean;
  onClick?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Styled component props
export interface StyledPaginationProps {
  $size: PaginationSize;
  $variant: PaginationVariant;
  $position: PaginationPosition;
  $simple: boolean;
  $responsive: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledPaginationItemProps {
  $size: PaginationSize;
  $variant: PaginationVariant;
  $active: boolean;
  $disabled: boolean;
  $type: "page" | "prev" | "next" | "jump-prev" | "jump-next";
  accessibility?: AccessibilityProps;
}

export interface StyledPaginationSizeChangerProps {
  $size: PaginationSize;
  $variant: PaginationVariant;
  accessibility?: AccessibilityProps;
}

export interface StyledPaginationJumperProps {
  $size: PaginationSize;
  $variant: PaginationVariant;
  accessibility?: AccessibilityProps;
}

export interface StyledPaginationTotalProps {
  $size: PaginationSize;
  $variant: PaginationVariant;
  accessibility?: AccessibilityProps;
}

// Hook return types
export interface UsePagination {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  changePageSize: (size: number) => void;
  getRange: () => [number, number];
}

export interface UsePaginationItems {
  items: PaginationItemData[];
  showLessItems: boolean;
  maxItems: number;
}

export interface PaginationItemData {
  page: number;
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next";
  active: boolean;
  disabled: boolean;
  title?: string;
}

// Predefined component interfaces
export interface SimplePaginationProps extends Omit<PaginationProps, "simple"> {
  simple?: true;
}

export interface ResponsivePaginationProps extends PaginationProps {
  responsive?: true;
  showLessItems?: true;
}

export interface CompletePaginationProps extends PaginationProps {
  showTotal?: true;
  showSizeChanger?: true;
  showQuickJumper?: true;
}

// =============================================================================
// CONSTANTS AND DEFAULTS
// =============================================================================

export const PAGINATION_DEFAULTS = {
  current: 1,
  pageSize: 10,
  total: 0,
  size: "md" as PaginationSize,
  variant: "primary" as PaginationVariant,
  position: "center" as PaginationPosition,
  simple: false,
  hideOnSinglePage: false,
  showSizeChanger: false,
  showQuickJumper: false,
  showTotal: false,
  showPrevNextJumpers: true,
  showLessItems: false,
  responsive: false,
  showTitle: true,
  disabled: false,
  pageSizeOptions: ["10", "20", "50", "100"],
  goButton: false,
};

export const PAGINATION_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export const PAGINATION_VARIANTS = ["primary", "secondary", "success", "warning", "error", "info", "ghost"] as const;
export const PAGINATION_POSITIONS = ["left", "center", "right"] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getTotalPages = (total: number, pageSize: number): number => {
  return Math.ceil(total / pageSize);
};

export const getValidPage = (page: number, totalPages: number): number => {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
};

export const getPaginationRange = (current: number, pageSize: number): [number, number] => {
  const start = (current - 1) * pageSize + 1;
  const end = current * pageSize;
  return [start, end];
};

export const getVisiblePageNumbers = (
  current: number,
  totalPages: number,
  showLessItems: boolean = false
): number[] => {
  const delta = showLessItems ? 1 : 2;
  const range: number[] = [];
  
  const start = Math.max(1, current - delta);
  const end = Math.min(totalPages, current + delta);
  
  for (let page = start; page <= end; page++) {
    range.push(page);
  }
  
  return range;
};

export const shouldShowJumpPrev = (current: number, showLessItems: boolean = false): boolean => {
  const delta = showLessItems ? 1 : 2;
  return current - delta > 1;
};

export const shouldShowJumpNext = (current: number, totalPages: number, showLessItems: boolean = false): boolean => {
  const delta = showLessItems ? 1 : 2;
  return current + delta < totalPages;
};

export const getPaginationItems = (
  current: number,
  totalPages: number,
  showLessItems: boolean = false,
  disabled: boolean = false
): PaginationItemData[] => {
  const items: PaginationItemData[] = [];
  
  if (totalPages === 0) return items;
  
  // Previous button
  items.push({
    page: current - 1,
    type: "prev",
    active: false,
    disabled: disabled || current <= 1,
    title: "Previous page",
  });
  
  // First page
  if (shouldShowJumpPrev(current, showLessItems)) {
    items.push({
      page: 1,
      type: "page",
      active: current === 1,
      disabled,
      title: "Page 1",
    });
    
    // Jump prev
    items.push({
      page: current - (showLessItems ? 2 : 5),
      type: "jump-prev",
      active: false,
      disabled,
      title: "Previous 5 pages",
    });
  }
  
  // Visible page numbers
  const visiblePages = getVisiblePageNumbers(current, totalPages, showLessItems);
  visiblePages.forEach(page => {
    items.push({
      page,
      type: "page",
      active: current === page,
      disabled,
      title: `Page ${page}`,
    });
  });
  
  // Jump next
  if (shouldShowJumpNext(current, totalPages, showLessItems)) {
    items.push({
      page: current + (showLessItems ? 2 : 5),
      type: "jump-next",
      active: false,
      disabled,
      title: "Next 5 pages",
    });
    
    // Last page
    items.push({
      page: totalPages,
      type: "page",
      active: current === totalPages,
      disabled,
      title: `Page ${totalPages}`,
    });
  }
  
  // Next button
  items.push({
    page: current + 1,
    type: "next",
    active: false,
    disabled: disabled || current >= totalPages,
    title: "Next page",
  });
  
  return items;
};

export const getDefaultShowTotal = (): PaginationShowTotal => {
  return (total: number, range: [number, number]) => (
    `${range[0]}-${range[1]} of ${total} items`
  );
};

export const getAccessiblePaginationDescription = (
  current: number,
  totalPages: number,
  total: number
): string => {
  return `Page ${current} of ${totalPages}, showing ${total} total items. Use arrow keys to navigate.`;
};

export const isValidPageSize = (pageSize: number): boolean => {
  return pageSize > 0 && Number.isInteger(pageSize);
};

export const getPageSizeFromOptions = (
  options: string[] | number[],
  defaultSize: number
): number => {
  const numericOptions = options.map(opt => typeof opt === "string" ? parseInt(opt, 10) : opt);
  const validOptions = numericOptions.filter(isValidPageSize);
  
  if (validOptions.includes(defaultSize)) {
    return defaultSize;
  }
  
  return validOptions[0] || PAGINATION_DEFAULTS.pageSize;
};

export const formatPaginationTotal = (
  total: number,
  range: [number, number],
  showTotal: boolean | PaginationShowTotal
): React.ReactNode => {
  if (showTotal === false) return null;
  if (showTotal === true) return getDefaultShowTotal()(total, range);
  if (typeof showTotal === "function") return showTotal(total, range);
  return null;
};

export const getPaginationItemIcon = (type: PaginationItemData["type"]): React.ReactNode => {
  switch (type) {
    case "prev":
      return React.createElement(
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
          d: "M8 2L3 6L8 10L7 11L1 6L7 1L8 2Z"
        })
      );
    case "next":
      return React.createElement(
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
          d: "M4 2L9 6L4 10L5 11L11 6L5 1L4 2Z"
        })
      );
    case "jump-prev":
      return "•••";
    case "jump-next":
      return "•••";
    default:
      return null;
  }
};

export const getPaginationJumperIcon = (): React.ReactNode => {
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
      d: "M6 2L11 7L6 12L5 11L9 7L5 3L6 2Z"
    })
  );
};

export const shouldHidePagination = (
  total: number,
  pageSize: number,
  hideOnSinglePage: boolean
): boolean => {
  if (!hideOnSinglePage) return false;
  return getTotalPages(total, pageSize) <= 1;
};
