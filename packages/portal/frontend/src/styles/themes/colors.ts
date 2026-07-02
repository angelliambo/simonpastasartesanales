/**
 * PALETA DE COLORES CENTRALIZADA
 *
 * Este archivo centraliza todos los colores base del sistema, evitando repetición
 * y proporcionando escalas consistentes para diferentes temas.
 *
 * Estructura:
 * - grayScale: Escala de grises de 0 (blanco) a 100 (negro)
 * - colorScales: Escalas de colores específicos
 * - semanticColors: Colores semánticos (success, warning, error, info)
 */

// Escala de grises: 0 = blanco, 100 = negro (incrementos de 5)
export const grayScale = {
  0: "#ffffff", // Blanco puro
  5: "#fafafa", // Casi blanco
  10: "#f5f5f5", // Blanco roto
  15: "#f0f0f0", // Gris muy claro
  20: "#e5e5e5", // Gris claro
  25: "#d4d4d4", // Gris medio-claro
  30: "#a3a3a3", // Gris medio
  35: "#737373", // Gris medio-oscuro
  40: "#525252", // Gris oscuro
  45: "#404040", // Gris muy oscuro
  50: "#262626", // Casi negro
  55: "#171717", // Negro roto
  60: "#0f0f0f", // Negro profundo
  65: "#0a0a0a", // Negro más profundo
  70: "#050505", // Negro muy profundo
  75: "#030303", // Negro extremo
  80: "#020202", // Negro casi puro
  85: "#010101", // Negro casi puro
  90: "#000000", // Negro puro
  95: "#000000", // Negro puro
  100: "#000000", // Negro puro
} as const;

// Escalas específicas para tipos de daltonismo
export const daltonismScales = {
  // Escala para Protanopia (dificultad con rojos) - usa azules y amarillos
  protanopia: {
    0: "#ffffff",
    10: "#e6f3ff", // Azul muy claro
    20: "#b3d9ff", // Azul claro
    30: "#80bfff", // Azul medio-claro
    40: "#4da6ff", // Azul medio
    50: "#1a8cff", // Azul medio-oscuro
    60: "#0066cc", // Azul oscuro
    70: "#0052a3", // Azul muy oscuro
    80: "#003d7a", // Azul profundo
    90: "#002952", // Azul muy profundo
    100: "#001429", // Azul negro
  },
  // Escala para Deuteranopia (dificultad con verdes) - usa naranjas y azules
  deuteranopia: {
    0: "#ffffff",
    10: "#fff7ed", // Naranja muy claro
    20: "#ffedd5", // Naranja claro
    30: "#fed7aa", // Naranja medio-claro
    40: "#fdba74", // Naranja medio
    50: "#fb923c", // Naranja medio-oscuro
    60: "#f97316", // Naranja oscuro
    70: "#ea580c", // Naranja muy oscuro
    80: "#c2410c", // Naranja profundo
    90: "#9a3412", // Naranja muy profundo
    100: "#431407", // Naranja negro
  },
  // Escala para Tritanopia (dificultad con azules) - usa rosas y verdes
  tritanopia: {
    0: "#ffffff",
    10: "#fdf2f8", // Rosa muy claro
    20: "#fce7f3", // Rosa claro
    30: "#fbcfe8", // Rosa medio-claro
    40: "#f9a8d4", // Rosa medio
    50: "#f472b6", // Rosa medio-oscuro
    60: "#ec4899", // Rosa oscuro
    70: "#db2777", // Rosa muy oscuro
    80: "#be185d", // Rosa profundo
    90: "#9d174d", // Rosa muy profundo
    100: "#500724", // Rosa negro
  },
};

