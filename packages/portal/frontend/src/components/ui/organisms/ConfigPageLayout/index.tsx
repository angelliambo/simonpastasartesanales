import React, { useCallback, useMemo, memo } from "react";
import styled, { css } from "styled-components";
import { Container } from "../../atoms/Container";
import Card from "../../atoms/Card";
import { getHeroGradient } from "../../../../styles/themes";
import {
  useResponsive,
  useThemeColors,
  useResponsiveSpacing,
} from "../../../../hooks";

const LayoutOuter = styled.div<{ colors: any; $isMobile: boolean; $paddingTop: number }>`
  background: ${({ colors }) => colors.background.secondary};
  min-height: 100vh;
  padding-top: ${({ $isMobile, $paddingTop }) => ($isMobile ? `${$paddingTop}px` : "0px")};
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin-left: 0;
      margin-right: 0;
      overflow-x: hidden;
    `}
`;

const LayoutInner = styled(Container) <{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      padding-bottom: 0;
    `}
`;

const HeroCard = styled(Card) <{ colors: any; $isMobile: boolean; $gradient: string; $marginBottom: string }>`
  background: ${({ $gradient }) => $gradient};
  margin-top: 0;
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "48px")};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: ${({ colors }) => colors.text.inverse};
  border: 2px solid ${({ colors }) => colors.border.normal};
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          height: 200px;
          min-height: 200px;
          max-height: 200px;
          width: 100%;
        `
      : css`
          min-height: 250px;
        `}
`;

const HeroIcon = styled.div<{ colors: any; $isMobile: boolean; $marginBottom: string }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "48px" : "64px")};
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "16px")};
  color: ${({ colors }) => colors.text.inverse};
  line-height: 1;
`;

const HeroTitle = styled.h1<{ colors: any; $isMobile: boolean; $marginBottom: string }>`
  color: ${({ colors }) => colors.text.inverse};
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "16px")};
  font-size: ${({ $isMobile }) => ($isMobile ? "28px" : "36px")};
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  ${({ $isMobile }) => $isMobile && css`min-height: 34px;`}
`;

const HeroSubtitle = styled.p<{ colors: any; $isMobile: boolean; $marginBottom: string }>`
  color: ${({ colors }) => colors.text.inverse};
  font-size: ${({ $isMobile }) => ($isMobile ? "16px" : "18px")};
  opacity: 0.9;
  max-width: 600px;
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "32px")};
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  ${({ $isMobile }) => $isMobile && css`min-height: 48px;`}
`;

const SectionOuter = styled.div<{ $isMobile: boolean; $marginBottom: number }>`
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom}px`};
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    `}
`;

const SectionTitle = styled.h2<{ colors: any; $isMobile: boolean; $marginBottom: number }>`
  text-align: center;
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom}px`};
  color: ${({ colors }) => colors.text.primary};
  font-size: ${({ $isMobile }) => ($isMobile ? "22px" : "28px")};
`;

const CardWrapper = styled(Card) <{ $hasClick: boolean }>`
  height: 100%;
  cursor: ${({ $hasClick }) => ($hasClick ? "pointer" : "default")};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const CardIcon = styled.div<{ colors: any; $marginBottom: string }>`
  font-size: 48px;
  color: ${({ colors }) => colors.text.primary};
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  display: flex;
  justify-content: center;
`;

const CardTitle = styled.h3<{ colors: any; $marginBottom: string }>`
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  color: ${({ colors }) => colors.text.primary};
  font-size: 18px;
  font-weight: 600;
`;

const CardSubtitle = styled.p<{ colors: any; $marginBottom: string }>`
  color: ${({ colors }) => colors.text.secondary};
  font-size: 14px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
