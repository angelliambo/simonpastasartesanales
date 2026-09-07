import React from "react";
import { useTranslation } from "../../i18n/I18nProvider";
import {
  PageWrapper,
  Container,
  Section,
  List,
  Item,
  WarningBox,
  StyledMainTitle,
  StyledSubtitle,
  StyledSectionTitle,
  StyledBodyParagraph,
  StyledStrongBlockWithTop,
  StyledStrongBlock,
  StyledWarningTitle,
  StyledWarningBody,
  StyledWarningSubtext,
  StyledFooterText,
} from "./TermsAndConditionsPage.styles";

const TermsAndConditionsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Container>
        <StyledMainTitle level={1}>{t('pages.legal.titulo')}</StyledMainTitle>
        <StyledSubtitle>{t('pages.legal.ultimaActualizacion')}</StyledSubtitle>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion1Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion1Texto')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion2Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion2Texto1')}</StyledBodyParagraph>
          <StyledBodyParagraph>{t('pages.legal.seccion2Texto2')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion3Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion3Texto1')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.legal.seccion3Item1')}</Item>
            <Item>{t('pages.legal.seccion3Item2')}</Item>
            <Item>{t('pages.legal.seccion3Item3')}</Item>
          </List>
          <StyledBodyParagraph>{t('pages.legal.seccion3Texto2')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion4Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion4Texto1')}</StyledBodyParagraph>
          <StyledBodyParagraph>{t('pages.legal.seccion4Texto2')}</StyledBodyParagraph>
          <StyledBodyParagraph>{t('pages.legal.seccion4Texto3')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion5Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion5Texto1')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.legal.seccion5Item1')}</Item>
            <Item>{t('pages.legal.seccion5Item2')}</Item>
            <Item>{t('pages.legal.seccion5Item3')}</Item>
            <Item>{t('pages.legal.seccion5Item4')}</Item>
            <Item>{t('pages.legal.seccion5Item5')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion6Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion6Texto1')}</StyledBodyParagraph>
          <StyledBodyParagraph>{t('pages.legal.seccion6Texto2')}</StyledBodyParagraph>
          <StyledStrongBlockWithTop strong>{t('pages.legal.seccion6ListaTitulo')}</StyledStrongBlockWithTop>
          <List>
            <Item>{t('pages.legal.seccion6Item1')}</Item>
            <Item>{t('pages.legal.seccion6Item2')}</Item>
            <Item>{t('pages.legal.seccion6Item3')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion7Titulo')}</StyledSectionTitle>
          <StyledStrongBlock strong>{t('pages.legal.seccion7ListaTitulo')}</StyledStrongBlock>
          <List>
            <Item>{t('pages.legal.seccion7Item1')}</Item>
            <Item>{t('pages.legal.seccion7Item2')}</Item>
            <Item>{t('pages.legal.seccion7Item3')}</Item>
            <Item>{t('pages.legal.seccion7Item4')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion8Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion8Texto')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion9Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion9Texto1')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.legal.seccion9Item1')}</Item>
            <Item>{t('pages.legal.seccion9Item2')}</Item>
            <Item>{t('pages.legal.seccion9Item3')}</Item>
            <Item>{t('pages.legal.seccion9Item4')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion10Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion10Texto')}</StyledBodyParagraph>
          <List>
            <Item>{t('pages.legal.seccion10Item1')}</Item>
            <Item>{t('pages.legal.seccion10Item2')}</Item>
            <Item>{t('pages.legal.seccion10Item3')}</Item>
          </List>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion11Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion11Texto')}</StyledBodyParagraph>
        </Section>

        <Section>
          <StyledSectionTitle level={3}>{t('pages.legal.seccion12Titulo')}</StyledSectionTitle>
          <StyledBodyParagraph>{t('pages.legal.seccion12Texto')}</StyledBodyParagraph>
        </Section>

        <WarningBox>
          <StyledWarningTitle level={4}>{t('pages.legal.avisoImportanteTitulo')}</StyledWarningTitle>
          <StyledWarningBody strong>{t('pages.legal.avisoImportanteTexto1')}</StyledWarningBody>
          <StyledWarningSubtext>{t('pages.legal.avisoImportanteTexto2')}</StyledWarningSubtext>
        </WarningBox>

        <StyledFooterText>{t('pages.legal.footerCopy')}</StyledFooterText>
      </Container>
    </PageWrapper>
  );
};

export default TermsAndConditionsPage;
