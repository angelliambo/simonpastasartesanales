import { useTheme } from "styled-components";
import lightTheme from "../theme/light";

/**
 * Hook para obtener los colores del tema activo de forma portable y reactiva.
 * Consume directamente el context de styled-components.
 */
export const useThemeColors = () => {
  const theme = useTheme() as any;

  if (theme && theme.colors) {
    return theme.colors;
  }

  // Fallback seguro para entornos de prueba o renderizado sin ThemeProvider
  return lightTheme.colors;
};
