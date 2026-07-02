import { ReactNode } from 'react';

export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface SnackbarProps {
  open: boolean;
  message: string;
  variant?: SnackbarVariant;
  onClose?: () => void;
  autoHideDuration?: number;
  action?: ReactNode;
  className?: string;
}