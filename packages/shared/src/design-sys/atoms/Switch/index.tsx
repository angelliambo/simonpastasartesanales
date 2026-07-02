import React from 'react';
import type { SwitchProps } from './Switch.types';
import {
  SwitchWrapper,
  SwitchTrack,
  SwitchThumb,
  SwitchInput,
  SwitchLabel,
} from './Switch.styles';

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  className,
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <SwitchWrapper className={className} htmlFor={switchId}>
      <SwitchInput
        id={switchId}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <SwitchTrack $checked={checked} $disabled={disabled}>
        <SwitchThumb $checked={checked} />
      </SwitchTrack>
      {label && <SwitchLabel>{label}</SwitchLabel>}
    </SwitchWrapper>
  );
};

export default Switch;