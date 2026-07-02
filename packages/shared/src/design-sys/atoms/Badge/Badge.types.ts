import { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'premium' | 'popular' | 'version' | 'success' | 'warning' | 'error';

import type { CSSProperties } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: CSSProperties;
}
