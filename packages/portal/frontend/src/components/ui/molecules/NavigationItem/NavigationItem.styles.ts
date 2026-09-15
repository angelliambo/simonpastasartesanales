import styled from 'styled-components';
import Button from '@design-sys/atoms/Button';

export interface AccessibilityProps {
  highContrast?: boolean;
  largeText?: boolean;
}

export const NavigationItemContainer = styled.div<{
  $isActive: boolean;
  $accessibility?: AccessibilityProps;
}>`
  margin: ${props => props.theme.spacing.xs} 0;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  transform: translateX(0);
  overflow: hidden;

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background: ${theme.colors.primary[500]};
  `}

  ${({ $accessibility, theme }) =>
    $accessibility?.highContrast &&
    `
    border: 2px solid ${theme.colors.border};
  `}
`;

export const NavigationButton = styled(Button)<{
  $isActive: boolean;
  $accessibility?: AccessibilityProps;
}>`
  width: 100%;
  justify-content: flex-start;
  text-align: left;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  min-height: 48px;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${({ $accessibility, theme }) =>
    $accessibility?.largeText ? theme.typography.fontSize.lg : theme.typography.fontSize.md};
  font-weight: ${({ $isActive, theme }) => ($isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium)};
  border: 2px solid transparent;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[500] : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text.inverse : theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary[600] : theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.primary[500]};
    transform: translateX(4px);
  }

  &:active:not(:disabled) {
    transform: translateX(2px);
  }

  ${({ $accessibility, theme }) =>
    $accessibility?.highContrast &&
    `
    border-color: ${theme.colors.border};
    &:hover:not(:disabled) {
      border-color: ${theme.colors.primary[500]};
    }
  `}

  .anticon {
    margin-right: ${props => props.theme.spacing.sm};
    font-size: ${({ $accessibility, theme }) =>
      $accessibility?.largeText ? theme.typography.fontSize.xl : theme.typography.fontSize.lg};
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.text.inverse : theme.colors.text.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
