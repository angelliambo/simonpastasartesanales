import React from 'react';
import type { ButtonProps } from './Button.types';
import { StyledButton, LoadingSpinner, ButtonIcon } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  $fullWidth = false,
  className,
  style,
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <>
        {icon && iconPosition === 'left' && <ButtonIcon $position="left">{icon}</ButtonIcon>}
        {children}
        {icon && iconPosition === 'right' && <ButtonIcon $position="right">{icon}</ButtonIcon>}
      </>
    );
  };

  return (
    <StyledButton
      className={className}
      style={style}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={$fullWidth}
      $loading={loading}
      {...rest}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default Button;