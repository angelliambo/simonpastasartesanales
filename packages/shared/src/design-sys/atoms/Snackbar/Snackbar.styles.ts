import styled, { css, keyframes } from 'styled-components';
import type { SnackbarVariant } from './Snackbar.types';

const slideIn = keyframes`
  from { transform: translateX(400px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(400px); opacity: 0; }
`;

const variantMap: Record<SnackbarVariant, ReturnType<typeof css>> = {
  default: css`
    background: ${({ theme }) => theme.colors.neutral[800]};
    color: ${({ theme }) => theme.colors.text.inverse};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success[600]};
    color: white;
  `,
  error: css`
    background: ${({ theme }) => theme.colors.error[600]};
    color: white;
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning[600]};
    color: white;
  `,
  info: css`
    background: ${({ theme }) => theme.colors.info[600]};
    color: white;
  `,
};

export const SnackbarContainer = styled.div<{ $variant: SnackbarVariant; $closing: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  max-width: 400px;
  word-break: break-word;
  animation: ${({ $closing }) => ($closing ? slideOut : slideIn)} 0.3s ease-out forwards;
  pointer-events: auto;

  ${({ $variant }) => variantMap[$variant]}
`;

export const SnackbarMessage = styled.span`
  flex: 1;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const SnackbarAction = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  opacity: 0.9;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }
`;

const getSnackbarTypeStyles = (type: "success" | "error" | "warning" | "info" = "info", theme: any) => {
  const typeStyles = {
    success: css`
      background-color: ${theme.colors.success[50]};
      color: ${theme.colors.success[700]};
      border-left: 4px solid ${theme.colors.success[500]};
    `,
    error: css`
      background-color: ${theme.colors.error[50]};
      color: ${theme.colors.error[700]};
      border-left: 4px solid ${theme.colors.error[500]};
    `,
    warning: css`
      background-color: ${theme.colors.warning[50]};
      color: ${theme.colors.warning[700]};
      border-left: 4px solid ${theme.colors.warning[500]};
    `,
    info: css`
      background-color: ${theme.colors.info[50]};
      color: ${theme.colors.info[700]};
      border-left: 4px solid ${theme.colors.info[500]};
    `,
  };
  return typeStyles[type] || typeStyles.info;
};

export const StyledSnackbar = styled.div<{ $type?: "success" | "error" | "warning" | "info" }>`
  position: fixed;
  top: calc(${({ theme }) => theme?.spacing?.lg || "24px"} + 30px);
  right: ${({ theme }) => theme?.spacing?.lg || "24px"};
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  padding: ${({ theme }) => theme?.spacing?.md || "16px"} ${({ theme }) => theme?.spacing?.lg || "24px"};
  border-radius: ${({ theme }) => theme?.borderRadius?.md || "8px"};
  box-shadow: ${({ theme }) => theme?.shadows?.heavy || "0 10px 15px rgba(0, 0, 0, 0.1)"};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme?.spacing?.md || "16px"};
  font-family: ${({ theme }) => theme?.typography?.fontFamily?.primary || "sans-serif"};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm || "14px"};
  animation: ${slideIn} 0.3s ease-out;

  ${({ theme, $type }) => getSnackbarTypeStyles($type, theme)}

  .snackbar-icon {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .snackbar-close {
    background: none;
    border: none;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.xs};
    margin-left: auto;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  &.closing {
    animation: ${slideOut} 0.3s ease-in forwards;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    min-width: auto;
    max-width: none;
  }
`;
