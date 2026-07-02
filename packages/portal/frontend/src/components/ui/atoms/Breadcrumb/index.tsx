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
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbItemRenderParams,
  UseBreadcrumbNavigation,
  UseBreadcrumbCollapse,
  BREADCRUMB_DEFAULTS,
  getBreadcrumbItems,
  getVisibleItems,
  isLastBreadcrumbItem,
  getBreadcrumbSeparatorIcon,
  generateBreadcrumbsFromPath,
  getAccessibleBreadcrumbDescription,
  shouldCollapseBreadcrumbs,
  getDefaultBreadcrumbSeparator,
  getArrowSeparator,
  getChevronSeparator,
  getHomeIcon,
  AccessibilityProps,
} from "./Breadcrumb.types";
import {
  StyledBreadcrumb,
  StyledBreadcrumbItem,
  StyledBreadcrumbLink,
  StyledBreadcrumbSeparator,
  StyledBreadcrumbCollapsed,
  StyledBreadcrumbDropdown,
  SimpleBreadcrumb,
  NavigationBreadcrumb,
  CompactBreadcrumb,
  LargeBreadcrumb,
  ResponsiveBreadcrumb,
  CardBreadcrumb,
  MinimalBreadcrumb,
  HomeBreadcrumb,
  MobileBreadcrumb,
  BreadcrumbSkeletonContainer,
  HighContrastBreadcrumb,
  LargeTextBreadcrumb,
} from "./Breadcrumb.styles";

// =============================================================================
// HOOKS
// =============================================================================

export const useBreadcrumbNavigation = (
  items: BreadcrumbItem[],
  onNavigate?: (item: BreadcrumbItem) => void
): UseBreadcrumbNavigation => {
  const [currentPath, setCurrentPath] = useState<string>("");

  const navigate = useCallback(
    (item: BreadcrumbItem) => {
      if (item.href) {
        setCurrentPath(item.href);
      }
      onNavigate?.(item);
    },
    [onNavigate]
  );

  const goHome = useCallback(() => {
    const homeItem = items.find(item => item.key === "home" || item.href === "/");
    if (homeItem) {
      navigate(homeItem);
    }
  }, [items, navigate]);

  const goBack = useCallback(() => {
    if (items.length > 1) {
      const previousItem = items[items.length - 2];
      navigate(previousItem);
    }
  }, [items, navigate]);

  return {
    items,
    currentPath,
    navigate,
    goHome,
    goBack,
  };
};

export const useBreadcrumbCollapse = (
  items: BreadcrumbItem[],
  maxItems: number,
  responsive: boolean = false
): UseBreadcrumbCollapse => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { visible: visibleItems, collapsed: collapsedItems } = useMemo(() => {
    if (isCollapsed || shouldCollapseBreadcrumbs(items, maxItems, responsive)) {
      return getVisibleItems(items, maxItems);
    }
    return { visible: items, collapsed: [] };
  }, [items, maxItems, responsive, isCollapsed]);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  // Handle responsive collapse
  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const shouldCollapse = shouldCollapseBreadcrumbs(
          items,
          maxItems,
          responsive,
          containerWidth,
          BREADCRUMB_DEFAULTS.collapsedWidth
        );
        setIsCollapsed(shouldCollapse);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [items, maxItems, responsive]);

  return {
    visibleItems,
    collapsedItems,
    isCollapsed: isCollapsed || collapsedItems.length > 0,
    expand,
    collapse,
  };
};

// =============================================================================
// MAIN BREADCRUMB COMPONENT
// =============================================================================

export interface BreadcrumbRef {
  navigate: (item: BreadcrumbItem) => void;
  goHome: () => void;
  goBack: () => void;
  element: HTMLElement | null;
}

