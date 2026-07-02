import React from 'react';
import type { CardProps, HoverEffect } from './Card.types';
import { StyledCard } from './Card.styles';

function normalizeHover(hoverable: CardProps['$hoverable']): HoverEffect {
  if (hoverable === true) return 'lift';
  if (hoverable === 'lift' || hoverable === 'glow' || hoverable === 'none') return hoverable;
  return 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  $elevated = false,
  $hoverable = false,
  $padding,
  ...props
}) => (
  <StyledCard
    $elevated={$elevated}
    $hoverable={normalizeHover($hoverable)}
    $padding={$padding || '24px'}
    {...props}
  >
    {children}
  </StyledCard>
);

export default Card;
