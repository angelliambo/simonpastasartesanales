import { css } from 'styled-components';

export const cardMixin = css`
  background: ${({ theme }) => theme?.colors?.background?.card || "#ffffff"};
  border-radius: ${({ theme }) => theme?.borderRadius?.lg || "12px"};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.normal || "#e5e7eb"};
  padding: ${({ theme }) => theme?.spacing?.lg || "24px"};
  box-shadow: ${({ theme }) => theme?.shadows?.light || "0 1px 3px rgba(0, 0, 0, 0.1)"};
  transition: box-shadow ${({ theme }) => theme?.transitions?.normal || "0.3s ease"},
              transform ${({ theme }) => theme?.transitions?.normal || "0.3s ease"};

  &:hover {
    box-shadow: ${({ theme }) => theme?.shadows?.medium || "0 4px 6px rgba(0, 0, 0, 0.1)"};
    transform: translateY(-2px);
  }
`;

export const glassCardMixin = css`
  background: ${({ theme }) => theme.effects.glassBackground};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.effects.glassShadow};
  transition: box-shadow ${({ theme }) => theme.transitions.normal},
              transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
  }
`;

export const elevatedCardMixin = css`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const glowCardMixin = css`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.primary[200]};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.effects.glow.primary};
  transition: box-shadow ${({ theme }) => theme.transitions.normal},
              transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primary[300]}4d;
  }
`;