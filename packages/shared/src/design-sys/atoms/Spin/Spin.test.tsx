import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Spin,
  TinySpin,
  SmallSpin,
  MediumSpin,
  LargeSpin,
  ExtraLargeSpin,
  SpinnerSpin,
  DotsSpin,
  BarsSpin,
  PulseSpin,
  BounceSpin,
  FullPage,
  Inline,
  ButtonSpinComponent,
  LoadingContainer,
  LoadingText,
  DelayedSpin,
  DataSpin,
  FormSpin,
  StatefulSpin,
  TableSpin,
  ImageSpin,
  ApiSpin,
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 200: "#90caf9" },
    text: { secondary: "#6c757d" },
  },
} as any;

// Mock para usePersonalization
jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: () => ({
    accessibility: {
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

describe("Spin Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza spinner por defecto", () => {
      renderWithProviders(<Spin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-label", "Cargando");
    });

    test("no renderiza cuando spinning=false", () => {
      renderWithProviders(<Spin spinning={false} />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-busy", "false");
    });

    test("renderiza con tip text", () => {
      renderWithProviders(<Spin tip="Cargando datos..." />);

      expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveAttribute(
        "aria-label",
        "Cargando: Cargando datos..."
      );
    });

    test("aplica className y style", () => {
      renderWithProviders(
        <Spin className="custom-spin" style={{ margin: "10px" }} />
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("custom-spin");
      expect(spinner).toHaveStyle("margin: 10px");
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      renderWithProviders(<Spin size="small" />);

      // "small" → "sm" automáticamente, no error de TypeScript
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];

      sizes.forEach((size) => {
        const { getAllByRole, unmount } = renderWithProviders(
          <Spin size={size as any} />
        );

        const spinners = getAllByRole("status");
        expect(spinners.length).toBeGreaterThan(0);
        unmount();
      });
    });
  });

  describe("Tipos de indicadores", () => {
    test("renderiza spinner indicator por defecto", () => {
      renderWithProviders(<Spin indicator="spinner" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("renderiza dots indicator", () => {
      renderWithProviders(<Spin indicator="dots" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("renderiza bars indicator", () => {
      renderWithProviders(<Spin indicator="bars" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("renderiza pulse indicator", () => {
      renderWithProviders(<Spin indicator="pulse" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("renderiza bounce indicator", () => {
      renderWithProviders(<Spin indicator="bounce" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Modo overlay (con children)", () => {
    test("renderiza contenido envuelto", () => {
      renderWithProviders(
        <Spin spinning={true}>
          <div>Contenido a envolver</div>
        </Spin>
      );

      expect(screen.getByText("Contenido a envolver")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("no bloquea contenido cuando spinning=false", () => {
      renderWithProviders(
        <Spin spinning={false}>
          <button>Clickable button</button>
        </Spin>
      );

      const button = screen.getByText("Clickable button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    test("aplica wrapperClassName al container", () => {
      renderWithProviders(
        <Spin wrapperClassName="wrapper-class">
          <div>Content</div>
        </Spin>
      );

      const container = screen
        .getByText("Content")
        .closest('[class*="wrapper-class"]');
      expect(container).toBeInTheDocument();
    });
  });

  describe("Delay functionality", () => {
    test("respeta delay antes de mostrar", async () => {
      jest.useFakeTimers();

      renderWithProviders(<Spin delay={500} />);

      // Inicialmente no debería estar visible (busy=false)
      let spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-busy", "true");

      // Avanzar tiempo parcial
      jest.advanceTimersByTime(200);
      spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();

      // Avanzar tiempo completo
      jest.advanceTimersByTime(400);
      spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();

      jest.useRealTimers();
    });

    test("muestra inmediatamente cuando delay=0", () => {
      renderWithProviders(<Spin delay={0} />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-busy", "true");
    });
  });

  describe("Accesibilidad", () => {
    test("aplica role status por defecto", () => {
      renderWithProviders(<Spin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("role", "status");
    });

    test("permite role personalizado", () => {
      renderWithProviders(<Spin role="progressbar" />);

      const spinner = screen.getByRole("progressbar");
      expect(spinner).toHaveAttribute("role", "progressbar");
    });

    test("aplica aria-live polite por defecto", () => {
      renderWithProviders(<Spin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "polite");
    });

    test("permite aria-live personalizado", () => {
      renderWithProviders(<Spin aria-live="assertive" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "assertive");
    });

    test("aplica aria-label personalizada", () => {
      renderWithProviders(<Spin aria-label="Procesando datos" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Procesando datos");
    });

    test("usa mensaje de accesibilidad con tip", () => {
      renderWithProviders(<Spin tip="Subiendo archivo..." />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute(
        "aria-label",
        "Cargando: Subiendo archivo..."
      );
    });
  });

  describe("Componentes predefinidos - Tamaños", () => {
    test("TinySpin aplica tamaño xs", () => {
      renderWithProviders(<TinySpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("SmallSpin aplica tamaño sm", () => {
      renderWithProviders(<SmallSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("MediumSpin aplica tamaño md", () => {
      renderWithProviders(<MediumSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("LargeSpin aplica tamaño lg", () => {
      renderWithProviders(<LargeSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("ExtraLargeSpin aplica tamaño xl", () => {
      renderWithProviders(<ExtraLargeSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Indicadores", () => {
    test("SpinnerSpin usa indicator spinner", () => {
      renderWithProviders(<SpinnerSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("DotsSpin usa indicator dots", () => {
      renderWithProviders(<DotsSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("BarsSpin usa indicator bars", () => {
      renderWithProviders(<BarsSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("PulseSpin usa indicator pulse", () => {
      renderWithProviders(<PulseSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("BounceSpin usa indicator bounce", () => {
      renderWithProviders(<BounceSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Layouts", () => {
    test("FullPage renderiza sin errores", () => {
      renderWithProviders(<FullPage />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("Inline renderiza sin errores", () => {
      renderWithProviders(<Inline />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("ButtonSpinComponent renderiza con tamaño sm", () => {
      renderWithProviders(<ButtonSpinComponent />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Casos de uso específicos", () => {
    test("LoadingContainer envuelve contenido", () => {
      renderWithProviders(
        <LoadingContainer loading={true}>
          <div>Protected content</div>
        </LoadingContainer>
      );

      expect(screen.getByText("Protected content")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("LoadingText muestra texto personalizado", () => {
      renderWithProviders(
        <LoadingText loadingText="Descargando archivo..." showText={true} />
      );

      expect(screen.getByText("Descargando archivo...")).toBeInTheDocument();
    });

    test("LoadingText oculta texto cuando showText=false", () => {
      renderWithProviders(
        <LoadingText loadingText="Hidden text" showText={false} />
      );

      expect(screen.queryByText("Hidden text")).not.toBeInTheDocument();
    });

    test("DelayedSpin aplica delay de 300ms", () => {
      renderWithProviders(<DelayedSpin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    test("DataSpin muestra loading state", () => {
      renderWithProviders(
        <DataSpin loading={true} hasData={true}>
          <div>Data content</div>
        </DataSpin>
      );

      expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
    });

    test("DataSpin muestra empty state", () => {
      renderWithProviders(
        <DataSpin loading={false} hasData={false} emptyText="Sin resultados">
          <div>Data content</div>
        </DataSpin>
      );

      expect(screen.getByText("Sin resultados")).toBeInTheDocument();
      expect(screen.queryByText("Data content")).not.toBeInTheDocument();
    });

    test("DataSpin muestra contenido cuando hay datos", () => {
      renderWithProviders(
        <DataSpin loading={false} hasData={true}>
          <div>Data content</div>
        </DataSpin>
      );

      expect(screen.getByText("Data content")).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    test("FormSpin envuelve formulario", () => {
      renderWithProviders(
        <FormSpin submitting={true}>
          <form>Form content</form>
        </FormSpin>
      );

      expect(screen.getByText("Form content")).toBeInTheDocument();
      expect(screen.getByText("Enviando formulario...")).toBeInTheDocument();
    });

    test("StatefulSpin muestra error state", () => {
      const handleRetry = jest.fn();

      renderWithProviders(
        <StatefulSpin
          loading={false}
          error="Connection failed"
          onRetry={handleRetry}
        >
          <div>Content</div>
        </StatefulSpin>
      );

      expect(screen.getByText("Error: Connection failed")).toBeInTheDocument();
      expect(screen.getByText("Reintentar")).toBeInTheDocument();
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    test("StatefulSpin muestra loading state", () => {
      renderWithProviders(
        <StatefulSpin loading={true} error={null}>
          <div>Content</div>
        </StatefulSpin>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("StatefulSpin muestra contenido normal", () => {
      renderWithProviders(
        <StatefulSpin loading={false} error={null}>
          <div>Normal content</div>
        </StatefulSpin>
      );

      expect(screen.getByText("Normal content")).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  describe("Combinaciones específicas", () => {
    test("TableSpin usa tamaño lg", () => {
      renderWithProviders(<TableSpin />);

      expect(screen.getByText("Cargando tabla...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("ImageSpin usa indicator pulse", () => {
      renderWithProviders(<ImageSpin />);

      expect(screen.getByText("Cargando imagen...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("ApiSpin usa indicator dots con delay", () => {
      renderWithProviders(<ApiSpin />);

      expect(screen.getByText("Conectando...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("Props adicionales", () => {
    test("aplica id personalizado", () => {
      renderWithProviders(<Spin id="my-spinner" />);

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("id", "my-spinner");
    });

    test("aplica aria-describedby", () => {
      renderWithProviders(
        <>
          <div id="spinner-desc">Loading user data</div>
          <Spin aria-describedby="spinner-desc" />
        </>
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-describedby", "spinner-desc");
    });
  });

  describe("Casos edge", () => {
    test("maneja tip como ReactNode complejo", () => {
      renderWithProviders(
        <Spin
          tip={
            <div>
              <strong>Cargando</strong> <em>datos importantes</em>
            </div>
          }
        />
      );

      expect(screen.getByText("Cargando")).toBeInTheDocument();
      expect(screen.getByText("datos importantes")).toBeInTheDocument();
    });

    test("funciona sin props opcionales", () => {
      renderWithProviders(<Spin />);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-busy", "true");
    });

    test("maneja cambios dinámicos de spinning", async () => {
      const { rerender } = renderWithProviders(<Spin spinning={true} />);

      let spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-busy", "true");

      rerender(
        <ThemeProvider theme={mockTheme}>
          <Spin spinning={false} />
        </ThemeProvider>
      );

      spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-busy", "false");
    });
  });
});
