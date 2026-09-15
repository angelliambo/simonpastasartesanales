import React from "react";
import { useTranslation } from "../../i18n/I18nProvider";
import {
  PageWrapper,
  Container,
  Section,
  List,
  Item,
  StyledMainTitle,
  StyledSubtitle,
  StyledSectionTitle,
  StyledBodyParagraph,
  StyledFooterText,
} from "./PrivacyPolicyPage.styles";

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Container>
        <StyledMainTitle level={1}>{t('pages.privacy.titulo')}</StyledMainTitle>
        <StyledSubtitle>{t('pages.privacy.ultimaActualizacion')}</StyledSubtitle>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion1Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion1Texto')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion2Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion2Texto')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.privacy.seccion2Item1')}</Item>
            <Item>{t('pages.privacy.seccion2Item2')}</Item>
            <Item>{t('pages.privacy.seccion2Item3')}</Item>
            <Item>{t('pages.privacy.seccion2Item4')}</Item>
            <Item>{t('pages.privacy.seccion2Item5')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion3Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion3Texto1')}</StyledBodyParagraph>
          <StyledBodyParagraph>{t('pages.privacy.seccion3Texto2')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion4Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion4Texto')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.privacy.seccion4Item1')}</Item>
            <Item>{t('pages.privacy.seccion4Item2')}</Item>
            <Item>{t('pages.privacy.seccion4Item3')}</Item>
            <Item>{t('pages.privacy.seccion4Item4')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion5Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion5Texto')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.privacy.seccion5Item1')}</Item>
            <Item>{t('pages.privacy.seccion5Item2')}</Item>
            <Item>{t('pages.privacy.seccion5Item3')}</Item>
            <Item>{t('pages.privacy.seccion5Item4')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion6Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion6Texto')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion7Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion7Texto')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.privacy.seccion8Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.privacy.seccion8Texto')}</StyledBodyParagraph>
        </Section>

        <StyledFooterText>{t('pages.privacy.footerCopy')}</StyledFooterText>
      </Container>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;
