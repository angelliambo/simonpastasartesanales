import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { useThemeColors } from "../../../../hooks/useThemeColors";

// Mock the hooks
jest.mock("../../../../contexts/PersonalizationContext");
jest.mock("../../../../hooks/useThemeColors");

const mockUsePersonalization = usePersonalization as jest.MockedFunction<
  typeof usePersonalization
>;
const mockUseThemeColors = useThemeColors as jest.MockedFunction<
  typeof useThemeColors
>;

// Import components after mocks
import {
  Anchor,
  AnchorLink,
  useScrollSpy,
  useAnchorScroll,
  VerticalAnchorComponent,
  HorizontalAnchorComponent,
  LeftAnchor,
  RightAnchor,
  TopAnchorComponent,
  BottomAnchor,
  AffixAnchor,
  StaticAnchor,
  ScrollSpyAnchor,
  SmallAnchor,
  MediumAnchor,
  LargeAnchor,
  PrimaryAnchor,
  SecondaryAnchor,
  SidebarAnchorComponent,
  CompactAnchorComponent,
  SpacedAnchorComponent,
  TableOfContentsAnchor,
  NavigationAnchor,
  DocumentOutlineAnchor,
  PageIndexAnchor,
  LoadingAnchor,
  EmptyAnchor,
} from "./index";

// =============================================================================
// SETUP AND MOCKS
// =============================================================================

const mockPersonalizationData = {
  accessibility: {
    reduceMotion: false,
    disableAnimations: false,
    highContrast: false,
    fontSizeMultiplier: 1,
    increasedSpacing: false,
  },
};

const mockColors = {
  primary: { 500: "#1890ff", 50: "#e6f7ff", 100: "#bae7ff", 600: "#1890ff", 700: "#096dd9" },
  background: { primary: "#ffffff", secondary: "#f5f5f5" },
  text: { primary: "#333333", secondary: "#666666" },
  border: { normal: "#d9d9d9", light: "#f0f0f0" },
  success: { 600: "#52c41a", 500: "#73d13d", 700: "#389e0d" },
  warning: { 600: "#fa8c16", 500: "#ffa940", 700: "#d46b08" },
  error: { 600: "#f5222d", 500: "#ff4d4f", 700: "#cf1322" },
  info: { 600: "#1890ff", 500: "#40a9ff", 700: "#096dd9" },
};

