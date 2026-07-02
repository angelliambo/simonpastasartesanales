import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import {
  PaginationProps,
  PaginationItemData,
  UsePagination,
  UsePaginationItems,
  PAGINATION_DEFAULTS,
  getTotalPages,
  getValidPage,
  getPaginationRange,
  getPaginationItems,
  getAccessiblePaginationDescription,
  isValidPageSize,
  formatPaginationTotal,
  getPaginationItemIcon,
  getPaginationJumperIcon,
  shouldHidePagination,
} from "./Pagination.types";
import {
  StyledPagination,
  StyledPaginationItem,
  StyledPaginationSizeChanger,
  StyledPaginationJumper,
  StyledPaginationTotal,
  SimplePagination,
  CompletePagination,
  CompactPagination,
  LargePagination,
  ResponsivePagination,
  MinimalPagination,
  RoundedPagination,
  PaginationSkeleton,
  HighContrastPagination,
  LargeTextPagination,
} from "./Pagination.styles";

// =============================================================================
// HOOKS
// =============================================================================

export const usePagination = (
  total: number = PAGINATION_DEFAULTS.total,
  initialPage: number = PAGINATION_DEFAULTS.current,
  initialPageSize: number = PAGINATION_DEFAULTS.pageSize,
  onPageChange?: (page: number, pageSize: number) => void
): UsePagination => {
  const [current, setCurrent] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => getTotalPages(total, pageSize), [total, pageSize]);

  const hasNext = useMemo(() => current < totalPages, [current, totalPages]);
  const hasPrev = useMemo(() => current > 1, [current]);
  const isFirst = useMemo(() => current === 1, [current]);
  const isLast = useMemo(() => current === totalPages, [current, totalPages]);

  const next = useCallback(() => {
    if (hasNext) {
      const newPage = current + 1;
      setCurrent(newPage);
      onPageChange?.(newPage, pageSize);
    }
  }, [current, hasNext, pageSize, onPageChange]);

  const prev = useCallback(() => {
    if (hasPrev) {
      const newPage = current - 1;
      setCurrent(newPage);
      onPageChange?.(newPage, pageSize);
    }
  }, [current, hasPrev, pageSize, onPageChange]);

  const jump = useCallback(
    (page: number) => {
      const validPage = getValidPage(page, totalPages);
      setCurrent(validPage);
      onPageChange?.(validPage, pageSize);
    },
    [totalPages, pageSize, onPageChange]
  );

  const changePageSize = useCallback(
    (size: number) => {
      if (isValidPageSize(size)) {
        setPageSize(size);
        const newTotalPages = getTotalPages(total, size);
        const newPage = getValidPage(current, newTotalPages);
        setCurrent(newPage);
        onPageChange?.(newPage, size);
      }
    },
    [total, current, onPageChange]
  );

  const getRange = useCallback((): [number, number] => {
    return getPaginationRange(current, pageSize);
  }, [current, pageSize]);

  // Update current page when total or pageSize changes
  useEffect(() => {
    const newTotalPages = getTotalPages(total, pageSize);
    if (current > newTotalPages && newTotalPages > 0) {
      const newPage = newTotalPages;
      setCurrent(newPage);
      onPageChange?.(newPage, pageSize);
    }
  }, [total, pageSize, current, onPageChange]);

  return {
    current,
    pageSize,
    total,
    totalPages,
    hasNext,
    hasPrev,
    isFirst,
    isLast,
    next,
    prev,
    jump,
    changePageSize,
    getRange,
  };
};

export const usePaginationItems = (
  current: number,
  totalPages: number,
  showLessItems: boolean = false,
  disabled: boolean = false
): UsePaginationItems => {
  const items = useMemo(() => {
    return getPaginationItems(current, totalPages, showLessItems, disabled);
  }, [current, totalPages, showLessItems, disabled]);

  const maxItems = useMemo(() => {
    return showLessItems ? 5 : 9; // prev + 1 + ... + 3 + ... + 1 + next
  }, [showLessItems]);

  return {
    items,
    showLessItems,
    maxItems,
  };
};

// =============================================================================
// MAIN PAGINATION COMPONENT
// =============================================================================

export interface PaginationRef {
  jump: (page: number) => void;
  next: () => void;
  prev: () => void;
  changePageSize: (size: number) => void;
  element: HTMLDivElement | null;
}

