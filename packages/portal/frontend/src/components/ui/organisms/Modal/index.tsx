import React, { useEffect } from "react";
import { ModalProps } from "./Modal.types";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "./Modal.styles";
import { Button } from "../../atoms/Button";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { CloseOutlined } from "@ant-design/icons";

/**
 * Modal Component - Dialog modal genérico compatible con antd
 *
 * Compatible con Ant Design Modal API:
 * - open/visible control
 * - onOk/onCancel handlers
 * - footer personalizado o automático
 * - maskClosable, keyboard, closable
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  visible,
  title,
  children,
  width = 520,
  mobileWidth,
  footer,
  okText = "OK",
  cancelText = "Cancelar",
  onOk,
  onCancel,
  afterClose,
  closable = true,
  maskClosable = true,
  keyboard = true,
  className,
  style,
  confirmLoading = false,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  accessibility: accessibilityProp,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  
  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // Compatibilidad: open tiene prioridad sobre visible
  const isOpen =
    open !== undefined ? open : visible !== undefined ? visible : false;

  // Cerrar modal con animación
  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Manejar OK
  const handleOk = async () => {
    if (onOk) {
      await onOk();
    }
  };

  // Manejar click en overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Manejar tecla Escape
  useEffect(() => {
    if (!keyboard || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [keyboard, isOpen]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      if (afterClose && !isOpen) {
        afterClose();
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, afterClose]);

  if (!isOpen) return null;

  const finalId = id ? `modal-${id}` : undefined;

  // Footer por defecto si no se especifica
  const defaultFooter =
    footer === undefined ? (
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={handleOk} loading={confirmLoading}>
          {okText}
        </Button>
      </ModalFooter>
    ) : (
      footer
    );

  return (
    <Overlay
      $isOpen={isOpen}
      $maskClosable={maskClosable}
      onClick={handleOverlayClick}
      accessibility={accessibility}
    >
      <ModalContainer
        id={finalId}
        $width={width}
        $mobileWidth={mobileWidth}
        accessibility={accessibility}
        className={className}
        style={style}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {title && (
          <ModalHeader accessibility={accessibility}>
            <ModalTitle>{title}</ModalTitle>
            {closable && (
              <ModalCloseButton
                onClick={handleClose}
                aria-label="Cerrar modal"
                type="button"
              >
                <ZnIcon icon={CloseOutlined} />
              </ModalCloseButton>
            )}
          </ModalHeader>
        )}
        <ModalBody accessibility={accessibility}>{children}</ModalBody>
        {defaultFooter}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
