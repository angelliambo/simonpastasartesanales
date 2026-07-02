import React from 'react';
import { ZnIconProps } from './ZnIcon.types';
import { IconWrapper } from './ZnIcon.styles';

export const ZnIcon: React.FC<ZnIconProps> = ({
  icon,
  size,
  color,
  className,
  onClick,
  style,
  spin,
}) => {
  const isClickable = !!onClick;

  const renderIcon = () => {
    if (!icon) return null;

    // If it's a component class/function or a React forwardRef component
    if (
      typeof icon === 'function' ||
      (typeof icon === 'object' &&
        icon !== null &&
        ('render' in icon || '$$typeof' in icon))
    ) {
      const IconComponent = icon as React.ComponentType<any>;
      return <IconComponent />;
    }

    // Otherwise, render as raw node (JSX, string, SVG, emoji)
    return icon as React.ReactNode;
  };

  return (
    <IconWrapper
      $size={size}
      $color={color}
      $clickable={isClickable}
      $spin={spin}
      className={className}
      onClick={onClick}
      style={style}
    >
      {renderIcon()}
    </IconWrapper>
  );
};
