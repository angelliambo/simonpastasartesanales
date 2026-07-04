import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
} from "@testing-library/react";
// import userEvent from "@testing-library/user-event"; // Not needed, using fireEvent instead
import { ThemeProvider } from "styled-components";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { mockDefaultTheme, mockThemeColors } from "../../../../test/mocks/theme";

// Mock the hooks
jest.mock("../../../../contexts/PersonalizationContext");
jest.mock("../../../../hooks/useClickOutside");
jest.mock("../../../../hooks/useThemeColors", () => ({
  useThemeColors: () => mockThemeColors,
}));

const mockUsePersonalization = usePersonalization as jest.MockedFunction<
  typeof usePersonalization
>;
// Mock useClickOutside
const mockUseClickOutside = require("../../../../hooks/useClickOutside")
  .useClickOutside as jest.MockedFunction<any>;

// Mock react-dom portal
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

// Import components after mocks
import {
  Popover,
  HoverPopover,
  ClickPopover,
  FocusPopover,
  ContextMenuPopover,
  ManualPopover,
  TopPopover,
  BottomPopover,
  LeftPopover,
  RightPopover,
  TopLeftPopover,
  TopRightPopover,
  BottomLeftPopover,
  BottomRightPopover,
  ArrowlessPopover,
  PersistentPopover,
  DestroyablePopover,
  NoOverflowPopover,
  FastPopover,
  SlowPopover,
  TooltipPopoverComponent,
  ConfirmPopoverComponent,
  MenuPopoverComponent,
  HelpPopover,
  InfoPopover,
  ActionPopover,
  LoadingPopover,
  EmptyPopover,
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

beforeEach(() => {
  mockUsePersonalization.mockReturnValue(mockPersonalizationData as any);
  mockUseClickOutside.mockImplementation(() => {});

  // Mock getBoundingClientRect
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
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1024,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: 768,
  });
  Object.defineProperty(window, "scrollX", {
    writable: true,
    configurable: true,
    value: 0,
  });
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value: 0,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={mockDefaultTheme}>
    <div id="test-container">{children}</div>
  </ThemeProvider>
);

// =============================================================================
// BASIC RENDERING TESTS
// =============================================================================

