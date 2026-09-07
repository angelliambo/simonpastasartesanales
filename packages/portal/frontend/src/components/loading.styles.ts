import styled from 'styled-components';
import Text from '@design-sys/atoms/Text';

export const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.primary};
  transition: background-color ${props => props.theme.transitions.fast};
`;

export const LoadingText = styled(Text)`
  font-size: ${props => props.theme.typography.fontSize.md};
`;
