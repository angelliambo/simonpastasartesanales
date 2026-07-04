import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { mapSizeToAvailable } from "../shared";
import {
  MenuProps,
  MenuItemProps,
  SubMenuProps,
  DropdownProps,
  BreadcrumbProps,
  BreadcrumbItemProps,
  MenuInfo,
  MenuMode,
  MenuTrigger,
  MENU_DEFAULTS,
  MENU_KEYS,
  getMenuKeyPath,
  flattenMenuItems,
  getAccessibilityMenuMessage,
  getNextMenuKey,
  shouldMenuItemReceiveFocus,
} from "./Menu.types";
import {
  MenuWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledSubMenu,
  StyledDropdown,
  StyledBreadcrumb,
  MenuItemIcon,
  MenuItemText,
  MenuDivider,
  DropdownArrow,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbOverflow,
} from "./Menu.styles";

// =============================================================================
// ICONS
// =============================================================================

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L6.293 6 3.646 3.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const MoreHorizontalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="3" cy="8" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="13" cy="8" r="1.5" />
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
  </svg>
);

// =============================================================================
// CONTEXT
// =============================================================================

interface MenuContextValue {
  selectedKeys: (string | number)[];
  openKeys: (string | number)[];
  mode: MenuMode;
  theme: MenuProps["theme"];
  size: MenuProps["size"];
  inlineCollapsed: boolean;
  trigger: MenuTrigger[];
  onSelect: (info: MenuInfo) => void;
  onOpenChange: (key: string | number, open: boolean) => void;
  accessibility: MenuProps["accessibility"];
  selectable: boolean;
  multiple: boolean;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a Menu component");
  }
  return context;
};

// =============================================================================
// HOOKS
// =============================================================================

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
};

const useKeyboardNavigation = (
  isOpen: boolean,
  items: (MenuItemProps | SubMenuProps)[],
  onClose: () => void,
  onSelect: (key: string | number) => void
) => {
  const [focusedKey, setFocusedKey] = useState<string | number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const flatItems = flattenMenuItems(items).filter((item) =>
        shouldMenuItemReceiveFocus(item, "vertical")
      );
      const keys = flatItems.map((item) => item.key || "");

      switch (event.key) {
        case MENU_KEYS.ESCAPE:
          event.preventDefault();
          onClose();
          break;

        case MENU_KEYS.ARROW_UP:
          event.preventDefault();
          if (focusedKey) {
            const nextKey = getNextMenuKey(keys, focusedKey, "prev");
            if (nextKey) setFocusedKey(nextKey);
          } else {
            setFocusedKey(keys[keys.length - 1] || null);
          }
          break;

        case MENU_KEYS.ARROW_DOWN:
          event.preventDefault();
          if (focusedKey) {
            const nextKey = getNextMenuKey(keys, focusedKey, "next");
            if (nextKey) setFocusedKey(nextKey);
          } else {
            setFocusedKey(keys[0] || null);
          }
          break;

        case MENU_KEYS.ENTER:
        case MENU_KEYS.SPACE:
          event.preventDefault();
          if (focusedKey) {
            onSelect(focusedKey);
          }
          break;

        case MENU_KEYS.HOME:
          event.preventDefault();
          setFocusedKey(keys[0] || null);
          break;

        case MENU_KEYS.END:
          event.preventDefault();
          setFocusedKey(keys[keys.length - 1] || null);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items, focusedKey, onClose, onSelect]);

  return { focusedKey, setFocusedKey };
};

