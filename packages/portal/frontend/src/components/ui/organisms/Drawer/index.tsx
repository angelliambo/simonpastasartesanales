import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  DrawerProps,
  DRAWER_DEFAULTS,
  SIZE_MAPPING_DRAWER,
} from "./Drawer.types";
import {
  DrawerMask,
  DrawerWrapper,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
} from "./Drawer.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { CloseOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";

// =====================================
// HELPER FUNCTIONS
// =====================================

// Mapear AllSize a DrawerSize usando shared system
const mapDrawerSize = (size: DrawerProps["size"]) => {
  if (!size) return DRAWER_DEFAULTS.size;

  const mapped = SIZE_MAPPING_DRAWER[size];
  return mapped || DRAWER_DEFAULTS.size;
};

// =====================================
// DRAWER COMPONENT
// =====================================

/**
 * Drawer Component - Componente de panel lateral unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ 4 posiciones: left, right, top, bottom
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Drawer
 *
 * Reemplazo directo de Ant Design Drawer con sistema unificado.
 */
export const Drawer: React.FC<DrawerProps> = ({
  visible: visibleProp,
  open: openProp,
  onClose,
  placement = DRAWER_DEFAULTS.placement,
  size = DRAWER_DEFAULTS.size,
  width,
  height,
  title,
  closable = DRAWER_DEFAULTS.closable,
  mask = DRAWER_DEFAULTS.mask,
  maskClosable = DRAWER_DEFAULTS.maskClosable,
  maskStyle,
  drawerStyle,
  headerStyle,
  bodyStyle,
  footer,
  footerStyle,
  zIndex = DRAWER_DEFAULTS.zIndex,
  afterVisibleChange,
  className,
  style,
  getContainer,
  accessibility: accessibilityProp,
  children,
  id,
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // Compatibilidad: visible o open
  const isVisible =
    visibleProp !== undefined
      ? visibleProp
      : openProp !== undefined
      ? openProp
      : false;

  const [internalVisible, setInternalVisible] = useState(isVisible);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapDrawerSize(size);

  // Calcular ancho/alto según tamaño
  const getDimensions = () => {
    if (width || height) {
      return { width, height };
    }

    const sizeMap: Record<string, { width?: string; height?: string }> = {
      sm: { width: "320px", height: "320px" },
      md: { width: "378px", height: "400px" },
      lg: { width: "480px", height: "500px" },
      xl: { width: "600px", height: "600px" },
    };

    return sizeMap[mappedSize] || sizeMap.md;
  };

  const dimensions = getDimensions();
  const finalWidth =
    placement === "left" || placement === "right"
      ? dimensions.width
      : undefined;
  const finalHeight =
    placement === "top" || placement === "bottom"
      ? dimensions.height
      : undefined;

  // Actualizar estado interno cuando cambia la prop
  useEffect(() => {
    setInternalVisible(isVisible);
  }, [isVisible]);

  // Callback after visible change
  useEffect(() => {
    if (afterVisibleChange) {
      afterVisibleChange(internalVisible);
    }
  }, [internalVisible, afterVisibleChange]);

  // Manejar cierre
  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (onClose) {
      onClose(e);
    } else {
      setInternalVisible(false);
    }
  };

  // Manejar click en mask
  const handleMaskClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  // Manejar escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && internalVisible) {
        handleClose(e as any);
      }
    };

    if (internalVisible) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando drawer está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [internalVisible]);

  const finalId = id ? `drawer-${id}` : undefined;

  // Renderizar contenido
  const drawerContent = (
    <>
      {mask && (
        <DrawerMask
          $visible={internalVisible}
          $zIndex={zIndex}
          style={maskStyle}
          onClick={handleMaskClick}
        />
      )}
      <DrawerWrapper
        id={finalId}
        $placement={placement}
        $size={mappedSize}
        $visible={internalVisible}
        $width={finalWidth}
        $height={finalHeight}
        $zIndex={zIndex}
        accessibility={accessibility}
        className={className}
        style={style}
        ref={containerRef}
      >
        <DrawerContent
          $placement={placement}
          $size={mappedSize}
          $visible={internalVisible}
          style={drawerStyle}
        >
          {(title || closable) && (
            <DrawerHeader
              $size={mappedSize}
              accessibility={accessibility}
              style={headerStyle}
            >
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {closable && (
                <DrawerCloseButton
                  onClick={handleClose}
                  aria-label="Cerrar drawer"
                  type="button"
                >
                  <ZnIcon icon={CloseOutlined} />
                </DrawerCloseButton>
              )}
            </DrawerHeader>
          )}
          <DrawerBody
            $size={mappedSize}
            accessibility={accessibility}
            style={bodyStyle}
          >
            {children}
          </DrawerBody>
          {footer && (
            <DrawerFooter
              $size={mappedSize}
              accessibility={accessibility}
              style={footerStyle}
            >
              {footer}
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerWrapper>
    </>
  );

  // Renderizar en container específico o en document.body
  if (getContainer === false) {
    return <>{drawerContent}</>;
  }

  const container =
    typeof getContainer === "function"
      ? getContainer()
      : getContainer || document.body;

  return ReactDOM.createPortal(drawerContent, container) as any;
};

export default Drawer;
