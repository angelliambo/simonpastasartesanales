import styled, { css } from "styled-components";
import type { InputSize, InputVariant, InputState, InputProps } from "./types";

// Componente Input universal
export const Input = styled.input<InputProps>`
  ${({
    theme,
    size = "md",
    variant = "default",
    state = "default",
    disabled,
    fullWidth,
    margin,
    padding,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    // Reset de estilos por defecto
    border: none;
    outline: none;
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.normal};
    transition: all 0.2s ease-in-out;

    // Tamaños
    ${size === "sm" &&
    `
      padding: 6px 12px;
      font-size: ${theme.typography.fontSize.sm};
      min-height: 32px;
    `}

    ${size === "md" &&
    `
      padding: 8px 16px;
      font-size: ${theme.typography.fontSize.md};
      min-height: 40px;
    `}
    
    ${size === "lg" &&
    `
      padding: 12px 20px;
      font-size: ${theme.typography.fontSize.lg};
      min-height: 48px;
    `}
    
    // Variantes
    ${variant === "default" &&
    `
      background-color: ${theme.colors.background.card};
      border: 1px solid ${theme.colors.border.normal};
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    ${variant === "filled" &&
    `
      background-color: ${theme.colors.background.surface};
      border: 1px solid transparent;
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        background-color: ${theme.colors.background.card};
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    ${variant === "outlined" &&
    `
      background-color: transparent;
      border: 2px solid ${theme.colors.border.normal};
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    // Estados
    ${state === "error" &&
    `
      border-color: ${theme.colors.error[500]} !important;
      color: ${theme.colors.error[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.error[50]} !important;
      }
    `}
    
    ${state === "success" &&
    `
      border-color: ${theme.colors.success[500]} !important;
      color: ${theme.colors.success[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.success[50]} !important;
      }
    `}
    
    ${state === "warning" &&
    `
      border-color: ${theme.colors.warning[500]} !important;
      color: ${theme.colors.warning[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.warning[50]} !important;
      }
    `}
    
    ${disabled &&
    `
      background-color: ${theme.colors.background.surface};
      color: ${theme.colors.text.tertiary};
      cursor: not-allowed;
      opacity: 0.6;
    `}
    
    // Placeholder
    &::placeholder {
      color: ${theme.colors.text.tertiary};
      opacity: 1;
    }

    // Focus visible
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

// Componente Textarea
export const Textarea = styled.textarea<{
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  disabled?: boolean;
  fullWidth?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  rows?: number;
  margin?: string;
  padding?: string;
}>`
  ${({
    theme,
    size = "md",
    variant = "default",
    state = "default",
    disabled,
    fullWidth,
    resize = "vertical",
    rows = 3,
    margin,
    padding,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    // Reset de estilos por defecto
    border: none;
    outline: none;
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.normal};
    transition: all 0.2s ease-in-out;
    resize: ${resize};
    min-height: ${rows * 1.5}em;

    // Tamaños
    ${size === "sm" &&
    `
      padding: 6px 12px;
      font-size: ${theme.typography.fontSize.sm};
    `}

    ${size === "md" &&
    `
      padding: 8px 16px;
      font-size: ${theme.typography.fontSize.md};
    `}
    
    ${size === "lg" &&
    `
      padding: 12px 20px;
      font-size: ${theme.typography.fontSize.lg};
    `}
    
    // Variantes (mismo estilo que Input)
    ${variant === "default" &&
    `
      background-color: ${theme.colors.background.card};
      border: 1px solid ${theme.colors.border.normal};
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    ${variant === "filled" &&
    `
      background-color: ${theme.colors.background.surface};
      border: 1px solid transparent;
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        background-color: ${theme.colors.background.card};
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    ${variant === "outlined" &&
    `
      background-color: transparent;
      border: 2px solid ${theme.colors.border.normal};
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    // Estados (mismo estilo que Input)
    ${state === "error" &&
    `
      border-color: ${theme.colors.error[500]} !important;
      color: ${theme.colors.error[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.error[50]} !important;
      }
    `}
    
    ${state === "success" &&
    `
      border-color: ${theme.colors.success[500]} !important;
      color: ${theme.colors.success[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.success[50]} !important;
      }
    `}
    
    ${state === "warning" &&
    `
      border-color: ${theme.colors.warning[500]} !important;
      color: ${theme.colors.warning[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.warning[50]} !important;
      }
    `}
    
    ${disabled &&
    `
      background-color: ${theme.colors.background.surface};
      color: ${theme.colors.text.tertiary};
      cursor: not-allowed;
      opacity: 0.6;
    `}
    
    // Placeholder
    &::placeholder {
      color: ${theme.colors.text.tertiary};
      opacity: 1;
    }

    // Focus visible
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

// Componente Select
export const Select = styled.select<{
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  disabled?: boolean;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
}>`
  ${({
    theme,
    size = "md",
    variant = "default",
    state = "default",
    disabled,
    fullWidth,
    margin,
    padding,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    // Reset de estilos por defecto
    border: none;
    outline: none;
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.normal};
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 8px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 40px;

    // Tamaños
    ${size === "sm" &&
    `
      padding: 6px 40px 6px 12px;
      font-size: ${theme.typography.fontSize.sm};
      min-height: 32px;
    `}

    ${size === "md" &&
    `
      padding: 8px 40px 8px 16px;
      font-size: ${theme.typography.fontSize.md};
      min-height: 40px;
    `}
    
    ${size === "lg" &&
    `
      padding: 12px 40px 12px 20px;
      font-size: ${theme.typography.fontSize.lg};
      min-height: 48px;
    `}
    
    // Variantes (mismo estilo que Input)
    ${variant === "default" &&
    `
      background-color: ${theme.colors.background.card};
      border: 1px solid ${theme.colors.border.normal};
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    ${variant === "filled" &&
    `
      background-color: ${theme.colors.background.surface};
      border: 1px solid transparent;
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        background-color: ${theme.colors.background.card};
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    ${variant === "outlined" &&
    `
      background-color: transparent;
      border: 2px solid ${theme.colors.border.normal};
      border-radius: ${theme.borderRadius.md};
      
      &:focus {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }
    `}
    
    // Estados (mismo estilo que Input)
    ${state === "error" &&
    `
      border-color: ${theme.colors.error[500]} !important;
      color: ${theme.colors.error[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.error[50]} !important;
      }
    `}
    
    ${state === "success" &&
    `
      border-color: ${theme.colors.success[500]} !important;
      color: ${theme.colors.success[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.success[50]} !important;
      }
    `}
    
    ${state === "warning" &&
    `
      border-color: ${theme.colors.warning[500]} !important;
      color: ${theme.colors.warning[700]};
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.warning[50]} !important;
      }
    `}
    
    ${disabled &&
    `
      background-color: ${theme.colors.background.surface};
      color: ${theme.colors.text.tertiary};
      cursor: not-allowed;
      opacity: 0.6;
    `}
    
    // Focus visible
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

// Componente Checkbox
export const Checkbox = styled.input.attrs({ type: "checkbox" })<{
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  margin?: string;
}>`
  ${({ theme, size = "md", state = "default", disabled, margin }) => css`
    ${margin && `margin: ${margin};`}

    width: ${size === "sm" ? "16px" : size === "md" ? "20px" : "24px"};
    height: ${size === "sm" ? "16px" : size === "md" ? "20px" : "24px"};
    cursor: pointer;
    appearance: none;
    border: 2px solid ${theme.colors.border.normal};
    border-radius: ${theme.borderRadius.sm};
    background-color: ${theme.colors.background.card};
    transition: all 0.2s ease-in-out;

    &:checked {
      background-color: ${theme.colors.primary[500]};
      border-color: ${theme.colors.primary[500]};
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
      background-size: 12px;
      background-position: center;
      background-repeat: no-repeat;
    }

    ${state === "error" &&
    `
      border-color: ${theme.colors.error[500]};
      
      &:checked {
        background-color: ${theme.colors.error[500]};
        border-color: ${theme.colors.error[500]};
      }
    `}

    ${state === "success" &&
    `
      border-color: ${theme.colors.success[500]};
      
      &:checked {
        background-color: ${theme.colors.success[500]};
        border-color: ${theme.colors.success[500]};
      }
    `}
    
    ${state === "warning" &&
    `
      border-color: ${theme.colors.warning[500]};
      
      &:checked {
        background-color: ${theme.colors.warning[500]};
        border-color: ${theme.colors.warning[500]};
      }
    `}
    
    ${disabled &&
    `
      opacity: 0.6;
      cursor: not-allowed;
    `}
    
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

// Componente Radio
export const Radio = styled.input.attrs({ type: "radio" })<{
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  margin?: string;
}>`
  ${({ theme, size = "md", state = "default", disabled, margin }) => css`
    ${margin && `margin: ${margin};`}

    width: ${size === "sm" ? "16px" : size === "md" ? "20px" : "24px"};
    height: ${size === "sm" ? "16px" : size === "md" ? "20px" : "24px"};
    cursor: pointer;
    appearance: none;
    border: 2px solid ${theme.colors.border.normal};
    border-radius: 50%;
    background-color: ${theme.colors.background.card};
    transition: all 0.2s ease-in-out;

    &:checked {
      background-color: ${theme.colors.primary[500]};
      border-color: ${theme.colors.primary[500]};
      background-image: radial-gradient(circle, white 30%, transparent 30%);
    }

    ${state === "error" &&
    `
      border-color: ${theme.colors.error[500]};
      
      &:checked {
        background-color: ${theme.colors.error[500]};
        border-color: ${theme.colors.error[500]};
      }
    `}

    ${state === "success" &&
    `
      border-color: ${theme.colors.success[500]};
      
      &:checked {
        background-color: ${theme.colors.success[500]};
        border-color: ${theme.colors.success[500]};
      }
    `}
    
    ${state === "warning" &&
    `
      border-color: ${theme.colors.warning[500]};
      
      &:checked {
        background-color: ${theme.colors.warning[500]};
        border-color: ${theme.colors.warning[500]};
      }
    `}
    
    ${disabled &&
    `
      opacity: 0.6;
      cursor: not-allowed;
    `}
    
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

// Componente FormGroup para agrupar elementos de formulario
export const FormGroup = styled.div<{
  direction?: "vertical" | "horizontal";
  gap?: string;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
}>`
  ${({
    direction = "vertical",
    gap = "8px",
    fullWidth,
    margin,
    padding,
  }) => css`
    display: flex;
    flex-direction: ${direction === "vertical" ? "column" : "row"};
    gap: ${gap};
    ${fullWidth ? "width: 100%;" : ""}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    
    ${direction === "horizontal" &&
    `
      align-items: center;
    `}
  `}
`;

// Mixin para input con icono
export const inputWithIcon = css`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.text.tertiary};
    pointer-events: none;
  }

  input {
    padding-left: 40px;
  }
`;

// Mixin para input con botón
export const inputWithButton = css`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