const useMenuState = (props: MenuProps) => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(
    props.selectedKeys || props.defaultSelectedKeys || []
  );
  const [openKeys, setOpenKeys] = useState<(string | number)[]>(
    props.openKeys || props.defaultOpenKeys || []
  );

  // Controlled vs uncontrolled
  const currentSelectedKeys =
    props.selectedKeys !== undefined ? props.selectedKeys : selectedKeys;
  const currentOpenKeys =
    props.openKeys !== undefined ? props.openKeys : openKeys;

  const handleSelect = useCallback(
    (info: MenuInfo) => {
      if (!props.selectable) return;

      let newSelectedKeys: (string | number)[];

      if (props.multiple) {
        const isSelected = currentSelectedKeys.includes(info.key);
        if (isSelected) {
          newSelectedKeys = currentSelectedKeys.filter((k) => k !== info.key);
          props.onDeselect?.({
            item: info.item,
            key: info.key,
            keyPath: info.keyPath,
            selectedKeys: newSelectedKeys,
            domEvent: info.domEvent,
          });
        } else {
          newSelectedKeys = [...currentSelectedKeys, info.key];
          props.onSelect?.({
            item: info.item,
            key: info.key,
            keyPath: info.keyPath,
            selectedKeys: newSelectedKeys,
            domEvent: info.domEvent,
          });
        }
      } else {
        newSelectedKeys = [info.key];
        props.onSelect?.({
          item: info.item,
          key: info.key,
          keyPath: info.keyPath,
          selectedKeys: newSelectedKeys,
          domEvent: info.domEvent,
        });
      }

      if (props.selectedKeys === undefined) {
        setSelectedKeys(newSelectedKeys);
      }

      props.onClick?.(info);
    },
    [props, currentSelectedKeys]
  );

  const handleOpenChange = useCallback(
    (key: string | number, open: boolean) => {
      let newOpenKeys: (string | number)[];

      if (open) {
        newOpenKeys = [...currentOpenKeys, key];
      } else {
        newOpenKeys = currentOpenKeys.filter((k) => k !== key);
      }

      if (props.openKeys === undefined) {
        setOpenKeys(newOpenKeys);
      }

      props.onOpenChange?.(newOpenKeys);
    },
    [props, currentOpenKeys]
  );

  return {
    selectedKeys: currentSelectedKeys,
    openKeys: currentOpenKeys,
    onSelect: handleSelect,
    onOpenChange: handleOpenChange,
  };
};

// =============================================================================
// MENU ITEM COMPONENTS
// =============================================================================

const MenuItem: React.FC<
  MenuItemProps & { level?: number; itemKey?: string | number }
> = ({
  itemKey,
  title,
  icon,
  disabled = false,
  danger = false,
  divider = false,
  onClick,
  className,
  style,
  level = 0,
}) => {
  const context = useMenuContext();

  if (divider) {
    return <MenuDivider $theme={context.theme || "light"} />;
  }

  const resolvedKey = itemKey ?? "";
  const isSelected = context.selectedKeys.includes(resolvedKey);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) return;

      const info: MenuInfo = {
        key: resolvedKey,
        keyPath: getMenuKeyPath([], resolvedKey) || [],
        item: { key: resolvedKey, title, icon, disabled, danger },
        domEvent: event,
      };

      context.onSelect(info);
      onClick?.(info);
    },
    [disabled, resolvedKey, title, icon, danger, context, onClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (disabled) return;

      if (event.key === MENU_KEYS.ENTER || event.key === MENU_KEYS.SPACE) {
        event.preventDefault();
        const info: MenuInfo = {
          key: resolvedKey,
          keyPath: getMenuKeyPath([], resolvedKey) || [],
          item: { key: resolvedKey, title, icon, disabled, danger },
          domEvent: event,
        };

        context.onSelect(info);
        onClick?.(info);
      }
    },
    [disabled, resolvedKey, title, icon, danger, context, onClick]
  );

  const role = context.selectable
    ? context.multiple
      ? "menuitemcheckbox"
      : "menuitemradio"
    : "menuitem";

  const ariaSelectionProps = context.selectable
    ? {
        "aria-checked": isSelected,
        "aria-selected": isSelected,
      }
    : context.mode === "vertical"
    ? { "aria-selected": isSelected }
    : {};

  return (
    <StyledMenuItem
      className={className}
      style={style}
      $selected={isSelected}
      $disabled={disabled}
      $danger={danger}
      $level={level}
      $size={context.size || "md"}
      $theme={context.theme || "light"}
      accessibility={context.accessibility}
      role={role}
      tabIndex={disabled ? -1 : 0}
      {...ariaSelectionProps}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon && <MenuItemIcon $size={context.size || "md"}>{icon}</MenuItemIcon>}
      <MenuItemText>{title}</MenuItemText>
    </StyledMenuItem>
  );
};

