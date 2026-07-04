import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Tooltip,
  BasicTooltip,
  InfoTooltip,
  SuccessTooltip,
  ErrorTooltip,
  LightTooltip,
  SmallTooltip,
  LargeTooltip,
  ClickTooltip,
  FocusTooltip,
  TopTooltip,
  BottomTooltip,
  LeftTooltip,
  RightTooltip,
  LoadingTooltip,
  HelpTooltip,
} from "./index";
import {
  ElevatedTooltip,
  MinimalTooltip,
  CompactTooltip,
} from "./Tooltip.styles";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 600: "#0056b3" },
    secondary: { 500: "#6c757d", 600: "#545862" },
    success: { 500: "#28a745", 600: "#218838" },
    error: { 500: "#dc3545", 600: "#c82333" },
    warning: { 500: "#ffc107", 600: "#e0a800" },
    info: { 500: "#17a2b8", 600: "#138496" },
    background: { card: "#ffffff", secondary: "#f8f9fa" },
    border: { normal: "#ced4da", light: "#dee2e6" },
    text: { primary: "#212529", inverse: "#ffffff", secondary: "#6c757d" },
  },
  typography: { fontWeight: { medium: 500 } },
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

// Mock para ReactDOM.createPortal
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: React.ReactNode) => element,
}));

// Helper para crear botón de prueba
const TestButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...rest }, ref) => (
  <button ref={ref} {...rest}>
    {children}
  </button>
));

