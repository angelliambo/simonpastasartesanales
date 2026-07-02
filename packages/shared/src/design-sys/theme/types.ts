import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      tertiary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      success: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      warning: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      error: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      info: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        surface: string;
        card: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
      };
      border: {
        light: string;
        normal: string;
        dark: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      mobile?: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      tablet?: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      light: string;
      medium: string;
      heavy: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
        mono: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
      fontScale: {
        normal: number;
        medium: number;
        large: number;
      };
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    highlight: {
      main: string;
      light: string;
      glow: string;
    };
    brand: {
      purple400: string;
      pink500: string;
      indigo500: string;
      indigo400: string;
    };
    effects: {
      glassBackground: string;
      glassBorder: string;
      glassShadow: string;
      blur: {
        subtle: string;
        glass: string;
        heavy: string;
        extreme: string;
      };
      glow: {
        primary: string;
        premium: string;
        success: string;
      };
    };
    gradients: {
      brand: string;
      premium: string;
      highlight: string;
      glass: string;
    };
    animations: {
      duration: {
        instant: string;
        fast: string;
        normal: string;
        slow: string;
        slower: string;
        slowest: string;
      };
      easing: {
        default: string;
        smooth: string;
        spring: string;
        bounce: string;
      };
    };
    animatedBackground: {
      darkGradient1: string;
      darkGradient2: string;
      darkGradient3: string;
      starColor: string;
      starColorAlpha80: string;
      starColorAlpha90: string;
      starColorAlpha70: string;
      starColorAlpha60: string;
      auroraIndigo: string;
      auroraTertiary: string;
      auroraCyan: string;
    };
  }
}
