import styled from "styled-components";
import { AccessibilityProps, SpacingSize } from "./types";
import { media } from "./responsive";

// ============================================================================
// CONTAINERS Y LAYOUTS
// ============================================================================

export const PersonalizationContainer = styled.div<{
  variant?: string;
  size?: string;
  accessibility?: AccessibilityProps;
}>`
  background: ${({ theme, accessibility }) => theme.colors.background.primary};
  border-radius: ${({ theme, size }) => {
    switch (size) {
      case "sm":
        return theme.borderRadius.md;
      case "lg":
        return theme.borderRadius.xl;
      default:
        return theme.borderRadius.lg;
    }
  }};
  padding: ${({ theme, size, accessibility }) => {
    const basePadding =
      size === "sm"
        ? theme.spacing.md
        : size === "lg"
        ? theme.spacing.xxl
        : theme.spacing.lg;
    return accessibility?.largeText
      ? `${parseInt(basePadding) * 1.5}px`
      : basePadding;
  }};
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  transition: all 0.3s ease;

  @media ${media.mobile} {
    padding: ${({ theme, accessibility }) =>
      accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  }
`;

export const PersonalizationHeader = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  margin-bottom: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  padding-bottom: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  border-bottom: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
`;

export const PersonalizationContent = styled.div<{
  maxHeight?: string;
  accessibility?: AccessibilityProps;
}>`
  max-height: ${({ maxHeight }) => maxHeight || "600px"};
  overflow-y: auto;
  padding-right: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.sm : "4px"};

  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: ${({ accessibility }) => (accessibility?.largeText ? "8px" : "6px")};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.surface
        : theme.colors.background.surface};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.border.normal
        : theme.colors.border.light};
    border-radius: 3px;

    &:hover {
      background: ${({ theme, accessibility }) =>
        accessibility?.highContrast ? "#a0a0a0" : theme.colors.text.tertiary};
    }
  }
`;

// ============================================================================
// SECCIONES Y CARDS
// ============================================================================

export const PersonalizationSection = styled.div<{
  spacing?: SpacingSize;
  accessibility?: AccessibilityProps;
}>`
  margin-bottom: ${({ theme, spacing, accessibility }) => {
    const baseSpacing = spacing ? theme.spacing[spacing] : theme.spacing.lg;
    return accessibility?.largeText
      ? `${parseInt(baseSpacing) * 1.5}px`
      : baseSpacing;
  }};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PersonalizationCard = styled.div<{
  variant?: "default" | "surface" | "elevated";
  interactive?: boolean;
  accessibility?: AccessibilityProps;
}>`
  background: ${({ theme, variant, accessibility }) => {
    if (accessibility?.highContrast) return theme.colors.neutral[900];
    switch (variant) {
      case "surface":
        return theme.colors.background.surface;
      case "elevated":
        return theme.colors.background.card;
      default:
        return theme.colors.background.surface;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.xl : theme.spacing.lg};
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
  box-shadow: ${({ theme, variant, accessibility }) => {
    if (accessibility?.highContrast) return theme.shadows.medium;
    switch (variant) {
      case "elevated":
        return theme.shadows.medium;
      default:
        return theme.shadows.light;
    }
  }};
  transition: all 0.3s ease;
  cursor: ${({ interactive }) => (interactive ? "pointer" : "default")};

  ${({ interactive, theme, accessibility }) =>
    interactive &&
    `
    &:hover {
      transform: ${accessibility?.reducedMotion ? "none" : "translateY(-2px)"};
      box-shadow: ${theme.shadows.heavy};
      border-color: ${
        accessibility?.highContrast
          ? theme.colors.border.normal
          : theme.colors.primary[300]
      };
    }
  `}

  @media ${media.mobile} {
    padding: ${({ theme, accessibility }) =>
      accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  }
`;

// ============================================================================
// FORMULARIOS Y CONTROLES
// ============================================================================

export const PersonalizationForm = styled.form<{
  layout?: "vertical" | "horizontal";
  accessibility?: AccessibilityProps;
}>`
  display: flex;
  flex-direction: ${({ layout }) =>
    layout === "horizontal" ? "row" : "column"};
  gap: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};

  @media ${media.mobile} {
    flex-direction: column;
    gap: ${({ theme, accessibility }) =>
      accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  }
`;

export const PersonalizationField = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.sm : "4px"};

  label {
    font-size: ${({ theme, accessibility }) =>
      accessibility?.largeText ? "16px" : "14px"};
    font-weight: 500;
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.text.primary};
  }

  .ant-input,
  .ant-select,
  .ant-slider {
    font-size: ${({ theme, accessibility }) =>
      accessibility?.largeText ? "16px" : "14px"};
  }
