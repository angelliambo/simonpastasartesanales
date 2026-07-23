import { css } from 'styled-components';

export const buttonBaseMixin = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme?.spacing?.sm || "8px"};
  border: none;
  border-radius: ${({ theme }) => theme?.borderRadius?.md || "8px"};
  font-family: ${({ theme }) => theme?.typography?.fontFamily?.primary || "sans-serif"};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm || "14px"};
  line-height: 1;
  cursor: pointer;
  transition: all ${({ theme }) => theme?.transitions?.fast || "0.2s ease"};
  text-decoration: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const buttonPrimaryMixin = css`
  ${buttonBaseMixin}
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const buttonSecondaryMixin = css`
  ${buttonBaseMixin}
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
    border-color: ${({ theme }) => theme.colors.border.dark};
  }
`;

export const buttonGhostMixin = css`
  ${buttonBaseMixin}
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const buttonPremiumMixin = css`
  ${buttonBaseMixin}
  background: ${({ theme }) => theme.gradients.premium};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  box-shadow: ${({ theme }) => theme.effects.glow.premium};

  &:hover:not(:disabled) {
    box-shadow: 0 6px 16px rgba(168, 85, 247, 0.6);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const buttonShimmerMixin = css`
  ${buttonBaseMixin}
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);

    &::before {
      animation: shimmer 0.5s ease-out;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const buttonSmallMixin = css`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

export const buttonLargeMixin = css`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;