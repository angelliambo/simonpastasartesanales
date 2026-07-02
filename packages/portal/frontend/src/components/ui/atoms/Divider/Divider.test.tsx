import React from "react";
import { render, screen } from "@testing-library/react";
import { Divider } from "./index";

describe("Divider Component", () => {
  it("renders horizontal divider", () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild as HTMLElement;
    expect(divider).toBeInTheDocument();
  });

  it("renders vertical divider", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const divider = container.firstChild as HTMLElement;
    expect(divider).toBeInTheDocument();
  });

  it("renders with text", () => {
    render(<Divider>Texto</Divider>);
    expect(screen.getByText("Texto")).toBeInTheDocument();
  });

  it("applies dashed type", () => {
    const { container } = render(<Divider type="dashed" />);
    const divider = container.firstChild as HTMLElement;
    expect(divider).toHaveStyle({ borderTopStyle: "dashed" });
  });
});
