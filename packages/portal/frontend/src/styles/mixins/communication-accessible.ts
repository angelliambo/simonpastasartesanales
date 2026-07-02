// frontend/src/styles/mixins/communication-accessible.ts
import styled, { css } from "styled-components";
import type { CardProps, TextProps } from "./types";
import { createShouldForwardProp } from "../../utils/shouldForwardProp";

// ===== COMPONENTES DE CHAT ACCESIBLES =====

export const ChatContainer = styled.div<CardProps>`
  ${({
    theme,
    variant = "default",
    padding = "md",
    fullWidth,
    fullHeight,
  }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.background.card};
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 2px solid ${theme.colors.border.light}; // Más grueso para alto contraste

    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      border: 3px solid ${theme.colors.border.dark};
      box-shadow: 0 0 0 1px ${theme.colors.border.dark};
    }

    // Variantes
    ${variant === "elevated" &&
    `
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 2px solid rgba(255, 255, 255, 0.2);
    `}
  `}
`;

export const ChatHeader = styled.div<{
  padding?: string;
  borderBottom?: boolean;
  gradient?: boolean;
}>`
  ${({
    theme,
    padding = "20px 24px",
    borderBottom = true,
    gradient = true,
  }) => css`
    ${padding && `padding: ${padding};`}
    ${borderBottom && `border-bottom: 2px solid ${theme.colors.border.light};`}
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      border-bottom: 3px solid ${theme.colors.border.dark};
    }

    ${gradient &&
    `
      background: linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.primary[50]} 100%);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px; // Más grueso para mejor visibilidad
        background: linear-gradient(90deg, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]});
      }
    `}
  `}
`;

export const ChatMessages = styled.div<{
  padding?: string;
  maxHeight?: string;
}>`
  ${({ theme, padding = "24px", maxHeight = "none" }) => css`
    ${padding && `padding: ${padding};`}
    ${maxHeight !== "none" && `max-height: ${maxHeight};`}
    
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${theme.colors.background.card};

    /* Scrollbar accesible */
    &::-webkit-scrollbar {
      width: 12px; // Más ancho para mejor accesibilidad
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.background.secondary};
      border-radius: 6px;
      border: 1px solid ${theme.colors.border.light};
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.primary[400]};
      border-radius: 6px;
      border: 2px solid ${theme.colors.background.secondary};

      &:hover {
        background: ${theme.colors.primary[500]};
      }
    }

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.primary[600]};
        border: 2px solid ${theme.colors.border.dark};
      }
    }
  `}
`;

export const MessageBubble = styled.div<{
  isOwn: boolean;
  variant?: "default" | "system" | "error";
}>`
  ${({ theme, isOwn, variant = "default" }) => css`
    max-width: 70%;
    padding: 12px 16px;
    border-radius: ${isOwn ? "24px 24px 0px 24px" : "0px 24px 24px 24px"};
    position: relative;
    word-wrap: break-word;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent; // Borde para alto contraste

    ${isOwn
      ? `
        background: linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[700]});
        color: ${theme.colors.text.inverse};
        margin-left: auto;
        align-self: flex-end;
        border-color: ${theme.colors.primary[500]};
      `
      : `
        background: ${theme.colors.background.secondary};
        color: ${theme.colors.text.primary};
        border: 2px solid ${theme.colors.border.light};
        margin-right: auto;
        align-self: flex-start;
      `}

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      ${isOwn
        ? `
          background: ${theme.colors.primary[700]};
          border-color: ${theme.colors.primary[800]};
        `
        : `
          background: ${theme.colors.background.card};
          border-color: ${theme.colors.border.dark};
        `}
    }

    // Soporte para daltonismo - usar patrones además de colores
    ${isOwn
      ? `
        &::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.3) 2px,
            rgba(255,255,255,0.3) 4px
          );
          border-radius: 50%;
        }
      `
      : `
        &::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          width: 8px;
          height: 8px;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            ${theme.colors.border.light} 2px,
            ${theme.colors.border.light} 4px
          );
          border-radius: 50%;
        }
      `}

    /* Triangulito mejorado para accesibilidad */
    &::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      ${isOwn ? "bottom: 0px;" : "top: 1px;"}
      ${isOwn ? "right: -8px;" : "left: -8px;"}
      border-width: ${isOwn ? "0 0 12px 12px" : "12px 12px 0 0"};
      border-color: transparent
        ${isOwn ? theme.colors.primary[600] : theme.colors.neutral[400]}
        transparent transparent;
      transform: ${isOwn ? "rotate(180deg)" : "none"};

      // Soporte para alto contraste
      @media (prefers-contrast: high) {
        border-color: transparent
          ${isOwn ? theme.colors.primary[800] : theme.colors.border.dark}
          transparent transparent;
      }
    }

    ${variant === "system" &&
    `
      background: ${theme.colors.neutral[400]};
      border: 2px solid ${theme.colors.border.light};
      border-radius: 12px;
      margin: 0 auto;
      max-width: 80%;
      text-align: center;
      color: ${theme.colors.text.secondary};
      
      @media (prefers-contrast: high) {
        background: ${theme.colors.neutral[500]};
        border-color: ${theme.colors.border.dark};
      }
    `}

    ${variant === "error" &&
    `
      background: ${theme.colors.error[500]};
      color: ${theme.colors.text.inverse};
      border: 2px solid ${theme.colors.error[600]};
      
      @media (prefers-contrast: high) {
        background: ${theme.colors.error[700]};
        border-color: ${theme.colors.error[700]};
      }
    `}
  `}
