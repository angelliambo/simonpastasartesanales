import React, { useEffect, useState, createContext, useContext } from "react";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { ZnIcon } from '../ZnIcon';
import {
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { StyledSnackbar } from './Snackbar.styles';

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

const getIconForType = (type: "success" | "error" | "warning" | "info" = "info") => {
  const iconMap = {
    success: CheckCircleOutlined,
    error: CloseCircleOutlined,
    warning: ExclamationCircleOutlined,
    info: InfoCircleOutlined,
  };
  return iconMap[type] || InfoCircleOutlined;
};

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
    }, 300);
  };

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
  const TypeIcon = getIconForType(type);

  return (
    <StyledSnackbar
      id={finalId}
      $type={type}
      className={`${className || ""} ${isClosing ? "closing" : ""}`}
      style={{ ...getAccessibilityStyles(), ...style }}
      aria-live={ariaLive}
      role="alert"
      data-speak={accessibility.textToSpeech ? message : undefined}
      {...props}
    >
      <span className="snackbar-icon">
        <ZnIcon icon={TypeIcon} />
      </span>
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
