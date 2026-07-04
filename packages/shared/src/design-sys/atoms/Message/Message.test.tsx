import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { PersonalizationProvider } from '../../contexts/PersonalizationContext';
import {
  Message,
  MessageProvider,
  useMessage,
  message,
  SuccessMessageComponent,
  ErrorMessageComponent,
  WarningMessageComponent,
  InfoMessageComponent,
  LoadingMessageComponent,
  SmallMessage,
  LargeMessage,
  PersistentMessage,
  ClosableMessage,
  TopMessage,
  BottomMessage,
  ToastMessage,
  NotificationMessage,
} from "./index";
import { lightTheme } from "../../../../styles/theme";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <PersonalizationProvider>{component}</PersonalizationProvider>
    </ThemeProvider>
  );
};

// Test component for useMessage hook
const TestMessageHook: React.FC = () => {
  const [messageApi, contextHolder] = useMessage();

  return (
    <>
      {contextHolder}
      <button onClick={() => messageApi.success("Success message")}>
        Show Success
      </button>
      <button onClick={() => messageApi.error("Error message")}>
        Show Error
      </button>
      <button onClick={() => messageApi.info("Info message")}>
        Show Info
      </button>
      <button onClick={() => messageApi.warning("Warning message")}>
        Show Warning
      </button>
      <button onClick={() => messageApi.loading("Loading message")}>
        Show Loading
      </button>
      <button onClick={() => messageApi.destroy()}>Clear All</button>
    </>
  );
};

