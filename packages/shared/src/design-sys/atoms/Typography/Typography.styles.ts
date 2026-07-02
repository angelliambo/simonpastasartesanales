import styled, { css } from 'styled-components';
import type { TextVariant, TextColor, TextAlign } from './Typography.types';

export const variantStyles: Record<TextVariant, ReturnType<typeof css>> = {
  h1: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  h2: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  h3: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  h4: css`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  body: css`
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  bodySmall: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  caption: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.text.tertiary};
  `,
  label: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
};

export const colorMap: Record<TextColor, ReturnType<typeof css>> = {
  primary: css`color: ${({ theme }) => theme.colors.text.primary};`,
  secondary: css`color: ${({ theme }) => theme.colors.text.secondary};`,
  tertiary: css`color: ${({ theme }) => theme.colors.text.tertiary};`,
  inverse: css`color: ${({ theme }) => theme.colors.text.inverse};`,
  inherit: css`color: inherit;`,
};

export const StyledText = styled.span<{
  $variant: TextVariant;
  $color: TextColor;
  $align: TextAlign;
  $bold?: boolean;
  $truncate?: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  margin: 0;
  text-align: ${({ $align }) => $align};
  display: ${({ $truncate }) => ($truncate ? 'block' : 'inline')};

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $color }) => colorMap[$color]}
  ${({ $bold }) => $bold && css`font-weight: ${({ theme }) => theme.typography.fontWeight.bold};`}
  ${({ $truncate }) =>
    $truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;