describe("Popover", () => {
  describe("Basic Rendering", () => {
    it("renders correctly with basic props", () => {
      render(
        <TestWrapper>
          <Popover content="Test content">
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      expect(
        screen.getByRole("button", { name: "Trigger" })
      ).toBeInTheDocument();
    });

    it("renders with title and content", async () => {
      render(
        <TestWrapper>
          <Popover title="Test Title" content="Test content" open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test content")).toBeInTheDocument();
      });
    });

    it("handles React node content", async () => {
      const content = (
        <div>
          <p>Complex content</p>
          <button>Action</button>
        </div>
      );

      render(
        <TestWrapper>
          <Popover content={content} open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Complex content")).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Action" })
        ).toBeInTheDocument();
      });
    });

    it("handles string trigger child", () => {
      render(
        <TestWrapper>
          <Popover content="Test content">Plain text trigger</Popover>
        </TestWrapper>
      );

      expect(screen.getByText("Plain text trigger")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // TRIGGER TESTS
  // =============================================================================

  describe("Trigger Behaviors", () => {
    it("opens on hover trigger", async () => {
      render(
        <TestWrapper>
          <Popover trigger="hover" content="Hover content">
            <button>Hover me</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Hover me" });

      fireEvent.mouseEnter(trigger);

      await waitFor(() => {
        expect(screen.getByText("Hover content")).toBeInTheDocument();
      });
    });

    it("opens on click trigger", async () => {
      render(
        <TestWrapper>
          <Popover trigger="click" content="Click content">
            <button>Click me</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Click me" });

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Click content")).toBeInTheDocument();
      });
    });

    it("opens on focus trigger", async () => {
      render(
        <TestWrapper>
          <Popover trigger="focus" content="Focus content">
            <input placeholder="Focus me" />
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByPlaceholderText("Focus me");

      fireEvent.focus(trigger);

      await waitFor(() => {
        expect(screen.getByText("Focus content")).toBeInTheDocument();
      });
    });

    it("opens on context menu trigger", async () => {
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover trigger="contextMenu" content="Context content">
            <div>Right click me</div>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByText("Right click me");

      fireEvent.contextMenu(trigger);

      await waitFor(() => {
        expect(screen.getByText("Context content")).toBeInTheDocument();
      });
    });

    it("handles manual trigger with controlled open", async () => {
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <TestWrapper>
            <button onClick={() => setOpen(!open)}>Toggle Popover</button>
            <Popover
              trigger="manual"
              open={open}
              onOpenChange={setOpen}
              content="Manual content"
            >
              <div>Manual trigger</div>
            </Popover>
          </TestWrapper>
        );
      };

      render(<TestComponent />);

      const toggleButton = screen.getByRole("button", {
        name: "Toggle Popover",
      });

      fireEvent.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByText("Manual content")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // PLACEMENT TESTS
  // =============================================================================

  describe("Placement", () => {
    const placements = [
      "top",
      "topLeft",
      "topRight",
      "bottom",
      "bottomLeft",
      "bottomRight",
      "left",
      "leftTop",
      "leftBottom",
      "right",
      "rightTop",
      "rightBottom",
    ] as const;

    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, async () => {
        render(
          <TestWrapper>
            <Popover
              placement={placement}
              content={`${placement} content`}
              open={true}
            >
              <button>Trigger</button>
            </Popover>
          </TestWrapper>
        );

        await waitFor(() => {
          expect(screen.getByText(`${placement} content`)).toBeInTheDocument();
        });
      });
    });
  });

  // =============================================================================
  // ARROW TESTS
  // =============================================================================

  describe("Arrow", () => {
    it("shows arrow by default", async () => {
      render(
        <TestWrapper>
          <Popover content="Arrow content" open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const popoverContent = await screen.findByTestId("popover-content");
      expect(
        within(popoverContent).getByTestId("popover-arrow")
      ).toBeInTheDocument();
    });

    it("hides arrow when showArrow is false", async () => {
      render(
        <TestWrapper>
          <Popover content="No arrow content" showArrow={false} open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const popoverContent = await screen.findByTestId("popover-content");
      expect(
        within(popoverContent).queryByTestId("popover-arrow")
      ).not.toBeInTheDocument();
    });
  });

  // =============================================================================
  // KEYBOARD NAVIGATION TESTS
  // =============================================================================

  describe("Keyboard Navigation", () => {
    it("closes on Escape key", async () => {
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover trigger="click" content="Escape test">
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Escape test")).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger, { key: "Escape" });

      await waitFor(() => {
        expect(screen.queryByText("Escape test")).not.toBeInTheDocument();
      });
    });

    it("toggles on Enter key for click trigger", async () => {
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover trigger="click" content="Enter test">
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });
      trigger.focus();

      fireEvent.keyDown(trigger, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByText("Enter test")).toBeInTheDocument();
      });
    });

    it("toggles on Space key for click trigger", async () => {
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover trigger="click" content="Space test">
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });
      trigger.focus();

      fireEvent.keyDown(trigger, { key: " " });

      await waitFor(() => {
        expect(screen.getByText("Space test")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // EVENT HANDLER TESTS
  // =============================================================================

  describe("Event Handlers", () => {
    it("calls onOpenChange when opened", async () => {
      const onOpenChange = jest.fn();
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover
            trigger="click"
            content="Event test"
            onOpenChange={onOpenChange}
          >
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });

      fireEvent.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("calls onVisibleChange when opened", async () => {
      const onVisibleChange = jest.fn();
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover
            trigger="click"
            content="Visible test"
            onVisibleChange={onVisibleChange}
          >
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });

      fireEvent.click(trigger);

      expect(onVisibleChange).toHaveBeenCalledWith(true);
    });

    it("preserves original event handlers", async () => {
      const originalClick = jest.fn();
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover trigger="click" content="Original test">
            <button onClick={originalClick}>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });

      fireEvent.click(trigger);

      expect(originalClick).toHaveBeenCalled();
    });
  });

  // =============================================================================
  // TIMING TESTS
  // =============================================================================

  describe("Timing", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("respects mouseEnterDelay", async () => {
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover trigger="hover" content="Delay test" mouseEnterDelay={0.5}>
            <button>Hover me</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Hover me" });

      fireEvent.mouseEnter(trigger);

      // Content should not appear immediately
      expect(screen.queryByText("Delay test")).not.toBeInTheDocument();

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        expect(screen.getByText("Delay test")).toBeInTheDocument();
      });
    });

    it("respects mouseLeaveDelay", async () => {
      // Using fireEvent instead of userEvent.setup()

      render(
        <TestWrapper>
          <Popover
            trigger="hover"
            content="Leave test"
            mouseLeaveDelay={0.5}
            mouseEnterDelay={0}
          >
            <button>Hover me</button>
          </Popover>
        </TestWrapper>
      );

      const trigger = screen.getByRole("button", { name: "Hover me" });

      fireEvent.mouseEnter(trigger);

      act(() => {
        jest.advanceTimersByTime(0);
      });

      await waitFor(() => {
        expect(screen.getByText("Leave test")).toBeInTheDocument();
      });

        fireEvent.mouseLeave(trigger);

      // Content should still be visible
      expect(screen.getByText("Leave test")).toBeInTheDocument();

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        expect(screen.queryByText("Leave test")).not.toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // ACCESSIBILITY TESTS
  // =============================================================================

  describe("Accessibility", () => {
    it("applies accessibility props for reduced motion", async () => {
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
          <Popover content="Accessibility test" open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Accessibility test")).toBeInTheDocument();
      });
    });

    it("applies accessibility props for large text", async () => {
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
          <Popover content="Large text test" open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Large text test")).toBeInTheDocument();
      });
    });

    it("applies accessibility props for high contrast", async () => {
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
          <Popover content="High contrast test" open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("High contrast test")).toBeInTheDocument();
      });
    });

    it("applies accessibility props for increased spacing", async () => {
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
          <Popover content="Increased spacing test" open={true}>
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Increased spacing test")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // PREDEFINED COMPONENTS TESTS
  // =============================================================================

  describe("Predefined Components", () => {
    const components = [
      { Component: HoverPopover, name: "HoverPopover" },
      { Component: ClickPopover, name: "ClickPopover" },
      { Component: FocusPopover, name: "FocusPopover" },
      { Component: ContextMenuPopover, name: "ContextMenuPopover" },
      { Component: ManualPopover, name: "ManualPopover" },
      { Component: TopPopover, name: "TopPopover" },
      { Component: BottomPopover, name: "BottomPopover" },
      { Component: LeftPopover, name: "LeftPopover" },
      { Component: RightPopover, name: "RightPopover" },
      { Component: TopLeftPopover, name: "TopLeftPopover" },
      { Component: TopRightPopover, name: "TopRightPopover" },
      { Component: BottomLeftPopover, name: "BottomLeftPopover" },
      { Component: BottomRightPopover, name: "BottomRightPopover" },
      { Component: ArrowlessPopover, name: "ArrowlessPopover" },
      { Component: PersistentPopover, name: "PersistentPopover" },
      { Component: DestroyablePopover, name: "DestroyablePopover" },
      { Component: NoOverflowPopover, name: "NoOverflowPopover" },
      { Component: FastPopover, name: "FastPopover" },
      { Component: SlowPopover, name: "SlowPopover" },
      { Component: TooltipPopoverComponent, name: "TooltipPopoverComponent" },
      { Component: ConfirmPopoverComponent, name: "ConfirmPopoverComponent" },
      { Component: MenuPopoverComponent, name: "MenuPopoverComponent" },
      { Component: HelpPopover, name: "HelpPopover" },
      { Component: InfoPopover, name: "InfoPopover" },
      { Component: ActionPopover, name: "ActionPopover" },
      { Component: LoadingPopover, name: "LoadingPopover" },
      { Component: EmptyPopover, name: "EmptyPopover" },
    ];

    components.forEach(({ Component, name }) => {
      it(`renders ${name} correctly`, () => {
        render(
          <TestWrapper>
            <Component content={`${name} content`}>
              <button>{name} trigger</button>
            </Component>
          </TestWrapper>
        );

        expect(
          screen.getByRole("button", { name: `${name} trigger` })
        ).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // SPECIAL CONTENT TESTS
  // =============================================================================

  describe("Special Content", () => {
    it("renders loading content", async () => {
      render(
        <TestWrapper>
          <LoadingPopover open={true}>
            <button>Loading trigger</button>
          </LoadingPopover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("popover-skeleton-title")).toBeInTheDocument();
        expect(
          screen.getByTestId("popover-skeleton-content")
        ).toBeInTheDocument();
      });
    });

    it("renders empty content", async () => {
      render(
        <TestWrapper>
          <EmptyPopover open={true}>
            <button>Empty trigger</button>
          </EmptyPopover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("No content available")).toBeInTheDocument();
        expect(document.querySelector(".empty-icon")).toBeInTheDocument();
      });
    });
  });

  // =============================================================================
  // ERROR HANDLING TESTS
  // =============================================================================

  describe("Error Handling", () => {
    it("handles missing content gracefully", () => {
      render(
        <TestWrapper>
          <Popover>
            <button>No content</button>
          </Popover>
        </TestWrapper>
      );

      expect(
        screen.getByRole("button", { name: "No content" })
      ).toBeInTheDocument();
    });

    it("handles invalid placement gracefully", async () => {
      render(
        <TestWrapper>
          <Popover
            // @ts-expect-error Testing invalid placement
            placement="invalid"
            content="Invalid placement"
            open={true}
          >
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("Invalid placement")).toBeInTheDocument();
      });
    });

    it("handles invalid trigger gracefully", () => {
      render(
        <TestWrapper>
          <Popover
            // @ts-expect-error Testing invalid trigger
            trigger="invalid"
            content="Invalid trigger"
          >
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      expect(
        screen.getByRole("button", { name: "Trigger" })
      ).toBeInTheDocument();
    });
  });

  // =============================================================================
  // REF TESTS
  // =============================================================================

  describe("Ref Handling", () => {
    it("exposes imperative methods through ref", () => {
      const ref = React.createRef<any>();

      render(
        <TestWrapper>
          <Popover ref={ref} content="Ref test">
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.open).toBe("function");
      expect(typeof ref.current.close).toBe("function");
      expect(typeof ref.current.toggle).toBe("function");
      expect(typeof ref.current.updatePosition).toBe("function");
    });

    it("can be controlled via ref methods", async () => {
      const ref = React.createRef<any>();

      render(
        <TestWrapper>
          <Popover ref={ref} content="Ref control test">
            <button>Trigger</button>
          </Popover>
        </TestWrapper>
      );

      act(() => {
        ref.current?.open();
      });

      await waitFor(() => {
        expect(screen.getByText("Ref control test")).toBeInTheDocument();
      });

      act(() => {
        ref.current?.close();
      });

      await waitFor(() => {
        expect(screen.queryByText("Ref control test")).not.toBeInTheDocument();
      });
    });
  });
});
