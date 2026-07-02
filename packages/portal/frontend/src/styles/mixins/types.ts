// Tipos centralizados para el sistema de estilos
// Este archivo contiene todos los tipos necesarios para los mixins

import React from "react";

// ===== TIPOS BASE =====

export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type BackgroundVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "card"
  | "transparent"
  | "surface";
export type BorderRadiusSize = "sm" | "md" | "lg" | "xl";
export type ShadowVariant = "light" | "medium" | "heavy" | "none";
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
export type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";

// ===== TIPOS DE TIPOGRAFÍA =====

export type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
export type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";
export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "inverse";

export type ColorIntensity =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
export type TextAlign = "left" | "center" | "right" | "justify";
export type LineHeight = "tight" | "normal" | "relaxed";

// ===== TIPOS DE BOTONES =====

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "info";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "square" | "rounded" | "pill";

// ===== TIPOS DE FORMULARIOS =====

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "outlined";
export type InputState = "default" | "error" | "success" | "warning";

// ===== TIPOS DE TARJETAS =====

export type CardVariant = "default" | "elevated" | "outlined" | "filled";
export type CardPadding = "xs" | "sm" | "md" | "lg" | "xl";

// ===== TIPOS DE NAVEGACIÓN =====

export type HeaderVariant = "default" | "minimal" | "full";
export type NavItemSize = "sm" | "md" | "lg";

// ===== TIPOS DE MODALES =====

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ModalVariant = "default" | "centered" | "fullscreen";

// ===== TIPOS DE JUEGOS =====

export type GameCardVariant = "default" | "featured" | "completed" | "locked";
export type GameDifficulty = "easy" | "medium" | "hard" | "expert";

// ===== TIPOS DE ACCESIBILIDAD =====

export type AccessibilityLevel = "basic" | "enhanced" | "full";
export type ContrastRatio = "AA" | "AAA";
export type ColorBlindType =
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

// ===== TIPOS DE RESPONSIVE =====

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type ResponsiveValue<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
};

// ===== TIPOS DE PROPS COMUNES =====

export interface BaseProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string;
  id?: string;
}

export interface SpacingProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
  gap?: SpacingSize;
}

export interface ColorProps {
  color?: TextColor;
  backgroundColor?: BackgroundVariant;
  borderColor?: string;
}

export interface SizeProps {
  size?: FontSize | ButtonSize | InputSize;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface PositionProps {
  position?: "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
}

export interface FlexProps {
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  wrap?: boolean;
  gap?: SpacingSize;
}

export interface GridProps {
  columns?: number | "auto-fit" | "auto-fill";
  gap?: SpacingSize;
  minColumnWidth?: string;
}

// ===== TIPOS DE COMPONENTES ESPECÍFICOS =====

export interface ContainerProps extends BaseProps, SpacingProps, ColorProps {
  borderRadius?: BorderRadiusSize;
  shadow?: ShadowVariant;
  maxWidth?: string;
  minHeight?: string;
  height?: string;
}

export interface FlexContainerProps extends ContainerProps, FlexProps {}

export interface GridContainerProps extends ContainerProps, GridProps {}

export interface TextProps extends BaseProps {
  size?: FontSize;
  weight?: FontWeight;
  align?: TextAlign;
  lineHeight?: LineHeight;
  as?: keyof React.HTMLAttributes<HTMLElement>;
  truncate?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  // Nuevos props para colores del sistema
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "inverse";
  intensity?: ColorIntensity;
}

export interface ParagraphProps extends BaseProps, ColorProps {
  size?: FontSize;
  weight?: FontWeight;
  align?: TextAlign;
  lineHeight?: LineHeight;
  margin?: string;
  padding?: string;
  italic?: boolean;
}

export interface LabelProps extends BaseProps, ColorProps {
  size?: FontSize;
  weight?: FontWeight;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  padding?: string;
}

export interface CaptionProps extends BaseProps, ColorProps {
  align?: TextAlign;
  margin?: string;
  padding?: string;
  italic?: boolean;
}

export interface CodeProps extends BaseProps, ColorProps {
  size?: FontSize;
  background?: string;
  padding?: string;
  borderRadius?: string;
}

export interface HeadingProps extends BaseProps, ColorProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: TextAlign;
  weight?: FontWeight;
  lineHeight?: LineHeight;
  margin?: string;
  padding?: string;
}

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  icon?: boolean;
  margin?: string;
  padding?: string;
  // Nuevos props para colores del sistema
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "error"
    | "info";
  intensity?: ColorIntensity;
}

