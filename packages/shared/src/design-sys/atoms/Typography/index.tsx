import React from 'react';
import type { TypographyProps } from './Typography.types';
import { StyledText } from './Typography.styles';

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  $bold = false,
  $truncate = false,
  children,
  as,
  ...props
}) => (
  <StyledText
    as={as}
    $variant={variant}
    $color={color}
    $align={align}
    $bold={$bold}
    $truncate={$truncate}
    {...props}
  >
    {children}
  </StyledText>
);

export default Typography;