export const Breadcrumb = forwardRef<BreadcrumbRef, BreadcrumbProps>(
  (
    {
      items: itemsProp,
      routes,
      onClick,
      size = BREADCRUMB_DEFAULTS.size,
      variant = BREADCRUMB_DEFAULTS.variant,
      separator = BREADCRUMB_DEFAULTS.separator,
      maxItems = BREADCRUMB_DEFAULTS.maxItems,
      itemRender,
      autoGenerate = BREADCRUMB_DEFAULTS.autoGenerate,
      homeUrl = BREADCRUMB_DEFAULTS.homeUrl,
      homeName = BREADCRUMB_DEFAULTS.homeName,
      homeIcon,
      responsive = BREADCRUMB_DEFAULTS.responsive,
      collapsedWidth = BREADCRUMB_DEFAULTS.collapsedWidth,
      expandText = BREADCRUMB_DEFAULTS.expandText,
      collapseText = BREADCRUMB_DEFAULTS.collapseText,
      className,
      style,
      id,
      accessibility: accessibilityProp,
      onItemClick,
      children,
      ...props
    },
    ref
  ) => {
    // =============================================================================
    // STATE AND REFS
    // =============================================================================

    const breadcrumbRef = useRef<HTMLElement>(null);
    const lastInteractionEventRef =
      useRef<React.MouseEvent<HTMLElement> | undefined>(undefined);
    const [dropdownVisible, setDropdownVisible] = useState(false);

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
    // BREADCRUMB ITEMS
    // =============================================================================

    const items = useMemo(() => {
      const rawItems = getBreadcrumbItems(itemsProp, routes);
      
      if (autoGenerate && typeof window !== "undefined") {
        const pathname = window.location.pathname;
        return generateBreadcrumbsFromPath(pathname, homeUrl, homeName, homeIcon);
      }
      
      return rawItems;
    }, [itemsProp, routes, autoGenerate, homeUrl, homeName, homeIcon]);

    // =============================================================================
    // COLLAPSE LOGIC
    // =============================================================================

    const {
      visibleItems,
      collapsedItems,
      isCollapsed,
      expand,
    } = useBreadcrumbCollapse(items, maxItems, responsive);

    // =============================================================================
    // NAVIGATION LOGIC
    // =============================================================================

    const navigationCallback = useCallback(
      (item: BreadcrumbItem) => {
        if (!onClick) {
          return;
        }
        const fallbackEvent =
          lastInteractionEventRef.current ??
          ({} as React.MouseEvent<HTMLElement>);
        onClick(item, fallbackEvent);
        lastInteractionEventRef.current = undefined;
      },
      [onClick]
    );

    const { navigate, goHome, goBack } = useBreadcrumbNavigation(
      items,
      navigationCallback
    );

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handleItemClick = useCallback(
      (item: BreadcrumbItem, index: number, event: React.MouseEvent<HTMLElement>) => {
        if (item.disabled) {
          event.preventDefault();
          lastInteractionEventRef.current = undefined;
          return;
        }

        lastInteractionEventRef.current = event;

        // Handle custom onClick
        if (item.onClick) {
          event.preventDefault();
          item.onClick(event);
        }

        // Handle navigation
        if (!event.defaultPrevented) {
          navigate(item);
        } else if (onClick) {
          onClick(item, event);
          lastInteractionEventRef.current = undefined;
        }

        // Call props callback
        onItemClick?.(item, index);
      },
      [navigate, onItemClick, onClick]
    );

    const handleCollapsedClick = useCallback(() => {
      if (isCollapsed) {
        expand();
        setDropdownVisible(!dropdownVisible);
      }
    }, [isCollapsed, expand, dropdownVisible]);

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================

    useImperativeHandle(ref, () => ({
      navigate,
      goHome,
      goBack,
      element: breadcrumbRef.current,
    }));

    // =============================================================================
    // SEPARATOR RENDERING
    // =============================================================================

    const renderSeparator = useCallback((index: number) => {
      if (isLastBreadcrumbItem(index, visibleItems)) {
        return null;
      }

      let separatorIcon: React.ReactNode;

      if (React.isValidElement(separator)) {
        separatorIcon = separator;
      } else if (typeof separator === "string") {
        switch (separator) {
          case "arrow":
            separatorIcon = getArrowSeparator();
            break;
          case "chevron":
            separatorIcon = getChevronSeparator();
            break;
          default:
            separatorIcon = getBreadcrumbSeparatorIcon(separator as any);
        }
      } else {
        separatorIcon = getDefaultBreadcrumbSeparator();
      }

      return (
        <StyledBreadcrumbSeparator
          key={`separator-${index}`}
          $size={size}
          $variant={variant}
          $separator={typeof separator === "string" ? (separator as any) : "custom"}
          accessibility={accessibility}
        >
          {separatorIcon}
        </StyledBreadcrumbSeparator>
      );
    }, [separator, size, variant, accessibility, visibleItems]);

    // =============================================================================
    // ITEM RENDERING
    // =============================================================================

    const renderBreadcrumbItem = useCallback(
      (item: BreadcrumbItem, index: number) => {
        const isLast = isLastBreadcrumbItem(index, visibleItems);
        const isClickable = !!(item.href || item.onClick) && !item.disabled;
        
        const renderParams: BreadcrumbItemRenderParams = {
          item,
          index,
          isLast,
          items: visibleItems,
        };

        // Use custom itemRender if provided
        if (itemRender) {
          const customContent = itemRender(item, renderParams);
          return (
            <React.Fragment key={item.key || index}>
              <StyledBreadcrumbItem
                $size={size}
                $variant={variant}
                $disabled={!!item.disabled}
                $active={isLast}
                $clickable={isClickable}
                accessibility={accessibility}
                className={item.className}
                style={item.style}
                onClick={isClickable ? (e) => handleItemClick(item, index, e) : undefined}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-label={accessibility.textToSpeech ? 
                  getAccessibleBreadcrumbDescription(visibleItems, index, visibleItems.length) : 
                  undefined
                }
                onKeyDown={isClickable ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(item, index, e as any);
                  }
                } : undefined}
              >
                {customContent}
              </StyledBreadcrumbItem>
              {renderSeparator(index)}
            </React.Fragment>
          );
        }

        // Default rendering
        const content = (
          <>
            {item.icon && (
              <span className="breadcrumb-icon">
                {item.icon}
              </span>
            )}
            {item.title}
          </>
        );

        return (
          <React.Fragment key={item.key || index}>
            <StyledBreadcrumbItem
              $size={size}
              $variant={variant}
              $disabled={!!item.disabled}
              $active={isLast}
              $clickable={isClickable}
              accessibility={accessibility}
              className={item.className}
              style={item.style}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-label={accessibility.textToSpeech ? 
                getAccessibleBreadcrumbDescription(visibleItems, index, visibleItems.length) : 
                undefined
              }
              onKeyDown={isClickable ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick(item, index, e as any);
                }
              } : undefined}
            >
              {item.href && !item.disabled ? (
                <StyledBreadcrumbLink
                  href={item.href}
                  $size={size}
                  $variant={variant}
                  $disabled={!!item.disabled}
                  accessibility={accessibility}
                  onClick={(e) => handleItemClick(item, index, e)}
                >
                  {content}
                </StyledBreadcrumbLink>
              ) : (
                <span
                  onClick={isClickable ? (e) => handleItemClick(item, index, e) : undefined}
                  style={{ cursor: isClickable ? "pointer" : "default" }}
                >
                  {content}
                </span>
              )}
            </StyledBreadcrumbItem>
            {renderSeparator(index)}
          </React.Fragment>
        );
      },
      [
        size,
        variant,
        accessibility,
        visibleItems,
        itemRender,
        handleItemClick,
        renderSeparator,
      ]
    );

    // =============================================================================
    // COLLAPSED ITEMS RENDERING
    // =============================================================================

    const renderCollapsedItems = useCallback(() => {
      if (collapsedItems.length === 0) {
        return null;
      }

      return (
        <React.Fragment key="collapsed">
          <StyledBreadcrumbCollapsed
            $size={size}
            $variant={variant}
            $disabled={false}
            $active={false}
            $clickable={true}
            accessibility={accessibility}
            onClick={handleCollapsedClick}
            role="button"
            tabIndex={0}
            aria-label={`Show ${collapsedItems.length} hidden items`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCollapsedClick();
              }
            }}
          >
            {expandText}
          </StyledBreadcrumbCollapsed>
          
          {dropdownVisible && (
            <StyledBreadcrumbDropdown accessibility={accessibility}>
              {collapsedItems.map((item, index) => (
                <div
                  key={item.key || `collapsed-${index}`}
                  className={`breadcrumb-dropdown-item ${item.disabled ? "disabled" : ""}`}
                  onClick={!item.disabled ? (e) => {
                    handleItemClick(item, index + 1, e as any);
                    setDropdownVisible(false);
                  } : undefined}
                >
                  {item.icon && (
                    <span className="breadcrumb-icon">
                      {item.icon}
                    </span>
                  )}
                  {item.title}
                </div>
              ))}
            </StyledBreadcrumbDropdown>
          )}
          
          {renderSeparator(0)}
        </React.Fragment>
      );
    }, [
      collapsedItems,
      size,
      variant,
      accessibility,
      expandText,
      dropdownVisible,
      handleCollapsedClick,
      handleItemClick,
      renderSeparator,
    ]);

    // =============================================================================
    // RENDER
    // =============================================================================

    const finalItems = useMemo(() => {
      if (isCollapsed && collapsedItems.length > 0) {
        // Show first item, collapsed indicator, and visible items
        const result = [visibleItems[0]];
        return result.concat(visibleItems.slice(1));
      }
      return visibleItems;
    }, [isCollapsed, collapsedItems, visibleItems]);

    const separatorType = useMemo(
      () => (typeof separator === "string" ? (separator as string) : "custom"),
      [separator]
    );

    const maxItemsAttr = maxItems > 0 ? String(maxItems) : undefined;

    const finalId = id ? `breadcrumb-${id}` : undefined;

    return (
      <StyledBreadcrumb
        id={finalId}
        ref={breadcrumbRef}
        className={`breadcrumb ${className || ""}`}
        style={style}
        $size={size}
        $variant={variant}
        $responsive={responsive}
        accessibility={accessibility}
        aria-label="Breadcrumb navigation"
        role="navigation"
        data-size={size}
        data-variant={variant}
        data-responsive={responsive ? "true" : undefined}
        data-separator={separatorType}
        data-max-items={maxItemsAttr}
        {...props}
      >
        {/* Render first item if collapsed */}
        {isCollapsed && visibleItems.length > 0 && renderBreadcrumbItem(visibleItems[0], 0)}
        
        {/* Render collapsed items indicator */}
        {isCollapsed && renderCollapsedItems()}
        
        {/* Render visible items */}
        {(isCollapsed ? finalItems.slice(1) : finalItems).map((item, index) => 
          renderBreadcrumbItem(item, isCollapsed ? index + 1 : index)
        )}
        
        {/* Render children if provided */}
        {children}
      </StyledBreadcrumb>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Size variants
export const SmallBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb size="sm" {...props} />
);

