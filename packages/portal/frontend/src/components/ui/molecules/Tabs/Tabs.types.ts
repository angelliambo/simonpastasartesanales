import React from "react";
import { AllSize } from '@design-sys/atoms/shared';

// =====================================
// TABS COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Tabs acepta tamaños del shared system
export type TabsSize = "sm" | "md" | "lg";

// Props principales del Tabs
export interface TabsProps {
  // Control activo
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático

  // Configuración
  type?: "line" | "card" | "editable-card";
  tabPosition?: "top" | "bottom" | "left" | "right";
  centered?: boolean;

  // Layout
  className?: string;
  style?: React.CSSProperties;

  // Accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };

  // Contenido (puede ser children con TabPane o items array)
  children?: React.ReactNode;
  items?: TabItem[];
  /** ID único del componente (opcional) - se concatena con "tabs-" */
  id?: string;
}

// Props para TabItem (usado con items array)
export interface TabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
}

// Props para TabPane (compatible con Ant Design)
export interface TabPaneProps {
  tab: React.ReactNode;
  key: string;
  disabled?: boolean;
  closable?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

// Props para styled components internos
export interface StyledTabsProps {
  $size?: TabsSize;
  $type?: TabsProps["type"];
  $tabPosition?: TabsProps["tabPosition"];
  accessibility?: TabsProps["accessibility"];
}

// Default values
export const TABS_DEFAULTS = {
  size: "md" as TabsSize,
  type: "line" as const,
  tabPosition: "top" as const,
  centered: false,
};

// Mapeo de tamaños del shared system
export const SIZE_MAPPING_TABS: Record<string, TabsSize> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
  xxl: "lg",
  xxxl: "lg",
};