export interface IconButtonProps extends ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
}

export interface ButtonGroupProps extends BaseProps {
  direction?: "horizontal" | "vertical";
  gap?: string;
}

export interface InputProps extends BaseProps {
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  disabled?: boolean;
  fullWidth?: boolean;
  margin?: string;
  padding?: string;
}

export interface TextareaProps extends InputProps {
  resize?: "none" | "vertical" | "horizontal" | "both";
  rows?: number;
}

export interface SelectProps extends InputProps {}

export interface CheckboxProps extends BaseProps {
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  margin?: string;
}

export interface RadioProps extends CheckboxProps {}

export interface FormGroupProps extends BaseProps {
  direction?: "vertical" | "horizontal";
  gap?: string;
}

export interface CardProps extends BaseProps, SpacingProps, ColorProps {
  variant?: CardVariant;
  hover?: boolean;
  clickable?: boolean;
  borderRadius?: string;
  shadow?: string;
}

export interface CardHeaderProps extends BaseProps, SpacingProps {
  borderBottom?: boolean;
  background?: string;
}

export interface CardBodyProps extends BaseProps, SpacingProps {}

export interface CardFooterProps extends BaseProps, SpacingProps {
  borderTop?: boolean;
  background?: string;
}

export interface CardTitleProps extends BaseProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  margin?: string;
  padding?: string;
}

export interface CardSubtitleProps extends BaseProps {
  color?: string;
  margin?: string;
  padding?: string;
}

export interface CardImageProps extends BaseProps {
  fullWidth?: boolean;
  height?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
}

export interface CardActionsProps extends BaseProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
  gap?: string;
  justify?: "start" | "center" | "end" | "between" | "around";
}

export interface CardGridProps extends BaseProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
  columns?: number;
  gap?: string;
}

// ===== TIPOS DE FORMULARIOS ESPECÍFICOS =====

export interface TextareaProps extends InputProps {
  resize?: "none" | "vertical" | "horizontal" | "both";
  rows?: number;
}

export interface SelectProps extends InputProps {}

export interface CheckboxProps extends BaseProps {
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  margin?: string;
}

export interface RadioProps extends CheckboxProps {}

export interface FormGroupProps extends BaseProps {
  direction?: "vertical" | "horizontal";
  gap?: string;
}

// ===== TIPOS DE NAVEGACIÓN =====

export interface HeaderProps extends BaseProps, ColorProps {
  fixed?: boolean;
  transparent?: boolean;
  variant?: HeaderVariant;
}

export interface NavItemProps extends BaseProps {
  active?: boolean;
  disabled?: boolean;
  size?: NavItemSize;
}

// ===== TIPOS DE MODALES =====

export interface ModalProps extends BaseProps {
  size?: ModalSize;
  variant?: ModalVariant;
  closable?: boolean;
  maskClosable?: boolean;
}

export interface ModalHeaderProps extends BaseProps {
  closable?: boolean;
  borderBottom?: boolean;
}

export interface ModalBodyProps extends BaseProps, SpacingProps {}

export interface ModalFooterProps extends BaseProps, SpacingProps {
  borderTop?: boolean;
}

// ===== TIPOS DE JUEGOS =====

export interface GameCardProps extends BaseProps, SpacingProps, ColorProps {
  variant?: GameCardVariant;
  difficulty?: GameDifficulty;
  progress?: number;
  completed?: boolean;
  locked?: boolean;
  hover?: boolean;
  clickable?: boolean;
  borderRadius?: string;
  shadow?: string;
}

// ===== TIPOS DE ACCESIBILIDAD =====

export interface AccessibilityProps {
  level?: AccessibilityLevel;
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  screenReader?: boolean;
  keyboardNavigation?: boolean;
}

