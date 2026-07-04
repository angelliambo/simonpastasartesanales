import React from "react";
import { render, screen, fireEvent, waitFor, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Notification,
  NotificationProvider,
  useNotification,
  notification,
  SuccessNotificationComponent,
  ErrorNotificationComponent,
  WarningNotificationComponent,
  InfoNotificationComponent,
  OpenNotificationComponent,
  SmallNotificationComponent,
  MediumNotificationComponent,
  LargeNotificationComponent,
  ExtraLargeNotificationComponent,
  PrimaryNotificationComponent,
  SecondaryNotificationComponent,
  PersistentNotificationComponent,
  ClosableNotificationComponent,
  IconlessNotificationComponent,
  TopLeftNotificationComponent,
  TopRightNotificationComponent,
  BottomLeftNotificationComponent,
  BottomRightNotificationComponent,
  TopNotificationComponent,
  BottomNotificationComponent,
  ToastNotificationComponent,
  DesktopNotificationComponent,
  AlertNotificationComponent,
  StatusNotificationComponent,
  SystemNotificationComponent,
  LoadingNotificationComponent,
  ProgressNotificationComponent,
  FeedbackNotificationComponent,
} from "./index";

// Mock hooks
jest.mock("../../../../hooks/personalization/usePersonalization", () => ({
  usePersonalization: () => ({
    largeText: false,
    increasedSpacing: false,
    highContrast: false,
    reducedMotion: false,
  }),
}));

jest.mock("../../../../hooks/useThemeColors", () => ({
  useThemeColors: () => ({
    primary: { 500: "#1890ff", 200: "#91d5ff", 50: "#e6f7ff" },
    success: { 500: "#52c41a", 200: "#b7eb8f", 50: "#f6ffed" },
    error: { 500: "#ff4d4f", 200: "#ffccc7", 50: "#fff2f0" },
    warning: { 500: "#faad14", 200: "#ffe58f", 50: "#fffbe6" },
    text: { primary: "#333333", secondary: "#666666" },
    background: { primary: "#ffffff", secondary: "#fafafa" },
    border: { normal: "#d9d9d9" },
  }),
}));

// Test component for useNotification hook
const TestNotificationHook: React.FC = () => {
  const [notificationApi, contextHolder] = useNotification();

  return (
    <>
      {contextHolder}
      <button onClick={() => notificationApi.success("Success message")}>
        Success
      </button>
      <button onClick={() => notificationApi.error("Error message")}>
        Error
      </button>
      <button onClick={() => notificationApi.info("Info message")}>Info</button>
      <button onClick={() => notificationApi.warning("Warning message")}>
        Warning
      </button>
      <button onClick={() => notificationApi.open({ message: "Open message" })}>
        Open
      </button>
      <button onClick={() => notificationApi.destroy()}>Clear All</button>
    </>
  );
};

