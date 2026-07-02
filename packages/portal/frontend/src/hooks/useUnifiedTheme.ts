import { useThemeColors } from "./useThemeColors";

/**
 * Hook unificado basado en el sistema centralizado de colores del proyecto
 * Ya no usa theme.useToken() de Ant Design - usa solo el sistema interno
 */
export const useUnifiedTheme = () => {
  const colors = useThemeColors();

  return {
    // Sistema centralizado (preferido)
    colors,

    // Sistema de tokens compatible (basado en colores del sistema centralizado)
    token: {
      colorPrimary: colors.primary[500],
      colorSuccess: colors.success[500],
      colorWarning: colors.warning[500],
      colorError: colors.error[500],
      colorInfo: colors.info[500],
      colorText: colors.text.primary,
      colorTextSecondary: colors.text.secondary,
      colorBgContainer: colors.background.card,
      colorBgLayout: colors.background.primary,
      colorBorder: colors.border.normal,
      borderRadius: 8,
      fontSize: 14,
    },
  };
};

/**
 * Hook que proporciona solo los tokens unificados para migración gradual
 * Usar este hook en lugar de theme.useToken() para obtener colores del sistema centralizado
 */
export const useUnifiedTokens = () => {
  const { colors } = useUnifiedTheme();

  return {
    colorPrimary: colors.primary[500],
    colorSuccess: colors.success[500],
    colorWarning: colors.warning[500],
    colorError: colors.error[500],
    colorInfo: colors.info[500],
    colorText: colors.text.primary,
    colorTextSecondary: colors.text.secondary,
    colorBgContainer: colors.background.card,
    colorBgLayout: colors.background.primary,
    colorBorder: colors.border.normal,
    borderRadius: 8,
    fontSize: 14,
  };
};
