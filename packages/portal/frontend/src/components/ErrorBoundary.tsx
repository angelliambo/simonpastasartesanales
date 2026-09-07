import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  ErrorContainer,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  ErrorDetails,
  ButtonGroup,
  ActionButton,
} from "./ErrorBoundary.styles";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorType?: "theme" | "network" | "component" | "unknown";
}

// Componente funcional para el UI del error
const ErrorFallback: React.FC<{
  error: Error;
  errorInfo?: ErrorInfo;
  errorType: "theme" | "network" | "component" | "unknown";
  onRetry: () => void;
  onGoHome: () => void;
  onGoBack: () => void;
  showDetails?: boolean;
}> = ({ error, errorInfo, errorType, onRetry, onGoHome, onGoBack, showDetails = false }) => {
  const [copied, setCopied] = React.useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  const handleCopy = () => {
    const text = [
      `Error: ${error.message}`,
      error.stack || '',
      errorInfo?.componentStack || '',
    ].join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getErrorContent = () => {
    switch (errorType) {
      case "theme":
        return {
          icon: "🎨",
          title: "Problema con el tema visual",
          message: "Hubo un problema al cargar la configuración visual. Hemos restaurado los valores por defecto. Por favor, intenta recargar la página.",
        };
      case "network":
        return {
          icon: "🌐",
          title: "Problema de conexión",
          message: "No pudimos conectarnos al servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.",
        };
      case "component":
        return {
          icon: "⚙️",
          title: "Error en un componente",
          message: "Algo salió mal al cargar esta sección. Puedes intentar recargar la página o volver atrás.",
        };
      default:
        return {
          icon: "😕",
          title: "Algo salió mal",
          message: "Ocurrió un error inesperado. No te preocupes, puedes intentar recargar la página o volver al inicio.",
        };
    }
  };

  const content = getErrorContent();

  return (
    <ErrorContainer>
      <ErrorIcon>{content.icon}</ErrorIcon>
      <ErrorTitle>{content.title}</ErrorTitle>
      <ErrorMessage>{content.message}</ErrorMessage>

      {(isDev || showDetails) && errorInfo && (
        <ErrorDetails open={isDev}>
          <summary>Detalles técnicos del error</summary>
          <div>
            <p><strong>Error:</strong> {error.message}</p>
            {error.stack && (
              <pre>{error.stack}</pre>
            )}
            {errorInfo.componentStack && (
              <div>
                <strong>Componente que causó el error:</strong>
                <pre>{errorInfo.componentStack}</pre>
              </div>
            )}
          </div>
        </ErrorDetails>
      )}

      <ButtonGroup>
        <ActionButton $variant="primary" onClick={onRetry}>
          🔄 Reintentar
        </ActionButton>
        <ActionButton $variant="secondary" onClick={onGoBack}>
          ← Volver atrás
        </ActionButton>
        <ActionButton $variant="secondary" onClick={onGoHome}>
          🏠 Ir al inicio
        </ActionButton>
        {(isDev || showDetails) && (
          <ActionButton $variant="danger" onClick={handleCopy}>
            {copied ? '✅ Copiado' : '📋 Copiar error'}
          </ActionButton>
        )}
      </ButtonGroup>
    </ErrorContainer>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  private static getErrorType(error: Error): "theme" | "network" | "component" | "unknown" {
    const errorMessage = error.message?.toLowerCase() || "";
    const errorStack = error.stack?.toLowerCase() || "";

    if (
      errorMessage.includes("theme") ||
      errorMessage.includes("color") ||
      errorStack.includes("themeprovider") ||
      errorStack.includes("getcombinedtheme")
    ) {
      return "theme";
    }

    if (
      errorMessage.includes("network") ||
      errorMessage.includes("fetch") ||
      errorMessage.includes("connection") ||
      errorMessage.includes("timeout")
    ) {
      return "network";
    }

    if (
      errorMessage.includes("component") ||
      errorMessage.includes("render") ||
      errorStack.includes("react")
    ) {
      return "component";
    }

    return "unknown";
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorType: ErrorBoundary.getErrorType(error),
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    this.setState({ errorInfo });

    // Notificar al callback si existe
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Si el error está relacionado con temas, intentar restaurar tema por defecto
    const errorType = ErrorBoundary.getErrorType(error);
    if (errorType === "theme") {
      try {
        // Restaurar tema por defecto en localStorage
        localStorage.setItem(
          "zn-portal-user-theme",
          JSON.stringify({ theme: "light", accessibility: "default", autoDetect: false })
        );
        localStorage.setItem(
          "zn-portal-accessibility-preferences",
          JSON.stringify({
            theme: "default",
            highContrast: false,
            reducedMotion: false,
            fontSize: "normal",
            screenReader: false,
          })
        );
        console.log("Tema restaurado a valores por defecto debido a error");
      } catch (restoreError) {
        console.error("Error restaurando tema:", restoreError);
      }
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorType={this.state.errorType || "unknown"}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          onGoBack={this.handleGoBack}
          showDetails={this.props.showDetails || false}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
