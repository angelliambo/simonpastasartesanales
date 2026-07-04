import React from "react";
import { AllSize, AllVariant } from "../shared";

// =====================================
// SELECT COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Select acepta tamaños del shared system
export type SelectSize = "sm" | "md" | "lg"; // Subset de AllSize para Select

// Select acepta variantes del shared system
export type SelectVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

// Estados de validación
export type SelectStatus =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "loading";

// Modos de selección
export type SelectMode = "default" | "multiple" | "tags";

// Configuración de opciones
export interface SelectOption {
  label: React.ReactNode; // Texto mostrado
  value: string | number; // Valor de la opción
  disabled?: boolean; // Opción deshabilitada
  title?: string; // Tooltip al hover
  className?: string; // Clase CSS personalizada
  style?: React.CSSProperties; // Estilos personalizados
  [key: string]: any; // Props adicionales
}

// Grupo de opciones
export interface SelectOptionGroup {
  label: React.ReactNode; // Nombre del grupo
  options: SelectOption[]; // Opciones del grupo
  className?: string; // Clase CSS del grupo
  style?: React.CSSProperties; // Estilos del grupo
}

// Props principales del Select
export interface SelectProps {
  // Valor y opciones
  value?: string | number | Array<string | number>; // Valor seleccionado
  defaultValue?: string | number | Array<string | number>; // Valor inicial
  options?: SelectOption[]; // Lista de opciones
  optionGroups?: SelectOptionGroup[]; // Opciones agrupadas

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático
  variant?: AllVariant; // Acepta todas las variantes + mapeo automático

  // Configuración básica
  mode?: SelectMode; // Modo de selección
  placeholder?: string; // Texto placeholder
  disabled?: boolean; // Estado deshabilitado
  loading?: boolean; // Estado de carga
  status?: SelectStatus; // Estado de validación

  // Funcionalidades
  allowClear?: boolean; // Permitir limpiar selección
  showSearch?: boolean; // Habilitar búsqueda
  showArrow?: boolean; // Mostrar flecha dropdown
  open?: boolean; // Control manual del dropdown
  defaultOpen?: boolean; // Abrir por defecto

  // Multi-select específico
  maxTagCount?: number; // Máximo número de tags visibles
  maxTagPlaceholder?:
    | React.ReactNode
    | ((omittedValues: any[]) => React.ReactNode); // Placeholder para tags ocultos
  tagRender?: (props: CustomTagProps) => React.ReactElement; // Renderizado personalizado de tags

  // Búsqueda y filtrado
  searchValue?: string; // Valor de búsqueda controlado
  defaultSearchValue?: string; // Valor inicial de búsqueda
  filterOption?: boolean | ((input: string, option?: SelectOption) => boolean); // Función de filtrado
  filterSort?: (optionA: SelectOption, optionB: SelectOption) => number; // Ordenamiento de opciones filtradas

  // Dropdown configuración
  dropdownStyle?: React.CSSProperties; // Estilos del dropdown
  dropdownClassName?: string; // Clase del dropdown
  dropdownMatchSelectWidth?: boolean | number; // Ancho del dropdown
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement; // Renderizado personalizado del dropdown
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"; // Posición del dropdown

  // Renderizado personalizado
  optionRender?: (
    option: SelectOption,
    info: { index: number }
  ) => React.ReactNode; // Renderizado de opciones
  labelRender?: (props: LabelRenderProps) => React.ReactNode; // Renderizado de labels
  notFoundContent?: React.ReactNode; // Contenido cuando no hay opciones

  // Scroll virtual (para listas grandes)
  virtual?: boolean; // Habilitar scroll virtual
  listHeight?: number; // Altura de la lista
  listItemHeight?: number; // Altura de cada item

  // Layout y estilos
  className?: string;
  style?: React.CSSProperties;

  // Props adicionales para accesibilidad
  accessibility?: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    textToSpeech?: boolean;
    increasedSpacing?: boolean;
    spacingMultiplier?: number;
    largeText?: boolean;
    focusRing?: boolean;
  };

  // Props ARIA y semánticas
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  htmlTitle?: string; // HTML title attribute
  id?: string;

  // Callbacks para eventos
  onChange?: (value: any, option: SelectOption | SelectOption[]) => void;
  onSelect?: (value: any, option: SelectOption) => void;
  onDeselect?: (value: any, option: SelectOption) => void;
  onSearch?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  onClear?: () => void;
  onPopupScroll?: (e: React.UIEvent<HTMLDivElement>) => void;

  // Eventos adicionales
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

// Props para renderizado personalizado de tags
export interface CustomTagProps {
  label: React.ReactNode;
  value: any;
  disabled: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
  closable: boolean;
}

