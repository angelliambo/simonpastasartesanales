import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Select,
  PrimarySelect,
  SuccessSelect,
  WarningSelect,
  ErrorSelect,
  SecondarySelect,
  SmallSelect,
  LargeSelect,
  MultiSelect,
  TagSelect,
  SearchableSelect,
  ClearableSelect,
  VirtualSelect,
  CountrySelect,
  ColorSelect,
  RemoteSelect,
} from "./index";
import { SelectOption } from "./Select.types";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: { 500: "#007bff", 50: "#e3f2fd", 300: "#91d5ff", 600: "#1677ff" },
    secondary: { 500: "#6c757d", 50: "#e9ecef" },
    success: { 500: "#28a745", 50: "#d4edda" },
    error: { 500: "#dc3545", 50: "#f8d7da" },
    warning: { 500: "#ffc107", 50: "#fff3cd" },
    info: { 500: "#17a2b8", 50: "#d1ecf1" },
    text: {
      primary: "#212529",
      secondary: "#6c757d",
    },
    background: {
      card: "#ffffff",
      secondary: "#f8f9fa",
    },
    border: { light: "#d9d9d9" },
  },
  typography: {
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
    fontFamily: "Arial, sans-serif",
  },
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

// Opciones de ejemplo
const sampleOptions: SelectOption[] = [
  { value: "option1", label: "Opción 1" },
  { value: "option2", label: "Opción 2" },
  { value: "option3", label: "Opción 3", disabled: true },
  { value: "option4", label: "Opción 4" },
];

