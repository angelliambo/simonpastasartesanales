import styled, { css } from 'styled-components';
import type { BadgeVariant } from './Badge.types';

const variantMap: Record<BadgeVariant, ReturnType<typeof css>> = {
  default: css`
    background: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.text.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border.normal};
  `,
  premium: css`
    background: ${({ theme }) => `${theme.colors.warning[500]}1a`};
    color: ${({ theme }) => theme.colors.warning[500]};
    border: 1px solid ${({ theme }) => `${theme.colors.warning[500]}4d`};

    &:hover {
      background: ${({ theme }) => `${theme.colors.warning[500]}33`};
      border-color: ${({ theme }) => `${theme.colors.warning[500]}80`};
    }
  `,
  popular: css`
    background: ${({ theme }) => theme.gradients.premium};
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  `,
  version: css`
    background: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[600]};
    border: 1px solid ${({ theme }) => theme.colors.primary[200]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success[50]};
    color: ${({ theme }) => theme.colors.success[600]};
    border: 1px solid ${({ theme }) => theme.colors.success[500]}33;
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning[50]};
    color: ${({ theme }) => theme.colors.warning[600]};
    border: 1px solid ${({ theme }) => theme.colors.warning[500]}33;
  `,
  error: css`
    background: ${({ theme }) => theme.colors.error[50]};
    color: ${({ theme }) => theme.colors.error[600]};
    border: 1px solid ${({ theme }) => theme.colors.error[500]}33;
  `,
};

export const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  line-height: 1.4;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $variant }) => variantMap[$variant]}
`;
