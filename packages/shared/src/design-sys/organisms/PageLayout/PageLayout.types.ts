import { ReactNode, CSSProperties } from 'react';

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}