export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'inherit';
export type TextAlign = 'left' | 'center' | 'right';

export interface TypographyProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  $bold?: boolean;
  $truncate?: boolean;
  children: React.ReactNode;
  as?: React.ElementType;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}