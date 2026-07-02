import styled from "styled-components";

// Contenedor centrado para estados de loading y error
export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 16px;
`;

// Contenedor flex horizontal
export const FlexRow = styled.div<{
  gap?: string;
  align?: string;
  justify?: string;
}>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap || "16px"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "flex-start"};
`;

// Contenedor flex vertical
export const FlexColumn = styled.div<{ gap?: string; align?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || "16px"};
  align-items: ${({ align }) => align || "stretch"};
`;

// Contenedor con altura completa
export const FullHeightContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
