import React, { useState, useCallback } from "react";
import { PopconfirmProps } from "./Popconfirm.types";
import { Popover } from "../Popover";
import { Button } from "../Button";
import {
  PopconfirmContent,
  PopconfirmTitle,
  PopconfirmDescription,
  PopconfirmIcon,
  PopconfirmButtons,
} from "./Popconfirm.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";

/**
 * Popconfirm Component - Confirmación antes de ejecutar acción
 *
 * Compatible con Ant Design Popconfirm API
 */
export const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = "Aceptar",
  cancelText = "Cancelar",
  okType = "primary",
  disabled = false,
  icon,
  placement = "top",
  trigger = "click",
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  children,
  size = "md",
  className,
  style,
  id,
  accessibility,
  zIndex = 1030,
  overlayClosable = true,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const effectiveAccessibility = accessibility || contextAccessibility;

  // Estado interno para uncontrolled
  const [internalOpen, setInternalOpen] = useState(defaultVisible);

  // Valor efectivo de open/visible
  const isOpen = visibleProp !== undefined ? visibleProp : internalOpen;

  // Manejar cambio de visibilidad (compatibilidad con ambas APIs)
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (visibleProp === undefined) {
        setInternalOpen(newOpen);
      }
      onVisibleChange?.(newOpen);
    },
    [visibleProp, onVisibleChange]
  );

  // Manejar confirmación
  const handleConfirm = useCallback(
    (e?: React.MouseEvent<HTMLElement>) => {
      handleOpenChange(false);
      onConfirm?.(e);
    },
    [onConfirm, handleOpenChange]
  );

  // Manejar cancelación
  const handleCancel = useCallback(
    (e?: React.MouseEvent<HTMLElement>) => {
      handleOpenChange(false);
      onCancel?.(e);
    },
    [onCancel, handleOpenChange]
  );

  // Renderizar contenido
  const content = (
    <PopconfirmContent accessibility={effectiveAccessibility}>
      <PopconfirmTitle accessibility={effectiveAccessibility}>
        {icon !== undefined ? (
          <>
            {icon && <PopconfirmIcon>{icon}</PopconfirmIcon>}
            {title}
          </>
        ) : (
          <>
            <PopconfirmIcon>
              <ZnIcon icon={QuestionCircleOutlined} />
            </PopconfirmIcon>
            {title}
          </>
        )}
      </PopconfirmTitle>
      {description && (
        <PopconfirmDescription accessibility={effectiveAccessibility}>
          {description}
        </PopconfirmDescription>
      )}
      <PopconfirmButtons>
        <Button variant="secondary" size={size} onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button
          variant={
            okType === "danger"
              ? "error"
              : okType === "primary"
              ? "primary"
              : "secondary"
          }
          size={size}
          onClick={handleConfirm}
        >
          {okText}
        </Button>
      </PopconfirmButtons>
    </PopconfirmContent>
  );

  // Si está deshabilitado, no mostrar popover
  if (disabled) {
    return <>{children}</>;
  }

  const finalId = id ? `popconfirm-${id}` : undefined;

  return (
    <Popover
      id={finalId}
      content={content}
      placement={placement}
      trigger={trigger}
      open={isOpen}
      defaultOpen={defaultVisible}
      onOpenChange={handleOpenChange}
      onVisibleChange={handleOpenChange}
      className={className}
      style={style}
      overlayStyle={zIndex ? { zIndex } : undefined}
      accessibility={effectiveAccessibility}
    >
      {children}
    </Popover>
  );
};

export default Popconfirm;
