import styled, { css } from "styled-components";
import { StyledEmptyProps } from "./Empty.types";

export const EmptyContainer = styled.div<StyledEmptyProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size = "md" }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.spacing.xl,
      md: theme.spacing.xxl,
      lg: "64px",
    };
    return sizeMap[$size] || sizeMap.md;
  }};
  text-align: center;

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.border.normal};
      border-radius: ${({ theme }) => theme.borderRadius.md};
      background: ${({ theme }) => theme.colors.background.secondary};
    `}

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      padding: 64px;
    `}
`;

export const EmptyImage = styled.div<StyledEmptyProps>`
  width: ${({ $size = "md" }) => {
    const sizeMap: Record<string, string> = {
      sm: "64px",
      md: "120px",
      lg: "180px",
    };
    return sizeMap[$size] || sizeMap.md;
  }};
  height: ${({ $size = "md" }) => {
    const sizeMap: Record<string, string> = {
      sm: "64px",
      md: "120px",
      lg: "180px",
    };
    return sizeMap[$size] || sizeMap.md;
  }};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme, $size = "md" }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography.fontSize.sm,
      md: theme.typography.fontSize.md,
      lg: theme.typography.fontSize.lg,
    };
    return sizeMap[$size] || sizeMap.md;
  }};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin: 0;

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    `}

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    `}
`;