export const Pagination = forwardRef<PaginationRef, PaginationProps>(
  (
    {
      current: currentProp,
      defaultCurrent = PAGINATION_DEFAULTS.current,
      total = PAGINATION_DEFAULTS.total,
      pageSize: pageSizeProp,
      defaultPageSize = PAGINATION_DEFAULTS.pageSize,
      onChange,
      onShowSizeChange,
      disabled = PAGINATION_DEFAULTS.disabled,
      id,
      size = PAGINATION_DEFAULTS.size,
      variant = PAGINATION_DEFAULTS.variant,
      simple = PAGINATION_DEFAULTS.simple,
      hideOnSinglePage = PAGINATION_DEFAULTS.hideOnSinglePage,
      showSizeChanger = PAGINATION_DEFAULTS.showSizeChanger,
      showQuickJumper = PAGINATION_DEFAULTS.showQuickJumper,
      showTotal = PAGINATION_DEFAULTS.showTotal,
      showPrevNextJumpers = PAGINATION_DEFAULTS.showPrevNextJumpers,
      showLessItems = PAGINATION_DEFAULTS.showLessItems,
      responsive = PAGINATION_DEFAULTS.responsive,
      showTitle = PAGINATION_DEFAULTS.showTitle,
      itemRender,
      pageSizeOptions = PAGINATION_DEFAULTS.pageSizeOptions,
      goButton = PAGINATION_DEFAULTS.goButton,
      position = PAGINATION_DEFAULTS.position,
      className,
      style,
      accessibility: accessibilityProp,
      onPageChange,
      children,
      ...props
    },
    ref
  ) => {
    // =============================================================================
    // STATE AND REFS
    // =============================================================================

    const paginationRef = useRef<HTMLDivElement>(null);
    const jumperInputRef = useRef<HTMLInputElement>(null);
    const [jumperValue, setJumperValue] = useState("");

    // =============================================================================
    // PERSONALIZATION AND ACCESSIBILITY
    // =============================================================================

    const { accessibility: contextAccessibility } = usePersonalization();
    const accessibility = useMemo(() => ({
      reducedMotion: contextAccessibility.reduceMotion || contextAccessibility.disableAnimations,
      highContrast: contextAccessibility.highContrast,
      largeText: contextAccessibility.fontSizeMultiplier > 1,
      increasedSpacing: contextAccessibility.increasedSpacing,
      ...accessibilityProp,
    }), [contextAccessibility, accessibilityProp]);

    // =============================================================================
    // CONTROLLED/UNCONTROLLED STATE
    // =============================================================================

    const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
    const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

    const current = currentProp !== undefined ? currentProp : internalCurrent;
    const pageSize = pageSizeProp !== undefined ? pageSizeProp : internalPageSize;

    // =============================================================================
    // PAGINATION LOGIC
    // =============================================================================

    const totalPages = useMemo(() => getTotalPages(total, pageSize), [total, pageSize]);
    const { items } = usePaginationItems(current, totalPages, showLessItems, disabled);
    const range = useMemo(() => getPaginationRange(current, pageSize), [current, pageSize]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handlePageChange = useCallback(
      (page: number) => {
        const validPage = getValidPage(page, totalPages);
        
        if (currentProp === undefined) {
          setInternalCurrent(validPage);
        }
        
        onChange?.(validPage, pageSize);
        onPageChange?.(validPage);
      },
      [currentProp, totalPages, pageSize, onChange, onPageChange]
    );

    const handlePageSizeChange = useCallback(
      (newSize: number) => {
        if (!isValidPageSize(newSize)) return;
        
        if (pageSizeProp === undefined) {
          setInternalPageSize(newSize);
        }
        
        const newTotalPages = getTotalPages(total, newSize);
        const newPage = getValidPage(current, newTotalPages);
        
        onShowSizeChange?.(newPage, newSize);
        onChange?.(newPage, newSize);
        onPageChange?.(newPage);
      },
      [pageSizeProp, total, current, onShowSizeChange, onChange, onPageChange]
    );

    const handleItemClick = useCallback(
      (item: PaginationItemData) => {
        if (disabled || item.disabled) return;
        
        let targetPage: number;
        
        switch (item.type) {
          case "prev":
            targetPage = Math.max(1, current - 1);
            break;
          case "next":
            targetPage = Math.min(totalPages, current + 1);
            break;
          case "jump-prev":
            targetPage = Math.max(1, current - 5);
            break;
          case "jump-next":
            targetPage = Math.min(totalPages, current + 5);
            break;
          case "page":
          default:
            targetPage = item.page;
            break;
        }
        
        handlePageChange(targetPage);
      },
      [disabled, current, totalPages, handlePageChange]
    );

    const handleSizeChangerChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(event.target.value, 10);
        handlePageSizeChange(newSize);
      },
      [handlePageSizeChange]
    );

    const handleJumperSubmit = useCallback(() => {
      const page = parseInt(jumperValue, 10);
      if (isNaN(page)) return;
      
      handlePageChange(page);
      setJumperValue("");
      if (jumperInputRef.current) {
        jumperInputRef.current.blur();
      }
    }, [jumperValue, handlePageChange]);

    const handleJumperKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleJumperSubmit();
        }
      },
      [handleJumperSubmit]
    );

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================

    useImperativeHandle(ref, () => ({
      jump: handlePageChange,
      next: () => handlePageChange(current + 1),
      prev: () => handlePageChange(current - 1),
      changePageSize: handlePageSizeChange,
      element: paginationRef.current,
    }));

    // =============================================================================
    // RENDER CONDITIONS
    // =============================================================================

    if (shouldHidePagination(total, pageSize, hideOnSinglePage)) {
      return null;
    }

    const finalId = id ? `pagination-${id}` : undefined;

    // =============================================================================
    // ITEM RENDERING
    // =============================================================================

    const handleItemKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>, item: PaginationItemData) => {
        if (event.defaultPrevented) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleItemClick(item);
        }
      },
      [handleItemClick]
    );

    const renderPaginationItem = useCallback(
      (item: PaginationItemData, index: number) => {
        if (simple && item.type === "page") {
          return null;
        }

        const isActive = item.active;
        const isDisabled = disabled || item.disabled;
        
        // Use custom itemRender if provided
        if (itemRender) {
          const originalElement = (
            <StyledPaginationItem
              key={`item-${index}`}
              $size={size}
              $variant={variant}
              $active={isActive}
              $disabled={isDisabled}
              $type={item.type}
              accessibility={accessibility}
              className={`pagination-item pagination-${item.type} ${isActive ? "pagination-active" : ""} ${isDisabled ? "pagination-disabled" : ""}`}
              disabled={isDisabled}
              onClick={() => handleItemClick(item)}
              onKeyDown={(event) => handleItemKeyDown(event, item)}
              title={showTitle ? item.title : undefined}
              aria-label={item.title}
              aria-current={isActive ? "page" : undefined}
            >
              {item.type === "page" ? item.page : getPaginationItemIcon(item.type)}
            </StyledPaginationItem>
          );
          
          const customContent = itemRender(item.page, item.type, originalElement);
          return React.isValidElement(customContent) ? 
            React.cloneElement(customContent, { key: `item-${index}` }) : 
            customContent;
        }

        // Default rendering
        return (
          <StyledPaginationItem
            key={`item-${index}`}
            $size={size}
            $variant={variant}
            $active={isActive}
            $disabled={isDisabled}
            $type={item.type}
            accessibility={accessibility}
            className={`pagination-item pagination-${item.type} ${isActive ? "pagination-active" : ""} ${isDisabled ? "pagination-disabled" : ""}`}
            disabled={isDisabled}
            onClick={() => handleItemClick(item)}
            onKeyDown={(event) => handleItemKeyDown(event, item)}
            title={showTitle ? item.title : undefined}
            aria-label={item.title}
            aria-current={isActive ? "page" : undefined}
          >
            {item.type === "page" ? item.page : getPaginationItemIcon(item.type)}
          </StyledPaginationItem>
        );
      },
      [
        disabled,
        size,
        variant,
        accessibility,
        simple,
        showTitle,
        itemRender,
        handleItemClick,
        handleItemKeyDown,
      ]
    );

    // =============================================================================
    // TOTAL RENDERING
    // =============================================================================

    const renderTotal = useCallback(() => {
      if (!showTotal) return null;
      
      const totalContent = formatPaginationTotal(total, range, showTotal);
      
      return (
        <StyledPaginationTotal
          $size={size}
          $variant={variant}
          accessibility={accessibility}
          className="pagination-total"
        >
          {totalContent}
        </StyledPaginationTotal>
      );
    }, [showTotal, total, range, size, variant, accessibility]);

    // =============================================================================
    // SIZE CHANGER RENDERING
    // =============================================================================

    const renderSizeChanger = useCallback(() => {
      if (!showSizeChanger) return null;
      
      return (
        <StyledPaginationSizeChanger
          $size={size}
          $variant={variant}
          accessibility={accessibility}
          className="pagination-size-changer"
          value={pageSize}
          onChange={handleSizeChangerChange}
          disabled={disabled}
          aria-label="Page size selector"
        >
          {pageSizeOptions.map(option => (
            <option key={option} value={option}>
              {option} / page
            </option>
          ))}
        </StyledPaginationSizeChanger>
      );
    }, [
      showSizeChanger,
      size,
      variant,
      accessibility,
      pageSize,
      pageSizeOptions,
      disabled,
      handleSizeChangerChange,
    ]);

    // =============================================================================
    // QUICK JUMPER RENDERING
    // =============================================================================

    const renderQuickJumper = useCallback(() => {
      if (!showQuickJumper) return null;
      
      return (
        <StyledPaginationJumper
          $size={size}
          $variant={variant}
          accessibility={accessibility}
          className="pagination-jumper"
        >
          <span className="pagination-jumper-text">Go to</span>
          <input
            ref={jumperInputRef}
            type="number"
            min={1}
            max={totalPages}
            value={jumperValue}
            onChange={(e) => setJumperValue(e.target.value)}
            onKeyDown={handleJumperKeyDown}
            disabled={disabled}
            className="pagination-jumper-input"
            aria-label="Jump to page"
          />
          {goButton && (
            <button
              type="button"
              onClick={handleJumperSubmit}
              disabled={disabled}
              className="pagination-jumper-button"
              aria-label="Go to page"
            >
              {React.isValidElement(goButton) ? goButton : getPaginationJumperIcon()}
            </button>
          )}
        </StyledPaginationJumper>
      );
    }, [
      showQuickJumper,
      size,
      variant,
      accessibility,
      totalPages,
      jumperValue,
      goButton,
      disabled,
      handleJumperKeyDown,
      handleJumperSubmit,
    ]);

    // =============================================================================
    // ACCESSIBILITY DESCRIPTION
    // =============================================================================

    const accessibleDescription = useMemo(
      () => getAccessiblePaginationDescription(current, totalPages, total),
      [current, totalPages, total]
    );

    // =============================================================================
    // RENDER
    // =============================================================================

    return (
      <StyledPagination
        id={finalId}
        ref={paginationRef}
        className={`pagination ${className || ""}`}
        style={style}
        $size={size}
        $variant={variant}
        $position={position}
        $simple={simple}
        $responsive={responsive}
        accessibility={accessibility}
        data-size={size ?? "md"}
        data-variant={variant ?? "primary"}
        data-position={position ?? "center"}
        data-simple={simple ? "true" : undefined}
        data-responsive={responsive ? "true" : undefined}
        role="navigation"
        aria-label={accessibility.textToSpeech ? accessibleDescription : "Pagination navigation"}
        {...props}
      >
        {/* Total */}
        {renderTotal()}
        
        {/* Pagination items */}
        {items.map((item, index) => renderPaginationItem(item, index))}
        
        {/* Size changer */}
        {renderSizeChanger()}
        
        {/* Quick jumper */}
        {renderQuickJumper()}
        
        {/* Children */}
        {children}
      </StyledPagination>
    );
  }
);

