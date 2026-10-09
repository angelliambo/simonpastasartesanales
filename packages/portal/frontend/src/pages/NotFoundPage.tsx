import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "../i18n/I18nProvider";
import SEO from "../components/SEO";
import {
  Container,
  ErrorCode,
  Title,
  Description,
  StyledButton,
} from "./NotFoundPage.styles";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <SEO noIndex={true} title={t('pages.notFound.title', 'Error 404')} />
      <ErrorCode>{t('pages.notFound.title')}</ErrorCode>
      <Title>{t('pages.notFound.message')}</Title>
      <Description>
        {t('pages.notFound.description')}
      </Description>
      <StyledButton onClick={() => navigate({ to: "/" })}>
        🏠 {t('pages.notFound.goHomeButton')}
      </StyledButton>
    </Container>
  );
};

export default NotFoundPage;