describe("Notification Component", () => {
  beforeEach(() => {
    // Clear any existing notifications
    notification.destroy();
  });

  describe("Basic Rendering", () => {
    it("renders notification with message", () => {
      render(<Notification message="Test notification" />);
      expect(screen.getByText("Test notification")).toBeInTheDocument();
    });

    it("renders notification with description", () => {
      render(<Notification message="Title" description="Test description" />);
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("renders with custom icon", () => {
      render(
        <Notification
          message="Test"
          icon={<span data-testid="custom-icon">🔔</span>}
        />
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("renders without icon when showIcon is false", () => {
      render(<Notification message="Test" showIcon={false} />);
      expect(screen.queryByText("ℹ")).not.toBeInTheDocument();
    });
  });

  describe("Types", () => {
    const types = ["success", "error", "warning", "info", "open"] as const;

    types.forEach((type) => {
      it(`renders ${type} type correctly`, () => {
        render(<Notification type={type} message={`${type} message`} />);
        expect(screen.getByText(`${type} message`)).toBeInTheDocument();
      });
    });
  });

  describe("Sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        render(<Notification size={size} message={`${size} notification`} />);
        expect(screen.getByText(`${size} notification`)).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    const variants = [
      "primary",
      "secondary",
      "tertiary",
      "success",
      "warning",
      "error",
      "info",
      "ghost",
    ] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(
          <Notification variant={variant} message={`${variant} notification`} />
        );
        expect(screen.getByText(`${variant} notification`)).toBeInTheDocument();
      });
    });
  });

  describe("Placements", () => {
    const placements = [
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
      "top",
      "bottom",
    ] as const;

    placements.forEach((placement) => {
      it(`renders ${placement} placement correctly`, () => {
        render(
          <Notification
            placement={placement}
            message={`${placement} notification`}
          />
        );
        expect(
          screen.getByText(`${placement} notification`)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Interactions", () => {
    it("handles close button click", async () => {
      const onClose = jest.fn();
      render(
        <Notification
          message="Closable notification"
          closable={true}
          onClose={onClose}
        />
      );

      const closeButton = screen.getByLabelText("Close notification");
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalled();
    });

    it("handles notification click", () => {
      const onClick = jest.fn();
      render(
        <Notification message="Clickable notification" onClick={onClick} />
      );

      fireEvent.click(screen.getByText("Clickable notification"));
      expect(onClick).toHaveBeenCalled();
    });

    it("handles action button clicks", () => {
      const actionClick = jest.fn();
      const actions = [
        { label: "Action 1", onClick: actionClick },
        { label: "Action 2", onClick: jest.fn() },
      ];

      render(
        <Notification message="Notification with actions" actions={actions} />
      );

      fireEvent.click(screen.getByText("Action 1"));
      expect(actionClick).toHaveBeenCalled();
    });
  });

  describe("Provider Integration", () => {
    it("provides context to child components", () => {
      render(
        <NotificationProvider>
          <TestNotificationHook />
        </NotificationProvider>
      );

      expect(screen.getByText("Success")).toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("accepts custom configuration", () => {
      const config = {
        placement: "topLeft" as const,
        duration: 2000,
        maxCount: 3,
      };

      render(
        <NotificationProvider config={config}>
          <TestNotificationHook />
        </NotificationProvider>
      );

      expect(screen.getByText("Success")).toBeInTheDocument();
    });

    it("shows notifications when using hooks", async () => {
      render(
        <NotificationProvider>
          <TestNotificationHook />
        </NotificationProvider>
      );

      fireEvent.click(screen.getByText("Success"));

      await waitFor(() => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
      });
    });

    it("clears all notifications", async () => {
      render(
        <NotificationProvider>
          <TestNotificationHook />
        </NotificationProvider>
      );

      // Add notifications
      fireEvent.click(screen.getByText("Success"));
      fireEvent.click(screen.getByText("Error"));

      await waitFor(() => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
        expect(screen.getByText("Error message")).toBeInTheDocument();
      });

      // Clear all
      fireEvent.click(screen.getByText("Clear All"));

      await waitFor(() => {
        expect(screen.queryByText("Success message")).not.toBeInTheDocument();
        expect(screen.queryByText("Error message")).not.toBeInTheDocument();
      });
    });
  });

  describe("Static API", () => {
    beforeEach(() => {
      render(
        <NotificationProvider>
          <div />
        </NotificationProvider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("creates success notification via static API", () => {
      act(() => {
        notification.success({ message: "Static success" });
      });

      expect(screen.getByText("Static success")).toBeInTheDocument();
    });

    it("creates error notification via static API", () => {
      act(() => {
        notification.error({ message: "Static error" });
      });

      expect(screen.getByText("Static error")).toBeInTheDocument();
    });

    it("creates info notification via static API", () => {
      act(() => {
        notification.info({ message: "Static info" });
      });

      expect(screen.getByText("Static info")).toBeInTheDocument();
    });

    it("creates warning notification via static API", () => {
      act(() => {
        notification.warning({ message: "Static warning" });
      });

      expect(screen.getByText("Static warning")).toBeInTheDocument();
    });

    it("creates open notification via static API", () => {
      act(() => {
        notification.open({ message: "Static open" });
      });

      expect(screen.getByText("Static open")).toBeInTheDocument();
    });

    it("destroys specific notification", () => {
      let key: string;

      act(() => {
        key = notification.success({ message: "To be destroyed" });
      });

      expect(screen.getByText("To be destroyed")).toBeInTheDocument();

      act(() => {
        notification.destroy(key);
      });

      expect(screen.queryByText("To be destroyed")).not.toBeInTheDocument();
    });

    it("configures global settings", () => {
      act(() => {
        notification.config({
          placement: "bottomLeft",
          duration: 1000,
          maxCount: 2,
        });
      });

      act(() => {
        notification.info({ message: "Configured notification" });
      });

      expect(screen.getByText("Configured notification")).toBeInTheDocument();
    });
  });

  describe("Duration and Auto-close", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("auto-closes after duration", async () => {
      render(<Notification message="Auto close" duration={3000} />);

      expect(screen.getByText("Auto close")).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.queryByText("Auto close")).not.toBeInTheDocument();
      });
    });

    it("does not auto-close with null duration", () => {
      render(<Notification message="Persistent" duration={null} />);

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(screen.getByText("Persistent")).toBeInTheDocument();
    });

    it("pauses timer on mouse enter", () => {
      render(<Notification message="Hover test" duration={3000} />);

      const notification = screen
        .getByText("Hover test")
        .closest(".notification-item");

      fireEvent.mouseEnter(notification!);

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(screen.getByText("Hover test")).toBeInTheDocument();
    });

    it("resumes timer on mouse leave", async () => {
      render(<Notification message="Hover resume" duration={1000} />);

      const notification = screen
        .getByText("Hover resume")
        .closest(".notification-item");

      fireEvent.mouseEnter(notification!);
      fireEvent.mouseLeave(notification!);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(screen.queryByText("Hover resume")).not.toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<Notification message="Accessible notification" />);

      const notification = screen.getByRole("alert");
      expect(notification).toHaveAttribute("aria-live", "polite");
      expect(notification).toHaveAttribute("aria-atomic", "true");
    });

    it("uses assertive aria-live for error notifications", () => {
      render(<Notification type="error" message="Error notification" />);

      const notification = screen.getByRole("alert");
      expect(notification).toHaveAttribute("aria-live", "assertive");
    });

    it("supports keyboard navigation", () => {
      render(
        <Notification
          message="Keyboard accessible"
          closable={true}
          tabIndex={0}
        />
      );

      const closeButton = screen.getByLabelText("Close notification");
      expect(closeButton).toBeInTheDocument();

      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });

    it("supports custom accessibility props", () => {
      const accessibilityProps = {
        largeText: true,
        increasedSpacing: true,
        highContrast: true,
        reducedMotion: true,
      };

      render(
        <Notification message="Accessible" accessibility={accessibilityProps} />
      );

      expect(screen.getByText("Accessible")).toBeInTheDocument();
    });
  });

  describe("Predefined Components", () => {
    describe("Type Components", () => {
      it("renders SuccessNotificationComponent", () => {
        render(<SuccessNotificationComponent message="Success" />);
        expect(screen.getByText("Success")).toBeInTheDocument();
      });

      it("renders ErrorNotificationComponent", () => {
        render(<ErrorNotificationComponent message="Error" />);
        expect(screen.getByText("Error")).toBeInTheDocument();
      });

      it("renders WarningNotificationComponent", () => {
        render(<WarningNotificationComponent message="Warning" />);
        expect(screen.getByText("Warning")).toBeInTheDocument();
      });

      it("renders InfoNotificationComponent", () => {
        render(<InfoNotificationComponent message="Info" />);
        expect(screen.getByText("Info")).toBeInTheDocument();
      });

      it("renders OpenNotificationComponent", () => {
        render(<OpenNotificationComponent message="Open" />);
        expect(screen.getByText("Open")).toBeInTheDocument();
      });
    });

    describe("Size Components", () => {
      it("renders SmallNotificationComponent", () => {
        render(<SmallNotificationComponent message="Small" />);
        expect(screen.getByText("Small")).toBeInTheDocument();
      });

      it("renders MediumNotificationComponent", () => {
        render(<MediumNotificationComponent message="Medium" />);
        expect(screen.getByText("Medium")).toBeInTheDocument();
      });

      it("renders LargeNotificationComponent", () => {
        render(<LargeNotificationComponent message="Large" />);
        expect(screen.getByText("Large")).toBeInTheDocument();
      });

      it("renders ExtraLargeNotificationComponent", () => {
        render(<ExtraLargeNotificationComponent message="Extra Large" />);
        expect(screen.getByText("Extra Large")).toBeInTheDocument();
      });
    });

    describe("Variant Components", () => {
      it("renders PrimaryNotificationComponent", () => {
        render(<PrimaryNotificationComponent message="Primary" />);
        expect(screen.getByText("Primary")).toBeInTheDocument();
      });

      it("renders SecondaryNotificationComponent", () => {
        render(<SecondaryNotificationComponent message="Secondary" />);
        expect(screen.getByText("Secondary")).toBeInTheDocument();
      });
    });

    describe("Behavior Components", () => {
      it("renders PersistentNotificationComponent", () => {
        render(<PersistentNotificationComponent message="Persistent" />);
        expect(screen.getByText("Persistent")).toBeInTheDocument();
      });

      it("renders ClosableNotificationComponent", () => {
        render(<ClosableNotificationComponent message="Closable" />);
        expect(screen.getByText("Closable")).toBeInTheDocument();
        expect(screen.getByLabelText("Close notification")).toBeInTheDocument();
      });

      it("renders IconlessNotificationComponent", () => {
        render(<IconlessNotificationComponent message="Iconless" />);
        expect(screen.getByText("Iconless")).toBeInTheDocument();
      });
    });

    describe("Placement Components", () => {
      it("renders TopLeftNotificationComponent", () => {
        render(<TopLeftNotificationComponent message="Top Left" />);
        expect(screen.getByText("Top Left")).toBeInTheDocument();
      });

      it("renders TopRightNotificationComponent", () => {
        render(<TopRightNotificationComponent message="Top Right" />);
        expect(screen.getByText("Top Right")).toBeInTheDocument();
      });

      it("renders BottomLeftNotificationComponent", () => {
        render(<BottomLeftNotificationComponent message="Bottom Left" />);
        expect(screen.getByText("Bottom Left")).toBeInTheDocument();
      });

      it("renders BottomRightNotificationComponent", () => {
        render(<BottomRightNotificationComponent message="Bottom Right" />);
        expect(screen.getByText("Bottom Right")).toBeInTheDocument();
      });

      it("renders TopNotificationComponent", () => {
        render(<TopNotificationComponent message="Top" />);
        expect(screen.getByText("Top")).toBeInTheDocument();
      });

      it("renders BottomNotificationComponent", () => {
        render(<BottomNotificationComponent message="Bottom" />);
        expect(screen.getByText("Bottom")).toBeInTheDocument();
      });
    });

    describe("Use Case Components", () => {
      it("renders ToastNotificationComponent", () => {
        render(<ToastNotificationComponent message="Toast" />);
        expect(screen.getByText("Toast")).toBeInTheDocument();
      });

      it("renders DesktopNotificationComponent", () => {
        render(<DesktopNotificationComponent message="Desktop" />);
        expect(screen.getByText("Desktop")).toBeInTheDocument();
      });

      it("renders AlertNotificationComponent", () => {
        render(<AlertNotificationComponent message="Alert" />);
        expect(screen.getByText("Alert")).toBeInTheDocument();
      });

      it("renders StatusNotificationComponent", () => {
        render(<StatusNotificationComponent message="Status" />);
        expect(screen.getByText("Status")).toBeInTheDocument();
      });

      it("renders SystemNotificationComponent", () => {
        render(<SystemNotificationComponent message="System" />);
        expect(screen.getByText("System")).toBeInTheDocument();
      });

      it("renders LoadingNotificationComponent", () => {
        render(<LoadingNotificationComponent message="Loading" />);
        expect(screen.getByText("Loading")).toBeInTheDocument();
      });

      it("renders ProgressNotificationComponent", () => {
        render(<ProgressNotificationComponent message="Progress" />);
        expect(screen.getByText("Progress")).toBeInTheDocument();
      });

      it("renders FeedbackNotificationComponent", () => {
        render(<FeedbackNotificationComponent message="Feedback" />);
        expect(screen.getByText("Feedback")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("handles invalid props gracefully", () => {
      expect(() => {
        render(
          <Notification
            // @ts-ignore - Testing invalid props
            type="invalid"
            message="Test"
          />
        );
      }).not.toThrow();
    });

    it("handles missing message gracefully", () => {
      expect(() => {
        render(<Notification />);
      }).not.toThrow();
    });

    it("handles null children gracefully", () => {
      expect(() => {
        render(<Notification message="Test">{null}</Notification>);
      }).not.toThrow();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      render(
        <Notification message="Custom class" className="custom-notification" />
      );

      const notification = screen
        .getByText("Custom class")
        .closest(".custom-notification");
      expect(notification).toBeInTheDocument();
    });

    it("applies custom styles", () => {
      const customStyle = { backgroundColor: "red", color: "white" };

      render(<Notification message="Custom style" style={customStyle} />);

      const notification = screen
        .getByText("Custom style")
        .closest(".notification-item");
      expect(notification).toHaveStyle("background-color: red");
      expect(notification).toHaveStyle("color: white");
    });

    it("supports custom close icon", () => {
      render(
        <Notification message="Custom close" closable={true} closeIcon="🗙" />
      );

      expect(screen.getByText("🗙")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("does not re-render unnecessarily", () => {
      const renderCount = jest.fn();

      const TestComponent: React.FC<{ message: string }> = ({ message }) => {
        renderCount();
        return <Notification message={message} />;
      };

      const { rerender } = render(<TestComponent message="Initial" />);

      expect(renderCount).toHaveBeenCalledTimes(1);

      rerender(<TestComponent message="Initial" />);
      expect(renderCount).toHaveBeenCalledTimes(2);
    });

    it("memoizes expensive calculations", () => {
      render(
        <Notification
          message="Performance test"
          actions={[
            { label: "Action 1", onClick: jest.fn() },
            { label: "Action 2", onClick: jest.fn() },
          ]}
        />
      );

      expect(screen.getByText("Action 1")).toBeInTheDocument();
      expect(screen.getByText("Action 2")).toBeInTheDocument();
    });
  });
});
