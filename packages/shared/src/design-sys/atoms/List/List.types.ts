import { AllSize } from "../shared";

export interface ListProps {
  /** Datos de la lista */
  dataSource?: any[];
  /** Función para renderizar cada item */
  renderItem?: (item: any, index: number) => React.ReactNode;
  /** Si está cargando */
  loading?: boolean;
  /** Si muestra el borde */
  bordered?: boolean;
  /** Tamaño de la lista */
  size?: AllSize;
  /** Si muestra el header */
  header?: React.ReactNode;
  /** Si muestra el footer */
  footer?: React.ReactNode;
  /** Layout del item (horizontal/vertical) */
  itemLayout?: "horizontal" | "vertical";
  /** Si muestra el split entre items */
  split?: boolean;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Props de accesibilidad */
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** Paginación */
  pagination?:
    | boolean
    | {
        current?: number;
        pageSize?: number;
        total?: number;
        onChange?: (page: number, pageSize: number) => void;
      };
  /** ID único del componente (opcional) - se concatena con "list-" */
  id?: string;
}

export interface ListItemProps {
  /** Contenido principal */
  children?: React.ReactNode;
  /** Acciones del item (botones en la derecha) */
  actions?: React.ReactNode[];
  /** Contenido extra */
  extra?: React.ReactNode;
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
}

export interface ListItemMetaProps {
  /** Avatar */
  avatar?: React.ReactNode;
  /** Título */
  title?: React.ReactNode;
  /** Descripción */
  description?: React.ReactNode;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
}
