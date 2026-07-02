import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  forwardRef,
  useRef,
  useImperativeHandle,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import {
  AnchorProps,
  AnchorLinkProps,
  AnchorContextValue,
  UseAnchorScrollReturn,
  UseScrollSpyOptions,
  UseScrollSpyReturn,
  ANCHOR_DEFAULTS,
  scrollToElement,
  getCurrentAnchor,
  getAccessibleAnchorDescription,
  AnchorLinkItem,
} from "./Anchor.types";
import {
  StyledAnchor,
  StyledAnchorLink,
  StyledAnchorInk,
  SidebarAnchor,
  TopAnchor,
  CompactAnchor,
  SpacedAnchor,
  BorderedAnchor,
  HighContrastAnchor,
  LargeTextAnchor,
  AnimatedAnchor,
  AnchorSkeleton,
  AnchorEmpty,
} from "./Anchor.styles";

// =============================================================================
// CONTEXT
// =============================================================================

const AnchorContext = createContext<AnchorContextValue | null>(null);

export const useAnchorContext = () => {
  const context = useContext(AnchorContext);
  if (!context) {
    throw new Error("useAnchorContext must be used within an Anchor component");
  }
  return context;
};

// =============================================================================
// HOOKS
// =============================================================================

export const useScrollSpy = ({
  offset = 0,
  smooth = true,
  container,
  throttle = 100,
}: UseScrollSpyOptions = {}): UseScrollSpyReturn => {
  const [activeId, setActiveId] = useState<string>("");
  const [links, setLinks] = useState<string[]>([]);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateActiveId = useCallback(() => {
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
    }

    throttleTimeoutRef.current = setTimeout(() => {
      const currentActive = getCurrentAnchor(links, offset, 5, container);
      if (currentActive !== activeId) {
        setActiveId(currentActive);
      }
    }, throttle);
  }, [links, offset, container, throttle, activeId]);

  const scrollToId = useCallback(
    (id: string) => {
      const element = document.getElementById(id.replace("#", ""));
      if (element) {
        scrollToElement(element, offset, { ...ANCHOR_DEFAULTS.scrollAnimation, smooth }, container);
      }
    },
    [offset, smooth, container]
  );

  useEffect(() => {
    const scrollContainer = container || window;
    
    scrollContainer.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId, { passive: true });

    // Initial check
    updateActiveId();

    return () => {
      scrollContainer.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
      
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [updateActiveId, container]);

  // Auto-detect links on page
  useEffect(() => {
    const detectLinks = () => {
      const anchorElements = Array.from(document.querySelectorAll("[id]"));
      const detectedLinks = anchorElements
        .map(el => `#${el.id}`)
        .filter(link => link !== "#");
      
      setLinks(detectedLinks);
    };

    detectLinks();
    
    // Re-detect on DOM changes
    const observer = new MutationObserver(detectLinks);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id"],
    });

    return () => observer.disconnect();
  }, []);

  return { activeId, scrollToId };
};

export const useAnchorScroll = (
  targetOffset: number = 0,
  container?: HTMLElement | Window
): UseAnchorScrollReturn => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [registeredLinks, setRegisteredLinks] = useState<Map<string, HTMLElement>>(new Map());

  const scrollTo = useCallback(
    (link: string) => {
      const element = registeredLinks.get(link) || document.getElementById(link.replace("#", ""));
      if (element) {
        scrollToElement(element, targetOffset, ANCHOR_DEFAULTS.scrollAnimation, container);
        setActiveLink(link);
      }
    },
    [registeredLinks, targetOffset, container]
  );

  const registerLink = useCallback((link: string, element: HTMLElement) => {
    setRegisteredLinks(prev => new Map(prev).set(link, element));
  }, []);

  const unregisterLink = useCallback((link: string) => {
    setRegisteredLinks(prev => {
      const newMap = new Map(prev);
      newMap.delete(link);
      return newMap;
    });
  }, []);

  // Auto-update active link based on scroll
  useEffect(() => {
    const updateActiveLink = () => {
      const links = Array.from(registeredLinks.keys());
      const currentActive = getCurrentAnchor(links, targetOffset, 5, container);
      if (currentActive !== activeLink) {
        setActiveLink(currentActive);
      }
    };

    const scrollContainer = container || window;
    scrollContainer.addEventListener("scroll", updateActiveLink, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", updateActiveLink);
    };
  }, [registeredLinks, activeLink, targetOffset, container]);

  return {
    activeLink,
    scrollTo,
    registerLink,
    unregisterLink,
  };
};

