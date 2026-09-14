import styled from "styled-components";

export const IconButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};
  background: ${({ theme }) => theme.colors?.background?.surface || theme.colors?.background?.card};
  border: 1px solid ${({ theme }) => theme.colors?.border?.light || theme.colors?.border?.normal || "rgba(0, 0, 0, 0.1)"};
  color: ${({ theme }) => theme.colors?.text?.primary};
  font-size: ${({ theme }) => theme.typography?.fontSize?.md || "16px"};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions?.fast || "0.2s ease"};

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary};
    border-color: ${({ theme }) => theme.colors?.primary?.[500]};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary?.[500]};
    outline-offset: 2px;
  }
`;

export const RowButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || "8px"};
  padding: ${({ theme }) => theme.spacing?.xs || "6px"} ${({ theme }) => theme.spacing?.sm || "12px"};
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "6px"};
  background: ${({ theme }) => theme.colors?.background?.surface || theme.colors?.background?.card};
  border: 1px solid ${({ theme }) => theme.colors?.border?.light || theme.colors?.border?.normal};
  color: ${({ theme }) => theme.colors?.text?.primary};
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm || "13px"};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions?.fast || "0.2s ease"};

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary};
  }
`;

export const ModeLabel = styled.span<{ $hasMarginLeft?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  ${props => props.$hasMarginLeft && `margin-left: ${props.theme.spacing.xs};`}
`;
