import React from 'react';
import type { BadgeProps } from './Badge.types';
import { StyledBadge } from './Badge.styles';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
  style,
}) => (
  <StyledBadge $variant={variant} className={className} style={style}>
    {children}
  </StyledBadge>
);

export default Badge;
