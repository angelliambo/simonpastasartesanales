import React from "react";
import styled, { css } from "styled-components";
import { ContainerProps } from "./Container.types";
import { mobile } from "../../../../styles/mixins/responsive";

// Styled component base
const StyledContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "maxWidth",
      "padding",
      "margin",
      "background",
      "borderRadius",
      "shadow",
    ].includes(prop),
})<ContainerProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  // Max width
  ${({ theme, maxWidth = "lg" }) => {
    switch (maxWidth) {
      case "xs":
        return `max-width: 320px;`;
      case "sm":
        return `max-width: 576px;`;
      case "md":
        return `max-width: 768px;`;
      case "lg":
        return `max-width: 992px;`;
      case "xl":
        return `max-width: 1200px;`;
      case "full":
        return `max-width: 100%;`; // Usar 100% en lugar de 100vw para evitar overflow
      default:
        return `max-width: 992px;`;
    }
  }}

  // Padding usando sistema responsive
  ${({ theme, padding = "md" }) => {
    if (padding === "none") return "";

    // Para desktop usa el padding normal
    const desktopPadding =
      theme.spacing[padding as keyof typeof theme.spacing] || theme.spacing.md;

    // Determinar los valores de padding para mobile según el prop
    let mobilePaddingLeft = theme.spacing.mobile?.xs || theme.spacing.xs;
    let mobilePaddingRight = theme.spacing.mobile?.xs || theme.spacing.xs;
    let mobilePaddingTop = theme.spacing.mobile?.sm || theme.spacing.sm;
    let mobilePaddingBottom = theme.spacing.mobile?.sm || theme.spacing.sm;

    if (padding === "xs") {
      mobilePaddingLeft = theme.spacing.mobile?.xs || theme.spacing.xs;
      mobilePaddingRight = theme.spacing.mobile?.xs || theme.spacing.xs;
      mobilePaddingTop = theme.spacing.mobile?.sm || theme.spacing.sm;
      mobilePaddingBottom = theme.spacing.mobile?.sm || theme.spacing.sm;
    } else if (padding === "sm") {
      mobilePaddingLeft = theme.spacing.mobile?.sm || theme.spacing.sm;
      mobilePaddingRight = theme.spacing.mobile?.sm || theme.spacing.sm;
      mobilePaddingTop = theme.spacing.mobile?.sm || theme.spacing.sm;
      mobilePaddingBottom = theme.spacing.mobile?.sm || theme.spacing.sm;
    } else if (padding === "md") {
      mobilePaddingLeft = theme.spacing.mobile?.md || theme.spacing.md;
      mobilePaddingRight = theme.spacing.mobile?.md || theme.spacing.md;
      mobilePaddingTop = theme.spacing.mobile?.md || theme.spacing.md;
      mobilePaddingBottom = theme.spacing.mobile?.md || theme.spacing.md;
    } else if (padding === "lg") {
      mobilePaddingLeft = theme.spacing.mobile?.lg || theme.spacing.lg;
      mobilePaddingRight = theme.spacing.mobile?.lg || theme.spacing.lg;
      mobilePaddingTop = theme.spacing.mobile?.lg || theme.spacing.lg;
      mobilePaddingBottom = theme.spacing.mobile?.lg || theme.spacing.lg;
    } else if (padding === "xl") {
      mobilePaddingLeft = theme.spacing.mobile?.xl || theme.spacing.xl;
      mobilePaddingRight = theme.spacing.mobile?.xl || theme.spacing.xl;
      mobilePaddingTop = theme.spacing.mobile?.xl || theme.spacing.xl;
      mobilePaddingBottom = theme.spacing.mobile?.xl || theme.spacing.xl;
    } else if (padding === "xxl") {
      mobilePaddingLeft = theme.spacing.mobile?.xxl || theme.spacing.xxl;
      mobilePaddingRight = theme.spacing.mobile?.xxl || theme.spacing.xxl;
      mobilePaddingTop = theme.spacing.mobile?.xxl || theme.spacing.xxl;
      mobilePaddingBottom = theme.spacing.mobile?.xxl || theme.spacing.xxl;
    }

    return `
      ${mobile(css<{ theme: any }>`
        padding-left: ${mobilePaddingLeft};
        padding-right: ${mobilePaddingRight};
        padding-top: ${mobilePaddingTop};
        padding-bottom: ${mobilePaddingBottom};
        max-width: 100%; // Usar 100% en lugar de 100vw para evitar overflow
        width: 100%;
        box-sizing: border-box;
        margin-left: 0;
        margin-right: 0;
      `)}
      
      @media (min-width: 768px) {
        padding-top: ${desktopPadding};
        padding-bottom: ${desktopPadding};
        // Para desktop, usar padding horizontal más pequeño (12px) para evitar overflow
        padding-left: ${padding === "lg" ? "12px" : desktopPadding};
        padding-right: ${padding === "lg" ? "12px" : desktopPadding};
      }
    `;
  }}
  
  // Margin
  ${({ theme, margin = "none" }) => {
    if (margin === "none") return "";

    return `margin: ${theme.spacing[margin]};`;
  }}
  
  // Background
  ${({ theme, background = "transparent" }) => {
    switch (background) {
      case "primary":
        return `background-color: ${theme.colors.primary[600]};`;
      case "secondary":
        return `background-color: ${theme.colors.secondary[600]};`;
      case "tertiary":
        return `background-color: ${theme.colors.tertiary[600]};`;
      case "surface":
        return `background-color: ${theme.colors.background.surface};`;
      case "card":
        return `background-color: ${theme.colors.background.card};`;
      case "transparent":
      default:
        return `background-color: transparent;`;
    }
  }}
  
  // Border radius
  ${({ theme, borderRadius = "none" }) => {
    if (borderRadius === "none") return "";

    return `border-radius: ${theme.borderRadius[borderRadius]};`;
  }}
  
  // Shadow
  ${({ theme, shadow = "none" }) => {
    if (shadow === "none") return "";

    return `box-shadow: ${theme.shadows[shadow]};`;
  }}
`;

// Componente Container principal
export const Container: React.FC<ContainerProps> = ({ children, id, ...props }) => {
  const finalId = id ? `container-${id}` : undefined;
  return <StyledContainer id={finalId} {...props}>{children}</StyledContainer>;
};

// Componentes predefinidos para facilitar el uso
export const PageContainer: React.FC<
  Omit<ContainerProps, "maxWidth" | "padding">
> = (props) => <Container maxWidth="lg" padding="lg" {...props} />;

export const CardContainer: React.FC<
  Omit<ContainerProps, "background" | "borderRadius" | "shadow">
> = (props) => (
  <Container background="card" borderRadius="md" shadow="light" {...props} />
);

export const SectionContainer: React.FC<
  Omit<ContainerProps, "maxWidth" | "padding">
> = (props) => <Container maxWidth="xl" padding="xl" {...props} />;

export const FluidContainer: React.FC<Omit<ContainerProps, "maxWidth">> = (
  props
) => <Container maxWidth="full" {...props} />;

export type { ContainerProps };