export const MediumBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb size="md" {...props} />
);

export const LargeBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb size="lg" {...props} />
);

export const ExtraLargeBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb size="xl" {...props} />
);

// Variant styles
export const PrimaryBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="primary" {...props} />
);

export const SecondaryBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="secondary" {...props} />
);

export const SuccessBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="success" {...props} />
);

export const WarningBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="warning" {...props} />
);

export const ErrorBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="error" {...props} />
);

export const InfoBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="info" {...props} />
);

export const GhostBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb variant="ghost" {...props} />
);

// Separator variants
export const ArrowBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb separator="arrow" {...props} />
);

export const ChevronBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb separator="chevron" {...props} />
);

export const SlashBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb separator="slash" {...props} />
);

export const DotBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb separator="dot" {...props} />
);

// Behavior variants
export const ResponsiveBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb responsive={true} {...props} />
);

export const CollapsibleBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb maxItems={4} responsive={true} {...props} />
);

export const AutoGeneratedBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb autoGenerate={true} homeIcon={getHomeIcon()} {...props} />
);

// Use case variants
export const NavigationBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    autoGenerate={true}
    homeIcon={getHomeIcon()}
    separator="chevron"
    responsive={true}
    {...props}
  />
);

export const SimpleBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    variant="secondary"
    separator="slash"
    size="md"
    {...props}
  />
);

