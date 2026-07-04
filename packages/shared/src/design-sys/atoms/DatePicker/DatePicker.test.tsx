import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { PersonalizationProvider } from '../../contexts/PersonalizationContext';
import { DatePicker } from "./index";
import { mockDefaultTheme } from "../../../../test/mocks/theme";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockDefaultTheme}>
      <PersonalizationProvider>{component}</PersonalizationProvider>
    </ThemeProvider>
  );
};

describe("DatePicker", () => {
  it("renders correctly", () => {
    renderWithProviders(<DatePicker />);

    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Select date");
  });

  it("renders with custom placeholder", () => {
    renderWithProviders(<DatePicker placeholder="Choose a date" />);

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("placeholder", "Choose a date");
  });

  it("renders disabled state correctly", () => {
    renderWithProviders(<DatePicker disabled />);

    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();
  });
});