Pagination.displayName = "Pagination";

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Size variants
export const SmallPagination: React.FC<PaginationProps> = (props) => (
  <Pagination size="sm" {...props} />
);

export const MediumPagination: React.FC<PaginationProps> = (props) => (
  <Pagination size="md" {...props} />
);

export const LargePaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination size="lg" {...props} />
);

export const ExtraLargePagination: React.FC<PaginationProps> = (props) => (
  <Pagination size="xl" {...props} />
);

// Variant styles
export const PrimaryPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="primary" {...props} />
);

export const SecondaryPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="secondary" {...props} />
);

export const SuccessPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="success" {...props} />
);

export const WarningPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="warning" {...props} />
);

export const ErrorPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="error" {...props} />
);

export const InfoPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="info" {...props} />
);

export const GhostPagination: React.FC<PaginationProps> = (props) => (
  <Pagination variant="ghost" {...props} />
);

// Position variants
export const LeftPagination: React.FC<PaginationProps> = (props) => (
  <Pagination position="left" {...props} />
);

export const CenterPagination: React.FC<PaginationProps> = (props) => (
  <Pagination position="center" {...props} />
);

export const RightPagination: React.FC<PaginationProps> = (props) => (
  <Pagination position="right" {...props} />
);

// Behavior variants
export const SimplePaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination simple={true} {...props} />
);