export const CompactBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    size="sm"
    separator="dot"
    maxItems={3}
    {...props}
  />
);

export const CardBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    variant="primary"
    separator="chevron"
    responsive={true}
    style={{
      background: "#f5f5f5",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
    }}
    {...props}
  />
);

export const MobileBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    size="sm"
    responsive={true}
    maxItems={2}
    separator="chevron"
    {...props}
  />
);

export const MinimalBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    variant="ghost"
    separator="slash"
    size="sm"
    {...props}
  />
);

// Layout components using styled variants
export const SimpleBreadcrumbLayout = SimpleBreadcrumb;
export const NavigationBreadcrumbLayout = NavigationBreadcrumb;
export const CompactBreadcrumbLayout = CompactBreadcrumb;
export const LargeBreadcrumbLayout = LargeBreadcrumb;
export const ResponsiveBreadcrumbLayout = ResponsiveBreadcrumb;
export const CardBreadcrumbLayout = CardBreadcrumb;
export const MinimalBreadcrumbLayout = MinimalBreadcrumb;
export const HomeBreadcrumbLayout = HomeBreadcrumb;
export const MobileBreadcrumbLayout = MobileBreadcrumb;
export const HighContrastBreadcrumbLayout = HighContrastBreadcrumb;
export const LargeTextBreadcrumbLayout = LargeTextBreadcrumb;

