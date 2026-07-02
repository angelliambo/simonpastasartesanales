// frontend/src/components/ui/NavigationMenu.tsx
import React from "react";
import styled from "styled-components";
import { useAccessibilityPreferences } from "../../../../hooks/accessibility/useAccessibilityPreferences";
import { useThemeColors } from "../../../../hooks/useThemeColors";
import { createShouldForwardProp } from "../../../../utils/shouldForwardProp";

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

const NavigationContainer = styled.nav.withConfig({
  shouldForwardProp: createShouldForwardProp(["orientation", "variant", "largeText", "highContrast"]),
})<{
  orientation: string;
  variant: string;
  largeText: boolean;
  highContrast: boolean;
}>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "vertical" ? "column" : "row"};
  gap: ${({ variant, largeText }) => {
    if (variant === "compact") return largeText ? "8px" : "4px";
    if (variant === "minimal") return largeText ? "16px" : "12px";
    return largeText ? "24px" : "16px";
  }};
  align-items: ${({ orientation }) =>
    orientation === "vertical" ? "stretch" : "center"};
  width: ${({ orientation }) => (orientation === "vertical" ? "100%" : "auto")};

  ${({ variant, largeText, highContrast }) => {
    if (variant === "minimal") {
      return `
        padding: ${largeText ? "16px" : "12px"};
        background: ${({ colors }: { colors: any }) =>
          colors.background.primary};
        border-radius: 8px;
      `;
    }
    return "";
  }}
`;

const NavigationItem = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp(["colors", "variant", "isActive", "disabled", "largeText", "highContrast"]),
})<{
  isActive: boolean;
  disabled: boolean;
  variant: string;
  largeText: boolean;
  highContrast: boolean;
  colors: any;
}>`
  display: flex;
  align-items: center;
  gap: ${({ largeText }) => (largeText ? "12px" : "8px")};
  padding: ${({ variant, largeText }) => {
    if (variant === "compact") return largeText ? "8px 12px" : "6px 8px";
    if (variant === "minimal") return largeText ? "12px 16px" : "8px 12px";
    return largeText ? "16px 20px" : "12px 16px";
  }};
  border: none;
  background: ${({ colors, isActive, highContrast }) => {
    if (isActive) {
      return highContrast ? colors.background.primary : colors.primary[50];
    }
    return "transparent";
  }};
  color: ${({ colors, isActive, disabled, highContrast }) => {
    if (disabled) {
      return colors.text.secondary;
    }
    if (isActive) {
      return highContrast ? colors.text.primary : colors.text.inverse;
    }
    return colors.text.primary;
  }};
  border-radius: ${({ variant }) => (variant === "minimal" ? "6px" : "8px")};
  font-size: ${({ largeText }) => (largeText ? "16px" : "14px")};
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  text-decoration: none;
  width: 100%;
  justify-content: flex-start;
  text-align: left;

  &:hover {
    background: ${({ colors, isActive, disabled, highContrast }) => {
      if (disabled) return "transparent";
      if (isActive) {
        return highContrast ? colors.background.secondary : colors.primary[50];
      }
      return colors.background.secondary;
    }};
  }

  &:focus {
    outline: 2px solid ${({ colors }) => colors.primary[500]};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const NavigationIcon = styled.span.withConfig({
  shouldForwardProp: createShouldForwardProp(["largeText"]),
})<{
  largeText: boolean;
}>`
  font-size: ${({ largeText }) => (largeText ? "20px" : "16px")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  orientation = "horizontal",
  variant = "default",
  className,
  style,
  currentPath,
  onMenuClick,
  accessibility,
}) => {
  const { preferences } = useAccessibilityPreferences();
  const colors = useThemeColors();
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
      orientation={orientation}
      variant={variant}
      largeText={largeText}
      highContrast={highContrast}
      className={className}
      style={style}
      aria-label="Navegación principal"
    >
      {items.map((item, index) => (
        <NavigationItem
          key={item.id || index}
          isActive={item.isActive || false}
          disabled={item.disabled || false}
          variant={variant}
          largeText={largeText}
          highContrast={highContrast}
          colors={colors}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          tabIndex={item.disabled ? -1 : 0}
          role="menuitem"
          aria-current={item.isActive ? "page" : undefined}
          aria-disabled={item.disabled}
        >
          {item.icon && (
            <NavigationIcon largeText={largeText}>{item.icon}</NavigationIcon>
          )}
          <span>{item.label}</span>
        </NavigationItem>
      ))}
    </NavigationContainer>
  );
};

export default NavigationMenu;
