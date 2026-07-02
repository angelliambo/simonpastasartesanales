import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { useTranslation } from "../i18n/I18nProvider";
import { useThemeColors } from "../hooks/useThemeColors";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { CONTACT_EMAIL } from "@shared/config/contact";
import { PORTAL_URL, SHOW_SOCIAL_LINKS, SOCIAL_X_URL, SOCIAL_INSTAGRAM_URL } from "@shared/config/urls";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import pkg from "../../package.json";

const { Paragraph } = Typography;

const FooterContainer = styled.footer<{ colors: any }>`
  text-align: center;
  padding: 32px 24px;
  background: ${({ colors }) => colors?.background?.secondary || "#0a0a1a"};
  border-top: 1px solid ${({ colors }) => colors?.effects?.glassBorder || "rgba(255,255,255,0.06)"};
  color: ${({ colors }) => colors?.text?.tertiary || "rgba(255,255,255,0.5)"};
  font-size: 13px;
  position: relative;
  z-index: 1;
`;

const FooterLink = styled(Link)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.secondary || "rgba(255,255,255,0.6)"};
  text-decoration: none;
  &:hover {
    color: ${({ colors }) => colors?.text?.primary || "#fff"};
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.secondary || "rgba(255,255,255,0.6)"};
  text-decoration: none;
  &:hover {
    color: ${({ colors }) => colors?.text?.primary || "#fff"};
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 8px;
  color: rgba(255,255,255,0.2);
`;

const SocialContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const SocialIconLink = styled.a<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.secondary || "rgba(255,255,255,0.6)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  &:hover {
    color: ${({ colors }) => colors?.text?.primary || "#fff"};
  }
`;

const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <FooterContainer colors={colors}>
      <div>
        <FooterLink colors={colors} to="/commands">
          {t('pages.home.footerCommands') || 'Comandos de Voz'}
        </FooterLink>
        <Separator>|</Separator>
        <ExternalLink colors={colors} href={`mailto:${CONTACT_EMAIL}`}>
          Contáctenos
        </ExternalLink>
        <Separator>|</Separator>
        <FooterLink colors={colors} to="/legal/terms">
          {t('pages.home.footerTerminos') || 'Términos'}
        </FooterLink>
        <Separator>|</Separator>
        <FooterLink colors={colors} to="/legal/privacy">
          {t('pages.home.footerPrivacidad') || 'Privacidad'}
        </FooterLink>
      </div>

      {SHOW_SOCIAL_LINKS && (
        <SocialContainer>
          <SocialIconLink 
            colors={colors} 
            href={SOCIAL_X_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter/X"
          >
            <ZnIcon icon={TwitterOutlined} size={20} />
          </SocialIconLink>
          <SocialIconLink 
            colors={colors} 
            href={SOCIAL_INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            <ZnIcon icon={InstagramOutlined} size={20} />
          </SocialIconLink>
        </SocialContainer>
      )}

      <Paragraph style={{ margin: "12px 0 0", fontSize: 12, color: "inherit" }}>
        &copy; {new Date().getFullYear()}{" "}
        <ExternalLink colors={colors} href={PORTAL_URL}>{BRAND_CONFIG.siteName}</ExternalLink>.{" "}
        {t('pages.home.footerRights') || 'Todos los derechos reservados.'}
        {" "}&mdash;{" "}
        {t('pages.home.versionLabel') || 'Versión'} {pkg.version}
      </Paragraph>
    </FooterContainer>
  );
};

export default AppFooter;
