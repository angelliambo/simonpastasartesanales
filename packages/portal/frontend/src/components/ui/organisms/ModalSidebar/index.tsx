import React, { useEffect } from "react";
import {
  Overlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
} from "../../styles/modalSidebar.mixins";

// ===== TIPOS =====
interface ModalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  showCloseButton?: boolean;
  showFooter?: boolean;
  footerActions?: React.ReactNode;
  className?: string;
  /** ID único del componente (opcional) - se concatena con "modal-sidebar-" */
  id?: string;
}

// ===== COMPONENTE PRINCIPAL =====
export const ModalSidebar: React.FC<ModalSidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width,
  height,
  showCloseButton = true,
  showFooter = false,
  footerActions,
  className,
  id,
}) => {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Cerrar modal al hacer click en el overlay
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const finalId = id ? `modal-sidebar-${id}` : undefined;

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalCard id={finalId} $width={width} variant="elevated" className={className}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {showCloseButton && (
            <CloseButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕
            </CloseButton>
          )}
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        {showFooter && footerActions && (
          <ModalFooter>{footerActions}</ModalFooter>
        )}
      </ModalCard>
    </Overlay>
  );
};

export default ModalSidebar;
