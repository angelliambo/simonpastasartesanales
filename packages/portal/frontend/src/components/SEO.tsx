import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../i18n/I18nProvider";
import { LANGUAGES } from "../i18n/languages";
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
  ogImage = `/og-image.webp?v=${BRAND_CONFIG.assetVersion}`,
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

  const rawPath = typeof window !== "undefined" ? window.location.pathname : "";
  const normalizedPath = rawPath && !rawPath.endsWith('/') && !rawPath.includes('.') ? `${rawPath}/` : rawPath;
  const currentUrl =
    canonicalUrl || (typeof window !== "undefined" ? `${window.location.origin}${normalizedPath}` : "");

  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage
    : (typeof window !== 'undefined' ? `${window.location.origin}${ogImage}` : ogImage);

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["FoodEstablishment", "LocalBusiness", "WholesaleStore"],
        "@id": "https://simonpastasartesanales.com.ar/#business",
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
          { "@type": "AdministrativeArea", "name": "Avellaneda" },
          { "@type": "AdministrativeArea", "name": "Wilde" },
          { "@type": "AdministrativeArea", "name": "Don Bosco" },
          { "@type": "AdministrativeArea", "name": "Ezpeleta" },
          { "@type": "AdministrativeArea", "name": "Berazategui" },
          { "@type": "AdministrativeArea", "name": "Zona Sur" }
        ],
        "servesCuisine": ["Pastas Artesanales", "Sorrentinos", "Ravioles", "Panzottis", "Ñoquis del 29", "Fideos Frescos", "Empanadas Gourmet"],
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "19:00"
          }
        ],
        "image": absoluteOgImage
      },
      {
        "@type": "WebSite",
        "@id": "https://simonpastasartesanales.com.ar/#website",
        "url": "https://simonpastasartesanales.com.ar/",
        "name": BRAND_CONFIG.siteName,
        "description": "Fábrica de Pastas Artesanales Congeladas en Caja | Venta Minorista y Mayorista en Bernal y Zona Sur",
        "inLanguage": ["es"]
      },
      {
        "@type": "ItemList",
        "@id": "https://simonpastasartesanales.com.ar/#product-list",
        "name": "Catálogo Oficial de Pastas Artesanales & Sorrentinos",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Product",
              "name": "Sorrentinos de Jamón y Queso",
              "description": "Masa artesanal al huevo rellena con jamón cocido seleccionado y queso mozzarella cremoso. Presentación en caja de 12 unidades.",
              "image": "https://simonpastasartesanales.com.ar/logo.webp",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "ARS",
                "price": "4800",
                "availability": "https://schema.org/InStock",
                "url": "https://simonpastasartesanales.com.ar/productos/"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Product",
              "name": "Ravioles de Espinaca y Ricota",
              "description": "Ravioles caseros con espinaca fresca salteada y ricota magra de primera calidad. Presentación en caja de 48 unidades.",
              "image": "https://simonpastasartesanales.com.ar/logo.webp",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "ARS",
                "price": "4500",
                "availability": "https://schema.org/InStock",
                "url": "https://simonpastasartesanales.com.ar/productos/"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Product",
              "name": "Tallarines al Huevo",
              "description": "Pastas frescas al huevo cortadas en cinta mediana, elaboradas con sémola de trigo candeal. Bolsa de 500g.",
              "image": "https://simonpastasartesanales.com.ar/logo.webp",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "ARS",
                "price": "3200",
                "availability": "https://schema.org/InStock",
                "url": "https://simonpastasartesanales.com.ar/productos/"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Product",
              "name": "Ñoquis de Papa Artesanales del 29",
              "description": "Ñoquis suaves elaborados con papa natural seleccionada y harina de trigo. Bolsa de 1 kg.",
              "image": "https://simonpastasartesanales.com.ar/logo.webp",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "ARS",
                "price": "4200",
                "availability": "https://schema.org/InStock",
                "url": "https://simonpastasartesanales.com.ar/productos/"
              }
            }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://simonpastasartesanales.com.ar/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Dónde comprar sorrentinos y pastas artesanales en Bernal y Quilmes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fábrica de Pastas Simón elabora y distribuye pastas frescas congeladas en caja (sorrentinos de jamón y queso, bondiola, ravioles, ñoquis) en Bernal, Quilmes, Avellaneda y toda la Zona Sur."
            }
          },
          {
            "@type": "Question",
            "name": "¿Tienen venta mayorista de pastas para restaurantes y rotiserías?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, brindamos servicio mayorista directo a gastronómicos, restaurantes, cantinas y servicios de catering con porciones estandarizadas congeladas en caja y entregas programadas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo se cocinan los sorrentinos congelados en caja?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Se colocan directamente sin descongelar previa en abundante agua hirviendo con sal durante 7 a 9 minutos hasta que flotan en la superficie."
            }
          }
        ]
      }
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  // Generar dinámicamente links rel="alternate" para indexación multiidioma
  let finalAlternateLanguages = alternateLanguages;
  if (alternateLanguages.length === 0 && typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    const currentOrigin = window.location.origin;

    finalAlternateLanguages = LANGUAGES.map(l => {
      return {
        hreflang: l.code,
        href: `${currentOrigin}${currentPath}`
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
      <meta property="og:image:type" content={ogImage.endsWith(".webp") ? "image/webp" : ogImage.endsWith(".png") ? "image/png" : "image/jpeg"} />
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
