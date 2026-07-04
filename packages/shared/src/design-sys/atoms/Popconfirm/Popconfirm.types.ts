import { AllSize } from "../shared";
import { PopoverPlacement, PopoverTrigger } from "../Popover/Popover.types";

export interface PopconfirmProps {
  /** Título del popconfirm */
  title: React.ReactNode;
  /** Descripción adicional (opcional) */
  description?: React.ReactNode;
  /** Callback cuando se confirma */
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  /** Callback cuando se cancela */
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  /** Texto del botón OK */
  okText?: string;
  /** Texto del botón Cancel */
  cancelText?: string;
  /** Tipo del botón OK */
  okType?: "primary" | "danger" | "default" | "link" | "text";
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Si mostrar icono */
  icon?: React.ReactNode;
  /** Posición del popconfirm */
  placement?: PopoverPlacement;
  /** Trigger para mostrar el popconfirm */
  trigger?: PopoverTrigger;
  /** Si está visible (controlled) */
  visible?: boolean;
  /** Si está visible por defecto (uncontrolled) */
  defaultVisible?: boolean;
  /** Callback cuando cambia la visibilidad */
  onVisibleChange?: (visible: boolean) => void;
  /** Children (el elemento que dispara el popconfirm) */
  children: React.ReactNode;
  /** Tamaño */
  size?: AllSize;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Props de accesibilidad */
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** z-index */
  zIndex?: number;
  /** Si cerrar al hacer clic fuera */
  overlayClosable?: boolean;
  /** ID único del componente (opcional) - se concatena con "popconfirm-" */
  id?: string;
}
