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

export type MenuMode = "horizontal" | "vertical" | "inline" | "collapsed";
export type MenuTrigger = "hover" | "click" | "focus";
export type MenuPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

export type MenuSize = AllSize;
export type MenuVariant = AllVariant;
export type MenuTheme = "light" | "dark";

// =============================================================================
// MENU ITEM TYPES
// =============================================================================

export interface MenuItemProps {
  key?: string | number;
  itemKey?: string | number;
  level?: number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  children?: MenuItemProps[];
  onClick?: (info: MenuInfo) => void;
  onTitleClick?: (info: MenuInfo) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuInfo {
  key: string | number;
  keyPath: (string | number)[];
  item: MenuItemProps;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface SubMenuProps {
  key?: string | number;
  itemKey?: string | number;
  level?: number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: (MenuItemProps | SubMenuProps)[];
  popupClassName?: string;
  popupOffset?: [number, number];
  onTitleClick?: (info: MenuInfo) => void;
  className?: string;
  style?: React.CSSProperties;
}

// =============================================================================
// BREADCRUMB TYPES
// =============================================================================

export interface BreadcrumbItemProps {
  title?: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  dropdownProps?: {
    menu: MenuItemProps[];
    placement?: MenuPlacement;
  };
  className?: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItemProps[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemRender?: (
    route: BreadcrumbItemProps,
    params: any,
    routes: BreadcrumbItemProps[],
    paths: string[]
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// MAIN MENU PROPS
// =============================================================================

export interface MenuProps {
  // Core Props
  items?: (MenuItemProps | SubMenuProps)[];
  children?: React.ReactNode;

  // Appearance
  mode?: MenuMode;
  theme?: MenuTheme;
  size?: MenuSize;
  variant?: MenuVariant;

  // Behavior
  selectable?: boolean;
  multiple?: boolean;
  selectedKeys?: (string | number)[];
  defaultSelectedKeys?: (string | number)[];
  openKeys?: (string | number)[];
  defaultOpenKeys?: (string | number)[];

  // Interaction
  trigger?: MenuTrigger[];
  inlineCollapsed?: boolean;
  inlineIndent?: number;
  subMenuOpenDelay?: number;
  subMenuCloseDelay?: number;
  forceSubMenuRender?: boolean;

  // Events
  onClick?: (info: MenuInfo) => void;
  onSelect?: (info: {
    item: MenuItemProps;
    key: string | number;
    keyPath: (string | number)[];
    selectedKeys: (string | number)[];
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void;
  onDeselect?: (info: {
    item: MenuItemProps;
    key: string | number;
    keyPath: (string | number)[];
    selectedKeys: (string | number)[];
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void;
  onOpenChange?: (openKeys: (string | number)[]) => void;

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

// =============================================================================
// DROPDOWN MENU PROPS
// =============================================================================

export interface DropdownProps {
  menu: MenuProps;
  trigger?: MenuTrigger[];
  placement?: MenuPlacement;
  arrow?: boolean;
  disabled?: boolean;
  destroyPopupOnHide?: boolean;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledMenuProps {
  $mode: MenuMode;
  $theme: MenuTheme;
  $size: MenuSize;
  $variant: MenuVariant;
  $inlineCollapsed: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledMenuItemProps {
  $selected: boolean;
  $disabled: boolean;
  $danger: boolean;
  $level: number;
  $size: MenuSize;
  $theme: MenuTheme;
  accessibility?: AccessibilityProps;
}

export interface StyledSubMenuProps {
  $open: boolean;
  $disabled: boolean;
  $level: number;
  $mode: MenuMode;
  $size: MenuSize;
  $theme: MenuTheme;
  accessibility?: AccessibilityProps;
}

export interface StyledDropdownProps {
  $placement: MenuPlacement;
  $visible: boolean;
  $size: MenuSize;
  $theme: MenuTheme;
  accessibility?: AccessibilityProps;
}

export interface StyledBreadcrumbProps {
  $size: MenuSize;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const MENU_DEFAULTS = {
  mode: "horizontal" as MenuMode,
  theme: "light" as MenuTheme,
  size: "md" as MenuSize,
  variant: "default" as MenuVariant,
  trigger: ["hover"] as MenuTrigger[],
  placement: "bottomLeft" as MenuPlacement,
  selectable: true,
  multiple: false,
  inlineCollapsed: false,
  inlineIndent: 24,
  subMenuOpenDelay: 0.1,
  subMenuCloseDelay: 0.1,
  forceSubMenuRender: false,
} as const;

export const MENU_MODES = [
  "horizontal",
  "vertical",
  "inline",
  "collapsed",
] as const;
export const MENU_TRIGGERS = ["hover", "click", "focus"] as const;
export const MENU_PLACEMENTS = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
  "leftTop",
  "leftBottom",
  "rightTop",
  "rightBottom",
] as const;
export const MENU_THEMES = ["light", "dark"] as const;

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export interface NavigationItem {
  key: string | number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  path?: string;
  children?: NavigationItem[];
  disabled?: boolean;
  external?: boolean;
  badge?: React.ReactNode;
  meta?: Record<string, any>;
}

export interface TabItem {
  key: string | number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps {
  items?: TabItem[];
  activeKey?: string | number;
  defaultActiveKey?: string | number;
  type?: "line" | "card" | "editable-card";
  size?: MenuSize;
  position?: "top" | "right" | "bottom" | "left";
  centered?: boolean;
  onChange?: (activeKey: string | number) => void;
  onEdit?: (
    targetKey: React.MouseEvent | React.KeyboardEvent | string | number,
    action: "add" | "remove"
  ) => void;
  onTabClick?: (key: string | number, event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getMenuKeyPath = (
  items: (MenuItemProps | SubMenuProps)[],
  targetKey: string | number,
  currentPath: (string | number)[] = []
): (string | number)[] | null => {
  for (const item of items) {
    const itemKey = item.key || "";
    const newPath = [...currentPath, itemKey];

    if (itemKey === targetKey) {
      return newPath;
    }

    if (item.children) {
      const childPath = getMenuKeyPath(item.children, targetKey, newPath);
      if (childPath) {
        return childPath;
      }
    }
  }

  return null;
};

export const getMenuLevel = (
  items: (MenuItemProps | SubMenuProps)[],
  targetKey: string | number,
  currentLevel: number = 0
): number => {
  for (const item of items) {
    if (item.key === targetKey) {
      return currentLevel;
    }

    if (item.children) {
      const childLevel = getMenuLevel(
        item.children,
        targetKey,
        currentLevel + 1
      );
      if (childLevel !== -1) {
        return childLevel;
      }
    }
  }

  return -1;
};

export const flattenMenuItems = (
  items: (MenuItemProps | SubMenuProps)[],
  result: MenuItemProps[] = []
): MenuItemProps[] => {
  for (const item of items) {
    if (!("children" in item) || !item.children) {
      result.push(item as MenuItemProps);
    } else {
      flattenMenuItems(item.children, result);
    }
  }

  return result;
};

export const getAccessibilityMenuMessage = (
  selectedKeys: (string | number)[],
  openKeys: (string | number)[],
  mode: MenuMode
): string => {
  const selectedCount = selectedKeys.length;
  const openCount = openKeys.length;

  let message = `${mode} menu`;

  if (selectedCount > 0) {
    message += `, ${selectedCount} item${
      selectedCount > 1 ? "s" : ""
    } selected`;
  }

  if (openCount > 0) {
    message += `, ${openCount} submenu${openCount > 1 ? "s" : ""} open`;
  }

  return message;
};

export const getNavigationPath = (
  items: NavigationItem[],
  targetPath: string,
  currentPath: NavigationItem[] = []
): NavigationItem[] | null => {
  for (const item of items) {
    const newPath = [...currentPath, item];

    if (item.path === targetPath) {
      return newPath;
    }

    if (item.children) {
      const childPath = getNavigationPath(item.children, targetPath, newPath);
      if (childPath) {
        return childPath;
      }
    }
  }

  return null;
};

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

export const MENU_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
  ESCAPE: "Escape",
  TAB: "Tab",
} as const;

export const getNextMenuKey = (
  keys: (string | number)[],
  currentKey: string | number,
  direction: "next" | "prev"
): string | number | null => {
  const currentIndex = keys.indexOf(currentKey);
  if (currentIndex === -1) return keys[0] || null;

  if (direction === "next") {
    return keys[currentIndex + 1] || keys[0] || null;
  } else {
    return keys[currentIndex - 1] || keys[keys.length - 1] || null;
  }
};

export const shouldMenuItemReceiveFocus = (
  item: MenuItemProps | SubMenuProps,
  mode: MenuMode
): boolean => {
  return !item.disabled && (!("divider" in item) || !item.divider);
};
