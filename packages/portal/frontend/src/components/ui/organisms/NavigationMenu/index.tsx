import React from "react";
import { useAccessibilityPreferences } from "../../../../hooks/accessibility/useAccessibilityPreferences";
import {
  NavigationContainer,
  NavigationItem,
  NavigationIcon,
} from "./NavigationMenu.styles";

interface NavigationItemType {
  id?: string;
  label: string;
  icon?: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

interface NavigationMenuProps {
  items: NavigationItemType[];
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "compact" | "minimal";
  className?: string;
  style?: React.CSSProperties;
  currentPath?: string;
  onMenuClick?: (info: { key: string }) => void;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** ID único del componente (opcional) - se concatena con "navigation-menu-" */
  id?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  orientation = "horizontal",
  variant = "default",
  className,
  style,
  onMenuClick,
  accessibility,
  id,
}) => {
  const { preferences } = useAccessibilityPreferences();
  const largeText = accessibility?.largeText || preferences?.largeText || false;
  const highContrast =
    accessibility?.highContrast || preferences?.highContrast || false;

  const handleItemClick = (item: NavigationItemType) => {
    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    } else if (onMenuClick && item.id) {
      onMenuClick({ key: item.id });
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, item: NavigationItemType) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemClick(item);
    }
  };

  const finalId = id ? `navigation-menu-${id}` : undefined;

  return (
    <NavigationContainer
      id={finalId}
      $orientation={orientation}
      $variant={variant}
      $largeText={largeText}
      $highContrast={highContrast}
      className={className}
      style={style}
      aria-label="Navegación principal"
    >
      {items.map((item, index) => (
        <NavigationItem
          key={item.id || index}
          $isActive={item.isActive || false}
          $disabled={item.disabled || false}
          $variant={variant}
          $largeText={largeText}
          $highContrast={highContrast}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          tabIndex={item.disabled ? -1 : 0}
          role="menuitem"
          aria-current={item.isActive ? "page" : undefined}
          aria-disabled={item.disabled}
        >
          {item.icon && (
            <NavigationIcon $largeText={largeText}>{item.icon}</NavigationIcon>
          )}
          <span>{item.label}</span>
        </NavigationItem>
      ))}
    </NavigationContainer>
  );
};

export default NavigationMenu;
