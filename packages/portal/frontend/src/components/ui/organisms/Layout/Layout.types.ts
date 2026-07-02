import React from "react";

export interface LayoutProps {
  /** Hijos del layout */
  children: React.ReactNode;
  /** Estilo personalizado */
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "layout-" */
  id?: string;
}

export interface SiderProps {
  /** Hijos del sider */
  children: React.ReactNode;
  /** Si el sider está colapsado */
  collapsed?: boolean;
  /** Si el sider es colapsable */
  collapsible?: boolean;
  /** Trigger personalizado para colapsar */
  trigger?: React.ReactNode;
  /** Ancho cuando está expandido */
  width?: number;
  /** Ancho cuando está colapsado */
  collapsedWidth?: number;
  /** Estilo personalizado */
  className?: string;
  style?: React.CSSProperties;
  /** Callback cuando cambia el estado colapsado */
  onCollapse?: (collapsed: boolean) => void;
}

export interface HeaderProps {
  /** Hijos del header */
  children: React.ReactNode;
  /** Estilo personalizado */
  className?: string;
  style?: React.CSSProperties;
}

export interface ContentProps {
  /** Hijos del content */
  children: React.ReactNode;
  /** Estilo personalizado */
  className?: string;
  style?: React.CSSProperties;
}
