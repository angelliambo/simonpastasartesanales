import React from 'react';
import type { LoadingSpinnerProps } from './LoadingSpinner.types';
import { StyledSpinner } from './LoadingSpinner.styles';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color,
  className,
}) => (
  <StyledSpinner $size={size} $color={color} className={className} />
);

export default LoadingSpinner;