`;

// ============================================================================
// BOTONES Y ACCIONES
// ============================================================================

export const PersonalizationActions = styled.div<{
  justify?: "start" | "center" | "end" | "space-between";
  accessibility?: AccessibilityProps;
}>`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: center;
  gap: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  margin-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  padding-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  border-top: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};

  @media ${media.mobile} {
    flex-direction: column;
    gap: ${({ theme, accessibility }) =>
      accessibility?.largeText ? theme.spacing.sm : "8px"};
  }
`;

export const PersonalizationButton = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  accessibility?: AccessibilityProps;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.sm : "8px"};
  padding: ${({ theme, size, accessibility }) => {
    const basePadding =
      size === "sm" ? "8px 16px" : size === "lg" ? "16px 32px" : "12px 24px";
    return accessibility?.largeText
      ? `${parseInt(basePadding) * 1.5}px`
      : basePadding;
  }};
  font-size: ${({ theme, size, accessibility }) => {
    const baseSize = size === "sm" ? "12px" : size === "lg" ? "16px" : "14px";
    return accessibility?.largeText
      ? `${parseInt(baseSize) * 1.2}px`
      : baseSize;
  }};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: ${({ accessibility }) =>
    accessibility?.largeText ? "48px" : "36px"};

  ${({ theme, variant, accessibility }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${
            accessibility?.highContrast
              ? theme.colors.text.inverse
              : theme.colors.primary[500]
          };
          color: ${
            accessibility?.highContrast ? theme.colors.text.inverse : "#ffffff"
          };
          border-color: ${
            accessibility?.highContrast
              ? theme.colors.text.inverse
              : theme.colors.primary[500]
          };
          
          &:hover {
            background: ${
              accessibility?.highContrast
                ? theme.colors.background.surface
                : theme.colors.primary[600]
            };
            border-color: ${
              accessibility?.highContrast
                ? theme.colors.background.surface
                : theme.colors.primary[600]
            };
          }
        `;
      case "secondary":
        return `
          background: ${
            accessibility?.highContrast
              ? theme.colors.background.surface
              : theme.colors.background.surface
          };
          color: ${
            accessibility?.highContrast
              ? theme.colors.text.inverse
              : theme.colors.text.primary
          };
          border-color: ${
            accessibility?.highContrast ? "#808080" : theme.colors.border.light
          };
          
          &:hover {
            background: ${
              accessibility?.highContrast
                ? "#3a3a3a"
                : theme.colors.background.surface
            };
            border-color: ${
              accessibility?.highContrast
                ? "#a0a0a0"
                : theme.colors.primary[300]
            };
          }
        `;
      case "danger":
        return `
          background: ${theme.colors.error[500]};
          color: theme.colors.text.inverse;
          border-color: ${theme.colors.error[500]};
          
          &:hover {
            background: ${theme.colors.error[600]};
            border-color: ${theme.colors.error[600]};
          }
        `;
      case "ghost":
        return `
          background: transparent;
          color: ${
            accessibility?.highContrast
              ? theme.colors.text.inverse
              : theme.colors.text.primary
          };
          border-color: transparent;
          
          &:hover {
            background: ${
              accessibility?.highContrast
                ? theme.colors.background.surface
                : theme.colors.background.surface
            };
          }
        `;
      default:
        return `
          background: ${
            accessibility?.highContrast
              ? theme.colors.background.surface
              : theme.colors.background.surface
          };
          color: ${
            accessibility?.highContrast
              ? theme.colors.text.inverse
              : theme.colors.text.primary
          };
          border-color: ${
            accessibility?.highContrast ? "#808080" : theme.colors.border.light
          };
          
          &:hover {
            background: ${
              accessibility?.highContrast
                ? "#3a3a3a"
                : theme.colors.background.surface
            };
            border-color: ${
              accessibility?.highContrast
                ? "#a0a0a0"
                : theme.colors.primary[300]
            };
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? `2px solid ${theme.colors.border.light}`
        : `2px solid ${theme.colors.primary[500]}`};
    outline-offset: 2px;
  }
`;

// ============================================================================
// COMPONENTES ESPECÍFICOS DE PERSONALIZACIÓN
// ============================================================================

export const ThemeBuilderContainer = styled(PersonalizationContainer)<{
  colors: any;
}>`
  background-color: ${({ colors }) => colors.background.primary};
`;

