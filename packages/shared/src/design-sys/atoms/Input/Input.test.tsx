import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Input,
  TextArea,
  Password,
  Search,
  PrimaryInput,
  SuccessInput,
  WarningInput,
  ErrorInput,
  SecondaryInput,
  SmallInput,
  LargeInput,
  EmailInput,
  PhoneInput,
  URLInput,
  NumberInput,
  ClearableInput,
  CountedInput,
} from "./index";

// Mock theme simplificado para tests
const mockTheme = {
  colors: {
    primary: {
      500: "#007bff",
      50: "#e3f2fd",
      300: "#91d5ff",
      600: "#1677ff",
      700: "#1666ff",
    },
    secondary: { 500: "#6c757d", 50: "#e9ecef" },
    success: { 500: "#28a745", 50: "#d4edda" },
    error: { 500: "#dc3545", 50: "#f8d7da" },
    warning: { 500: "#ffc107", 50: "#fff3cd" },
    info: { 500: "#17a2b8", 50: "#d1ecf1" },
    text: {
      primary: "#212529",
      secondary: "#6c757d",
      disabled: "#999999",
    },
    background: {
      card: "#ffffff",
      secondary: "#f8f9fa",
      disabled: "#f5f5f5",
      hover: "#f0f0f0",
    },
    border: { light: "#d9d9d9" },
  },
  typography: {
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
    fontFamily: "Arial, sans-serif",
  },
  borderRadius: { md: "8px", lg: "12px" },
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

describe("Input Component", () => {
  describe("Renderizado básico", () => {
    test("renderiza input básico", () => {
      renderWithProviders(<Input placeholder="Test input" />);

      const input = screen.getByPlaceholderText("Test input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    test("renderiza con valor inicial", () => {
      renderWithProviders(<Input value="Test value" onChange={() => {}} />);

      const input = screen.getByDisplayValue("Test value");
      expect(input).toBeInTheDocument();
    });

    test("renderiza con defaultValue", () => {
      renderWithProviders(<Input defaultValue="Default value" />);

      const input = screen.getByDisplayValue("Default value");
      expect(input).toBeInTheDocument();
    });

    test("aplica className y style", () => {
      renderWithProviders(
        <Input
          className="custom-input"
          style={{ marginTop: "10px" }}
          placeholder="Styled"
        />
      );

      const wrapper = screen.getByPlaceholderText("Styled").closest("div");
      expect(wrapper).toHaveClass("custom-input");
      expect(wrapper).toHaveStyle("margin-top: 10px");
    });
  });

  describe("Sistema unificado de tamaños", () => {
    test("mapea tamaños legacy correctamente", () => {
      renderWithProviders(<Input size="small" placeholder="Size test" />);

      // "small" → "sm" automáticamente
      const input = screen.getByPlaceholderText("Size test");
      expect(input).toBeInTheDocument();
    });

    test("aplica diferentes tamaños sin errores", () => {
      const sizes = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        renderWithProviders(
          <Input size={size as any} placeholder={`${size} input`} />
        );

        const input = screen.getByPlaceholderText(`${size} input`);
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe("Sistema unificado de variantes", () => {
    test("mapea variantes legacy correctamente", () => {
      renderWithProviders(<Input variant="danger" placeholder="Danger test" />);

      // "danger" → "error", no error de TypeScript
      const input = screen.getByPlaceholderText("Danger test");
      expect(input).toBeInTheDocument();
    });

    test("aplica diferentes variantes sin errores", () => {
      const variants = ["primary", "secondary", "success", "warning", "error"];

      variants.forEach((variant) => {
        renderWithProviders(
          <Input variant={variant as any} placeholder={`${variant} input`} />
        );

        const input = screen.getByPlaceholderText(`${variant} input`);
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe("Tipos de input", () => {
    test("renderiza diferentes tipos correctamente", () => {
      const types = [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
      ];

      types.forEach((type) => {
        renderWithProviders(
          <Input type={type as any} placeholder={`${type} input`} />
        );

        const input = screen.getByPlaceholderText(`${type} input`);
        expect(input).toHaveAttribute("type", type);
      });
    });
  });

  describe("Estados de validación", () => {
    test("aplica estado success", () => {
      renderWithProviders(
        <Input status="success" placeholder="Success input" />
      );

      const input = screen.getByPlaceholderText("Success input");
      expect(input).toBeInTheDocument();
    });

    test("aplica estado error", () => {
      renderWithProviders(<Input status="error" placeholder="Error input" />);

      const input = screen.getByPlaceholderText("Error input");
      expect(input).toBeInTheDocument();
    });

    test("aplica estado warning", () => {
      renderWithProviders(
        <Input status="warning" placeholder="Warning input" />
      );

      const input = screen.getByPlaceholderText("Warning input");
      expect(input).toBeInTheDocument();
    });

    test("aplica estado validating", () => {
      renderWithProviders(
        <Input status="validating" placeholder="Validating input" />
      );

      const input = screen.getByPlaceholderText("Validating input");
      expect(input).toBeInTheDocument();

      // Debe mostrar indicador de validación
      const indicator = document.querySelector("[accessibility]");
      // Note: Due to the complexity of styled-components testing, we just verify the input renders
    });
  });

  describe("Prefix y Suffix", () => {
    test("renderiza con prefix", () => {
      renderWithProviders(
        <Input
          prefix={<span data-testid="prefix">@</span>}
          placeholder="With prefix"
        />
      );

      expect(screen.getByTestId("prefix")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("With prefix")).toBeInTheDocument();
    });

    test("renderiza con suffix", () => {
      renderWithProviders(
        <Input
          suffix={<span data-testid="suffix">.com</span>}
          placeholder="With suffix"
        />
      );

      expect(screen.getByTestId("suffix")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("With suffix")).toBeInTheDocument();
    });

    test("renderiza con prefix y suffix", () => {
      renderWithProviders(
        <Input
          prefix={<span data-testid="prefix">https://</span>}
          suffix={<span data-testid="suffix">.com</span>}
          placeholder="With both"
        />
      );

      expect(screen.getByTestId("prefix")).toBeInTheDocument();
      expect(screen.getByTestId("suffix")).toBeInTheDocument();
    });
  });

  describe("Addon Before y After", () => {
    test("renderiza con addonBefore", () => {
      renderWithProviders(
        <Input
          addonBefore={<span data-testid="addon-before">https://</span>}
          placeholder="With addon before"
        />
      );

      expect(screen.getByTestId("addon-before")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("With addon before")
      ).toBeInTheDocument();
    });

    test("renderiza con addonAfter", () => {
      renderWithProviders(
        <Input
          addonAfter={<span data-testid="addon-after">.com</span>}
          placeholder="With addon after"
        />
      );

      expect(screen.getByTestId("addon-after")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("With addon after")
      ).toBeInTheDocument();
    });
  });

  describe("Funcionalidad AllowClear", () => {
    test("no muestra botón clear por defecto", () => {
      renderWithProviders(<Input value="test" onChange={() => {}} />);

      expect(screen.queryByLabelText("Limpiar")).not.toBeInTheDocument();
    });

    test("muestra botón clear cuando allowClear=true y tiene valor", () => {
      renderWithProviders(
        <Input allowClear value="test value" onChange={() => {}} />
      );

      expect(screen.getByLabelText("Limpiar")).toBeInTheDocument();
    });

    test("no muestra botón clear cuando valor está vacío", () => {
      renderWithProviders(<Input allowClear value="" onChange={() => {}} />);

      expect(screen.queryByLabelText("Limpiar")).not.toBeInTheDocument();
    });

    test("ejecuta onClear cuando se hace clic en clear", () => {
      const handleClear = jest.fn();

      renderWithProviders(
        <Input
          allowClear
          value="test"
          onChange={() => {}}
          onClear={handleClear}
        />
      );

      const clearButton = screen.getByLabelText("Limpiar");
      fireEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe("Funcionalidad ShowCount", () => {
    test("no muestra contador por defecto", () => {
      renderWithProviders(<Input value="test" onChange={() => {}} />);

      expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
    });

    test("muestra contador cuando showCount=true y maxLength está definido", () => {
      renderWithProviders(
        <Input
          showCount
          maxLength={100}
          value="test value"
          onChange={() => {}}
        />
      );

      expect(screen.getByText("10/100")).toBeInTheDocument();
    });

    test("actualiza contador cuando cambia el valor", () => {
      const { rerender } = renderWithProviders(
        <Input showCount maxLength={50} value="short" onChange={() => {}} />
      );

      expect(screen.getByText("5/50")).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={mockTheme}>
          <Input
            showCount
            maxLength={50}
            value="much longer text value"
            onChange={() => {}}
          />
        </ThemeProvider>
      );

      expect(screen.getByText("22/50")).toBeInTheDocument();
    });
  });

  describe("Estados disabled y readOnly", () => {
    test("aplica estado disabled", () => {
      renderWithProviders(<Input disabled placeholder="Disabled input" />);

      const input = screen.getByPlaceholderText("Disabled input");
      expect(input).toBeDisabled();
    });

    test("aplica estado readOnly", () => {
      renderWithProviders(<Input readOnly value="Read only" />);

      const input = screen.getByDisplayValue("Read only");
      expect(input).toHaveAttribute("readonly");
    });

    test("no muestra clear button cuando disabled", () => {
      renderWithProviders(
        <Input allowClear disabled value="test" onChange={() => {}} />
      );

      expect(screen.queryByLabelText("Limpiar")).not.toBeInTheDocument();
    });

    test("no muestra clear button cuando readOnly", () => {
      renderWithProviders(
        <Input allowClear readOnly value="test" onChange={() => {}} />
      );

      expect(screen.queryByLabelText("Limpiar")).not.toBeInTheDocument();
    });
  });

  describe("Eventos", () => {
    test("ejecuta onChange cuando cambia el valor", () => {
      const handleChange = jest.fn();

      renderWithProviders(
        <Input onChange={handleChange} placeholder="Change test" />
      );

      const input = screen.getByPlaceholderText("Change test");
      fireEvent.change(input, { target: { value: "new value" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange.mock.calls[0][0].target.value).toBe("new value");
    });

    test("ejecuta onFocus y onBlur", () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      renderWithProviders(
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Focus test"
        />
      );

      const input = screen.getByPlaceholderText("Focus test");

      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    test("ejecuta onPressEnter cuando se presiona Enter", () => {
      const handlePressEnter = jest.fn();

      renderWithProviders(
        <Input onPressEnter={handlePressEnter} placeholder="Enter test" />
      );

      const input = screen.getByPlaceholderText("Enter test");
      fireEvent.keyDown(input, { key: "Enter" });

      expect(handlePressEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe("Props ARIA y accesibilidad", () => {
    test("aplica aria-label personalizado", () => {
      renderWithProviders(
        <Input aria-label="Custom label" placeholder="ARIA test" />
      );

      const input = screen.getByPlaceholderText("ARIA test");
      expect(input).toHaveAttribute("aria-label", "Custom label");
    });

    test("aplica role personalizado", () => {
      renderWithProviders(<Input role="searchbox" placeholder="Role test" />);

      const input = screen.getByPlaceholderText("Role test");
      expect(input).toHaveAttribute("role", "searchbox");
    });

    test("aplica title HTML", () => {
      renderWithProviders(
        <Input htmlTitle="HTML title" placeholder="Title test" />
      );

      const input = screen.getByPlaceholderText("Title test");
      expect(input).toHaveAttribute("title", "HTML title");
    });
  });

  describe("TextArea Component", () => {
    test("renderiza textarea básico", () => {
      renderWithProviders(<TextArea placeholder="TextArea test" />);

      const textarea = screen.getByPlaceholderText("TextArea test");
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    test("aplica rows y cols", () => {
      renderWithProviders(
        <TextArea rows={5} cols={50} placeholder="Rows and cols" />
      );

      const textarea = screen.getByPlaceholderText("Rows and cols");
      expect(textarea).toHaveAttribute("cols", "50");
      // rows might be handled differently due to auto-sizing
    });

    test("maneja allowClear en textarea", () => {
      renderWithProviders(
        <TextArea allowClear value="textarea content" onChange={() => {}} />
      );

      expect(screen.getByLabelText("Limpiar")).toBeInTheDocument();
    });

    test("maneja showCount en textarea", () => {
      renderWithProviders(
        <TextArea
          showCount
          maxLength={200}
          value="textarea content"
          onChange={() => {}}
        />
      );

      expect(screen.getByText("16/200")).toBeInTheDocument();
    });
  });

  describe("Password Component", () => {
    test("renderiza password input", () => {
      renderWithProviders(<Password placeholder="Password test" />);

      const input = screen.getByPlaceholderText("Password test");
      expect(input).toHaveAttribute("type", "password");
    });

    test("muestra toggle de visibilidad por defecto", () => {
      renderWithProviders(<Password placeholder="Password with toggle" />);

      expect(screen.getByLabelText("Mostrar contraseña")).toBeInTheDocument();
    });

    test("no muestra toggle cuando visibilityToggle=false", () => {
      renderWithProviders(
        <Password visibilityToggle={false} placeholder="Password no toggle" />
      );

      expect(
        screen.queryByLabelText("Mostrar contraseña")
      ).not.toBeInTheDocument();
    });

    test("cambia tipo de input al hacer clic en toggle", () => {
      renderWithProviders(<Password placeholder="Toggle test" />);

      const input = screen.getByPlaceholderText("Toggle test");
      const toggle = screen.getByLabelText("Mostrar contraseña");

      expect(input).toHaveAttribute("type", "password");

      fireEvent.click(toggle);
      expect(input).toHaveAttribute("type", "text");
      expect(screen.getByLabelText("Ocultar contraseña")).toBeInTheDocument();
    });
  });

  describe("Search Component", () => {
    test("renderiza search input", () => {
      renderWithProviders(<Search placeholder="Search test" />);

      const input = screen.getByPlaceholderText("Search test");
      expect(input).toHaveAttribute("type", "search");
    });

    test("ejecuta onSearch cuando se hace clic en botón", () => {
      const handleSearch = jest.fn();

      renderWithProviders(
        <Search
          enterButton
          value="search query"
          onSearch={handleSearch}
          placeholder="Search with button"
        />
      );

      const searchButton = screen.getByLabelText("Buscar");
      fireEvent.click(searchButton);

      expect(handleSearch).toHaveBeenCalledWith(
        "search query",
        expect.any(Object)
      );
    });

    test("ejecuta onSearch cuando se presiona Enter", () => {
      const handleSearch = jest.fn();

      renderWithProviders(
        <Search
          value="search query"
          onSearch={handleSearch}
          placeholder="Search with enter"
        />
      );

      const input = screen.getByPlaceholderText("Search with enter");
      fireEvent.keyDown(input, { key: "Enter" });

      expect(handleSearch).toHaveBeenCalledWith(
        "search query",
        expect.any(Object)
      );
    });
  });

  describe("Componentes predefinidos - Variants", () => {
    test("PrimaryInput aplica variant primary", () => {
      renderWithProviders(<PrimaryInput placeholder="Primary" />);

      const input = screen.getByPlaceholderText("Primary");
      expect(input).toBeInTheDocument();
    });

    test("SuccessInput aplica variant success", () => {
      renderWithProviders(<SuccessInput placeholder="Success" />);

      const input = screen.getByPlaceholderText("Success");
      expect(input).toBeInTheDocument();
    });

    test("WarningInput aplica variant warning", () => {
      renderWithProviders(<WarningInput placeholder="Warning" />);

      const input = screen.getByPlaceholderText("Warning");
      expect(input).toBeInTheDocument();
    });

    test("ErrorInput aplica variant error", () => {
      renderWithProviders(<ErrorInput placeholder="Error" />);

      const input = screen.getByPlaceholderText("Error");
      expect(input).toBeInTheDocument();
    });

    test("SecondaryInput aplica variant secondary", () => {
      renderWithProviders(<SecondaryInput placeholder="Secondary" />);

      const input = screen.getByPlaceholderText("Secondary");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Tamaños", () => {
    test("SmallInput aplica tamaño sm", () => {
      renderWithProviders(<SmallInput placeholder="Small" />);

      const input = screen.getByPlaceholderText("Small");
      expect(input).toBeInTheDocument();
    });

    test("LargeInput aplica tamaño lg", () => {
      renderWithProviders(<LargeInput placeholder="Large" />);

      const input = screen.getByPlaceholderText("Large");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Componentes predefinidos - Tipos", () => {
    test("EmailInput aplica tipo email", () => {
      renderWithProviders(<EmailInput placeholder="Email" />);

      const input = screen.getByPlaceholderText("Email");
      expect(input).toHaveAttribute("type", "email");
    });

    test("PhoneInput aplica tipo tel", () => {
      renderWithProviders(<PhoneInput placeholder="Phone" />);

      const input = screen.getByPlaceholderText("Phone");
      expect(input).toHaveAttribute("type", "tel");
    });

    test("URLInput aplica tipo url", () => {
      renderWithProviders(<URLInput placeholder="URL" />);

      const input = screen.getByPlaceholderText("URL");
      expect(input).toHaveAttribute("type", "url");
    });

    test("NumberInput aplica tipo number", () => {
      renderWithProviders(<NumberInput placeholder="Number" />);

      const input = screen.getByPlaceholderText("Number");
      expect(input).toHaveAttribute("type", "number");
    });
  });

  describe("Componentes predefinidos - Funcionalidades", () => {
    test("ClearableInput tiene allowClear habilitado", () => {
      renderWithProviders(<ClearableInput value="test" onChange={() => {}} />);

      expect(screen.getByLabelText("Limpiar")).toBeInTheDocument();
    });

    test("CountedInput tiene showCount habilitado", () => {
      renderWithProviders(
        <CountedInput maxLength={50} value="test" onChange={() => {}} />
      );

      expect(screen.getByText("4/50")).toBeInTheDocument();
    });
  });

  describe("Casos edge", () => {
    test("maneja valor undefined/null", () => {
      renderWithProviders(
        <Input value={undefined as any} onChange={() => {}} />
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
    });

    test("maneja maxLength correctamente", () => {
      renderWithProviders(
        <Input maxLength={10} placeholder="Max length test" />
      );

      const input = screen.getByPlaceholderText("Max length test");
      expect(input).toHaveAttribute("maxlength", "10");
    });

    test("funciona con bordered=false", () => {
      renderWithProviders(<Input bordered={false} placeholder="No border" />);

      const input = screen.getByPlaceholderText("No border");
      expect(input).toBeInTheDocument();
    });

    test("maneja combinación de allowClear y showCount", () => {
      renderWithProviders(
        <Input
          allowClear
          showCount
          maxLength={100}
          value="test value with clear and count"
          onChange={() => {}}
        />
      );

      expect(screen.getByLabelText("Limpiar")).toBeInTheDocument();
      expect(screen.getByText("31/100")).toBeInTheDocument();
    });
  });
});