`;

export const MessageText = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["isOwn"]),
})<TextProps & { isOwn?: boolean }>`
  ${({ theme, size = "md", weight = "normal", isOwn = false }) => css`
    color: ${isOwn ? theme.colors.text.inverse : theme.colors.text.primary};
    font-size: ${theme.typography.fontSize[
      size as keyof typeof theme.typography.fontSize
    ]};
    font-weight: ${theme.typography.fontWeight[
      weight as keyof typeof theme.typography.fontWeight
    ]};
    line-height: 1.5;
    margin: 0;

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      color: ${isOwn ? theme.colors.text.inverse : theme.colors.text.primary};
      font-weight: ${weight === "normal" ? "500" : weight};
    }
  `}
`;

export const MessageTime = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["isOwn"]),
})<TextProps & { isOwn?: boolean }>`
  ${({ theme, size = "xs", isOwn = false }) => css`
    color: ${isOwn ? theme.colors.text.inverse : theme.colors.text.tertiary};
    font-size: ${theme.typography.fontSize[
      size as keyof typeof theme.typography.fontSize
    ]};
    font-weight: 400;
    opacity: 0.8;

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      color: ${isOwn ? theme.colors.text.inverse : theme.colors.text.primary};
      opacity: 1;
      font-weight: 500;
    }
  `}
`;

export const InputWrapper = styled.div<{
  padding?: string;
  borderTop?: boolean;
}>`
  ${({ theme, padding = "20px 24px", borderTop = true }) => css`
    ${padding && `padding: ${padding};`}
    ${borderTop && `border-top: 2px solid ${theme.colors.border.light};`}
    
    background: ${theme.colors.background.card};
    display: flex;
    align-items: flex-end;
    gap: 12px;
    position: relative;

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      border-top: 3px solid ${theme.colors.border.dark};
    }
  `}
`;

export const TextInput = styled.textarea<{
  minHeight?: string;
  maxHeight?: string;
  resize?: string;
}>`
  ${({
    theme,
    minHeight = "40px",
    maxHeight = "120px",
    resize = "none",
  }) => css`
    flex: 1;
    min-height: ${minHeight};
    max-height: ${maxHeight};
    resize: ${resize};
    padding: 12px 16px;
    border: 2px solid ${theme.colors.border.light};
    border-radius: 20px;
    background: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSize.md};
    font-family: inherit;
    line-height: 1.5;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
    }

    &:hover {
      border-color: ${theme.colors.primary[400]};
    }

    &::placeholder {
      color: ${theme.colors.text.tertiary};
    }

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      border: 3px solid ${theme.colors.border.dark};

      &:focus {
        border-color: ${theme.colors.primary[700]};
        box-shadow: 0 0 0 2px ${theme.colors.primary[200]};
      }
    }

    // Soporte para daltonismo - indicador visual adicional
    &:focus {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px solid ${theme.colors.primary[500]};
        border-radius: 22px;
        pointer-events: none;
      }
    }
  `}
`;

// ===== COMPONENTES DE ESTADO ONLINE/OFFLINE ACCESIBLES =====

export const OnlineIndicator = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["isOnline"]),
})<{ isOnline: boolean }>`
  ${({ theme, isOnline }) => css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${isOnline
      ? theme.colors.success[500]
      : theme.colors.text.tertiary};
    border: 2px solid ${theme.colors.background.card};
    position: relative;

    // Soporte para alto contraste
    @media (prefers-contrast: high) {
      background-color: ${isOnline
        ? theme.colors.success[700]
        : theme.colors.text.primary};
      border: 3px solid ${theme.colors.background.card};
    }

    // Indicador adicional para daltonismo
    ${isOnline &&
    `
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 1px,
          rgba(255,255,255,0.8) 1px,
          rgba(255,255,255,0.8) 2px
        );
        border-radius: 50%;
      }
    `}
  `}
`;

// ===== COMPONENTES DE NOTIFICACIÓN ACCESIBLES =====

export const NotificationBadge = styled.div<{
  count: number;
  variant?: "chat" | "floating";
}>`
  ${({ theme, count, variant = "chat" }) => {
    if (count === 0)
      return css`
        display: none;
      `;

    if (variant === "floating") {
      return css`
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: linear-gradient(
          135deg,
          ${theme.colors.secondary[500]},
          ${theme.colors.secondary[600]}
        );
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 14px;
        border: 2px solid ${theme.colors.secondary[400]};

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        // Soporte para alto contraste
        @media (prefers-contrast: high) {
          border: 3px solid ${theme.colors.secondary[700]};
          background: ${theme.colors.secondary[700]};
        }

        @media (max-width: 768px) {
          top: 10px;
          right: 10px;
          padding: 10px 14px;
          font-size: 13px;
        }
      `;
    }

    return css`
      position: absolute;
      top: 16px;
      right: 16px;
      background: linear-gradient(
        135deg,
        ${theme.colors.secondary[500]},
        ${theme.colors.secondary[600]}
      );
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      font-size: 12px;
      z-index: 10;
      border: 2px solid ${theme.colors.secondary[400]};

      // Soporte para alto contraste
      @media (prefers-contrast: high) {
        border: 3px solid ${theme.colors.secondary[700]};
        background: ${theme.colors.secondary[700]};
      }
    `;
  }}
`;

const communicationAccessibleMixins = {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  MessageBubble,
  MessageText,
  MessageTime,
  InputWrapper,
  TextInput,
  OnlineIndicator,
  NotificationBadge,
};

export default communicationAccessibleMixins;