const SubMenu: React.FC<
  SubMenuProps & {
    level?: number;
    itemKey?: string | number;
    items?: Array<MenuItemProps | SubMenuProps>;
  }
> = ({
  itemKey,
  title,
  icon,
  disabled = false,
  children,
  items,
  popupClassName,
  popupOffset,
  onTitleClick,
  className,
  style,
  level = 0,
}) => {
  const context = useMenuContext();
  const [localOpen, setLocalOpen] = useState(false);

  const resolvedKey = itemKey ?? "";
  const isOpen = context.openKeys.includes(resolvedKey);
  const currentOpen = context.mode === "inline" ? isOpen : localOpen;

  const handleTitleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      const info: MenuInfo = {
        key: resolvedKey,
        keyPath: getMenuKeyPath([], resolvedKey) || [],
        item: { key: resolvedKey, title, icon, disabled },
        domEvent: event,
      };

      if (context.mode === "inline") {
        context.onOpenChange(resolvedKey, !isOpen);
      } else {
        setLocalOpen(!localOpen);
      }

      onTitleClick?.(info);
    },
    [disabled, resolvedKey, title, icon, context, isOpen, localOpen, onTitleClick]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || context.mode === "inline") return;
    if (context.trigger.includes("hover")) {
      setLocalOpen(true);
    }
  }, [disabled, context.mode, context.trigger]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || context.mode === "inline") return;
    if (context.trigger.includes("hover")) {
      setLocalOpen(false);
    }
  }, [disabled, context.mode, context.trigger]);

  const renderSubmenuContent = () => {
    if (items && items.length > 0) {
      return (
        <ul className="submenu-list" role="menu">
          {items.map((childItem, index) => {
            const childKey =
              childItem.itemKey ??
              childItem.key ??
              `${itemKey ?? "submenu"}-${index}`;

            if ("children" in childItem && childItem.children) {
              const {
                key: _unusedKey,
                children: nestedChildren,
                ...nestedProps
              } = childItem as SubMenuProps;

              return (
                <SubMenu
                  key={childKey}
                  itemKey={childKey}
                  level={level + 1}
                  {...nestedProps}
                  items={nestedChildren as Array<MenuItemProps | SubMenuProps>}
                />
              );
            }

            const { key: _unusedKey, ...menuItemProps } =
              childItem as MenuItemProps;
            return (
              <MenuItem
                key={childKey}
                itemKey={childKey}
                level={level + 1}
                {...menuItemProps}
              />
            );
          })}
        </ul>
      );
    }

    return (
      React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        const typedChild = child as React.ReactElement<
          MenuItemProps | SubMenuProps
        >;
        const childProps = typedChild.props as MenuItemProps | SubMenuProps;
        const childKey =
          childProps.itemKey ?? childProps.key ?? `${itemKey}-${index}`;

        const updatedProps: Partial<MenuItemProps & SubMenuProps> = {
          itemKey: childKey,
          level: level + 1,
        };

        return React.cloneElement<MenuItemProps | SubMenuProps>(typedChild, {
          ...typedChild.props,
          ...updatedProps,
          key: childKey,
        });
      }) ?? null
    );
  };

  return (
    <StyledSubMenu
      className={className}
      style={style}
      $open={currentOpen}
      $disabled={disabled}
      $level={level}
      $mode={context.mode || "horizontal"}
      $size={context.size || "md"}
      $theme={context.theme || "light"}
      accessibility={context.accessibility}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="none"
    >
      <button
        className="submenu-title"
        type="button"
        role="menuitem"
        aria-expanded={currentOpen}
        aria-haspopup="menu"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleTitleClick}
      >
        {icon && (
          <MenuItemIcon $size={context.size || "md"}>{icon}</MenuItemIcon>
        )}
        <MenuItemText>{title}</MenuItemText>
      </button>

      <div className="submenu-content" role="menu">
        {renderSubmenuContent()}
      </div>
    </StyledSubMenu>
  );
};