// =============================================================================
// ANCHOR LINK COMPONENT
// =============================================================================

export const AnchorLink = forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  (
    {
      href,
      title,
      target,
      replace,
      onClick,
      className,
      style,
      accessibility: accessibilityProp,
      ...props
    },
    ref
  ) => {
    const { accessibility: contextAccessibility } = usePersonalization();
    const anchorContext = useAnchorContext();

    const accessibility = useMemo(() => ({
      ...contextAccessibility,
      ...accessibilityProp,
    }), [contextAccessibility, accessibilityProp]);

    const isActive = anchorContext.activeLink === href;
    const level = 0; // Could be enhanced to detect nesting level

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.(e);
        anchorContext.onClick(e, { title, href });
      },
      [onClick, anchorContext, title, href]
    );

    const accessibleDescription = useMemo(
      () => getAccessibleAnchorDescription(title, href, isActive),
      [title, href, isActive]
    );

    return (
      <StyledAnchorLink
        ref={ref}
        href={href}
        target={target}
        onClick={handleClick}
        className={`anchor-link ${isActive ? "active" : ""} ${className || ""}`}
        style={style}
        $active={isActive}
        $level={level}
        accessibility={accessibility}
        aria-label={accessibility.textToSpeech ? accessibleDescription : undefined}
        data-level={level}
        {...props}
      >
        {title}
      </StyledAnchorLink>
    );
  }
);

AnchorLink.displayName = "AnchorLink";

// =============================================================================
// MAIN ANCHOR COMPONENT
// =============================================================================