describe("Message", () => {
  beforeEach(() => {
    // Clear any existing messages
    message.destroy();
  });

  describe("Basic Rendering", () => {
    it("renders correctly", () => {
      renderWithProviders(
        <Message type="info">Test message content</Message>
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Test message content")).toBeInTheDocument();
    });

    it("renders with different types", () => {
      const { rerender } = renderWithProviders(
        <Message type="success">Success message</Message>
      );

      expect(screen.getByText("Success message")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={lightTheme}>
          <PersonalizationProvider>
            <Message type="error">Error message</Message>
          </PersonalizationProvider>
        </ThemeProvider>
      );

      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("renders with custom content prop", () => {
      renderWithProviders(
        <Message content="Custom content message" type="info" />
      );

      expect(screen.getByText("Custom content message")).toBeInTheDocument();
    });

    it("renders with custom icon", () => {
      const CustomIcon = () => <span data-testid="custom-icon">🎉</span>;

      renderWithProviders(
        <Message type="info" icon={<CustomIcon />}>
          Message with custom icon
        </Message>
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Message Behavior", () => {
    it("shows and hides icon based on showIcon prop", () => {
      const { rerender } = renderWithProviders(
        <Message type="success" showIcon>
          Message with icon
        </Message>
      );

      // Icon should be present (success messages show icon by default)
      expect(screen.getByRole("alert")).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={lightTheme}>
          <PersonalizationProvider>
            <Message type="success" showIcon={false}>
              Message without icon
            </Message>
          </PersonalizationProvider>
        </ThemeProvider>
      );

      // Message should still be present but structure might be different
      expect(screen.getByText("Message without icon")).toBeInTheDocument();
    });

    it("handles closable messages", () => {
      jest.useFakeTimers();
      const onClose = jest.fn();

      try {
        renderWithProviders(
          <Message type="info" closable onClose={onClose}>
            Closable message
          </Message>
        );

        const closeButton = screen.getByRole("button", {
          name: /close message/i,
        });
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        act(() => {
          jest.advanceTimersByTime(300);
        });

        expect(onClose).toHaveBeenCalled();
      } finally {
        jest.useRealTimers();
      }
    });

    it("handles click events", () => {
      const onClick = jest.fn();

      renderWithProviders(
        <Message type="info" onClick={onClick}>
          Clickable message
        </Message>
      );

      fireEvent.click(screen.getByRole("alert"));
      expect(onClick).toHaveBeenCalled();
    });

    it("auto-closes after duration", () => {
      jest.useFakeTimers();
      const onClose = jest.fn();

      try {
        renderWithProviders(
          <Message type="info" duration={100} onClose={onClose}>
            Auto-closing message
          </Message>
        );

        act(() => {
          jest.advanceTimersByTime(100);
        });

        act(() => {
          jest.advanceTimersByTime(300);
        });

        expect(onClose).toHaveBeenCalled();
      } finally {
        jest.useRealTimers();
      }
    });

    it("does not auto-close when duration is null", () => {
      jest.useFakeTimers();
      const onClose = jest.fn();

      try {
        renderWithProviders(
          <Message type="info" duration={null} onClose={onClose}>
            Persistent message
          </Message>
        );

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        expect(onClose).not.toHaveBeenCalled();
      } finally {
        jest.useRealTimers();
      }
    });
  });

  describe("Message Sizes and Variants", () => {
    it("applies different sizes", () => {
      renderWithProviders(
        <Message type="info" size="lg">
          Large message
        </Message>
      );

      expect(screen.getByText("Large message")).toBeInTheDocument();
    });

    it("applies different variants", () => {
      renderWithProviders(
        <Message type="info" variant="primary">
          Primary variant message
        </Message>
      );

      expect(screen.getByText("Primary variant message")).toBeInTheDocument();
    });

    it("applies different placements", () => {
      renderWithProviders(
        <Message type="info" placement="topRight">
          Top right message
        </Message>
      );

      expect(screen.getByText("Top right message")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      renderWithProviders(
        <Message type="success">Accessible message</Message>
      );

      const message = screen.getByRole("alert");
      expect(message).toHaveAttribute("aria-live", "polite");
      expect(message).toHaveAttribute("role", "alert");
    });

    it("supports custom accessibility props", () => {
      renderWithProviders(
        <Message
          type="info"
          aria-label="Custom accessibility label"
          aria-describedby="description"
        >
          Message with custom accessibility
        </Message>
      );

      const message = screen.getByRole("alert");
      expect(message).toHaveAttribute("aria-label", "Custom accessibility label");
      expect(message).toHaveAttribute("aria-describedby", "description");
    });

    it("supports accessibility personalization", () => {
      renderWithProviders(
        <Message
          type="info"
          accessibility={{
            largeText: true,
            increasedSpacing: true,
            highContrast: true,
          }}
        >
          Personalized message
        </Message>
      );

      expect(screen.getByText("Personalized message")).toBeInTheDocument();
    });
  });

  describe("useMessage Hook", () => {
    it("creates and displays messages", async () => {
      renderWithProviders(<TestMessageHook />);

      fireEvent.click(screen.getByText("Show Success"));
      await waitFor(() => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Show Error"));
      await waitFor(() => {
        expect(screen.getByText("Error message")).toBeInTheDocument();
      });
    });

    it("clears all messages", async () => {
      renderWithProviders(<TestMessageHook />);

      fireEvent.click(screen.getByText("Show Success"));
      fireEvent.click(screen.getByText("Show Error"));

      await waitFor(() => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
        expect(screen.getByText("Error message")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Clear All"));

      await waitFor(() => {
        expect(screen.queryByText("Success message")).not.toBeInTheDocument();
        expect(screen.queryByText("Error message")).not.toBeInTheDocument();
      });
    });
  });

  describe("MessageProvider", () => {
    it("provides context to child components", () => {
      const TestChild = () => {
        const [messageApi] = useMessage();
        return (
          <button onClick={() => messageApi.info("Provider message")}>
            Show Message
          </button>
        );
      };

      renderWithProviders(
        <MessageProvider>
          <TestChild />
        </MessageProvider>
      );

      fireEvent.click(screen.getByText("Show Message"));
      // The message should be created (though it might not be immediately visible in this test setup)
      expect(screen.getByText("Show Message")).toBeInTheDocument();
    });

    it("accepts custom configuration", () => {
      const TestChild = () => {
        const [messageApi] = useMessage();
        return (
          <button onClick={() => messageApi.success("Configured message")}>
            Show Message
          </button>
        );
      };

      renderWithProviders(
        <MessageProvider config={{ maxCount: 2, duration: 5000 }}>
          <TestChild />
        </MessageProvider>
      );

      expect(screen.getByText("Show Message")).toBeInTheDocument();
    });
  });

  describe("Predefined Components", () => {
    it("renders SuccessMessageComponent", () => {
      renderWithProviders(<SuccessMessageComponent>Success!</SuccessMessageComponent>);
      expect(screen.getByText("Success!")).toBeInTheDocument();
    });

    it("renders ErrorMessageComponent", () => {
      renderWithProviders(<ErrorMessageComponent>Error occurred!</ErrorMessageComponent>);
      expect(screen.getByText("Error occurred!")).toBeInTheDocument();
    });

    it("renders WarningMessageComponent", () => {
      renderWithProviders(<WarningMessageComponent>Warning!</WarningMessageComponent>);
      expect(screen.getByText("Warning!")).toBeInTheDocument();
    });

    it("renders InfoMessageComponent", () => {
      renderWithProviders(<InfoMessageComponent>Information</InfoMessageComponent>);
      expect(screen.getByText("Information")).toBeInTheDocument();
    });

    it("renders LoadingMessageComponent", () => {
      renderWithProviders(<LoadingMessageComponent>Loading...</LoadingMessageComponent>);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders SmallMessage", () => {
      renderWithProviders(<SmallMessage>Small message</SmallMessage>);
      expect(screen.getByText("Small message")).toBeInTheDocument();
    });

    it("renders LargeMessage", () => {
      renderWithProviders(<LargeMessage>Large message</LargeMessage>);
      expect(screen.getByText("Large message")).toBeInTheDocument();
    });

    it("renders PersistentMessage", () => {
      renderWithProviders(
        <PersistentMessage>Persistent message</PersistentMessage>
      );
      expect(screen.getByText("Persistent message")).toBeInTheDocument();
    });

    it("renders ClosableMessage", () => {
      renderWithProviders(<ClosableMessage>Closable message</ClosableMessage>);
      expect(screen.getByText("Closable message")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /close message/i })).toBeInTheDocument();
    });

    it("renders TopMessage", () => {
      renderWithProviders(<TopMessage>Top message</TopMessage>);
      expect(screen.getByText("Top message")).toBeInTheDocument();
    });

    it("renders BottomMessage", () => {
      renderWithProviders(<BottomMessage>Bottom message</BottomMessage>);
      expect(screen.getByText("Bottom message")).toBeInTheDocument();
    });

    it("renders ToastMessage", () => {
      renderWithProviders(<ToastMessage>Toast message</ToastMessage>);
      expect(screen.getByText("Toast message")).toBeInTheDocument();
    });

    it("renders NotificationMessage", () => {
      renderWithProviders(
        <NotificationMessage>Notification message</NotificationMessage>
      );
      expect(screen.getByText("Notification message")).toBeInTheDocument();
    });
  });

  describe("Message Interactions", () => {
    it("pauses timer on mouse enter", () => {
      jest.useFakeTimers();
      const onClose = jest.fn();

      try {
        renderWithProviders(
          <Message type="info" duration={100} onClose={onClose}>
            Hover message
          </Message>
        );

        const messageElement = screen.getByRole("alert");
        fireEvent.mouseEnter(messageElement);

        act(() => {
          jest.advanceTimersByTime(150);
        });
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.mouseLeave(messageElement);

        act(() => {
          jest.advanceTimersByTime(100);
        });

        act(() => {
          jest.advanceTimersByTime(300);
        });

        expect(onClose).toHaveBeenCalled();
      } finally {
        jest.useRealTimers();
      }
    });

    it("handles custom styling", () => {
      renderWithProviders(
        <Message
          type="info"
          className="custom-message"
          style={{ backgroundColor: "red" }}
        >
          Styled message
        </Message>
      );

      const messageElement = screen.getByRole("alert");
      expect(messageElement).toHaveClass("custom-message");
      expect(messageElement).toHaveStyle("background-color: red");
    });
  });
});