// =============================================================================
// MAIN MENU COMPONENT
// =============================================================================

export const Menu: React.FC<MenuProps> = ({
  items = [],
  children,

  // Appearance
  mode = MENU_DEFAULTS.mode,
  theme = MENU_DEFAULTS.theme,
  size = MENU_DEFAULTS.size,
  variant = MENU_DEFAULTS.variant,

  // Behavior
  selectable = MENU_DEFAULTS.selectable,
  multiple = MENU_DEFAULTS.multiple,
  selectedKeys,
  defaultSelectedKeys,
  openKeys,
  defaultOpenKeys,

  // Interaction
  trigger = MENU_DEFAULTS.trigger,
  inlineCollapsed = MENU_DEFAULTS.inlineCollapsed,
  inlineIndent = MENU_DEFAULTS.inlineIndent,
  subMenuOpenDelay = MENU_DEFAULTS.subMenuOpenDelay,
  subMenuCloseDelay = MENU_DEFAULTS.subMenuCloseDelay,
  forceSubMenuRender = MENU_DEFAULTS.forceSubMenuRender,

  // Events
  onClick,
  onSelect,
  onDeselect,
  onOpenChange,

  // Styling
  className,
  style,

  // Accessibility
  accessibility: accessibilityProp,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  role = "menu",

  ...rest
}) => {
  // =============================================================================
  // HOOKS AND STATE
  // =============================================================================

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

  // Menu state management
  const menuState = useMenuState({
    selectedKeys,
    defaultSelectedKeys,
    openKeys,
    defaultOpenKeys,
    selectable,
    multiple,
    onSelect,
    onDeselect,
    onOpenChange,
    onClick,
  });

  // Context value
  const contextValue: MenuContextValue = useMemo(
    () => ({
      selectedKeys: menuState.selectedKeys,
      openKeys: menuState.openKeys,
      mode,
      theme,
      size: mappedSize,
      inlineCollapsed,
      trigger,
      onSelect: menuState.onSelect,
      onOpenChange: menuState.onOpenChange,
      accessibility: personalizedProps.accessibility,
      selectable: !!selectable,
      multiple: !!multiple,
    }),
    [
      menuState.selectedKeys,
      menuState.openKeys,
      mode,
      theme,
      mappedSize,
      inlineCollapsed,
      trigger,
      menuState.onSelect,
      menuState.onOpenChange,
      personalizedProps.accessibility,
      selectable,
      multiple,
    ]
  );

  // =============================================================================
  // RENDER ITEMS
  // =============================================================================

const renderItems = () => {
  if (children) {
    return children;
  }

  return items.map((item, index) => {
    const rawItem = item as MenuItemProps | SubMenuProps;
    const keyValue = rawItem.itemKey ?? rawItem.key ?? index;

    if ("children" in rawItem && rawItem.children) {
      const {
        key: _unusedKey,
        children: subChildren,
        ...subMenuProps
      } = rawItem as SubMenuProps;

      return (
        <SubMenu
          key={keyValue}
          itemKey={keyValue}
          {...subMenuProps}
          level={0}
          items={subChildren}
        />
      );
    }

    const { key: _unusedKey, ...menuItemProps } = rawItem as MenuItemProps;
    return <MenuItem key={keyValue} itemKey={keyValue} {...menuItemProps} />;
  });
};

  // =============================================================================
  // ACCESSIBILITY MESSAGE
  // =============================================================================

  const accessibilityMessage = getAccessibilityMenuMessage(
    menuState.selectedKeys,
    menuState.openKeys,
    mode
  );

  // =============================================================================
  // RENDER
  // =============================================================================

  const finalId = id ? `menu-${id}` : undefined;

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuWrapper className={className} style={style}>
        <StyledMenu
          id={finalId}
          role={role}
          aria-label={ariaLabel || accessibilityMessage}
          aria-describedby={ariaDescribedby}
          $mode={mode}
          $theme={theme}
          $size={mappedSize}
          $variant={variant}
          $inlineCollapsed={inlineCollapsed}
          accessibility={personalizedProps.accessibility}
          {...rest}
        >
          {renderItems()}
        </StyledMenu>
      </MenuWrapper>
    </MenuContext.Provider>
  );
};