beforeEach(() => {
  mockUsePersonalization.mockReturnValue(mockPersonalizationData as any);
  mockUseThemeColors.mockReturnValue(mockColors as any);

  // Mock DOM methods
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    width: 200,
    height: 100,
    top: 100,
    left: 100,
    bottom: 200,
    right: 300,
    x: 100,
    y: 100,
    toJSON: () => {},
  }));

  // Mock window properties
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value: 0,
  });
  
  // Mock getElementById
  document.getElementById = jest.fn((id) => {
    const mockElement = document.createElement("div");
    mockElement.id = id;
    return mockElement;
  });

  // Mock history
  Object.defineProperty(window, "history", {
    writable: true,
    value: {
      pushState: jest.fn(),
      replaceState: jest.fn(),
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

// Basic theme for testing
const testTheme = {
  colors: {
    primary: { 500: "#1890ff" },
    background: { primary: "#ffffff", secondary: "#f5f5f5" },
    text: { primary: "#333333", secondary: "#666666" },
    border: { normal: "#d9d9d9", light: "#f0f0f0" },
  },
};

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={testTheme as any}>
    <div id="test-container">{children}</div>
  </ThemeProvider>
);

// =============================================================================
// BASIC RENDERING TESTS
// =============================================================================

describe("Anchor", () => {
  describe("Basic Rendering", () => {
    it("renders correctly with basic props", () => {
      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
            <AnchorLink href="#section2" title="Section 2" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
    });

    it("renders with items prop", () => {
      const items = [
        { key: "1", href: "#section1", title: "Section 1" },
        { key: "2", href: "#section2", title: "Section 2" },
      ];

      render(
        <TestWrapper>
          <Anchor items={items} />
        </TestWrapper>
      );

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
    });

    it("renders with nested items", () => {
      const items = [
        {
          key: "1",
          href: "#section1",
          title: "Section 1",
          children: [
            { key: "1.1", href: "#section1-1", title: "Subsection 1.1" },
            { key: "1.2", href: "#section1-2", title: "Subsection 1.2" },
          ],
        },
      ];

      render(
        <TestWrapper>
          <Anchor items={items} />
        </TestWrapper>
      );

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Subsection 1.1")).toBeInTheDocument();
      expect(screen.getByText("Subsection 1.2")).toBeInTheDocument();
    });

    it("renders as affix when affix prop is true", () => {
      render(
        <TestWrapper>
          <Anchor affix={true}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const anchor = screen.getByRole("navigation");
      expect(anchor).toHaveClass("anchor");
    });
  });

  // =============================================================================
  // DIRECTION TESTS
  // =============================================================================

  describe("Direction", () => {
    it("renders vertical direction by default", () => {
      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const anchor = screen.getByRole("navigation");
      expect(anchor).toBeInTheDocument();
    });

    it("renders horizontal direction", () => {
      render(
        <TestWrapper>
          <Anchor direction="horizontal">
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const anchor = screen.getByRole("navigation");
      expect(anchor).toBeInTheDocument();
    });
  });

  // =============================================================================
  // SIZE TESTS
  // =============================================================================

  describe("Sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(
          <TestWrapper>
            <Anchor size={size}>
              <AnchorLink href="#section1" title="Section 1" />
            </Anchor>
          </TestWrapper>
        );

        expect(screen.getByRole("navigation")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // VARIANT TESTS
  // =============================================================================

  describe("Variants", () => {
    const variants = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "info",
    ] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(
          <TestWrapper>
            <Anchor variant={variant}>
              <AnchorLink href="#section1" title="Section 1" />
            </Anchor>
          </TestWrapper>
        );

        expect(screen.getByRole("navigation")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // PLACEMENT TESTS
  // =============================================================================

  describe("Placement", () => {
    const placements = ["left", "right", "top", "bottom"] as const;

    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, () => {
        render(
          <TestWrapper>
            <Anchor placement={placement} affix={true}>
              <AnchorLink href="#section1" title="Section 1" />
            </Anchor>
          </TestWrapper>
        );

        expect(screen.getByRole("navigation")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // INTERACTION TESTS
  // =============================================================================

  describe("Interactions", () => {
    it("handles click events", async () => {
      const onClick = jest.fn();

      render(
        <TestWrapper>
          <Anchor onClick={onClick}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const link = screen.getByText("Section 1");
      fireEvent.click(link);

      expect(onClick).toHaveBeenCalled();
    });

    it("handles onChange events", async () => {
      const onChange = jest.fn();

      render(
        <TestWrapper>
          <Anchor onChange={onChange}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const link = screen.getByText("Section 1");
      fireEvent.click(link);

      expect(onChange).toHaveBeenCalledWith("#section1");
    });

    it("navigates to anchor on click", async () => {
      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const link = screen.getByText("Section 1");
      fireEvent.click(link);

      expect(window.history.pushState).toHaveBeenCalledWith(null, "", "#section1");
    });

    it("uses replace navigation when replace prop is true", async () => {
      render(
        <TestWrapper>
          <Anchor replace={true}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const link = screen.getByText("Section 1");
      fireEvent.click(link);

      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "#section1");
    });
  });

  // =============================================================================
  // SCROLL SPY TESTS
  // =============================================================================

  describe("Scroll Spy", () => {
    it("updates active link based on scroll position", async () => {
      // Mock elements
      const mockElements = {
        section1: { getBoundingClientRect: () => ({ top: 50 }) },
        section2: { getBoundingClientRect: () => ({ top: 300 }) },
      };

      document.getElementById = jest.fn((id) => mockElements[id as keyof typeof mockElements] as any);

      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
            <AnchorLink href="#section2" title="Section 2" />
          </Anchor>
        </TestWrapper>
      );

      // Simulate scroll
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        // Verify that scroll spy logic is working
        expect(document.getElementById).toHaveBeenCalled();
      });
    });
  });

  // =============================================================================
  // INK INDICATOR TESTS
  // =============================================================================

  describe("Ink Indicator", () => {
    it("shows ink indicator when showInkInFixed is true", () => {
      render(
        <TestWrapper>
          <Anchor showInkInFixed={true}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const inkIndicator = document.querySelector(".anchor-ink");
      expect(inkIndicator).toBeInTheDocument();
    });

    it("shows ink indicator when affix is true", () => {
      render(
        <TestWrapper>
          <Anchor affix={true}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const inkIndicator = document.querySelector(".anchor-ink");
      expect(inkIndicator).toBeInTheDocument();
    });

    it("hides ink indicator when both showInkInFixed and affix are false", () => {
      render(
        <TestWrapper>
          <Anchor showInkInFixed={false} affix={false}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      const inkIndicator = document.querySelector(".anchor-ink");
      expect(inkIndicator).not.toBeInTheDocument();
    });
  });

  // =============================================================================
  // ACCESSIBILITY TESTS
  // =============================================================================

  describe("Accessibility", () => {
    it("applies accessibility props for reduced motion", () => {
      mockUsePersonalization.mockReturnValue({
        accessibility: {
          reduceMotion: true,
          disableAnimations: true,
          highContrast: false,
          fontSizeMultiplier: 1,
          increasedSpacing: false,
        },
      } as any);

      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("applies accessibility props for large text", () => {
      mockUsePersonalization.mockReturnValue({
        accessibility: {
          reduceMotion: false,
          disableAnimations: false,
          highContrast: false,
          fontSizeMultiplier: 1.5,
          increasedSpacing: false,
        },
      } as any);

      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("applies accessibility props for high contrast", () => {
      mockUsePersonalization.mockReturnValue({
        accessibility: {
          reduceMotion: false,
          disableAnimations: false,
          highContrast: true,
          fontSizeMultiplier: 1,
          increasedSpacing: false,
        },
      } as any);

      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("applies accessibility props for increased spacing", () => {
      mockUsePersonalization.mockReturnValue({
        accessibility: {
          reduceMotion: false,
          disableAnimations: false,
          highContrast: false,
          fontSizeMultiplier: 1,
          increasedSpacing: true,
        },
      } as any);

      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("provides proper ARIA labels", () => {
      render(
        <TestWrapper>
          <Anchor aria-label="Table of contents">
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(
        screen.getByRole("navigation", { name: /table of contents/i })
      ).toBeInTheDocument();
    });
  });

  // =============================================================================
  // HOOK TESTS
  // =============================================================================

  describe("useScrollSpy Hook", () => {
    it("returns active id and scroll function", () => {
      const TestComponent = () => {
        const { activeId, scrollToId } = useScrollSpy();
        
        return (
          <div>
            <span data-testid="active-id">{activeId}</span>
            <button onClick={() => scrollToId("#test")}>Scroll</button>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId("active-id")).toBeInTheDocument();
      expect(screen.getByText("Scroll")).toBeInTheDocument();
    });
  });

  describe("useAnchorScroll Hook", () => {
    it("returns scroll functions and active link", () => {
      const TestComponent = () => {
        const { activeLink, scrollTo, registerLink } = useAnchorScroll();
        
        return (
          <div>
            <span data-testid="active-link">{activeLink}</span>
            <button onClick={() => scrollTo("#test")}>Scroll</button>
          </div>
        );
      };

      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId("active-link")).toBeInTheDocument();
      expect(screen.getByText("Scroll")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // PREDEFINED COMPONENTS TESTS
  // =============================================================================

  describe("Predefined Components", () => {
    const components = [
      { Component: VerticalAnchorComponent, name: "VerticalAnchorComponent" },
      { Component: HorizontalAnchorComponent, name: "HorizontalAnchorComponent" },
      { Component: LeftAnchor, name: "LeftAnchor" },
      { Component: RightAnchor, name: "RightAnchor" },
      { Component: TopAnchorComponent, name: "TopAnchorComponent" },
      { Component: BottomAnchor, name: "BottomAnchor" },
      { Component: AffixAnchor, name: "AffixAnchor" },
      { Component: StaticAnchor, name: "StaticAnchor" },
      { Component: ScrollSpyAnchor, name: "ScrollSpyAnchor" },
      { Component: SmallAnchor, name: "SmallAnchor" },
      { Component: MediumAnchor, name: "MediumAnchor" },
      { Component: LargeAnchor, name: "LargeAnchor" },
      { Component: PrimaryAnchor, name: "PrimaryAnchor" },
      { Component: SecondaryAnchor, name: "SecondaryAnchor" },
      { Component: SidebarAnchorComponent, name: "SidebarAnchorComponent" },
      { Component: CompactAnchorComponent, name: "CompactAnchorComponent" },
      { Component: SpacedAnchorComponent, name: "SpacedAnchorComponent" },
      { Component: TableOfContentsAnchor, name: "TableOfContentsAnchor" },
      { Component: NavigationAnchor, name: "NavigationAnchor" },
      { Component: DocumentOutlineAnchor, name: "DocumentOutlineAnchor" },
      { Component: PageIndexAnchor, name: "PageIndexAnchor" },
    ];

    components.forEach(({ Component, name }) => {
      it(`renders ${name} correctly`, () => {
        render(
          <TestWrapper>
            <Component>
              <AnchorLink href="#section1" title="Section 1" />
            </Component>
          </TestWrapper>
        );

        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByText("Section 1")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // SPECIAL CONTENT TESTS
  // =============================================================================

  describe("Special Content", () => {
    it("renders loading state", () => {
      render(
        <TestWrapper>
          <LoadingAnchor />
        </TestWrapper>
      );

      const skeletonLinks = document.querySelectorAll(".skeleton-link");
      expect(skeletonLinks).toHaveLength(5);
    });

    it("renders empty state", () => {
      render(
        <TestWrapper>
          <EmptyAnchor />
        </TestWrapper>
      );

      expect(screen.getByText("No anchors available")).toBeInTheDocument();
      expect(document.querySelector(".empty-icon")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // ERROR HANDLING TESTS
  // =============================================================================

  describe("Error Handling", () => {
    it("handles missing target elements gracefully", () => {
      document.getElementById = jest.fn(() => null);

      render(
        <TestWrapper>
          <Anchor>
            <AnchorLink href="#nonexistent" title="Nonexistent" />
          </Anchor>
        </TestWrapper>
      );

      const link = screen.getByText("Nonexistent");
      fireEvent.click(link);

      // Should not throw error
      expect(screen.getByText("Nonexistent")).toBeInTheDocument();
    });

    it("handles invalid size gracefully", () => {
      render(
        <TestWrapper>
          <Anchor 
            // @ts-expect-error Testing invalid size
            size="invalid"
          >
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("handles invalid variant gracefully", () => {
      render(
        <TestWrapper>
          <Anchor 
            // @ts-expect-error Testing invalid variant
            variant="invalid"
          >
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // INTEGRATION TESTS
  // =============================================================================

  describe("Integration", () => {
    it("works with complex nested structure", () => {
      const items = [
        {
          key: "1",
          href: "#section1",
          title: "Section 1",
          children: [
            {
              key: "1.1",
              href: "#section1-1",
              title: "Subsection 1.1",
              children: [
                { key: "1.1.1", href: "#section1-1-1", title: "Sub-subsection 1.1.1" },
              ],
            },
          ],
        },
      ];

      render(
        <TestWrapper>
          <Anchor items={items} showInkInFixed={true} />
        </TestWrapper>
      );

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Subsection 1.1")).toBeInTheDocument();
      expect(screen.getByText("Sub-subsection 1.1.1")).toBeInTheDocument();
    });

    it("handles scroll events properly", async () => {
      const onChange = jest.fn();

      render(
        <TestWrapper>
          <Anchor onChange={onChange}>
            <AnchorLink href="#section1" title="Section 1" />
            <AnchorLink href="#section2" title="Section 2" />
          </Anchor>
        </TestWrapper>
      );

      // Simulate scroll event
      fireEvent.scroll(window);

      await waitFor(() => {
        // Should handle scroll events without errors
        expect(screen.getByRole("navigation")).toBeInTheDocument();
      });
    });

    it("works with custom container", () => {
      const container = document.createElement("div");
      document.body.appendChild(container);

      render(
        <TestWrapper>
          <Anchor getContainer={() => container}>
            <AnchorLink href="#section1" title="Section 1" />
          </Anchor>
        </TestWrapper>
      );

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});