// Escalas de colores específicos para diferentes temas
export const colorScales = {
  // Azul (para protanopia y temas base)
  blue: {
    0: "#ffffff",
    10: "#e6f3ff",
    20: "#b3d9ff",
    30: "#80bfff",
    40: "#4da6ff",
    50: "#1a8cff",
    60: "#0066cc",
    70: "#0052a3",
    80: "#003d7a",
    90: "#002952",
    100: "#001429",
  },
  // Amarillo (para protanopia)
  yellow: {
    0: "#ffffff",
    10: "#fff8e6",
    20: "#ffedb3",
    30: "#ffe280",
    40: "#ffd74d",
    50: "#ffcc1a",
    60: "#e6b800",
    70: "#b38f00",
    80: "#806600",
    90: "#4d3d00",
    100: "#1a1400",
  },
  // Verde (para deuteranopia)
  green: {
    0: "#ffffff",
    10: "#f0fdf4",
    20: "#dcfce7",
    30: "#bbf7d0",
    40: "#86efac",
    50: "#4ade80",
    60: "#22c55e",
    70: "#16a34a",
    80: "#15803d",
    90: "#166534",
    100: "#14532d",
  },
  // Púrpura (para tritanopia)
  purple: {
    0: "#ffffff",
    10: "#faf5ff",
    20: "#f3e8ff",
    30: "#e9d5ff",
    40: "#d8b4fe",
    50: "#c084fc",
    60: "#a855f7",
    70: "#9333ea",
    80: "#7c3aed",
    90: "#6b21a8",
    100: "#581c87",
  },
  // Rojo (para temas base)
  red: {
    0: "#ffffff",
    10: "#fef2f2",
    20: "#fecaca",
    30: "#fca5a5",
    40: "#f87171",
    50: "#ef4444",
    60: "#dc2626",
    70: "#b91c1c",
    80: "#991b1b",
    90: "#7f1d1d",
    100: "#450a0a",
  },
  // Naranja (para deuteranopia)
  orange: {
    0: "#ffffff",
    10: "#fff7ed",
    20: "#ffedd5",
    30: "#fed7aa",
    40: "#fdba74",
    50: "#fb923c",
    60: "#f97316",
    70: "#ea580c",
    80: "#c2410c",
    90: "#9a3412",
    100: "#431407",
  },
  // Rosa (para tritanopia)
  pink: {
    0: "#ffffff",
    10: "#fdf2f8",
    20: "#fce7f3",
    30: "#fbcfe8",
    40: "#f9a8d4",
    50: "#f472b6",
    60: "#ec4899",
    70: "#db2777",
    80: "#be185d",
    90: "#9d174d",
    100: "#500724",
  },
  // Cian (para temas base)
  cyan: {
    0: "#ffffff",
    10: "#ecfeff",
    20: "#cffafe",
    30: "#a5f3fc",
    40: "#67e8f9",
    50: "#22d3ee",
    60: "#06b6d4",
    70: "#0891b2",
    80: "#0e7490",
    90: "#155e75",
    100: "#083344",
  },
  // Índigo (para temas base)
  indigo: {
    0: "#ffffff",
    10: "#eef2ff",
    20: "#e0e7ff",
    30: "#c7d2fe",
    40: "#a5b4fc",
    50: "#818cf8",
    60: "#6366f1",
    70: "#4f46e5",
    80: "#4338ca",
    90: "#3730a3",
    100: "#1e1b4b",
  },
  // Esmeralda (para temas base)
  emerald: {
    0: "#ffffff",
    10: "#ecfdf5",
    20: "#d1fae5",
    30: "#a7f3d0",
    40: "#6ee7b7",
    50: "#34d399",
    60: "#10b981",
    70: "#059669",
    80: "#047857",
    90: "#065f46",
    100: "#064e3b",
  },
} as const;

// Colores semánticos
export const semanticColors = {
  success: {
    light: "#f0fdf4",
    main: "#22c55e",
    dark: "#15803d",
  },
  warning: {
    light: "#fffbeb",
    main: "#f59e0b",
    dark: "#b45309",
  },
  error: {
    light: "#fef2f2",
    main: "#ef4444",
    dark: "#b91c1c",
  },
  info: {
    light: "#eff6ff",
    main: "#3b82f6",
    dark: "#1d4ed8",
  },
} as const;

// Gradientes centralizados
export const gradients = {
  // Gradientes principales
  primary: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
  secondary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
  accent: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  hero: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
  card: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",

  // Gradientes para temas de accesibilidad
  heroHighContrast: "linear-gradient(135deg, #000000 0%, #333333 100%)",
  heroProtanopia: "linear-gradient(135deg, #0066cc 0%, #4da6ff 100%)",
  heroDeuteranopia: "linear-gradient(135deg, #cc6600 0%, #ff8c1a 100%)",
  heroTritanopia: "linear-gradient(135deg, #cc0066 0%, #ff1a8c 100%)",

  // Gradientes por dificultad de juegos
  gameEasy: "linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)",
  gameMedium: "linear-gradient(135deg, #fffbe6 0%, #ffffff 100%)",
  gameHard: "linear-gradient(135deg, #fff2f0 0%, #ffffff 100%)",

  // Gradientes por categoría de accesibilidad
  accessibilityCognitive: "linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)",
  accessibilityVoice: "linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)",
  accessibilityVisual: "linear-gradient(135deg, #fffbe6 0%, #ffffff 100%)",
  accessibilityMotor: "linear-gradient(135deg, #f9f0ff 0%, #ffffff 100%)",
  accessibilitySensory: "linear-gradient(135deg, #fff7e6 0%, #ffffff 100%)",

  // Gradientes por tipo de tema
  themePastel: "linear-gradient(135deg, #ff9a9e 0%, #fcb69f 100%)",
  themeVibrant: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  themeNeutral: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  themeNature: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",

  // Gradientes para componentes específicos
  progressBar: "linear-gradient(180deg, #1890ff 0%, #52c41a 100%)",
  notificationSuccess: "linear-gradient(180deg, #1890ff 0%, #52c41a 100%)",
  achievementGold: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
  achievementSilver: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)",
  achievementBronze: "linear-gradient(135deg, #cd7f32 0%, #daa520 100%)",

  // Gradientes para elementos interactivos
  buttonPrimary: "linear-gradient(90deg, #1890ff 0%, #52c41a 100%)",
  buttonSecondary: "linear-gradient(90deg, #722ed1 0%, #eb2f96 100%)",
  buttonAccent: "linear-gradient(90deg, #fa8c16 0%, #fadb14 100%)",

  // Gradientes para fondos de página
  pageBackground: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  dashboardBackground: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

  // Gradientes para elementos decorativos
  shimmer:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
  overlay:
    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
  glass:
    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
} as const;

