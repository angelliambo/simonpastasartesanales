import { ReactNode, CSSProperties } from 'react';

export type HoverEffect = 'lift' | 'glow' | 'none';

export interface CardProps {
  children: ReactNode;
  $elevated?: boolean;
  $hoverable?: boolean | HoverEffect;
  $padding?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}