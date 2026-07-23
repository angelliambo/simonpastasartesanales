import { DefaultTheme } from 'styled-components';

// Helper para obtener colores de texto
export const getTextColor = (theme: DefaultTheme, color?: string): string => {
  if (!color) return theme.colors.text.primary;
  
  const colorMap: Record<string, string> = {
    primary: theme.colors.text.primary,
    secondary: theme.colors.text.secondary,
    tertiary: theme.colors.text.tertiary,
    success: theme.colors.success[500],
    warning: theme.colors.warning[500],
    error: theme.colors.error[500],
    info: theme.colors.info[500],
    inverse: theme.colors.text.inverse,
  };
  
  return colorMap[color] || color;
};

// Helper para obtener colores de fondo
export const getBackgroundColor = (theme: DefaultTheme, background?: string): string => {
  if (!background || background === 'transparent') return 'transparent';
  
  const backgroundMap: Record<string, string> = {
    primary: theme.colors.background.primary,
    secondary: theme.colors.background.secondary,
    tertiary: theme.colors.background.tertiary,
    card: theme.colors.background.card,
    surface: theme.colors.background.surface,
  };
  
  return backgroundMap[background] || background;
};

// Helper para obtener colores de borde
export const getBorderColor = (theme: DefaultTheme, state?: string): string => {
  const borderMap: Record<string, string> = {
    default: theme.colors.border.normal,
    error: theme.colors.error[500],
    success: theme.colors.success[500],
    warning: theme.colors.warning[500],
    info: theme.colors.info[500],
  };
  
  return borderMap[state || 'default'] || theme.colors.border.normal;
};

// Helper para obtener colores de sombra de enfoque
export const getFocusShadowColor = (theme: DefaultTheme, state?: string): string => {
  const shadowMap: Record<string, string> = {
    default: theme.colors.primary[50],
    error: theme.colors.error[50],
    success: theme.colors.success[50],
    warning: theme.colors.warning[50],
    info: theme.colors.info[50],
  };
  
  return shadowMap[state || 'default'] || theme.colors.primary[50];
};

// Helper para obtener tamaños de fuente
export const getFontSize = (theme: DefaultTheme, size?: string): string => {
  if (!size) return theme.typography.fontSize.md;
  
  const sizeMap: Record<string, string> = {
    xs: theme.typography.fontSize.xs,
    sm: theme.typography.fontSize.sm,
    md: theme.typography.fontSize.md,
    lg: theme.typography.fontSize.lg,
    xl: theme.typography.fontSize.xl,
    xxl: theme.typography.fontSize.xxl,
    xxxl: theme.typography.fontSize.xxxl,
  };
  
  return sizeMap[size] || theme.typography.fontSize.md;
};

// Helper para obtener pesos de fuente
export const getFontWeight = (theme: DefaultTheme, weight?: string): number => {
  const weights = theme?.typography?.fontWeight;
  if (!weight) return weights?.normal || 400;
  
  const weightMap: Record<string, number | undefined> = {
    light: weights?.light || 300,
    normal: weights?.normal || 400,
    medium: weights?.medium || 500,
    semibold: weights?.semibold || 600,
    bold: weights?.bold || 700,
  };
  
  return weightMap[weight] || weights?.normal || 400;
};

// Helper para obtener alturas de línea
export const getLineHeight = (theme: DefaultTheme, lineHeight?: string): number => {
  const lineHeights = theme?.typography?.lineHeight;
  if (!lineHeight) return lineHeights?.normal || 1.5;
  
  const lineHeightMap: Record<string, number | undefined> = {
    tight: lineHeights?.tight || 1.25,
    normal: lineHeights?.normal || 1.5,
    relaxed: lineHeights?.relaxed || 1.75,
  };
  
  return lineHeightMap[lineHeight] || lineHeights?.normal || 1.5;
};

// Helper para obtener espaciado
export const getSpacing = (theme: DefaultTheme, spacing?: string): string => {
  const spacings = theme?.spacing;
  if (!spacing) return spacings?.md || "16px";
  
  const spacingMap: Record<string, string | undefined> = {
    xs: spacings?.xs || "4px",
    sm: spacings?.sm || "8px",
    md: spacings?.md || "16px",
    lg: spacings?.lg || "24px",
    xl: spacings?.xl || "32px",
    xxl: spacings?.xxl || "48px",
  };
  
  return spacingMap[spacing] || spacings?.md || "16px";
};

// Helper para obtener border radius
export const getBorderRadius = (theme: DefaultTheme, borderRadius?: string): string => {
  const radiuses = theme?.borderRadius;
  if (!borderRadius) return radiuses?.md || "8px";
  
  const borderRadiusMap: Record<string, string | undefined> = {
    sm: radiuses?.sm || "4px",
    md: radiuses?.md || "8px",
    lg: radiuses?.lg || "12px",
    xl: radiuses?.xl || "16px",
  };
  
  return borderRadiusMap[borderRadius] || radiuses?.md || "8px";
};

