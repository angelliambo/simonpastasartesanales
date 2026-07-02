import styled from "styled-components";

interface StyledButtonContainerProps {
  $width?: string;
}

export const StyledButtonContainer = styled.div<StyledButtonContainerProps>`
  display: inline-block;
  min-width: ${({ $width }) => ($width ? "none" : "200px")};
  width: ${({ $width }) => $width || "auto"};
`;
