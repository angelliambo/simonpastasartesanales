import { DefaultTheme } from "styled-components";

// Extender el tema de styled-components
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // Colores primarios
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
      // Colores secundarios
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
      // Colores terciarios
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
      // Colores neutros
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
      // Colores semánticos
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
      // Colores de aplicación
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
      // Desktop por defecto (valores Fibonacci)
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      // Responsive spacing
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
    transitions?: {
      fast: string;
      normal: string;
      slow: string;
    };
    highlight?: {
      main: string;
      light: string;
      glow: string;
    };
    brand?: {
      purple400: string;
      pink500: string;
      indigo500: string;
      indigo400: string;
    };
    effects?: {
      glassBackground: string;
      glassBorder: string;
      glassShadow: string;
      blur?: {
        subtle: string;
        glass: string;
        heavy: string;
        extreme: string;
      };
      glow?: {
        primary: string;
        premium: string;
        success: string;
      };
    };
    gradients?: {
      brand: string;
      premium: string;
      highlight: string;
      glass: string;
    };
    animations?: {
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
    animatedBackground?: {
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

// Tema claro
export const lightTheme: DefaultTheme = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    secondary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    tertiary: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7c3aed",
      800: "#6b21a8",
      900: "#581c87",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    warning: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
    },
    error: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    info: {
      50: "#eff6ff",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    background: {
      primary: "#f0f0f0", // Más oscuro para distinguir cards blancas
      secondary: "#e8e8e8", // Más oscuro para mejor contraste
      tertiary: "#e0e0e0",
      surface: "#f0f0f0",
      card: "#ffffff",
    },
    text: {
      primary: "#171717",
      secondary: "#525252",
      tertiary: "#737373",
      inverse: "#fafafa",
    },
    border: {
      light: "#f5f5f5",
      normal: "#e5e5e5",
      dark: "#d4d4d4",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
    heavy: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      secondary: 'Georgia, "Times New Roman", Times, serif',
      mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "32px",
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
    fontScale: {
      normal: 0, // Tamaño base
      medium: 3, // +3px del tamaño base
      large: 6, // +6px del tamaño base
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  transitions: {
    fast: "0.15s ease",
    normal: "0.2s ease",
    slow: "0.3s ease",
  },
  highlight: {
    main: "#3b82f6",
    light: "#93c5fd",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  brand: {
    purple400: "#c084fc",
    pink500: "#ec4899",
    indigo500: "#6366f1",
    indigo400: "#818cf8",
  },
  effects: {
    glassBackground: "rgba(255, 255, 255, 0.7)",
    glassBorder: "rgba(255, 255, 255, 0.3)",
    glassShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    blur: {
      subtle: "4px",
      glass: "12px",
      heavy: "16px",
      extreme: "60px",
    },
    glow: {
      primary: "0 4px 12px rgba(59, 130, 246, 0.4)",
      premium: "0 4px 12px rgba(168, 85, 247, 0.4)",
      success: "0 4px 12px rgba(34, 197, 94, 0.4)",
    },
  },
  gradients: {
    brand: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
    premium: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
    highlight: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    glass: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)",
  },
  animations: {
    duration: {
      instant: "100ms",
      fast: "200ms",
      normal: "300ms",
      slow: "500ms",
      slower: "1s",
      slowest: "2s",
    },
    easing: {
      default: "ease",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
  animatedBackground: {
    darkGradient1: "#eff6ff",
    darkGradient2: "#dbeafe",
    darkGradient3: "#eff6ff",
    starColor: "#3b82f6",
    starColorAlpha80: "rgba(59, 130, 246, 0.8)",
    starColorAlpha90: "rgba(59, 130, 246, 0.9)",
    starColorAlpha70: "rgba(59, 130, 246, 0.7)",
    starColorAlpha60: "rgba(59, 130, 246, 0.6)",
    auroraIndigo: "rgba(99, 102, 241, 0.1)",
    auroraTertiary: "rgba(168, 85, 247, 0.08)",
    auroraCyan: "rgba(6, 182, 212, 0.05)",
  },
};

// Tema oscuro
export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      50: "#1e3a8a",
      100: "#1e40af",
      200: "#1d4ed8",
      300: "#2563eb",
      400: "#3b82f6",
      500: "#60a5fa",
      600: "#93c5fd",
      700: "#bfdbfe",
      800: "#dbeafe",
      900: "#eff6ff",
    },
    secondary: {
      50: "#14532d",
      100: "#166534",
      200: "#15803d",
      300: "#16a34a",
      400: "#22c55e",
      500: "#4ade80",
      600: "#86efac",
      700: "#bbf7d0",
      800: "#dcfce7",
      900: "#f0fdf4",
    },
    tertiary: {
      50: "#581c87",
      100: "#6b21a8",
      200: "#7c3aed",
      300: "#9333ea",
      400: "#a855f7",
      500: "#c084fc",
      600: "#d8b4fe",
      700: "#e9d5ff",
      800: "#f3e8ff",
      900: "#faf5ff",
    },
    background: {
      primary: "#171717",
      secondary: "#262626",
      tertiary: "#404040",
      surface: "#171717",
      card: "#262626",
    },
    text: {
      primary: "#fafafa",
      secondary: "#d4d4d4",
      tertiary: "#a3a3a3",
      inverse: "#171717",
    },
    border: {
      light: "#404040",
      normal: "#525252",
      dark: "#737373",
    },
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.3)",
    heavy: "0 10px 15px rgba(0, 0, 0, 0.3)",
  },
};

// Temas de accesibilidad - Centralizados en theme.ts
export const highContrastTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Alto contraste: colores vibrantes sobre fondos contrastantes
    primary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#0000ff", // Azul vibrante
      600: "#0000cc",
      700: "#000099",
      800: "#000066",
      900: "#000033",
    },
    secondary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#ff0000", // Rojo vibrante
      600: "#cc0000",
      700: "#990000",
      800: "#660000",
      900: "#330000",
    },
    tertiary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#00ff00", // Verde vibrante
      600: "#00cc00",
      700: "#009900",
      800: "#006600",
      900: "#003300",
    },
    neutral: {
      50: "#ffffff", // Blanco puro
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#000000", // Negro puro
      600: "#000000",
      700: "#000000",
      800: "#000000",
      900: "#000000",
    },
    success: {
      50: "#ffffff",
      500: "#00ff00", // Verde brillante
      600: "#00cc00",
      700: "#009900",
    },
    warning: {
      50: "#ffffff",
      500: "#ffff00", // Amarillo brillante
      600: "#cccc00",
      700: "#999900",
    },
    error: {
      50: "#ffffff",
      500: "#ff0000", // Rojo brillante
      600: "#cc0000",
      700: "#990000",
    },
    info: {
      50: "#ffffff",
      500: "#0000ff", // Azul brillante
      600: "#0000cc",
      700: "#000099",
    },
    background: {
      primary: "#ffffff", // Fondo blanco
      secondary: "#ffffff",
      tertiary: "#ffffff",
      surface: "#ffffff",
      card: "#ffffff",
    },
    text: {
      primary: "#000000", // Texto negro
      secondary: "#000000",
      tertiary: "#000000",
      inverse: "#ffffff", // Texto blanco para fondos oscuros
    },
    border: {
      light: "#000000", // Bordes negros
      normal: "#000000",
      dark: "#000000",
    },
  },
  typography: {
    ...lightTheme.typography,
    fontWeight: {
      light: 400,
      normal: 500,
      medium: 600,
      semibold: 700,
      bold: 800,
    },
  },
};

// Exportar el tipo para uso en otros archivos
export type { DefaultTheme };
