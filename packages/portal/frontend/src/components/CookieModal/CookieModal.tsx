import React from "react";
import styled from "styled-components";
import Card from '@design-sys/atoms/Card';
import Text from '@design-sys/atoms/Text';
import Title from '@design-sys/atoms/Title';
import Button from '@design-sys/atoms/Button';
import { useThemeColors } from "../../hooks/useThemeColors";
import { useResponsive } from "../../hooks/useResponsive";
import { Link } from "react-router-dom";
import { SafetyOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { createShouldForwardProp } from "../../utils/shouldForwardProp";

// Styled Components
const Overlay = styled.div<{ $isOpen: boolean; colors: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ colors }) => `rgba(0, 0, 0, 0.75)`};
  /* Usar visibility y opacity en lugar de display para evitar CLS */
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  /* Transición suave para reducir layout shifts */
  transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
  /* Prevenir interacción cuando está oculto */
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  /* Remover animación fadeIn - ya se maneja con transition */

  @media (max-width: 767px) {
    padding: 16px;
  }

  @media (max-width: 424px) {
    padding: 12px;
  }
`;

const ModalContainer = styled(Card).withConfig({
  shouldForwardProp: createShouldForwardProp(["colors"]),
})<{ colors: any; $isOpen: boolean }>`
  width: 65%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid ${({ colors }) => colors.primary[500]};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  /* Usar transform en lugar de animation para mejor performance y menos CLS */
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(20px)")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  /* Remover animación slideUp - ya se maneja con transition */

  @media (max-width: 1023px) {
    width: 75%;
    max-width: 700px;
  }

  @media (max-width: 767px) {
    width: 90%;
    max-width: 100%;
    max-height: 90vh;
  }

  @media (max-width: 424px) {
    width: 95%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div<{ colors: any }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-bottom: 2px solid ${({ colors }) => colors.border.light};
  background: linear-gradient(
    135deg,
    ${({ colors }) => colors.primary[50]} 0%,
    ${({ colors }) => colors.primary[100]} 100%
  );

  @media (max-width: 767px) {
    padding: 20px 16px;
    gap: 12px;
  }

  @media (max-width: 424px) {
    padding: 16px 12px;
    gap: 10px;
  }
`;

const IconContainer = styled.div<{ colors: any }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ colors }) => colors.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: 24px;

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  @media (max-width: 424px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

const ModalBody = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["colors", "isMobile"]),
})<{ colors: any; isMobile: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? "20px 16px" : "32px 24px")};
  line-height: 1.8;

  @media (max-width: 424px) {
    padding: 16px 12px;
  }
`;

const ModalFooter = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["colors", "isMobile"]),
})<{ colors: any; isMobile: boolean }>`
  display: flex;
  gap: ${({ isMobile }) => (isMobile ? "12px" : "16px")};
  padding: ${({ isMobile }) => (isMobile ? "20px 16px" : "24px")};
  border-top: 2px solid ${({ colors }) => colors.border.light};
  background: ${({ colors }) => colors.background.secondary};

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 12px;
  }

  @media (max-width: 424px) {
    padding: 16px 12px;
    gap: 10px;
  }
`;


const InfoBox = styled.div<{ colors: any }>`
  background: ${({ colors }) => colors.info[50]};
  border-left: 4px solid ${({ colors }) => colors.info[500]};
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;

  @media (max-width: 767px) {
    padding: 12px;
    margin: 16px 0;
  }
`;

const LinkStyled = styled(Link)<{ colors: any }>`
  color: ${({ colors }) => colors.primary[500]};
  text-decoration: underline;
  font-weight: 500;

  &:hover {
    color: ${({ colors }) => colors.primary[600]};
  }
`;

const TitleStyled = styled(Title)<{ colors: any; $isMobile: boolean }>`
  margin: 0;
  color: ${({ colors }) => colors.text.primary};
  font-size: ${({ $isMobile }) => ($isMobile ? "20px" : "24px")};
`;

const BodyTextPrimary = styled(Text)<{ colors: any; $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "15px" : "16px")};
  margin-bottom: 16px;
  color: ${({ colors }) => colors.text.primary};
`;

const BodyTextSecondary = styled(Text)<{ colors: any; $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "15px")};
  margin-bottom: 16px;
  color: ${({ colors }) => colors.text.secondary};
`;

