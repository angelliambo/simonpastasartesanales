import type { ThemeOverride } from '@factory/shared/design-sys/theme/types';

/**
 * SOBREESCRITURAS LOCALES DEL TEMA PARA EL PORTAL
 *
 * Usa este archivo para personalizar y brandear visualmente tu portal SaaS.
 * El tipado es 'ThemeOverride' (DeepPartial de DefaultTheme).
 */
export const localThemeOverride: ThemeOverride = {
  // 🎨 PALETA DE COLORES Y FONDOS (Identidad Minimalista Clara: Off-White & Charcoal Steel)
  colors: {
    // 1. Colores primarios (Azul Acero Moderno)
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },

    // 2. Colores secundarios (Verde Menta Suave)
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },

    // 3. Colores terciarios (Violeta Minimalista)
    tertiary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },

    // 4. Colores semánticos (Estados)
    success: { 50: '#ecfdf5', 500: '#10b981', 600: '#059669', 700: '#047857' },
    warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
    error: { 50: '#fff5f5', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
    info: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
  },

  // ✍️ TIPOGRAFÍA Y FUENTES
  typography: {
    fontFamily: {
      primary: '"Inter", sans-serif',
      secondary: '"Outfit", sans-serif',
      mono: 'monospace',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '30px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // 📐 ESPACIADOS Y MÁRGENES
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // 🔲 RADIOS DE BORDE (Redondeo de esquinas)
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  // 👥 SOMBRAS (Resaltan los elementos sobre el fondo claro)
  shadows: {
    light: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    heavy: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  // 🌌 EFECTOS VISUALES (Glassmorphism sutil adaptado a temas claros)
  effects: {
    glassBackground: 'rgba(255, 255, 255, 0.85)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
    glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
    blur: {
      subtle: 'blur(4px)',
      glass: 'blur(16px)',
      heavy: 'blur(32px)',
      extreme: 'blur(48px)',
    },
  },

  // 🌈 GRADIENTES (Modernos y sutiles)
  gradients: {
    brand: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%)',
    premium: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    highlight: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
  }
};
