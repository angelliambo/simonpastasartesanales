import styled, { css, keyframes } from "styled-components";
import { UploadProps } from "./Upload.types";

const SIZE_MAPPING: Record<string, { padding: string; fontSize: string }> = {
  xs: { padding: "8px 12px", fontSize: "12px" },
  sm: { padding: "12px 16px", fontSize: "14px" },
  md: { padding: "16px 24px", fontSize: "16px" },
  lg: { padding: "20px 32px", fontSize: "18px" },
  xl: { padding: "24px 40px", fontSize: "20px" },
};

const uploadProgress = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const UploadWrapper = styled.div<{
  $disabled: boolean;
  $size: string;
  accessibility?: UploadProps["accessibility"];
}>`
  display: inline-block;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

export const UploadInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const UploadButton = styled.div<{
  $size: string;
  $drag: boolean;
  accessibility?: UploadProps["accessibility"];
}>`
  display: inline-block;
  cursor: pointer;

  ${({ $size, accessibility }) => {
    const sizeData = SIZE_MAPPING[$size] || SIZE_MAPPING.md;
    const fontSize = accessibility?.largeText
      ? `${(Number(sizeData.fontSize.replace("px", "")) || 16) * 1.25}px`
      : sizeData.fontSize;

    return css`
      font-size: ${fontSize};
    `;
  }}

  ${({ $drag, theme, accessibility }) =>
    $drag &&
    css`
      padding: ${SIZE_MAPPING.md.padding};
      border: 2px dashed ${theme.colors?.border?.normal || "#d9d9d9"};
      border-radius: ${theme.borderRadius?.md || "8px"};
      background-color: ${theme.colors?.background?.secondary || "#fafafa"};
      text-align: center;
      transition: ${accessibility?.reducedMotion
        ? "none"
        : "border-color 0.2s ease, background-color 0.2s ease"};

      &:hover {
        border-color: ${theme.colors?.primary?.[500] || "#007bff"};
        background-color: ${theme.colors?.background?.card || "#fff"};
      }

      ${accessibility?.highContrast &&
      css`
        border: 3px solid ${theme.colors?.border?.normal || "#000"};
        font-weight: ${theme.typography?.fontWeight?.semibold || 600};
      `}
    `}
`;

export const UploadList = styled.ul<{
  $listType: UploadProps["listType"];
  accessibility?: UploadProps["accessibility"];
}>`
  margin: 0;
  padding: 0;
  list-style: none;

  ${({ $listType }) =>
    $listType === "picture-card" &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 8px;
    `}
`;

export const UploadListItem = styled.li<{
  $listType: UploadProps["listType"];
  $status?: string;
  $size: string;
  accessibility?: UploadProps["accessibility"];
}>`
  display: flex;
  align-items: center;
  padding: ${({ $size }) =>
    SIZE_MAPPING[$size]?.padding || SIZE_MAPPING.md.padding};
  margin-bottom: ${({ theme }) => theme.spacing?.xs || "4px"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
  border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};
  background-color: ${({ theme }) => theme.colors?.background?.card || "#fff"};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "all 0.2s ease"};

  ${({ $listType }) =>
    $listType === "picture" &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}

  ${({ $listType }) =>
    $listType === "picture-card" &&
    css`
      position: relative;
      width: 104px;
      height: 104px;
      padding: 0;
      margin: 0;
      border: 1px dashed
        ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};

      &:hover {
        border-color: ${({ theme }) =>
          theme.colors?.primary?.[500] || "#007bff"};
      }
    `}
  
  ${({ $status, theme }) =>
    $status === "uploading" &&
    css`
      border-color: ${theme.colors?.primary?.[500] || "#007bff"};
      background-color: ${theme.colors?.background?.secondary || "#f8f9fa"};
    `}
  
  ${({ $status, theme }) =>
    $status === "error" &&
    css`
      border-color: ${theme.colors?.error?.[500] || "#dc3545"};
      background-color: ${theme.colors?.error?.[50] || "#fff5f5"};
    `}
  
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border-width: 2px;
      border-color: ${theme.colors?.border?.normal || "#000"};
    `}
`;

export const UploadListItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm || "8px"};
`;

export const UploadListItemThumb = styled.div<{
  $thumbnail?: string;
}>`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};

  ${({ $thumbnail }) =>
    $thumbnail &&
    css`
      background-image: url(${$thumbnail});
      background-size: cover;
      background-position: center;
    `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UploadListItemName = styled.span<{
  accessibility?: UploadProps["accessibility"];
}>`
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.sm) || 14) * 1.25}px`
      : `${theme.typography?.fontSize?.sm || 14}px`};
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UploadListItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs || "4px"};
`;

export const UploadProgress = styled.div<{
  $percent: number;
  accessibility?: UploadProps["accessibility"];
}>`
  margin-top: ${({ theme }) => theme.spacing?.xs || "4px"};
  height: 4px;
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $percent }) => $percent}%;
    background-color: ${({ theme }) =>
      theme.colors?.primary?.[500] || "#007bff"};
    transition: ${({ accessibility }) =>
      accessibility?.reducedMotion ? "none" : "width 0.3s ease"};

    ${({ $percent, accessibility, theme }) =>
      $percent < 100 &&
      !accessibility?.reducedMotion &&
      css`
        background: linear-gradient(
          90deg,
          ${theme.colors?.primary?.[500] || "#007bff"} 0%,
          ${theme.colors?.primary?.[400] || "#0056b3"} 100%
        );
        animation: ${uploadProgress} 1.5s ease-in-out infinite;
      `}
  }
`;

export const DragUploadArea = styled.div<{
  $disabled: boolean;
  accessibility?: UploadProps["accessibility"];
}>`
  padding: ${SIZE_MAPPING.md.padding};
  border: 2px dashed ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};
  border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#fafafa"};
  text-align: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "all 0.2s ease"};

  &:hover:not([disabled]) {
    border-color: ${({ theme }) => theme.colors?.primary?.[500] || "#007bff"};
    background-color: ${({ theme }) =>
      theme.colors?.background?.card || "#fff"};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}

  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border: 3px solid ${theme.colors?.border?.normal || "#000"};
      font-weight: ${theme.typography?.fontWeight?.semibold || 600};
    `}
`;
