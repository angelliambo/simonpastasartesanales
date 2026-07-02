import React from 'react';
import type { InputProps } from './Input.types';
import { InputWrapper, Label, StyledInput, HelperText } from './Input.styles';

export const Input: React.FC<InputProps> = ({
  $error = false,
  $fullWidth = true,
  label,
  helperText,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <InputWrapper $fullWidth={$fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput id={inputId} $error={$error} {...props} />
      {helperText && <HelperText $error={$error}>{helperText}</HelperText>}
    </InputWrapper>
  );
};

export default Input;