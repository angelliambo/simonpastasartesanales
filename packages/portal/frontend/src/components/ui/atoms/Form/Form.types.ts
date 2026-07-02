import { AllSize } from "../shared";

export type FormLayout = "horizontal" | "vertical" | "inline";

export type RuleType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "array"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email";

export interface Rule {
  required?: boolean;
  message?: string;
  type?: RuleType;
  min?: number;
  max?: number;
  len?: number;
  pattern?: RegExp;
  validator?: (rule: Rule, value: any) => Promise<void> | void;
  whitespace?: boolean;
}

export interface FormInstance {
  getFieldsValue: () => Record<string, any>;
  getFieldValue: (name: string) => any;
  getFieldsError: () => Array<{ name: string; errors: string[] }>;
  getFieldError: (name: string) => string[];
  resetFields: (fields?: string[]) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  setFieldValue: (name: string, value: any) => void;
  validateFields: (fields?: string[]) => Promise<void>;
  submit: () => void;
  // Internal methods (used by FormItem)
  _registerField?: (name: string, rules: Rule[], valuePropName: string) => void;
  _unregisterField?: (name: string) => void;
  _getValuePropName?: (name: string) => string;
  _fields?: Record<string, any>;
  _setFields?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  _errors?: Record<string, string[]>;
}

export interface FormProps {
  /** Children */
  children: React.ReactNode;
  /** Instancia del formulario (retornada por useForm) */
  form?: FormInstance;
  /** Layout del formulario */
  layout?: FormLayout;
  /** Callback cuando se envía el formulario */
  onFinish?: (values: Record<string, any>) => void;
  /** Callback cuando falla la validación */
  onFinishFailed?: (errors: any) => void;
  /** Callback cuando cambian los valores (compatible con Ant Design) */
  onValuesChange?: (
    changedValues: Record<string, any>,
    allValues: Record<string, any>
  ) => void;
  /** Valores iniciales */
  initialValues?: Record<string, any>;
  /** Si preservar los valores al desmontar */
  preserve?: boolean;
  /** Tamaño */
  size?: AllSize;
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Props de accesibilidad */
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
  /** ID único del componente (opcional) - se concatena con "form-" */
  id?: string;
}

export interface FormItemProps {
  /** Nombre del campo */
  name?: string;
  /** Etiqueta */
  label?: React.ReactNode;
  /** Reglas de validación */
  rules?: Rule[];
  /** Prop name para valores especiales (ej: "checked" para Switch) */
  valuePropName?: string;
  /** Valor inicial */
  initialValue?: any;
  /** Si está requerido */
  required?: boolean;
  /** Children */
  children?: React.ReactNode;
  /** Help text */
  help?: React.ReactNode;
  /** Tooltip (compatible con Ant Design) - se usa como help si no hay help */
  tooltip?: string | React.ReactNode;
  /** Extra content */
  extra?: React.ReactNode;
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Si ocultar */
  hidden?: boolean;
  /** Validación trigger */
  validateTrigger?: string | string[];
}

export interface FormContextValue {
  form?: FormInstance;
  layout?: FormLayout;
  size?: AllSize;
  disabled?: boolean;
  accessibility?: FormProps["accessibility"];
  onValuesChange?: (
    changedValues: Record<string, any>,
    allValues: Record<string, any>
  ) => void;
}
