import React, { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "../store/StoreProvider";
import { ProgressProvider } from "../contexts/ProgressContext";
import { ThemeProvider } from "../styles/ThemeProvider";
import { ResponsiveProvider } from "../contexts/ResponsiveContext";
import { PersonalizationProvider } from "../contexts/PersonalizationContext";
import { SnackbarProvider } from "../components/ui/atoms/Snackbar";
import { I18nProvider } from "../i18n/I18nProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <StoreProvider>
        <I18nProvider>
          <ResponsiveProvider>
            <ProgressProvider>
              <ThemeProvider>
                <PersonalizationProvider>
                  <SnackbarProvider>
                    {children}
                  </SnackbarProvider>
                </PersonalizationProvider>
              </ThemeProvider>
            </ProgressProvider>
          </ResponsiveProvider>
        </I18nProvider>
      </StoreProvider>
    </HelmetProvider>
  );
};
