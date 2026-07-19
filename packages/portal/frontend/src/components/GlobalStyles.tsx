import React from "react";
import { createGlobalStyle } from "styled-components";
import { useTheme } from "../styles/ThemeProvider";

const GlobalStylesComponent = createGlobalStyle<{ theme: any }>`
  /* Variables CSS para temas */
  :root {
    /* Colores principales - con fallbacks */
    --color-primary: ${(props) =>
      props.theme?.colors?.primary?.[500] || "#14b8a6"};
    --color-primary-50: ${(props) =>
      props.theme?.colors?.primary?.[50] || "#f0fdfa"};
    --color-primary-100: ${(props) =>
      props.theme?.colors?.primary?.[100] || "#ccfbf1"};
    --color-primary-500: ${(props) =>
      props.theme?.colors?.primary?.[500] || "#14b8a6"};
    --color-primary-600: ${(props) =>
      props.theme?.colors?.primary?.[600] || "#0d9488"};
    
    /* Colores secundarios */
    --color-secondary: ${(props) =>
      props.theme?.colors?.secondary?.[500] || "#0ea5e9"};
    --color-success: ${(props) =>
      props.theme?.colors?.success?.[500] || "#22c55e"};
    --color-warning: ${(props) =>
      props.theme?.colors?.warning?.[500] || "#f59e0b"};
    --color-error: ${(props) => props.theme?.colors?.error?.[500] || "#ef4444"};
    --color-info: ${(props) => props.theme?.colors?.info?.[500] || "#3b82f6"};
    
    /* Colores de fondo */
    --color-background: ${(props) =>
      props.theme?.colors?.background?.primary || "#ffffff"};
    --color-background-primary: ${(props) =>
      props.theme?.colors?.background?.primary || "#ffffff"};
    --color-background-secondary: ${(props) =>
      props.theme?.colors?.background?.secondary || "#f5f5f5"};
    --color-background-card: ${(props) =>
      props.theme?.colors?.background?.card || "#ffffff"};
    --color-background-surface: ${(props) =>
      props.theme?.colors?.background?.surface || "#fafafa"};
    
    /* Colores de texto */
    --color-text: ${(props) => props.theme?.colors?.text?.primary || "#1f2937"};
    --color-text-primary: ${(props) =>
      props.theme?.colors?.text?.primary || "#1f2937"};
    --color-text-secondary: ${(props) =>
      props.theme?.colors?.text?.secondary || "#6b7280"};
    --color-text-tertiary: ${(props) =>
      props.theme?.colors?.text?.tertiary || "#9ca3af"};
    --color-text-inverse: ${(props) =>
      props.theme?.colors?.text?.inverse || "#ffffff"};
    
    /* Colores de borde */
    --color-border: ${(props) =>
      props.theme?.colors?.border?.light || "#e5e7eb"};
    --color-border-light: ${(props) =>
      props.theme?.colors?.border?.light || "#e5e7eb"};
    --color-border-normal: ${(props) =>
      props.theme?.colors?.border?.normal || "#d1d5db"};
    --color-border-dark: ${(props) =>
      props.theme?.colors?.border?.dark || "#9ca3af"};
    
    /* Colores neutros */
    --color-neutral-50: ${(props) =>
      props.theme?.colors?.neutral?.[50] || "#fafafa"};
    --color-neutral-100: ${(props) =>
      props.theme?.colors?.neutral?.[100] || "#f5f5f5"};
    --color-neutral-200: ${(props) =>
      props.theme?.colors?.neutral?.[200] || "#e5e5e5"};
    --color-neutral-300: ${(props) =>
      props.theme?.colors?.neutral?.[300] || "#d4d4d4"};
    --color-neutral-400: ${(props) =>
      props.theme?.colors?.neutral?.[400] || "#a3a3a3"};
    --color-neutral-600: ${(props) =>
      props.theme?.colors?.neutral?.[600] || "#525252"};
    
    /* Sombras */
    --shadow-light: ${(props) =>
      props.theme?.shadows?.light || "0 1px 3px rgba(0, 0, 0, 0.1)"};
    --shadow-medium: ${(props) =>
      props.theme?.shadows?.medium || "0 4px 6px rgba(0, 0, 0, 0.1)"};
    --shadow-heavy: ${(props) =>
      props.theme?.shadows?.heavy || "0 10px 15px rgba(0, 0, 0, 0.1)"};
    
    /* Gradientes */
    --gradient-hero: ${(props) =>
      props.theme?.colors?.gradients?.hero ||
      "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)"};
  }

  /* Box-sizing global */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Estilos globales del html */
  html {
    width: 100%;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Estilos globales del body */
  body {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.typography.fontFamily.primary};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
    line-height: ${(props) => props.theme.typography.lineHeight.normal};
    width: 100%;
    overflow-x: hidden;
  }

  /* Contenedor principal */
  #root {
    width: 100%;
    overflow-x: hidden;
  }

  /* Prevenir scroll horizontal en mobile */
  @media (max-width: 768px) {
    html, body, #root {
      overflow-x: hidden !important;
      max-width: 100%; /* Usar 100% en lugar de 100vw para evitar overflow */
      position: relative;
    }
  }

  /* Asegurar que drawer mobile tenga z-index por encima de overlays de desarrollo */
  @media (max-width: 768px) {
    /* Ant Design Drawer en mobile */
    .ant-drawer {
      z-index: 1100 !important;
    }
    
    .ant-drawer-mask {
      z-index: 1099 !important;
    }

    /* Overlays de desarrollo (webpack-dev-server, error overlays) */
    /* Ajustar z-index para que no intercepten clicks del drawer */
    [class*="webpack-dev-server"],
    [id*="webpack-dev-server"],
    [class*="error-overlay"],
    [id*="error-overlay"],
    [class*="react-error-overlay"],
    [id*="react-error-overlay"] {
      z-index: 1098 !important;
    }

    /* Asegurar que cuando el drawer esté abierto, los overlays no interfieran */
    body.ant-drawer-open [class*="webpack-dev-server"],
    body.ant-drawer-open [id*="webpack-dev-server"],
    body.ant-drawer-open [class*="error-overlay"],
    body.ant-drawer-open [id*="error-overlay"] {
      pointer-events: none !important;
      opacity: 0.3 !important;
    }
  }

  /* Estilos para componentes Ant Design - SIN !important */
  .ant-layout {
    background-color: var(--color-background-primary);
  }

  .ant-layout-content {
    background-color: var(--color-background-primary);
  }



  .ant-card {
    background-color: var(--color-background-card);
    border-color: var(--color-border-light);
    border-width: 1px;
    border-style: solid;
  }

  .ant-card-body {
    color: var(--color-text-primary);
  }

  .ant-typography {
    color: var(--color-text-primary);
  }

  .ant-typography h1,
  .ant-typography h2,
  .ant-typography h3,
  .ant-typography h4,
  .ant-typography h5,
  .ant-typography h6 {
    color: var(--color-text-primary);
  }

  /* Hero section - texto sobre gradiente */
  .hero-section .ant-typography h1,
  .hero-section .ant-typography h2,
  .hero-section .ant-typography h3,
  .hero-section .ant-typography h4,
  .hero-section .ant-typography h5,
  .hero-section .ant-typography h6 {
    color: var(--color-text-inverse);
  }

  .hero-section .ant-typography {
    color: var(--color-text-inverse);
  }

  .ant-typography p {
    color: var(--color-text-secondary);
  }

  .ant-button {
    border-color: var(--color-border-normal);
  }

  .ant-input {
    background-color: var(--color-background-card);
    border-color: var(--color-border-normal);
    color: var(--color-text-primary);
  }

  .ant-input::placeholder {
    color: var(--color-text-tertiary);
  }

  .ant-drawer-content {
    background-color: var(--color-background-primary);
  }

  .ant-drawer-header {
    background-color: var(--color-background-card);
    border-bottom-color: var(--color-border-light);
  }

  .ant-drawer-body {
    background-color: var(--color-background-primary);
  }

  .ant-menu {
    background-color: transparent;
  }

  .ant-menu-item {
    color: var(--color-text-secondary);
  }

  .ant-menu-item:hover {
    background-color: var(--color-background-card);
    color: var(--color-text-primary);
  }

  .ant-menu-item-selected {
    background-color: var(--color-background-secondary);
    color: var(--color-text-primary);
  }

  .ant-tooltip-inner {
    background-color: var(--color-background-card);
    color: var(--color-text-primary);
  }

  /* Estilos para páginas específicas */
  .page-container {
    background-color: var(--color-background-primary);
    min-height: 100vh;
    padding: 24px;
    transition: background-color 0.3s ease;
  }

  .card-container {
    background-color: var(--color-background-card);
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--shadow-light);
    border: 1px solid var(--color-border-light);
    transition: all 0.3s ease;
  }

  /* Estilos específicos para móvil */
  @media (max-width: 768px) {
    .page-container {
      padding: 12px 8px;
      margin-top: 64px; /* Espacio para el header fijo */
    }

    .card-container {
      padding: 12px;
      margin: 0 4px;
    }

    /* Hero section en móvil - asegurar que esté debajo del header */
    .hero-section {
      margin-top: 16px !important;
      z-index: 1 !important;
      position: relative !important;
    }



    /* Espaciado mejorado para temas de accesibilidad */
    .ant-card-body {
      padding: 12px !important;
    }

    /* Mejorar espaciado entre elementos */
    .ant-space-vertical > .ant-space-item {
      margin-bottom: 16px !important;
    }

    /* Ajustar tamaños de texto en móvil */
    .ant-typography h1 {
      font-size: 24px !important;
    }

    .ant-typography h2 {
      font-size: 20px !important;
    }

    .ant-typography h3 {
      font-size: 18px !important;
    }

    .ant-typography h4 {
      font-size: 16px !important;
    }


  }

  @media (max-width: 480px) {
    .page-container {
      padding: 8px 6px;
    }

    .card-container {
      padding: 8px;
      margin: 0 2px;
    }

    .ant-card-body {
      padding: 8px !important;
    }
  }

  /* Hero sections - usar gradientes del tema */
  .hero-section {
    background: var(--gradient-hero);
    color: var(--color-text-inverse);
  }

  /* Estilos para elementos específicos que necesitan contraste */
  .high-contrast-text {
    color: var(--color-text-primary);
    font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  }

  .inverse-text {
    color: var(--color-text-inverse);
  }
`;

export const GlobalStyles: React.FC = () => {
  // Los colores se obtienen automáticamente a través del tema
  const { currentTheme } = useTheme();

  return <GlobalStylesComponent theme={currentTheme} />;
};
