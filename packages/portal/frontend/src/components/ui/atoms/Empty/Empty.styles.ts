import styled, { css } from "styled-components";
import { StyledEmptyProps } from "./Empty.types";

// =====================================
// EMPTY STYLED COMPONENTS
// =====================================

export const EmptyContainer = styled.div<StyledEmptyProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.spacing?.xl || "24px",
      md: theme.spacing?.xxl || "48px",
      lg: "64px",
    };
    return sizeMap[$size || "md"];
  }};
  text-align: center;

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid
        ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};
      border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};
      background: ${({ theme }) =>
        theme.colors?.background?.secondary || "#fafafa"};
    `}

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      padding: 64px;
    `}
`;

export const EmptyImage = styled.div<StyledEmptyProps>`
  width: ${({ $size }) => {
    const sizeMap: Record<string, string> = {
      sm: "64px",
      md: "120px",
      lg: "180px",
    };
    return sizeMap[$size || "md"];
  }};
  height: ${({ $size }) => {
    const sizeMap: Record<string, string> = {
      sm: "64px",
      md: "120px",
      lg: "180px",
    };
    return sizeMap[$size || "md"];
  }};
  margin-bottom: ${({ theme }) => theme.spacing?.md || "16px"};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.65;

  svg {
    width: 100%;
    height: 100%;
  }

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      opacity: 1;
    `}
`;

export const EmptyDescription = styled.div<StyledEmptyProps>`
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  font-size: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography?.fontSize?.sm || "12px",
      md: theme.typography?.fontSize?.md || "14px",
      lg: theme.typography?.fontSize?.lg || "16px",
    };
    return sizeMap[$size || "md"];
  }};
  line-height: ${({ theme }) => theme.typography?.lineHeight?.normal || 1.5};
  margin: 0;

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      color: ${({ theme }) => theme.colors?.text?.primary || "#000"};
      font-weight: ${({ theme }) =>
        theme.typography?.fontWeight?.medium || 500};
    `}

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      font-size: ${({ theme }) => theme.typography?.fontSize?.xl || "18px"};
    `}
`;
