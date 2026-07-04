import React from "react";
import { AllSize } from '@design-sys/atoms/shared';

// =====================================
// DRAWER COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Drawer acepta tamaños del shared system
export type DrawerSize = "sm" | "md" | "lg" | "xl";

// Props principales del Drawer
export interface DrawerProps {
  // Control de visibilidad
  visible?: boolean;
  open?: boolean; // Alias de visible (compatible con Ant Design 4.x y 5.x)
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;

  // Ubicación
  placement?: "left" | "right" | "top" | "bottom";
  
  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  
  // Ancho/Alto personalizado
  width?: number | string;
  height?: number | string;
  
  // Configuración
  title?: React.ReactNode;
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  
  // Footer
  footer?: React.ReactNode;
  footerStyle?: React.CSSProperties;
  
  // Z-index
  zIndex?: number;
  
  // Callbacks
  afterVisibleChange?: (visible: boolean) => void;
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  
  // Accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  
  // Contenido
  children?: React.ReactNode;
  /** ID único del componente (opcional) - se concatena con "drawer-" */
  id?: string;
}

// Props para styled components internos
export interface StyledDrawerProps {
  $placement?: DrawerProps["placement"];
  $size?: DrawerSize;
  $visible?: boolean;
  $width?: number | string;
  $height?: number | string;
  accessibility?: DrawerProps["accessibility"];
}

// Default values
export const DRAWER_DEFAULTS = {
  size: "md" as DrawerSize,
  placement: "right" as const,
  visible: false,
  closable: true,
  mask: true,
  maskClosable: true,
  zIndex: 1000,
};

// Mapeo de tamaños del shared system
export const SIZE_MAPPING_DRAWER: Record<string, DrawerSize> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xl",
  xxxl: "xl",
};

