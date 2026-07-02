import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Popconfirm } from "./index";
import { Button } from "../Button";
import { mockDefaultTheme, mockThemeColors } from "../../../../test/mocks/theme";

jest.mock("../../../../contexts/PersonalizationContext", () => ({
  __esModule: true,
  usePersonalization: () => ({
    accessibility: {
      reduceMotion: false,
      disableAnimations: false,
      highContrast: false,
      fontSizeMultiplier: 1,
      increasedSpacing: false,
    },
  }),
  PersonalizationProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

jest.mock("../../../../hooks/useThemeColors", () => ({
  __esModule: true,
  useThemeColors: () => mockThemeColors,
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={mockDefaultTheme}>{ui}</ThemeProvider>);

describe("Popconfirm Component", () => {
  it("renders popconfirm trigger", () => {
    const { container } = renderWithTheme(
      <Popconfirm title="¿Confirmar?" onConfirm={() => {}}>
        <Button>Eliminar</Button>
      </Popconfirm>
    );
    expect(container).toBeInTheDocument();
  });

  it("calls onConfirm when OK is clicked", () => {
    const handleConfirm = jest.fn();
    renderWithTheme(
      <Popconfirm title="¿Confirmar?" onConfirm={handleConfirm}>
        <Button>Eliminar</Button>
      </Popconfirm>
    );

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    fireEvent.click(screen.getByRole("button", { name: "Aceptar" }));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
