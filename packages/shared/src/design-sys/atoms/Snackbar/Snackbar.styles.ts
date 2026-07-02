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
