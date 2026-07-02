import styled, { css, keyframes } from 'styled-components';
import type { ButtonVariant, ButtonSize } from './Button.types';

const shimmerSweep = keyframes`
  from { left: -100%; }
  to { left: 100%; }
`;

// Mapa de estilos por variante
const variantMap: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary[500]};
    color: white;
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary[600]};
      transform: translateY(-1px);
    }
  `,
  secondary: css`
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.normal};
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
      border-color: ${({ theme }) => theme.colors.border.dark};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.neutral[100]};
      color: ${({ theme }) => theme.colors.text.primary};
    }
  `,
  premium: css`
    background: ${({ theme }) => theme.gradients.premium};
    color: white;
    box-shadow: ${({ theme }) => theme.effects.glow.premium};
    &:hover:not(:disabled) {
      box-shadow: 0 6px 16px rgba(168, 85, 247, 0.6);
      transform: translateY(-2px);
    }
  `,
  shimmer: css`
    background: ${({ theme }) => theme.colors.primary[500]};
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.15),
        transparent
      );
      pointer-events: none;
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary[600]};
      transform: translateY(-2px);

      &::before {
        animation: ${shimmerSweep} 0.5s ease-out;
      }
    }
  `,
};

// Mapa de estilos por tamaño
const sizeMap: Record<ButtonSize, ReturnType<typeof css>> = {
  small: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  large: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $loading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  box-sizing: border-box;
  position: relative;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  ${({ $variant }) => variantMap[$variant]}
  ${({ $size }) => sizeMap[$size]}
`;

export const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ButtonIcon = styled.span<{ $position: 'left' | 'right' }>`
  display: inline-flex;
  order: ${({ $position }) => ($position === 'left' ? '-1' : '1')};
`;