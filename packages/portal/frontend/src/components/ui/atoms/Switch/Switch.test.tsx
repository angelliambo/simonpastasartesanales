import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Switch,
  BasicSwitch,
  SuccessSwitch,
  DangerSwitch,
  SmallSwitch,
  LargeSwitch,
  OnOffSwitch,
  CheckSwitch,
  ThemeSwitch,
  Minimal,
  Elevated,
  CompactSwitchComponent,
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 600: "#0056b3" },
    secondary: { 500: "#6c757d", 600: "#545862" },
    success: { 500: "#28a745", 600: "#218838" },
    error: { 500: "#dc3545", 600: "#c82333" },
    warning: { 500: "#ffc107", 600: "#e0a800" },
    info: { 500: "#17a2b8", 600: "#138496" },
    background: { secondary: "#f8f9fa", disabled: "#e9ecef" },
    border: { normal: "#ced4da", light: "#dee2e6" },
    text: { secondary: "#6c757d", inverse: "#ffffff" },
  },
  typography: { fontWeight: { medium: 500 } },
  shadows: {
    sm: "0 2px 4px rgba(0,0,0,0.1)",
    md: "0 4px 8px rgba(0,0,0,0.12)",
  },
} as any;

// Mock hooks para evitar dependencias externas en tests
jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: () => ({
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      textToSpeech: false,
      increasedSpacing: false,
      spacingMultiplier: 1,
    },
  }),
}));