export const Anchor = forwardRef<HTMLElement, AnchorProps>(
  (
    {
      items = [],
      children,
      affix = ANCHOR_DEFAULTS.affix,
      showInkInFixed = ANCHOR_DEFAULTS.showInkInFixed,
      getCurrentAnchor: getCurrentAnchorProp,
      onClick,
      onChange,
      targetOffset = ANCHOR_DEFAULTS.targetOffset,
      offsetTop = ANCHOR_DEFAULTS.offsetTop,
      bounds = ANCHOR_DEFAULTS.bounds,
      getContainer,
      size = ANCHOR_DEFAULTS.size,
      variant = ANCHOR_DEFAULTS.variant,
      direction = ANCHOR_DEFAULTS.direction,
      placement = ANCHOR_DEFAULTS.placement,
      replace = ANCHOR_DEFAULTS.replace,
      className,
      style,
      id,
      accessibility: accessibilityProp,
      ...props
    },
    ref
  ) => {
    // =============================================================================
    // STATE AND REFS
    // =============================================================================

    const [activeLink, setActiveLink] = useState<string>("");
    const [inkStyle, setInkStyle] = useState<{ offset: number; height: number }>({
      offset: 0,
      height: 0,
    });
    
    const containerRef = useRef<HTMLElement>(null);
    const linksRef = useRef<Map<string, HTMLElement>>(new Map());

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
    // SCROLL HANDLING
    // =============================================================================

    const scrollContainer = useMemo(() => {
      if (getContainer) {
        return getContainer();
      }
      return window;
    }, [getContainer]);

    const { activeId, scrollToId } = useScrollSpy({
      offset: targetOffset,
      smooth: true,
      container: scrollContainer,
      throttle: 100,
    });

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => {
        e.preventDefault();
        
        onClick?.(e, link);
        
        // Scroll to target
        scrollToId(link.href);
        
        // Update active link
        setActiveLink(link.href);
        onChange?.(link.href);
        
        // Handle replace navigation
        if (replace) {
          window.history.replaceState(null, "", link.href);
        } else {
          window.history.pushState(null, "", link.href);
        }
      },
      [onClick, onChange, scrollToId, replace]
    );

    // =============================================================================
    // INK INDICATOR POSITIONING
    // =============================================================================

    const updateInkPosition = useCallback(() => {
      if (!showInkInFixed && !affix) return;
      
      const activeElement = linksRef.current.get(activeLink);
      if (!activeElement || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      if (direction === "vertical") {
        const offset = activeRect.top - containerRect.top;
        const height = activeRect.height;
        setInkStyle({ offset, height });
      } else {
        const offset = activeRect.left - containerRect.left;
        const height = activeRect.width;
        setInkStyle({ offset, height });
      }
    }, [activeLink, direction, showInkInFixed, affix]);

    // =============================================================================
    // EFFECTS
    // =============================================================================

    // Update active link based on scroll spy
    useEffect(() => {
      if (activeId && activeId !== activeLink) {
        setActiveLink(activeId);
        onChange?.(activeId);
      }
    }, [activeId, activeLink, onChange]);

    // Update ink position when active link changes
    useEffect(() => {
      updateInkPosition();
    }, [updateInkPosition]);

    // Handle window resize
    useEffect(() => {
      const handleResize = () => {
        updateInkPosition();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [updateInkPosition]);

    // Custom getCurrentAnchor override
    useEffect(() => {
      if (getCurrentAnchorProp) {
        const customActive = getCurrentAnchorProp();
        if (customActive && customActive !== activeLink) {
          setActiveLink(customActive);
        }
      }
    }, [getCurrentAnchorProp, activeLink]);

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================

    useImperativeHandle(ref, () => containerRef.current!, []);

    // =============================================================================
    // RENDER HELPERS
    // =============================================================================

    const renderAnchorItems = useCallback(
      (itemList: AnchorLinkItem[], level = 0): React.ReactNode[] => {
        return itemList.map((item) => {
          const linkElement = (
            <AnchorLink
              key={item.key}
              href={item.href}
              title={item.title}
              className={`anchor-link level-${level}`}
              style={{ paddingLeft: level > 0 ? `${16 + level * 12}px` : undefined }}
              onClick={(e) => {
                const linkRef = e.currentTarget;
                linksRef.current.set(item.href, linkRef);
              }}
            />
          );

          const nestedItems = item.children ? renderAnchorItems(item.children, level + 1) : [];

          return [linkElement, ...nestedItems];
        });
      },
      []
    );

    const renderChildren = useCallback(() => {
      if (!children) return null;

      return React.Children.map(children, (child) => {
        if (isValidElement(child) && child.type === AnchorLink) {
          const linkProps = child.props as AnchorLinkProps;
          
          return cloneElement(child as ReactElement<AnchorLinkProps>, {
            ...linkProps,
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
              const linkRef = e.currentTarget;
              linksRef.current.set(linkProps.href, linkRef);
              linkProps.onClick?.(e);
            },
          });
        }
        return child;
      });
    }, [children]);

    // =============================================================================
    // CONTEXT VALUE
    // =============================================================================

    const contextValue = useMemo<AnchorContextValue>(
      () => ({
        activeLink,
        setActiveLink,
        onClick: handleClick,
        direction,
        targetOffset,
      }),
      [activeLink, handleClick, direction, targetOffset]
    );

    // =============================================================================
    // RENDER
    // =============================================================================

    const finalId = id ? `anchor-${id}` : undefined;

    return (
      <AnchorContext.Provider value={contextValue}>
        <StyledAnchor
          id={finalId}
          ref={containerRef}
          className={`anchor ${className || ""}`}
          style={style}
          $size={size}
          $variant={variant}
          $direction={direction}
          $placement={placement}
          $affix={affix}
          accessibility={accessibility}
          role="navigation"
          aria-label="Page navigation"
          {...props}
        >
          {/* Ink indicator */}
          {(showInkInFixed || affix) && (
            <StyledAnchorInk
              className="anchor-ink"
              $direction={direction}
              $offset={inkStyle.offset}
              $height={inkStyle.height}
              accessibility={accessibility}
            />
          )}

          {/* Render items or children */}
          {items.length > 0 ? renderAnchorItems(items) : renderChildren()}
        </StyledAnchor>
      </AnchorContext.Provider>
    );
  }
);

Anchor.displayName = "Anchor";

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Direction variants
export const VerticalAnchorComponent: React.FC<AnchorProps> = (props) => (
  <Anchor direction="vertical" {...props} />
);

export const HorizontalAnchorComponent: React.FC<AnchorProps> = (props) => (
  <Anchor direction="horizontal" {...props} />
);

// Placement variants
export const LeftAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor placement="left" direction="vertical" {...props} />
);

