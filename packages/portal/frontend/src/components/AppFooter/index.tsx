import React from "react";
import { useTranslation } from "../../i18n/I18nProvider";
import { SUPPORTED_LOCALES } from "../../i18n";
import { LanguageSelector } from "../../i18n/LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { TwitterOutlined, InstagramOutlined, FacebookOutlined, MessageOutlined } from "@ant-design/icons";
import { CONTACT_EMAIL } from "@shared/config/contact";
import { 
  PORTAL_URL, 
  SHOW_SOCIAL_LINKS, 
  SOCIAL_X_URL, 
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_THREADS_URL
} from "@shared/config/urls";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import pkg from "../../../package.json";
import {
  FooterContainer,
  FooterLink,
  ExternalLink,
  Separator,
  SocialContainer,
  SocialIconLink,
  CopyRightParagraph,
  FooterLangSelectorWrapper,
} from "./AppFooter.styles";

const AppFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <div>
        <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>
          Contáctenos
        </ExternalLink>
        <Separator>|</Separator>
        <FooterLink to="/legal/terms">
          {t('pages.home.footerTerminos') || 'Términos'}
        </FooterLink>
        <Separator>|</Separator>
        <FooterLink to="/legal/privacy">
          {t('pages.home.footerPrivacidad') || 'Privacidad'}
        </FooterLink>
      </div>

      {SHOW_SOCIAL_LINKS && (
        <SocialContainer>
          {SOCIAL_FACEBOOK_URL && !SOCIAL_FACEBOOK_URL.includes('<username>') && (
            <SocialIconLink 
              href={SOCIAL_FACEBOOK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
            >
              <ZnIcon icon={FacebookOutlined} size={20} />
            </SocialIconLink>
          )}
          {SOCIAL_INSTAGRAM_URL && !SOCIAL_INSTAGRAM_URL.includes('<username>') && (
            <SocialIconLink 
              href={SOCIAL_INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <ZnIcon icon={InstagramOutlined} size={20} />
            </SocialIconLink>
          )}
          {SOCIAL_THREADS_URL && !SOCIAL_THREADS_URL.includes('<username>') && (
            <SocialIconLink 
              href={SOCIAL_THREADS_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Threads"
            >
              <ZnIcon icon={MessageOutlined} size={20} />
            </SocialIconLink>
          )}
          {SOCIAL_X_URL && !SOCIAL_X_URL.includes('<username>') && (
            <SocialIconLink 
              href={SOCIAL_X_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter/X"
            >
              <ZnIcon icon={TwitterOutlined} size={20} />
            </SocialIconLink>
          )}
        </SocialContainer>
      )}

      <FooterLangSelectorWrapper>
        <ThemeToggle variant="icon" />
        {SUPPORTED_LOCALES.length > 1 && (
          <LanguageSelector dropUp={true} />
        )}
      </FooterLangSelectorWrapper>

      <CopyRightParagraph>
        &copy; {new Date().getFullYear()}{" "}
        <ExternalLink href={PORTAL_URL}>{BRAND_CONFIG.siteName}</ExternalLink>.{" "}
        {t('pages.home.footerRights') || 'Todos los derechos reservados.'}
        {" "}&mdash;{" "}
        {t('pages.home.versionLabel') || 'Versión'} {pkg.version}
      </CopyRightParagraph>
    </FooterContainer>
  );
};

export default AppFooter;
