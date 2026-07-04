import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import {
  BackTopProps,
  UseBackTopReturn,
  UseScrollProgressOptions,
  UseScrollProgressReturn,
  BACKTOP_DEFAULTS,
  getScrollTop,
  getDocumentHeight,
  getViewportHeight,
  scrollToTop,
  calculateScrollProgress,
  shouldShowBackTop,
  getAccessibleBackTopDescription,
  getBackTopIcon,
} from "./BackTop.types";
import {
  StyledBackTop,
  StyledBackTopContent,
  StyledProgressRing,
  CircleBackTop,
  SquareBackTop,
  RoundBackTop,
  FloatingBackTop,
  PulsingBackTop,
  RotatingBackTop,
  CompactBackTop,
  LargeBackTop,
  TextBackTop,
  HighContrastBackTop,
  LargeTextBackTop,
  BackTopSkeleton,
  MobileBackTop,
} from "./BackTop.styles";

// =============================================================================
// HOOKS
// =============================================================================

export const useScrollProgress = ({
  container,
  throttle = 100,
}: UseScrollProgressOptions = {}): UseScrollProgressReturn => {
  const [scrollTop, setScrollTop] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateScrollData = useCallback(() => {
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
    }

    throttleTimeoutRef.current = setTimeout(() => {
      const currentScrollTop = getScrollTop(container);
      const currentDocumentHeight = getDocumentHeight(container);
      const currentViewportHeight = getViewportHeight(container);

      setScrollTop(currentScrollTop);
      setDocumentHeight(currentDocumentHeight);
      setViewportHeight(currentViewportHeight);
    }, throttle);
  }, [container, throttle]);

  const scrollProgress = useMemo(() => {
    return calculateScrollProgress(scrollTop, documentHeight, viewportHeight);
  }, [scrollTop, documentHeight, viewportHeight]);

  useEffect(() => {
    const scrollContainer = container || window;
    
    // Initial update
    updateScrollData();
    
    scrollContainer.addEventListener("scroll", updateScrollData, { passive: true });
    window.addEventListener("resize", updateScrollData, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollData);
      window.removeEventListener("resize", updateScrollData);
      
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [updateScrollData, container]);

  return {
    scrollTop,
    scrollProgress,
    documentHeight,
    viewportHeight,
  };
};

export const useBackTop = (
  visibilityHeight: number = BACKTOP_DEFAULTS.visibilityHeight,
  target?: () => HTMLElement | Window
): UseBackTopReturn => {
  const container = useMemo(() => target?.(), [target]);
  const { scrollTop, scrollProgress } = useScrollProgress({ container });
  
  const visible = useMemo(() => {
    return shouldShowBackTop(scrollTop, visibilityHeight);
  }, [scrollTop, visibilityHeight]);

  const scrollToTopHandler = useCallback(() => {
    scrollToTop(container, BACKTOP_DEFAULTS.scrollAnimation);
  }, [container]);

  return {
    visible,
    scrollToTop: scrollToTopHandler,
    scrollProgress,
  };
};

// =============================================================================
// MAIN BACKTOP COMPONENT
// =============================================================================

export interface BackTopRef {
  scrollToTop: () => void;
  element: HTMLButtonElement | null;
}

export const BackTop = forwardRef<BackTopRef, BackTopProps>(
  (
    {
      visibilityHeight = BACKTOP_DEFAULTS.visibilityHeight,
      onClick,
      target,
      duration = BACKTOP_DEFAULTS.duration,
      easing = BACKTOP_DEFAULTS.easing,
      smooth = BACKTOP_DEFAULTS.smooth,
      size = BACKTOP_DEFAULTS.size,
      variant = BACKTOP_DEFAULTS.variant,
      shape = BACKTOP_DEFAULTS.shape,
      placement = BACKTOP_DEFAULTS.placement,
      children,
      icon,
      text,
      right = BACKTOP_DEFAULTS.right,
      left,
      bottom = BACKTOP_DEFAULTS.bottom,
      zIndex = BACKTOP_DEFAULTS.zIndex,
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

    const buttonRef = useRef<HTMLButtonElement>(null);
    
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
    // SCROLL BEHAVIOR
    // =============================================================================

    const targetContainer = useMemo(() => target?.(), [target]);
    const { visible, scrollToTop: scrollToTopHandler, scrollProgress } = useBackTop(
      visibilityHeight,
      target
    );

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        onClick?.(event);
        
        // Scroll to top with custom animation settings
        scrollToTop(targetContainer, { duration, easing, smooth });
      },
      [onClick, targetContainer, duration, easing, smooth]
    );

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================

    useImperativeHandle(ref, () => ({
      scrollToTop: scrollToTopHandler,
      element: buttonRef.current,
    }));

    // =============================================================================
    // CONTENT RENDERING
    // =============================================================================

    const renderContent = useCallback(() => {
      const hasIcon = !!icon || !children;
      const hasText = !!text;
      const defaultIcon = getBackTopIcon();

      return (
        <StyledBackTopContent 
          $hasIcon={hasIcon}
          $hasText={hasText}
          accessibility={accessibility}
        >
          {hasIcon && (
            <div className="backtop-icon">
              {icon || defaultIcon}
            </div>
          )}
          
          {hasText && (
            <div className="backtop-text">
              {text}
            </div>
          )}
          
          {children}
        </StyledBackTopContent>
      );
    }, [icon, text, children, accessibility]);

    // =============================================================================
    // ACCESSIBILITY DESCRIPTION
    // =============================================================================

    const accessibleDescription = useMemo(
      () => getAccessibleBackTopDescription(scrollProgress, visible),
      [scrollProgress, visible]
    );

    // =============================================================================
    // RENDER
    // =============================================================================

    const finalId = id ? `back-top-${id}` : undefined;

    return (
      <StyledBackTop
        id={finalId}
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className={`backtop ${className || ""}`}
        style={style}
        $size={size}
        $variant={variant}
        $shape={shape}
        $placement={placement}
        $visible={visible}
        $right={right}
        $left={left}
        $bottom={bottom}
        $zIndex={zIndex}
        accessibility={accessibility}
        aria-label={accessibility.textToSpeech ? accessibleDescription : "Back to top"}
        title="Back to top"
        {...props}
      >
        {/* Progress ring for scroll progress */}
        {scrollProgress > 0 && (
          <StyledProgressRing 
            $progress={scrollProgress} 
            accessibility={accessibility}
          />
        )}
        
        {renderContent()}
      </StyledBackTop>
    );
  }
);