// Props para renderizado personalizado de labels
export interface LabelRenderProps {
  label: React.ReactNode;
  value: any;
}

// Props para TreeSelect (extensión del Select)
export interface TreeSelectProps
  extends Omit<SelectProps, "options" | "optionGroups"> {
  // Datos del árbol
  treeData?: TreeNode[];

  // Configuración del árbol
  treeDefaultExpandAll?: boolean; // Expandir todo por defecto
  treeDefaultExpandedKeys?: string[]; // Claves expandidas por defecto
  treeExpandedKeys?: string[]; // Claves expandidas controladas
  loadData?: (node: TreeNode) => Promise<void>; // Carga dinámica de nodos

  // Renderizado
  treeNodeRender?: (node: TreeNode) => React.ReactNode; // Renderizado de nodos
  treeNodeFilterProp?: string; // Propiedad para filtrar nodos

  // Selección
  treeCheckable?: boolean; // Habilitar checkboxes
  treeCheckStrictly?: boolean; // Selección estricta padre-hijo
  showCheckedStrategy?: "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD"; // Estrategia de mostrado
}

// Nodo del árbol para TreeSelect
export interface TreeNode {
  title: React.ReactNode; // Título del nodo
  value: string | number; // Valor del nodo
  key: string; // Clave única
  disabled?: boolean; // Nodo deshabilitado
  disableCheckbox?: boolean; // Checkbox deshabilitado
  checkable?: boolean; // Mostrar checkbox
  children?: TreeNode[]; // Nodos hijos
  isLeaf?: boolean; // Es nodo hoja
  icon?: React.ReactNode; // Icono del nodo
  switcherIcon?: React.ReactNode; // Icono del switcher
  className?: string; // Clase CSS del nodo
  style?: React.CSSProperties; // Estilos del nodo
  [key: string]: any; // Props adicionales
}

// =====================================
// STYLED COMPONENTS PROPS
// =====================================

// Props para el wrapper del select
export interface SelectWrapperProps {
  $size?: SelectSize;
  $variant?: SelectVariant;
  $status?: SelectStatus;
  $disabled?: boolean;
  $focused?: boolean;
  $open?: boolean;
  $mode?: SelectMode;
  accessibility?: SelectProps["accessibility"];
}

// Props para el selector principal
export interface StyledSelectorProps {
  $size?: SelectSize;
  $variant?: SelectVariant;
  $status?: SelectStatus;
  $disabled?: boolean;
  $showArrow?: boolean;
  accessibility?: SelectProps["accessibility"];
}

// Props para el dropdown
export interface DropdownProps {
  $size?: SelectSize;
  $variant?: SelectVariant;
  $placement?: SelectProps["placement"];
  $matchSelectWidth?: boolean | number;
  accessibility?: SelectProps["accessibility"];
}

// Props para las opciones
export interface OptionProps {
  $size?: SelectSize;
  $selected?: boolean;
  $focused?: boolean;
  $disabled?: boolean;
  accessibility?: SelectProps["accessibility"];
}

// Props para los tags (multi-select)
export interface TagProps {
  $size?: SelectSize;
  $variant?: SelectVariant;
  $disabled?: boolean;
  accessibility?: SelectProps["accessibility"];
}

// Props para el input de búsqueda
export interface SearchInputProps {
  $size?: SelectSize;
  accessibility?: SelectProps["accessibility"];
}

// =====================================
// CONSTANTS Y DEFAULTS
// =====================================

// Tamaños soportados por Select (subset de AllSize)
export const SELECT_SIZES = ["sm", "md", "lg"] as const;

// Variantes soportadas por Select (subset de AllVariant)
export const SELECT_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
] as const;

// Modos de selección soportados
export const SELECT_MODES = ["default", "multiple", "tags"] as const;

// Estados de validación soportados
export const SELECT_STATUSES = [
  "default",
  "success",
  "warning",
  "error",
  "loading",
] as const;

// Props por defecto optimizadas
export const SELECT_DEFAULTS = {
  size: "md" as AllSize,
  variant: "primary" as AllVariant,
  mode: "default" as SelectMode,
  status: "default" as SelectStatus,
  disabled: false,
  loading: false,
  allowClear: false,
  showSearch: false,
  showArrow: true,
  virtual: false,
  dropdownMatchSelectWidth: true,
  placement: "bottomLeft" as SelectProps["placement"],
  maxTagCount: Infinity,
  listHeight: 256,
  listItemHeight: 32,
} as const;

// Props por defecto para TreeSelect
export const TREE_SELECT_DEFAULTS = {
  ...SELECT_DEFAULTS,
  treeDefaultExpandAll: false,
  treeCheckable: false,
  treeCheckStrictly: false,
  showCheckedStrategy: "SHOW_CHILD" as TreeSelectProps["showCheckedStrategy"],
} as const;

