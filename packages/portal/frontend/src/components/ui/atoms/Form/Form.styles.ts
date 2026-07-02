import styled, { css } from "styled-components";
import { FormProps } from "./Form.types";

const SIZE_MAPPING: Record<
  string,
  { padding: string; fontSize: string; gap: string }
> = {
  xs: { padding: "4px 8px", fontSize: "12px", gap: "4px" },
  sm: { padding: "8px 12px", fontSize: "14px", gap: "8px" },
  md: { padding: "12px 16px", fontSize: "16px", gap: "12px" },
  lg: { padding: "16px 20px", fontSize: "18px", gap: "16px" },
  xl: { padding: "20px 24px", fontSize: "20px", gap: "20px" },
};

export const StyledForm = styled.form<{
  $layout: FormProps["layout"];
  $size: string;
  $disabled: boolean;
  accessibility?: FormProps["accessibility"];
}>`
  display: flex;
  flex-direction: ${({ $layout }) =>
    $layout === "horizontal" ? "row" : "column"};
  gap: ${({ $size }) => SIZE_MAPPING[$size]?.gap || SIZE_MAPPING.md.gap};
  width: 100%;
  max-width: 100%;

  ${({ $layout }) =>
    $layout === "horizontal" &&
    css`
      flex-wrap: wrap;
      align-items: flex-start;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
  
  ${({ accessibility, $size }) =>
    accessibility?.largeText &&
    css`
      gap: ${(() => {
        const baseGap = SIZE_MAPPING[$size]?.gap || SIZE_MAPPING.md.gap;
        return `${(Number(baseGap.replace("px", "")) || 16) * 1.25}px`;
      })()};
    `}
  
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid ${theme.colors?.border?.normal || "#000"};
      padding: ${({ theme }) => theme.spacing?.md || "16px"};
      border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};
    `}
`;

export const FormItemWrapper = styled.div<{
  $layout: FormProps["layout"];
  $size: string;
  $hidden: boolean;
  $required: boolean;
  accessibility?: FormProps["accessibility"];
}>`
  display: ${({ $hidden }) => ($hidden ? "none" : "flex")};
  flex-direction: ${({ $layout }) =>
    $layout === "horizontal" ? "row" : "column"};
  margin-bottom: ${({ $size }) =>
    SIZE_MAPPING[$size]?.gap || SIZE_MAPPING.md.gap};

  ${({ $layout }) =>
    $layout === "horizontal" &&
    css`
      align-items: center;
      gap: ${({ theme }) => theme.spacing?.md || "16px"};

      &:last-child {
        margin-bottom: 0;
      }
    `}

  ${({ $layout }) =>
    $layout === "vertical" &&
    css`
      &:last-child {
        margin-bottom: 0;
      }
    `}
  
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border: 1px solid ${theme.colors?.border?.light || "#e9ecef"};
      padding: ${({ theme }) => theme.spacing?.sm || "8px"};
      border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
      margin-bottom: ${({ theme }) => theme.spacing?.md || "16px"};
    `}
`;

export const FormItemLabel = styled.label<{
  $layout: FormProps["layout"];
  $required: boolean;
  $size: string;
  accessibility?: FormProps["accessibility"];
}>`
  display: flex;
  align-items: center;
  font-size: ${({ $size, accessibility, theme }) => {
    const baseSize = SIZE_MAPPING[$size]?.fontSize || SIZE_MAPPING.md.fontSize;
    return accessibility?.largeText
      ? `${(Number(baseSize.replace("px", "")) || 16) * 1.25}px`
      : baseSize;
  }};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.medium || 500};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  margin-bottom: ${({ $layout }) => ($layout === "vertical" ? "8px" : "0")};
  margin-right: ${({ $layout }) => ($layout === "horizontal" ? "8px" : "0")};
  min-width: ${({ $layout }) => ($layout === "horizontal" ? "120px" : "auto")};

  ${({ $required, theme }) =>
    $required &&
    css`
      &::after {
        content: " *";
        color: ${theme.colors?.error?.[500] || "#dc3545"};
        margin-left: 4px;
      }
    `}

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.semibold || 600};
      color: ${theme.colors?.text?.primary || "#000"};
    `}
`;

export const FormItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FormItemHelp = styled.div<{
  accessibility?: FormProps["accessibility"];
}>`
  margin-top: ${({ theme }) => theme.spacing?.xs || "4px"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.xs) || 12) * 1.25}px`
      : `${theme.typography?.fontSize?.xs || 12}px`};
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme.colors?.text?.primary || "#1a1a1a"};
      font-weight: ${theme.typography?.fontWeight?.medium || 500};
    `}
`;

export const FormItemError = styled.div<{
  accessibility?: FormProps["accessibility"];
}>`
  margin-top: ${({ theme }) => theme.spacing?.xs || "4px"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.xs) || 12) * 1.25}px`
      : `${theme.typography?.fontSize?.xs || 12}px`};
  color: ${({ theme }) => theme.colors?.error?.[500] || "#dc3545"};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || "4px"};

  &::before {
    content: "⚠";
    font-size: ${({ theme }) => theme.typography?.fontSize?.sm || "14px"};
  }

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      font-weight: ${theme.typography?.fontWeight?.semibold || 600};
      color: ${theme.colors?.error?.[600] || "#b02a37"};
    `}
`;

export const FormItemExtra = styled.div<{
  accessibility?: FormProps["accessibility"];
}>`
  margin-top: ${({ theme }) => theme.spacing?.xs || "4px"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.xs) || 12) * 1.25}px`
      : `${theme.typography?.fontSize?.xs || 12}px`};
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
`;
