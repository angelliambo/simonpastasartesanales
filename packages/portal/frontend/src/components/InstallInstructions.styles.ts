import styled from 'styled-components';
import Title from '@design-sys/atoms/Title';
import Text from '@design-sys/atoms/Text';

export const ModalHeader = styled.div`
  text-align: center;
`;

export const ModalTitle = styled(Title)`
  margin: 0 !important;
  color: ${props => props.theme.colors.text.primary} !important;
`;

export const ModalSubtitle = styled(Text)`
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export const StepsContainer = styled.div`
  padding: ${props => props.theme.spacing.lg} 0;
`;

export const ButtonContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
`;