// ===== TIPOS DE RESPONSIVE =====

export interface ResponsiveProps<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}

// ===== TIPOS DE UTILIDADES =====

export interface MediaQueryProps {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

export interface AnimationProps {
  duration?: string;
  easing?: string;
  delay?: string;
  fillMode?: "none" | "forwards" | "backwards" | "both";
}

// ===== TIPOS DE ESTADO =====

export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
}

export interface ErrorProps {
  error?: boolean;
  errorMessage?: string;
}

export interface SuccessProps {
  success?: boolean;
  successMessage?: string;
}

// ===== TIPOS DE INTERACCIÓN =====

export interface HoverProps {
  hover?: boolean;
  hoverColor?: string;
  hoverBackground?: string;
}

export interface FocusProps {
  focusable?: boolean;
  focusColor?: string;
  focusBackground?: string;
}

export interface ActiveProps {
  active?: boolean;
  activeColor?: string;
  activeBackground?: string;
}

// ===== TIPOS DE ACCESIBILIDAD AVANZADA =====

export interface AriaProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-selected"?: boolean;
  "aria-checked"?: boolean;
  "aria-disabled"?: boolean;
  "aria-hidden"?: boolean;
  "aria-live"?: "off" | "polite" | "assertive";
  "aria-atomic"?: boolean;
  "aria-busy"?: boolean;
  role?: string;
}

// ===== TIPOS DE TEMA =====

export interface ThemeProps {
  theme?: "light" | "dark" | "high-contrast" | "custom";
  customColors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  };
}

// ===== TIPOS DE ANIMACIÓN =====

export interface TransitionProps {
  transition?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
}

// ===== TIPOS DE LAYOUT =====

export interface LayoutProps extends BaseProps {
  direction?: FlexDirection;
  wrap?: boolean;
  align?: AlignItems;
  justify?: JustifyContent;
  gap?: SpacingSize;
  columns?: number;
  rows?: number;
}

// ===== TIPOS DE OVERFLOW =====

export interface OverflowProps {
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
}

// ===== TIPOS DE BORDER =====

export interface BorderProps {
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderWidth?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "none";
  borderColor?: string;
  borderRadius?: BorderRadiusSize | string;
}

// ===== TIPOS DE SHADOW =====

export interface ShadowProps {
  shadow?: ShadowVariant | string;
  boxShadow?: string;
  textShadow?: string;
}

// ===== TIPOS DE OPACITY =====

export interface OpacityProps {
  opacity?: number;
  visibility?: "visible" | "hidden" | "collapse";
}

// ===== TIPOS DE TRANSFORM =====

export interface TransformProps {
  transform?: string;
  transformOrigin?: string;
  scale?: number;
  rotate?: string;
  translate?: string;
}

// ===== TIPOS DE FILTER =====

export interface FilterProps {
  filter?: string;
  backdropFilter?: string;
  blur?: string;
  brightness?: string;
  contrast?: string;
  grayscale?: string;
  hueRotate?: string;
  invert?: string;
  saturate?: string;
  sepia?: string;
}

// ===== TIPOS COMPUESTOS =====

export interface StyledComponentProps
  extends BaseProps,
    SpacingProps,
    ColorProps,
    SizeProps,
    PositionProps,
    FlexProps,
    GridProps,
    BorderProps,
    ShadowProps,
    OpacityProps,
    TransformProps,
    FilterProps,
    TransitionProps,
    OverflowProps,
    AriaProps,
    ThemeProps,
    AccessibilityProps,
    LoadingProps,
    ErrorProps,
    SuccessProps,
    HoverProps,
    FocusProps,
    ActiveProps {}

// ===== TIPOS DE UTILIDADES PARA MIXINS =====

export type MixinFunction<T = any> = (props: T) => string;
export type ResponsiveMixinFunction<T = any> = (props: T) => string;

// ===== TIPOS DE BREAKPOINTS =====

export interface BreakpointConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface MediaQueryConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

// ===== TIPOS DE VALIDACIÓN =====

export interface ValidationProps {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  step?: number;
}

// ===== TIPOS DE EVENTOS =====