// =====================================
// UTILITY TYPES
// =====================================

// Para selects con carga remota de datos
export interface RemoteSelectProps extends SelectProps {
  fetchOptions?: (searchValue: string) => Promise<SelectOption[]>; // Función de carga remota
  debounceTimeout?: number; // Tiempo de debounce para búsqueda
  minimumInputLength?: number; // Longitud mínima para buscar
  loadingPlaceholder?: React.ReactNode; // Placeholder durante carga
  errorPlaceholder?: React.ReactNode; // Placeholder en caso de error
}

// Para selects de países/ciudades con flags
export interface CountrySelectProps extends Omit<SelectProps, "options"> {
  countries?: string[]; // Lista de códigos de país
  showFlags?: boolean; // Mostrar banderas
  flagSize?: "sm" | "md" | "lg"; // Tamaño de banderas
  searchByCode?: boolean; // Buscar por código de país
}

// Para selects de colores
export interface ColorSelectProps extends Omit<SelectProps, "options"> {
  colors?: string[]; // Lista de colores
  showColorPreview?: boolean; // Mostrar preview del color
  colorFormat?: "hex" | "rgb" | "hsl"; // Formato de color
  allowCustom?: boolean; // Permitir colores personalizados
}

// Para selects múltiples con límites
export interface LimitedMultiSelectProps extends SelectProps {
  maxSelections?: number; // Máximo número de selecciones
  minSelections?: number; // Mínimo número de selecciones
  onLimitExceeded?: (limit: number) => void; // Callback cuando se excede el límite
  onLimitNotMet?: (minimum: number) => void; // Callback cuando no se alcanza el mínimo
}

// =====================================
// MAPEO PARA SHARED SYSTEMS
// =====================================

// Mapeo de AllSize a SelectSize (subset específico)
export const SIZE_MAPPING_SELECT: { [_key in AllSize]?: SelectSize } = {
  xs: "sm", // xs → sm (mínimo)
  sm: "sm", // sm → sm
  md: "md", // md → md (por defecto)
  lg: "lg", // lg → lg
  xl: "lg", // xl → lg (máximo)
  xxl: "lg", // xxl → lg (máximo)
};

// Mapeo de AllVariant a SelectVariant (subset específico)
export const VARIANT_MAPPING_SELECT: { [_key in AllVariant]?: SelectVariant } = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "secondary", // tertiary → secondary
  inverse: "secondary", // inverse → secondary
  success: "success",
  warning: "warning",
  error: "error",
  info: "primary", // info → primary
  ghost: "secondary", // ghost → secondary
  link: "primary", // link → primary
  // Legacy mappings
  danger: "error", // danger → error
  confirm: "success", // confirm → success
  default: "primary", // default → primary
};

// =====================================
// HELPER FUNCTIONS
// =====================================

// Filtrar opciones basado en búsqueda
export const defaultFilterOption = (
  input: string,
  option?: SelectOption
): boolean => {
  if (!option) return false;

  const searchText = input.toLowerCase();
  const optionText = (
    option.label != null ? String(option.label) : ""
  ).toLowerCase();
  const optionValue = (
    option.value != null ? String(option.value) : ""
  ).toLowerCase();

  return optionText.includes(searchText) || optionValue.includes(searchText);
};

// Ordenar opciones filtradas
export const defaultFilterSort = (
  optionA: SelectOption,
  optionB: SelectOption
): number => {
  const labelA = (
    optionA.label != null ? String(optionA.label) : ""
  ).toLowerCase();
  const labelB = (
    optionB.label != null ? String(optionB.label) : ""
  ).toLowerCase();

  return labelA.localeCompare(labelB);
};

// Generar descripción accesible del select
export const getSelectAccessibleDescription = (props: {
  placeholder?: string;
  mode?: SelectMode;
  selectedCount?: number;
  totalCount?: number;
  loading?: boolean;
  disabled?: boolean;
  status?: SelectStatus;
}): string => {
  try {
    const {
      placeholder,
      mode,
      selectedCount = 0,
      totalCount = 0,
      loading,
      disabled,
      status,
    } = props;

    let description = "";

    // Tipo de select
    if (mode === "multiple") {
      description = "Selector múltiple";
    } else if (mode === "tags") {
      description = "Selector de etiquetas";
    } else {
      description = "Selector";
    }

    // Estado
    if (disabled) {
      description += " deshabilitado";
    } else if (loading) {
      description += " cargando";
    }

    // Placeholder o selección actual
    if (selectedCount > 0) {
      if (mode === "multiple" || mode === "tags") {
        description += `, ${selectedCount} de ${totalCount} seleccionados`;
      } else {
        description += ", opción seleccionada";
      }
    } else if (placeholder) {
      description += `, ${placeholder}`;
    }

    // Estado de validación
    if (status && status !== "default") {
      const statusText: Record<string, string> = {
        success: "válido",
        warning: "advertencia",
        error: "error",
        loading: "cargando",
      };
      const statusLabel = statusText[status] || status;
      description += `, estado: ${statusLabel}`;
    }

    return description.trim();
  } catch (error) {
    console.error(
      "[Select] Error en getSelectAccessibleDescription:",
      error,
      props
    );
    return props.placeholder || "Selector";
  }
};

