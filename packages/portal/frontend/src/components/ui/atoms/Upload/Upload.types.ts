import { AllSize } from "../shared";

export type UploadFileStatus = "uploading" | "done" | "error" | "removed";

export interface UploadFile {
  uid: string;
  name: string;
  status?: UploadFileStatus;
  url?: string;
  thumbUrl?: string;
  response?: any;
  error?: any;
  percent?: number;
  size?: number;
  type?: string;
  originFileObj?: File;
}

export type UploadListType = "text" | "picture" | "picture-card";

export interface UploadProps {
  /** Callback antes de subir. Retorna false para prevenir upload */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /** Callback cuando cambia el estado del upload */
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  /** Callback cuando empieza el upload */
  onStart?: (file: File) => void;
  /** Callback durante el upload */
  onProgress?: (event: { percent: number }, file: File) => void;
  /** Callback cuando hay éxito */
  onSuccess?: (response: any, file: File) => void;
  /** Callback cuando hay error */
  onError?: (error: Error, response: any, file: File) => void;
  /** Callback cuando se remueve un archivo */
  onRemove?: (file: UploadFile) => void | boolean | Promise<boolean>;
  /** Tipos de archivo aceptados (.jpg, .png, image/*, etc) */
  accept?: string;
  /** Si mostrar lista de archivos */
  showUploadList?:
    | boolean
    | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
      };
  /** Si se pueden seleccionar múltiples archivos */
  multiple?: boolean;
  /** Nombre del archivo en el request */
  name?: string;
  /** Customize request */
  customRequest?: (options: {
    action: string;
    file: File;
    filename: string;
    data: any;
    headers: Record<string, string>;
    onProgress: (event: { percent: number }) => void;
    onSuccess: (response: any) => void;
    onError: (error: Error) => void;
  }) => void;
  /** URL del endpoint de upload */
  action?: string;
  /** Headers adicionales */
  headers?: Record<string, string>;
  /** Datos adicionales */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Tamaño */
  size?: AllSize;
  /** Tipo de lista (text, picture, picture-card) */
  listType?: UploadListType;
  /** Tamaño máximo del archivo (bytes) */
  maxCount?: number;
  /** Si mostrar drag and drop */
  drag?: boolean;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Children (trigger del upload) */
  children?: React.ReactNode;
  /** Props de accesibilidad */
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** ID único del componente (opcional) - se concatena con "upload-" */
  id?: string;
}

export interface UploadListProps {
  /** Lista de archivos */
  items: UploadFile[];
  /** Tipo de lista */
  listType?: UploadListType;
  /** Callback para preview */
  onPreview?: (file: UploadFile) => void;
  /** Callback para remover */
  onRemove?: (file: UploadFile) => void;
  /** Callback para descargar */
  onDownload?: (file: UploadFile) => void;
  /** Si mostrar preview */
  showPreviewIcon?: boolean;
  /** Si mostrar remover */
  showRemoveIcon?: boolean;
  /** Si mostrar descargar */
  showDownloadIcon?: boolean;
  /** Tamaño */
  size?: AllSize;
  /** Props de accesibilidad */
  accessibility?: UploadProps["accessibility"];
}
