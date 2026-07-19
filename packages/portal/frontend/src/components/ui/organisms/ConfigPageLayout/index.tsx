import React, { useCallback, useMemo, memo } from "react";
import { getHeroGradient } from "../../../../styles/themes";
import {
  useResponsive,
  useThemeColors,
  useResponsiveSpacing,
} from "../../../../hooks";
import {
  LayoutOuter,
  LayoutInner,
  HeroCard,
  HeroIcon,
  HeroTitle,
  HeroSubtitle,
  SectionOuter,
  SectionTitle,
  CardWrapper,
  CardTitle,
  CardSubtitle,
  TextWrapper,
  IconWrapper,
} from "./ConfigPageLayout.styles";
import { ZnIcon } from "@factory/shared/design-sys/atoms/ZnIcon";

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
  marginBottom?: number;
}>(({ children, title, className = "", style = {}, marginBottom: customMargin }) => {
  const colors = useThemeColors();
  const { isMobile } = useResponsive();
  const spacing = useResponsiveSpacing();

  const getSpacingNumber = useCallback((size: string): number => {
    return parseInt(size.replace("px", "")) || 0;
  }, []);

  const defaultMargin = isMobile
    ? getSpacingNumber(spacing.lg) * 2
    : getSpacingNumber(spacing.lg) * 3;

  const marginBottom = customMargin !== undefined ? customMargin : defaultMargin;
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
  $icon?: any;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "elevated" | "outlined" | "filled" | "glass";
}>(({
  children,
  title,
  subtitle,
  $icon,
  onClick,
  className = "",
  style = {},
  variant = "elevated",
}) => {
  const colors = useThemeColors();
  const { isMobile, isTablet } = useResponsive();
  const spacing = useResponsiveSpacing();

  const handleIconSize = () => {
    if (isMobile) return 24;
    if (isTablet) return 32;
    return 48;
  };

  return (
    <CardWrapper
      variant={variant}
      size="lg"
      onClick={onClick}
      className={className}
      $hasClick={!!onClick}
      style={style}
    >
      {$icon && (
        <IconWrapper $marginBottom={spacing.md}>
          <ZnIcon icon={$icon} size={handleIconSize()} />
        </IconWrapper>
      )}
      <TextWrapper>
        {title && (
          <CardTitle
            colors={colors}
            $marginBottom={spacing.xs}
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
      </TextWrapper>
      {children}
    </CardWrapper>
  );
});

export default ConfigPageLayout;