export const ResponsivePaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination responsive={true} showLessItems={true} {...props} />
);

export const CompletePaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination
    showTotal={true}
    showSizeChanger={true}
    showQuickJumper={true}
    goButton={true}
    {...props}
  />
);

// Use case variants
export const TablePagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    showTotal={true}
    showSizeChanger={true}
    showQuickJumper={false}
    position="right"
    size="sm"
    {...props}
  />
);

export const ListPagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    showTotal={false}
    showSizeChanger={false}
    showQuickJumper={false}
    position="center"
    {...props}
  />
);

export const GridPagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    showTotal={true}
    showSizeChanger={true}
    showQuickJumper={true}
    goButton={true}
    position="center"
    {...props}
  />
);

export const MobilePaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination
    responsive={true}
    showLessItems={true}
    showSizeChanger={false}
    showQuickJumper={false}
    size="sm"
    {...props}
  />
);

export const MinimalPaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination
    simple={true}
    showTotal={false}
    showSizeChanger={false}
    showQuickJumper={false}
    variant="ghost"
    {...props}
  />
);

export const CompactPaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination
    size="xs"
    showLessItems={true}
    showTotal={false}
    {...props}
  />
);

// Layout components using styled variants
export const SimplePaginationLayout = SimplePagination;
export const CompletePaginationLayout = CompletePagination;
export const CompactPaginationLayout = CompactPagination;
export const LargePaginationLayout = LargePagination;
export const ResponsivePaginationLayout = ResponsivePagination;
export const MinimalPaginationLayout = MinimalPagination;
export const RoundedPaginationLayout = RoundedPagination;
export const HighContrastPaginationLayout = HighContrastPagination;
export const LargeTextPaginationLayout = LargeTextPagination;

