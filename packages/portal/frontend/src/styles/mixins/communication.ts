import styled, { css } from "styled-components";
import { Card, Button, Text } from "./index";
import type { CardProps, TextProps } from "./types";
import { createShouldForwardProp } from "../../utils/shouldForwardProp";

// ===== COMPONENTES DE CHAT =====

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
    border: 1px solid ${theme.colors.border.light};

    ${padding &&
    `padding: ${theme.spacing[padding as keyof typeof theme.spacing]};`}

    // Variantes
    ${variant === "elevated" &&
    `
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
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
    ${borderBottom && `border-bottom: 1px solid ${theme.colors.border.light};`}
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    ${gradient &&
    `
      background: linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.primary[50]} 100%);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
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

    /* Scrollbar personalizado */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.background.secondary};
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(
        135deg,
        ${theme.colors.primary[500]},
        ${theme.colors.secondary[500]}
      );
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        135deg,
        ${theme.colors.primary[600]},
        ${theme.colors.secondary[600]}
      );
    }
  `}
`;

export const MessageBubble = styled.div<{
  isOwn: boolean;
  variant?: "default" | "system" | "error";
}>`
  ${({ theme, isOwn, variant = "default" }) => css`
    max-width: 70%;
    padding: 16px 20px;
    border-radius: ${isOwn ? "24px 24px 0px 24px" : "0px 24px 24px 24px"};
    position: relative;
    word-wrap: break-word;
    margin-left: ${isOwn ? "auto" : "0"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    ${variant === "default" &&
    `
      background: ${
        isOwn
          ? `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`
          : `${theme.colors.neutral[400]};`
      };
      
      &::before {
        content: '';
        position: absolute;
        ${isOwn ? "right: -8px;" : "left: -8px;"}
        ${isOwn ? "bottom: 0px;" : "top: 1px;"}
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 8px 8px 0;
        border-color: transparent ${
          isOwn ? theme.colors.primary[600] : theme.colors.neutral[400]
        } transparent transparent;
        transform: ${isOwn ? "rotate(180deg)" : "none"};
      }
    `}

    ${variant === "system" &&
    `
      background: ${theme.colors.neutral[400]};
      border: 1px solid ${theme.colors.border.light};
      border-radius: 12px;
      margin: 0 auto;
      max-width: 80%;
      text-align: center;
      color: ${theme.colors.text.secondary};
    `}
    
    ${variant === "error" &&
    `
      background: ${theme.colors.error[50]};
      border: 1px solid ${theme.colors.error[500]};
      color: ${theme.colors.error[700]};
      border-radius: 12px;
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
    margin-bottom: 8px;
    display: block;
  `}
`;

export const MessageTime = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["isOwn"]),
})<TextProps & { isOwn?: boolean }>`
  ${({ theme, size = "xs", isOwn = false }) => css`
    font-size: ${theme.typography.fontSize[
      size as keyof typeof theme.typography.fontSize
    ]};
    color: ${isOwn ? theme.colors.text.inverse : theme.colors.text.tertiary};
    opacity: 0.8;
    text-align: right;
    display: block;
  `}
`;

export const ChatInput = styled.div<{
  padding?: string;
  borderTop?: boolean;
}>`
  ${({ theme, padding = "20px 24px", borderTop = true }) => css`
    ${padding && `padding: ${padding};`}
    ${borderTop && `border-top: 1px solid ${theme.colors.border.light};`}
    
    background: linear-gradient(135deg, ${theme.colors.background
      .surface} 0%, ${theme.colors.background.secondary} 100%);
  `}
`;

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-end;
    gap: 12px;
    background: ${theme.colors.background.card};
    border-radius: 24px;
    padding: 12px 16px;
    border: 2px solid ${theme.colors.border.light};
    transition: all 0.3s ease;

    &:focus-within {
      border-color: ${theme.colors.primary[500]};
      box-shadow: 0 0 0 4px ${theme.colors.primary[50]};
    }
  `}
`;

export const TextInput = styled.textarea`
  ${({ theme }) => css`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
    line-height: 1.5;
    color: ${theme.colors.text.primary};
    resize: none;
    min-height: 24px;
    max-height: 120px;

    &::placeholder {
      color: ${theme.colors.text.tertiary};
    }
  `}
`;

// ===== COMPONENTES DE LISTA DE CONTACTOS =====

export const ContactListContainer = styled(Card)`
  ${({ theme, variant = "default", fullWidth, fullHeight }) => css`
    ${fullWidth ? "width: 100%;" : ""}
    ${fullHeight ? "height: 100%;" : ""}
    
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid ${theme.colors.border.light};

    ${variant === "elevated" &&
    `
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    `}
  `}
`;

export const ContactListHeader = styled(ChatHeader)`
  ${({ theme }) => css`
    background: linear-gradient(
      135deg,
      ${theme.colors.primary[50]} 0%,
      ${theme.colors.primary[50]} 100%
    );
    border-bottom: 1px solid ${theme.colors.border.light};
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(
        90deg,
        ${theme.colors.primary[500]},
        ${theme.colors.secondary[500]}
      );
    }
  `}
