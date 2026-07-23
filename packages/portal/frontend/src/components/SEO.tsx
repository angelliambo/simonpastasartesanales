import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation, LANGUAGES } from "../i18n/I18nProvider";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: any;
  noIndex?: boolean;
  noFollow?: boolean;
  locale?: string;
  alternateLanguages?: { href: string; hreflang: string }[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = `/og-image.png?v=${BRAND_CONFIG.assetVersion}`,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterSite = "@simonpastas",
  twitterCreator = "@simonpastas",
  structuredData,
  noIndex = false,
  noFollow = false,
  locale,
  alternateLanguages = [],
}) => {
  const { t, lang: currentLang } = useTranslation();

  const finalLocale = locale || currentLang;

  // Fallbacks usando las traducciones de la Home si no se proveen metadatos específicos
  const finalTitle = title || t('pages.home.seoTitle') || BRAND_CONFIG.seoTitle;
  const finalDescription = description || t('pages.home.seoDescription') || BRAND_CONFIG.seoDescription;

  const rawKeywords = keywords || t('pages.home.seoKeywords');
  const finalKeywords = Array.isArray(rawKeywords)
    ? rawKeywords.join(", ")
    : (rawKeywords || BRAND_CONFIG.seoKeywords);

  const fullTitle = finalTitle.includes(BRAND_CONFIG.siteName)
    ? finalTitle
    : `${finalTitle} | ${BRAND_CONFIG.siteName}`;

  const currentUrl =
    canonicalUrl || (typeof window !== "undefined" ? window.location.origin + window.location.pathname + window.location.search : "");

  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage
    : (typeof window !== 'undefined' ? `${window.location.origin}${ogImage}` : ogImage);

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": ["FoodEstablishment", "LocalBusiness", "WholesaleStore"],
    "name": BRAND_CONFIG.siteName,
    "description": finalDescription,
    "url": "https://simonpastasartesanales.com.ar/",
    "telephone": "+541141921222",
    "email": BRAND_CONFIG.supportEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San Luis 1263",
      "addressLocality": "Bernal",
      "addressRegion": "Buenos Aires",
      "postalCode": "B1876",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.7083,
      "longitude": -58.2833
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Bernal" },
      { "@type": "AdministrativeArea", "name": "Quilmes" },
      { "@type": "AdministrativeArea", "name": "Zona Sur" },
      { "@type": "AdministrativeArea", "name": "Buenos Aires" }
    ],
    "servesCuisine": "Pastas Artesanales, Sorrentinos, Ravioles, Panzottis, Empanadas",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "image": absoluteOgImage
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  // Generar dinámicamente links rel="alternate" para indexación multiidioma si no se pasan explícitamente
  let finalAlternateLanguages = alternateLanguages;
  if (alternateLanguages.length === 0 && typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    const currentOrigin = window.location.origin;

    finalAlternateLanguages = LANGUAGES.map(l => {
      const params = new URLSearchParams(window.location.search);
      params.set('lang', l.code);
      return {
        hreflang: l.code,
        href: `${currentOrigin}${currentPath}?${params.toString()}`
      };
    });
  }

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={BRAND_CONFIG.siteName} />
      <meta
        name="robots"
        content={`${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"
          }`}
      />
      <meta name="language" content={finalLocale} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:type" content={ogImage.endsWith(".png") ? "image/png" : "image/jpeg"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content={BRAND_CONFIG.siteName} />
      <meta property="og:locale" content={finalLocale} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {/* Idioma alternativo */}
      {finalAlternateLanguages.map((lang, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={lang.hreflang}
          href={lang.href}
        />
      ))}

      {/* Structured Data */}
      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      )}

      {/* Meta tags adicionales para SEO */}
      <meta name="theme-color" content="#193220" />
      <meta name="msapplication-TileColor" content="#193220" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content={BRAND_CONFIG.siteName}
      />

      {/* Preconnect para mejorar performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};

export default SEO;
