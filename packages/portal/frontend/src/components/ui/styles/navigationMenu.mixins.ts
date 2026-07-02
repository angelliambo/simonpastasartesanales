import styled from "styled-components";

// Interfaces para el componente de navegación
export interface NavigationTheme {
  primary: { [key: string]: string };
  secondary: { [key: string]: string };
  text: {
    primary: string;
    secondary: string;
    disabled?: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  border: {
    light: string;
  };
}

// Container principal del menú de navegación
export const NavigationContainer = styled.div<{
  $collapsed?: boolean;
  $theme?: NavigationTheme;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: width 0.3s ease;
  width: ${({ $collapsed }) => ($collapsed ? "60px" : "240px")};
  overflow: hidden;
`;

// Header del menú de navegación
export const NavigationHeader = styled.div`
  padding: var(--spacing-lg, 16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
`;

// Lista de elementos de navegación
export const NavigationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md, 12px) 0;
`;

// Grupo de navegación
export const NavigationGroup = styled.div`
  margin-bottom: var(--spacing-lg, 16px);
`;

// Título del grupo
export const NavigationGroupTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 var(--spacing-sm, 8px) 0;
  padding: 0 var(--spacing-lg, 16px);
  letter-spacing: 0.5px;
`;

// Componente principal de elemento de navegación
export const NavigationItem = styled.div<{
  $isActive?: boolean;
  $variant?: string;
  $disabled?: boolean;
  $size?: "small" | "medium" | "large";
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--spacing-md, 12px) var(--spacing-lg, 16px);
  margin: 2px var(--spacing-sm, 8px);
  border-radius: var(--border-radius-md, 8px);
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;
  text-decoration: none;

  background: ${({ $isActive, $variant, $disabled, theme }) => {
    if ($disabled) return "transparent";
    if ($isActive) {
      switch ($variant) {
        case "primary":
          return theme.colors.primary[500];
        case "secondary":
          return theme.colors.secondary[500];
        case "ghost":
          return theme.colors.primary[50];
        default:
          return theme.colors.primary[500];
      }
    }
    return "transparent";
  }};

  color: ${({ $isActive, $variant, $disabled, theme }) => {
    if ($disabled)
      return theme.colors.text.secondary;
    if ($isActive) {
      switch ($variant) {
        case "primary":
        case "secondary":
          return "white";
        case "ghost":
          return theme.colors.primary[700];
        default:
          return "white";
      }
    }
    return theme.colors.text.primary;
  }};

  &:hover {
    background: ${({ $disabled, $variant, theme }) => {
      if ($disabled) return "transparent";
      switch ($variant) {
        case "primary":
          return theme.colors.primary[600];
        case "secondary":
          return theme.colors.secondary[600];
        case "ghost":
          return theme.colors.primary[100];
        default:
          return theme.colors.primary[100];
      }
    }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const NavigationIcon = styled.span<{
  $size?: "small" | "medium" | "large";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "14px";
      case "medium":
        return "16px";
      case "large":
        return "18px";
      default:
        return "16px";
    }
  }};
  margin-right: var(--spacing-md, 12px);
  width: 20px;
  height: 20px;
`;

export const NavigationLabel = styled.span<{
  $isSelected?: boolean;
}>`
  flex: 1;
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "400")};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Contenedor del contenido del elemento
export const NavigationItemContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

// Badge para contadores
export const NavigationBadge = styled.span<{
  $variant?: "primary" | "secondary" | "warning" | "error";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  background: ${({ $variant, theme }) => {
    switch ($variant) {
      case "primary":
        return theme.colors.primary[500];
      case "secondary":
        return theme.colors.secondary[500];
      case "warning":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return theme.colors.primary[500];
    }
  }};
  color: white;
`;

// Elementos de dropdown/submenu
export const DropdownContent = styled.div<{
  $isOpen?: boolean;
}>`
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding-left: var(--spacing-xl, 20px);
`;

export const SubmenuItem = styled.div<{
  $isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
  margin: 1px 0;
  border-radius: var(--border-radius-sm, 4px);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary[50] : "transparent"};

  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary[600] : theme.colors.text.secondary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

// Footer del menú de navegación
export const NavigationFooter = styled.div`
  padding: var(--spacing-md, 12px);
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 8px);
`;
