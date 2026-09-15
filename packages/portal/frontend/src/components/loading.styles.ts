import styled from 'styled-components';
import Text from '@design-sys/atoms/Text';

export const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.primary};
  transition: background-color ${({ theme }) => theme.transitions.fast};
`;

export const LoadingText = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