// Loading state
export const LoadingPagination: React.FC<PaginationProps> = ({
  accessibility: accessibilityProp,
  className,
  style,
  ...rest
}) => {
  const skeletonSafeProps: Record<string, unknown> = {};

  Object.entries(rest).forEach(([key, value]) => {
    if (
      key.startsWith("data-") ||
      key.startsWith("aria-") ||
      key === "id" ||
      key === "role" ||
      key === "tabIndex" ||
      key === "title"
    ) {
      skeletonSafeProps[key] = value;
    }
  });

  return (
    <PaginationSkeleton
      accessibility={accessibilityProp}
      className={className}
      style={style}
      {...(skeletonSafeProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <span
          key={`pagination-skeleton-${index}`}
          className="pagination-skeleton-item"
          aria-hidden="true"
        />
      ))}
    </PaginationSkeleton>
  );
};

// Accessibility variants
export const HighContrastPaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination
    variant="primary"
    size="lg"
    accessibility={{ highContrast: true }}
    {...props}
  />
);

export const LargeTextPaginationComponent: React.FC<PaginationProps> = (props) => (
  <Pagination
    size="xl"
    accessibility={{ largeText: true }}
    {...props}
  />
);

export const ReducedMotionPagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    accessibility={{ reducedMotion: true }}
    {...props}
  />
);

// Advanced variants
export const AdminPagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    showTotal={true}
    showSizeChanger={true}
    showQuickJumper={true}
    goButton={true}
    pageSizeOptions={["10", "25", "50", "100", "200"]}
    position="right"
    {...props}
  />
);

export const SearchPagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    showTotal={true}
    showSizeChanger={false}
    showQuickJumper={true}
    goButton={true}
    position="center"
    {...props}
  />
);

export const InfinitePagination: React.FC<PaginationProps & {
  hasMore?: boolean;
  onLoadMore?: () => void;
}> = ({ hasMore, onLoadMore, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
    <Pagination {...props} />
    {hasMore && (
      <button
        onClick={onLoadMore}
        style={{
          padding: "8px 16px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Load More
      </button>
    )}
  </div>
);

export default Pagination;
