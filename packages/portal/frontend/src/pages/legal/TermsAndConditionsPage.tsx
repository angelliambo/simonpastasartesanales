import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { useTranslation } from "../../i18n/I18nProvider";
import { useThemeColors } from "../../hooks/useThemeColors";
import AppFooter from "../../components/AppFooter";

const { Title, Paragraph, Text } = Typography;

const PageWrapper = styled.div<{ colors: any }>`
  min-height: 100vh;
  background: ${({ colors }) => colors?.background?.primary || "#0f0f1a"};
`;

const Container = styled.div<{ colors: any }>`
  max-width: 800px;
  margin: 0 auto;
  padding: 64px 24px;
  color: ${({ colors }) => colors?.text?.primary || "#e0e0e0"};
  line-height: 1.8;
`;

const Section = styled.div<{ colors: any }>`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ colors }) => colors?.effects?.glassBorder || "rgba(255,255,255,0.06)"};
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const List = styled.ul<{ colors: any }>`
  padding-left: 24px;
  color: ${({ colors }) => colors?.text?.secondary || "rgba(255,255,255,0.7)"};
`;

const Item = styled.li`
  margin-bottom: 8px;
`;

const WarningBox = styled.div<{ colors: any }>`
  background: ${({ colors }) => {
    const w = colors?.warning;
    return w?.bg || "rgba(255, 193, 7, 0.08)";
  }};
  border: 1px solid ${({ colors }) => {
    const w = colors?.warning;
    return w?.border || "rgba(255, 193, 7, 0.25)";
  }};
  border-radius: 8px;
  padding: 20px;
  margin: 32px 0;
`;

const StyledMainTitle = styled(Title)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.primary || "#e0e0e0"} !important;
  margin-bottom: 8px !important;
`;

const StyledSubtitle = styled(Paragraph)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.tertiary || "rgba(255,255,255,0.5)"} !important;
  font-size: 14px !important;
  margin-bottom: 40px !important;
`;

const StyledSectionTitle = styled(Title)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.primary || "#e0e0e0"} !important;
`;

const StyledBodyParagraph = styled(Paragraph)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.secondary || "rgba(255,255,255,0.7)"} !important;
`;

const StyledStrongBlockWithTop = styled(Text)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.primary || "#e0e0e0"} !important;
  display: block;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const StyledStrongBlock = styled(Text)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.primary || "#e0e0e0"} !important;
  display: block;
  margin-bottom: 8px;
`;

const StyledWarningTitle = styled(Title)<{ colors: any }>`
  color: ${({ colors }) => colors?.warning?.text || "#ffc107"} !important;
  margin-bottom: 12px !important;
`;

const StyledWarningBody = styled(Paragraph)<{ colors: any }>`
  color: ${({ colors }) => colors?.warning?.text || "#ffc107"} !important;
`;

const StyledWarningSubtext = styled(Paragraph)<{ colors: any }>`
  color: ${({ colors }) => colors?.warning?.text || "#ffc107"} !important;
  opacity: 0.85;
`;

const StyledFooterText = styled(Paragraph)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.tertiary || "rgba(255,255,255,0.5)"} !important;
  font-size: 12px !important;
  text-align: center;
  margin-top: 40px !important;
`;

const TermsAndConditionsPage: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <>
      <PageWrapper colors={colors}>
        <Container colors={colors}>
          <StyledMainTitle colors={colors} level={1}>{t('pages.legal.titulo')}</StyledMainTitle>
          <StyledSubtitle colors={colors}>{t('pages.legal.ultimaActualizacion')}</StyledSubtitle>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion1Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion1Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion2Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion2Texto1')}</StyledBodyParagraph>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion2Texto2')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion3Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion3Texto1')}</StyledBodyParagraph>
            <List colors={colors}>
              <Item>{t('pages.legal.seccion3Item1')}</Item>
              <Item>{t('pages.legal.seccion3Item2')}</Item>
              <Item>{t('pages.legal.seccion3Item3')}</Item>
            </List>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion3Texto2')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion4Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion4Texto1')}</StyledBodyParagraph>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion4Texto2')}</StyledBodyParagraph>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion4Texto3')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion5Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion5Texto1')}</StyledBodyParagraph>
            <List colors={colors}>
              <Item>{t('pages.legal.seccion5Item1')}</Item>
              <Item>{t('pages.legal.seccion5Item2')}</Item>
              <Item>{t('pages.legal.seccion5Item3')}</Item>
              <Item>{t('pages.legal.seccion5Item4')}</Item>
              <Item>{t('pages.legal.seccion5Item5')}</Item>
            </List>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion6Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion6Texto1')}</StyledBodyParagraph>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion6Texto2')}</StyledBodyParagraph>
            <StyledStrongBlockWithTop colors={colors} strong>{t('pages.legal.seccion6ListaTitulo')}</StyledStrongBlockWithTop>
            <List colors={colors}>
              <Item>{t('pages.legal.seccion6Item1')}</Item>
              <Item>{t('pages.legal.seccion6Item2')}</Item>
              <Item>{t('pages.legal.seccion6Item3')}</Item>
            </List>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion7Titulo')}</StyledSectionTitle>
            <StyledStrongBlock colors={colors} strong>{t('pages.legal.seccion7ListaTitulo')}</StyledStrongBlock>
            <List colors={colors}>
              <Item>{t('pages.legal.seccion7Item1')}</Item>
              <Item>{t('pages.legal.seccion7Item2')}</Item>
              <Item>{t('pages.legal.seccion7Item3')}</Item>
              <Item>{t('pages.legal.seccion7Item4')}</Item>
            </List>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion8Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion8Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion9Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion9Texto1')}</StyledBodyParagraph>
            <List colors={colors}>
              <Item>{t('pages.legal.seccion9Item1')}</Item>
              <Item>{t('pages.legal.seccion9Item2')}</Item>
              <Item>{t('pages.legal.seccion9Item3')}</Item>
              <Item>{t('pages.legal.seccion9Item4')}</Item>
            </List>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion10Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion10Texto')}</StyledBodyParagraph>
            <List colors={colors}>
              <Item>{t('pages.legal.seccion10Item1')}</Item>
              <Item>{t('pages.legal.seccion10Item2')}</Item>
              <Item>{t('pages.legal.seccion10Item3')}</Item>
            </List>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion11Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion11Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.legal.seccion12Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.legal.seccion12Texto')}</StyledBodyParagraph>
          </Section>

          <WarningBox colors={colors}>
            <StyledWarningTitle colors={colors} level={4}>{t('pages.legal.avisoImportanteTitulo')}</StyledWarningTitle>
            <StyledWarningBody colors={colors} strong>{t('pages.legal.avisoImportanteTexto1')}</StyledWarningBody>
            <StyledWarningSubtext colors={colors}>{t('pages.legal.avisoImportanteTexto2')}</StyledWarningSubtext>
          </WarningBox>

          <StyledFooterText colors={colors}>{t('pages.legal.footerCopy')}</StyledFooterText>
        </Container>
      </PageWrapper>

      <AppFooter />
    </>
  );
};

export default TermsAndConditionsPage;
