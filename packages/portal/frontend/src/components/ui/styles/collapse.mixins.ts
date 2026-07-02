import styled from "styled-components";

export const CollapseContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

export const CollapseHeader = styled.div<{ $isOpen: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.background.secondary : theme.colors.background.primary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? "inherit" : theme.colors.background.secondary};
  }
`;

export const CollapseContent = styled.div<{ $isOpen: boolean; $maxHeight?: number }>`
  max-height: ${({ $isOpen, $maxHeight }) => ($isOpen ? `${$maxHeight || 500}px` : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

export const CollapseIcon = styled.span<{ $isOpen: boolean }>`
  display: inline-block;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  font-size: 14px;
  color: ${({ theme }: { theme: any }) => theme.colors.text.secondary};
`;

export const CollapseBody = styled.div`
  padding: 16px;
  background: ${({ theme }: { theme: any }) => theme.colors.background.primary};
`;
