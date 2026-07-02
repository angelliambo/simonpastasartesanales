import styled, { css, keyframes } from "styled-components";
import { StyledModalProps } from "./Modal.types";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Overlay = styled.div<{
  $isOpen: boolean;
  $maskClosable: boolean;
  accessibility?: StyledModalProps["accessibility"];
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? "none"
      : css`
          ${fadeIn} 0.2s ease-out
        `};

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-end;
  }
`;

export const ModalContainer = styled.div<StyledModalProps>`
  background: ${({ theme }) => theme.colors?.background?.card || "#ffffff"};
  border-radius: ${({ theme }) => theme.borderRadius?.lg || "12px"};
  box-shadow: ${({ theme }) =>
    theme.shadows?.heavy ||
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"};
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width || "520px"};
  margin: 0 auto;
  overflow: hidden;
  animation: ${({ accessibility, theme }) =>
    accessibility?.reducedMotion
      ? "none"
      : css`
          ${slideUp} 0.3s ease-out
        `};

  @media (max-width: 768px) {
    width: ${({ $mobileWidth, $width }) =>
      typeof $mobileWidth === "number"
        ? `${$mobileWidth}px`
        : $mobileWidth ||
          (typeof $width === "number" ? "95%" : $width || "95%")};
    max-height: 90vh;
    border-radius: 12px 12px 0 0;
    margin-bottom: 0;
  }

  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `2px solid ${theme.colors?.border?.contrast || "#000"}`
      : "none"};
`;

export const ModalHeader = styled.div<{
  accessibility?: StyledModalProps["accessibility"];
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing?.lg || "20px"}
    ${({ theme }) => theme.spacing?.xl || "24px"};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
  flex-shrink: 0;
  font-weight: 600;
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.lg) || 18) * 1.25}px`
      : `${theme.typography?.fontSize?.lg || 18}px`};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing?.md || "16px"}
      ${({ theme }) => theme.spacing?.lg || "20px"};
  }
`;

export const ModalTitle = styled.span`
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  font-size: inherit;
  font-weight: inherit;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors?.text?.secondary || "#6c757d"};
  transition: color 0.2s ease;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
    background: ${({ theme }) =>
      theme.colors?.background?.tertiary || "#f8f9fa"};
  }

  &:focus {
    outline: 2px solid
      ${({ theme }) => theme.colors?.primary?.[500] || "#007bff"};
    outline-offset: 2px;
  }
`;

export const ModalBody = styled.div<{
  accessibility?: StyledModalProps["accessibility"];
}>`
  padding: ${({ theme }) => theme.spacing?.xl || "24px"};
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText
      ? `${(Number(theme.typography?.fontSize?.md) || 16) * 1.25}px`
      : `${theme.typography?.fontSize?.md || 16}px`};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing?.lg || "20px"};
    max-height: 50vh;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing?.md || "12px"};
  padding: ${({ theme }) => theme.spacing?.lg || "16px"}
    ${({ theme }) => theme.spacing?.xl || "24px"};
  border-top: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: ${({ theme }) => theme.spacing?.md || "12px"}
      ${({ theme }) => theme.spacing?.lg || "20px"};

    button {
      width: 100%;
    }
  }
`;