// =============================================================================
// DROPDOWN COMPONENT
// =============================================================================

export const Dropdown: React.FC<DropdownProps> = ({
  menu,
  trigger = MENU_DEFAULTS.trigger,
  placement = MENU_DEFAULTS.placement,
  arrow = false,
  disabled = false,
  destroyPopupOnHide = false,
  getPopupContainer,
  overlayClassName,
  overlayStyle,
  visible: controlledVisible,
  onVisibleChange,
  children,
  className,
  style,
  accessibility: accessibilityProp,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const personalizedProps = {
    accessibility: { ...contextAccessibility, ...accessibilityProp },
  };

  const [internalVisible, setInternalVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledVisible !== undefined;
  const currentVisible = isControlled ? controlledVisible : internalVisible;

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalVisible(visible);
      }
      onVisibleChange?.(visible);
    },
    [disabled, isControlled, onVisibleChange]
  );

  const handleTriggerClick = useCallback(() => {
    if (trigger.includes("click")) {
      handleVisibleChange(!currentVisible);
    }
  }, [trigger, currentVisible, handleVisibleChange]);

  const handleTriggerMouseEnter = useCallback(() => {
    if (trigger.includes("hover")) {
      handleVisibleChange(true);
    }
  }, [trigger, handleVisibleChange]);

  const handleTriggerMouseLeave = useCallback(() => {
    if (trigger.includes("hover")) {
      handleVisibleChange(false);
    }
  }, [trigger, handleVisibleChange]);

  const handleTriggerFocus = useCallback(() => {
    if (trigger.includes("focus")) {
      handleVisibleChange(true);
    }
  }, [trigger, handleVisibleChange]);

  const handleTriggerBlur = useCallback(() => {
    if (trigger.includes("focus")) {
      handleVisibleChange(false);
    }
  }, [trigger, handleVisibleChange]);

  // Click outside to close
  useClickOutside(dropdownRef, () => {
    if (currentVisible) {
      handleVisibleChange(false);
    }
  });

  // Keyboard navigation
  useKeyboardNavigation(
    currentVisible,
    menu.items || [],
    () => handleVisibleChange(false),
    (key) => {
      // Handle item selection
      const item = flattenMenuItems(menu.items || []).find(
        (item) => item.key === key
      );
      if (item && !item.disabled) {
        handleVisibleChange(false);
      }
    }
  );

  return (
    <div className={className} style={style} ref={triggerRef}>
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: handleTriggerClick,
        onMouseEnter: handleTriggerMouseEnter,
        onMouseLeave: handleTriggerMouseLeave,
        onFocus: handleTriggerFocus,
        onBlur: handleTriggerBlur,
        "aria-expanded": currentVisible,
        "aria-haspopup": "menu",
      })}

      {(currentVisible || !destroyPopupOnHide) && (
        <StyledDropdown
          ref={dropdownRef}
          className={overlayClassName}
          style={overlayStyle}
          $placement={placement}
          $visible={currentVisible}
          $size={menu.size || "md"}
          $theme={menu.theme || "light"}
          accessibility={personalizedProps.accessibility}
          role="menu"
        >
          {arrow && <DropdownArrow $placement={placement} />}
          <Menu {...menu} mode="vertical" />
        </StyledDropdown>
      )}
    </div>
  );
};

