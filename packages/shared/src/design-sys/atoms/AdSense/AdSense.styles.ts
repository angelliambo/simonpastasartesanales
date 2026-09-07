import styled from "styled-components";

export const AdContainer = styled.div<{ $minHeight?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight || "90px"};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

export const AdLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  user-select: none;
`;

export const StyledIns = styled.ins<{ $responsive?: boolean }>`
  display: block;
  width: 100%;
  text-align: center;
`;
