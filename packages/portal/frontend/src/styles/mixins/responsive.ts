import { css } from "styled-components";
import type { SpacingSize } from "./types";

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

/**
 * Mixin para responsive padding/margin usando el sistema Fibonacci
 * 
 * Acepta valores de SpacingSize (xs, sm, md, lg, xl, xxl) que se resuelven
 * automáticamente según el viewport usando el spacing del tema.
 * 
 * @param property - Propiedad CSS (padding, margin, gap, etc.)
 * @param values - Objeto con valores por breakpoint o SpacingSize
 * 
 * @example
 * ```tsx
 * const StyledDiv = styled.div`
 *   ${responsiveSpacing("padding", { xs: "xs", md: "md", lg: "lg" })}
 * `;
 * ```
 */
export const responsiveSpacing = (
  property: string,
  values: {
    xs?: string | SpacingSize;
    sm?: string | SpacingSize;
    md?: string | SpacingSize;
    lg?: string | SpacingSize;
    xl?: string | SpacingSize;
    xxl?: string | SpacingSize;
  }
) => css<{ theme: any }>`
  // Mobile first (< 768px) - valores por defecto desde theme.spacing.mobile
  ${(props) => {
    const getMobileValue = (val?: string | SpacingSize) => {
      if (!val) return "";
      if (typeof val === "string" && !["xs", "sm", "md", "lg", "xl", "xxl"].includes(val)) {
        return val; // Es un valor CSS directo
      }
      const size = val as SpacingSize;
      return props.theme?.spacing?.mobile?.[size] || props.theme?.spacing?.[size] || "0px";
    };

    return values.xs ? `${property}: ${getMobileValue(values.xs)};` : "";
  }}

  // Tablet (768px - 992px)
  ${values.sm &&
  tablet(css<{ theme: any }>`
    ${(props) => {
      const getTabletValue = (val?: string | SpacingSize) => {
        if (!val) return "";
        if (typeof val === "string" && !["xs", "sm", "md", "lg", "xl", "xxl"].includes(val)) {
          return val; // Es un valor CSS directo
        }
        const size = val as SpacingSize;
        return props.theme?.spacing?.tablet?.[size] || props.theme?.spacing?.[size] || "0px";
      };
      return `${property}: ${getTabletValue(values.sm)};`;
    }}
  `)}

  ${values.md &&
  tablet(css<{ theme: any }>`
    ${(props) => {
      const getTabletValue = (val?: string | SpacingSize) => {
        if (!val) return "";
        if (typeof val === "string" && !["xs", "sm", "md", "lg", "xl", "xxl"].includes(val)) {
          return val;
        }
        const size = val as SpacingSize;
        return props.theme?.spacing?.tablet?.[size] || props.theme?.spacing?.[size] || "0px";
      };
      return `${property}: ${getTabletValue(values.md)};`;
    }}
  `)}

  // Desktop (> 992px) - valores por defecto desde theme.spacing
  ${values.md &&
  desktop(css<{ theme: any }>`
    ${(props) => {
      const getDesktopValue = (val?: string | SpacingSize) => {
        if (!val) return "";
        if (typeof val === "string" && !["xs", "sm", "md", "lg", "xl", "xxl"].includes(val)) {
          return val;
        }
        const size = val as SpacingSize;
        return props.theme?.spacing?.[size] || "0px";
      };
      return `${property}: ${getDesktopValue(values.md)};`;
    }}
  `)}

  ${values.lg &&
  desktop(css<{ theme: any }>`
    ${(props) => {
      const size = values.lg as SpacingSize;
      return `${property}: ${props.theme?.spacing?.[size] || "0px"};`;
    }}
  `)}

  ${values.xl &&
  desktop(css<{ theme: any }>`
    ${(props) => {
      const size = values.xl as SpacingSize;
      return `${property}: ${props.theme?.spacing?.[size] || "0px"};`;
    }}
  `)}

  ${values.xxl &&
  desktop(css<{ theme: any }>`
    ${(props) => {
      const size = values.xxl as SpacingSize;
      return `${property}: ${props.theme?.spacing?.[size] || "0px"};`;
    }}
  `)}
`;

// Mixin para responsive font-size
export const responsiveFontSize = (values: {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}) => css`
  ${values.xs && `font-size: ${values.xs};`}

  ${values.sm &&
  sm(css`
    font-size: ${values.sm};
  `)}
  
  ${values.md &&
  md(css`
    font-size: ${values.md};
  `)}
  
  ${values.lg &&
  lg(css`
    font-size: ${values.lg};
  `)}
  
  ${values.xl &&
  xl(css`
    font-size: ${values.xl};
  `)}
`;

// Mixin para responsive grid columns
export const responsiveGrid = (columns: {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}) => css`
  display: grid;

  ${columns.xs && `grid-template-columns: repeat(${columns.xs}, 1fr);`}

  ${columns.sm &&
  sm(css`
    grid-template-columns: repeat(${columns.sm}, 1fr);
  `)}
  
  ${columns.md &&
  md(css`
    grid-template-columns: repeat(${columns.md}, 1fr);
  `)}
  
  ${columns.lg &&
  lg(css`
    grid-template-columns: repeat(${columns.lg}, 1fr);
  `)}
  
  ${columns.xl &&
  xl(css`
    grid-template-columns: repeat(${columns.xl}, 1fr);
  `)}
`;

// Mixin para responsive flex direction
export const responsiveFlexDirection = (directions: {
  xs?: "row" | "column" | "row-reverse" | "column-reverse";
  sm?: "row" | "column" | "row-reverse" | "column-reverse";
  md?: "row" | "column" | "row-reverse" | "column-reverse";
  lg?: "row" | "column" | "row-reverse" | "column-reverse";
  xl?: "row" | "column" | "row-reverse" | "column-reverse";
}) => css`
  display: flex;

  ${directions.xs && `flex-direction: ${directions.xs};`}

  ${directions.sm &&
  sm(css`
    flex-direction: ${directions.sm};
  `)}
  
  ${directions.md &&
  md(css`
    flex-direction: ${directions.md};
  `)}
  
  ${directions.lg &&
  lg(css`
    flex-direction: ${directions.lg};
  `)}
  
  ${directions.xl &&
  xl(css`
    flex-direction: ${directions.xl};
  `)}
`;
