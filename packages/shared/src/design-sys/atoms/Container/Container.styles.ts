import styled, { css } from "styled-components";
import { ContainerProps } from "./Container.types";
import { mobile } from "../../mixins/responsive";

const maxWidthMap: Record<string, string> = {
  xs: "320px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  full: "100%",
};

const getContainerMaxWidth = (maxWidth: string = "lg") =>
  maxWidthMap[maxWidth] || maxWidthMap.lg;

const getContainerBackground = (background: string = "transparent", theme: any) => {
  const bgMap: Record<string, string> = {
    primary: theme.colors.primary[600],
    secondary: theme.colors.secondary[600],
    tertiary: theme.colors.tertiary[600],
    surface: theme.colors.background.surface,
    card: theme.colors.background.card,
    transparent: "transparent",
  };
  return bgMap[background] || "transparent";
};

const getResponsivePaddingStyles = (padding: string = "md", theme: any) => {
  if (padding === "none") return "";

  const desktopPadding =
    theme.spacing[padding as keyof typeof theme.spacing] || theme.spacing.md;
  const paddingKey = (padding in (theme.spacing.mobile || {}) ? padding : "md") as keyof typeof theme.spacing.mobile;

  const mobilePadding = theme.spacing.mobile?.[paddingKey] || theme.spacing[paddingKey as keyof typeof theme.spacing] || theme.spacing.sm;

  return css`
    ${mobile(css`
      padding-left: ${mobilePadding};
      padding-right: ${mobilePadding};
      padding-top: ${mobilePadding};
      padding-bottom: ${mobilePadding};
      max-width: 100%;
      width: 100%;
      box-sizing: border-box;
      margin-left: 0;
      margin-right: 0;
    `)}

    @media (min-width: ${theme.breakpoints.md}) {
      padding-top: ${desktopPadding};
      padding-bottom: ${desktopPadding};
      padding-left: ${padding === "lg" ? "12px" : desktopPadding};
      padding-right: ${padding === "lg" ? "12px" : desktopPadding};
    }
  `;
};

export const StyledContainer = styled.div.withConfig({
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

  max-width: ${({ maxWidth }) => getContainerMaxWidth(maxWidth)};
  background-color: ${({ background, theme }) => getContainerBackground(background, theme)};
  margin: ${({ margin, theme }) => (margin && margin !== "none" ? theme.spacing[margin] : undefined)};
  border-radius: ${({ borderRadius, theme }) => (borderRadius && borderRadius !== "none" ? theme.borderRadius[borderRadius] : undefined)};
  box-shadow: ${({ shadow, theme }) => (shadow && shadow !== "none" ? theme.shadows[shadow] : undefined)};

  ${({ padding, theme }) => getResponsivePaddingStyles(padding, theme)}
`;
