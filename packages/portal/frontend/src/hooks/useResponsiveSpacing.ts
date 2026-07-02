import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import type { DefaultTheme } from "styled-components";

/**
 * Hook para obtener valores de spacing responsive basados en el viewport
 * 
 * Retorna los valores de spacing apropiados según el dispositivo:
 * - Mobile (< 768px): spacing.mobile
 * - Tablet (768px - 992px): spacing.tablet
 * - Desktop (> 992px): spacing (valores por defecto)
 * 
 * @returns Objeto con valores de spacing (xs, sm, md, lg, xl, xxl)
 * 
 * @example
 * ```tsx
 * const spacing = useResponsiveSpacing();
 * 
 * <div style={{ padding: spacing.md }}>
 *   Contenido con padding responsive
 * </div>
 * ```
 */
export const useResponsiveSpacing = () => {
  const theme = useTheme() as DefaultTheme;
  const [spacing, setSpacing] = useState(theme.spacing);

  useEffect(() => {
    // Mobile breakpoint: < 768px
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    // Tablet breakpoint: 768px - 991px
    const tabletQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 991px)"
    );

    const updateSpacing = () => {
      if (mobileQuery.matches && theme.spacing.mobile) {
        setSpacing(theme.spacing.mobile);
      } else if (tabletQuery.matches && theme.spacing.tablet) {
        setSpacing(theme.spacing.tablet);
      } else {
        setSpacing({
          xs: theme.spacing.xs,
          sm: theme.spacing.sm,
          md: theme.spacing.md,
          lg: theme.spacing.lg,
          xl: theme.spacing.xl,
          xxl: theme.spacing.xxl,
        });
      }
    };

    // Inicializar
    updateSpacing();

    // Escuchar cambios en los breakpoints
    mobileQuery.addEventListener("change", updateSpacing);
    tabletQuery.addEventListener("change", updateSpacing);

    return () => {
      mobileQuery.removeEventListener("change", updateSpacing);
      tabletQuery.removeEventListener("change", updateSpacing);
    };
  }, [theme]);

  return spacing;
};

