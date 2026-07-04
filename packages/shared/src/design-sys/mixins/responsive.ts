import { css } from "styled-components";

export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

// Sistema de breakpoints unificado
export const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px",
} as const;

// Media queries consistentes
export const media = {
  xs: `(max-width: ${breakpoints.sm})`,
  sm: `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
  md: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  lg: `(min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl})`,
  xl: `(min-width: ${breakpoints.xl})`,
  mobile: `(max-width: ${breakpoints.md})`,
  tablet: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  desktop: `(min-width: ${breakpoints.lg})`,
} as const;

// Mixins responsive helpers
export const mobile = (styles: any) => css`
  @media ${media.mobile} {
    ${styles}
  }
`;

export const tablet = (styles: any) => css`
  @media ${media.tablet} {
    ${styles}
  }
`;

export const desktop = (styles: any) => css`
  @media ${media.desktop} {
    ${styles}
  }
`;

export const xs = (styles: any) => css`
  @media ${media.xs} {
    ${styles}
  }
`;

export const sm = (styles: any) => css`
  @media ${media.sm} {
    ${styles}
  }
`;

export const md = (styles: any) => css`
  @media ${media.md} {
    ${styles}
  }
`;

export const lg = (styles: any) => css`
  @media ${media.lg} {
    ${styles}
  }
`;

export const xl = (styles: any) => css`
  @media ${media.xl} {
    ${styles}
  }
`;

// Hook para detectar breakpoint actual (para lógica JS)
export const getBreakpoint = (width: number): keyof typeof breakpoints => {
  if (width >= parseInt(breakpoints.xl)) return "xl";
  if (width >= parseInt(breakpoints.lg)) return "lg";
  if (width >= parseInt(breakpoints.md)) return "md";
  if (width >= parseInt(breakpoints.sm)) return "sm";
  return "xs";
};
