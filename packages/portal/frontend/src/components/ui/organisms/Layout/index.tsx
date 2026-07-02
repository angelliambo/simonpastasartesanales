import React from "react";
import {
  LayoutProps,
  SiderProps,
  HeaderProps,
  ContentProps,
} from "./Layout.types";
import {
  StyledLayout,
  StyledLayoutHorizontal,
  StyledSider,
  StyledHeader,
  StyledContent,
} from "./Layout.styles";

/**
 * Layout Component - Sistema de layout principal
 *
 * Reemplazo funcional de Ant Design Layout con nuestros estilos
 * Mantiene todas las funcionalidades: collapse, responsive, etc.
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  style,
  id,
}) => {
  const finalId = id ? `layout-${id}` : undefined;

  // Detectar si hay Sider en los children para determinar layout horizontal
  const hasSider = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === Sider || (child.type as any)?.displayName === "Sider")
  );

  if (hasSider) {
    return (
      <StyledLayout id={finalId} className={className} style={style}>
        {children}
      </StyledLayout>
    );
  }

  return (
    <div
      id={finalId}
      className={className}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Layout horizontal interno para Header + Content
 */
export const LayoutHorizontal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledLayoutHorizontal>{children}</StyledLayoutHorizontal>;
};

/**
 * Sider Component - Barra lateral colapsable
 *
 * Funcionalidades:
 * - Collapse/Expand
 * - Responsive width
 * - Trigger personalizado
 */
export const Sider: React.FC<SiderProps> = ({
  children,
  collapsed = false,
  collapsible = false,
  trigger,
  width = 200,
  collapsedWidth = 80,
  className,
  style,
  onCollapse,
}) => {
  return (
    <StyledSider
      $collapsed={collapsed}
      $width={width}
      $collapsedWidth={collapsedWidth}
      className={className}
      style={style}
    >
      {children}
      {collapsible && trigger && (
        <div onClick={() => onCollapse?.(!collapsed)}>{trigger}</div>
      )}
    </StyledSider>
  );
};

/**
 * Header Component - Encabezado del layout
 */
export const Header: React.FC<HeaderProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <StyledHeader className={className} style={style}>
      {children}
    </StyledHeader>
  );
};

/**
 * Content Component - Contenido principal del layout
 */
export const Content: React.FC<ContentProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <StyledContent className={className} style={style}>
      {children}
    </StyledContent>
  );
};

// Attach subcomponents como propiedades estáticas para compatibilidad con Ant Design
const LayoutWithSubcomponents = Layout as typeof Layout & {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
};

LayoutWithSubcomponents.Header = Header;
LayoutWithSubcomponents.Sider = Sider;
LayoutWithSubcomponents.Content = Content;

export default LayoutWithSubcomponents;
