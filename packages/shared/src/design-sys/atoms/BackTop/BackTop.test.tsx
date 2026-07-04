import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  BackTop,
  CircleBackTopComponent,
  SquareBackTopComponent,
  RoundBackTopComponent,
  FloatingBackTopComponent,
  TextBackTopComponent,
  MobileBackTopComponent,
  LoadingBackTop,
} from "./index";

jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: () => ({
    accessibility: {
      reduceMotion: false,
      disableAnimations: false,
      highContrast: false,
      fontSizeMultiplier: 1,
      increasedSpacing: false,
    },
  }),
}));

jest.mock("../../../../hooks/useThemeColors", () => ({
  useThemeColors: () => ({
    primary: { 500: "#0052a3", 300: "#4d88d1" },
    secondary: { 500: "#6c757d" },
    success: { 500: "#2e7d32" },
    warning: { 500: "#ed6c02" },
    error: { 500: "#d32f2f" },
    info: { 500: "#0288d1" },
    neutral: { 500: "#9e9e9e" },
    text: { primary: "#212121" },
    border: { light: "#e0e0e0" },
  }),
}));

const theme = {
  colors: {
    primary: { 500: "#0052a3" },
    text: { primary: "#212121" },
    border: { light: "#e0e0e0" },
    background: { primary: "#ffffff" },
  },
};

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme as any}>{ui}</ThemeProvider>);

const getBackTopButton = () =>
  screen.getByRole("button", { hidden: true });

describe("BackTop", () => {
  const originalScrollTo = window.scrollTo;
  const originalPageYOffset = Object.getOwnPropertyDescriptor(window, "pageYOffset");

  beforeEach(() => {
    window.scrollTo = jest.fn();
    if (originalPageYOffset) {
      Object.defineProperty(window, "pageYOffset", {
        value: 0,
        configurable: true,
        writable: true,
      });
    }
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

afterAll(() => {
  if (originalPageYOffset) {
    Object.defineProperty(window, "pageYOffset", originalPageYOffset);
  }
});

  test("renderiza el botón con etiqueta accesible", () => {
    renderWithTheme(<BackTop />);
    const button = getBackTopButton();
    expect(button).toHaveAttribute("aria-label", "Back to top");
    expect(button).toHaveAttribute("title", "Back to top");
  });

  test("está oculto por defecto", () => {
    renderWithTheme(<BackTop />);
    const button = getBackTopButton();
    const styles = window.getComputedStyle(button);
    expect(styles.visibility).toBe("hidden");
    expect(styles.pointerEvents).toBe("none");
  });

  test("se muestra cuando la posición de scroll supera visibilityHeight", async () => {
    jest.useFakeTimers();
    renderWithTheme(<BackTop visibilityHeight={100} />);

    Object.defineProperty(window, "pageYOffset", {
      value: 200,
      configurable: true,
      writable: true,
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();

    await waitFor(() => {
      const button = getBackTopButton();
      expect(window.getComputedStyle(button).visibility).toBe("visible");
    });
  });

  test("hace scroll inmediato al hacer clic cuando smooth es falso", () => {
    renderWithTheme(<BackTop visibilityHeight={0} smooth={false} />);
    const button = getBackTopButton();

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test("ejecuta onClick adicional", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <BackTop visibilityHeight={0} smooth={false} onClick={handleClick} />
    );
    const button = getBackTopButton();

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test("componentes predefinidos renderizan el botón", () => {
    const presets = [
      CircleBackTopComponent,
      SquareBackTopComponent,
      RoundBackTopComponent,
      FloatingBackTopComponent,
      TextBackTopComponent,
      MobileBackTopComponent,
    ];

    presets.forEach((Preset) => {
      const { unmount } = renderWithTheme(<Preset />);
      expect(getBackTopButton()).toBeInTheDocument();
      unmount();
    });
  });

  test("LoadingBackTop muestra el esqueleto de carga", () => {
    const { container } = renderWithTheme(<LoadingBackTop />);
    expect(container.firstChild).not.toBeNull();
  });
});

