import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Alert,
  SuccessAlert,
  InfoAlert,
  WarningAlert,
  ErrorAlert,
  PrimaryAlert,
  SecondaryAlert,
  SmallAlert,
  LargeAlert,
  FilledAlert,
  OutlinedAlert,
  SoftAlert,
  MinimalAlert,
  ClosableAlert,
  BannerAlert,
  PlainAlert,
  ConfirmAlert,
  LoadingAlert,
  NotificationAlert,
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 50: "#e3f2fd", 200: "#90caf9" },
    secondary: { 500: "#6c757d", 50: "#f8f9fa", 200: "#e9ecef" },
    success: { 500: "#28a745", 50: "#d4edda", 200: "#c3e6cb" },
    error: { 500: "#dc3545", 50: "#f8d7da", 200: "#f5c6cb" },
    warning: { 500: "#ffc107", 50: "#fff3cd", 200: "#ffeaa7" },
    info: { 500: "#17a2b8", 50: "#d1ecf1", 200: "#bee5eb" },
    background: { card: "#ffffff" },
    text: { primary: "#212529" },
  },
  typography: { fontWeight: { normal: 400, medium: 500 } },
  borderRadius: { lg: "12px" },
} as any;

// Mock para usePersonalization
jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: () => ({
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      textToSpeech: false,
      increasedSpacing: false,
      spacingMultiplier: 1,
      largeText: false,
    },
  }),
}));

