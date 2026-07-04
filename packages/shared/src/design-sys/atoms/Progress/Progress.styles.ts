import styled, { css } from "styled-components";
import { StyledProgressProps } from "./Progress.types";

// =====================================
// PROGRESS STYLED COMPONENTS
// =====================================

export const ProgressContainer = styled.div<StyledProgressProps>`
  width: 100%;
  position: relative;
  
  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      margin: ${({ theme }) => theme.spacing?.md || "16px"} 0;
    `}
`;

export const ProgressOuter = styled.div<StyledProgressProps>`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors?.background?.secondary || "#f5f5f5"};
  border-radius: ${({ theme }) => theme.borderRadius?.xl || "9999px"};
  position: relative;
  overflow: hidden;
  
  height: ${({ $size, $type }) => {
    if ($type && $type === "circle") return "auto";
    const sizeMap: Record<string, string> = {
      sm: "4px",
      md: "8px",
      lg: "12px",
    };
    return sizeMap[$size || "md"];
  }};
  
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid ${theme.colors?.border?.normal || "#d9d9d9"};
    `}
`;

export const ProgressInner = styled.div<StyledProgressProps & {
  $percent: number;
  $strokeColor: string;
  $strokeWidth?: number;
  $trailColor?: string;
}>`
  height: 100%;
  background: ${({ $strokeColor, theme }) =>
    $strokeColor || theme.colors?.primary?.[500] || "#1890ff"};
  border-radius: ${({ theme }) => theme.borderRadius?.xl || "9999px"};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "width 0.3s ease"};
  position: relative;
  overflow: hidden;
  width: ${({ $percent }) => Math.max(0, Math.min(100, $percent))}%;
  
  ${({ $status, theme }) =>
    $status === "success" &&
    css`
      background: ${theme.colors?.success?.[500] || "#52c41a"};
    `}
  
  ${({ $status, theme }) =>
    $status === "exception" &&
    css`
      background: ${theme.colors?.error?.[500] || "#ff4d4f"};
    `}
  
  ${({ $status }) =>
    $status === "active" &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: progress-active 1.4s ease-in-out infinite;
      }
      
      @keyframes progress-active {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `}
`;

export const ProgressText = styled.span<StyledProgressProps>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography?.fontSize?.xs || "11px",
      md: theme.typography?.fontSize?.sm || "12px",
      lg: theme.typography?.fontSize?.md || "14px",
    };
    return sizeMap[$size || "md"];
  }};
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.medium || 500};
  margin-left: ${({ theme }) => theme.spacing?.sm || "8px"};
  
  ${({ accessibility, theme }) =>
    accessibility?.highContrast &&
    css`
      color: ${theme.colors?.text?.primary || "#000"};
      font-weight: ${theme.typography?.fontWeight?.semibold || 600};
    `}
  
  ${({ accessibility, theme }) =>
    accessibility?.largeText &&
    css`
      font-size: ${theme.typography?.fontSize?.md || "14px"};
    `}
`;

export const ProgressSteps = styled.div<StyledProgressProps & { $steps: number }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing?.xs || "4px"};
  width: 100%;
`;

export const ProgressStep = styled.div<StyledProgressProps & { $active: boolean; $passed: boolean }>`
  flex: 1;
  height: ${({ $size }) => {
    const sizeMap: Record<string, string> = {
      sm: "4px",
      md: "8px",
      lg: "12px",
    };
    return sizeMap[$size || "md"];
  }};
  background: ${({ $active, $passed, theme }) => {
    if ($passed) return theme.colors?.success?.[500] || "#52c41a";
    if ($active) return theme.colors?.primary?.[500] || "#1890ff";
    return theme.colors?.background?.secondary || "#f5f5f5";
  }};
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "background 0.3s ease"};
`;

