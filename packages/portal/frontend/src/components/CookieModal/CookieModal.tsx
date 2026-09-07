import React from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { SafetyOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  IconContainer,
  ModalBody,
  ModalFooter,
  InfoBox,
  LinkStyled,
  TitleStyled,
  BodyTextPrimary,
  BodyTextSecondary,
  StyledList,
  ListItem,
  InfoText,
  FooterText,
  FooterButton,
} from "./CookieModal.styles";

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
  const { isMobile } = useResponsive();

  const handleAccept = () => {
    onAccept();
    if (onClose) onClose();
  };

  const handleReject = () => {
    onReject();
    if (onClose) onClose();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        $isOpen={isOpen}
        variant="elevated"
        size="lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <IconContainer>
            <ZnIcon icon={SafetyOutlined} />
          </IconContainer>
          <TitleStyled
            level={3}
            $isMobile={isMobile}
          >
            Política de Cookies
          </TitleStyled>
        </ModalHeader>

        <ModalBody $isMobile={isMobile}>
          <BodyTextPrimary
            variant="body1"
            $isMobile={isMobile}
          >
            En {BRAND_CONFIG.siteName} utilizamos cookies para mejorar tu experiencia y ofrecerte
            funcionalidades personalizadas.
          </BodyTextPrimary>

          <BodyTextSecondary
            variant="body2"
            $isMobile={isMobile}
          >
            <strong>¿Por qué son importantes las cookies?</strong>
          </BodyTextSecondary>

          <StyledList $isMobile={isMobile}>
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

          <InfoBox>
            <InfoText
              variant="body2"
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
            $isMobile={isMobile}
          >
            Puedes leer más sobre nuestra{" "}
            <LinkStyled to="/legal/cookies">
              Política de Cookies
            </LinkStyled>{" "}
            para obtener información detallada.
          </FooterText>
        </ModalBody>

        <ModalFooter $isMobile={isMobile}>
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
