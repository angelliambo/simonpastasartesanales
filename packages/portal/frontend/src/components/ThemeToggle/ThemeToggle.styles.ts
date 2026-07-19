import styled from "styled-components";

export const IconButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.effects?.glassBackground || "rgba(255, 255, 255, 0.08)"};
  backdrop-filter: blur(${({ theme }) => theme.effects?.blur?.subtle || "4px"});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects?.blur?.subtle || "4px"});
  border: 1px solid ${({ theme }) => theme.effects?.glassBorder || "rgba(255, 255, 255, 0.15)"};
  color: ${({ theme }) => theme.colors?.text?.primary || "#ffffff"};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary || "rgba(255, 255, 255, 0.15)"};
    border-color: ${({ theme }) => theme.colors?.border?.normal || "rgba(255, 255, 255, 0.3)"};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary?.[500] || "#3b82f6"};
    outline-offset: 2px;
  }
`;

export const RowButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({ theme }) => theme.effects?.glassBackground || "rgba(255, 255, 255, 0.08)"};
  border: 1px solid ${({ theme }) => theme.effects?.glassBorder || "rgba(255, 255, 255, 0.15)"};
  color: ${({ theme }) => theme.colors?.text?.primary || "#ffffff"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.card || "rgba(255, 255, 255, 0.15)"};
  }
`;

export const ModeLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