const StyledList = styled.ul<{ colors: any; $isMobile: boolean }>`
  margin-left: 20px;
  margin-bottom: 20px;
  color: ${({ colors }) => colors.text.secondary};
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "15px")};
  line-height: 1.8;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const InfoText = styled(Text)<{ colors: any; $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "13px" : "14px")};
  color: ${({ colors }) => colors.info[700]};
  margin: 0;
`;

const FooterText = styled(Text)<{ colors: any; $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "13px" : "14px")};
  color: ${({ colors }) => colors.text.tertiary};
  margin-top: 20px;
`;

const FooterButton = styled(Button)<{ $isMobile: boolean }>`
  ${({ $isMobile }) => (!$isMobile ? "flex: 1;" : "")}
`;

interface CookieModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  onClose?: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({
  isOpen,
  onAccept,
  onReject,
  onClose,
}) => {
  const colors = useThemeColors();
  const { isMobile } = useResponsive();

  // NO retornar null - siempre renderizar para evitar layout shifts
  // El Overlay maneja la visibilidad con visibility y opacity

  const handleAccept = () => {
    onAccept();
    if (onClose) onClose();
  };

  const handleReject = () => {
    onReject();
    if (onClose) onClose();
  };

  return (
    <Overlay $isOpen={isOpen} colors={colors} onClick={onClose}>
      <ModalContainer
        $isOpen={isOpen}
        colors={colors}
        variant="elevated"
        size="lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader colors={colors}>
          <IconContainer colors={colors}>
            <ZnIcon icon={SafetyOutlined} />
          </IconContainer>
          <TitleStyled
            level={3}
            colors={colors}
            $isMobile={isMobile}
          >
            Política de Cookies
          </TitleStyled>
        </ModalHeader>

        <ModalBody colors={colors} isMobile={isMobile}>
          <BodyTextPrimary
            variant="body1"
            colors={colors}
            $isMobile={isMobile}
          >
            En {BRAND_CONFIG.siteName} utilizamos cookies para mejorar tu experiencia y ofrecerte
            funcionalidades personalizadas.
          </BodyTextPrimary>

          <BodyTextSecondary
            variant="body2"
            colors={colors}
            $isMobile={isMobile}
          >
            <strong>¿Por qué son importantes las cookies?</strong>
          </BodyTextSecondary>

          <StyledList colors={colors} $isMobile={isMobile}>
            <ListItem>
              <strong>Funcionalidad esencial:</strong> Permiten que el portal funcione
              correctamente y recuerde tus preferencias.
            </ListItem>
            <ListItem>
              <strong>Experiencia personalizada:</strong> Adaptamos el contenido y las
              funcionalidades según tus necesidades.
            </ListItem>
            <ListItem>
              <strong>Mejoras continuas:</strong> Nos ayudan a entender cómo se usa el
              portal para mejorarlo constantemente.
            </ListItem>
            <ListItem>
              <strong>Seguridad:</strong> Protegen tu información y previenen accesos no
              autorizados.
            </ListItem>
          </StyledList>

          <InfoBox colors={colors}>
            <InfoText
              variant="body2"
              colors={colors}
              $isMobile={isMobile}
            >
              <strong>Importante:</strong> Si no aceptas las cookies, algunas
              funcionalidades del portal podrían verse limitadas o no funcionar
              correctamente. Te recomendamos aceptarlas para disfrutar de la mejor
              experiencia posible.
            </InfoText>
          </InfoBox>

          <FooterText
            variant="body2"
            colors={colors}
            $isMobile={isMobile}
          >
            Puedes leer más sobre nuestra{" "}
            <LinkStyled to="/legal/cookies" colors={colors}>
              Política de Cookies
            </LinkStyled>{" "}
            para obtener información detallada.
          </FooterText>
        </ModalBody>

        <ModalFooter colors={colors} isMobile={isMobile}>
          <FooterButton
            variant="outlined"
            size={isMobile ? "md" : "lg"}
            onClick={handleReject}
            fullWidth={isMobile}
            $isMobile={isMobile}
          >
            Rechazar
          </FooterButton>
          <FooterButton
            variant="primary"
            size={isMobile ? "md" : "lg"}
            onClick={handleAccept}
            fullWidth={isMobile}
            $isMobile={isMobile}
          >
            Aceptar Cookies
          </FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

