import { createGlobalStyle } from "styled-components";

// Tipos para las configuraciones de accesibilidad
interface AccessibilityConfig {
  highContrast: boolean;
  colorBlindMode: boolean;
  accessibilityType: string;
  contrast: number;
  brightness: number;
}

// Paletas de colores para accesibilidad
const accessibilityThemes = {
  // Tema magenta para dificultades de visión
  magenta: {
    primary: "#e91e63", // Magenta vibrante
    secondary: "#ad1457", // Magenta oscuro
    success: "#4caf50", // Verde mantenido
    error: "#f44336", // Rojo mantenido
    warning: "#ff9800", // Naranja mantenido
    info: "#2196f3", // Azul mantenido
    background: "#fce4ec", // Fondo magenta claro
    surface: "#ffffff", // Superficie blanca
    text: "#880e4f", // Texto magenta oscuro
    textSecondary: "#ad1457", // Texto secundario magenta
    border: "#f8bbd9", // Borde magenta claro
    accent: "#c2185b", // Acento magenta
  },

  // Tema azul para dificultades de visión
  blue: {
    primary: "#1976d2", // Azul vibrante
    secondary: "#1565c0", // Azul oscuro
    success: "#4caf50", // Verde mantenido
    error: "#f44336", // Rojo mantenido
    warning: "#ff9800", // Naranja mantenido
    info: "#03a9f4", // Azul claro
    background: "#e3f2fd", // Fondo azul claro
    surface: "#ffffff", // Superficie blanca
    text: "#0d47a1", // Texto azul oscuro
    textSecondary: "#1565c0", // Texto secundario azul
    border: "#bbdefb", // Borde azul claro
    accent: "#1976d2", // Acento azul
  },

  // Tema naranja para dificultades de visión
  orange: {
    primary: "#ff5722", // Naranja vibrante
    secondary: "#d84315", // Naranja oscuro
    success: "#4caf50", // Verde mantenido
    error: "#f44336", // Rojo mantenido
    warning: "#ff9800", // Naranja mantenido
    info: "#2196f3", // Azul mantenido
    background: "#fff3e0", // Fondo naranja claro
    surface: "#ffffff", // Superficie blanca
    text: "#bf360c", // Texto naranja oscuro
    textSecondary: "#d84315", // Texto secundario naranja
    border: "#ffcc02", // Borde naranja claro
    accent: "#ff5722", // Acento naranja
  },

  // Tema por defecto (sin cambios)
  default: {
    primary: "#667eea",
    secondary: "#764ba2",
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#333333",
    textSecondary: "#666666",
    border: "#e0e0e0",
    accent: "#667eea",
  },
};