// =============================================================================
// BREADCRUMB COMPONENT
// =============================================================================

export const MenuBreadcrumbComponent: React.FC<BreadcrumbProps> = ({
  items = [],
  separator = <ChevronRightIcon />,
  maxItems,
  itemRender,
  className,
  style,
  accessibility: accessibilityProp,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const personalizedProps = {
    accessibility: { ...contextAccessibility, ...accessibilityProp },
  };

  const [showOverflow, setShowOverflow] = useState(false);

  const displayItems = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));
    return [firstItem, { title: "..." }, ...lastItems];
  }, [items, maxItems]);

  const renderItem = (
    item: BreadcrumbItemProps,
    index: number,
    routes: BreadcrumbItemProps[]
  ) => {
    if (itemRender) {
      return itemRender(item, {}, routes, []);
    }

    const isLast = index === displayItems.length - 1;
    const isOverflow = item.title === "...";

    if (isOverflow) {
      return (
        <BreadcrumbOverflow
          type="button"
          onClick={() => setShowOverflow(!showOverflow)}
          aria-label="Show more breadcrumb items"
        >
          <MoreHorizontalIcon />
        </BreadcrumbOverflow>
      );
    }

    const content = item.href ? (
      <BreadcrumbLink
        href={item.href}
        onClick={item.onClick}
        aria-current={isLast ? "page" : undefined}
      >
        {item.title}
      </BreadcrumbLink>
    ) : (
      item.title
    );

    return content;
  };

  return (
    <StyledBreadcrumb
      className={className}
      style={style}
      $size="md"
      accessibility={personalizedProps.accessibility}
      role="navigation"
      aria-label="Breadcrumb navigation"
    >
      {displayItems.map((item, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem
            $clickable={Boolean(item.href || item.onClick)}
            $last={index === displayItems.length - 1}
          >
            {renderItem(item, index, items)}
          </BreadcrumbItem>
          {index < displayItems.length - 1 && (
            <BreadcrumbSeparator aria-hidden="true">
              {separator}
            </BreadcrumbSeparator>
          )}
        </React.Fragment>
      ))}
    </StyledBreadcrumb>
  );
};

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Menu Variants
export const PrimaryMenu: React.FC<Omit<MenuProps, "variant">> = (props) => (
  <Menu {...props} variant="primary" />
);

export const SuccessMenu: React.FC<Omit<MenuProps, "variant">> = (props) => (
  <Menu {...props} variant="success" />
);

export const WarningMenu: React.FC<Omit<MenuProps, "variant">> = (props) => (
  <Menu {...props} variant="warning" />
);

export const ErrorMenu: React.FC<Omit<MenuProps, "variant">> = (props) => (
  <Menu {...props} variant="error" />
);

export const SecondaryMenu: React.FC<Omit<MenuProps, "variant">> = (props) => (
  <Menu {...props} variant="secondary" />
);

// Menu Modes
export const HorizontalMenuLayout: React.FC<Omit<MenuProps, "mode">> = (
  props
) => <Menu {...props} mode="horizontal" />;

export const VerticalMenuLayout: React.FC<Omit<MenuProps, "mode">> = (
  props
) => <Menu {...props} mode="vertical" />;

export const InlineMenuLayout: React.FC<Omit<MenuProps, "mode">> = (props) => (
  <Menu {...props} mode="inline" />
);

export const CollapsedMenuLayout: React.FC<Omit<MenuProps, "mode">> = (
  props
) => <Menu {...props} mode="collapsed" />;