// Loading state
export const BreadcrumbSkeleton: React.FC<{
  accessibility?: AccessibilityProps;
}> = ({
  accessibility,
}) => (
  <BreadcrumbSkeletonContainer accessibility={accessibility}>
    {Array.from({ length: 5 }).map((_, index) => (
      <span
        key={`breadcrumb-skeleton-${index}`}
        className="breadcrumb-skeleton-item"
        aria-hidden="true"
      />
    ))}
  </BreadcrumbSkeletonContainer>
);

export const LoadingBreadcrumb: React.FC<BreadcrumbProps> = ({
  accessibility,
}) => (
  <BreadcrumbSkeleton accessibility={accessibility} />
);

// Accessibility variants
export const HighContrastBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    variant="primary"
    size="lg"
    accessibility={{ highContrast: true }}
    {...props}
  />
);

export const LargeTextBreadcrumbComponent: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    size="xl"
    accessibility={{ largeText: true }}
    {...props}
  />
);

export const ReducedMotionBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    accessibility={{ reducedMotion: true }}
    {...props}
  />
);

// Advanced variants
export const MultiLevelBreadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <Breadcrumb
    maxItems={5}
    responsive={true}
    separator="chevron"
    autoGenerate={true}
    homeIcon={getHomeIcon()}
    {...props}
  />
);

export const InteractiveBreadcrumb: React.FC<BreadcrumbProps & {
  onNavigate?: (item: BreadcrumbItem) => void;
}> = ({ onNavigate, ...props }) => (
  <Breadcrumb
    onClick={onNavigate}
    separator="arrow"
    variant="primary"
    {...props}
  />
);

export default Breadcrumb;
