import React, { memo } from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import OfflineIndicator from "./components/OfflineIndicator";
import { AppProviders } from "./providers/AppProviders";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { styled } from "styled-components";

const AppContainer = styled.div`
  width: 100%;
`;

const App = memo(() => {
  return (
    <AppProviders>
      <ErrorBoundary>
        <GlobalStyles />
        <AppContainer>
          <AppRoutes />
          <OfflineIndicator showDetails={true} position="top" />
        </AppContainer>
      </ErrorBoundary>
    </AppProviders>
  );
});

App.displayName = "App";

export default App;
