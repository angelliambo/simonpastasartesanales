import styled from 'styled-components';

export const StyledGlassCard = styled.div<{ $padding: string; $hoverable: boolean }>`
  background: ${({ theme }) => theme.effects.glassBackground};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ $padding }) => $padding};
  box-shadow: ${({ theme }) => theme.effects.glassShadow};
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  ${({ $hoverable }) =>
    $hoverable &&
    `
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
    }
  `}
`;