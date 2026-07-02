import React from 'react';
import type { GlassCardProps } from './GlassCard.types';
import { StyledGlassCard } from './GlassCard.styles';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  $padding,
  $hoverable = false,
  ...props
}) => (
  <StyledGlassCard $padding={$padding || '32px'} $hoverable={$hoverable} {...props}>
    {children}
  </StyledGlassCard>
);

export default GlassCard;