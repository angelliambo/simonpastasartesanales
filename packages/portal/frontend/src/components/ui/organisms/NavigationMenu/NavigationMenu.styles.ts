import styled from 'styled-components';

export const NavigationContainer = styled.nav<{
  $orientation: string;
  $variant: string;
  $largeText?: boolean;
  $highContrast?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === "vertical" ? "column" : "row"};
  gap: ${({ $variant, $largeText, theme }) => {
    if ($variant === "compact") return $largeText ? theme.spacing.xs : "4px";
    if ($variant === "minimal") return $largeText ? theme.spacing.md : theme.spacing.sm;
    return $largeText ? theme.spacing.lg : theme.spacing.md;
  }};
  align-items: ${({ $orientation }) =>
    $orientation === "vertical" ? "stretch" : "center"};
  width: ${({ $orientation }) => ($orientation === "vertical" ? "100%" : "auto")};

  ${({ $variant, $largeText, theme }) => {
    if ($variant === "minimal") {
      return `
        padding: ${$largeText ? theme.spacing.md : theme.spacing.sm};
        background: ${theme.colors.background.primary};
        border-radius: ${theme.borderRadius.md};
      `;
    }
    return "";
  }}
`;

export const NavigationItem = styled.button<{
  $isActive: boolean;
  $disabled: boolean;
  $variant: string;
  $largeText?: boolean;
  $highContrast?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${({ $largeText, theme }) => ($largeText ? theme.spacing.sm : theme.spacing.xs)};
  padding: ${({ $variant, $largeText, theme }) => {
    if ($variant === "compact") return $largeText ? `${theme.spacing.xs} ${theme.spacing.sm}` : `6px ${theme.spacing.xs}`;
    if ($variant === "minimal") return $largeText ? `${theme.spacing.sm} ${theme.spacing.md}` : `${theme.spacing.xs} ${theme.spacing.sm}`;
    return $largeText ? `${theme.spacing.md} 20px` : `${theme.spacing.sm} ${theme.spacing.md}`;
  }};
  border: none;
  background: ${({ theme, $isActive, $highContrast }) => {
    if ($isActive) {
      return $highContrast ? theme.colors.background.primary : theme.colors.primary[500];
    }
    return "transparent";
  }};
  color: ${({ theme, $isActive, $disabled, $highContrast }) => {
    if ($disabled) {
      return theme.colors.text.secondary;
    }
    if ($isActive) {
      return $highContrast ? theme.colors.text.primary : theme.colors.text.inverse;
    }
    return theme.colors.text.primary;
  }};
  border-radius: ${({ $variant, theme }) => ($variant === "minimal" ? theme.borderRadius.sm : theme.borderRadius.md)};
  font-size: ${({ $largeText, theme }) => ($largeText ? theme.typography.fontSize.md : theme.typography.fontSize.sm)};
  font-weight: ${({ $isActive, theme }) => ($isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all ${props => props.theme.transitions.fast};
  text-decoration: none;
  width: 100%;
  justify-content: flex-start;
  text-align: left;

  &:hover {
    background: ${({ theme, $isActive, $disabled, $highContrast }) => {
      if ($disabled) return "transparent";
      if ($isActive) {
        return $highContrast ? theme.colors.background.secondary : theme.colors.primary[600];
      }
      return theme.colors.background.secondary;
    }};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary[500]};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const NavigationIcon = styled.span<{
  $largeText?: boolean;
}>`
  font-size: ${({ $largeText, theme }) => ($largeText ? theme.typography.fontSize.xl : theme.typography.fontSize.md)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
