import React, { Component, ErrorInfo, ReactNode } from "react";
import { useThemeColors } from "../hooks/useThemeColors";
import styled from "styled-components";

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

// Componentes estilizados
const ErrorContainer = styled.div<{ colors: ReturnType<typeof useThemeColors> }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  text-align: center;
  background: ${({ colors }) => colors.background.primary};
  color: ${({ colors }) => colors.text.primary};
`;

const ErrorIcon = styled.div<{ colors: ReturnType<typeof useThemeColors> }>`
  font-size: 64px;
  margin-bottom: 24px;
  color: ${({ colors }) => colors.error[500]};
`;

const ErrorTitle = styled.h1<{ colors: ReturnType<typeof useThemeColors> }>`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ colors }) => colors.text.primary};
`;

const ErrorMessage = styled.p<{ colors: ReturnType<typeof useThemeColors> }>`
  font-size: 16px;
  margin-bottom: 24px;
  color: ${({ colors }) => colors.text.secondary};
  max-width: 600px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details<{ colors: ReturnType<typeof useThemeColors> }>`
  margin: 24px 0;
  padding: 16px;
  background: ${({ colors }) => colors.background.card};
  border: 1px solid ${({ colors }) => colors.border.normal};
  border-radius: 8px;
  text-align: left;
  max-width: 800px;
  width: 100%;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${({ colors }) => colors.text.primary};
    margin-bottom: 12px;
  }

  pre {
    font-size: 12px;
    color: ${({ colors }) => colors.text.secondary};
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
`;

const ActionButton = styled.button<{ 
  colors: ReturnType<typeof useThemeColors>;
  variant?: "primary" | "secondary" | "danger";
}>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ colors, variant = "primary" }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${colors.primary[500]};
          color: ${colors.text.inverse || "#ffffff"};
          &:hover {
            background: ${colors.primary[600]};
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `;
      case "secondary":
        return `
          background: ${colors.background.card};
          color: ${colors.text.primary};
          border: 1px solid ${colors.border.normal};
          &:hover {
            background: ${colors.background.secondary};
            border-color: ${colors.border.normal};
          }
        `;
      case "danger":
        return `
          background: ${colors.error[500]};
          color: ${colors.text.inverse || "#ffffff"};
          &:hover {
            background: ${colors.error[600]};
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${({ colors }) => colors.primary[500]};
    outline-offset: 2px;
  }
`;

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
  const colors = useThemeColors();
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
    <ErrorContainer colors={colors}>
      <ErrorIcon colors={colors}>{content.icon}</ErrorIcon>
      <ErrorTitle colors={colors}>{content.title}</ErrorTitle>
      <ErrorMessage colors={colors}>{content.message}</ErrorMessage>

      {(isDev || showDetails) && errorInfo && (
        <ErrorDetails colors={colors} open={isDev}>
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
        <ActionButton colors={colors} variant="primary" onClick={onRetry}>
          🔄 Reintentar
        </ActionButton>
        <ActionButton colors={colors} variant="secondary" onClick={onGoBack}>
          ← Volver atrás
        </ActionButton>
        <ActionButton colors={colors} variant="secondary" onClick={onGoHome}>
          🏠 Ir al inicio
        </ActionButton>
        {(isDev || showDetails) && (
          <ActionButton colors={colors} variant="danger" onClick={handleCopy}>
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
