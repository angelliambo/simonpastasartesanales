import React from 'react';

export interface ZnIconProps {
  icon: React.ComponentType<any> | React.ReactNode;
  size?: string | number;
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  spin?: boolean;
}