export interface EventProps {
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onSubmit?: (event: React.FormEvent) => void;
}

// ===== TIPOS DE REFS =====

export interface RefProps<T = HTMLElement> {
  ref?: React.Ref<T>;
  forwardRef?: boolean;
}

// ===== TIPOS DE CHILDREN =====

export interface ChildrenProps {
  children?: React.ReactNode;
}

// ===== TIPOS DE STYLE OBJECT =====

export interface StyleObject {
  [key: string]: string | number | undefined;
}

// ===== TIPOS DE CSS VARIABLES =====

export interface CSSVariables {
  [key: `--${string}`]: string | number;
}

// ===== TIPOS DE RESPONSIVE VALUES =====

// ===== TIPOS DE CONDITIONAL PROPS =====

export type ConditionalProps<T, U> = T extends true ? U : never;

// ===== TIPOS DE UTILITY TYPES =====

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// ===== TIPOS DE COMPONENT PROPS =====

export type ComponentProps =
  React.HTMLAttributes<HTMLElement>;

// ===== TIPOS DE STYLED COMPONENTS =====

export interface StyledProps {
  as?: keyof React.HTMLAttributes<HTMLElement>;
  forwardedAs?: keyof React.HTMLAttributes<HTMLElement>;
}

// ===== TIPOS DE THEME PROVIDER =====

export interface ThemeProviderProps {
  theme: any;
  children: React.ReactNode;
}

// ===== TIPOS DE CONTEXT =====

export interface StyleContextProps {
  theme: any;
  breakpoints: BreakpointConfig;
  mediaQueries: MediaQueryConfig;
  updateTheme: (theme: any) => void;
  updateBreakpoints: (breakpoints: BreakpointConfig) => void;
}

// ===== TIPOS DE HOOKS =====

export interface UseThemeReturn {
  theme: any;
  colors: any;
  spacing: any;
  typography: any;
  breakpoints: BreakpointConfig;
  mediaQueries: MediaQueryConfig;
}

export interface UseBreakpointReturn {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
}

export interface UseResponsiveReturn<T> {
  value: T;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// ===== TIPOS DE UTILIDADES DE ESTILO =====

export interface StyleUtils {
  getSpacing: (size: SpacingSize) => string;
  getColor: (color: TextColor) => string;
  getFontSize: (size: FontSize) => string;
  getFontWeight: (weight: FontWeight) => number;
  getBorderRadius: (size: BorderRadiusSize) => string;
  getShadow: (variant: ShadowVariant) => string;
  getBreakpoint: (width: number) => Breakpoint;
  getMediaQuery: (breakpoint: Breakpoint) => string;
}

// ===== TIPOS DE CONFIGURACIÓN =====

export interface StyleConfig {
  breakpoints: BreakpointConfig;
  mediaQueries: MediaQueryConfig;
  spacing: Record<SpacingSize, string>;
  colors: Record<string, any>;
  typography: Record<string, any>;
  shadows: Record<ShadowVariant, string>;
  borderRadius: Record<BorderRadiusSize, string>;
}

// ===== TIPOS DE EXPORTACIÓN =====

export type AllTypes =
  | SpacingSize
  | BackgroundVariant
  | BorderRadiusSize
  | ShadowVariant
  | FlexDirection
  | JustifyContent
  | AlignItems
  | FontSize
  | FontWeight
  | TextColor
  | TextAlign
  | LineHeight
  | ButtonVariant
  | ButtonSize
  | ButtonShape
  | InputSize
  | InputVariant
  | InputState
  | CardVariant
  | CardPadding
  | HeaderVariant
  | NavItemSize
  | ModalSize
  | ModalVariant
  | GameCardVariant
  | GameDifficulty
  | AccessibilityLevel
  | ContrastRatio
  | ColorBlindType
  | Breakpoint;

// ===== TIPOS DE THEME =====

/**
 * Tipo flexible para el objeto theme de styled-components
 * Permite cualquier estructura de colores para máxima compatibilidad
 */
export interface ThemeType {
  colors: {
    [key: string]: any;
  };
  shadows: {
    light: string;
    medium: string;
    heavy: string;
  };
}
