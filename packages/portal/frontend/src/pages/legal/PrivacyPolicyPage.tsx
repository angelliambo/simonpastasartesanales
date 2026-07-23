import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { useTranslation } from "../../i18n/I18nProvider";
import { useThemeColors } from "../../hooks/useThemeColors";


const { Title, Paragraph } = Typography;

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

const StyledFooterText = styled(Paragraph)<{ colors: any }>`
  color: ${({ colors }) => colors?.text?.tertiary || "rgba(255,255,255,0.5)"} !important;
  font-size: 12px !important;
  text-align: center;
  margin-top: 40px !important;
`;

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
      <PageWrapper colors={colors}>
        <Container colors={colors}>
          <StyledMainTitle colors={colors} level={1}>{t('pages.privacy.titulo')}</StyledMainTitle>
          <StyledSubtitle colors={colors}>{t('pages.privacy.ultimaActualizacion')}</StyledSubtitle>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion1Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion1Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion2Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion2Texto')}</StyledBodyParagraph>
            <List colors={colors}>
              <Item>{t('pages.privacy.seccion2Item1')}</Item>
              <Item>{t('pages.privacy.seccion2Item2')}</Item>
              <Item>{t('pages.privacy.seccion2Item3')}</Item>
              <Item>{t('pages.privacy.seccion2Item4')}</Item>
              <Item>{t('pages.privacy.seccion2Item5')}</Item>
            </List>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion3Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion3Texto1')}</StyledBodyParagraph>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion3Texto2')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion4Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion4Texto1')}</StyledBodyParagraph>
            <List colors={colors}>
              <Item>{t('pages.privacy.seccion4Item1')}</Item>
              <Item>{t('pages.privacy.seccion4Item2')}</Item>
              <Item>{t('pages.privacy.seccion4Item3')}</Item>
            </List>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion4Texto2')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion5Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion5Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion6Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion6Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion7Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion7Texto')}</StyledBodyParagraph>
          </Section>

          <Section colors={colors}>
            <StyledSectionTitle colors={colors} level={3}>{t('pages.privacy.seccion8Titulo')}</StyledSectionTitle>
            <StyledBodyParagraph colors={colors}>{t('pages.privacy.seccion8Texto')}</StyledBodyParagraph>
          </Section>

          <StyledFooterText colors={colors}>{t('pages.privacy.footerCopy')}</StyledFooterText>
        </Container>
      </PageWrapper>
  );
};

export default PrivacyPolicyPage;
