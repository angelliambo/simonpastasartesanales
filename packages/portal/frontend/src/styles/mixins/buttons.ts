import styled, { css } from "styled-components";
import type {
  ButtonVariant,
  ButtonSize,
  ButtonShape,
  ButtonProps,
} from "./types";

// Componente Button universal
export const Button = styled.button<ButtonProps>`
  ${({
    theme,
    variant = "primary",
    size = "md",
    shape = "rounded",
    fullWidth,
    disabled,
    loading,
    icon,
    margin,
    padding,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    // Reset de estilos por defecto
    border: none;
    outline: none;
    cursor: pointer;
    font-family: ${theme?.typography?.fontFamily?.primary || "sans-serif"};
    font-weight: ${theme?.typography?.fontWeight?.medium || 500};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${theme?.spacing?.xs || "4px"};
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: hidden;

    // Tamaños
    ${size === "xs" &&
    `
      padding: ${icon ? "4px" : "4px 8px"};
      font-size: ${theme.typography.fontSize.xs};
      min-height: 24px;
    `}

    ${size === "sm" &&
    `
      padding: ${icon ? "6px" : "6px 12px"};
      font-size: ${theme.typography.fontSize.sm};
      min-height: 32px;
    `}
    
    ${size === "md" &&
    `
      padding: ${icon ? "8px" : "8px 16px"};
      font-size: ${theme.typography.fontSize.md};
      min-height: 40px;
    `}
    
    ${size === "lg" &&
    `
      padding: ${icon ? "12px" : "12px 24px"};
      font-size: ${theme.typography.fontSize.lg};
      min-height: 48px;
    `}
    
    ${size === "xl" &&
    `
      padding: ${icon ? "16px" : "16px 32px"};
      font-size: ${theme.typography.fontSize.xl};
      min-height: 56px;
    `}
    
    // Formas
    ${shape === "square" &&
    `
      border-radius: ${theme.borderRadius.sm};
    `}
    
    ${shape === "rounded" &&
    `
      border-radius: ${theme.borderRadius.md};
    `}
    
    ${shape === "pill" &&
    `
      border-radius: 9999px;
    `}
    
    // Variantes
    ${variant === "primary" &&
    `
      background-color: ${theme.colors.primary[500]};
      color: ${theme.colors.text.inverse};
      border: 1px solid ${theme.colors.primary[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary[600]};
        border-color: ${theme.colors.primary[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.medium};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.primary[700]};
        border-color: ${theme.colors.primary[700]};
        transform: translateY(0);
      }
    `}
    
    ${variant === "secondary" &&
    `
      background-color: ${theme.colors.secondary[500]};
      color: ${theme.colors.text.inverse};
      border: 1px solid ${theme.colors.secondary[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.secondary[600]};
        border-color: ${theme.colors.secondary[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.medium};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.secondary[700]};
        border-color: ${theme.colors.secondary[700]};
        transform: translateY(0);
      }
    `}
    
    ${variant === "outline" &&
    `
      background-color: transparent;
      color: ${theme.colors.primary[500]};
      border: 1px solid ${theme.colors.primary[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary[50]};
        color: ${theme.colors.primary[600]};
        border-color: ${theme.colors.primary[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.light};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.primary[50]};
        color: ${theme.colors.primary[700]};
        border-color: ${theme.colors.primary[700]};
        transform: translateY(0);
      }
    `}
    
    ${variant === "ghost" &&
    `
      background-color: transparent;
      color: ${theme.colors.text.primary};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.background.secondary};
        color: ${theme.colors.text.secondary};
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.background.surface};
        color: ${theme.colors.text.tertiary};
        transform: translateY(0);
      }
    `}
    
    ${variant === "danger" &&
    `
      background-color: ${theme.colors.error[500]};
      color: ${theme.colors.text.inverse};
      border: 1px solid ${theme.colors.error[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.error[600]};
        border-color: ${theme.colors.error[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.medium};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.error[700]};
        border-color: ${theme.colors.error[700]};
        transform: translateY(0);
      }
    `}
    
    ${variant === "success" &&
    `
      background-color: ${theme.colors.success[500]};
      color: ${theme.colors.text.inverse};
      border: 1px solid ${theme.colors.success[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.success[600]};
        border-color: ${theme.colors.success[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.medium};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.success[700]};
        border-color: ${theme.colors.success[700]};
        transform: translateY(0);
      }
    `}
    
    ${variant === "warning" &&
    `
      background-color: ${theme.colors.warning[500]};
      color: ${theme.colors.text.inverse};
      border: 1px solid ${theme.colors.warning[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.warning[600]};
        border-color: ${theme.colors.warning[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.medium};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.warning[700]};
        border-color: ${theme.colors.warning[700]};
        transform: translateY(0);
      }
    `}
    
    ${variant === "info" &&
    `
      background-color: ${theme.colors.info[500]};
      color: ${theme.colors.text.inverse};
      border: 1px solid ${theme.colors.info[500]};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.info[600]};
        border-color: ${theme.colors.info[600]};
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.medium};
      }
      
      &:active:not(:disabled) {
        background-color: ${theme.colors.info[700]};
        border-color: ${theme.colors.info[700]};
        transform: translateY(0);
      }
    `}
    
    // Estados
    ${disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
    
    ${loading &&
    `
      cursor: wait;
      pointer-events: none;
      
      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
    
    // Focus
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

// Componente IconButton para botones con solo iconos
export const IconButton = styled(Button)<{
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
}>`
  ${({ size = "md" }) => css`
    ${size === "xs" &&
    `
      width: 24px;
      height: 24px;
      padding: 0;
    `}

    ${size === "sm" &&
    `
      width: 32px;
      height: 32px;
      padding: 0;
    `}
    
    ${size === "md" &&
    `
      width: 40px;
      height: 40px;
      padding: 0;
    `}
    
    ${size === "lg" &&
    `
      width: 48px;
      height: 48px;
      padding: 0;
    `}
    
    ${size === "xl" &&
    `
      width: 56px;
      height: 56px;
      padding: 0;
    `}
  `}
`;

// Componente ButtonGroup para agrupar botones
export const ButtonGroup = styled.div<{
  direction?: "horizontal" | "vertical";
  gap?: string;
  fullWidth?: boolean;
}>`
  ${({ direction = "horizontal", gap = "8px", fullWidth }) => css`
    display: flex;
    flex-direction: ${direction === "horizontal" ? "row" : "column"};
    gap: ${gap};
    ${fullWidth ? "width: 100%;" : ""}

    ${Button} {
      ${direction === "horizontal"
        ? `
        &:not(:first-child) {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &:not(:last-child) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      `
        : `
        &:not(:first-child) {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
        &:not(:last-child) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}
    }
  `}
`;

// Mixin para botón con loading
export const buttonLoading = css`
  position: relative;
  color: transparent !important;

  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Mixin para botón con ripple effect
export const buttonRipple = css`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary[50]};
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }
`;

// Mixin para botón con gradiente
export const buttonGradient = (from: string, to: string) => css`
  background: linear-gradient(135deg, ${from}, ${to});
  border: none;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${from}, ${to});
    filter: brightness(1.1);
  }

  &:active:not(:disabled) {
    filter: brightness(0.9);
  }
`;