// Validar valor del select
export const validateSelectValue = (
  value: any,
  options: SelectOption[],
  mode: SelectMode = "default"
): {
  valid: boolean;
  invalidValues: any[];
  validOptions: SelectOption[];
} => {
  const validValues = options.map((opt) => opt.value);

  if (mode === "multiple" || mode === "tags") {
    const valueArray = Array.isArray(value) ? value : [value];
    const invalidValues = valueArray.filter((v) => !validValues.includes(v));
    const validOptions = options.filter((opt) =>
      valueArray.includes(opt.value)
    );

    return {
      valid: invalidValues.length === 0,
      invalidValues,
      validOptions,
    };
  } else {
    const isValid = validValues.includes(value);
    const validOption = options.find((opt) => opt.value === value);

    return {
      valid: isValid,
      invalidValues: isValid ? [] : [value],
      validOptions: validOption ? [validOption] : [],
    };
  }
};

// Formatear valor para display
export const formatSelectValue = (
  value: any,
  options: SelectOption[],
  mode: SelectMode = "default",
  maxTagCount: number = Infinity
): {
  displayValue: React.ReactNode;
  hiddenCount: number;
} => {
  try {
    if (!value) {
      return { displayValue: null, hiddenCount: 0 };
    }

    if (mode === "multiple" || mode === "tags") {
      const valueArray = Array.isArray(value) ? value : [value];
      const selectedOptions = options.filter((opt) => {
        if (!opt || opt.value == null) return false;
        return valueArray.includes(opt.value);
      });

      if (selectedOptions.length === 0) {
        console.warn(
          "[Select] formatSelectValue: No se encontraron opciones para los valores:",
          valueArray,
          "en opciones:",
          options
        );
        return { displayValue: null, hiddenCount: 0 };
      }

      if (selectedOptions.length <= maxTagCount) {
        return {
          displayValue: selectedOptions
            .map((opt) => {
              const label = opt.label;
              const value = opt.value;
              if (label != null) return String(label);
              if (value != null) return String(value);
              return "";
            })
            .filter((str) => str !== "")
            .join(", "),
          hiddenCount: 0,
        };
      } else {
        const visibleOptions = selectedOptions.slice(0, maxTagCount);
        const hiddenCount = selectedOptions.length - maxTagCount;

        return {
          displayValue: visibleOptions
            .map((opt) => {
              const label = opt.label;
              const value = opt.value;
              if (label != null) return String(label);
              if (value != null) return String(value);
              return "";
            })
            .filter((str) => str !== "")
            .join(", "),
          hiddenCount,
        };
      }
    } else {
      const selectedOption = options.find(
        (opt) => opt != null && opt.value === value
      );
      let displayValue: React.ReactNode;

      if (selectedOption) {
        if (selectedOption.label != null) {
          try {
            displayValue = String(selectedOption.label);
          } catch (error) {
            console.error(
              "[Select] Error al convertir label a string:",
              error,
              selectedOption
            );
            displayValue = value != null ? String(value) : "";
          }
        } else if (value != null) {
          displayValue = String(value);
        } else {
          displayValue = "";
        }
      } else {
        console.warn(
          "[Select] formatSelectValue: No se encontró opción para valor:",
          value,
          "en opciones:",
          options
        );
        displayValue = value != null ? String(value) : "";
      }

      return {
        displayValue,
        hiddenCount: 0,
      };
    }
  } catch (error) {
    console.error("[Select] Error en formatSelectValue:", error, {
      value,
      optionsLength: options?.length,
      mode,
    });
    return { displayValue: null, hiddenCount: 0 };
  }
};

// Obtener posición del dropdown
export const getDropdownPlacement = (
  selectRect: DOMRect,
  dropdownHeight: number,
  windowHeight: number,
  placement?: SelectProps["placement"]
): SelectProps["placement"] => {
  if (placement && placement.startsWith("top")) {
    return placement;
  }

  const spaceBelow = windowHeight - selectRect.bottom;
  const spaceAbove = selectRect.top;

  // Si hay más espacio arriba y no cabe abajo
  if (spaceAbove > spaceBelow && spaceBelow < dropdownHeight) {
    return "topLeft";
  }

  return "bottomLeft";
};

// Debounce function para búsqueda
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