// Menu Themes
export const LightMenuTheme: React.FC<Omit<MenuProps, "theme">> = (props) => (
  <Menu {...props} theme="light" />
);

export const DarkMenuTheme: React.FC<Omit<MenuProps, "theme">> = (props) => (
  <Menu {...props} theme="dark" />
);

// Menu Sizes
export const SmallMenu: React.FC<Omit<MenuProps, "size">> = (props) => (
  <Menu {...props} size="sm" />
);

export const MediumMenu: React.FC<Omit<MenuProps, "size">> = (props) => (
  <Menu {...props} size="md" />
);

export const LargeMenu: React.FC<Omit<MenuProps, "size">> = (props) => (
  <Menu {...props} size="lg" />
);

export const ExtraLargeMenu: React.FC<Omit<MenuProps, "size">> = (props) => (
  <Menu {...props} size="xl" />
);

// Specific Use Cases
export const NavigationMenu: React.FC<MenuProps> = (props) => (
  <Menu {...props} mode="horizontal" selectable={false} />
);

export const SidebarMenu: React.FC<MenuProps> = (props) => (
  <Menu {...props} mode="inline" theme="light" />
);

export const TopbarMenu: React.FC<MenuProps> = (props) => (
  <Menu {...props} mode="horizontal" theme="light" />
);

export const ContextMenuComponent: React.FC<MenuProps> = (props) => (
  <Menu {...props} mode="vertical" />
);

export const DropdownMenuComponent: React.FC<MenuProps> = (props) => (
  <Menu {...props} mode="vertical" />
);

// Breadcrumb Variants
export const MenuCompactBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <MenuBreadcrumbComponent {...props} maxItems={3} />
);

export const MenuIconBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <MenuBreadcrumbComponent {...props} separator={<ChevronRightIcon />} />
);

export const MenuHomeBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <MenuBreadcrumbComponent
    {...props}
    items={[{ title: <HomeIcon />, href: "/" }, ...(props.items || [])]}
  />
);

/**
 * Menu Component
 *
 * A comprehensive navigation menu system with support for horizontal, vertical,
 * inline, and collapsed layouts. Includes dropdown menus, breadcrumbs, keyboard
 * navigation, and full accessibility support.
 *
 * @example
 * // Basic horizontal menu
 * <Menu
 *   mode="horizontal"
 *   items={[
 *     { key: 'home', title: 'Home', icon: <HomeIcon /> },
 *     { key: 'about', title: 'About' },
 *     {
 *       key: 'products',
 *       title: 'Products',
 *       children: [
 *         { key: 'web', title: 'Web Development' },
 *         { key: 'mobile', title: 'Mobile Apps' }
 *       ]
 *     }
 *   ]}
 * />
 *
 * @example
 * // Sidebar menu
 * <SidebarMenu
 *   selectedKeys={['dashboard']}
 *   items={[
 *     { key: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
 *     { key: 'users', title: 'Users', icon: <UsersIcon /> },
 *     { key: 'settings', title: 'Settings', icon: <SettingsIcon /> }
 *   ]}
 * />
 *
 * @example
 * // Dropdown menu
 * <Dropdown
 *   menu={{
 *     items: [
 *       { key: 'profile', title: 'Profile' },
 *       { key: 'settings', title: 'Settings' },
 *       { key: 'logout', title: 'Logout', danger: true }
 *     ]
 *   }}
 *   trigger={['click']}
 *   placement="bottomRight"
 * >
 *   <Button>Actions</Button>
 * </Dropdown>
 *
 * @example
 * // Breadcrumb navigation
 * <MenuBreadcrumbComponent
 *   items={[
 *     { title: 'Home', href: '/' },
 *     { title: 'Products', href: '/products' },
 *     { title: 'Laptop' }
 *   ]}
 *   separator="/"
 * />
 */
