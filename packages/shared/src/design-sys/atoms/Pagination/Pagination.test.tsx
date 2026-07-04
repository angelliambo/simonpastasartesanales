import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Pagination, usePagination, usePaginationItems } from "./index";
import {
  SmallPagination,
  MediumPagination,
  LargePaginationComponent,
  PrimaryPagination,
  SecondaryPagination,
  LeftPagination,
  CenterPagination,
  RightPagination,
  SimplePaginationComponent,
  ResponsivePaginationComponent,
  CompletePaginationComponent,
  TablePagination,
  ListPagination,
  GridPagination,
  MobilePaginationComponent,
  MinimalPaginationComponent,
  CompactPaginationComponent,
  HighContrastPaginationComponent,
  LargeTextPaginationComponent,
  ReducedMotionPagination,
  AdminPagination,
  SearchPagination,
  InfinitePagination,
  LoadingPagination,
} from "./index";
import { PAGINATION_DEFAULTS } from "./Pagination.types";

// =============================================================================
// MOCKS
// =============================================================================

jest.mock("../../../../contexts/PersonalizationContext", () => ({
  usePersonalization: jest.fn(() => ({
    accessibility: {
      reduceMotion: false,
      disableAnimations: false,
      highContrast: false,
      fontSizeMultiplier: 1,
      increasedSpacing: false,
    },
  })),
}));

jest.mock("../../../../hooks/useThemeColors", () => ({
  useThemeColors: jest.fn(() => ({
    primary: { 500: "#1976d2", 50: "#e3f2fd", 100: "#bbdefb", 600: "#1565c0", 700: "#1976d2", 200: "#90caf9", 300: "#64b5f6" },
    secondary: { 500: "#dc004e", 50: "#fce4ec", 100: "#f8bbd9", 600: "#c51162" },
    success: { 500: "#2e7d32", 50: "#e8f5e8", 100: "#c8e6c9", 600: "#1b5e20", 700: "#2e7d32", 200: "#81c784", 300: "#66bb6a" },
    warning: { 500: "#ed6c02", 50: "#fff3e0", 100: "#ffe0b2", 600: "#e65100", 700: "#ed6c02", 200: "#ffb74d", 300: "#ffa726" },
    error: { 500: "#d32f2f", 50: "#ffebee", 100: "#ffcdd2", 600: "#c62828", 700: "#d32f2f", 200: "#ef5350", 300: "#f44336" },
    info: { 500: "#0288d1", 50: "#e1f5fe", 100: "#b3e5fc", 600: "#0277bd", 700: "#0288d1", 200: "#4fc3f7", 300: "#29b6f6" },
    neutral: { 500: "#9e9e9e", 50: "#fafafa", 100: "#f5f5f5", 600: "#757575", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd" },
    background: { primary: "#ffffff", secondary: "#f5f5f5", tertiary: "#e0e0e0" },
    text: { primary: "#212121", secondary: "#757575", disabled: "#bdbdbd", inverse: "#ffffff" },
    border: { normal: "#e0e0e0", light: "#f0f0f0", dark: "#bdbdbd" },
    shadow: "0 2px 8px rgba(0,0,0,0.1)",
    overlay: "rgba(0,0,0,0.45)",
  })),
}));

// Theme for testing
const testTheme = {
  colors: {
    primary: { 500: "#1976d2" },
    background: { primary: "#ffffff", secondary: "#f5f5f5" },
    text: { primary: "#212121", secondary: "#757575" },
    border: { normal: "#e0e0e0", light: "#f0f0f0" },
  },
};

// =============================================================================
// TEST UTILITIES
// =============================================================================

const renderPagination = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={testTheme as any}>
      {ui}
    </ThemeProvider>
  );
};

