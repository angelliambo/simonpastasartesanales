import { AllSize } from '@design-sys/atoms/shared';

export type TableColumnAlign = "left" | "center" | "right";

export interface TableColumn<T = any> {
  title?: React.ReactNode;
  key?: string;
  dataIndex?: string | string[];
  align?: TableColumnAlign;
  width?: number | string;
  fixed?: boolean | "left" | "right";
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  sortOrder?: "ascend" | "descend" | null;
  filterDropdown?: React.ReactNode;
  onFilter?: (value: any, record: T) => boolean;
  children?: TableColumn<T>[];
}

export interface TablePaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  pageSizeOptions?: string[];
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  position?: (
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
  )[];
}

export interface TableRowSelection<T = any> {
  selectedRowKeys?: React.Key[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
  type?: "checkbox" | "radio";
  fixed?: boolean;
}

export interface TableProps<T = any> {
  /** Columnas de la tabla */
  columns?: TableColumn<T>[];
  /** Fuente de datos */
  dataSource?: T[];
  /** Key único para cada fila */
  rowKey?: string | ((record: T) => string);
  /** Si está cargando */
  loading?: boolean | React.ReactNode;
  /** Configuración de paginación */
  pagination?: TablePaginationConfig | false;
  /** Configuración de selección de filas */
  rowSelection?: TableRowSelection<T>;
  /** Si mostrar bordes */
  bordered?: boolean;
  /** Tamaño */
  size?: AllSize;
  /** Scroll */
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Callback al hacer click en una fila */
  onRow?: (
    record: T,
    index: number
  ) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  };
  /** Props de accesibilidad */
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** Footer personalizado */
  footer?: (currentData: T[]) => React.ReactNode;
}
