import { AllSize } from "../shared";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerType = "solid" | "dashed" | "dotted";

export interface DividerProps {
  /** Orientación del divider */
  orientation?: DividerOrientation;
  /** Texto a mostrar en el divider */
  children?: React.ReactNode;
  /** Tipo de línea */
  type?: DividerType;
  /** Posición del texto (solo horizontal) */
  orientationMargin?: number | string;
  /** Si el divider es plain (sin texto) */
  plain?: boolean;
  /** Tamaño del divider */
  size?: AllSize;
  /** Clase CSS personalizada */
  className?: string;
  style?: React.CSSProperties;
  /** Props de accesibilidad */
  "aria-label"?: string;
  role?: "separator";
  /** ID único del componente (opcional) - se concatena con "divider-" */
  id?: string;
}

export interface StyledDividerProps {
  $orientation: DividerOrientation;
  $type: DividerType;
  $size: string;
  $hasText: boolean;
  $plain: boolean;
  theme: any;
  $accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
}
