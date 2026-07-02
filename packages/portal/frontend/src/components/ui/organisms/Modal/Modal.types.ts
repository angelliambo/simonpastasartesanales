import { AllSize } from "../../atoms/shared";

export interface ModalProps {
  /** Controla si el modal está abierto (compatible con antd) */
  open?: boolean;
  /** Controla si el modal está visible (legacy, usa open) */
  visible?: boolean;
  /** Título del modal */
  title?: React.ReactNode;
  /** Contenido del modal */
  children?: React.ReactNode;
  /** Ancho del modal */
  width?: string | number;
  /** Ancho del modal para móvil */
  mobileWidth?: string | number;
  /** Footer personalizado (si null, oculta el footer) */
  footer?: React.ReactNode | null;
  /** Texto del botón OK */
  okText?: string;
  /** Texto del botón Cancel */
  cancelText?: string;
  /** Callback cuando se hace click en OK */
  onOk?: () => void | Promise<void>;
  /** Callback cuando se hace click en Cancel o se cierra */
  onCancel?: () => void;
  /** Callback después de cerrar */
  afterClose?: () => void;
  /** Si mostrar el botón de cerrar */
  closable?: boolean;
  /** Si cerrar al hacer click en el overlay */
  maskClosable?: boolean;
  /** Si cerrar al presionar ESC */
  keyboard?: boolean;
  /** Clase CSS personalizada */
  className?: string;
  /** Estilo personalizado */
  style?: React.CSSProperties;
  /** Tamaño del modal (sm, md, lg) */
  size?: AllSize;
  /** Si el modal está en estado de loading */
  confirmLoading?: boolean;
  /** Props de accesibilidad */
  "aria-label"?: string;
  "aria-describedby"?: string;
  /** Configuración de accesibilidad */
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** ID único del componente (opcional) - se concatena con prefijo "modal-" */
  id?: string;
}

export interface StyledModalProps {
  $width?: string | number;
  $mobileWidth?: string | number;
  theme: any;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
}
