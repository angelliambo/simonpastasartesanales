import styled, { css } from "styled-components";
import { TableProps } from "./Table.types";

const SIZE_MAPPING: Record<string, { padding: string; fontSize: string }> = {
  xs: { padding: "4px 8px", fontSize: "12px" },
  sm: { padding: "8px 12px", fontSize: "14px" },
  md: { padding: "12px 16px", fontSize: "16px" },
  lg: { padding: "16px 20px", fontSize: "18px" },
  xl: { padding: "20px 24px", fontSize: "20px" },
};

export const TableWrapper = styled.div<{
  $bordered: boolean;
  accessibility?: TableProps["accessibility"];
}>`
  width: 100%;
  overflow-x: auto;

  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      scroll-behavior: auto;
    `}
`;

export const StyledTable = styled.table<{
  $size: string;
  $bordered: boolean;
  accessibility?: TableProps["accessibility"];
}>`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: ${({ theme }) => theme.colors?.background?.card || "#fff"};
  border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};

  ${({ $bordered, theme }) =>
    $bordered &&
    css`
      border: 1px solid ${theme.colors?.border?.light || "#e9ecef"};
    `}

  ${({ $size, accessibility }) => {
    const sizeData = SIZE_MAPPING[$size] || SIZE_MAPPING.md;
    const fontSize = accessibility?.largeText
      ? `${(Number(sizeData.fontSize.replace("px", "")) || 16) * 1.25}px`
      : sizeData.fontSize;

    return css`
      font-size: ${fontSize};
    `;
  }}
  
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid ${theme.colors?.border?.normal || "#000"};
    `}
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 2px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
`;

export const TableHeaderCell = styled.th<{
  $align: string;
  $width?: number | string;
  $size: string;
  accessibility?: TableProps["accessibility"];
}>`
  padding: ${({ $size }) =>
    SIZE_MAPPING[$size]?.padding || SIZE_MAPPING.md.padding};
  text-align: ${({ $align }) => $align};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  white-space: nowrap;

  ${({ $width }) =>
    $width &&
    css`
      width: ${typeof $width === "number" ? `${$width}px` : $width};
      min-width: ${typeof $width === "number" ? `${$width}px` : $width};
    `}

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.bold || 700};
      border-bottom: 3px solid ${theme.colors?.border?.normal || "#000"};
    `}
  
  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      padding: ${SIZE_MAPPING.md.padding};
    `}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{
  $clickable: boolean;
  accessibility?: TableProps["accessibility"];
}>`
  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "background-color 0.2s ease"};

  &:hover {
    ${({ $clickable, theme }) =>
      $clickable &&
      css`
        background-color: ${theme.colors?.background?.secondary || "#f8f9fa"};
        cursor: pointer;
      `}
  }

  &:last-child {
    border-bottom: none;
  }

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border-bottom: 2px solid ${theme.colors?.border?.normal || "#e9ecef"};
    `}
`;

export const TableCell = styled.td<{
  $align: string;
  $size: string;
  accessibility?: TableProps["accessibility"];
}>`
  padding: ${({ $size }) =>
    SIZE_MAPPING[$size]?.padding || SIZE_MAPPING.md.padding};
  text-align: ${({ $align }) => $align};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  vertical-align: middle;

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.medium || 500};
    `}

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      padding: ${SIZE_MAPPING.md.padding};
    `}
`;

export const TableEmpty = styled.tr`
  td {
    padding: ${({ theme }) => theme.spacing?.xl || "48px"};
    text-align: center;
    color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  }
`;

export const TableLoading = styled.tr`
  td {
    padding: ${({ theme }) => theme.spacing?.xl || "48px"};
    text-align: center;
  }
`;

export const TableFooter = styled.tfoot`
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};
  border-top: 2px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
`;
