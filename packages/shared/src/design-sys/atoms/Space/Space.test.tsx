import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Space, HorizontalSpace, VerticalSpace, Compact, Grid } from "./index";
import { DefaultTheme } from "../../../../styles/theme";

// Mock theme simplificado para tests
const mockTheme = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 },
} as any; // Usar any para simplificar tests

// Mock hooks para evitar dependencias externas en tests
jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: () => ({
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      increasedSpacing: false,
      spacingMultiplier: 1,
    },
  }),
}));

// Wrapper para tests
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Space Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza correctamente con props por defecto", () => {
      renderWithProviders(
        <Space>
          <div>Item 1</div>
          <div>Item 2</div>
        </Space>
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    test("renderiza con dirección horizontal (por defecto)", () => {
      const { container } = renderWithProviders(
        <Space>
          <div>Item 1</div>
          <div>Item 2</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-direction: row");
    });

    test("renderiza con dirección vertical", () => {
      const { container } = renderWithProviders(
        <Space direction="vertical">
          <div>Item 1</div>
          <div>Item 2</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-direction: column");
    });

    test("aplica gap correcto con size medium por defecto", () => {
      const { container } = renderWithProviders(
        <Space>
          <div>Item 1</div>
          <div>Item 2</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      // size="md" → 16px gap por defecto
      expect(spaceElement).toHaveStyle("gap: 16px");
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea size legacy correctamente", () => {
      const { container } = renderWithProviders(
        <Space size="small">
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      // "small" → "sm" → 8px
      expect(spaceElement).toHaveStyle("gap: 8px");
    });

    test("aplica diferentes tamaños correctamente", () => {
      const sizes = [
        { size: "xs", expected: "4px" },
        { size: "sm", expected: "8px" },
        { size: "md", expected: "16px" },
        { size: "lg", expected: "24px" },
        { size: "xl", expected: "32px" },
        { size: "xxl", expected: "48px" },
      ];

      sizes.forEach(({ size, expected }) => {
        const { container } = renderWithProviders(
          <Space size={size as any}>
            <div>Item</div>
          </Space>
        );

        const spaceElement = container.firstChild;
        expect(spaceElement).toHaveStyle(`gap: ${expected}`);
      });
    });
  });

  describe("Propiedades de alineación", () => {
    test("aplica align center por defecto", () => {
      const { container } = renderWithProviders(
        <Space>
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("align-items: center");
    });

    test("aplica justify start por defecto", () => {
      const { container } = renderWithProviders(
        <Space>
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("justify-content: flex-start");
    });

    test("aplica diferentes valores de justify", () => {
      const justifyValues = [
        { justify: "center", expected: "center" },
        { justify: "space-between", expected: "space-between" },
        { justify: "space-around", expected: "space-around" },
        { justify: "space-evenly", expected: "space-evenly" },
      ];

      justifyValues.forEach(({ justify, expected }) => {
        const { container } = renderWithProviders(
          <Space justify={justify as any}>
            <div>Item</div>
          </Space>
        );

        const spaceElement = container.firstChild;
        expect(spaceElement).toHaveStyle(`justify-content: ${expected}`);
      });
    });
  });

  describe("Split divisor", () => {
    test("renderiza split entre elementos", () => {
      renderWithProviders(
        <Space split={<span data-testid="divider">|</span>}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Space>
      );

      // Debe haber 2 divisores para 3 elementos
      const dividers = screen.getAllByTestId("divider");
      expect(dividers).toHaveLength(2);
    });

    test("no renderiza split para un solo elemento", () => {
      renderWithProviders(
        <Space split={<span data-testid="divider">|</span>}>
          <div>Single Item</div>
        </Space>
      );

      expect(screen.queryByTestId("divider")).not.toBeInTheDocument();
    });
  });

  describe("Wrapping", () => {
    test("no wrap por defecto", () => {
      const { container } = renderWithProviders(
        <Space>
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-wrap: nowrap");
    });

    test("aplica wrap cuando se especifica", () => {
      const { container } = renderWithProviders(
        <Space wrap>
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-wrap: wrap");
    });
  });

  describe("Componentes predefinidos", () => {
    test("HorizontalSpace aplica dirección horizontal", () => {
      const { container } = renderWithProviders(
        <HorizontalSpace>
          <div>Item</div>
        </HorizontalSpace>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-direction: row");
    });

    test("VerticalSpace aplica dirección vertical", () => {
      const { container } = renderWithProviders(
        <VerticalSpace>
          <div>Item</div>
        </VerticalSpace>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-direction: column");
    });

    test("Compact usa gap pequeño", () => {
      const { container } = renderWithProviders(
        <Compact>
          <div>Item</div>
        </Compact>
      );

      const spaceElement = container.firstChild;
      // xs = 4px
      expect(spaceElement).toHaveStyle("gap: 4px");
    });

    test("Grid aplica wrap y dirección horizontal", () => {
      const { container } = renderWithProviders(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveStyle("flex-direction: row");
      expect(spaceElement).toHaveStyle("flex-wrap: wrap");
    });
  });

  describe("Casos edge", () => {
    test("no renderiza nada con children vacíos", () => {
      const { container } = renderWithProviders(
        <Space>
          {null}
          {undefined}
          {false}
        </Space>
      );

      expect(container.firstChild).toBeNull();
    });

    test("filtra children falsy correctamente", () => {
      renderWithProviders(
        <Space>
          <div>Item 1</div>
          {null}
          <div>Item 2</div>
          {undefined}
          {false && <div>Not rendered</div>}
        </Space>
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.queryByText("Not rendered")).not.toBeInTheDocument();
    });
  });

  describe("Accesibilidad", () => {
    test("aplica aria-label cuando se proporciona", () => {
      const { container } = renderWithProviders(
        <Space aria-label="Navigation items">
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveAttribute("aria-label", "Navigation items");
    });

    test("aplica role cuando se proporciona", () => {
      const { container } = renderWithProviders(
        <Space role="toolbar">
          <div>Item</div>
        </Space>
      );

      const spaceElement = container.firstChild;
      expect(spaceElement).toHaveAttribute("role", "toolbar");
    });
  });
});