// Función para generar CSS custom properties dinámicos
export const generateAccessibilityCSS = (config: AccessibilityConfig) => {
  const contrastFactor = config.contrast;
  const brightnessFactor = config.brightness;

  // Seleccionar paleta según el tipo de accesibilidad
  let selectedTheme = accessibilityThemes.default;

  if (config.accessibilityType === "magenta") {
    selectedTheme = accessibilityThemes.magenta;
  } else if (config.accessibilityType === "blue") {
    selectedTheme = accessibilityThemes.blue;
  } else if (config.accessibilityType === "orange") {
    selectedTheme = accessibilityThemes.orange;
  }

  // Aplicar factores de contraste y brillo
  const adjustedColors = Object.entries(selectedTheme).reduce(
    (acc, [key, value]) => {
      if (value.startsWith("#")) {
        // Convertir hex a RGB y aplicar factores
        const hex = value.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        const adjustedR = Math.min(
          255,
          Math.max(0, Math.round(r * contrastFactor * brightnessFactor))
        );
        const adjustedG = Math.min(
          255,
          Math.max(0, Math.round(g * contrastFactor * brightnessFactor))
        );
        const adjustedB = Math.min(
          255,
          Math.max(0, Math.round(b * contrastFactor * brightnessFactor))
        );

        acc[key] = `#${adjustedR.toString(16).padStart(2, "0")}${adjustedG
          .toString(16)
          .padStart(2, "0")}${adjustedB.toString(16).padStart(2, "0")}`;
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return `
    :root {
      /* Colores de accesibilidad dinámicos */
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
      --color-accent: ${adjustedColors.accent};

      /* Sombras con contraste ajustado */
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, ${config.highContrast ? 0.8 : 0.12});
      --shadow-md: 0 4px 6px rgba(0, 0, 0, ${config.highContrast ? 0.8 : 0.1});
      --shadow-lg: 0 10px 15px rgba(0, 0, 0, ${
        config.highContrast ? 0.8 : 0.1
      });
      --shadow-xl: 0 20px 25px rgba(0, 0, 0, ${
        config.highContrast ? 0.8 : 0.1
      });
    }

    /* Aplicar colores a elementos específicos */
    body {
      background-color: var(--color-background) !important;
      color: var(--color-text) !important;
    }

    /* Aplicar colores a botones */
    .ant-btn-primary {
      background-color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
    }

    .ant-btn-primary:hover {
      background-color: var(--color-secondary) !important;
      border-color: var(--color-secondary) !important;
    }

    /* Aplicar colores a inputs */
    .ant-input {
      border-color: var(--color-border) !important;
      color: var(--color-text) !important;
    }

    .ant-input:focus {
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 0 2px ${adjustedColors.primary}20 !important;
    }

    /* Aplicar colores a cards */
    .ant-card {
      background-color: var(--color-surface) !important;
      border-color: var(--color-border) !important;
    }

    /* Aplicar colores a tabs */
    .ant-tabs-tab {
      color: var(--color-text-secondary) !important;
    }

    .ant-tabs-tab-active {
      color: var(--color-primary) !important;
    }

    .ant-tabs-ink-bar {
      background-color: var(--color-primary) !important;
    }

    /* Aplicar colores a progress bars */
    .ant-progress-bg {
      background-color: var(--color-primary) !important;
    }

    /* Aplicar colores a alerts */
    .ant-alert-success {
      background-color: ${adjustedColors.success}10 !important;
      border-color: ${adjustedColors.success} !important;
      color: var(--color-text) !important;
    }

    .ant-alert-error {
      background-color: ${adjustedColors.error}10 !important;
      border-color: ${adjustedColors.error} !important;
      color: var(--color-text) !important;
    }

    .ant-alert-warning {
      background-color: ${adjustedColors.warning}10 !important;
      border-color: ${adjustedColors.warning} !important;
      color: var(--color-text) !important;
    }

    .ant-alert-info {
      background-color: ${adjustedColors.info}10 !important;
      border-color: ${adjustedColors.info} !important;
      color: var(--color-text) !important;
    }

    /* Aplicar colores a tablas */
    .ant-table {
      background-color: var(--color-surface) !important;
    }

    .ant-table-thead > tr > th {
      background-color: var(--color-background) !important;
      color: var(--color-text) !important;
      border-color: var(--color-border) !important;
    }

    .ant-table-tbody > tr > td {
      color: var(--color-text) !important;
      border-color: var(--color-border) !important;
    }

    .ant-table-tbody > tr:hover > td {
      background-color: var(--color-background) !important;
    }

    /* Aplicar colores a estadísticas */
    .ant-statistic-content {
      color: var(--color-text) !important;
    }

    .ant-statistic-title {
      color: var(--color-text-secondary) !important;
    }

    /* Estilos para alto contraste */
    ${
      config.highContrast
        ? `
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
    `
        : ""
    }
  `;
};

// Componente GlobalStyle para aplicar las variables CSS
export const AccessibilityGlobalStyle = createGlobalStyle<{
  config: AccessibilityConfig;
}>`
  ${({ config }) => generateAccessibilityCSS(config)}
`;

// Función para aplicar estilos de accesibilidad inmediatamente
export const applyAccessibilityStyles = (config: AccessibilityConfig) => {
  const cssVariables = generateAccessibilityCSS(config);

  // Aplicar estilos inmediatamente
  const styleElement = document.createElement("style");
  styleElement.id = "accessibility-styles";
  styleElement.textContent = cssVariables;

  // Remover estilos anteriores si existen
  const existingStyle = document.getElementById("accessibility-styles");
  if (existingStyle) {
    existingStyle.remove();
  }

  document.head.appendChild(styleElement);

  // Aplicar clases adicionales al body
  document.body.className = document.body.className
    .replace(/accessibility-\w+/g, "")
    .trim();

  if (config.highContrast) {
    document.body.classList.add("accessibility-high-contrast");
  }

  if (config.accessibilityType !== "default") {
    document.body.classList.add(`accessibility-${config.accessibilityType}`);
  }
};

// Hook para aplicar las variables CSS dinámicamente
export const useAccessibilityStyles = (config: AccessibilityConfig) => {
  const applyStyles = () => {
    applyAccessibilityStyles(config);
  };

  return { applyStyles };
};

export default generateAccessibilityCSS;
