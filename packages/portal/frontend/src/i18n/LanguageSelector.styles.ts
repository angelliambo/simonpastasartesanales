import styled from 'styled-components';
import { ZnIcon } from '@design-sys/atoms/ZnIcon';

export const SelectorContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

export const TriggerButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: 180px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.effects.glassBackground};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.subtle});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur.subtle});
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.border.normal};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.highlight.glow};
  }
`;

export const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FlagImg = styled.img`
  width: 20px;
  height: 14px;
  border-radius: 2px;
  object-fit: cover;
  display: block;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

export const ArrowIcon = styled(ZnIcon)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.6;
`;

export const DropdownMenu = styled.div<{ $dropUp?: boolean }>`
  position: absolute;
  ${({ $dropUp }) => ($dropUp ? "bottom: calc(100% + 6px);" : "top: calc(100% + 6px);")}
  right: 0;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.effects.glassShadow};
  padding: ${({ theme }) => theme.spacing.xs};
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 140px;
  overflow-y: auto;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.normal};
  }
`;

export const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary[500]}26` : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary[500] : theme.colors.text.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ $active, theme }) => ($active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal)};
  text-align: left;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  user-select: none;
  box-sizing: border-box;

  &:hover {
    background: ${({ theme, $active }) => ($active ? `${theme.colors.primary[500]}33` : theme.colors.background.secondary)};
    color: ${({ theme, $active }) => ($active ? theme.colors.primary[500] : theme.colors.text.primary)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: -2px;
  }
`;
