import React, { memo, useMemo } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { usePageSEO } from "../hooks/useBreadcrumbs";
import SEO from "./SEO";
import { PageLayoutProps } from "./PageLayout.types";
import {
  PageLayoutWrapper,
  ContentWrapper,
  CustomBreadcrumbs,
  StyledTitleText,
  IconSpan,
  StyledSubtitleText,
} from "./PageLayout.styles";

const PageLayout: React.FC<PageLayoutProps> = memo(({
  children,
  showBreadcrumbs = true,
  showTitle = true,
  customTitle,
  customDescription,
  customKeywords,
  className,
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

      <PageLayoutWrapper className={className}>
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
      </PageLayoutWrapper>
    </>
  );
});

PageLayout.displayName = "PageLayout";

export default PageLayout;
