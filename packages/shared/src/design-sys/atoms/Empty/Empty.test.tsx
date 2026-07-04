import React from "react";
import { render, screen } from "@testing-library/react";
import Empty from "./index";

describe("Empty Component", () => {
  it("should render with default props", () => {
    render(<Empty />);
    expect(screen.getByText("No hay datos")).toBeInTheDocument();
  });

  it("should render custom description", () => {
    render(<Empty description="No se encontraron resultados" />);
    expect(
      screen.getByText("No se encontraron resultados")
    ).toBeInTheDocument();
  });

  it("should render simple image", () => {
    render(<Empty image="simple" />);
    const container = screen.getByText("No hay datos").closest("div");
    expect(container).toBeInTheDocument();
  });
});
