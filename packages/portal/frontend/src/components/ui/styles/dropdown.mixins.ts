import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownTrigger = styled.div<{
  $isOpen: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid ${({ theme }: { theme: any }) => theme.colors.text.tertiary};
  border-radius: 6px;
  background: white;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &[data-variant="bare"] {
    padding: 0;
    border: none;
    background: transparent;
    box-shadow: none;
    justify-content: center;
    gap: 4px;
  }

  &:hover {
    border-color: ${({
      $disabled,
      theme,
    }: {
      theme: any;
      [key: string]: any;
    }) => ($disabled ? theme.colors.text.tertiary : theme.colors.neutral[400])};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: any }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const DropdownContent = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 13px);
  left: 0;
  right: auto;
  background: white;
  border: none;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: all 0.2s ease;
  box-sizing: border-box;
  min-width: 240px;
  max-width: 360px;
  width: max-content;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export const DropdownItem = styled.div<{
  $isActive?: boolean;
  $isDisabled?: boolean;
}>`
  padding: 4px 12px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};
  background: ${({ $isActive, theme }: { theme: any; [key: string]: any }) =>
    $isActive ? theme.colors.neutral?.[200] : "transparent"};
  color: ${({ $isActive, theme }: { theme: any; [key: string]: any }) =>
    theme.colors.neutral?.[800] || theme.colors.text.primary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: any; [key: string]: any }) =>
      theme.colors.neutral[300]};
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export const DropdownIcon = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }: { theme: any }) => theme.colors.neutral[200]};
  margin: 4px 0;
`;
