import React, { useState, useEffect, useCallback } from 'react';
import type { SnackbarProps } from './Snackbar.types';
import {
  SnackbarContainer,
  SnackbarMessage,
  SnackbarAction,
} from './Snackbar.styles';

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  variant = 'default',
  onClose,
  autoHideDuration = 4000,
  action,
  className,
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (open && autoHideDuration > 0) {
      const timer = setTimeout(handleClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, handleClose]);

  if (!open) return null;

  return (
    <SnackbarContainer
      $variant={variant}
      $closing={closing}
      className={className}
      role="alert"
    >
      <SnackbarMessage>{message}</SnackbarMessage>
      {action && (
        <SnackbarAction onClick={handleClose}>{action}</SnackbarAction>
      )}
      {onClose && !action && (
        <SnackbarAction onClick={handleClose}>&times;</SnackbarAction>
      )}
    </SnackbarContainer>
  );
};

export default Snackbar;
