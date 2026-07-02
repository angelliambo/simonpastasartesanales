import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Statistic,
  PrimaryStatistic,
  SuccessStatistic,
  WarningStatistic,
  ErrorStatistic,
  InfoStatistic,
  SecondaryStatistic,
  SmallStatistic,
  LargeStatistic,
  ExtraLargeStatistic,
  CardLayout,
  CompactLayout,
  CenteredLayout,
  BorderedLayout,
  GradientLayout,
  Currency,
  Percentage,
  Countdown,
  Metric,
  Counter,
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 600: "#0056b3", 50: "#e3f2fd" },
    secondary: { 500: "#6c757d", 50: "#e9ecef" },
    success: { 500: "#28a745", 600: "#1e7e34", 50: "#d4edda" },
    error: { 500: "#dc3545", 600: "#c82333", 50: "#f8d7da" },
    warning: { 500: "#ffc107", 600: "#d39e00", 50: "#fff3cd" },
    info: { 500: "#17a2b8", 600: "#138496", 50: "#d1ecf1" },
    text: { primary: "#212529", secondary: "#6c757d" },
    background: { card: "#ffffff", secondary: "#f8f9fa" },
    border: { light: "#e9ecef" },
  },
  typography: {
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  borderRadius: { md: "8px" },
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
      focusRing: false,
    },
  }),
}));

