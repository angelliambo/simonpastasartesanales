import styled from "styled-components";

export const IconButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors?.background?.card || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.normal || "#dfdcd5"};
  color: ${({ theme }) => theme.colors?.text?.primary || "#112215"};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary || "#f8f9fa"};
    border-color: ${({ theme }) => theme.colors?.primary?.[500] || "#52b788"};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary?.[500] || "#52b788"};
    outline-offset: 2px;
  }
`;

export const RowButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors?.background?.card || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.normal || "#dfdcd5"};
  color: ${({ theme }) => theme.colors?.text?.primary || "#112215"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary || "#f8f9fa"};
  }
`;

export const ModeLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
