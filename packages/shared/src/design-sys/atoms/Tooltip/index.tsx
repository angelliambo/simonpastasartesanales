import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  TooltipProps,
  TOOLTIP_DEFAULTS,
  SIZE_MAPPING_TOOLTIP,
  VARIANT_MAPPING_TOOLTIP,
  TooltipSize,
  TooltipVariant,
  TooltipPlacement,
  TooltipTrigger,
  TooltipPositioning,
} from "./Tooltip.types";
import {
  TooltipOverlay,
  TooltipContent,
  TooltipArrow,
  TooltipWrapper,
  TooltipLoading,
} from "./Tooltip.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a TooltipSize usando shared system
const mapTooltipSize = (size: TooltipProps["size"]): TooltipSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_TOOLTIP[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a TooltipVariant usando shared system
const mapTooltipVariant = (variant: TooltipProps["variant"]): TooltipVariant => {
  if (!variant) return "dark";

  const mapped = VARIANT_MAPPING_TOOLTIP[variant];
  return mapped || "dark";
};

// Calcular posición del tooltip
const calculateTooltipPosition = (
  triggerElement: HTMLElement,
  tooltipElement: HTMLElement,
  placement: TooltipPlacement
): TooltipPositioning => {
  if (!triggerElement || !tooltipElement) {
    return { x: 0, y: 0, placement };
  }

  const triggerRect = triggerElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let x = 0;
  let y = 0;

  // Calcular posición base según placement
  switch (placement) {
    case "top":
      x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      y = triggerRect.top - tooltipRect.height - 8;
      break;
    case "topLeft":
      x = triggerRect.left;
      y = triggerRect.top - tooltipRect.height - 8;
      break;
    case "topRight":
      x = triggerRect.right - tooltipRect.width;
      y = triggerRect.top - tooltipRect.height - 8;
      break;
    case "bottom":
      x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      y = triggerRect.bottom + 8;
      break;
    case "bottomLeft":
      x = triggerRect.left;
      y = triggerRect.bottom + 8;
      break;
    case "bottomRight":
      x = triggerRect.right - tooltipRect.width;
      y = triggerRect.bottom + 8;
      break;
    case "left":
      x = triggerRect.left - tooltipRect.width - 8;
      y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      break;
    case "leftTop":
      x = triggerRect.left - tooltipRect.width - 8;
      y = triggerRect.top;
      break;
    case "leftBottom":
      x = triggerRect.left - tooltipRect.width - 8;
      y = triggerRect.bottom - tooltipRect.height;
      break;
    case "right":
      x = triggerRect.right + 8;
      y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      break;
    case "rightTop":
      x = triggerRect.right + 8;
      y = triggerRect.top;
      break;
    case "rightBottom":
      x = triggerRect.right + 8;
      y = triggerRect.bottom - tooltipRect.height;
      break;
    default:
      x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      y = triggerRect.top - tooltipRect.height - 8;
  }

  // Ajustar si se sale del viewport
  if (x < 8) x = 8;
  if (x + tooltipRect.width > viewport.width - 8) {
    x = viewport.width - tooltipRect.width - 8;
  }
  if (y < 8) y = 8;
  if (y + tooltipRect.height > viewport.height - 8) {
    y = viewport.height - tooltipRect.height - 8;
  }

  return { x, y, placement };
};

// Normalizar triggers a array
const normalizeTriggers = (trigger: TooltipTrigger | TooltipTrigger[]): TooltipTrigger[] => {
  return Array.isArray(trigger) ? trigger : [trigger];
};

// =====================================
// TOOLTIP COMPONENT
// =====================================

/**
 * Tooltip Component - Componente tooltip unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ Positioning system avanzado con 12 placements
 * - ✅ Multiple triggers: hover, focus, click, contextMenu
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Tooltip
 *
 * Reemplazo directo de Ant Design Tooltip con sistema unificado.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  size = TOOLTIP_DEFAULTS.size,
  variant = TOOLTIP_DEFAULTS.variant,
  placement = TOOLTIP_DEFAULTS.placement,
  trigger = TOOLTIP_DEFAULTS.trigger,
  visible,
  defaultVisible = false,
  mouseEnterDelay = TOOLTIP_DEFAULTS.mouseEnterDelay,
  mouseLeaveDelay = TOOLTIP_DEFAULTS.mouseLeaveDelay,
  showArrow = TOOLTIP_DEFAULTS.showArrow,
  arrowPointAtCenter = TOOLTIP_DEFAULTS.arrowPointAtCenter,
  overlayClassName,
  overlayStyle,
  getPopupContainer,
  zIndex = TOOLTIP_DEFAULTS.zIndex,
  accessibility: accessibilityProp,
  onVisibleChange,
  id,
  role = "tooltip",
  className,
  style,
  destroyTooltipOnHide = TOOLTIP_DEFAULTS.destroyTooltipOnHide,
  ...rest
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  const finalId = id ? `tooltip-${id}` : undefined;

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapTooltipSize(size);
  const mappedVariant = mapTooltipVariant(variant);

  // Estado interno
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const [position, setPosition] = useState<TooltipPositioning>({ 
    x: 0, 
    y: 0, 
    placement 
  });

  // Referencias
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Estado controlled vs uncontrolled
  const isControlled = visible !== undefined;
  const currentVisible = isControlled ? visible : internalVisible;

  // Normalizar triggers
  const triggers = normalizeTriggers(trigger);

  // Actualizar visibilidad
  const updateVisible = useCallback((newVisible: boolean) => {
    if (!isControlled) {
      setInternalVisible(newVisible);
    }
    onVisibleChange?.(newVisible);
  }, [isControlled, onVisibleChange]);

  // Calcular posición cuando se hace visible
  const updatePosition = useCallback(() => {
    if (currentVisible && triggerRef.current && tooltipRef.current) {
      const newPosition = calculateTooltipPosition(
        triggerRef.current,
        tooltipRef.current,
        placement
      );
      setPosition(newPosition);
    }
  }, [currentVisible, placement]);

  // Show tooltip con delay
  const showTooltip = useCallback(() => {
    // console.log("[Tooltip] showTooltip called");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (mouseEnterDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        updateVisible(true);
      }, mouseEnterDelay);
    } else {
      updateVisible(true);
    }
  }, [mouseEnterDelay, updateVisible]);

  // Hide tooltip con delay
  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (mouseLeaveDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        updateVisible(false);
      }, mouseLeaveDelay);
    } else {
      updateVisible(false);
    }
  }, [mouseLeaveDelay, updateVisible]);

  // Toggle tooltip (para click)
  const toggleTooltip = useCallback(() => {
    if (currentVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  }, [currentVisible, showTooltip, hideTooltip]);

  // Effect para calcular posición
  useEffect(() => {
    if (currentVisible) {
      // Delay para permitir que el DOM se renderice
      const timeout = setTimeout(updatePosition, 0);
      return () => clearTimeout(timeout);
    }
  }, [currentVisible, updatePosition]);

  // Effect para window resize
  useEffect(() => {
    const handleResize = () => {
      if (currentVisible) {
        updatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [currentVisible, updatePosition]);

  // Effect para cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Crear event handlers para el trigger element
  const createTriggerProps = () => {
    const props: any = {
      ref: (el: HTMLElement) => {
        triggerRef.current = el;
        // Preservar ref original si existe (usando props del children)
        const originalRef = (children as any).ref;
        if (typeof originalRef === "function") {
          originalRef(el);
        } else if (originalRef && typeof originalRef === "object") {
          originalRef.current = el;
        }
      }
    };

    triggers.forEach((trig) => {
      switch (trig) {
        case "hover":
          props.onMouseEnter = showTooltip;
          props.onMouseLeave = hideTooltip;
          break;
        case "focus":
          props.onFocus = showTooltip;
          props.onBlur = hideTooltip;
          break;
        case "click":
          props.onClick = (e: React.MouseEvent) => {
            e.preventDefault();
            toggleTooltip();
            // Preservar onClick original
            const originalOnClick = (children as any).props?.onClick;
            if (originalOnClick) {
              originalOnClick(e);
            }
          };
          break;
        case "contextMenu":
          props.onContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            showTooltip();
            // Preservar onContextMenu original
            const originalOnContextMenu = (children as any).props?.onContextMenu;
            if (originalOnContextMenu) {
              originalOnContextMenu(e);
            }
          };
          break;
      }
    });

    return props;
  };

  // Renderizar tooltip content
  const renderTooltipContent = () => {
    if (!title) return null;

    return (
      <TooltipContent
        $size={mappedSize}
        $variant={mappedVariant}
        accessibility={accessibility}
      >
        {title}
      </TooltipContent>
    );
  };

  // Renderizar arrow si está habilitado
  const renderArrow = () => {
    if (!showArrow) return null;

    return (
      <TooltipArrow
        $placement={placement}
        $size={mappedSize}
        $variant={mappedVariant}
        accessibility={accessibility}
      />
    );
  };

  // Renderizar tooltip overlay
  const renderTooltip = () => {
    if (!currentVisible && destroyTooltipOnHide) {
      return null;
    }

    const tooltipElement = (
      <TooltipOverlay
        ref={tooltipRef}
        className={overlayClassName}
        style={{
          left: position.x,
          top: position.y,
          ...overlayStyle,
        }}
        $placement={placement}
        $size={mappedSize}
        $variant={mappedVariant}
        $visible={currentVisible}
        accessibility={accessibility}
        zIndex={zIndex}
        role={role}
        id={finalId}
        aria-hidden={role === "tooltip" ? !currentVisible : undefined}
      >
        {renderTooltipContent()}
        {renderArrow()}
      </TooltipOverlay>
    );

    // Renderizar en container específico o en body
    const container = getPopupContainer ? getPopupContainer() : document.body;
    return ReactDOM.createPortal(tooltipElement, container);
  };

  // Si no hay título, renderizar solo children
  if (!title) {
    return children;
  }

  // Clonar children con props adicionales
  const triggerElement = React.cloneElement(children, {
    ...createTriggerProps(),
    "aria-describedby": currentVisible ? id : undefined,
  });

  return (
    <TooltipWrapper className={className} style={style} {...rest}>
      {triggerElement}
      {renderTooltip()}
    </TooltipWrapper>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS
// =====================================

// Tooltip básico sin variante específica
export const BasicTooltip: React.FC<Omit<TooltipProps, "variant">> = (props) => (
  <Tooltip variant="secondary" {...props} />
);

// Tooltip informativo
export const InfoTooltip: React.FC<Omit<TooltipProps, "variant">> = (props) => (
  <Tooltip variant="info" {...props} />
);

// Tooltip de éxito
export const SuccessTooltip: React.FC<Omit<TooltipProps, "variant">> = (props) => (
  <Tooltip variant="success" {...props} />
);

// Tooltip de advertencia
export const WarningTooltip: React.FC<Omit<TooltipProps, "variant">> = (props) => (
  <Tooltip variant="warning" {...props} />
);

// Tooltip de error
export const ErrorTooltip: React.FC<Omit<TooltipProps, "variant">> = (props) => (
  <Tooltip variant="error" {...props} />
);

// Tooltip claro (fondo blanco)
export const LightTooltip: React.FC<Omit<TooltipProps, "variant">> = (props) => (
  <Tooltip variant="inverse" {...props} />
);

// =====================================
// TAMAÑOS PREDEFINIDOS
// =====================================

// Tooltip pequeño
export const SmallTooltip: React.FC<Omit<TooltipProps, "size">> = (props) => (
  <Tooltip size="sm" {...props} />
);

// Tooltip grande
export const LargeTooltip: React.FC<Omit<TooltipProps, "size">> = (props) => (
  <Tooltip size="lg" {...props} />
);

// =====================================
// TRIGGERS PREDEFINIDOS
// =====================================

// Tooltip que se activa solo con click
export const ClickTooltip: React.FC<Omit<TooltipProps, "trigger">> = (props) => (
  <Tooltip trigger="click" {...props} />
);

// Tooltip que se activa solo con focus
export const FocusTooltip: React.FC<Omit<TooltipProps, "trigger">> = (props) => (
  <Tooltip trigger="focus" {...props} />
);

// =====================================
// PLACEMENTS PREDEFINIDOS
// =====================================

// Tooltip siempre arriba
export const TopTooltip: React.FC<Omit<TooltipProps, "placement">> = (props) => (
  <Tooltip placement="top" {...props} />
);

// Tooltip siempre abajo
export const BottomTooltip: React.FC<Omit<TooltipProps, "placement">> = (props) => (
  <Tooltip placement="bottom" {...props} />
);

// Tooltip a la izquierda
export const LeftTooltip: React.FC<Omit<TooltipProps, "placement">> = (props) => (
  <Tooltip placement="left" {...props} />
);

// Tooltip a la derecha
export const RightTooltip: React.FC<Omit<TooltipProps, "placement">> = (props) => (
  <Tooltip placement="right" {...props} />
);

// =====================================
// ESTILOS PREDEFINIDOS (usando styled components exportados)
// =====================================

// ElevatedTooltip, MinimalTooltip, CompactTooltip se exportan desde Tooltip.styles.ts

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Tooltip con loading
export const LoadingTooltip: React.FC<TooltipProps & { loading?: boolean }> = ({ 
  loading, 
  title, 
  ...props 
}) => (
  <Tooltip 
    title={loading ? <TooltipLoading>Cargando...</TooltipLoading> : title}
    {...props} 
  />
);

// Tooltip de ayuda (question mark)
export const HelpTooltip: React.FC<Omit<TooltipProps, "children">> = ({ title, ...props }) => (
  <InfoTooltip title={title} {...props}>
    <span style={{ 
      cursor: "help", 
      color: "#999", 
      fontSize: "14px",
      userSelect: "none"
    }}>
      ?
    </span>
  </InfoTooltip>
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Tooltip 
 *   title="Información útil"
 *   size="small"                    // "small" → "sm" automáticamente
 *   variant="danger"                // "danger" → "error" automáticamente
 * >
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // Multiple triggers
 * <Tooltip 
 *   title="Click o hover para ver"
 *   trigger={["hover", "click"]}
 *   placement="bottom"
 * >
 *   <Button>Multi-trigger</Button>
 * </Tooltip>
 *
 * // Controlled visibility
 * const [visible, setVisible] = useState(false);
 * <Tooltip
 *   title="Tooltip controlado"
 *   visible={visible}
 *   onVisibleChange={setVisible}
 * >
 *   <Button>Controlled</Button>
 * </Tooltip>
 *
 * // Componentes predefinidos
 * <SuccessTooltip title="Operación exitosa">
 *   <Button variant="success">Save</Button>
 * </SuccessTooltip>
 *
 * <ErrorTooltip 
 *   title="Error: Campo requerido"
 *   placement="right"
 * >
 *   <Input error />
 * </ErrorTooltip>
 *
 * // Casos específicos
 * <HelpTooltip title="Esta función te permite...">
 *   <Input placeholder="Username" />
 * </HelpTooltip>
 *
 * <LoadingTooltip 
 *   loading={isProcessing}
 *   title="Datos guardados"
 * >
 *   <Button loading={isProcessing}>Save</Button>
 * </LoadingTooltip>
 */

// Export por defecto
export default Tooltip;