describe("Select Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza select básico", () => {
      renderWithProviders(
        <Select placeholder="Test select" options={sampleOptions} />
      );

      expect(screen.getByText("Test select")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    test("renderiza con valor inicial", () => {
      renderWithProviders(
        <Select value="option1" options={sampleOptions} onChange={() => {}} />
      );

      expect(screen.getByText("Opción 1")).toBeInTheDocument();
    });

    test("renderiza con defaultValue", () => {
      renderWithProviders(
        <Select defaultValue="option2" options={sampleOptions} />
      );

      expect(screen.getByText("Opción 2")).toBeInTheDocument();
    });

    test("aplica className y style", () => {
      renderWithProviders(
        <Select
          className="custom-select"
          style={{ marginTop: "10px" }}
          placeholder="Styled select"
          options={sampleOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select.closest("div")).toHaveClass("custom-select");
      expect(select.closest("div")).toHaveStyle("margin-top: 10px");
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      renderWithProviders(
        <Select size="small" placeholder="Size test" options={sampleOptions} />
      );

      // "small" → "sm" automáticamente
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        renderWithProviders(
          <Select
            size={size as any}
            placeholder={`${size} select`}
            options={sampleOptions}
          />
        );

        const select = screen.getByText(`${size} select`);
        expect(select).toBeInTheDocument();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(
        <Select
          variant="danger"
          placeholder="Danger test"
          options={sampleOptions}
        />
      );

      // "danger" → "error", no error de TypeScript
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("aplica diferentes variantes sin errores", () => {
      const variants = ["primary", "secondary", "success", "warning", "error"];

      variants.forEach((variant) => {
        renderWithProviders(
          <Select
            variant={variant as any}
            placeholder={`${variant} select`}
            options={sampleOptions}
          />
        );

        const select = screen.getByText(`${variant} select`);
        expect(select).toBeInTheDocument();
      });
    });
  });

  describe("Modos de selección", () => {
    test("modo default (single)", () => {
      renderWithProviders(
        <Select
          mode="default"
          placeholder="Single select"
          options={sampleOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("modo multiple", () => {
      renderWithProviders(
        <Select
          mode="multiple"
          placeholder="Multi select"
          options={sampleOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("modo tags", () => {
      renderWithProviders(
        <Select mode="tags" placeholder="Tag select" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Estados de validación", () => {
    test("aplica estado success", () => {
      renderWithProviders(
        <Select
          status="success"
          placeholder="Success select"
          options={sampleOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("aplica estado error", () => {
      renderWithProviders(
        <Select
          status="error"
          placeholder="Error select"
          options={sampleOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("aplica estado loading", () => {
      renderWithProviders(
        <Select loading placeholder="Loading select" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Interacción con dropdown", () => {
    test("abre dropdown al hacer clic", () => {
      renderWithProviders(
        <Select placeholder="Click test" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByText("Opción 1")).toBeInTheDocument();
      expect(screen.getByText("Opción 2")).toBeInTheDocument();
    });

    test("selecciona opción al hacer clic", () => {
      const handleChange = jest.fn();

      renderWithProviders(
        <Select
          placeholder="Selection test"
          options={sampleOptions}
          onChange={handleChange}
        />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      const option = screen.getByText("Opción 1");
      fireEvent.click(option);

      expect(handleChange).toHaveBeenCalledWith("option1", expect.any(Object));
    });

    test("no selecciona opción deshabilitada", () => {
      const handleChange = jest.fn();

      renderWithProviders(
        <Select
          placeholder="Disabled option test"
          options={sampleOptions}
          onChange={handleChange}
        />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      const disabledOption = screen.getByText("Opción 3");
      fireEvent.click(disabledOption);

      expect(handleChange).not.toHaveBeenCalled();
    });

    test("cierra dropdown al seleccionar en modo single", () => {
      renderWithProviders(
        <Select placeholder="Close test" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByText("Opción 1")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Opción 1"));

      // El dropdown debería cerrarse
      expect(screen.queryByText("Opción 2")).not.toBeInTheDocument();
    });
  });

  describe("Navegación con teclado", () => {
    test("abre dropdown con Enter", () => {
      renderWithProviders(
        <Select placeholder="Keyboard test" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      select.focus();

      fireEvent.keyDown(select, { key: "Enter" });

      expect(screen.getByText("Opción 1")).toBeInTheDocument();
    });

    test("navega opciones con arrow keys", () => {
      renderWithProviders(
        <Select placeholder="Arrow navigation" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      select.focus();

      fireEvent.keyDown(select, { key: "Enter" });
      fireEvent.keyDown(select, { key: "ArrowDown" });
      fireEvent.keyDown(select, { key: "Enter" });

      // Debería seleccionar la primera opción (index 0 después del ArrowDown)
      expect(screen.getByText("Opción 1")).toBeInTheDocument();
    });

    test("cierra dropdown con Escape", () => {
      renderWithProviders(
        <Select placeholder="Escape test" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      select.focus();

      fireEvent.keyDown(select, { key: "Enter" });
      expect(screen.getByText("Opción 1")).toBeInTheDocument();

      fireEvent.keyDown(select, { key: "Escape" });
      expect(screen.queryByText("Opción 1")).not.toBeInTheDocument();
    });
  });

  describe("Funcionalidad de búsqueda", () => {
    test("no muestra search por defecto", () => {
      renderWithProviders(
        <Select placeholder="No search" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(
        screen.queryByPlaceholderText("Buscar...")
      ).not.toBeInTheDocument();
    });

    test("muestra search cuando showSearch=true", () => {
      renderWithProviders(
        <Select showSearch placeholder="With search" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    });

    test("filtra opciones al escribir", async () => {
      renderWithProviders(
        <Select showSearch placeholder="Filter test" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      const searchInput = screen.getByPlaceholderText("Buscar...");
      fireEvent.change(searchInput, { target: { value: "Opción 1" } });

      await waitFor(() => {
        expect(screen.getByText("Opción 1")).toBeInTheDocument();
        expect(screen.queryByText("Opción 2")).not.toBeInTheDocument();
      });
    });
  });

  describe("Funcionalidad allowClear", () => {
    test("no muestra botón clear por defecto", () => {
      renderWithProviders(
        <Select value="option1" options={sampleOptions} onChange={() => {}} />
      );

      expect(
        screen.queryByLabelText("Limpiar selección")
      ).not.toBeInTheDocument();
    });

    test("muestra botón clear cuando allowClear=true y tiene valor", () => {
      renderWithProviders(
        <Select
          allowClear
          value="option1"
          options={sampleOptions}
          onChange={() => {}}
        />
      );

      expect(screen.getByLabelText("Limpiar selección")).toBeInTheDocument();
    });

    test("ejecuta onClear y onChange al hacer clic en clear", () => {
      const handleClear = jest.fn();
      const handleChange = jest.fn();

      renderWithProviders(
        <Select
          allowClear
          value="option1"
          options={sampleOptions}
          onClear={handleClear}
          onChange={handleChange}
        />
      );

      const clearButton = screen.getByLabelText("Limpiar selección");
      fireEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(undefined, null);
    });
  });

  describe("Multi-select y Tags", () => {
    test("permite múltiples selecciones en modo multiple", () => {
      const handleChange = jest.fn();

      renderWithProviders(
        <Select
          mode="multiple"
          placeholder="Multi test"
          options={sampleOptions}
          onChange={handleChange}
        />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      fireEvent.click(screen.getByText("Opción 1"));
      expect(handleChange).toHaveBeenCalledWith(["option1"], expect.any(Array));

      fireEvent.click(select);
      fireEvent.click(screen.getByText("Opción 2"));
      expect(handleChange).toHaveBeenCalledWith(
        ["option1", "option2"],
        expect.any(Array)
      );
    });

    test("renderiza tags para valores seleccionados", () => {
      renderWithProviders(
        <Select
          mode="multiple"
          value={["option1", "option2"]}
          options={sampleOptions}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Opción 1")).toBeInTheDocument();
      expect(screen.getByText("Opción 2")).toBeInTheDocument();
    });

    test("permite cerrar tags individuales", () => {
      const handleChange = jest.fn();

      renderWithProviders(
        <Select
          mode="multiple"
          value={["option1", "option2"]}
          options={sampleOptions}
          onChange={handleChange}
        />
      );

      // Buscar el botón de cerrar del primer tag
      const closeBtns = screen.getAllByRole("button");
      fireEvent.click(closeBtns[0]);

      expect(handleChange).toHaveBeenCalledWith(["option2"], expect.any(Array));
    });

    test("maneja maxTagCount", () => {
      renderWithProviders(
        <Select
          mode="multiple"
          value={["option1", "option2", "option4"]}
          maxTagCount={2}
          options={sampleOptions}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Opción 1")).toBeInTheDocument();
      expect(screen.getByText("Opción 2")).toBeInTheDocument();
      expect(screen.getByText("+1")).toBeInTheDocument();
    });
  });

  describe("Estados disabled", () => {
    test("aplica estado disabled", () => {
      renderWithProviders(
        <Select
          disabled
          placeholder="Disabled select"
          options={sampleOptions}
        />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-disabled", "true");
    });

    test("no abre dropdown cuando disabled", () => {
      renderWithProviders(
        <Select disabled placeholder="Disabled click" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.queryByText("Opción 1")).not.toBeInTheDocument();
    });

    test("no muestra clear button cuando disabled", () => {
      renderWithProviders(
        <Select
          disabled
          allowClear
          value="option1"
          options={sampleOptions}
          onChange={() => {}}
        />
      );

      expect(
        screen.queryByLabelText("Limpiar selección")
      ).not.toBeInTheDocument();
    });
  });

  describe("Props ARIA y accesibilidad", () => {
    test("aplica aria-label personalizado", () => {
      renderWithProviders(
        <Select aria-label="Custom select label" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-label", "Custom select label");
    });

    test("aplica role personalizado", () => {
      renderWithProviders(<Select role="listbox" options={sampleOptions} />);

      const select = screen.getByRole("listbox");
      expect(select).toBeInTheDocument();
    });

    test("maneja aria-expanded correctamente", () => {
      renderWithProviders(
        <Select placeholder="ARIA test" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(select);
      expect(select).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Componentes predefinidos - Variants", () => {
    test("PrimarySelect aplica variant primary", () => {
      renderWithProviders(
        <PrimarySelect placeholder="Primary" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("SuccessSelect aplica variant success", () => {
      renderWithProviders(
        <SuccessSelect placeholder="Success" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("WarningSelect aplica variant warning", () => {
      renderWithProviders(
        <WarningSelect placeholder="Warning" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("ErrorSelect aplica variant error", () => {
      renderWithProviders(
        <ErrorSelect placeholder="Error" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("SecondarySelect aplica variant secondary", () => {
      renderWithProviders(
        <SecondarySelect placeholder="Secondary" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Tamaños", () => {
    test("SmallSelect aplica tamaño sm", () => {
      renderWithProviders(
        <SmallSelect placeholder="Small" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("LargeSelect aplica tamaño lg", () => {
      renderWithProviders(
        <LargeSelect placeholder="Large" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Modos", () => {
    test("MultiSelect aplica modo multiple", () => {
      renderWithProviders(
        <MultiSelect placeholder="Multi" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    test("TagSelect aplica modo tags", () => {
      renderWithProviders(
        <TagSelect placeholder="Tags" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Funcionalidades", () => {
    test("SearchableSelect tiene showSearch habilitado", () => {
      renderWithProviders(
        <SearchableSelect placeholder="Searchable" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    });

    test("ClearableSelect tiene allowClear habilitado", () => {
      renderWithProviders(
        <ClearableSelect
          value="option1"
          options={sampleOptions}
          onChange={() => {}}
        />
      );

      expect(screen.getByLabelText("Limpiar selección")).toBeInTheDocument();
    });

    test("VirtualSelect tiene virtual habilitado", () => {
      renderWithProviders(
        <VirtualSelect placeholder="Virtual" options={sampleOptions} />
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Casos de uso específicos", () => {
    test("CountrySelect renderiza opciones de países", () => {
      renderWithProviders(<CountrySelect />);

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByText("🇦🇷 Argentina")).toBeInTheDocument();
      expect(screen.getByText("🇧🇷 Brasil")).toBeInTheDocument();
    });

    test("ColorSelect renderiza opciones de colores", () => {
      renderWithProviders(<ColorSelect />);

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByText("🔴 Rojo")).toBeInTheDocument();
      expect(screen.getByText("🔵 Azul")).toBeInTheDocument();
    });

    test("RemoteSelect maneja carga remota", async () => {
      const mockFetchOptions = jest.fn().mockResolvedValue([
        { value: "remote1", label: "Remote Option 1" },
        { value: "remote2", label: "Remote Option 2" },
      ]);

      renderWithProviders(
        <RemoteSelect fetchOptions={mockFetchOptions} minimumInputLength={1} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      const searchInput = screen.getByPlaceholderText("Buscar...");
      fireEvent.change(searchInput, { target: { value: "test" } });

      await waitFor(() => {
        expect(mockFetchOptions).toHaveBeenCalledWith("test");
      });
    });
  });

  describe("Casos edge", () => {
    test("maneja opciones vacías", () => {
      renderWithProviders(<Select placeholder="Empty options" options={[]} />);

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByText("No hay opciones")).toBeInTheDocument();
    });

    test("maneja valor que no existe en opciones", () => {
      renderWithProviders(
        <Select
          value="nonexistent"
          options={sampleOptions}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("nonexistent")).toBeInTheDocument();
    });

    test("maneja optionGroups", () => {
      const groupOptions = [
        {
          label: "Grupo 1",
          options: [
            { value: "g1o1", label: "Grupo 1 Opción 1" },
            { value: "g1o2", label: "Grupo 1 Opción 2" },
          ],
        },
      ];

      renderWithProviders(
        <Select placeholder="Groups test" optionGroups={groupOptions} />
      );

      const select = screen.getByRole("combobox");
      fireEvent.click(select);

      expect(screen.getByText("Grupo 1")).toBeInTheDocument();
      expect(screen.getByText("Grupo 1 Opción 1")).toBeInTheDocument();
    });

    test("funciona con controlled open", () => {
      const { rerender } = renderWithProviders(
        <Select
          open={false}
          placeholder="Controlled open"
          options={sampleOptions}
        />
      );

      expect(screen.queryByText("Opción 1")).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={mockTheme}>
          <Select
            open={true}
            placeholder="Controlled open"
            options={sampleOptions}
          />
        </ThemeProvider>
      );

      expect(screen.getByText("Opción 1")).toBeInTheDocument();
    });
  });
});
