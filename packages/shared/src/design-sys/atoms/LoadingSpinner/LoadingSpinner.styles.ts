import styled, { keyframes } from 'styled-components';
import type { SpinnerSize } from './LoadingSpinner.types';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const sizeMap: Record<SpinnerSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '40px',
};

const borderMap: Record<SpinnerSize, string> = {
  sm: '2px',
  md: '3px',
  lg: '4px',
};

export const StyledSpinner = styled.span<{ $size: SpinnerSize; $color?: string }>`
  display: inline-block;
  width: ${({ $size }) => sizeMap[$size]};
  height: ${({ $size }) => sizeMap[$size]};
  border: ${({ $size }) => borderMap[$size]} solid
    ${({ $color, theme }) => $color || theme.colors.primary[200]}4d;
  border-top-color: ${({ $color, theme }) => $color || theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  box-sizing: border-box;
`;
