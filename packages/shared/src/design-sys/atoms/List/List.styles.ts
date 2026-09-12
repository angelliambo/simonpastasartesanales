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
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  ${({ $bordered, theme }) =>
    $bordered &&
    css`
      border: 1px solid ${theme.colors.border.light};
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
      border: 2px solid ${({ theme }) => theme.colors.border.normal};
    `}
`;

export const ListHeader = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing.md} 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-bottom: 2px solid ${theme.colors.border.normal};
      font-weight: ${theme.typography.fontWeight.bold};
    `}
`;

export const ListFooter = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing.md} 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.background.secondary};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-top: 2px solid ${theme.colors.border.normal};
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
      border-bottom: 1px solid ${theme.colors.border.light};

      &:last-child {
        border-bottom: none;
      }
    `}

  &:hover {
    ${({ $disabled, theme }) =>
      !$disabled &&
      css`
        background-color: ${theme.colors.background.secondary};
      `}
  }

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border-left: 3px solid
        ${({ theme }) => theme.colors.primary[500]};
    `}
`;

export const ListItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ListItemActions = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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
  gap: ${({ theme }) => theme.spacing.md};
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
      ? `${Number(theme.typography.fontSize.md) * 1.25}px`
      : `${theme.typography.fontSize.md}px`};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.text.primary};
    `}
`;

export const ListItemMetaDescription = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${Number(theme.typography.fontSize.sm) * 1.25}px`
      : `${theme.typography.fontSize.sm}px`};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  ${({ theme, accessibility }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme.colors.text.primary};
      font-weight: ${theme.typography.fontWeight.medium};
    `}
`;

export const ListEmpty = styled.div<{
  accessibility?: ListProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${Number(theme.typography.fontSize.md) * 1.25}px`
      : `${theme.typography.fontSize.md}px`};
`;

export const ListLoading = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;
