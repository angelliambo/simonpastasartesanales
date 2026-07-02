import styled, { css } from 'styled-components';
import type { CardProps, HoverEffect } from './Card.types';

type StyledCardProps = Required<Pick<CardProps, '$elevated'>> & {
  $padding: string;
  $hoverable: HoverEffect;
};

const hoverMap: Record<HoverEffect, ReturnType<typeof css>> = {
  none: css``,
  lift: css`
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.medium};
      transform: translateY(-2px);
    }
  `,
  glow: css`
    &:hover {
      box-shadow: ${({ theme }) => theme.effects.glow.primary};
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.colors.primary[200]};
    }
  `,
};

export const StyledCard = styled.div<StyledCardProps>`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  padding: ${({ $padding }) => $padding};
  box-shadow: ${({ $elevated, theme }) => ($elevated ? theme.shadows.heavy : theme.shadows.light)};
  transition: box-shadow ${({ theme }) => theme.transitions.normal},
              transform ${({ theme }) => theme.transitions.normal},
              border-color ${({ theme }) => theme.transitions.normal};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  ${({ $hoverable }) => hoverMap[$hoverable]}
`;
