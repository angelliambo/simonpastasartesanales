import styled from "styled-components";

export const ToggleContainer = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${({ $isDark, theme }: { theme: any; [key: string]: any }) =>
    $isDark
      ? theme.colors.background.secondary
      : theme.colors.background.primary};
  transition: all 0.3s ease;
`;

export const ToggleButton = styled.button<{ $isDark: boolean }>`
  position: relative;
  width: 56px;
  height: 28px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: ${({ $isDark, theme }: { theme: any; [key: string]: any }) =>
    $isDark ? theme.colors.secondary[600] : theme.colors.text.tertiary};
  transition: background 0.3s ease;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ $isDark }) => ($isDark ? "30px" : "2px")};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid ${({ theme }: { theme: any }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

export const ToggleLabel = styled.span<{ $isDark: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
  user-select: none;
`;

export const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
