import { createGlobalStyle } from 'styled-components';

// Tipos para las configuraciones de accesibilidad
interface AccessibilityConfig {
  highContrast: boolean;
  largeText: boolean;
  colorBlindMode: boolean;
  animationsEnabled: boolean;
  fontSize: number;
  contrast: number;
  brightness: number;
  accessibilityType: string;
  soundEffects: boolean;
  voiceEnabled: boolean;
  voiceSpeed: number;
  voicePitch: number;
  voiceVolume: number;
  autoSpeak: boolean;
}

// Función para generar CSS custom properties dinámicos
export const generateCSSVariables = (config: AccessibilityConfig) => {
  const baseFontSize = config.fontSize;
  const scaleFactor = config.largeText ? 1.2 : 1;
  const contrastFactor = config.contrast;
  const brightnessFactor = config.brightness;

  // Colores base
  const baseColors = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e0e0e0',
  };

  // Colores para alto contraste
  const highContrastColors = {
    primary: '#ffffff',
    secondary: '#ffffff',
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffff00',
    info: '#00ffff',
    background: '#000000',
    surface: '#000000',
    text: '#ffffff',
    textSecondary: '#ffffff',
    border: '#808080',
  };

  // Colores para daltonismo (protanopia)
  const protanopiaColors = {
    primary: '#4a90e2',
    secondary: '#7b68ee',
    success: '#32cd32',
    error: '#ff6347',
    warning: '#ffa500',
    info: '#87ceeb',
    background: '#f0f8ff',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#5d6d7e',
    border: '#bdc3c7',
  };

  // Colores para deuteranopia
  const deuteranopiaColors = {
    primary: '#4a90e2',
    secondary: '#7b68ee',
    success: '#32cd32',
    error: '#ff6347',
    warning: '#ffa500',
    info: '#87ceeb',
    background: '#f0f8ff',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#5d6d7e',
    border: '#bdc3c7',
  };

  // Colores para tritanopia
  const tritanopiaColors = {
    primary: '#ff6b6b',
    secondary: '#ff8e8e',
    success: '#51cf66',
    error: '#ff6b6b',
    warning: '#ffd43b',
    info: '#74c0fc',
    background: '#fff5f5',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#5d6d7e',
    border: '#ffc9c9',
  };

  // Seleccionar paleta de colores según el tipo de accesibilidad
  let selectedColors = baseColors;
  if (config.highContrast) {
    selectedColors = highContrastColors;
  } else if (config.accessibilityType === 'protanopia') {
    selectedColors = protanopiaColors;
  } else if (config.accessibilityType === 'deuteranopia') {
    selectedColors = deuteranopiaColors;
  } else if (config.accessibilityType === 'tritanopia') {
    selectedColors = tritanopiaColors;
  }

  // Aplicar factores de contraste y brillo
  const adjustedColors = Object.entries(selectedColors).reduce((acc, [key, value]) => {
    if (value.startsWith('#')) {
      // Convertir hex a RGB y aplicar factores
      const hex = value.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      const adjustedR = Math.min(255, Math.max(0, Math.round(r * contrastFactor * brightnessFactor)));
      const adjustedG = Math.min(255, Math.max(0, Math.round(g * contrastFactor * brightnessFactor)));
      const adjustedB = Math.min(255, Math.max(0, Math.round(b * contrastFactor * brightnessFactor)));
      
      acc[key] = `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  return `
    :root {
      /* Colores dinámicos */
      --color-primary: ${adjustedColors.primary};
      --color-secondary: ${adjustedColors.secondary};
      --color-success: ${adjustedColors.success};
      --color-error: ${adjustedColors.error};
      --color-warning: ${adjustedColors.warning};
      --color-info: ${adjustedColors.info};
      --color-background: ${adjustedColors.background};
      --color-surface: ${adjustedColors.surface};
      --color-text: ${adjustedColors.text};
      --color-text-secondary: ${adjustedColors.textSecondary};
      --color-border: ${adjustedColors.border};

      /* Tipografía dinámica */
      --font-size-base: ${baseFontSize}px;
      --font-size-scale: ${scaleFactor};
      --font-size-xs: ${Math.round(baseFontSize * 0.75 * scaleFactor)}px;
      --font-size-sm: ${Math.round(baseFontSize * 0.875 * scaleFactor)}px;
      --font-size-md: ${Math.round(baseFontSize * scaleFactor)}px;
      --font-size-lg: ${Math.round(baseFontSize * 1.125 * scaleFactor)}px;
      --font-size-xl: ${Math.round(baseFontSize * 1.25 * scaleFactor)}px;
      --font-size-xxl: ${Math.round(baseFontSize * 1.5 * scaleFactor)}px;
      --font-size-xxxl: ${Math.round(baseFontSize * 2 * scaleFactor)}px;

      /* Espaciado dinámico */
      --spacing-xs: ${Math.round(4 * scaleFactor)}px;
      --spacing-sm: ${Math.round(8 * scaleFactor)}px;
      --spacing-md: ${Math.round(16 * scaleFactor)}px;
      --spacing-lg: ${Math.round(24 * scaleFactor)}px;
      --spacing-xl: ${Math.round(32 * scaleFactor)}px;
      --spacing-xxl: ${Math.round(48 * scaleFactor)}px;

      /* Bordes dinámicos */
      --border-radius-sm: ${Math.round(4 * scaleFactor)}px;
      --border-radius-md: ${Math.round(8 * scaleFactor)}px;
      --border-radius-lg: ${Math.round(12 * scaleFactor)}px;
      --border-radius-xl: ${Math.round(16 * scaleFactor)}px;

      /* Sombras dinámicas */
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, ${config.highContrast ? 0.8 : 0.12});
      --shadow-md: 0 4px 6px rgba(0, 0, 0, ${config.highContrast ? 0.8 : 0.1});
      --shadow-lg: 0 10px 15px rgba(0, 0, 0, ${config.highContrast ? 0.8 : 0.1});
      --shadow-xl: 0 20px 25px rgba(0, 0, 0, ${config.highContrast ? 0.8 : 0.1});

      /* Transiciones dinámicas */
      --transition-fast: ${config.animationsEnabled ? '0.15s' : '0.01ms'} ease-in-out;
      --transition-normal: ${config.animationsEnabled ? '0.3s' : '0.01ms'} ease-in-out;
      --transition-slow: ${config.animationsEnabled ? '0.5s' : '0.01ms'} ease-in-out;

      /* Z-index */
      --z-dropdown: 1000;
      --z-sticky: 1020;
      --z-fixed: 1030;
      --z-modal-backdrop: 1040;
      --z-modal: 1050;
      --z-popover: 1060;
      --z-tooltip: 1070;
    }

    /* Aplicar movimiento reducido si está deshabilitado */
    ${!config.animationsEnabled ? `
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    ` : ''}

    /* Estilos para alto contraste */
    ${config.highContrast ? `
      * {
        border-color: var(--color-border) !important;
      }
      
      button, input, select, textarea {
        border: 2px solid var(--color-border) !important;
      }
      
      button:hover, input:hover, select:hover, textarea:hover {
        border-color: var(--color-primary) !important;
      }
      
      button:focus, input:focus, select:focus, textarea:focus {
        outline: 3px solid var(--color-primary) !important;
        outline-offset: 2px !important;
      }
    ` : ''}

    /* Estilos para texto grande */
    ${config.largeText ? `
      body {
        font-size: var(--font-size-md) !important;
        line-height: 1.6 !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        line-height: 1.4 !important;
      }
      
      button, input, select, textarea {
        padding: var(--spacing-sm) var(--spacing-md) !important;
        font-size: var(--font-size-md) !important;
      }
      
      .ant-btn {
        height: auto !important;
        padding: var(--spacing-sm) var(--spacing-md) !important;
        font-size: var(--font-size-md) !important;
      }
      
      .ant-input {
        padding: var(--spacing-sm) var(--spacing-md) !important;
        font-size: var(--font-size-md) !important;
      }
    ` : ''}
  `;
};

// Componente GlobalStyle para aplicar las variables CSS
export const GlobalStyle = createGlobalStyle<{ config: AccessibilityConfig }>`
  ${({ config }) => generateCSSVariables(config)}
`;

// Hook para aplicar las variables CSS dinámicamente
export const useCSSVariables = (config: AccessibilityConfig) => {
  const applyCSSVariables = () => {
    const cssVariables = generateCSSVariables(config);
    
    // Crear o actualizar el elemento style
    let styleElement = document.getElementById('accessibility-variables');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'accessibility-variables';
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = cssVariables;
  };

  return { applyCSSVariables };
};

// Función para aplicar estilos de accesibilidad inmediatamente
export const applyAccessibilityStyles = (config: AccessibilityConfig) => {
  const cssVariables = generateCSSVariables(config);
  
  // Aplicar estilos inmediatamente
  const styleElement = document.createElement('style');
  styleElement.id = 'accessibility-variables';
  styleElement.textContent = cssVariables;
  
  // Remover estilos anteriores si existen
  const existingStyle = document.getElementById('accessibility-variables');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  document.head.appendChild(styleElement);
  
  // Aplicar clases adicionales al body
  document.body.className = document.body.className
    .replace(/accessibility-\w+/g, '')
    .trim();
  
  if (config.highContrast) {
    document.body.classList.add('accessibility-high-contrast');
  }
  
  if (config.largeText) {
    document.body.classList.add('accessibility-large-text');
  }
  
  if (!config.animationsEnabled) {
    document.body.classList.add('accessibility-reduced-motion');
  }
  
  if (config.accessibilityType !== 'default') {
    document.body.classList.add(`accessibility-${config.accessibilityType}`);
  }
};

export default generateCSSVariables;
