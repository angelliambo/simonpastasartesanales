import styled, { css } from "styled-components";
import { StyledDrawerProps } from "./Drawer.types";

// =====================================
// DRAWER STYLED COMPONENTS
// =====================================

export const DrawerMask = styled.div<{ $visible: boolean; $zIndex: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: ${({ $zIndex }) => $zIndex};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

export const DrawerWrapper = styled.div<StyledDrawerProps & { $zIndex?: number }>`
  position: fixed;
  z-index: ${({ $zIndex }) => ($zIndex || 1000) + 1};
  
  ${({ $placement, $visible, $width, $height }) => {
    const translate = $visible ? "0" : {
      left: "-100%",
      right: "100%",
      top: "-100%",
      bottom: "100%",
    }[$placement || "right"];
    
    const dimensions = $placement === "top" || $placement === "bottom"
      ? {
          width: "100%",
          height: $height || "400px",
          left: 0,
          ...($placement === "top" ? { top: 0 } : { bottom: 0 }),
        }
      : {
          width: $width || "378px",
          height: "100%",
          ...($placement === "left" ? { left: 0 } : { right: 0 }),
          top: 0,
        };
    
    return css`
      ${dimensions}
      transform: translate${$placement === "top" || $placement === "bottom" ? "Y" : "X"}(${translate});
      opacity: ${$visible ? 1 : 0};
      visibility: ${$visible ? "visible" : "hidden"};
      transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
                  opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
                  visibility 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    `;
  }}
  
  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      transition: opacity 0.1s ease, visibility 0.1s ease;
    `}
`;

export const DrawerContent = styled.div<StyledDrawerProps>`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors?.background?.card || "#fff"};
  box-shadow: ${({ theme, $placement }) => {
    const shadowMap: Record<string, string> = {
      left: "-6px 0 16px rgba(0, 0, 0, 0.08)",
      right: "6px 0 16px rgba(0, 0, 0, 0.08)",
      top: "0 6px 16px rgba(0, 0, 0, 0.08)",
      bottom: "0 -6px 16px rgba(0, 0, 0, 0.08)",
    };
    return shadowMap[$placement || "right"] || theme.shadows?.heavy || "0 4px 12px rgba(0, 0, 0, 0.15)";
  }};
  display: flex;
  flex-direction: column;
  
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};
    `}
`;

export const DrawerHeader = styled.div<StyledDrawerProps>`
  padding: ${({ theme }) => theme.spacing?.lg || "16px"};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border?.light || "#f0f0f0"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  
  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      padding: ${({ theme }) => theme.spacing?.xl || "24px"};
    `}
`;

export const DrawerTitle = styled.div`
  font-size: ${({ theme }) => theme.typography?.fontSize?.lg || "16px"};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};
  color: ${({ theme }) => theme.colors?.text?.primary || "#000"};
  flex: 1;
`;

export const DrawerCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  font-size: 16px;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary || "#f5f5f5"};
    color: ${({ theme }) => theme.colors?.text?.primary || "#000"};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors?.primary?.[500] || "#1890ff"};
    outline-offset: 2px;
  }
`;

export const DrawerBody = styled.div<StyledDrawerProps>`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing?.lg || "16px"};
  
  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      padding: ${({ theme }) => theme.spacing?.xl || "24px"};
      font-size: ${({ theme }) => theme.typography?.fontSize?.md || "14px"};
    `}
`;

export const DrawerFooter = styled.div<StyledDrawerProps>`
  padding: ${({ theme }) => theme.spacing?.md || "12px"} ${({ theme }) => theme.spacing?.lg || "16px"};
  border-top: 1px solid ${({ theme }) => theme.colors?.border?.light || "#f0f0f0"};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing?.sm || "8px"};
  flex-shrink: 0;
`;

