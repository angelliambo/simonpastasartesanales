import styled from "styled-components";

export const AdContainer = styled.div<{ $minHeight?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${props => props.$minHeight || "90px"};
  margin: ${props => props.theme.spacing.lg} 0;
  padding: ${props => props.theme.spacing.xs};
  background-color: ${props => props.theme.colors.background?.secondary || "rgba(0, 0, 0, 0.02)"};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

export const AdLabel = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.colors.text?.tertiary || "#8c8c8c"};
  margin-bottom: ${props => props.theme.spacing.xs};
  user-select: none;
`;

export const StyledIns = styled.ins<{ $responsive?: boolean }>`
  display: block;
  width: 100%;
  text-align: center;
`;