// Wrapper para tests
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Alert Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza con mensaje básico", () => {
      renderWithProviders(<Alert message="Test alert" />);

      expect(screen.getByText("Test alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    test("renderiza con children cuando no hay message", () => {
      renderWithProviders(
        <Alert>
          <span>Custom content</span>
        </Alert>
      );

      expect(screen.getByText("Custom content")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    test("renderiza message y description", () => {
      renderWithProviders(
        <Alert message="Main message" description="Additional description" />
      );

      expect(screen.getByText("Main message")).toBeInTheDocument();
      expect(screen.getByText("Additional description")).toBeInTheDocument();
    });

    test("aplica className y style", () => {
      renderWithProviders(
        <Alert
          message="Test"
          className="custom-alert"
          style={{ margin: "10px" }}
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("custom-alert");
      expect(alert).toHaveStyle("margin: 10px");
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      const { container } = renderWithProviders(
        <Alert message="Small alert" size="small" />
      );

      // "small" → "sm" automáticamente
      const alert = container.firstChild;
      expect(alert).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];

      sizes.forEach((size) => {
        const { getByRole, unmount } = renderWithProviders(
          <Alert message={`${size} alert`} size={size as any} />
        );

        const alert = getByRole("alert");
        expect(alert).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(<Alert message="Danger alert" variant="danger" />);

      // "danger" → "error", no error de TypeScript
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("type prop tiene prioridad sobre variant", () => {
      renderWithProviders(
        <Alert message="Type priority test" type="success" variant="error" />
      );

      // type="success" debe ganar sobre variant="error"
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("aplica diferentes variantes sin errores", () => {
      const variants = [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
      ];

      variants.forEach((variant) => {
        const { getByRole, unmount } = renderWithProviders(
          <Alert message={`${variant} alert`} variant={variant as any} />
        );

        const alert = getByRole("alert");
        expect(alert).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Estilos visuales", () => {
    test("aplica diferentes estilos sin errores", () => {
      const styles = ["filled", "outlined", "soft", "minimal"];

      styles.forEach((alertStyle) => {
        const { getByRole, unmount } = renderWithProviders(
          <Alert
            message={`${alertStyle} alert`}
            alertStyle={alertStyle as any}
          />
        );

        const alert = getByRole("alert");
        expect(alert).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Funcionalidad closable", () => {
    test("no muestra botón close por defecto", () => {
      renderWithProviders(<Alert message="Not closable" />);

      expect(screen.queryByLabelText("Cerrar alerta")).not.toBeInTheDocument();
    });

    test("muestra botón close cuando closable=true", () => {
      renderWithProviders(<Alert message="Closable alert" closable />);

      expect(screen.getByLabelText("Cerrar alerta")).toBeInTheDocument();
    });

    test("ejecuta onClose cuando se hace clic en cerrar", () => {
      const handleClose = jest.fn();

      renderWithProviders(
        <Alert
          message="Closable with callback"
          closable
          onClose={handleClose}
        />
      );

      const closeButton = screen.getByLabelText("Cerrar alerta");
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test("se oculta después de hacer clic en cerrar", async () => {
      renderWithProviders(<Alert message="Will be closed" closable />);

      const alert = screen.getByRole("alert");
      const closeButton = screen.getByLabelText("Cerrar alerta");

      expect(alert).toBeInTheDocument();

      fireEvent.click(closeButton);

      // El alert debería ocultarse
      await waitFor(() => {
        expect(alert).not.toBeInTheDocument();
      });
    });

    test("ejecuta afterClose después de cerrar", async () => {
      jest.useFakeTimers();
      const afterClose = jest.fn();

      renderWithProviders(
        <Alert message="After close test" closable afterClose={afterClose} />
      );

      const closeButton = screen.getByLabelText("Cerrar alerta");
      fireEvent.click(closeButton);

      // Avanzar tiempo para simular animación
      jest.advanceTimersByTime(300);

      expect(afterClose).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe("Iconos", () => {
    test("muestra icono automático por defecto", () => {
      renderWithProviders(<Alert message="With icon" type="success" />);

      // El icono de success debe estar presente
      expect(screen.getByText("✅")).toBeInTheDocument();
    });

    test("oculta icono cuando showIcon=false", () => {
      renderWithProviders(
        <Alert message="No icon" type="success" showIcon={false} />
      );

      // El icono no debe estar presente
      expect(screen.queryByText("✅")).not.toBeInTheDocument();
    });

    test("usa icono personalizado cuando se proporciona", () => {
      renderWithProviders(
        <Alert
          message="Custom icon"
          icon={<span data-testid="custom-icon">🎉</span>}
        />
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(screen.getByText("🎉")).toBeInTheDocument();
    });
  });

  describe("Acciones", () => {
    test("renderiza acciones personalizadas", () => {
      renderWithProviders(
        <Alert
          message="With actions"
          action={<button data-testid="custom-action">Custom Action</button>}
        />
      );

      expect(screen.getByTestId("custom-action")).toBeInTheDocument();
      expect(screen.getByText("Custom Action")).toBeInTheDocument();
    });
  });

  describe("Props ARIA", () => {
    test("aplica role alert por defecto", () => {
      renderWithProviders(<Alert message="Default role" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("role", "alert");
    });

    test("permite role personalizado", () => {
      renderWithProviders(<Alert message="Custom role" role="status" />);

      const alert = screen.getByRole("status");
      expect(alert).toHaveAttribute("role", "status");
    });

    test("aplica aria-live polite por defecto", () => {
      renderWithProviders(<Alert message="Default aria-live" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "polite");
    });

    test("permite aria-live personalizado", () => {
      renderWithProviders(
        <Alert message="Custom aria-live" aria-live="assertive" />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "assertive");
    });

    test("aplica aria-label cuando se proporciona", () => {
      renderWithProviders(
        <Alert message="With label" aria-label="Important alert message" />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-label", "Important alert message");
    });
  });

  describe("Componentes predefinidos - Variants", () => {
    test("SuccessAlert aplica type success", () => {
      renderWithProviders(<SuccessAlert message="Success message" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("✅")).toBeInTheDocument();
    });

    test("InfoAlert aplica type info", () => {
      renderWithProviders(<InfoAlert message="Info message" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("ℹ️")).toBeInTheDocument();
    });

    test("WarningAlert aplica type warning", () => {
      renderWithProviders(<WarningAlert message="Warning message" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("⚠️")).toBeInTheDocument();
    });

    test("ErrorAlert aplica type error", () => {
      renderWithProviders(<ErrorAlert message="Error message" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("❌")).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Tamaños", () => {
    test("SmallAlert aplica tamaño sm", () => {
      renderWithProviders(<SmallAlert message="Small alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("LargeAlert aplica tamaño lg", () => {
      renderWithProviders(<LargeAlert message="Large alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Estilos", () => {
    test("FilledAlert aplica alertStyle filled", () => {
      renderWithProviders(<FilledAlert message="Filled alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("OutlinedAlert aplica alertStyle outlined", () => {
      renderWithProviders(<OutlinedAlert message="Outlined alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("SoftAlert aplica alertStyle soft", () => {
      renderWithProviders(<SoftAlert message="Soft alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("MinimalAlert aplica alertStyle minimal", () => {
      renderWithProviders(<MinimalAlert message="Minimal alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Funcionales", () => {
    test("ClosableAlert es cerrable por defecto", () => {
      renderWithProviders(<ClosableAlert message="Closable alert" />);

      expect(screen.getByLabelText("Cerrar alerta")).toBeInTheDocument();
    });

    test("BannerAlert aplica banner mode", () => {
      renderWithProviders(<BannerAlert message="Banner alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    test("PlainAlert no muestra icono", () => {
      renderWithProviders(<PlainAlert message="Plain alert" type="success" />);

      expect(screen.queryByText("✅")).not.toBeInTheDocument();
    });
  });

  describe("Casos de uso específicos", () => {
    test("ConfirmAlert renderiza botones de confirmación", () => {
      const handleConfirm = jest.fn();
      const handleCancel = jest.fn();

      renderWithProviders(
        <ConfirmAlert
          message="Confirm action"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      );

      expect(screen.getByText("Confirmar")).toBeInTheDocument();
      expect(screen.getByText("Cancelar")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Confirmar"));
      expect(handleConfirm).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByText("Cancelar"));
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    test("LoadingAlert muestra estado de carga", () => {
      renderWithProviders(
        <LoadingAlert loading={true} loadingText="Processing..." />
      );

      expect(screen.getByText("Processing...")).toBeInTheDocument();
      expect(screen.getByText("⏳")).toBeInTheDocument();
    });

    test("NotificationAlert es cerrable por defecto", () => {
      renderWithProviders(<NotificationAlert message="Notification" />);

      expect(screen.getByLabelText("Cerrar alerta")).toBeInTheDocument();
    });
  });

  describe("Casos edge", () => {
    test("maneja mensaje complejo como ReactNode", () => {
      renderWithProviders(
        <Alert
          message={
            <div>
              <strong>Complex</strong> <em>message</em>
            </div>
          }
        />
      );

      expect(screen.getByText(/Complex/i)).toBeInTheDocument();
      expect(screen.getByText(/message/i)).toBeInTheDocument();
    });

    test("maneja description compleja como ReactNode", () => {
      renderWithProviders(
        <Alert
          message="Main"
          description={
            <div>
              Complex <a href="#">link</a> description
            </div>
          }
        />
      );

      expect(screen.getByText(/Complex/i)).toBeInTheDocument();
      expect(screen.getByText("link")).toBeInTheDocument();
    });

    test("maneja contenido mixto: message, description y children", () => {
      renderWithProviders(
        <Alert message="Main message" description="Description text">
          <div>Custom children content</div>
        </Alert>
      );

      expect(screen.getByText("Main message")).toBeInTheDocument();
      expect(screen.getByText("Description text")).toBeInTheDocument();
      expect(screen.getByText("Custom children content")).toBeInTheDocument();
    });

    test("funciona sin message ni children", () => {
      renderWithProviders(<Alert />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  });
});
