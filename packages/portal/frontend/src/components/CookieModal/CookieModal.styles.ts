import styled from 'styled-components';
import Card from '@design-sys/atoms/Card';
import Text from '@design-sys/atoms/Text';
import Title from '@design-sys/atoms/Title';
import Button from '@design-sys/atoms/Button';
import { Link } from 'react-router-dom';

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${({ theme }) => theme?.spacing?.md};
  transition: opacity ${({ theme }) => theme?.transitions?.fast}, visibility ${({ theme }) => theme?.transitions?.fast};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md}) {
    padding: ${({ theme }) => theme?.spacing?.sm};
  }
`;

export const ModalContainer = styled(Card)<{ $isOpen: boolean }>`
  width: 65%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid ${({ theme }) => theme?.colors?.primary?.[500]};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(20px)')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: transform ${({ theme }) => theme?.transitions?.fast}, opacity ${({ theme }) => theme?.transitions?.fast};

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md}) {
    width: 90%;
    max-width: 100%;
    max-height: 90vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme?.spacing?.md};
  padding: ${({ theme }) => theme?.spacing?.lg};
  border-bottom: 2px solid ${({ theme }) => theme?.colors?.border?.light};
  background: ${({ theme }) => theme?.colors?.background?.secondary};

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md}) {
    padding: ${({ theme }) => `${theme?.spacing?.md} ${theme?.spacing?.sm}`};
    gap: ${({ theme }) => theme?.spacing?.sm};
  }
`;

export const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme?.colors?.primary?.[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme?.colors?.text?.inverse};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xl};

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md}) {
    width: 40px;
    height: 40px;
    font-size: ${({ theme }) => theme?.typography?.fontSize?.lg};
  }
`;

export const ModalBody = styled.div<{ $isMobile?: boolean }>`
  padding: ${({ $isMobile, theme }) => ($isMobile ? theme?.spacing?.md : theme?.spacing?.xl)};
  line-height: 1.8;
`;

export const ModalFooter = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  gap: ${({ $isMobile, theme }) => ($isMobile ? theme?.spacing?.sm : theme?.spacing?.md)};
  padding: ${({ $isMobile, theme }) => ($isMobile ? theme?.spacing?.md : theme?.spacing?.lg)};
  border-top: 2px solid ${({ theme }) => theme?.colors?.border?.light};
  background: ${({ theme }) => theme?.colors?.background?.secondary};

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme?.spacing?.sm};
  }
`;

export const InfoBox = styled.div`
  background: ${({ theme }) => theme?.colors?.background?.surface};
  border-left: 4px solid ${({ theme }) => theme?.colors?.primary?.[500]};
  padding: ${({ theme }) => theme?.spacing?.md};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  margin: ${({ theme }) => theme?.spacing?.md} 0;

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md}) {
    padding: ${({ theme }) => theme?.spacing?.sm};
    margin: ${({ theme }) => theme?.spacing?.sm} 0;
  }
`;

export const LinkStyled = styled(Link)`
  color: ${({ theme }) => theme?.colors?.primary?.[500]};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium};

  &:hover {
    color: ${({ theme }) => theme?.colors?.primary?.[600]};
  }
`;

export const TitleStyled = styled(Title)<{ $isMobile?: boolean }>`
  && {
    margin: 0;
    color: ${({ theme }) => theme?.colors?.text?.primary};
    font-size: ${({ $isMobile, theme }) => ($isMobile ? theme?.typography?.fontSize?.lg : theme?.typography?.fontSize?.xl)};
  }
`;

export const BodyTextPrimary = styled(Text)<{ $isMobile?: boolean }>`
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme?.typography?.fontSize?.sm : theme?.typography?.fontSize?.md)};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
  color: ${({ theme }) => theme?.colors?.text?.primary};
`;

export const BodyTextSecondary = styled(Text)<{ $isMobile?: boolean }>`
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme?.typography?.fontSize?.xs : theme?.typography?.fontSize?.sm)};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
`;

export const StyledList = styled.ul<{ $isMobile?: boolean }>`
  margin-left: ${({ theme }) => theme?.spacing?.md};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme?.typography?.fontSize?.xs : theme?.typography?.fontSize?.sm)};
  line-height: 1.8;
`;

export const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
`;

export const InfoText = styled(Text)<{ $isMobile?: boolean }>`
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme?.typography?.fontSize?.xs : theme?.typography?.fontSize?.sm)};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  margin: 0;
`;

export const FooterText = styled(Text)<{ $isMobile?: boolean }>`
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme?.typography?.fontSize?.xs : theme?.typography?.fontSize?.sm)};
  color: ${({ theme }) => theme?.colors?.text?.tertiary};
  margin-top: ${({ theme }) => theme?.spacing?.md};
`;

export const FooterButton = styled(Button)<{ $isMobile?: boolean }>`
  ${({ $isMobile }) => (!$isMobile ? 'flex: 1;' : '')}
`;
