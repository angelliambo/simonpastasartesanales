import lightTheme from './light';
import type { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // 1. Primario (Verde Pino Forestal Resplandeciente para tema oscuro)
    primary: {
      50: '#08100a',
      100: '#0c1810',
      200: '#102015',
      300: '#14291a',
      400: '#1b4332',
      500: '#52b788',
      600: '#74c69d',
      700: '#95d5b2',
      800: '#b7e4c7',
      900: '#d8f3dc',
    },
    // 2. Secundario (Dorado Ocre Terroso / Ámbar Miel para tema oscuro)
    secondary: {
      50: '#1f1308',
      100: '#3f230d',
      200: '#573415',
      300: '#73481e',
      400: '#905d27',
      500: '#f59e0b',
      600: '#fbbf24',
      700: '#fcd34d',
      800: '#fef08a',
      900: '#fffbeb',
    },
    // 3. Terciario (Verde Oliva Noche / Crema Tostado Oscuro)
    tertiary: {
      50: '#0f1712',
      100: '#141f17',
      200: '#1a291f',
      300: '#23382b',
      400: '#2d4737',
      500: '#3a5a46',
      600: '#4d735a',
      700: '#6b9478',
      800: '#95b59f',
      900: '#c2d6c6',
    },
    // 4. Fondos Oscuros Gourmet (Verde Noche Caoba Profundo)
    background: {
      primary: '#0d1510',
      secondary: '#141f17',
      tertiary: '#1a291f',
      surface: '#141f17',
      card: '#1a291f',
    },
    // 5. Textos de alto contraste sobre fondo oscuro
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverse: '#0d1510',
    },
    // 6. Bordes a tono verde oliva noche
    border: {
      light: '#23382b',
      normal: '#2d4737',
      dark: '#3a5a46',
    },
  },
  shadows: {
    light: '0 1px 3px rgba(0, 0, 0, 0.5)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.5)',
    heavy: '0 10px 15px rgba(0, 0, 0, 0.6)',
  },
  highlight: {
    main: '#52b788',
    light: '#74c69d',
    glow: 'rgba(82, 183, 136, 0.5)',
  },
  brand: {
    purple400: '#f59e0b',
    pink500: '#ad7231',
    indigo500: '#2d6a4f',
    indigo400: '#52b788',
  },
  effects: {
    glassBackground: 'rgba(20, 31, 23, 0.85)',
    glassBorder: 'rgba(82, 183, 136, 0.15)',
    glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
    blur: {
      subtle: '4px',
      glass: '12px',
      heavy: '16px',
      extreme: '60px',
    },
    glow: {
      primary: '0 4px 12px rgba(82, 183, 136, 0.5)',
      premium: '0 4px 12px rgba(245, 158, 11, 0.4)',
      success: '0 4px 12px rgba(34, 197, 94, 0.5)',
    },
  },
  gradients: {
    brand: 'linear-gradient(135deg, #52b788 0%, #f59e0b 100%)',
    premium: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #52b788 100%)',
    highlight: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    glass: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)',
  },
  animations: {
    duration: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1s',
      slowest: '2s',
    },
    easing: {
      default: 'ease',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  animatedBackground: {
    darkGradient1: '#0d1510',
    darkGradient2: '#141f17',
    darkGradient3: '#0d1510',
    starColor: '#f8fafc',
    starColorAlpha80: 'rgba(248, 250, 252, 0.8)',
    starColorAlpha90: 'rgba(248, 250, 252, 0.9)',
    starColorAlpha70: 'rgba(248, 250, 252, 0.7)',
    starColorAlpha60: 'rgba(248, 250, 252, 0.6)',
    auroraIndigo: 'rgba(82, 183, 136, 0.15)',
    auroraTertiary: 'rgba(245, 158, 11, 0.12)',
    auroraCyan: 'rgba(45, 106, 79, 0.08)',
  },
};

export default darkTheme;