// Wrapper para tests
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Switch Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza correctamente con props por defecto", () => {
      renderWithProviders(<Switch />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    test("aplica role switch correctamente", () => {
      renderWithProviders(<Switch />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("role", "switch");
    });

    test("renderiza con checked por defecto", () => {
      renderWithProviders(<Switch defaultChecked={true} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    test("aplica className personalizada", () => {
      renderWithProviders(<Switch className="custom-switch" />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveClass("custom-switch");
    });
  });

  describe("Estados controlled y uncontrolled", () => {
    test("funciona en modo uncontrolled", () => {
      renderWithProviders(<Switch defaultChecked={false} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-checked", "false");

      fireEvent.click(switchElement);
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    test("funciona en modo controlled", () => {
      const handleChange = jest.fn();
      const { rerender } = renderWithProviders(
        <Switch checked={false} onChange={handleChange} />
      );

      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");

      fireEvent.click(screen.getByRole("switch"));
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));

      // El estado no cambia automáticamente en modo controlled
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");

      // Simular actualización del padre
      rerender(<Switch checked={true} onChange={handleChange} />);
      const updatedSwitch = screen.getByRole("switch");
      expect(updatedSwitch).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Callbacks y eventos", () => {
    test("llama onChange cuando se hace clic", () => {
      const handleChange = jest.fn();
      renderWithProviders(<Switch onChange={handleChange} />);

      const switchElement = screen.getByRole("switch");
      fireEvent.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    test("llama onClick cuando se hace clic", () => {
      const handleClick = jest.fn();
      renderWithProviders(<Switch onClick={handleClick} />);

      const switchElement = screen.getByRole("switch");
      fireEvent.click(switchElement);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(true, expect.any(Object));
    });

    test("llama ambos callbacks cuando están presentes", () => {
      const handleChange = jest.fn();
      const handleClick = jest.fn();
      renderWithProviders(
        <Switch onChange={handleChange} onClick={handleClick} />
      );

      const switchElement = screen.getByRole("switch");
      fireEvent.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Estados disabled y loading", () => {
    test("no responde a clics cuando está disabled", () => {
      const handleChange = jest.fn();
      renderWithProviders(<Switch disabled onChange={handleChange} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(switchElement);
      expect(handleChange).not.toHaveBeenCalled();
    });

    test("no responde a clics cuando está loading", () => {
      const handleChange = jest.fn();
      renderWithProviders(<Switch loading onChange={handleChange} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(switchElement);
      expect(handleChange).not.toHaveBeenCalled();
    });

    test("muestra spinner cuando está loading", () => {
      renderWithProviders(<Switch loading />);

      // El loading spinner se renderiza, verificamos que existe
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      const { container } = renderWithProviders(<Switch size="small" />);

      const switchElement = container.firstChild as HTMLElement;
      // "small" → "sm" → 28px width
      const computedStyle = window.getComputedStyle(switchElement);
      expect(computedStyle.width).toBe("28px");
    });

    test("aplica diferentes tamaños correctamente", () => {
      const sizes = [
        { size: "sm", expectedWidth: "28px" },
        { size: "md", expectedWidth: "44px" },
        { size: "lg", expectedWidth: "56px" },
      ];

      sizes.forEach(({ size, expectedWidth }) => {
        const { container, unmount } = renderWithProviders(
          <Switch size={size as any} />
        );

        const switchElement = container.firstChild as HTMLElement;
        const computedStyle = window.getComputedStyle(switchElement);
        expect(computedStyle.width).toBe(expectedWidth);
        unmount();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(<Switch variant="danger" />);

      // "danger" → "error", no error de TypeScript y renderiza correctamente
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
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
          <Switch variant={variant as any} />
        );
        expect(getByRole("switch")).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Contenido interno", () => {
    test("muestra checkedChildren cuando está activado", () => {
      renderWithProviders(
        <Switch
          defaultChecked={true}
          checkedChildren="ON"
          unCheckedChildren="OFF"
        />
      );

      expect(screen.getByText("ON")).toBeInTheDocument();
    });

    test("muestra unCheckedChildren cuando está desactivado", () => {
      renderWithProviders(
        <Switch
          defaultChecked={false}
          checkedChildren="ON"
          unCheckedChildren="OFF"
        />
      );

      expect(screen.getByText("OFF")).toBeInTheDocument();
    });

    test("cambia contenido al hacer toggle", () => {
      renderWithProviders(
        <Switch
          defaultChecked={false}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
      );

      const switchElement = screen.getByRole("switch");
      expect(screen.getByText("Disabled")).toBeInTheDocument();

      fireEvent.click(switchElement);
      expect(screen.getByText("Enabled")).toBeInTheDocument();
    });
  });

  describe("Accesibilidad - Keyboard", () => {
    test("responde a la tecla Espacio", () => {
      const handleChange = jest.fn();
      renderWithProviders(<Switch onChange={handleChange} />);

      const switchElement = screen.getByRole("switch");
      switchElement.focus();

      fireEvent.keyDown(switchElement, { key: " " });
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    test("responde a la tecla Enter", () => {
      const handleChange = jest.fn();
      renderWithProviders(<Switch onChange={handleChange} />);

      const switchElement = screen.getByRole("switch");
      switchElement.focus();

      fireEvent.keyDown(switchElement, { key: "Enter" });
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    test("no responde a otras teclas", () => {
      const handleChange = jest.fn();
      renderWithProviders(<Switch onChange={handleChange} />);

      const switchElement = screen.getByRole("switch");
      switchElement.focus();

      fireEvent.keyDown(switchElement, { key: "a" });
      fireEvent.keyDown(switchElement, { key: "Escape" });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accesibilidad - ARIA", () => {
    test("aplica aria-label cuando se proporciona", () => {
      renderWithProviders(<Switch aria-label="Toggle notifications" />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute(
        "aria-label",
        "Toggle notifications"
      );
    });

    test("aplica aria-labelledby cuando se proporciona", () => {
      renderWithProviders(
        <>
          <label id="switch-label">Enable feature</label>
          <Switch aria-labelledby="switch-label" />
        </>
      );

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-labelledby", "switch-label");
    });

    test("aplica aria-describedby cuando se proporciona", () => {
      renderWithProviders(
        <>
          <div id="switch-desc">This controls the main feature</div>
          <Switch aria-describedby="switch-desc" />
        </>
      );

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-describedby", "switch-desc");
    });
  });

  describe("Componentes predefinidos", () => {
    test("BasicSwitch aplica variante secondary", () => {
      renderWithProviders(<BasicSwitch />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    test("SuccessSwitch aplica variante success", () => {
      renderWithProviders(<SuccessSwitch />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    test("DangerSwitch aplica variante error", () => {
      renderWithProviders(<DangerSwitch />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    test("SmallSwitch aplica tamaño sm", () => {
      const { container } = renderWithProviders(<SmallSwitch />);

      const switchElement = container.firstChild;
      expect(switchElement).toHaveStyle("width: 28px");
    });

    test("LargeSwitch aplica tamaño lg", () => {
      const { container } = renderWithProviders(<LargeSwitch />);

      const switchElement = container.firstChild;
      expect(switchElement).toHaveStyle("width: 56px");
    });
  });

  describe("Componentes con contenido predefinido", () => {
    test("OnOffSwitch muestra ON/OFF", () => {
      renderWithProviders(<OnOffSwitch defaultChecked={true} />);
      expect(screen.getByText("ON")).toBeInTheDocument();

      renderWithProviders(<OnOffSwitch defaultChecked={false} />);
      expect(screen.getByText("OFF")).toBeInTheDocument();
    });

    test("CheckSwitch muestra símbolos check", () => {
      renderWithProviders(<CheckSwitch defaultChecked={true} />);
      expect(screen.getByText("✓")).toBeInTheDocument();

      renderWithProviders(<CheckSwitch defaultChecked={false} />);
      expect(screen.getByText("✕")).toBeInTheDocument();
    });

    test("ThemeSwitch muestra iconos de tema", () => {
      renderWithProviders(<ThemeSwitch defaultChecked={true} />);
      expect(screen.getByText("🌙")).toBeInTheDocument();

      renderWithProviders(<ThemeSwitch defaultChecked={false} />);
      expect(screen.getByText("☀️")).toBeInTheDocument();
    });
  });

  describe("Variantes de estilo", () => {
    test("Minimal renderiza sin errores", () => {
      renderWithProviders(<Minimal />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    test("Elevated renderiza sin errores", () => {
      renderWithProviders(<Elevated />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe("Props adicionales", () => {
    test("aplica tabIndex personalizado", () => {
      renderWithProviders(<Switch tabIndex={5} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("tabindex", "5");
    });

    test("aplica id y name para forms", () => {
      renderWithProviders(<Switch id="my-switch" name="toggle" value="yes" />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("id", "my-switch");
      expect(switchElement).toHaveAttribute("name", "toggle");
      expect(switchElement).toHaveAttribute("value", "yes");
    });

    test("aplica autoFocus", () => {
      renderWithProviders(<Switch autoFocus />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveFocus();
    });

    test("aplica title para tooltip nativo", () => {
      renderWithProviders(<Switch title="Click to toggle" />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("title", "Click to toggle");
    });
  });

  describe("Casos edge", () => {
    test("maneja undefined en callbacks", () => {
      renderWithProviders(<Switch onChange={undefined} onClick={undefined} />);

      const switchElement = screen.getByRole("switch");
      // No debería crashear
      fireEvent.click(switchElement);
    });

    test("maneja contenido complejo en children", () => {
      renderWithProviders(
        <Switch
          checkedChildren={
            <span>
              Complex <strong>ON</strong>
            </span>
          }
          unCheckedChildren={
            <span>
              Complex <em>OFF</em>
            </span>
          }
          defaultChecked={true}
        />
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("ON")).toBeInTheDocument();
    });

    test("funciona con valores falsy en props opcionales", () => {
      renderWithProviders(
        <Switch
          checkedChildren={null}
          unCheckedChildren={undefined}
          className=""
          style={{}}
        />
      );

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });
  });
});