// =============================================================================
// BASIC TESTS
// =============================================================================

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // RENDERING TESTS
  // ---------------------------------------------------------------------------

  it("renders correctly", () => {
    renderPagination(<Pagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("aria-label", "Pagination navigation");
  });

  it("renders with custom className", () => {
    renderPagination(<Pagination total={100} className="custom-class" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("pagination", "custom-class");
  });

  it("renders with custom style", () => {
    const customStyle = { backgroundColor: "red" };
    renderPagination(<Pagination total={100} style={customStyle} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveStyle("background-color: red");
  });

  it("renders pagination items", () => {
    renderPagination(<Pagination total={100} current={5} />);
    
    // Should have prev, next, and current page
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 5")).toBeInTheDocument();
  });

  it("hides on single page when hideOnSinglePage is true", () => {
    renderPagination(<Pagination total={5} pageSize={10} hideOnSinglePage={true} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("shows on single page when hideOnSinglePage is false", () => {
    renderPagination(<Pagination total={5} pageSize={10} hideOnSinglePage={false} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // SIZE TESTS
  // ---------------------------------------------------------------------------

  it("applies size prop correctly", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
    
    sizes.forEach((size) => {
      const { unmount } = renderPagination(<Pagination total={100} size={size} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("data-size", size);
      unmount();
    });
  });

  // ---------------------------------------------------------------------------
  // VARIANT TESTS
  // ---------------------------------------------------------------------------

  it("applies variant prop correctly", () => {
    const variants = ["primary", "secondary", "success", "warning", "error", "info", "ghost"] as const;
    
    variants.forEach((variant) => {
      const { unmount } = renderPagination(<Pagination total={100} variant={variant} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("data-variant", variant);
      unmount();
    });
  });

  // ---------------------------------------------------------------------------
  // POSITION TESTS
  // ---------------------------------------------------------------------------

  it("applies position prop correctly", () => {
    const positions = ["left", "center", "right"] as const;
    
    positions.forEach((position) => {
      const { unmount } = renderPagination(<Pagination total={100} position={position} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("data-position", position);
      unmount();
    });
  });

  // ---------------------------------------------------------------------------
  // SIMPLE MODE TESTS
  // ---------------------------------------------------------------------------

  it("renders in simple mode", () => {
    renderPagination(<Pagination total={100} current={5} simple={true} />);
    
    // Should only show prev, next, and current
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    
    // Other pages should be hidden in simple mode
    expect(screen.queryByLabelText("Page 1")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Page 6")).not.toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // CLICK BEHAVIOR TESTS
  // ---------------------------------------------------------------------------

  it("handles page clicks", () => {
    const handleChange = jest.fn();
    renderPagination(<Pagination total={100} current={1} onChange={handleChange} />);
    
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);
    
    expect(handleChange).toHaveBeenCalledWith(2, 10);
  });

  it("handles previous page click", () => {
    const handleChange = jest.fn();
    renderPagination(<Pagination total={100} current={5} onChange={handleChange} />);
    
    const prevButton = screen.getByLabelText("Previous page");
    fireEvent.click(prevButton);
    
    expect(handleChange).toHaveBeenCalledWith(4, 10);
  });

  it("handles direct page click", () => {
    const handleChange = jest.fn();
    renderPagination(<Pagination total={100} current={1} onChange={handleChange} />);
    
    const pageButton = screen.getByLabelText("Page 3");
    fireEvent.click(pageButton);
    
    expect(handleChange).toHaveBeenCalledWith(3, 10);
  });

  it("disables prev button on first page", () => {
    renderPagination(<Pagination total={100} current={1} />);
    
    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    renderPagination(<Pagination total={100} current={10} pageSize={10} />);
    
    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("handles disabled state", () => {
    renderPagination(<Pagination total={100} current={5} disabled={true} />);
    
    const allButtons = screen.getAllByRole("button");
    allButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  // ---------------------------------------------------------------------------
  // SHOW TOTAL TESTS
  // ---------------------------------------------------------------------------

  it("shows total when showTotal is true", () => {
    renderPagination(<Pagination total={100} current={1} pageSize={10} showTotal={true} />);
    
    expect(screen.getByText("1-10 of 100 items")).toBeInTheDocument();
  });

  it("uses custom showTotal function", () => {
    const customShowTotal = (total: number, range: [number, number]) => 
      `Items ${range[0]} to ${range[1]} of ${total}`;
    
    renderPagination(
      <Pagination 
        total={100} 
        current={2} 
        pageSize={10} 
        showTotal={customShowTotal} 
      />
    );
    
    expect(screen.getByText("Items 11 to 20 of 100")).toBeInTheDocument();
  });

  it("hides total when showTotal is false", () => {
    renderPagination(<Pagination total={100} current={1} pageSize={10} showTotal={false} />);
    
    expect(screen.queryByText(/items/i)).not.toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // SIZE CHANGER TESTS
  // ---------------------------------------------------------------------------

  it("shows size changer when showSizeChanger is true", () => {
    renderPagination(<Pagination total={100} showSizeChanger={true} />);
    
    expect(screen.getByLabelText("Page size selector")).toBeInTheDocument();
  });

  it("handles size change", () => {
    const handleShowSizeChange = jest.fn();
    renderPagination(
      <Pagination 
        total={100} 
        showSizeChanger={true} 
        onShowSizeChange={handleShowSizeChange}
      />
    );
    
    const sizeChanger = screen.getByLabelText("Page size selector");
    fireEvent.change(sizeChanger, { target: { value: "20" } });
    
    expect(handleShowSizeChange).toHaveBeenCalledWith(1, 20);
  });

  it("uses custom pageSizeOptions", () => {
    renderPagination(
      <Pagination 
        total={100} 
        showSizeChanger={true} 
        pageSizeOptions={["5", "15", "25"]}
      />
    );
    
    expect(screen.getByText("5 / page")).toBeInTheDocument();
    expect(screen.getByText("15 / page")).toBeInTheDocument();
    expect(screen.getByText("25 / page")).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // QUICK JUMPER TESTS
  // ---------------------------------------------------------------------------

  it("shows quick jumper when showQuickJumper is true", () => {
    renderPagination(<Pagination total={100} showQuickJumper={true} />);
    
    expect(screen.getByText("Go to")).toBeInTheDocument();
    expect(screen.getByLabelText("Jump to page")).toBeInTheDocument();
  });

  it("handles jumper input", () => {
    const handleChange = jest.fn();
    renderPagination(
      <Pagination 
        total={100} 
        showQuickJumper={true} 
        onChange={handleChange}
      />
    );
    
    const jumperInput = screen.getByLabelText("Jump to page");
    fireEvent.change(jumperInput, { target: { value: "5" } });
    fireEvent.keyDown(jumperInput, { key: "Enter" });
    
    expect(handleChange).toHaveBeenCalledWith(5, 10);
  });

  it("shows go button when goButton is true", () => {
    renderPagination(<Pagination total={100} showQuickJumper={true} goButton={true} />);
    
    expect(screen.getByLabelText("Go to page")).toBeInTheDocument();
  });

  it("handles go button click", () => {
    const handleChange = jest.fn();
    renderPagination(
      <Pagination 
        total={100} 
        showQuickJumper={true} 
        goButton={true}
        onChange={handleChange}
      />
    );
    
    const jumperInput = screen.getByLabelText("Jump to page");
    const goButton = screen.getByRole("button", { name: "Go to page" });
    
    fireEvent.change(jumperInput, { target: { value: "7" } });
    fireEvent.click(goButton);
    
    expect(handleChange).toHaveBeenCalledWith(7, 10);
  });

  // ---------------------------------------------------------------------------
  // CONTROLLED/UNCONTROLLED TESTS
  // ---------------------------------------------------------------------------

  it("works as controlled component", () => {
    const handleChange = jest.fn();
    const { rerender } = renderPagination(
      <Pagination total={100} current={1} onChange={handleChange} />
    );
    
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);
    
    expect(handleChange).toHaveBeenCalledWith(2, 10);
    
    // Component should still show current=1 until parent updates prop
    rerender(
      <ThemeProvider theme={testTheme as any}>
        <Pagination total={100} current={2} onChange={handleChange} />
      </ThemeProvider>
    );
    
    expect(screen.getByLabelText("Page 2")).toHaveAttribute("aria-current", "page");
  });

  it("works as uncontrolled component", () => {
    const handleChange = jest.fn();
    renderPagination(
      <Pagination total={100} defaultCurrent={1} onChange={handleChange} />
    );
    
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);
    
    expect(handleChange).toHaveBeenCalledWith(2, 10);
    
    // Should automatically update to show current page
    expect(screen.getByLabelText("Page 2")).toHaveAttribute("aria-current", "page");
  });

  // ---------------------------------------------------------------------------
  // CUSTOM ITEM RENDER TESTS
  // ---------------------------------------------------------------------------

  it("uses custom itemRender", () => {
    const customRender = (page: number, type: string) => {
      if (type === "page") {
        return <span data-testid={`custom-page-${page}`}>P{page}</span>;
      }
      return null;
    };

    renderPagination(
      <Pagination total={100} current={1} itemRender={customRender} />
    );
    
    expect(screen.getByTestId("custom-page-1")).toBeInTheDocument();
    expect(screen.getByText("P1")).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // KEYBOARD NAVIGATION TESTS
  // ---------------------------------------------------------------------------

  it("handles keyboard navigation", () => {
    const handleChange = jest.fn();
    renderPagination(<Pagination total={100} current={1} onChange={handleChange} />);
    
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.keyDown(nextButton, { key: "Enter" });
    
    // Enter key should trigger click
    expect(handleChange).toHaveBeenCalledWith(2, 10);
  });

  // ---------------------------------------------------------------------------
  // ACCESSIBILITY TESTS
  // ---------------------------------------------------------------------------

  it("has proper ARIA attributes", () => {
    renderPagination(<Pagination total={100} current={5} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Pagination navigation");
    expect(nav).toHaveAttribute("role", "navigation");
    
    const currentPage = screen.getByLabelText("Page 5");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  it("applies accessibility props", () => {
    renderPagination(
      <Pagination 
        total={100}
        accessibility={{
          highContrast: true,
          largeText: true,
          reducedMotion: true,
        }}
      />
    );
    
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // REF TESTS
  // ---------------------------------------------------------------------------

  it("exposes ref methods", () => {
    const ref = React.createRef<any>();
    renderPagination(<Pagination total={100} ref={ref} />);
    
    expect(ref.current).toHaveProperty("jump");
    expect(ref.current).toHaveProperty("next");
    expect(ref.current).toHaveProperty("prev");
    expect(ref.current).toHaveProperty("changePageSize");
    expect(ref.current).toHaveProperty("element");
    
    expect(typeof ref.current.jump).toBe("function");
    expect(typeof ref.current.next).toBe("function");
    expect(typeof ref.current.prev).toBe("function");
    expect(typeof ref.current.changePageSize).toBe("function");
  });

  it("jump method works via ref", () => {
    const ref = React.createRef<any>();
    const handleChange = jest.fn();
    renderPagination(<Pagination total={100} onChange={handleChange} ref={ref} />);
    
    ref.current.jump(5);
    
    expect(handleChange).toHaveBeenCalledWith(5, 10);
  });
});

// =============================================================================
// PREDEFINED COMPONENT TESTS
// =============================================================================

describe("Pagination Predefined Components", () => {
  // ---------------------------------------------------------------------------
  // SIZE VARIANTS
  // ---------------------------------------------------------------------------

  it("renders SmallPagination correctly", () => {
    renderPagination(<SmallPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-size", "sm");
  });

  it("renders MediumPagination correctly", () => {
    renderPagination(<MediumPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-size", "md");
  });

  it("renders LargePagination correctly", () => {
    renderPagination(<LargePaginationComponent total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-size", "lg");
  });

  // ---------------------------------------------------------------------------
  // VARIANT STYLES
  // ---------------------------------------------------------------------------

  it("renders PrimaryPagination correctly", () => {
    renderPagination(<PrimaryPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-variant", "primary");
  });

  it("renders SecondaryPagination correctly", () => {
    renderPagination(<SecondaryPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-variant", "secondary");
  });

  // ---------------------------------------------------------------------------
  // POSITION VARIANTS
  // ---------------------------------------------------------------------------

  it("renders LeftPagination correctly", () => {
    renderPagination(<LeftPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "left");
  });

  it("renders CenterPagination correctly", () => {
    renderPagination(<CenterPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "center");
  });

  it("renders RightPagination correctly", () => {
    renderPagination(<RightPagination total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "right");
  });

  // ---------------------------------------------------------------------------
  // BEHAVIOR VARIANTS
  // ---------------------------------------------------------------------------

  it("renders SimplePagination correctly", () => {
    renderPagination(<SimplePaginationComponent total={100} current={5} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-simple", "true");
  });

  it("renders ResponsivePagination correctly", () => {
    renderPagination(<ResponsivePaginationComponent total={100} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-responsive", "true");
  });

  it("renders CompletePagination correctly", () => {
    renderPagination(<CompletePaginationComponent total={100} />);
    
    expect(screen.getByText(/items/)).toBeInTheDocument(); // showTotal
    expect(screen.getByLabelText("Page size selector")).toBeInTheDocument(); // showSizeChanger
    expect(screen.getByText("Go to")).toBeInTheDocument(); // showQuickJumper
  });

  // ---------------------------------------------------------------------------
  // USE CASE VARIANTS
  // ---------------------------------------------------------------------------

  it("renders TablePagination correctly", () => {
    renderPagination(<TablePagination total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "right");
    expect(nav).toHaveAttribute("data-size", "sm");
    expect(screen.getByText(/items/)).toBeInTheDocument();
    expect(screen.getByLabelText("Page size selector")).toBeInTheDocument();
  });

  it("renders ListPagination correctly", () => {
    renderPagination(<ListPagination total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "center");
    expect(screen.queryByText(/items/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Page size selector")).not.toBeInTheDocument();
  });

  it("renders GridPagination correctly", () => {
    renderPagination(<GridPagination total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "center");
    expect(screen.getByText(/items/)).toBeInTheDocument();
    expect(screen.getByLabelText("Page size selector")).toBeInTheDocument();
    expect(screen.getByText("Go to")).toBeInTheDocument();
  });

  it("renders MobilePagination correctly", () => {
    renderPagination(<MobilePaginationComponent total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-responsive", "true");
    expect(nav).toHaveAttribute("data-size", "sm");
  });

  it("renders MinimalPagination correctly", () => {
    renderPagination(<MinimalPaginationComponent total={100} current={5} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-simple", "true");
    expect(nav).toHaveAttribute("data-variant", "ghost");
  });

  it("renders CompactPagination correctly", () => {
    renderPagination(<CompactPaginationComponent total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-size", "xs");
  });

  // ---------------------------------------------------------------------------
  // ACCESSIBILITY VARIANTS
  // ---------------------------------------------------------------------------

  it("renders HighContrastPagination correctly", () => {
    renderPagination(<HighContrastPaginationComponent total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-variant", "primary");
    expect(nav).toHaveAttribute("data-size", "lg");
  });

  it("renders LargeTextPagination correctly", () => {
    renderPagination(<LargeTextPaginationComponent total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-size", "xl");
  });

  it("renders ReducedMotionPagination correctly", () => {
    renderPagination(<ReducedMotionPagination total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // ADVANCED VARIANTS
  // ---------------------------------------------------------------------------

  it("renders AdminPagination correctly", () => {
    renderPagination(<AdminPagination total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "right");
    expect(screen.getByText(/items/)).toBeInTheDocument();
    expect(screen.getByLabelText("Page size selector")).toBeInTheDocument();
    expect(screen.getByText("Go to")).toBeInTheDocument();
  });

  it("renders SearchPagination correctly", () => {
    renderPagination(<SearchPagination total={100} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-position", "center");
    expect(screen.getByText(/items/)).toBeInTheDocument();
    expect(screen.getByText("Go to")).toBeInTheDocument();
  });

  it("renders InfinitePagination correctly", () => {
    const handleLoadMore = jest.fn();
    renderPagination(
      <InfinitePagination 
        total={100} 
        hasMore={true} 
        onLoadMore={handleLoadMore} 
      />
    );
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
    
    fireEvent.click(screen.getByText("Load More"));
    expect(handleLoadMore).toHaveBeenCalledTimes(1);
  });

  it("renders LoadingPagination correctly", () => {
    renderPagination(<LoadingPagination />);
    
    // Loading state should render skeleton
    expect(document.querySelector(".pagination-skeleton-item")).toBeInTheDocument();
  });
});

// =============================================================================
// HOOK TESTS
// =============================================================================

describe("usePagination", () => {
  it("returns pagination utilities", () => {
    let hookResult: any;
    
    function TestComponent() {
      hookResult = usePagination(100, 1, 10);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    expect(hookResult.current).toBe(1);
    expect(hookResult.pageSize).toBe(10);
    expect(hookResult.total).toBe(100);
    expect(hookResult.totalPages).toBe(10);
    expect(hookResult.hasNext).toBe(true);
    expect(hookResult.hasPrev).toBe(false);
    expect(hookResult.isFirst).toBe(true);
    expect(hookResult.isLast).toBe(false);
    expect(typeof hookResult.next).toBe("function");
    expect(typeof hookResult.prev).toBe("function");
    expect(typeof hookResult.jump).toBe("function");
    expect(typeof hookResult.changePageSize).toBe("function");
    expect(typeof hookResult.getRange).toBe("function");
  });

  it("handles next/prev", () => {
    let hookResult: any;
    const onPageChange = jest.fn();
    
    function TestComponent() {
      hookResult = usePagination(100, 5, 10, onPageChange);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    hookResult.next();
    expect(onPageChange).toHaveBeenCalledWith(6, 10);
    
    hookResult.prev();
    expect(onPageChange).toHaveBeenCalledWith(4, 10);
  });

  it("handles jump", () => {
    let hookResult: any;
    const onPageChange = jest.fn();
    
    function TestComponent() {
      hookResult = usePagination(100, 1, 10, onPageChange);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    hookResult.jump(8);
    expect(onPageChange).toHaveBeenCalledWith(8, 10);
  });

  it("handles changePageSize", () => {
    let hookResult: any;
    const onPageChange = jest.fn();
    
    function TestComponent() {
      hookResult = usePagination(100, 1, 10, onPageChange);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    hookResult.changePageSize(20);
    expect(onPageChange).toHaveBeenCalledWith(1, 20);
  });

  it("returns correct range", () => {
    let hookResult: any;
    
    function TestComponent() {
      hookResult = usePagination(100, 3, 10);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    const range = hookResult.getRange();
    expect(range).toEqual([21, 30]);
  });
});

describe("usePaginationItems", () => {
  it("returns pagination items", () => {
    let hookResult: any;
    
    function TestComponent() {
      hookResult = usePaginationItems(5, 10, false, false);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    expect(Array.isArray(hookResult.items)).toBe(true);
    expect(hookResult.items.length).toBeGreaterThan(0);
    expect(hookResult.showLessItems).toBe(false);
    expect(hookResult.maxItems).toBe(9);
  });

  it("respects showLessItems", () => {
    let hookResult: any;
    
    function TestComponent() {
      hookResult = usePaginationItems(5, 10, true, false);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    expect(hookResult.showLessItems).toBe(true);
    expect(hookResult.maxItems).toBe(5);
  });

  it("handles disabled state", () => {
    let hookResult: any;
    
    function TestComponent() {
      hookResult = usePaginationItems(5, 10, false, true);
      return <div>Test</div>;
    }
    
    renderPagination(<TestComponent />);
    
    hookResult.items.forEach((item: any) => {
      expect(item.disabled).toBe(true);
    });
  });
});