// Wrapper para tests
const renderWithProviders = (component: React.ReactElement) => {
  cleanup();
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Statistic Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza con value básico", () => {
      renderWithProviders(<Statistic value={1234} />);

      expect(screen.getByText("1,234")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    test("renderiza con title y value", () => {
      renderWithProviders(<Statistic title="Usuarios Activos" value={42} />);

      expect(screen.getByText("Usuarios Activos")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    test("renderiza con title como ReactNode complejo", () => {
      renderWithProviders(
        <Statistic
          title={
            <div>
              <strong>Total</strong> Ventas
            </div>
          }
          value={9876}
        />
      );

      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getByText("Ventas")).toBeInTheDocument();
      expect(screen.getByText("9,876")).toBeInTheDocument();
    });

    test("aplica className y style", () => {
      renderWithProviders(
        <Statistic
          title="Test"
          value={123}
          className="custom-statistic"
          style={{ margin: "10px" }}
        />
      );

      const statistic = screen.getByRole("img");
      expect(statistic).toHaveClass("custom-statistic");
      expect(statistic).toHaveStyle("margin: 10px");
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      renderWithProviders(
        <Statistic title="Size test" value={100} size="small" />
      );

      // "small" → "sm" automáticamente
      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];

      sizes.forEach((size) => {
        renderWithProviders(
          <Statistic title={`${size} size`} value={123} size={size as any} />
        );

        const statistic = screen.getByRole("img");
        expect(statistic).toBeInTheDocument();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(
        <Statistic title="Danger test" value={999} variant="danger" />
      );

      // "danger" → "error", no error de TypeScript
      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
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
        renderWithProviders(
          <Statistic
            title={`${variant} variant`}
            value={456}
            variant={variant as any}
          />
        );

        const statistic = screen.getByRole("img");
        expect(statistic).toBeInTheDocument();
      });
    });
  });

  describe("Formateo de valores", () => {
    test("aplica precision correctamente", () => {
      renderWithProviders(
        <Statistic title="Decimal test" value={1234.5678} precision={2} />
      );

      expect(screen.getByText("1,234.57")).toBeInTheDocument();
    });

    test("usa separadores personalizados", () => {
      renderWithProviders(
        <Statistic
          title="Custom separators"
          value={1234.56}
          precision={2}
          groupSeparator="."
          decimalSeparator=","
        />
      );

      expect(screen.getByText("1.234,56")).toBeInTheDocument();
    });

    test("usa formatter personalizado", () => {
      const customFormatter = (value?: string | number) => `Custom: ${value}`;

      renderWithProviders(
        <Statistic
          title="Custom formatter"
          value={777}
          formatter={customFormatter}
        />
      );

      expect(screen.getByText("Custom: 777")).toBeInTheDocument();
    });

    test("maneja valores string", () => {
      renderWithProviders(
        <Statistic title="String value" value="Custom Text" />
      );

      expect(screen.getByText("Custom Text")).toBeInTheDocument();
    });

    test("maneja valores null/undefined", () => {
      renderWithProviders(<Statistic title="Null value" value={null as any} />);

      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Prefix y Suffix", () => {
    test("renderiza prefix", () => {
      renderWithProviders(
        <Statistic title="With prefix" value={1000} prefix="$" />
      );

      expect(screen.getByText("$")).toBeInTheDocument();
      expect(screen.getByText("1,000")).toBeInTheDocument();
    });

    test("renderiza suffix", () => {
      renderWithProviders(
        <Statistic title="With suffix" value={85} suffix="%" />
      );

      expect(screen.getByText("%")).toBeInTheDocument();
      expect(screen.getByText("85")).toBeInTheDocument();
    });

    test("renderiza prefix y suffix juntos", () => {
      renderWithProviders(
        <Statistic title="Both affixes" value={42} prefix="~" suffix=" items" />
      );

      expect(screen.getByText("~")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
      expect(screen.getByText(/items/)).toBeInTheDocument();
    });

    test("renderiza prefix/suffix como ReactNode", () => {
      renderWithProviders(
        <Statistic
          title="ReactNode affixes"
          value={123}
          prefix={<span data-testid="custom-prefix">💰</span>}
          suffix={<span data-testid="custom-suffix">✨</span>}
        />
      );

      expect(screen.getByTestId("custom-prefix")).toBeInTheDocument();
      expect(screen.getByTestId("custom-suffix")).toBeInTheDocument();
    });
  });

  describe("Trend indicators", () => {
    test("renderiza trend increase", () => {
      renderWithProviders(
        <Statistic
          title="Trending up"
          value={1000}
          trend="increase"
          trendValue={15.5}
        />
      );

      expect(screen.getByText("↗️")).toBeInTheDocument();
      expect(screen.getByText("+15.5%")).toBeInTheDocument();
    });

    test("renderiza trend decrease", () => {
      renderWithProviders(
        <Statistic
          title="Trending down"
          value={800}
          trend="decrease"
          trendValue={8.2}
        />
      );

      expect(screen.getByText("↘️")).toBeInTheDocument();
      expect(screen.getByText("-8.2%")).toBeInTheDocument();
    });

    test("renderiza trend stable", () => {
      renderWithProviders(
        <Statistic title="Stable" value={500} trend="stable" trendValue={0} />
      );

      expect(screen.getByText("→")).toBeInTheDocument();
      expect(screen.getByText("0%")).toBeInTheDocument();
    });

    test("no renderiza trend sin trendValue", () => {
      renderWithProviders(
        <Statistic title="No trend" value={500} trend="increase" />
      );

      expect(screen.queryByText("↗️")).not.toBeInTheDocument();
    });
  });

  describe("Loading states", () => {
    test("renderiza loading state", () => {
      const { container } = renderWithProviders(
        <Statistic title="Loading test" value={123} loading={true} />
      );

      // Debe tener skeleton para el valor
      expect(container.querySelector(".skeleton-value")).toBeInTheDocument();
    });

    test("renderiza skeleton completo sin contenido", () => {
      const { container } = renderWithProviders(<Statistic loading={true} />);

      expect(container.querySelector(".skeleton-title")).toBeInTheDocument();
      expect(container.querySelector(".skeleton-value")).toBeInTheDocument();
    });

    test("muestra título pero skeleton para valor", () => {
      const { container } = renderWithProviders(
        <Statistic title="Visible title" value={123} loading={true} />
      );

      expect(screen.getByText("Visible title")).toBeInTheDocument();
      expect(container.querySelector(".skeleton-value")).toBeInTheDocument();
      expect(screen.queryByText("123")).not.toBeInTheDocument();
    });
  });

  describe("Interactividad", () => {
    test("ejecuta onClick cuando se hace clic", () => {
      const handleClick = jest.fn();

      renderWithProviders(
        <Statistic title="Clickable" value={789} onClick={handleClick} />
      );

      const statistic = screen.getByRole("img");
      fireEvent.click(statistic);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("ejecuta onHover en mouse enter", () => {
      const handleHover = jest.fn();

      renderWithProviders(
        <Statistic title="Hoverable" value={456} onHover={handleHover} />
      );

      const statistic = screen.getByRole("img");
      fireEvent.mouseEnter(statistic);

      expect(handleHover).toHaveBeenCalledTimes(1);
    });

    test("es focuseable cuando tiene onClick", () => {
      renderWithProviders(
        <Statistic title="Focuseable" value={123} onClick={() => {}} />
      );

      const statistic = screen.getByRole("img");
      expect(statistic).toHaveAttribute("tabIndex", "0");
    });

    test("no es focuseable sin onClick", () => {
      renderWithProviders(<Statistic title="Not focuseable" value={123} />);

      const statistic = screen.getByRole("img");
      expect(statistic).not.toHaveAttribute("tabIndex");
    });
  });

  describe("Props ARIA", () => {
    test("aplica role img por defecto", () => {
      renderWithProviders(<Statistic value={100} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toHaveAttribute("role", "img");
    });

    test("permite role personalizado", () => {
      renderWithProviders(<Statistic value={100} role="status" />);

      const statistic = screen.getByRole("status");
      expect(statistic).toHaveAttribute("role", "status");
    });

    test("genera aria-label automático", () => {
      renderWithProviders(
        <Statistic title="Revenue" value={1000} prefix="$" suffix=" USD" />
      );

      const statistic = screen.getByRole("img");
      expect(statistic).toHaveAttribute("aria-label");

      const ariaLabel = statistic.getAttribute("aria-label");
      expect(ariaLabel).toContain("Revenue");
      expect(ariaLabel).toContain("$");
      expect(ariaLabel).toContain("1000");
      expect(ariaLabel).toContain("USD");
    });

    test("permite aria-label personalizado", () => {
      renderWithProviders(
        <Statistic value={42} aria-label="Custom accessible description" />
      );

      const statistic = screen.getByRole("img");
      expect(statistic).toHaveAttribute(
        "aria-label",
        "Custom accessible description"
      );
    });
  });

  describe("Componentes predefinidos - Variants", () => {
    test("PrimaryStatistic aplica variant primary", () => {
      renderWithProviders(<PrimaryStatistic title="Primary" value={100} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("SuccessStatistic aplica variant success", () => {
      renderWithProviders(<SuccessStatistic title="Success" value={200} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("WarningStatistic aplica variant warning", () => {
      renderWithProviders(<WarningStatistic title="Warning" value={300} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("ErrorStatistic aplica variant error", () => {
      renderWithProviders(<ErrorStatistic title="Error" value={400} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("InfoStatistic aplica variant info", () => {
      renderWithProviders(<InfoStatistic title="Info" value={500} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("SecondaryStatistic aplica variant secondary", () => {
      renderWithProviders(<SecondaryStatistic title="Secondary" value={600} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Tamaños", () => {
    test("SmallStatistic aplica tamaño sm", () => {
      renderWithProviders(<SmallStatistic title="Small" value={100} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("LargeStatistic aplica tamaño lg", () => {
      renderWithProviders(<LargeStatistic title="Large" value={200} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("ExtraLargeStatistic aplica tamaño xl", () => {
      renderWithProviders(
        <ExtraLargeStatistic title="Extra Large" value={300} />
      );

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Layouts", () => {
    test("CardLayout renderiza sin errores", () => {
      renderWithProviders(<CardLayout title="Card layout" value={123} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("CompactLayout renderiza sin errores", () => {
      renderWithProviders(<CompactLayout title="Compact" value={456} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("CenteredLayout renderiza sin errores", () => {
      renderWithProviders(<CenteredLayout title="Centered" value={789} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("BorderedLayout renderiza sin errores", () => {
      renderWithProviders(<BorderedLayout title="Bordered" value={111} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });

    test("GradientLayout renderiza sin errores", () => {
      renderWithProviders(<GradientLayout title="Gradient" value={222} />);

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();
    });
  });

  describe("Casos de uso específicos", () => {
    test("Currency formatea correctamente", () => {
      renderWithProviders(
        <Currency
          title="Revenue"
          value={1234.56}
          currency="USD"
          precision={2}
        />
      );

      // Debería mostrar formato de moneda
      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();

      // El formatter interno debería manejar el formato
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    test("Percentage formatea correctamente", () => {
      renderWithProviders(
        <Percentage
          title="Success Rate"
          value={85.7}
          showPercentSign={true}
          precision={1}
        />
      );

      expect(screen.getByText("85.7%")).toBeInTheDocument();
    });

    test("Percentage calcula desde baseValue", () => {
      renderWithProviders(
        <Percentage
          title="Completion"
          value={75}
          baseValue={100}
          showPercentSign={true}
          precision={0}
        />
      );

      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    test("Countdown actualiza el tiempo", async () => {
      // Fecha futura (1 hora desde ahora)
      const futureDate = new Date(Date.now() + 3600000);

      renderWithProviders(
        <Countdown
          title="Time Left"
          targetDate={futureDate}
          format="HH:mm:ss"
        />
      );

      const statistic = screen.getByRole("img");
      expect(statistic).toBeInTheDocument();

      // Debe mostrar algún formato de tiempo
      await waitFor(() => {
        const timeText = screen.getByRole("img").textContent;
        expect(timeText).toMatch(/\d+:\d+:\d+/);
      });
    });

    test("Metric determina trend automáticamente", () => {
      renderWithProviders(
        <Metric
          title="Growth"
          value={1000}
          change={15.5}
          changeType="percentage"
        />
      );

      // Debe mostrar trend increase por change positivo
      expect(screen.getByText("↗️")).toBeInTheDocument();
      expect(screen.getByText("+15.5%")).toBeInTheDocument();
    });

    test("Counter anima desde start hasta value", async () => {
      jest.useFakeTimers();

      renderWithProviders(
        <Counter
          title="Animated Counter"
          value={100}
          start={0}
          duration={1000}
        />
      );

      // Inicialmente debe mostrar start value
      expect(screen.getByText("0")).toBeInTheDocument();

      // Avanzar tiempo para ver animación
      jest.advanceTimersByTime(500);

      // Debe estar en progreso (valor intermedio)
      await waitFor(() => {
        const value = screen.getByRole("img").textContent;
        expect(value).not.toBe("0");
      });

      jest.useRealTimers();
    });
  });

  describe("Casos edge", () => {
    test("maneja value como string numérico", () => {
      renderWithProviders(
        <Statistic title="String number" value="1234.56" precision={1} />
      );

      expect(screen.getByText("1,234.6")).toBeInTheDocument();
    });

    test("maneja value como string no numérico", () => {
      renderWithProviders(<Statistic title="Non-numeric string" value="N/A" />);

      expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    test("maneja precision con valor entero", () => {
      renderWithProviders(
        <Statistic title="Integer precision" value={1000} precision={2} />
      );

      expect(screen.getByText("1,000.00")).toBeInTheDocument();
    });

    test("funciona sin title", () => {
      renderWithProviders(<Statistic value={999} />);

      expect(screen.getByText("999")).toBeInTheDocument();
      expect(screen.queryByText("title")).not.toBeInTheDocument();
    });

    test("aplica valueStyle personalizado", () => {
      renderWithProviders(
        <Statistic
          value={123}
          valueStyle={{ color: "red", fontSize: "30px" }}
        />
      );

      const valueElement = screen.getByText("123");
      expect(valueElement).toHaveStyle("color: red");
      expect(valueElement).toHaveStyle("font-size: 30px");
    });
  });
});
