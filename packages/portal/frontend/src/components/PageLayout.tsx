import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { useResponsive } from "../hooks/useResponsive";
import { usePageSEO } from "../hooks/useBreadcrumbs";
import Breadcrumbs from "./Breadcrumbs";
import SEO from "./SEO";
import Text from '@design-sys/atoms/Text';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showTitle?: boolean;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  className?: string;
  style?: React.CSSProperties;
  // Props adicionales para compatibilidad con componentes existentes
  title?: string;
  subtitle?: string;
  icon?: string;
  showBackButton?: boolean;
  containerId?: string;
  headerId?: string;
  contentId?: string;
}

const ContentWrapper = styled.div<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? "10px 12px 24px" : "10px 24px 24px")};
  min-height: calc(100vh - 64px);
  border-radius: ${({ $isMobile }) => ($isMobile ? "12px 12px 0 0" : "24px 24px 0 0")};
  margin-top: ${({ $isMobile }) => ($isMobile ? "8px" : "5px")};
`;

const CustomBreadcrumbs = styled(Breadcrumbs)<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "12px" : "16px")};
  font-size: ${({ $isMobile }) => ($isMobile ? "12px" : "14px")};
  padding: ${({ $isMobile }) => ($isMobile ? "6px 12px" : "8px 16px")};
`;

const StyledTitleText = styled(Text)<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: ${({ $isMobile }) => ($isMobile ? "22px" : "28px")};
  display: block;
`;

const IconSpan = styled.span`
  margin-right: 8px;
`;

const StyledSubtitleText = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "16px")};
  font-weight: 400;
  margin-top: 4px;
  display: block;
`;

const PageLayout: React.FC<PageLayoutProps> = memo(({
  children,
  showBreadcrumbs = true,
  showTitle = true,
  customTitle,
  customDescription,
  customKeywords,
  className,
  style,
  title,
  subtitle,
  icon,
  containerId,
  headerId,
  contentId,
}) => {
  const { isMobile } = useResponsive();
  const {
    title: seoTitle,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    currentPage,
  } = usePageSEO();

  const finalTitle = useMemo(() => customTitle || seoTitle, [customTitle, seoTitle]);
  const finalDescription = useMemo(() => customDescription || description, [customDescription, description]);
  const finalKeywords = useMemo(() => customKeywords || keywords, [customKeywords, keywords]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: finalTitle,
    description: finalDescription,
    url: canonicalUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [],
    },
  }), [finalTitle, finalDescription, canonicalUrl]);

  return (
    <>
      <SEO
        title={finalTitle}
        description={finalDescription}
        keywords={finalKeywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        structuredData={structuredData}
      />

      <div className={className} style={style}>
        <ContentWrapper id={contentId} $isMobile={isMobile}>
          {showBreadcrumbs && (
            <CustomBreadcrumbs $isMobile={isMobile} />
          )}

          {showTitle && (
            <div id={headerId}>
              <StyledTitleText
                variant="h1"
                weight="semibold"
                $isMobile={isMobile}
              >
                {icon && <IconSpan>{icon}</IconSpan>}
                {title || currentPage}
              </StyledTitleText>
              {subtitle && (
                <StyledSubtitleText
                  variant="body1"
                  color="secondary"
                  $isMobile={isMobile}
                >
                  {subtitle}
                </StyledSubtitleText>
              )}
            </div>
          )}

          <div id={containerId}>{children}</div>
        </ContentWrapper>
      </div>
    </>
  );
});

PageLayout.displayName = "PageLayout";

export default PageLayout;