export const RightAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor placement="right" direction="vertical" {...props} />
);

export const TopAnchorComponent: React.FC<AnchorProps> = (props) => (
  <Anchor placement="top" direction="horizontal" affix={true} {...props} />
);

export const BottomAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor placement="bottom" direction="horizontal" affix={true} {...props} />
);

// Behavior variants
export const AffixAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor affix={true} showInkInFixed={true} {...props} />
);

export const StaticAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor affix={false} showInkInFixed={false} {...props} />
);

export const ScrollSpyAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor showInkInFixed={true} bounds={10} {...props} />
);

// Size variants
export const SmallAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor size="sm" {...props} />
);

export const MediumAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor size="md" {...props} />
);

export const LargeAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor size="lg" {...props} />
);

// Variant styles
export const PrimaryAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor variant="primary" {...props} />
);

export const SecondaryAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor variant="secondary" {...props} />
);

// Layout variants
export const SidebarAnchorComponent: React.FC<AnchorProps> = (props) => (
  <Anchor 
    affix={true}
    placement="right"
    direction="vertical"
    showInkInFixed={true}
    {...props}
  />
);

export const CompactAnchorComponent: React.FC<AnchorProps> = (props) => (
  <Anchor size="sm" {...props} />
);

export const SpacedAnchorComponent: React.FC<AnchorProps> = (props) => (
  <Anchor size="lg" {...props} />
);

// Use case variants
export const TableOfContentsAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor
    direction="vertical"
    showInkInFixed={true}
    bounds={10}
    targetOffset={80}
    {...props}
  />
);

export const NavigationAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor
    direction="horizontal"
    affix={true}
    placement="top"
    showInkInFixed={true}
    {...props}
  />
);

export const DocumentOutlineAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor
    direction="vertical"
    affix={true}
    placement="left"
    showInkInFixed={true}
    bounds={5}
    {...props}
  />
);

export const PageIndexAnchor: React.FC<AnchorProps> = (props) => (
  <Anchor
    direction="vertical"
    showInkInFixed={true}
    targetOffset={20}
    bounds={15}
    {...props}
  />
);

// Layout components using styled variants
export const SidebarAnchorLayout = SidebarAnchor;
export const TopAnchorLayout = TopAnchor;
export const CompactAnchorLayout = CompactAnchor;
export const SpacedAnchorLayout = SpacedAnchor;
export const BorderedAnchorLayout = BorderedAnchor;
export const HighContrastAnchorLayout = HighContrastAnchor;
export const LargeTextAnchorLayout = LargeTextAnchor;
export const AnimatedAnchorLayout = AnimatedAnchor;

// Loading and empty states
export const LoadingAnchor: React.FC<AnchorProps> = (props) => (
  <AnchorSkeleton>
    <div className="skeleton-link" />
    <div className="skeleton-link" />
    <div className="skeleton-link" />
    <div className="skeleton-link" />
    <div className="skeleton-link" />
  </AnchorSkeleton>
);

export const EmptyAnchor: React.FC<AnchorProps> = (props) => (
  <AnchorEmpty>
    <div className="empty-icon">🔗</div>
    <div className="empty-text">No anchors available</div>
  </AnchorEmpty>
);

export default Anchor;
