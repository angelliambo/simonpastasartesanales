import { css } from 'styled-components';

import type { DefaultTheme } from 'styled-components';

type BlurKey = keyof DefaultTheme['effects']['blur'];
type GlowKey = keyof DefaultTheme['effects']['glow'];
type GradientKey = keyof DefaultTheme['gradients'];

export const glassMixin = (blurKey: BlurKey = 'glass') => css`
  background: ${({ theme }) => theme.effects.glassBackground};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur[blurKey]});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur[blurKey]});
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  box-shadow: ${({ theme }) => theme.effects.glassShadow};
`;

export const hoverLiftMixin = (distance = '-2px') => css`
  transition: transform ${({ theme }) => theme.transitions.normal},
              box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(${distance});
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const glowMixin = (glowKey: GlowKey = 'primary') => css`
  box-shadow: ${({ theme }) => theme.effects.glow[glowKey]};
`;

export const gradientTextMixin = (gradientKey: GradientKey = 'brand') => css`
  background: ${({ theme }) => theme.gradients[gradientKey]};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const shimmerMixin = css`
  position: relative;
  overflow: hidden;

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
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const focusRingMixin = (
  colorKey: 'primary' | 'error' = 'primary'
) => css`
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast},
              box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors[colorKey][500]};
    box-shadow: 0 0 0 3px ${({ theme }) =>
      colorKey === 'error'
        ? 'rgba(239, 68, 68, 0.2)'
        : theme.colors[colorKey][100]};
  }
`;
