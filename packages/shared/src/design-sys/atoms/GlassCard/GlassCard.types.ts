import { ReactNode, CSSProperties } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  $padding?: string;
  $hoverable?: boolean;
  className?: string;
  style?: CSSProperties;
}