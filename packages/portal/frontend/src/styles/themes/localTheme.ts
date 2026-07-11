import type { ThemeOverride } from '@factory/shared/design-sys/theme/types';

/**
 * SOBREESCRITURAS LOCALES DEL TEMA PARA EL PORTAL
 *
 * Usa este archivo para personalizar y brandear visualmente tu portal SaaS.
 * El tipado es 'ThemeOverride' (DeepPartial de DefaultTheme).
 */
export const localThemeOverride: ThemeOverride = {
  // 🎨 PALETA DE COLORES Y FONDOS (Identidad Pastas Simón: Verde Pino Forestal, Dorado Ocre & Fondo Crema)
  colors: {
    // 1. Colores primarios (Verde Pino Forestal)
    primary: {
      50: '#f3f6f4',
      100: '#e0eae2',
      200: '#c2d6c6',
      300: '#99b8a0',
      400: '#6c9374',
      500: '#193220',
      600: '#14291a',
      700: '#102015',
      800: '#0c1810',
      900: '#08100a',
    },

    // 2. Colores secundarios (Dorado Ocre Terroso)
    secondary: {
      50: '#fbf5ed',
      100: '#f5e7d5',
      200: '#eccda9',
      300: '#e1ae78',
      400: '#d48f48',
      500: '#ad7231',
      600: '#905d27',
      700: '#73481e',
      800: '#573415',
      900: '#3f230d',
    },

    // 3. Colores terciarios (Crema / Beige Cálido)
    tertiary: {
      50: '#fdfcfb',
      100: '#faf7f2',
      200: '#f5f2eb',
      300: '#ede7db',
      400: '#dfd7c5',
      500: '#d0c3aa',
      600: '#baaa8b',
      700: '#a39170',
      800: '#8a7857',
      900: '#6b5c40',
    },

    // 4. Colores de la aplicación (Fondo Crema Cálido de Pastas Simón)
    background: {
      primary: '#fdfbf7',
      secondary: '#ffffff',
      tertiary: '#f5f2eb',
      surface: '#ffffff',
      card: '#ffffff',
    },

    // 5. Paleta de textos con contraste perfecto sobre fondos claros
    text: {
      primary: '#112215',
      secondary: '#3c4740',
      tertiary: '#7b8780',
      inverse: '#ffffff',
    },

    // 6. Bordes limpios y discretos a tono
    border: {
      light: '#edeae3',
      normal: '#dfdcd5',
      dark: '#b5b2ab',
    },

    // 7. Colores semánticos (Estados)
    success: { 50: '#f0fdf4', 500: '#16a34a', 600: '#15803d', 700: '#166534' },
    warning: { 50: '#fffbeb', 500: '#d97706', 600: '#b45309', 700: '#92400e' },
    error: { 50: '#fef2f2', 500: '#dc2626', 600: '#b91c1c', 700: '#991b1b' },
    info: { 50: '#f0f9ff', 500: '#0284c7', 600: '#0369a1', 700: '#075985' },
  },

  // ✍️ TIPOGRAFÍA Y FUENTES
  typography: {
    fontFamily: {
      primary: '"Inter", sans-serif',
      secondary: '"Playfair Display", "Lora", serif',
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

  // 🔲 RADIOS DE BORDE
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  // 👥 SOMBRAS
  shadows: {
    light: '0 1px 3px rgba(25, 50, 32, 0.05), 0 1px 2px rgba(25, 50, 32, 0.03)',
    medium: '0 4px 6px -1px rgba(25, 50, 32, 0.08), 0 2px 4px -1px rgba(25, 50, 32, 0.04)',
    heavy: '0 10px 15px -3px rgba(25, 50, 32, 0.1), 0 4px 6px -2px rgba(25, 50, 32, 0.05)',
  },

  // 🌌 EFECTOS VISUALES
  effects: {
    glassBackground: 'rgba(253, 251, 247, 0.85)',
    glassBorder: 'rgba(25, 50, 32, 0.05)',
    glassShadow: '0 8px 32px 0 rgba(25, 50, 32, 0.04)',
    blur: {
      subtle: 'blur(4px)',
      glass: 'blur(16px)',
      heavy: 'blur(32px)',
      extreme: 'blur(48px)',
    },
  },

  // 🌈 GRADIENTES (Verde forestal institucional a dorado ocre)
  gradients: {
    brand: 'linear-gradient(135deg, #193220 0%, #ad7231 100%)',
    premium: 'linear-gradient(135deg, #193220 0%, #112215 100%)',
    highlight: 'linear-gradient(135deg, #ad7231 0%, #82521c 100%)',
    glass: 'linear-gradient(135deg, rgba(253, 251, 247, 0.85) 0%, rgba(253, 251, 247, 0.45) 100%)',
  }
};
