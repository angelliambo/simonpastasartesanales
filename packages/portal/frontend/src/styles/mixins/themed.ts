import styled from "styled-components";
import { DefaultTheme } from "styled-components";

/**
 * MIXINS BASE PARA SISTEMA DE TEMAS
 * 
 * Este archivo proporciona mixins que usan el sistema de temas dinámicamente
 * en lugar de colores hardcodeados, asegurando compatibilidad con modo oscuro
 * y temas de accesibilidad.
 */

// Tipos para los mixins
interface ThemeProps {
  theme: DefaultTheme;
}

interface AccessibilityProps {
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
}

// Mixin para cards que respeta el sistema de temas
export const ThemedCard = styled.div<ThemeProps & AccessibilityProps>`
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

// Mixin para textos primarios
export const ThemedTextPrimary = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  font-weight: 500;
`;

// Mixin para textos secundarios
export const ThemedTextSecondary = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 400;
`;

// Mixin para textos terciarios
export const ThemedTextTertiary = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 12px;
  font-weight: 400;
`;

// Mixin para números de estadísticas con colores semánticos
export const ThemedStatNumber = styled.div<ThemeProps & {
  color?: "primary" | "success" | "warning" | "error";
}>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme, color }) => {
    switch (color) {
      case "success":
        return theme.colors.success[500];
      case "warning":
        return theme.colors.warning[500];
      case "error":
        return theme.colors.error[500];
      default:
        return theme.colors.primary[500];
    }
  }};
  margin-bottom: 4px;
`;

// Mixin para títulos que respeta el sistema de temas
export const ThemedTitle = styled.h1<ThemeProps>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`;

// Mixin para subtítulos
export const ThemedSubtitle = styled.h2<ThemeProps>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
`;

// Mixin para contenedores de estadísticas
export const ThemedStatsContainer = styled.div<ThemeProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 16px 0;
`;

// Mixin para botones que respeta el sistema de temas
export const ThemedButton = styled.button<ThemeProps & {
  variant?: "primary" | "secondary" | "outline";
}>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.secondary[500];
      case "outline":
        return "transparent";
      default:
        return theme.colors.primary[500];
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case "outline":
        return theme.colors.primary[500];
      default:
        return theme.colors.text.inverse;
    }
  }};
  border: 1px solid ${({ theme, variant }) => {
    switch (variant) {
      case "outline":
        return theme.colors.primary[500];
      default:
        return "transparent";
    }
  }};
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Mixin para badges/etiquetas
export const ThemedBadge = styled.span<ThemeProps & {
  variant?: "primary" | "success" | "warning" | "error" | "info";
}>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case "success":
        return theme.colors.success[500];
      case "warning":
        return theme.colors.warning[500];
      case "error":
        return theme.colors.error[500];
      case "info":
        return theme.colors.info[500];
      default:
        return theme.colors.primary[500];
    }
  }};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

// Mixin para iconos con colores temáticos
export const ThemedIcon = styled.span<ThemeProps & {
  color?: "primary" | "success" | "warning" | "error" | "info" | "secondary";
}>`
  color: ${({ theme, color }) => {
    switch (color) {
      case "success":
        return theme.colors.success[500];
      case "warning":
        return theme.colors.warning[500];
      case "error":
        return theme.colors.error[500];
      case "info":
        return theme.colors.info[500];
      case "secondary":
        return theme.colors.secondary[500];
      default:
        return theme.colors.primary[500];
    }
  }};
  font-size: 16px;
`;

// Mixin para cards de dashboard
export const ThemedDashboardCard = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

// Mixin para secciones de contenido
export const ThemedSection = styled.section<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

// Mixin para listas temáticas
export const ThemedList = styled.ul<ThemeProps>`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: ${({ theme }) => theme.colors.text.primary};
    padding: 8px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

    &:last-child {
      border-bottom: none;
    }
  }
`;

// Mixin para inputs que respetan el sistema de temas
export const ThemedInput = styled.input<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[500]}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

// Mixin para modales que respetan el sistema de temas
export const ThemedModal = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

// Mixin para tooltips
export const ThemedTooltip = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;