`;

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  showHero?: boolean;
  heroContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "config-page-layout-" */
  id?: string;
}

const ConfigPageLayout = memo<PageLayoutProps>(({
  children,
  title,
  subtitle,
  icon,
  showHero = false,
  heroContent,
  className = "",
  style = {},
  id,
}) => {
  const { isMobile } = useResponsive();
  const colors = useThemeColors();
  const spacing = useResponsiveSpacing();

  const getSpacingNumber = useCallback((size: string): number => {
    return parseInt(size.replace("px", "")) || 0;
  }, []);

  const heroGradient = useMemo(() => getHeroGradient(), [colors]);

  const finalId = id ? `config-page-layout-${id}` : undefined;

  return (
    <LayoutOuter
      id={finalId}
      className={`config-page-layout ${className}`}
      colors={colors}
      $isMobile={isMobile}
      $paddingTop={30 + getSpacingNumber(spacing.md)}
      style={style}
    >
      <LayoutInner
        maxWidth={isMobile ? "full" : "lg"}
        padding={isMobile ? "md" : "lg"}
        $isMobile={isMobile}
      >
        {showHero && (
          <HeroCard
            variant="elevated"
            size="lg"
            colors={colors}
            $isMobile={isMobile}
            $gradient={heroGradient}
            $marginBottom={spacing.md}
          >
            {icon && (
              <HeroIcon
                colors={colors}
                $isMobile={isMobile}
                $marginBottom={spacing.lg}
              >
                {icon}
              </HeroIcon>
            )}
            {title && (
              <HeroTitle
                colors={colors}
                $isMobile={isMobile}
                $marginBottom={spacing.lg}
              >
                {title}
              </HeroTitle>
            )}
            {subtitle && (
              <HeroSubtitle
                colors={colors}
                $isMobile={isMobile}
                $marginBottom={spacing.lg}
              >
                {subtitle}
              </HeroSubtitle>
            )}
            {heroContent}
          </HeroCard>
        )}

        {children}
      </LayoutInner>
    </LayoutOuter>
  );
});

ConfigPageLayout.displayName = "ConfigPageLayout";

export const ContentSection = memo<{
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}>(({ children, title, className = "", style = {} }) => {
  const colors = useThemeColors();
  const { isMobile } = useResponsive();
  const spacing = useResponsiveSpacing();

  const getSpacingNumber = useCallback((size: string): number => {
    return parseInt(size.replace("px", "")) || 0;
  }, []);

  const marginBottom = isMobile
    ? getSpacingNumber(spacing.lg) * 2
    : getSpacingNumber(spacing.lg) * 3;
  const titleMarginBottom = isMobile
    ? getSpacingNumber(spacing.md) * 2
    : getSpacingNumber(spacing.lg);

  return (
    <SectionOuter
      className={`content-section ${className}`}
      $isMobile={isMobile}
      $marginBottom={marginBottom}
      style={style}
    >
      {title && (
        <SectionTitle
          colors={colors}
          $isMobile={isMobile}
          $marginBottom={titleMarginBottom}
        >
          {title}
        </SectionTitle>
      )}
      {children}
    </SectionOuter>
  );
});

/**
 * Componente para cards de contenido con el patrón estándar
 */
export const ContentCard = memo<{
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "elevated" | "outlined" | "filled" | "glass";
}>(({
  children,
  title,
  subtitle,
  icon,
  onClick,
  className = "",
  style = {},
  variant = "elevated",
}) => {
  const colors = useThemeColors();
  const { isMobile } = useResponsive();
  const spacing = useResponsiveSpacing();

  return (
    <CardWrapper
      variant={variant}
      size="lg"
      onClick={onClick}
      className={className}
      $hasClick={!!onClick}
      style={style}
    >
      {icon && (
        <CardIcon
          colors={colors}
          $marginBottom={spacing.xs}
        >
          {icon}
        </CardIcon>
      )}
      {title && (
        <CardTitle
          colors={colors}
          $marginBottom={isMobile ? spacing.md : spacing.xs}
        >
          {title}
        </CardTitle>
      )}
      {subtitle && (
        <CardSubtitle
          colors={colors}
          $marginBottom={spacing.xs}
        >
          {subtitle}
        </CardSubtitle>
      )}
      {children}
    </CardWrapper>
  );
});

export default ConfigPageLayout;