BackTop.displayName = "BackTop";

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Shape variants
export const CircleBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop shape="circle" {...props} />
);

export const SquareBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop shape="square" {...props} />
);

export const RoundBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop shape="round" {...props} />
);

// Size variants
export const SmallBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop size="sm" {...props} />
);

export const MediumBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop size="md" {...props} />
);

export const LargeBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop size="lg" {...props} />
);

export const ExtraLargeBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop size="xl" {...props} />
);

// Variant styles
export const PrimaryBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="primary" {...props} />
);

export const SecondaryBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="secondary" {...props} />
);

export const SuccessBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="success" {...props} />
);

export const WarningBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="warning" {...props} />
);

export const ErrorBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="error" {...props} />
);

export const InfoBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="info" {...props} />
);

export const GhostBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop variant="ghost" {...props} />
);

// Placement variants
export const RightBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop placement="right" {...props} />
);

export const LeftBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop placement="left" {...props} />
);

export const CenterBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop placement="center" {...props} />
);

// Behavior variants
export const FastBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop duration={200} easing="ease-out" {...props} />
);

export const SlowBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop duration={800} easing="ease-in-out" {...props} />
);

export const SmoothBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop smooth={true} duration={450} easing="ease-in-out" {...props} />
);

export const InstantBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop smooth={false} {...props} />
);

// Visibility variants
export const EarlyBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop visibilityHeight={200} {...props} />
);

export const LateBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop visibilityHeight={800} {...props} />
);

// Content variants
export const IconBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop {...props} />
);

export const TextBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop text="Top" shape="round" {...props} />
);

export const IconTextBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop 
    text="Top" 
    shape="round" 
    size="lg"
    {...props} 
  />
);

// Use case variants
export const FloatingBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop
    shape="circle"
    variant="primary"
    visibilityHeight={300}
    duration={400}
    {...props}
  />
);

export const MinimalBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop
    variant="ghost"
    shape="circle"
    size="sm"
    visibilityHeight={400}
    {...props}
  />
);

export const ProgressBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop
    variant="primary"
    shape="circle"
    size="lg"
    visibilityHeight={100}
    {...props}
  />
);

export const MobileBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop
    size="md"
    shape="circle"
    variant="primary"
    right={20}
    bottom={20}
    visibilityHeight={300}
    {...props}
  />
);

// Layout components using styled variants
export const CircleBackTopLayout = CircleBackTop;
export const SquareBackTopLayout = SquareBackTop;
export const RoundBackTopLayout = RoundBackTop;
export const FloatingBackTopLayout = FloatingBackTop;
export const PulsingBackTopLayout = PulsingBackTop;
export const RotatingBackTopLayout = RotatingBackTop;
export const CompactBackTopLayout = CompactBackTop;
export const LargeBackTopLayout = LargeBackTop;
export const TextBackTopLayout = TextBackTop;
export const HighContrastBackTopLayout = HighContrastBackTop;
export const LargeTextBackTopLayout = LargeTextBackTop;
export const MobileBackTopLayout = MobileBackTop;

// Loading state
export const LoadingBackTop: React.FC<BackTopProps> = (props) => (
  <BackTopSkeleton />
);

// Accessibility variants
export const HighContrastBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop
    variant="inverse"
    shape="square"
    size="lg"
    accessibility={{ highContrast: true }}
    {...props}
  />
);

export const LargeTextBackTopComponent: React.FC<BackTopProps> = (props) => (
  <BackTop
    size="xl"
    text="TOP"
    shape="round"
    accessibility={{ largeText: true }}
    {...props}
  />
);

export const ReducedMotionBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop
    smooth={false}
    accessibility={{ reducedMotion: true }}
    {...props}
  />
);

// Advanced variants
export const AnimatedBackTop: React.FC<BackTopProps> = (props) => (
  <BackTop
    variant="primary"
    shape="circle"
    duration={600}
    easing="ease-out"
    {...props}
  />
);

export const CustomPositionBackTop: React.FC<BackTopProps & { 
  customRight?: number; 
  customBottom?: number; 
}> = ({ customRight, customBottom, ...props }) => (
  <BackTop
    right={customRight}
    bottom={customBottom}
    {...props}
  />
);

export default BackTop;
