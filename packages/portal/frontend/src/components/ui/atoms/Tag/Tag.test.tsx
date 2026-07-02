import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Tag,
  PrimaryTag,
  SuccessTag,
  WarningTag,
  ErrorTag,
  InfoTag,
  SecondaryTag,
  TinyTag,
  SmallTag,
  LargeTag,
  FilledTag,
  OutlinedTag,
  GhostTag,
  LightTag,
  ClosableTag,
  CheckableTag,
  DisabledTag,
  ElevatedTagLayout,
  BouncyTagLayout,
  GradientTagLayout,
  RoundedTagLayout,
  SquareTagLayout,
  PulsingTagLayout,
  Filter,
  StatusIndicatorTag,
  Category,
  Skill,
  ColorTag,
  CountTag,
  HotTag,
  NewTag,
  BetaTag,
  PremiumTag,
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 50: "#e3f2fd" },
    secondary: { 500: "#6c757d", 50: "#e9ecef" },
    success: { 500: "#28a745", 50: "#d4edda" },
    error: { 500: "#dc3545", 50: "#f8d7da" },
    warning: { 500: "#ffc107", 50: "#fff3cd" },
    info: { 500: "#17a2b8", 50: "#d1ecf1" },
    text: { primary: "#212529", secondary: "#6c757d" },
    background: { card: "#ffffff", secondary: "#f8f9fa" },
    border: { light: "#e9ecef" },
  },
  typography: {
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  borderRadius: { md: "8px", lg: "12px" },
  spacing: { sm: "20px" },
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
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Tag Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza tag con texto", () => {
      renderWithProviders(<Tag>Etiqueta básica</Tag>);

      expect(screen.getByText("Etiqueta básica")).toBeInTheDocument();
      expect(screen.getByRole("text")).toBeInTheDocument();
    });

    test("renderiza tag vacío", () => {
      renderWithProviders(<Tag />);

      const tag = screen.getByRole("text");
      expect(tag).toBeInTheDocument();
    });

    test("aplica className y style", () => {
      renderWithProviders(
        <Tag className="custom-tag" style={{ margin: "10px" }}>
          Test
        </Tag>
      );

      const tag = screen.getByRole("text");
      expect(tag).toHaveClass("custom-tag");
      expect(tag).toHaveStyle("margin: 10px");
    });

    test("renderiza con ReactNode complejo", () => {
      renderWithProviders(
        <Tag>
          <span>Complejo</span> <strong>contenido</strong>
        </Tag>
      );

      expect(screen.getByText("Complejo")).toBeInTheDocument();
      expect(screen.getByText("contenido")).toBeInTheDocument();
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      renderWithProviders(<Tag size="small">Size test</Tag>);

      // "small" → "sm" automáticamente
      const tag = screen.getByRole("text");
      expect(tag).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["xs", "sm", "md", "lg"];

      sizes.forEach((size) => {
        renderWithProviders(<Tag size={size as any}>{size} tag</Tag>);

        const tag = screen.getByText(`${size} tag`);
        expect(tag).toBeInTheDocument();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(<Tag variant="danger">Danger test</Tag>);

      // "danger" → "error", no error de TypeScript
      const tag = screen.getByRole("text");
      expect(tag).toBeInTheDocument();
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
          <Tag variant={variant as any}>{variant} variant</Tag>
        );

        const tag = screen.getByText(`${variant} variant`);
        expect(tag).toBeInTheDocument();
      });
    });
  });

  describe("Estilos visuales", () => {
    test("aplica diferentes tagStyles sin errores", () => {
      const styles = ["filled", "outlined", "ghost", "light"];

      styles.forEach((tagStyle) => {
        renderWithProviders(
          <Tag tagStyle={tagStyle as any}>{tagStyle} style</Tag>
        );

        const tag = screen.getByText(`${tagStyle} style`);
        expect(tag).toBeInTheDocument();
      });
    });

    test("aplica color personalizado", () => {
      renderWithProviders(<Tag color="#ff0000">Custom color</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).toHaveStyle("background-color: #ff0000");
    });

    test("maneja bordered prop", () => {
      renderWithProviders(<Tag bordered={false}>No border</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Funcionalidad closable", () => {
    test("no muestra botón close por defecto", () => {
      renderWithProviders(<Tag>Not closable</Tag>);

      expect(
        screen.queryByLabelText("Cerrar etiqueta")
      ).not.toBeInTheDocument();
    });

    test("muestra botón close cuando closable=true", () => {
      renderWithProviders(<Tag closable>Closable tag</Tag>);

      expect(
        screen.getByLabelText("Cerrar etiqueta", { selector: "button" })
      ).toBeInTheDocument();
    });

    test("ejecuta onClose cuando se hace clic en cerrar", () => {
      const handleClose = jest.fn();

      renderWithProviders(
        <Tag closable onClose={handleClose}>
          Closable with callback
        </Tag>
      );

      const closeButton = screen.getByLabelText("Cerrar etiqueta", {
        selector: "button",
      });
      jest.useFakeTimers();
      fireEvent.click(closeButton);
      act(() => {
        jest.advanceTimersByTime(250);
      });
      jest.useRealTimers();

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test("onClick no se ejecuta cuando se hace clic en cerrar", () => {
      const handleClick = jest.fn();
      const handleClose = jest.fn();

      renderWithProviders(
        <Tag closable onClick={handleClick} onClose={handleClose}>
          Test click
        </Tag>
      );

      const closeButton = screen.getByLabelText("Cerrar etiqueta", {
        selector: "button",
      });
      jest.useFakeTimers();
      fireEvent.click(closeButton);
      act(() => {
        jest.advanceTimersByTime(250);
      });
      jest.useRealTimers();

      expect(handleClose).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Funcionalidad checkable", () => {
    test("no es checkable por defecto", () => {
      renderWithProviders(<Tag>Not checkable</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).not.toHaveAttribute("aria-checked");
    });

    test("es checkable cuando checkable=true", () => {
      renderWithProviders(<Tag checkable>Checkable tag</Tag>);

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "false");
    });

    test("maneja estado checked controlado", () => {
      renderWithProviders(
        <Tag checkable checked={true}>
          Checked tag
        </Tag>
      );

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "true");
    });

    test("maneja estado checked no controlado", () => {
      renderWithProviders(
        <Tag checkable defaultChecked={true}>
          Default checked
        </Tag>
      );

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "true");
    });

    test("ejecuta onCheck cuando se hace clic", () => {
      const handleCheck = jest.fn();

      renderWithProviders(
        <Tag checkable onCheck={handleCheck}>
          Checkable with callback
        </Tag>
      );

      const tag = screen.getByRole("checkbox");
      fireEvent.click(tag);

      expect(handleCheck).toHaveBeenCalledWith(true, expect.any(Object));
    });

    test("toggle checked state en modo no controlado", () => {
      renderWithProviders(<Tag checkable>Toggle test</Tag>);

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "false");

      fireEvent.click(tag);
      expect(tag).toHaveAttribute("aria-checked", "true");

      fireEvent.click(tag);
      expect(tag).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Estados disabled", () => {
    test("no está disabled por defecto", () => {
      renderWithProviders(<Tag>Not disabled</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).not.toHaveAttribute("aria-disabled");
    });

    test("aplica estado disabled", () => {
      renderWithProviders(<Tag disabled>Disabled tag</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).toHaveAttribute("aria-disabled", "true");
    });

    test("no ejecuta onClick cuando disabled", () => {
      const handleClick = jest.fn();

      renderWithProviders(
        <Tag disabled onClick={handleClick}>
          Disabled clickable
        </Tag>
      );

      const tag = screen.getByRole("button", {
        name: "Disabled clickable (deshabilitado)",
      });
      fireEvent.click(tag);

      expect(handleClick).not.toHaveBeenCalled();
    });

    test("no ejecuta onCheck cuando disabled y checkable", () => {
      const handleCheck = jest.fn();

      renderWithProviders(
        <Tag disabled checkable onCheck={handleCheck}>
          Disabled checkable
        </Tag>
      );

      const tag = screen.getByRole("checkbox");
      fireEvent.click(tag);

      expect(handleCheck).not.toHaveBeenCalled();
    });

    test("no ejecuta onClose cuando disabled y closable", () => {
      const handleClose = jest.fn();

      renderWithProviders(
        <Tag disabled closable onClose={handleClose}>
          Disabled closable
        </Tag>
      );

      const closeButton = screen.getByLabelText("Cerrar etiqueta", {
        selector: "button",
      });
      fireEvent.click(closeButton);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("Interactividad", () => {
    test("ejecuta onClick cuando se hace clic", () => {
      const handleClick = jest.fn();

      renderWithProviders(<Tag onClick={handleClick}>Clickable tag</Tag>);

      const tag = screen.getByRole("button");
      fireEvent.click(tag);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("ejecuta onMouseEnter y onMouseLeave", () => {
      const handleEnter = jest.fn();
      const handleLeave = jest.fn();

      renderWithProviders(
        <Tag onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          Hoverable tag
        </Tag>
      );

      const tag = screen.getByRole("text");
      fireEvent.mouseEnter(tag);
      expect(handleEnter).toHaveBeenCalledTimes(1);

      fireEvent.mouseLeave(tag);
      expect(handleLeave).toHaveBeenCalledTimes(1);
    });

    test("es focuseable cuando es interactivo", () => {
      renderWithProviders(<Tag onClick={() => {}}>Interactive tag</Tag>);

      const tag = screen.getByRole("button");
      expect(tag).toHaveAttribute("tabIndex", "0");
    });

    test("no es focuseable cuando no es interactivo", () => {
      renderWithProviders(<Tag>Non-interactive</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).not.toHaveAttribute("tabIndex");
    });
  });

  describe("Props ARIA y roles", () => {
    test("aplica role text por defecto", () => {
      renderWithProviders(<Tag>Default role</Tag>);

      const tag = screen.getByRole("text");
      expect(tag).toHaveAttribute("role", "text");
    });

    test("aplica role button cuando es clickable", () => {
      renderWithProviders(<Tag onClick={() => {}}>Clickable</Tag>);

      const tag = screen.getByRole("button");
      expect(tag).toHaveAttribute("role", "button");
    });

    test("aplica role checkbox cuando es checkable", () => {
      renderWithProviders(<Tag checkable>Checkable</Tag>);

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("role", "checkbox");
    });

    test("permite role personalizado", () => {
      renderWithProviders(<Tag role="tab">Custom role</Tag>);

      const tag = screen.getByRole("tab");
      expect(tag).toHaveAttribute("role", "tab");
    });

    test("genera aria-label automático", () => {
      renderWithProviders(
        <Tag checkable checked={true}>
          Auto aria-label
        </Tag>
      );

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-label");

      const ariaLabel = tag.getAttribute("aria-label");
      expect(ariaLabel).toContain("Auto aria-label");
      expect(ariaLabel).toContain("seleccionado");
    });

    test("permite aria-label personalizado", () => {
      renderWithProviders(
        <Tag aria-label="Custom accessible description">Custom aria</Tag>
      );

      const tag = screen.getByRole("text");
      expect(tag).toHaveAttribute(
        "aria-label",
        "Custom accessible description"
      );
    });
  });

  describe("Componentes predefinidos - Variants", () => {
    test("PrimaryTag aplica variant primary", () => {
      renderWithProviders(<PrimaryTag>Primary</PrimaryTag>);

      const tag = screen.getByText("Primary");
      expect(tag).toBeInTheDocument();
    });

    test("SuccessTag aplica variant success", () => {
      renderWithProviders(<SuccessTag>Success</SuccessTag>);

      const tag = screen.getByText("Success");
      expect(tag).toBeInTheDocument();
    });

    test("WarningTag aplica variant warning", () => {
      renderWithProviders(<WarningTag>Warning</WarningTag>);

      const tag = screen.getByText("Warning");
      expect(tag).toBeInTheDocument();
    });

    test("ErrorTag aplica variant error", () => {
      renderWithProviders(<ErrorTag>Error</ErrorTag>);

      const tag = screen.getByText("Error");
      expect(tag).toBeInTheDocument();
    });

    test("InfoTag aplica variant info", () => {
      renderWithProviders(<InfoTag>Info</InfoTag>);

      const tag = screen.getByText("Info");
      expect(tag).toBeInTheDocument();
    });

    test("SecondaryTag aplica variant secondary", () => {
      renderWithProviders(<SecondaryTag>Secondary</SecondaryTag>);

      const tag = screen.getByText("Secondary");
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Tamaños", () => {
    test("TinyTag aplica tamaño xs", () => {
      renderWithProviders(<TinyTag>Tiny</TinyTag>);

      const tag = screen.getByText("Tiny");
      expect(tag).toBeInTheDocument();
    });

    test("SmallTag aplica tamaño sm", () => {
      renderWithProviders(<SmallTag>Small</SmallTag>);

      const tag = screen.getByText("Small");
      expect(tag).toBeInTheDocument();
    });

    test("LargeTag aplica tamaño lg", () => {
      renderWithProviders(<LargeTag>Large</LargeTag>);

      const tag = screen.getByText("Large");
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Estilos", () => {
    test("FilledTag aplica tagStyle filled", () => {
      renderWithProviders(<FilledTag>Filled</FilledTag>);

      const tag = screen.getByText("Filled");
      expect(tag).toBeInTheDocument();
    });

    test("OutlinedTag aplica tagStyle outlined", () => {
      renderWithProviders(<OutlinedTag>Outlined</OutlinedTag>);

      const tag = screen.getByText("Outlined");
      expect(tag).toBeInTheDocument();
    });

    test("GhostTag aplica tagStyle ghost", () => {
      renderWithProviders(<GhostTag>Ghost</GhostTag>);

      const tag = screen.getByText("Ghost");
      expect(tag).toBeInTheDocument();
    });

    test("LightTag aplica tagStyle light", () => {
      renderWithProviders(<LightTag>Light</LightTag>);

      const tag = screen.getByText("Light");
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Estados", () => {
    test("ClosableTag es cerrable por defecto", () => {
      renderWithProviders(<ClosableTag>Closable</ClosableTag>);

      expect(
        screen.getByLabelText("Cerrar etiqueta", { selector: "button" })
      ).toBeInTheDocument();
    });

    test("CheckableTag es seleccionable por defecto", () => {
      renderWithProviders(<CheckableTag>Checkable</CheckableTag>);

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "false");
    });

    test("DisabledTag está deshabilitado por defecto", () => {
      renderWithProviders(<DisabledTag>Disabled</DisabledTag>);

      const tag = screen.getByRole("text");
      expect(tag).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Componentes predefinidos - Styled Variants", () => {
    test("ElevatedTagLayout renderiza sin errores", () => {
      renderWithProviders(<ElevatedTagLayout>Elevated</ElevatedTagLayout>);

      const tag = screen.getByText("Elevated");
      expect(tag).toBeInTheDocument();
    });

    test("BouncyTagLayout renderiza sin errores", () => {
      renderWithProviders(<BouncyTagLayout>Bouncy</BouncyTagLayout>);

      const tag = screen.getByText("Bouncy");
      expect(tag).toBeInTheDocument();
    });

    test("GradientTagLayout renderiza sin errores", () => {
      renderWithProviders(<GradientTagLayout>Gradient</GradientTagLayout>);

      const tag = screen.getByText("Gradient");
      expect(tag).toBeInTheDocument();
    });

    test("RoundedTagLayout renderiza sin errores", () => {
      renderWithProviders(<RoundedTagLayout>Rounded</RoundedTagLayout>);

      const tag = screen.getByText("Rounded");
      expect(tag).toBeInTheDocument();
    });

    test("SquareTagLayout renderiza sin errores", () => {
      renderWithProviders(<SquareTagLayout>Square</SquareTagLayout>);

      const tag = screen.getByText("Square");
      expect(tag).toBeInTheDocument();
    });

    test("PulsingTagLayout renderiza sin errores", () => {
      renderWithProviders(<PulsingTagLayout>Pulsing</PulsingTagLayout>);

      const tag = screen.getByText("Pulsing");
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Casos de uso específicos", () => {
    test("Filter tag con count", () => {
      renderWithProviders(
        <Filter count={25} active={false}>
          JavaScript
        </Filter>
      );

      expect(screen.getByText("JavaScript (25)")).toBeInTheDocument();
    });

    test("Filter tag ejecuta onFilter", () => {
      const handleFilter = jest.fn();

      renderWithProviders(
        <Filter active={false} onFilter={handleFilter}>
          React
        </Filter>
      );

      const tag = screen.getByRole("checkbox");
      fireEvent.click(tag);

      expect(handleFilter).toHaveBeenCalledWith(true);
    });

    test("StatusIndicatorTag online", () => {
      renderWithProviders(<StatusIndicatorTag status="online" />);

      expect(screen.getByText("En línea")).toBeInTheDocument();
    });

    test("StatusIndicatorTag offline", () => {
      renderWithProviders(<StatusIndicatorTag status="offline" />);

      expect(screen.getByText("Desconectado")).toBeInTheDocument();
    });

    test("StatusIndicatorTag busy", () => {
      renderWithProviders(<StatusIndicatorTag status="busy" />);

      expect(screen.getByText("Ocupado")).toBeInTheDocument();
    });

    test("Category tag con color aleatorio", () => {
      renderWithProviders(
        <Category category="Frontend" colorScheme="random" />
      );

      expect(screen.getByText("Frontend")).toBeInTheDocument();
    });

    test("Category tag ejecuta onCategoryClick", () => {
      const handleCategoryClick = jest.fn();

      renderWithProviders(
        <Category category="Backend" onCategoryClick={handleCategoryClick} />
      );

      const tag = screen.getByRole("button");
      fireEvent.click(tag);

      expect(handleCategoryClick).toHaveBeenCalledWith("Backend");
    });

    test("Skill tag con nivel", () => {
      renderWithProviders(<Skill skill="React" level={4} showLevel={true} />);

      expect(screen.getByText("React")).toBeInTheDocument();
    });

    test("ColorTag muestra color", () => {
      renderWithProviders(<ColorTag colorValue="#ff6b6b">Rojo coral</ColorTag>);

      expect(screen.getByText("Rojo coral")).toBeInTheDocument();
    });

    test("CountTag muestra count", () => {
      renderWithProviders(<CountTag count={15}>Mensajes</CountTag>);

      expect(screen.getByText("Mensajes (15)")).toBeInTheDocument();
    });

    test("CountTag no muestra count cuando es 0", () => {
      renderWithProviders(<CountTag count={0}>Sin mensajes</CountTag>);

      expect(screen.getByText("Sin mensajes")).toBeInTheDocument();
      expect(screen.queryByText("(0)")).not.toBeInTheDocument();
    });

    test("HotTag renderiza con emoji", () => {
      renderWithProviders(<HotTag />);

      expect(screen.getByText("🔥 HOT")).toBeInTheDocument();
    });

    test("NewTag renderiza texto NUEVO", () => {
      renderWithProviders(<NewTag />);

      expect(screen.getByText("NUEVO")).toBeInTheDocument();
    });

    test("BetaTag renderiza texto BETA", () => {
      renderWithProviders(<BetaTag />);

      expect(screen.getByText("BETA")).toBeInTheDocument();
    });

    test("PremiumTag renderiza con estrella", () => {
      renderWithProviders(<PremiumTag />);

      expect(screen.getByText("⭐ PREMIUM")).toBeInTheDocument();
    });
  });

  describe("Casos edge", () => {
    test("maneja contenido muy largo", () => {
      renderWithProviders(
        <Tag>Texto muy largo que debería truncarse apropiadamente</Tag>
      );

      const tag = screen.getByRole("text");
      expect(tag).toBeInTheDocument();
    });

    test("funciona con closable y checkable juntos", () => {
      const handleClose = jest.fn();
      const handleCheck = jest.fn();

      renderWithProviders(
        <Tag closable checkable onClose={handleClose} onCheck={handleCheck}>
          Dual functionality
        </Tag>
      );

      expect(
        screen.getByLabelText("Cerrar etiqueta", { selector: "button" })
      ).toBeInTheDocument();

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "false");
    });

    test("checkable controlado no cambia estado interno", () => {
      renderWithProviders(
        <Tag checkable checked={false}>
          Controlled
        </Tag>
      );

      const tag = screen.getByRole("checkbox");
      expect(tag).toHaveAttribute("aria-checked", "false");

      fireEvent.click(tag);
      expect(tag).toHaveAttribute("aria-checked", "false");
    });

    test("maneja animaciones con reducedMotion", () => {
      const handleClose = jest.fn();

      renderWithProviders(
        <Tag
          closable
          onClose={handleClose}
          accessibility={{ reducedMotion: true }}
        >
          Reduced motion
        </Tag>
      );

      const closeButton = screen.getByLabelText("Cerrar etiqueta", {
        selector: "button",
      });
      fireEvent.click(closeButton);

      // Con reducedMotion, onClose se ejecuta inmediatamente
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
