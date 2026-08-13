import { CSSProperties } from 'react';

export interface GoogleAdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  responsive?: boolean;
  style?: CSSProperties;
  className?: string;
  label?: string;
}