// Funciones helper para generar escalas de colores
export const createColorScale = (
  startColor: string,
  endColor: string,
  steps: number = 10
) => {
  // Esta función podría implementar interpolación de colores
  // Por ahora retorna un objeto con las claves numéricas
  return Array.from({ length: steps + 1 }, (_, i) => ({
    [i * 10]:
      i === 0 ? startColor : i === steps ? endColor : `${startColor}${i}`,
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

// Funciones helper para acceder a gradientes
export const getGradient = (gradientName: keyof typeof gradients): string => {
  return gradients[gradientName];
};

// Función para obtener gradiente dinámico basado en el tema actual y accesibilidad
export const getDynamicGradient = (
  gradientName: keyof typeof gradients
): string => {
  const isDarkMode =
    document.documentElement.classList.contains("dark-mode") ||
    document.documentElement.getAttribute("data-theme") === "dark";

  // Si es pageBackground o dashboardBackground, usar gradientes específicos para dark/light
  if (gradientName === "pageBackground") {
    return isDarkMode
      ? "linear-gradient(135deg, #404040 0%, #2a2a2a 100%)" // Dark mode: colores del centro de la paleta
      : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"; // Light mode: mantener como está
  }

  if (gradientName === "dashboardBackground") {
    return isDarkMode
      ? "linear-gradient(135deg, #505050 0%, #3a3a3a 100%)" // Dark mode: colores del centro de la paleta
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Light mode: mantener como está
  }

  // Para otros gradientes, usar el valor estático
  return gradients[gradientName];
};

// Función para obtener gradiente del hero basado en accesibilidad y daltonismo
export const getHeroGradient = (): string => {
  const isDarkMode =
    document.documentElement.classList.contains("dark-mode") ||
    document.documentElement.getAttribute("data-theme") === "dark";

  // Detectar configuración de accesibilidad desde el DOM
  const bodyClasses = document.body.className;
  const htmlDataAccessibility =
    document.documentElement.getAttribute("data-accessibility");

  // Verificar high contrast
  const isHighContrast =
    bodyClasses.includes("high-contrast") ||
    htmlDataAccessibility === "high-contrast";

  // Verificar daltonismo
  const isProtanopia = htmlDataAccessibility === "protanopia";
  const isDeuteranopia = htmlDataAccessibility === "deuteranopia";
  const isTritanopia = htmlDataAccessibility === "tritanopia";

  // Seleccionar gradiente según configuración
  if (isHighContrast) {
    // En alto contraste, usar gradientes que mantengan el contraste según el modo
    if (isDarkMode) {
      return "linear-gradient(135deg, #0000ff 0%, #ff0000 100%)"; // Dark mode: azul → rojo vibrante para texto blanco
    } else {
      return "linear-gradient(135deg, #ffffff 0%, #000000 100%)"; // Light mode: blanco → negro para texto negro
    }
  }

  if (isProtanopia) {
    return gradients.heroProtanopia;
  }

  if (isDeuteranopia) {
    return gradients.heroDeuteranopia;
  }

  if (isTritanopia) {
    return gradients.heroTritanopia;
  }

  // Gradiente por defecto según tema
  if (isDarkMode) {
    return "linear-gradient(135deg, #404040 0%, #2a2a2a 100%)"; // Dark mode: colores del centro
  }

  return gradients.hero; // Light mode: gradiente original
};

// Función helper para generar gradientes dinámicos
export const createDynamicGradient = (
  startColor: string,
  endColor: string,
  direction: string = "135deg"
): string => {
  return `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`;
};

// Función para obtener color de escala de grises
export const getGray = (shade: keyof typeof grayScale) => grayScale[shade];

// Función para obtener color de escala específica
export const getColor = <T extends keyof typeof colorScales>(
  scale: T,
  shade: keyof (typeof colorScales)[T]
) => colorScales[scale][shade];

// Función para obtener color semántico
export const getSemanticColor = <T extends keyof typeof semanticColors>(
  type: T,
  variant: keyof (typeof semanticColors)[T]
) => semanticColors[type][variant];

// Tipos para TypeScript
export type GrayShade = keyof typeof grayScale;
export type ColorScale = keyof typeof colorScales;
export type ColorShade = keyof (typeof colorScales)[ColorScale];
export type SemanticType = keyof typeof semanticColors;
export type SemanticVariant = keyof (typeof semanticColors)[SemanticType];
