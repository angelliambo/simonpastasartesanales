import { AllSize, StandardSize } from "../shared";

export type AvatarShape = "circle" | "square";
export type AvatarSize = StandardSize;

export interface AvatarProps {
  /** Imagen a mostrar */
  src?: string;
  /** Texto alternativo para la imagen */
  alt?: string;
  /** Icono a mostrar si no hay imagen */
  icon?: React.ReactNode;
  /** Tamaño del avatar */
  size?: AvatarSize | AllSize;
  /** Forma del avatar */
  shape?: AvatarShape;
  /** Texto a mostrar si no hay imagen ni icono */
  children?: React.ReactNode;
  /** Estilo personalizado */
  className?: string;
  style?: React.CSSProperties;
  /** Props de accesibilidad */
  "aria-label"?: string;
  "aria-describedby"?: string;
  /** Click handler */
  onClick?: () => void;
  /** ID único del componente (opcional) - se concatena con "avatar-" */
  id?: string;
}

export interface StyledAvatarProps {
  $size: StandardSize;
  $shape: AvatarShape;
  $hasImage: boolean;
  $clickable: boolean;
  theme: any;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
  };
}
