import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radio, RadioGroup } from "./index";

describe("Radio Component", () => {
  it("renders radio button", () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Radio>Opción 1</Radio>);
    expect(screen.getByText("Opción 1")).toBeInTheDocument();
  });

  it("handles click", () => {
    const handleChange = jest.fn();
    const { container } = render(<Radio onChange={handleChange} />);
    const input = container.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement;
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });
});
