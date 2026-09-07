import styled from 'styled-components';
import Title from '@design-sys/atoms/Title';
import Text from '@design-sys/atoms/Text';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.background?.primary};
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme?.spacing?.xxl} ${theme?.spacing?.lg}`};
  color: ${({ theme }) => theme?.colors?.text?.primary};
  line-height: 1.8;
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme?.spacing?.xl};
  padding-bottom: ${({ theme }) => theme?.spacing?.lg};
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const List = styled.ul`
  padding-left: ${({ theme }) => theme?.spacing?.lg};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
`;

export const Item = styled.li`
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
`;

export const WarningBox = styled.div`
  background: ${({ theme }) => theme?.colors?.warning?.[50]};
  border: 1px solid ${({ theme }) => theme?.colors?.warning?.[500]};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  padding: ${({ theme }) => theme?.spacing?.md};
  margin: ${({ theme }) => theme?.spacing?.xl} 0;
`;

export const StyledMainTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme?.colors?.text?.primary};
    margin-bottom: ${({ theme }) => theme?.spacing?.xs};
  }
`;

export const StyledSubtitle = styled(Text)`
  display: block;
  color: ${({ theme }) => theme?.colors?.text?.tertiary};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  margin-bottom: ${({ theme }) => theme?.spacing?.xl};
`;

export const StyledSectionTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme?.colors?.text?.primary};
  }
`;

export const StyledBodyParagraph = styled(Text)`
  display: block;
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  margin-bottom: ${({ theme }) => theme?.spacing?.sm};
`;

export const StyledStrongBlockWithTop = styled(Text)`
  color: ${({ theme }) => theme?.colors?.text?.primary};
  display: block;
  margin-top: ${({ theme }) => theme?.spacing?.md};
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
`;

export const StyledStrongBlock = styled(Text)`
  color: ${({ theme }) => theme?.colors?.text?.primary};
  display: block;
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
`;

export const StyledWarningTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme?.colors?.warning?.[500]};
    margin-bottom: ${({ theme }) => theme?.spacing?.sm};
  }
`;

export const StyledWarningBody = styled(Text)`
  display: block;
  color: ${({ theme }) => theme?.colors?.warning?.[500]};
`;

export const StyledWarningSubtext = styled(Text)`
  display: block;
  color: ${({ theme }) => theme?.colors?.warning?.[500]};
  opacity: 0.85;
`;

export const StyledFooterText = styled(Text)`
  display: block;
  color: ${({ theme }) => theme?.colors?.text?.tertiary};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  text-align: center;
  margin-top: ${({ theme }) => theme?.spacing?.xl};
`;
