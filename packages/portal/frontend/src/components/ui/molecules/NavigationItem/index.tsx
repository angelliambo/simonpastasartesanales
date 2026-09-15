import React from "react";
import Text from '@design-sys/atoms/Text';
import {
  NavigationItemContainer,
  NavigationButton,
  AccessibilityProps,
} from "./NavigationItem.styles";

interface NavigationItemProps {
  key: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  accessibility?: AccessibilityProps;
  /** ID único del componente (opcional) - se concatena con "navigation-item-" */
  id?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  key,
  label,
  icon,
  isActive = false,
  onClick,
  disabled = false,
  accessibility,
  id,
}) => {
  const finalId = id ? `navigation-item-${id}` : undefined;

  return (
    <NavigationItemContainer id={finalId} $isActive={isActive} $accessibility={accessibility}>
      <NavigationButton
        variant={isActive ? "primary" : "ghost"}
        size="lg"
        $isActive={isActive}
        onClick={onClick}
        disabled={disabled}
        $accessibility={accessibility}
      >
        {icon}
        <Text
          variant="body1"
          color={isActive ? "inverse" : "primary"}
          weight={isActive ? "semibold" : "medium"}
          size={accessibility?.largeText ? "lg" : "md"}
        >
          {label}
        </Text>
      </NavigationButton>
    </NavigationItemContainer>
  );
};

export default NavigationItem;