`;

export const ContactList = styled.div<{
  maxHeight?: string;
}>`
  ${({ theme, maxHeight = "none" }) => css`
    ${maxHeight !== "none" && `max-height: ${maxHeight};`}

    flex: 1;
    overflow-y: auto;

    /* Scrollbar personalizado */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.background.secondary};
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(
        135deg,
        ${theme.colors.primary[500]},
        ${theme.colors.secondary[500]}
      );
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        135deg,
        ${theme.colors.primary[600]},
        ${theme.colors.secondary[600]}
      );
    }
  `}
`;

export const ContactItem = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["isSelected"]),
})<{
  isSelected: boolean;
  padding?: string;
}>`
  ${({ theme, isSelected, padding = "16px 24px" }) => css`
    ${padding && `padding: ${padding};`}

    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid ${theme.colors.border.light};
    transition: all 0.3s ease;
    background: ${isSelected ? theme.colors.primary[50] : "transparent"};
    position: relative;

    &:hover {
      background: ${isSelected
        ? theme.colors.primary[50]
        : theme.colors.background.secondary};
      transform: translateX(4px);
    }

    &:last-child {
      border-bottom: none;
    }

    ${isSelected &&
    `
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]});
      }
    `}
  `}
`;

export const ContactAvatar = styled.div<{
  isOnline: boolean;
  size?: "sm" | "md" | "lg";
}>`
  ${({ theme, isOnline, size = "md" }) => css`
    ${size === "sm" &&
    `
      width: 40px;
      height: 40px;
      font-size: 14px;
    `}

    ${size === "md" &&
    `
      width: 52px;
      height: 52px;
      font-size: 18px;
    `}
    
    ${size === "lg" &&
    `
      width: 64px;
      height: 64px;
      font-size: 22px;
    `}
    
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${theme.colors.primary[500]},
      ${theme.colors.secondary[500]}
    );
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    flex-shrink: 0;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &::after {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: ${isOnline
        ? theme.colors.success[500]
        : theme.colors.text.tertiary};
      border: 3px solid ${theme.colors.background.card};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `}
`;

export const ContactInfo = styled.div`
  flex: 1;
  margin-left: 16px;
  min-width: 0;
`;

export const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export const ContactName = styled(Text)`
  ${({ theme }) => css`
    font-weight: 600;
    color: ${theme.colors.text.primary};
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const ContactTime = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    white-space: nowrap;
    margin-left: 8px;
  `}
`;

export const ContactMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LastMessage = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.text.secondary};
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  `}
`;

// ===== COMPONENTES DE BÚSQUEDA =====

export const SearchContainer = styled.div`
  ${({ theme }) => css`
    position: relative;

    .ant-input-affix-wrapper {
      border-radius: 24px;
      border: 2px solid ${theme.colors.border.light};
      background: ${theme.colors.background.card};
      padding: 12px 16px 12px 44px;
      transition: all 0.3s ease;

      &:hover {
        border-color: ${theme.colors.primary[300]};
      }

      &:focus,
      &.ant-input-affix-wrapper-focused {
        border-color: ${theme.colors.primary[500]};
        box-shadow: 0 0 0 4px ${theme.colors.primary[50]};
      }

      input {
        background: transparent;
        border: none;
        font-size: 15px;

        &::placeholder {
          color: ${theme.colors.text.tertiary};
        }
      }
    }
  `}
`;

export const SearchIcon = styled.div`
  ${({ theme }) => css`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.text.tertiary};
    z-index: 1;
  `}
`;

// ===== COMPONENTES DE PESTAÑAS =====

export const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const TabButton = styled(Button)<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    flex: 1;
    height: 36px;
    border-radius: 18px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    background: ${isActive
      ? `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`
      : theme.colors.background.card};
    color: ${isActive ? theme.colors.text.inverse : theme.colors.text.primary};
    border: none;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `}
`;

// ===== COMPONENTES DE ESTADO =====

export const EmptyState = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    padding: 40px;
    text-align: center;
    color: ${theme.colors.text.tertiary};
  `}
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const TypingIndicator = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: ${theme.colors.background.secondary};
    border-radius: 20px;
    max-width: 120px;
    margin-left: 0;
  `}
`;

export const TypingDots = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 4px;

    div {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${theme.colors.primary[500]};
      animation: typing 1.4s infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }

    @keyframes typing {
      0%,
      60%,
      100% {
        transform: translateY(0);
      }
      30% {
        transform: translateY(-10px);
      }
    }
  `}
`;

// ===== MIXINS DE UTILIDAD =====

export const communicationGradient = css`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[50]} 0%,
    ${({ theme }) => theme.colors.primary[50]} 100%
  );
`;

export const communicationBorder = css`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary[500]},
      ${({ theme }) => theme.colors.secondary[500]}
    );
  }
`;

export const communicationScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary[500]},
      ${({ theme }) => theme.colors.secondary[500]}
    );
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary[600]},
      ${({ theme }) => theme.colors.secondary[600]}
    );
  }
`;

export const communicationShadow = css`
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

export const communicationGlassmorphism = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
