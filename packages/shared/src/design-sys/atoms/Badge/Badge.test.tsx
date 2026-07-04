import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  Badge,
  BadgeCounter,
  PrimaryBadge,
  DotBadge,
  NotificationBadgeComponent,
} from "./index";

jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: () => ({
    accessibility: {
      reducedMotion: false,
      highContrast: false,
      textToSpeech: false,
      increasedSpacing: false,
    },
  }),
}));

const theme = {
  colors: {
    primary: { 500: "#0052a3" },
    secondary: { 500: "#6c757d" },
    success: { 500: "#28a745" },
    warning: { 500: "#ffc107" },
    error: { 500: "#d32f2f" },
    info: { 500: "#17a2b8" },
    text: { primary: "#212121", secondary: "#6c757d" },
    background: { card: "#ffffff" },
    border: { light: "#e0e0e0" },
  },
  typography: {
    fontWeight: { medium: 500 },
  },
  borderRadius: { md: "8px" },
} as any;

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("Badge", () => {
  test("renderiza badge standalone con count", () => {
    renderWithTheme(<Badge count={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("no renderiza cuando count es 0 y showZero es falso", () => {
    const { container } = renderWithTheme(<Badge count={0} />);
    expect(container.firstChild).toBeNull();
  });

  test("renderiza badge con children", () => {
    renderWithTheme(
      <Badge count={3}>
        <button>Acción</button>
      </Badge>
    );

    expect(screen.getByText("Acción")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("renderiza dot badge", () => {
    renderWithTheme(<Badge dot aria-label="Indicador activo" />);

    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe("");
  });

  test("ejecuta onClick cuando es interactivo", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Badge count={1} onClick={handleClick} role="button" aria-label="Badge" />
    );

    fireEvent.click(screen.getByRole("button", { name: "Badge" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("PrimaryBadge aplica estilos primarios", () => {
    renderWithTheme(<PrimaryBadge count={9} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  test("DotBadge renderiza indicador sin texto", () => {
    renderWithTheme(<DotBadge />);
    const badge = screen.getByRole("status");
    expect(badge.textContent).toBe("");
  });

  test("BadgeCounter muestra valor inicial con showZero", () => {
    renderWithTheme(<BadgeCounter target={10} duration={1000} showZero />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("Notification badge ejecuta callback", () => {
    const handleMarkAsRead = jest.fn();
    renderWithTheme(
      <NotificationBadgeComponent
        unreadCount={2}
        maxDisplay={99}
        markAsRead={handleMarkAsRead}
      />
    );

    fireEvent.click(screen.getByRole("status"));
    expect(handleMarkAsRead).toHaveBeenCalledTimes(1);
  });
});

