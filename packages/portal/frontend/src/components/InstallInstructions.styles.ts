import styled from 'styled-components';
import Title from '@design-sys/atoms/Title';
import Text from '@design-sys/atoms/Text';

export const ModalHeader = styled.div`
  text-align: center;
`;

export const ModalTitle = styled(Title)`
  && {
    margin: 0;
    color: ${({ theme }) => theme?.colors?.text?.primary};
  }
`;

export const ModalSubtitle = styled(Text)`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
`;

export const StepsContainer = styled.div`
  padding: ${({ theme }) => theme?.spacing?.lg} 0;
`;

export const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme?.spacing?.lg};
  text-align: center;
`;
