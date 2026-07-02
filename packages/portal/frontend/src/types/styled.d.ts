import "styled-components";

declare module "styled-components" {
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
      tertiary?: {
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
      success: {
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
      warning: {
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
      error: {
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
      info?: {
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
      neutral?: {
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
      border: {
        light: string;
        normal: string;
        dark: string;
      };
    };
    shadows: {
      light: string;
      medium: string;
      heavy: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
      "2xl"?: string;
      inner?: string;
      none?: string;
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
      none?: string;
      "2xl"?: string;
      "3xl"?: string;
      full?: string;
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
        base?: string;
        "2xl"?: string;
        "3xl"?: string;
        "4xl"?: string;
        "5xl"?: string;
        "6xl"?: string;
      };
      fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold?: number;
      };
      lineHeight: {
        tight: number;
        snug: number;
        normal: number;
        relaxed: number;
        loose: number;
      };
      fontScale?: {
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
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