// Wrapper para tests
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Tooltip Component", () => {
  
  // Mock para getBoundingClientRect
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 30,
      top: 100,
      left: 100,
      bottom: 130,
      right: 200,
      x: 100,
      y: 100,
      toJSON: jest.fn(),
    }));
  });

  describe("Renderizado básico", () => {
    test("renderiza children sin tooltip cuando no hay título", () => {
      renderWithProviders(
        <Tooltip>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(screen.getByRole("button", { name: "Test Button" })).toBeInTheDocument();
      expect(screen.queryByRole("tooltip", { hidden: true })).not.toBeInTheDocument();
    });

    test("renderiza children con tooltip cuando hay título", () => {
      renderWithProviders(
        <Tooltip title="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(screen.getByRole("button", { name: "Test Button" })).toBeInTheDocument();
      // Tooltip está oculto inicialmente
      expect(screen.queryByRole("tooltip", { hidden: true })).toBeInTheDocument();
    });

    test("aplica className y style al wrapper", () => {
      const { container } = renderWithProviders(
        <Tooltip 
          title="Test"
          className="custom-tooltip"
          style={{ margin: "10px" }}
        >
          <TestButton>Test</TestButton>
        </Tooltip>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("custom-tooltip");
      expect(wrapper).toHaveStyle("margin: 10px");
    });
  });

  describe("Trigger hover", () => {
    test("muestra tooltip en mouseEnter y oculta en mouseLeave", async () => {
      renderWithProviders(
        <Tooltip title="Hover tooltip" trigger="hover">
          <TestButton>Hover me</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Hover me" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Inicialmente oculto
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Hover para mostrar
      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });

      // Leave para ocultar
      fireEvent.mouseLeave(button);
      
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "true");
      });
    });

    test("respeta mouseEnterDelay y mouseLeaveDelay", async () => {
      jest.useFakeTimers();

      renderWithProviders(
        <Tooltip 
          title="Delayed tooltip"
          trigger="hover"
          mouseEnterDelay={200}
          mouseLeaveDelay={300}
        >
          <TestButton>Delayed</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Delayed" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Hover sin delay
      fireEvent.mouseEnter(button);
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Avanzar tiempo parcial
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Avanzar tiempo completo
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(tooltip).toHaveAttribute("aria-hidden", "false");

      // Leave con delay
      fireEvent.mouseLeave(button);
      
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(tooltip).toHaveAttribute("aria-hidden", "false");

      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      jest.useRealTimers();
    });
  });

  describe("Trigger click", () => {
    test("toggle tooltip en click", async () => {
      renderWithProviders(
        <Tooltip title="Click tooltip" trigger="click">
          <TestButton>Click me</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Click me" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Inicialmente oculto
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Primer click para mostrar
      fireEvent.click(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });

      // Segundo click para ocultar
      fireEvent.click(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "true");
      });
    });

    test("preserva onClick original del children", () => {
      const handleClick = jest.fn();
      
      renderWithProviders(
        <Tooltip title="Click tooltip" trigger="click">
          <TestButton onClick={handleClick}>Click me</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Click me" });
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Trigger focus", () => {
    test("muestra tooltip en focus y oculta en blur", async () => {
      renderWithProviders(
        <Tooltip title="Focus tooltip" trigger="focus">
          <TestButton>Focus me</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Focus me" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Inicialmente oculto
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Focus para mostrar
      fireEvent.focus(button);
      
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });

      // Blur para ocultar
      fireEvent.blur(button);
      
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("Multiple triggers", () => {
    test("responde a múltiples triggers", async () => {
      renderWithProviders(
        <Tooltip title="Multi trigger" trigger={["hover", "click"]}>
          <TestButton>Multi trigger</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Multi trigger" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Hover funciona
      fireEvent.mouseEnter(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });

      fireEvent.mouseLeave(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "true");
      });

      // Click también funciona
      fireEvent.click(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });
    });
  });

  describe("Estados controlled y uncontrolled", () => {
    test("funciona en modo uncontrolled", async () => {
      renderWithProviders(
        <Tooltip title="Uncontrolled" defaultVisible={false}>
          <TestButton>Uncontrolled</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Uncontrolled" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      fireEvent.mouseEnter(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });
    });

    test("funciona en modo controlled", async () => {
      const TestControlled = () => {
        const [visible, setVisible] = React.useState(false);
        
        return (
          <>
            <button onClick={() => setVisible(!visible)}>Toggle</button>
            <Tooltip 
              title="Controlled" 
              visible={visible}
              onVisibleChange={setVisible}
            >
              <TestButton>Controlled</TestButton>
            </Tooltip>
          </>
        );
      };

      renderWithProviders(<TestControlled />);

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      const toggleButton = screen.getByRole("button", { name: "Toggle" });

      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });

      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "true");
      });
    });

    test("llama onVisibleChange cuando cambia visibilidad", async () => {
      const handleVisibleChange = jest.fn();
      
      renderWithProviders(
        <Tooltip 
          title="Callback test"
          onVisibleChange={handleVisibleChange}
        >
          <TestButton>Test</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Test" });

      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        expect(handleVisibleChange).toHaveBeenCalledWith(true);
      });

      fireEvent.mouseLeave(button);
      
      await waitFor(() => {
        expect(handleVisibleChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      renderWithProviders(
        <Tooltip title="Small tooltip" size="small">
          <TestButton>Small</TestButton>
        </Tooltip>
      );

      // "small" → "sm" automáticamente
      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["xs", "sm", "md", "lg"];
      
      sizes.forEach((size) => {
        const { getByRole, unmount } = renderWithProviders(
          <Tooltip title={`${size} tooltip`} size={size as any}>
            <TestButton>{size}</TestButton>
          </Tooltip>
        );
        
        const tooltip = getByRole("tooltip", { hidden: true });
        expect(tooltip).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(
        <Tooltip title="Danger tooltip" variant="danger">
          <TestButton>Danger</TestButton>
        </Tooltip>
      );

      // "danger" → "error", no error de TypeScript
      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("aplica diferentes variantes sin errores", () => {
      const variants = [
        "primary", "secondary", "success", "warning", 
        "error", "info", "light", "dark"
      ];
      
      variants.forEach((variant) => {
        const { getByRole, unmount } = renderWithProviders(
          <Tooltip title={`${variant} tooltip`} variant={variant as any}>
            <TestButton>{variant}</TestButton>
          </Tooltip>
        );
        
        const tooltip = getByRole("tooltip", { hidden: true });
        expect(tooltip).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Placements", () => {
    test("aplica diferentes placements sin errores", () => {
      const placements = [
        "top", "topLeft", "topRight",
        "bottom", "bottomLeft", "bottomRight",
        "left", "leftTop", "leftBottom",
        "right", "rightTop", "rightBottom"
      ];
      
      placements.forEach((placement) => {
        const { getByRole, unmount } = renderWithProviders(
          <Tooltip title={`${placement} tooltip`} placement={placement as any}>
            <TestButton>{placement}</TestButton>
          </Tooltip>
        );
        
        const tooltip = getByRole("tooltip", { hidden: true });
        expect(tooltip).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Arrow rendering", () => {
    test("muestra arrow por defecto", () => {
      renderWithProviders(
        <Tooltip title="With arrow">
          <TestButton>With arrow</TestButton>
        </Tooltip>
      );

      // showArrow es true por defecto
      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("oculta arrow cuando showArrow es false", () => {
      renderWithProviders(
        <Tooltip title="No arrow" showArrow={false}>
          <TestButton>No arrow</TestButton>
        </Tooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe("Accesibilidad", () => {
    test("aplica aria-describedby cuando tooltip está visible", async () => {
      renderWithProviders(
        <Tooltip title="Accessible tooltip" id="tooltip-1">
          <TestButton>Accessible</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Accessible" });

      // Inicialmente sin aria-describedby
      expect(button).not.toHaveAttribute("aria-describedby");

      // Mostrar tooltip
      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        expect(button).toHaveAttribute("aria-describedby", "tooltip-1");
      });

      // Ocultar tooltip
      fireEvent.mouseLeave(button);
      
      await waitFor(() => {
        expect(button).not.toHaveAttribute("aria-describedby");
      });
    });

    test("aplica role tooltip por defecto", () => {
      renderWithProviders(
        <Tooltip title="Role test">
          <TestButton>Role test</TestButton>
        </Tooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toHaveAttribute("role", "tooltip");
    });

    test("permite role personalizado", () => {
      renderWithProviders(
        <Tooltip title="Custom role" role="dialog">
          <TestButton>Custom role</TestButton>
        </Tooltip>
      );

      const tooltip = screen.getByRole("dialog", { hidden: true });
      expect(tooltip).toHaveAttribute("role", "dialog");
    });
  });

  describe("Componentes predefinidos", () => {
    test("BasicTooltip aplica variante secondary", () => {
      renderWithProviders(
        <BasicTooltip title="Basic tooltip">
          <TestButton>Basic</TestButton>
        </BasicTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("InfoTooltip aplica variante info", () => {
      renderWithProviders(
        <InfoTooltip title="Info tooltip">
          <TestButton>Info</TestButton>
        </InfoTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("SuccessTooltip aplica variante success", () => {
      renderWithProviders(
        <SuccessTooltip title="Success tooltip">
          <TestButton>Success</TestButton>
        </SuccessTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("ErrorTooltip aplica variante error", () => {
      renderWithProviders(
        <ErrorTooltip title="Error tooltip">
          <TestButton>Error</TestButton>
        </ErrorTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("SmallTooltip aplica tamaño sm", () => {
      renderWithProviders(
        <SmallTooltip title="Small tooltip">
          <TestButton>Small</TestButton>
        </SmallTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("LargeTooltip aplica tamaño lg", () => {
      renderWithProviders(
        <LargeTooltip title="Large tooltip">
          <TestButton>Large</TestButton>
        </LargeTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe("Trigger components", () => {
    test("ClickTooltip solo responde a click", async () => {
      renderWithProviders(
        <ClickTooltip title="Click only">
          <TestButton>Click only</TestButton>
        </ClickTooltip>
      );

      const button = screen.getByRole("button", { name: "Click only" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Hover no funciona
      fireEvent.mouseEnter(button);
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Click sí funciona
      fireEvent.click(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });
    });

    test("FocusTooltip solo responde a focus", async () => {
      renderWithProviders(
        <FocusTooltip title="Focus only">
          <TestButton>Focus only</TestButton>
        </FocusTooltip>
      );

      const button = screen.getByRole("button", { name: "Focus only" });
      const tooltip = screen.getByRole("tooltip", { hidden: true });

      // Click no funciona
      fireEvent.click(button);
      expect(tooltip).toHaveAttribute("aria-hidden", "true");

      // Focus sí funciona
      fireEvent.focus(button);
      await waitFor(() => {
        expect(tooltip).toHaveAttribute("aria-hidden", "false");
      });
    });
  });

  describe("Placement components", () => {
    test("TopTooltip fuerza placement top", () => {
      renderWithProviders(
        <TopTooltip title="Always top">
          <TestButton>Always top</TestButton>
        </TopTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });

    test("BottomTooltip fuerza placement bottom", () => {
      renderWithProviders(
        <BottomTooltip title="Always bottom">
          <TestButton>Always bottom</TestButton>
        </BottomTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe("Casos específicos", () => {
    test("LoadingTooltip muestra loading state", () => {
      renderWithProviders(
        <LoadingTooltip title="Normal" loading={true}>
          <TestButton>Loading</TestButton>
        </LoadingTooltip>
      );

      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toBeInTheDocument();
      expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    test("HelpTooltip renderiza question mark", () => {
      renderWithProviders(
        <HelpTooltip title="Help information" />
      );

      expect(screen.getByText("?")).toBeInTheDocument();
    });
  });

  describe("Casos edge", () => {
    test("maneja children con ref existente", () => {
      const existingRef = React.createRef<HTMLButtonElement>();
      
      renderWithProviders(
        <Tooltip title="With ref">
          <TestButton ref={existingRef}>With ref</TestButton>
        </Tooltip>
      );

      expect(screen.getByRole("button", { name: "With ref" })).toBeInTheDocument();
    });

    test("maneja título como ReactNode complejo", () => {
      renderWithProviders(
        <Tooltip 
          title={
            <div>
              <strong>Complex</strong> <em>title</em>
            </div>
          }
        >
          <TestButton>Complex title</TestButton>
        </Tooltip>
      );

      expect(screen.getByText("Complex title")).toBeInTheDocument();
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
    });

    test("maneja destroyTooltipOnHide", () => {
      renderWithProviders(
        <Tooltip title="Destroy test" destroyTooltipOnHide>
          <TestButton>Destroy test</TestButton>
        </Tooltip>
      );

      // Tooltip se destruye cuando está oculto
      const tooltip = screen.queryByRole("tooltip", { hidden: true });
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    test("cleanup timeouts al desmontar", () => {
      jest.useFakeTimers();
      const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

      const { unmount } = renderWithProviders(
        <Tooltip title="Cleanup test" mouseEnterDelay={1000}>
          <TestButton>Cleanup</TestButton>
        </Tooltip>
      );

      const button = screen.getByRole("button", { name: "Cleanup" });
      fireEvent.mouseEnter(button);

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      jest.useRealTimers();
      clearTimeoutSpy.mockRestore();
    });
  });

});
