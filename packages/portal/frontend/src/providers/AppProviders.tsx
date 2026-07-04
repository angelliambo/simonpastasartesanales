import React, { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "../store/StoreProvider";
import { ProgressProvider } from "../contexts/ProgressContext";
import { ThemeProvider, useTheme } from "../styles/ThemeProvider";
import { ResponsiveProvider } from "../contexts/ResponsiveContext";
import { PersonalizationProvider } from '@design-sys/contexts/PersonalizationContext';
import { SnackbarProvider } from '@design-sys/atoms/Snackbar';
import { I18nProvider } from "../i18n/I18nProvider";
import { ConfigProvider, theme as antdTheme } from "antd";

interface AppProvidersProps {
  children: ReactNode;
}

const AntdConfigBridge: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, currentTheme } = useTheme();

  const antdThemeConfig = React.useMemo(() => {
    if (!currentTheme) return {};

    const rawRadius = currentTheme.borderRadius?.md || "8px";
    const parsedRadius = parseInt(rawRadius, 10) || 8;

    return {
      algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: currentTheme.colors?.primary?.[500] || "#3b82f6",
        colorSuccess: currentTheme.colors?.success?.[500] || "#22c55e",
        colorWarning: currentTheme.colors?.warning?.[500] || "#f59e0b",
        colorError: currentTheme.colors?.error?.[500] || "#ef4444",
        colorInfo: currentTheme.colors?.info?.[500] || "#3b82f6",
        colorBgContainer: currentTheme.colors?.background?.card || "#ffffff",
        colorBgLayout: currentTheme.colors?.background?.primary || "#f0f0f0",
        colorText: currentTheme.colors?.text?.primary || "#171717",
        colorTextDescription: currentTheme.colors?.text?.secondary || "#525252",
        colorBorder: currentTheme.colors?.border?.light || "#f5f5f5",
        borderRadius: parsedRadius,
        fontFamily: currentTheme.typography?.fontFamily?.primary || "inherit",
      },
    };
  }, [theme, currentTheme]);

  return (
    <ConfigProvider theme={antdThemeConfig}>
      {children}
    </ConfigProvider>
  );
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <StoreProvider>
        <I18nProvider>
          <ResponsiveProvider>
            <ProgressProvider>
              <ThemeProvider>
                <AntdConfigBridge>
                  <PersonalizationProvider>
                    <SnackbarProvider>
                      {children}
                    </SnackbarProvider>
                  </PersonalizationProvider>
                </AntdConfigBridge>
              </ThemeProvider>
            </ProgressProvider>
          </ResponsiveProvider>
        </I18nProvider>
      </StoreProvider>
    </HelmetProvider>
  );
};
