import React, { useEffect, useState, createContext, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { CloseOutlined } from "@ant-design/icons";

// Animaciones
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Tipos para las props del componente Snackbar
interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  "aria-live"?: "polite" | "assertive" | "off";
  /** ID único del componente (opcional) - se concatena con "snackbar-" */
  id?: string;
}

// Styled component base
const StyledSnackbar = styled.div<SnackbarProps>`
  position: fixed;
  top: calc(${({ theme }) => theme.spacing.lg} + 30px);
  right: ${({ theme }) => theme.spacing.lg};
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  animation: ${slideIn} 0.3s ease-out;

  // Tipos de snackbar
  ${({ theme, type = "info" }) => {
    switch (type) {
      case "success":
        return `
          background-color: ${theme.colors.success[50]};
          color: ${theme.colors.success[700]};
          border-left: 4px solid ${theme.colors.success[500]};
        `;
      case "error":
        return `
          background-color: ${theme.colors.error[50]};
          color: ${theme.colors.error[700]};
          border-left: 4px solid ${theme.colors.error[500]};
        `;
      case "warning":
        return `
          background-color: ${theme.colors.warning[50]};
          color: ${theme.colors.warning[700]};
          border-left: 4px solid ${theme.colors.warning[500]};
        `;
      case "info":
        return `
          background-color: ${theme.colors.info[50]};
          color: ${theme.colors.info[700]};
          border-left: 4px solid ${theme.colors.info[500]};
        `;
      default:
        return "";
    }
  }}

  // Iconos por tipo
  &::before {
    content: "";
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    flex-shrink: 0;

    ${({ type = "info" }) => {
      switch (type) {
        case "success":
          return `content: "✅";`;
        case "error":
          return `content: "❌";`;
        case "warning":
          return `content: "⚠️";`;
        case "info":
          return `content: "ℹ️";`;
        default:
          return "";
      }
    }}
  }

  // Botón de cerrar
  .snackbar-close {
    background: none;
    border: none;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.xs};
    margin-left: auto;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  // Animación de salida
  &.closing {
    animation: ${slideOut} 0.3s ease-in forwards;
  }

  @media (max-width: 768px) {
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    min-width: auto;
    max-width: none;
  }
`;

// Componente Snackbar principal
export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
  className,
  style,
  id,
  "aria-live": ariaLive = "polite",
  ...props
}) => {
  const { accessibility } = usePersonalization();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Auto-cerrar después de la duración especificada
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300); // Duración de la animación de salida
  };

  // Aplicar estilos de accesibilidad
  const getAccessibilityStyles = () => {
    const styles: React.CSSProperties = {};

    if (accessibility.fontSizeMultiplier) {
      styles.fontSize = `${accessibility.fontSizeMultiplier * 14}px`;
    }

    if (accessibility.increasedSpacing) {
      const multiplier = accessibility.spacingMultiplier || 1.5;
      styles.padding = `${multiplier * 16}px ${multiplier * 24}px`;
      styles.gap = `${multiplier * 16}px`;
    }

    return styles;
  };

  if (!isVisible) return null;

  const finalId = id ? `snackbar-${id}` : undefined;

  return (
    <StyledSnackbar
      id={finalId}
      message={message}
      type={type}
      className={`${className} ${isClosing ? "closing" : ""}`}
      style={{ ...getAccessibilityStyles(), ...style }}
      aria-live={ariaLive}
      role="alert"
      data-speak={accessibility.textToSpeech ? message : undefined}
      {...props}
    >
      <span>{message}</span>
      <button
        className="snackbar-close"
        onClick={handleClose}
        aria-label="Cerrar notificación"
        type="button"
      >
        <ZnIcon icon={CloseOutlined} />
      </button>
    </StyledSnackbar>
  );
};

// Hook para usar Snackbar de forma más fácil (versión individual)
interface UseSnackbarReturn {
  showSnackbar: (
    message: string,
    type?: SnackbarProps["type"],
    duration?: number
  ) => void;
  hideSnackbar: () => void;
}

export const useSnackbarIndividual = (): UseSnackbarReturn => {
  const [, setSnackbar] = useState<{
    message: string;
    type: SnackbarProps["type"];
    duration: number;
  } | null>(null);

  const showSnackbar = (
    message: string,
    type: SnackbarProps["type"] = "info",
    duration: number = 5000
  ) => {
    setSnackbar({ message, type, duration });
  };

  const hideSnackbar = () => {
    setSnackbar(null);
  };

  return { showSnackbar, hideSnackbar };
};

// Componente SnackbarProvider para manejar múltiples snackbars
interface SnackbarProviderProps {
  children: React.ReactNode;
}

interface SnackbarItem {
  id: string;
  message: string;
  type: SnackbarProps["type"];
  duration: number;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const addSnackbar = (
    message: string,
    type: SnackbarProps["type"] = "info",
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnackbars((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeSnackbar = (id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ addSnackbar, removeSnackbar }}>
      {children}
      {snackbars.map((snackbar, index) => (
        <div
          key={snackbar.id}
          style={{
            position: "fixed",
            top: `${110 + index * 80}px`,
            right: "24px",
            zIndex: 9999,
          }}
        >
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            duration={snackbar.duration}
            onClose={() => removeSnackbar(snackbar.id)}
          />
        </div>
      ))}
    </SnackbarContext.Provider>
  );
};

// Context para SnackbarProvider
interface SnackbarContextType {
  addSnackbar: (
    message: string,
    type?: SnackbarProps["type"],
    duration?: number
  ) => void;
  removeSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbarContext = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext debe ser usado dentro de SnackbarProvider"
    );
  }
  return context;
};

// Hook mejorado con funciones específicas por tipo
export const useSnackbar = () => {
  const { addSnackbar } = useSnackbarContext();
  const [currentMessage, setCurrentMessage] = useState<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
  } | null>(null);

  const showSuccess = (message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const snackbarMessage = { id, type: "success" as const, message, duration };
    addSnackbar(message, "success", duration);
    setCurrentMessage(snackbarMessage);
  };

  const showError = (message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const snackbarMessage = { id, type: "error" as const, message, duration };
    addSnackbar(message, "error", duration);
    setCurrentMessage(snackbarMessage);
  };

  const showInfo = (message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const snackbarMessage = { id, type: "info" as const, message, duration };
    addSnackbar(message, "info", duration);
    setCurrentMessage(snackbarMessage);
  };

  const showWarning = (message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const snackbarMessage = { id, type: "warning" as const, message, duration };
    addSnackbar(message, "warning", duration);
    setCurrentMessage(snackbarMessage);
  };

  const hideSnackbar = () => {
    setCurrentMessage(null);
  };

  return {
    currentMessage,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hideSnackbar,
  };
};
