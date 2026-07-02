import React from "react";
import styled from "styled-components";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import { DefaultTheme } from "../../../../styles/theme";

interface NavigationItemProps {
  key: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
  /** ID único del componente (opcional) - se concatena con "navigation-item-" */
  id?: string;
}

const NavigationItemContainer = styled.div<{
  theme: DefaultTheme;
  isActive: boolean;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
}>`
  margin: 4px 0;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0);
  overflow: hidden;

  ${({ isActive, theme }) =>
    isActive &&
    `
    background: ${theme.colors.primary[500]};
    box-shadow: 0 2px 8px ${theme.colors.primary[200]};
  `}

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    `
    border: 2px solid ${theme.colors.border.dark};
  `}
`;

const NavigationButton = styled(Button)<{
  isActive: boolean;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
}>`
  width: 100%;
  justify-content: flex-start;
  text-align: left;
  padding: 12px 16px;
  min-height: 48px;
  border-radius: 8px;
  font-size: ${({ accessibility }) =>
    accessibility?.largeText ? "18px" : "16px"};
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  border: 2px solid transparent;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary[500] : "transparent"};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.text.inverse : theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${({ isActive, theme }) =>
      isActive ? theme.colors.primary[600] : theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.primary[300]};
    transform: translateX(4px);
  }

  &:active:not(:disabled) {
    transform: translateX(2px);
  }

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    `
    border-color: ${theme.colors.border.dark};
    &:hover:not(:disabled) {
      border-color: ${theme.colors.primary[500]};
    }
  `}

  .anticon {
    margin-right: 12px;
    font-size: ${({ accessibility }) =>
      accessibility?.largeText ? "20px" : "18px"};
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.text.inverse : theme.colors.text.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

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
    <NavigationItemContainer id={finalId} isActive={isActive} accessibility={accessibility}>
      <NavigationButton
        variant={isActive ? "primary" : "ghost"}
        size="lg"
        isActive={isActive}
        onClick={onClick}
        disabled={disabled}
        accessibility={accessibility}
        style={{
          backgroundColor: isActive ? undefined : "transparent",
        }}
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
