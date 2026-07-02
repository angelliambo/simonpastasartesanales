import React from 'react';
import type { SelectProps } from './Select.types';
import { SelectWrapper, Label, StyledSelect } from './Select.styles';

export const Select: React.FC<SelectProps> = ({
  options,
  $error = false,
  $fullWidth = true,
  label,
  placeholder,
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <SelectWrapper $fullWidth={$fullWidth}>
      {label && <Label htmlFor={selectId}>{label}</Label>}
      <StyledSelect id={selectId} $error={$error} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};

export default Select;