// Helper para obtener sombras
export const getShadow = (theme: DefaultTheme, shadow?: string): string => {
  if (!shadow || shadow === 'none') return 'none';
  const shadows = theme?.shadows;
  
  const shadowMap: Record<string, string | undefined> = {
    light: shadows?.light || "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: shadows?.medium || "0 4px 6px rgba(0, 0, 0, 0.1)",
    heavy: shadows?.heavy || "0 10px 15px rgba(0, 0, 0, 0.1)",
  };
  
  return shadowMap[shadow] || shadows?.medium || "0 4px 6px rgba(0, 0, 0, 0.1)";
};

// Helper para obtener colores de botón
export const getButtonColors = (theme: DefaultTheme, variant?: string) => {
  const colorMap: Record<string, { bg: string; color: string; border: string; hoverBg: string; hoverBorder: string; activeBg: string; activeBorder: string }> = {
    primary: {
      bg: theme.colors.primary[500],
      color: theme.colors.text.inverse,
      border: theme.colors.primary[500],
      hoverBg: theme.colors.primary[600],
      hoverBorder: theme.colors.primary[600],
      activeBg: theme.colors.primary[700],
      activeBorder: theme.colors.primary[700],
    },
    secondary: {
      bg: theme.colors.secondary[500],
      color: theme.colors.text.inverse,
      border: theme.colors.secondary[500],
      hoverBg: theme.colors.secondary[600],
      hoverBorder: theme.colors.secondary[600],
      activeBg: theme.colors.secondary[700],
      activeBorder: theme.colors.secondary[700],
    },
    outline: {
      bg: 'transparent',
      color: theme.colors.primary[500],
      border: theme.colors.primary[500],
      hoverBg: theme.colors.primary[50],
      hoverBorder: theme.colors.primary[600],
      activeBg: theme.colors.primary[50],
      activeBorder: theme.colors.primary[700],
    },
    ghost: {
      bg: 'transparent',
      color: theme.colors.text.primary,
      border: 'transparent',
      hoverBg: theme.colors.background.secondary,
      hoverBorder: 'transparent',
      activeBg: theme.colors.neutral[200],
      activeBorder: 'transparent',
    },
    danger: {
      bg: theme.colors.error[500],
      color: theme.colors.text.inverse,
      border: theme.colors.error[500],
      hoverBg: theme.colors.error[600],
      hoverBorder: theme.colors.error[600],
      activeBg: theme.colors.error[700],
      activeBorder: theme.colors.error[700],
    },
    success: {
      bg: theme.colors.success[500],
      color: theme.colors.text.inverse,
      border: theme.colors.success[500],
      hoverBg: theme.colors.success[600],
      hoverBorder: theme.colors.success[600],
      activeBg: theme.colors.success[700],
      activeBorder: theme.colors.success[700],
    },
    warning: {
      bg: theme.colors.warning[500],
      color: theme.colors.text.inverse,
      border: theme.colors.warning[500],
      hoverBg: theme.colors.warning[600],
      hoverBorder: theme.colors.warning[600],
      activeBg: theme.colors.warning[700],
      activeBorder: theme.colors.warning[700],
    },
    info: {
      bg: theme.colors.info[500],
      color: theme.colors.text.inverse,
      border: theme.colors.info[500],
      hoverBg: theme.colors.info[600],
      hoverBorder: theme.colors.info[600],
      activeBg: theme.colors.info[700],
      activeBorder: theme.colors.info[700],
    },
  };
  
  return colorMap[variant || 'primary'] || colorMap.primary;
};

// Helper para obtener tamaños de botón
export const getButtonSize = (theme: DefaultTheme, size?: string, icon?: boolean) => {
  const sizeMap: Record<string, { padding: string; fontSize: string; minHeight: string }> = {
    xs: {
      padding: icon ? '4px' : '4px 8px',
      fontSize: theme.typography.fontSize.xs,
      minHeight: '24px',
    },
    sm: {
      padding: icon ? '6px' : '6px 12px',
      fontSize: theme.typography.fontSize.sm,
      minHeight: '32px',
    },
    md: {
      padding: icon ? '8px' : '8px 16px',
      fontSize: theme.typography.fontSize.md,
      minHeight: '40px',
    },
    lg: {
      padding: icon ? '12px' : '12px 24px',
      fontSize: theme.typography.fontSize.lg,
      minHeight: '48px',
    },
    xl: {
      padding: icon ? '16px' : '16px 32px',
      fontSize: theme.typography.fontSize.xl,
      minHeight: '56px',
    },
  };
  
  return sizeMap[size || 'md'] || sizeMap.md;
};

// Helper para obtener tamaños de input
export const getInputSize = (theme: DefaultTheme, size?: string) => {
  const sizeMap: Record<string, { padding: string; fontSize: string; minHeight: string }> = {
    sm: {
      padding: '6px 12px',
      fontSize: theme.typography.fontSize.sm,
      minHeight: '32px',
    },
    md: {
      padding: '8px 16px',
      fontSize: theme.typography.fontSize.md,
      minHeight: '40px',
    },
    lg: {
      padding: '12px 20px',
      fontSize: theme.typography.fontSize.lg,
      minHeight: '48px',
    },
  };
  
  return sizeMap[size || 'md'] || sizeMap.md;
};
