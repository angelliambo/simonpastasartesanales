import styled, { css } from "styled-components";
import { ListProps } from "./List.types";

const SIZE_MAPPING: Record<string, { padding: string; fontSize: string }> = {
  xs: { padding: "8px 12px", fontSize: "12px" },
  sm: { padding: "12px 16px", fontSize: "14px" },
  md: { padding: "16px 24px", fontSize: "16px" },
  lg: { padding: "20px 32px", fontSize: "18px" },
  xl: { padding: "24px 40px", fontSize: "20px" },
};

export const StyledList = styled.ul<{
  $bordered: boolean;
  $size: string;
  $split: boolean;
  accessibility?: ListProps["accessibility"];
}>`
  margin: 0;
  padding: 0;
  list-style: none;
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
  
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid ${({ theme }) => theme.colors?.border?.normal || "#000"};
    `}
`;

export const ListHeader = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing?.md || "16px"} 24px;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-bottom: 2px solid ${theme.colors?.border?.normal || "#000"};
      font-weight: ${theme.typography?.fontWeight?.bold || 700};
    `}
`;

export const ListFooter = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing?.md || "16px"} 24px;
  border-top: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-top: 2px solid ${theme.colors?.border?.normal || "#000"};
    `}
`;

export const StyledListItem = styled.li<{
  $size: string;
  $split: boolean;
  $disabled: boolean;
  $itemLayout: "horizontal" | "vertical";
  accessibility?: ListProps["accessibility"];
}>`
  display: flex;
  flex-direction: ${({ $itemLayout }) =>
    $itemLayout === "vertical" ? "column" : "row"};
  align-items: ${({ $itemLayout }) =>
    $itemLayout === "vertical" ? "flex-start" : "center"};
  padding: ${({ $size }) =>
    SIZE_MAPPING[$size]?.padding || SIZE_MAPPING.md.padding};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "background-color 0.2s ease"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  ${({ $split, theme }) =>
    $split &&
    css`
      border-bottom: 1px solid ${theme.colors?.border?.light || "#e9ecef"};

      &:last-child {
        border-bottom: none;
      }
    `}

  &:hover {
    ${({ $disabled, theme, accessibility }) =>
      !$disabled &&
      css`
        background-color: ${theme.colors?.background?.secondary || "#f8f9fa"};
      `}
  }

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-left: 3px solid
        ${({ theme }) => theme.colors?.primary?.[500] || "#007bff"};
    `}
`;

export const ListItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.md || "16px"};
`;

export const ListItemActions = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm || "8px"};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItemExtra = styled.div`
  margin-left: auto;
`;

export const ListItemMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing?.md || "16px"};
  flex: 1;
`;

export const ListItemMetaAvatar = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListItemMetaContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ListItemMetaTitle = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.md) || 16) * 1.25}px`
      : `${theme.typography?.fontSize?.md || 16}px`};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  margin-bottom: ${({ theme }) => theme.spacing?.xs || "4px"};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.bold || 700};
      color: ${theme.colors?.text?.primary || "#000"};
    `}
`;

export const ListItemMetaDescription = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
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

export const ListEmpty = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing?.xl || "32px"};
  text-align: center;
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.md) || 16) * 1.25}px`
      : `${theme.typography?.fontSize?.md || 16}px`};
`;

export const ListLoading = styled.div`
  padding: ${({ theme }) => theme.spacing?.xl || "32px"};
  text-align: center;
`;
