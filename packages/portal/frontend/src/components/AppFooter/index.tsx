import React from "react";
import { useTranslation } from "../../i18n/I18nProvider";
import { SUPPORTED_LOCALES } from "../../i18n";
import { LanguageSelector } from "../../i18n/LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { useThemeColors } from "../../hooks/useThemeColors";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { CONTACT_EMAIL } from "@shared/config/contact";
import { PORTAL_URL, SHOW_SOCIAL_LINKS, SOCIAL_X_URL, SOCIAL_INSTAGRAM_URL } from "@shared/config/urls";
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
  const colors = useThemeColors();

  return (
    <FooterContainer $colors={colors}>
      <div>
        <FooterLink $colors={colors} to="/commands">
          {t('pages.home.footerCommands') || 'Comandos de Voz'}
        </FooterLink>
        <Separator>|</Separator>
        <ExternalLink $colors={colors} href={`mailto:${CONTACT_EMAIL}`}>
          Contáctenos
        </ExternalLink>
        <Separator>|</Separator>
        <FooterLink $colors={colors} to="/legal/terms">
          {t('pages.home.footerTerminos') || 'Términos'}
        </FooterLink>
        <Separator>|</Separator>
        <FooterLink $colors={colors} to="/legal/privacy">
          {t('pages.home.footerPrivacidad') || 'Privacidad'}
        </FooterLink>
      </div>

      {SHOW_SOCIAL_LINKS && (
        <SocialContainer>
          <SocialIconLink 
            $colors={colors} 
            href={SOCIAL_X_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter/X"
          >
            <ZnIcon icon={TwitterOutlined} size={20} />
          </SocialIconLink>
          <SocialIconLink 
            $colors={colors} 
            href={SOCIAL_INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            <ZnIcon icon={InstagramOutlined} size={20} />
          </SocialIconLink>
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
        <ExternalLink $colors={colors} href={PORTAL_URL}>{BRAND_CONFIG.siteName}</ExternalLink>.{" "}
        {t('pages.home.footerRights') || 'Todos los derechos reservados.'}
        {" "}&mdash;{" "}
        {t('pages.home.versionLabel') || 'Versión'} {pkg.version}
      </CopyRightParagraph>
    </FooterContainer>
  );
};

export default AppFooter;
