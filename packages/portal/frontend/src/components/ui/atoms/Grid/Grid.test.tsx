import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { 
  Row, 
  Col, 
  GridContainer, 
  FluidRow, 
  HalfCol, 
  ThirdCol, 
  ResponsiveCol 
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 },
} as any;

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

describe("Grid System", () => {
  
  describe("Row Component", () => {
    test("renderiza correctamente con props por defecto", () => {
      renderWithProviders(
        <Row>
          <Col span={12}>Column 1</Col>
          <Col span={12}>Column 2</Col>
        </Row>
      );

      expect(screen.getByText("Column 1")).toBeInTheDocument();
      expect(screen.getByText("Column 2")).toBeInTheDocument();
    });

    test("aplica role row por defecto", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col>Content</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveAttribute("role", "row");
    });

    test("aplica estilos flexbox por defecto", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col>Content</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveStyle("display: flex");
      expect(rowElement).toHaveStyle("flex-flow: row wrap");
    });

    test("aplica align top por defecto", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col>Content</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveStyle("align-items: flex-start");
    });

    test("aplica justify start por defecto", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col>Content</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveStyle("justify-content: flex-start");
    });
  });

  describe("Sistema de Gutter con Shared Systems", () => {
    test("aplica gutter usando shared system - single value", () => {
      const { container } = renderWithProviders(
        <Row gutter="md">
          <Col span={12}>Column</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      // gutter "md" → 16px → margin negativo de 8px a cada lado
      expect(rowElement).toHaveStyle("margin-left: -8px");
      expect(rowElement).toHaveStyle("margin-right: -8px");
    });

    test("aplica gutter horizontal y vertical separados", () => {
      const { container } = renderWithProviders(
        <Row gutter={["lg", "sm"]}>
          <Col span={12}>Column</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      // gutter ["lg", "sm"] → [24px, 8px] → margin negativo 12px, row-gap 8px
      expect(rowElement).toHaveStyle("margin-left: -12px");
      expect(rowElement).toHaveStyle("margin-right: -12px");
      expect(rowElement).toHaveStyle("row-gap: 8px");
    });

    test("no aplica margin si gutter es 0", () => {
      const { container } = renderWithProviders(
        <Row gutter={[0, 0]}>
          <Col span={12}>Column</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).not.toHaveStyle("margin-left: -0px");
    });
  });

  describe("Col Component - Sistema 24 Columnas", () => {
    test("aplica span correctamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={12}>Half width</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      // span 12 = 50% width (12/24 * 100%)
      expect(colElement).toHaveStyle("width: 50%");
      expect(colElement).toHaveStyle("max-width: 50%");
    });

    test("aplica offset correctamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={12} offset={6}>Offset column</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      // offset 6 = 25% margin-left (6/24 * 100%)
      expect(colElement).toHaveStyle("margin-left: 25%");
    });

    test("aplica order correctamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={12} order={2}>Second</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveStyle("order: 2");
    });

    test("aplica pull correctamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={12} pull={6}>Pulled column</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      // pull 6 = 25% right position (6/24 * 100%)
      expect(colElement).toHaveStyle("right: 25%");
    });

    test("aplica push correctamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={12} push={6}>Pushed column</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      // push 6 = 25% left position (6/24 * 100%)
      expect(colElement).toHaveStyle("left: 25%");
    });
  });

  describe("Responsive Breakpoints", () => {
    test("aplica breakpoint xs (número)", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={24} xs={12}>Responsive column</Col>
        </Row>
      );

      // xs breakpoint no genera media query (es el base)
      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveStyle("width: 50%"); // xs={12} = 50%
    });

    test("aplica breakpoint xs (objeto complejo)", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col 
            span={24} 
            xs={{ span: 12, offset: 6, order: 1 }}
          >
            Complex responsive
          </Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveStyle("width: 50%");     // xs.span = 12
      expect(colElement).toHaveStyle("margin-left: 25%"); // xs.offset = 6
      expect(colElement).toHaveStyle("order: 1");        // xs.order = 1
    });
  });

  describe("Alineación Row", () => {
    test("aplica diferentes valores de align", () => {
      const alignValues = [
        { align: "top", expected: "flex-start" },
        { align: "middle", expected: "center" },
        { align: "bottom", expected: "flex-end" },
        { align: "stretch", expected: "stretch" },
      ];

      alignValues.forEach(({ align, expected }) => {
        const { container } = renderWithProviders(
          <Row align={align as any}>
            <Col>Content</Col>
          </Row>
        );

        const rowElement = container.firstChild;
        expect(rowElement).toHaveStyle(`align-items: ${expected}`);
      });
    });

    test("aplica diferentes valores de justify", () => {
      const justifyValues = [
        { justify: "start", expected: "flex-start" },
        { justify: "center", expected: "center" },
        { justify: "end", expected: "flex-end" },
        { justify: "space-between", expected: "space-between" },
        { justify: "space-around", expected: "space-around" },
        { justify: "space-evenly", expected: "space-evenly" },
      ];

      justifyValues.forEach(({ justify, expected }) => {
        const { container } = renderWithProviders(
          <Row justify={justify as any}>
            <Col>Content</Col>
          </Row>
        );

        const rowElement = container.firstChild;
        expect(rowElement).toHaveStyle(`justify-content: ${expected}`);
      });
    });
  });

  describe("Componentes Predefinidos", () => {
    test("GridContainer renderiza como container con max-width", () => {
      const { container } = renderWithProviders(
        <GridContainer>
          <Col span={12}>Container content</Col>
        </GridContainer>
      );

      expect(screen.getByText("Container content")).toBeInTheDocument();
      const containerElement = container.firstChild;
      expect(containerElement).toHaveStyle("max-width: 1200px");
      expect(containerElement).toHaveStyle("margin: 0 auto");
    });

    test("FluidRow renderiza sin max-width", () => {
      const { container } = renderWithProviders(
        <FluidRow>
          <Col span={12}>Fluid content</Col>
        </FluidRow>
      );

      expect(screen.getByText("Fluid content")).toBeInTheDocument();
      const fluidElement = container.firstChild;
      expect(fluidElement).toHaveStyle("width: 100%");
    });

    test("HalfCol aplica span 12 automáticamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <HalfCol>Half width</HalfCol>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveStyle("width: 50%"); // span 12 = 50%
    });

    test("ThirdCol aplica span 8 automáticamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <ThirdCol>Third width</ThirdCol>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveStyle("width: 33.333333%"); // span 8 ≈ 33.33%
    });

    test("ResponsiveCol aplica breakpoints automáticamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <ResponsiveCol>Responsive content</ResponsiveCol>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      // xs={24} es el base, debería ser 100% width
      expect(colElement).toHaveStyle("width: 100%");
    });
  });

  describe("Wrapping", () => {
    test("aplica wrap por defecto", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={12}>Item</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveStyle("flex-wrap: wrap");
    });

    test("desactiva wrap cuando se especifica", () => {
      const { container } = renderWithProviders(
        <Row wrap={false}>
          <Col span={12}>Item</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveStyle("flex-wrap: nowrap");
    });
  });

  describe("Casos Edge", () => {
    test("maneja children vacíos correctamente", () => {
      renderWithProviders(
        <Row>
          {null}
          {undefined}
          {false}
        </Row>
      );

      // No debería crashear
    });

    test("maneja span 24 (full width) correctamente", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col span={24}>Full width</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveStyle("width: 100%");
    });

    test("maneja múltiples columnas que suman 24", () => {
      renderWithProviders(
        <Row>
          <Col span={6}>Quarter 1</Col>
          <Col span={6}>Quarter 2</Col>
          <Col span={6}>Quarter 3</Col>
          <Col span={6}>Quarter 4</Col>
        </Row>
      );

      expect(screen.getByText("Quarter 1")).toBeInTheDocument();
      expect(screen.getByText("Quarter 2")).toBeInTheDocument();
      expect(screen.getByText("Quarter 3")).toBeInTheDocument();
      expect(screen.getByText("Quarter 4")).toBeInTheDocument();
    });
  });

  describe("Accesibilidad", () => {
    test("aplica aria-label cuando se proporciona a Row", () => {
      const { container } = renderWithProviders(
        <Row aria-label="Main grid container">
          <Col>Content</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveAttribute("aria-label", "Main grid container");
    });

    test("aplica aria-label cuando se proporciona a Col", () => {
      const { container } = renderWithProviders(
        <Row>
          <Col aria-label="Main column">Content</Col>
        </Row>
      );

      const colElement = container.querySelector('[role]:not([role="row"])') || 
                         container.firstChild?.firstChild;
      expect(colElement).toHaveAttribute("aria-label", "Main column");
    });

    test("aplica role personalizado", () => {
      const { container } = renderWithProviders(
        <Row role="grid">
          <Col role="gridcell">Content</Col>
        </Row>
      );

      const rowElement = container.firstChild;
      expect(rowElement).toHaveAttribute("role", "grid");
    });
  });

});
