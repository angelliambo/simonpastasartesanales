import React from "react";
import { AllSize, ButtonSize, AllVariant, ButtonVariant } from "../shared";

// Tipos para las props del componente Button
export interface ButtonProps {
  children?: React.ReactNode; // Opcional si se proporciona icon con aria-label
  variant?: AllVariant; // Acepta todas las variantes (incluyendo legacy como "danger" → "error")
  size?: AllSize; // Acepta todos los tamaños (incluyendo legacy como "small" → "sm")
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  /** ID único del componente (opcional) */
  id?: string;

  // Accessibility props
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-disabled"?: boolean | "true" | "false";

  // Icon support (mejorado de ui/Button.tsx)
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
}

// Props para styled components internos (usando tipos mapeados)
export interface StyledButtonProps extends ButtonProps {
  colors: any;
  $variant?: ButtonVariant; // Tipo mapeado (solo variantes válidas)
  $size?: ButtonSize; // Tipo mapeado (solo tamaños válidos)
  $disabled?: boolean;
  $loading?: boolean;
  $fullWidth?: boolean;
}

// Props para LoadingSpinner (usando tipo mapeado)
export interface LoadingSpinnerProps {
  size: ButtonSize; // Solo acepta tamaños válidos para Button
  reducedMotion?: boolean;
}

// Props para ButtonIcon (usando tipo mapeado)
export interface ButtonIconProps {
  size: ButtonSize; // Solo acepta tamaños válidos para Button
  position: "left" | "right";
}
