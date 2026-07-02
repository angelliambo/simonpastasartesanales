import styled from 'styled-components';

export const SwitchWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  user-select: none;
`;

export const SwitchTrack = styled.span<{ $checked: boolean; $disabled: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary[500] : theme.colors.neutral[300]};
  border-radius: 12px;
  transition: background ${({ theme }) => theme.transitions.fast};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  flex-shrink: 0;
`;

export const SwitchThumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $checked }) => ($checked ? '22px' : '2px')};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: left ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const SwitchLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;