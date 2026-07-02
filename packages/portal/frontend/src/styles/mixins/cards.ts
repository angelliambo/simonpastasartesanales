import styled, { css } from "styled-components";
import type { CardPadding, CardProps } from "./types";

// Componente Card universal
export const Card = styled.div<CardProps>`
  ${({
    theme,
    variant = "default",
    padding = "md",
    hover = false,
    clickable = false,
    fullWidth,
    fullHeight,
    margin,
    borderRadius,
    shadow,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${borderRadius && `border-radius: ${borderRadius};`}
    ${shadow && `box-shadow: ${shadow};`}
    
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    
    // Variantes
    ${variant === "default" &&
    `
      background-color: ${theme.colors.background.card};
      border: 1px solid ${theme.colors.border.light};
    `}
    
    ${variant === "elevated" &&
    `
      background-color: ${theme.colors.background.card};
      border: none;
      box-shadow: ${theme.shadows.medium};
    `}
    
    ${variant === "outlined" &&
    `
      background-color: transparent;
      border: 2px solid ${theme.colors.border.normal};
    `}
    
    ${variant === "filled" &&
    `
      background-color: ${theme.colors.background.surface};
      border: none;
    `}
    
    // Interactividad
    ${clickable &&
    `
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.heavy};
      }
      
      &:active {
        transform: translateY(0);
        box-shadow: ${theme.shadows.medium};
      }
    `}
    
    ${hover &&
    !clickable &&
    `
      transition: all 0.2s ease-in-out;
      
      &:hover {
        box-shadow: ${theme.shadows.medium};
      }
    `}
  `}
`;

// Componente CardHeader para encabezados de tarjetas
export const CardHeader = styled.div<{
  padding?: CardPadding;
  borderBottom?: boolean;
  backgroundColor?: string;
  fullWidth?: boolean;
}>`
  ${({
    theme,
    padding = "md",
    borderBottom = false,
    backgroundColor,
    fullWidth,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${backgroundColor && `background-color: ${backgroundColor};`}
    
    ${borderBottom &&
    `
      border-bottom: 1px solid ${theme.colors.border.light};
      margin-bottom: ${theme.spacing.md};
    `}
    
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

// Componente CardBody para contenido de tarjetas
export const CardBody = styled.div<{
  padding?: CardPadding;
  fullWidth?: boolean;
  fullHeight?: boolean;
}>`
  ${({ theme, padding = "md", fullWidth, fullHeight }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
  `}
`;

// Componente CardFooter para pies de tarjetas
export const CardFooter = styled.div<{
  padding?: CardPadding;
  borderTop?: boolean;
  backgroundColor?: string;
  fullWidth?: boolean;
}>`
  ${({
    theme,
    padding = "md",
    borderTop = false,
    backgroundColor,
    fullWidth,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${backgroundColor && `background-color: ${backgroundColor};`}
    
    ${borderTop &&
    `
      border-top: 1px solid ${theme.colors.border.light};
      margin-top: ${theme.spacing.md};
    `}
    
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

// Componente CardTitle para títulos de tarjetas
export const CardTitle = styled.h3<{
  size?: "sm" | "md" | "lg";
  color?: string;
  margin?: string;
  padding?: string;
}>`
  ${({ theme, size = "md", color, margin, padding }) => css`
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin: 0;

    ${size === "sm" && `font-size: ${theme.typography.fontSize.md};`}
    ${size === "md" && `font-size: ${theme.typography.fontSize.lg};`}
    ${size === "lg" && `font-size: ${theme.typography.fontSize.xl};`}
    
    ${color && `color: ${color};`}
  `}
`;

// Componente CardSubtitle para subtítulos de tarjetas
export const CardSubtitle = styled.p<{
  color?: string;
  margin?: string;
  padding?: string;
}>`
  ${({ theme, color, margin, padding }) => css`
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.normal};
    color: ${color || theme.colors.text.secondary};
    margin: 0;
  `}
`;

// Componente CardImage para imágenes de tarjetas
export const CardImage = styled.img<{
  fullWidth?: boolean;
  height?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
}>`
  ${({ fullWidth, height, borderRadius, margin, padding }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${height && `height: ${height};`}
    ${borderRadius && `border-radius: ${borderRadius};`}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    object-fit: cover;
    display: block;
  `}
`;

// Componente CardActions para acciones de tarjetas
export const CardActions = styled.div<{
  padding?: CardPadding;
  gap?: string;
  justify?: "start" | "center" | "end" | "between" | "around";
  fullWidth?: boolean;
}>`
  ${({ theme, padding = "md", gap = "8px", justify = "end", fullWidth }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    
    display: flex;
    gap: ${gap};
    align-items: center;

    ${justify === "start" && "justify-content: flex-start;"}
    ${justify === "center" && "justify-content: center;"}
    ${justify === "end" && "justify-content: flex-end;"}
    ${justify === "between" && "justify-content: space-between;"}
    ${justify === "around" && "justify-content: space-around;"}
  `}
`;

// Componente CardGrid para grids de tarjetas
export const CardGrid = styled.div<{
  columns?: number;
  gap?: string;
  fullWidth?: boolean;
  padding?: CardPadding;
  margin?: string;
}>`
  ${({ theme, columns = 1, gap = "16px", fullWidth, padding, margin }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}
    ${margin && `margin: ${margin};`}
    
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: ${gap};

    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: 1fr;
    }

    @media (min-width: ${theme.breakpoints.md}) and (max-width: ${theme
        .breakpoints.lg}) {
      grid-template-columns: repeat(${Math.min(columns, 2)}, 1fr);
    }
  `}
`;

// Mixin para tarjeta con gradiente
export const cardGradient = (from: string, to: string) => css`
  background: linear-gradient(135deg, ${from}, ${to});
  border: none;
  color: white;
`;

// Mixin para tarjeta con patrón
export const cardPattern = (pattern: string) => css`
  background-image: ${pattern};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// Mixin para tarjeta con borde animado
export const cardAnimatedBorder = css`
  position: relative;
  background: linear-gradient(45deg, transparent, transparent);
  background-clip: padding-box;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    background-size: 400% 400%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

// Mixin para tarjeta con efecto glassmorphism
export const cardGlassmorphism = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

// Mixin para tarjeta con efecto neumorphism
export const cardNeumorphism = css`
  background: #e0e0e0;
  border: none;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
`;
