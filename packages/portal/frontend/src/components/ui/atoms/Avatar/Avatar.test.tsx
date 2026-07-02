import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./index";

describe("Avatar Component", () => {
  it("renders with image", () => {
    render(<Avatar src="test.jpg" alt="Test" />);
    const img = screen.getByAltText("Test");
    expect(img).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<Avatar icon={<span>👤</span>} />);
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  it("renders with children", () => {
    render(<Avatar>AB</Avatar>);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("applies size correctly", () => {
    const { container } = render(<Avatar size="lg" />);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toBeTruthy();
    const computedStyle = window.getComputedStyle(avatar);
    expect(parseFloat(computedStyle.width)).toBeGreaterThan(0);
    expect(parseFloat(computedStyle.height)).toBeGreaterThan(0);
  });
});
