import { AllSize } from "../shared";

export interface RadioProps {
  /** Valor del radio */
  value?: any;
  /** Si está seleccionado (controlled) */
  checked?: boolean;
  /** Si está seleccionado por defecto (uncontrolled) */
  defaultChecked?: boolean;
  /** Si está deshabilitado */
  disabled?: boolean;
  /** Tamaño del radio */
  size?: AllSize;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Texto/etiqueta del radio */
  children?: React.ReactNode;
  /** Callback cuando cambia */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Props de accesibilidad */
  "aria-label"?: string;
  "aria-describedby"?: string;
  /** Auto focus */
  autoFocus?: boolean;
  /** Name del grupo */
  name?: string;
  /** ID único del componente (opcional) - se concatena con "radio-" */
  id?: string;
}

export interface StyledRadioProps {
  $size: string;
  $disabled: boolean;
  $checked: boolean;
  theme: any;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };
}
