import styled, { css } from "styled-components";
import { PopconfirmProps } from "./Popconfirm.types";

export const PopconfirmContent = styled.div<{
  accessibility?: PopconfirmProps["accessibility"];
}>`
  padding: 0;
  max-width: 300px;

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      max-width: 350px;
    `}
`;

export const PopconfirmTitle = styled.div<{
  accessibility?: PopconfirmProps["accessibility"];
}>`
  margin: 0 0 8px 0;
  padding: 0;
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.md) || 16) * 1.25}px`
      : `${theme.typography?.fontSize?.md || 16}px`};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  line-height: ${({ theme }) => theme.typography?.lineHeight?.normal || 1.5715};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.bold || 700};
      color: ${theme.colors?.text?.primary || "#000"};
    `}
`;

export const PopconfirmDescription = styled.div<{
  accessibility?: PopconfirmProps["accessibility"];
}>`
  margin: 0 0 12px 0;
  padding: 0;
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.sm) || 14) * 1.25}px`
      : `${theme.typography?.fontSize?.sm || 14}px`};
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  line-height: ${({ theme }) => theme.typography?.lineHeight?.normal || 1.5715};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme.colors?.text?.primary || "#1a1a1a"};
      font-weight: ${theme.typography?.fontWeight?.medium || 500};
    `}
`;

export const PopconfirmIcon = styled.span`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors?.warning?.[500] || "#faad14"};
  font-size: ${({ theme }) => theme.typography?.fontSize?.lg || "18px"};
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

export const PopconfirmButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