export const ColorPaletteSection = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  .ant-card {
    transition: all 0.3s ease;

    &:hover {
      transform: ${({ accessibility }) =>
        accessibility?.reducedMotion ? "none" : "translateY(-2px)"};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const TypographySection = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  .ant-slider {
    .ant-slider-track {
      background: linear-gradient(90deg, #1890ff 0%, #52c41a 100%);
    }

    .ant-slider-handle {
      border: 2px solid #1890ff;
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
    }
  }
`;

export const SpacingSection = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  .ant-slider {
    .ant-slider-track {
      background: linear-gradient(90deg, #722ed1 0%, #fa8c16 100%);
    }

    .ant-slider-handle {
      border: 2px solid #722ed1;
      box-shadow: 0 2px 8px rgba(114, 46, 209, 0.3);
    }
  }
`;

export const BoxShadowSection = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  .ant-input {
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: ${({ accessibility }) =>
      accessibility?.largeText ? "16px" : "12px"};
  }
`;

export const PreviewSection = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  margin-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.xl : theme.spacing.lg};
  animation: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "slideIn 0.3s ease-out"};

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ProfileCard = styled(PersonalizationCard)<{
  isActive?: boolean;
  accessibility?: AccessibilityProps;
}>`
  ${({ isActive, theme, accessibility }) =>
    isActive &&
    `
    background: ${
      accessibility?.highContrast
        ? theme.colors.background.surface
        : theme.colors.primary[50]
    };
    border-color: ${
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.primary[300]
    };
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: ${
        accessibility?.highContrast
          ? theme.colors.text.inverse
          : `linear-gradient(180deg, ${theme.colors.primary[500]} 0%, ${theme.colors.success[500]} 100%)`
      };
    }
  `}
`;

export const ProfileStats = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  margin-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  padding-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  border-top: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
`;

export const ConfigurationSection = styled(PersonalizationSection)``;

export const ConfigurationHistory = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  background-color: ${({ theme, accessibility }) =>
    theme.colors.background.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
  max-height: 200px;
  overflow-y: auto;

  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme, accessibility }) =>
      theme.colors.background.primary};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.border.normal
        : theme.colors.border.light};
    border-radius: 2px;

    &:hover {
      background: ${({ theme, accessibility }) =>
        accessibility?.highContrast ? "#a0a0a0" : theme.colors.text.tertiary};
    }
  }
`;

// ============================================================================
// ANIMACIONES Y EFECTOS
// ============================================================================

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const slideInAnimation = `
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const pulseAnimation = `
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// ============================================================================
// UTILIDADES Y HELPERS
// ============================================================================

export const PersonalizationUtils = {
  // Calcular puntuación de configuración
  calculateConfigScore: (preferences: any) => {
    let score = 0;
    const maxScore = 10;

    if (preferences.accessibility?.highContrast) score += 1;
    if (preferences.accessibility?.fontSizeMultiplier > 1) score += 1;
    if (preferences.accessibility?.colorBlindSupport) score += 1;
    if (preferences.accessibility?.keyboardNavigation) score += 1;
    if (preferences.accessibility?.readingGuide) score += 1;
    if (preferences.visual?.darkMode) score += 1;
    if (preferences.visual?.lightMode) score += 1;
    if (preferences.productivity?.keyboardShortcuts) score += 1;
    if (preferences.productivity?.autoSave) score += 1;
    if (preferences.productivity?.quickActions) score += 1;

    return Math.round((score / maxScore) * 100);
  },

  // Obtener color según puntuación
  getScoreColor: (score: number, colors: any) => {
    if (score >= 80) return colors.success[500];
    if (score >= 60) return colors.warning[500];
    return colors.error[500];
  },

  // Obtener estado según puntuación
  getScoreStatus: (score: number) => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Bueno";
    return "Necesita Mejoras";
  },

  // Generar nombre de archivo único
  generateFileName: (prefix: string = "config") => {
    const timestamp = new Date().toISOString().split("T")[0];
    return `${prefix}_${timestamp}.json`;
  },

  // Validar archivo de configuración
  validateConfigFile: (data: string) => {
    try {
      const config = JSON.parse(data);

      const requiredFields = [
        "customThemes",
        "profiles",
        "currentProfile",
        "defaultTheme",
      ];
      const missingFields = requiredFields.filter(
        (field) => !(field in config)
      );

      if (missingFields.length > 0) {
        return {
          isValid: false,
          errors: [`Campos faltantes: ${missingFields.join(", ")}`],
        };
      }

      return {
        isValid: true,
        errors: [],
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ["Archivo JSON inválido"],
      };
    }
  },

  // Formatear fecha
  formatDate: (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  },
};
