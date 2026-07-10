import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SHOW_SOCIAL_LINKS, SOCIAL_X_URL, SOCIAL_INSTAGRAM_URL } from '@shared/config/urls';
import { BRAND_CONFIG } from '@factory/shared/config/brand';

export interface StructuredDataConfig {
  type: 'WebSite' | 'WebPage' | 'SoftwareApplication' | 'Organization' | 'BreadcrumbList' | 'FAQPage' | 'LocalBusiness' | 'PastasShop';
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  appData?: {
    platform?: string;
    operatingSystem?: string;
    applicationCategory?: string;
  };
}

export const useStructuredData = (config: StructuredDataConfig) => {
  const location = useLocation();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const structuredData = useMemo(() => {
    const currentUrl = `${baseUrl}${location.pathname}`;
    const currentDate = new Date().toISOString();

    switch (config.type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": config.name || BRAND_CONFIG.siteName,
          "description": config.description || "Comunicación en su punto máximo. Dictado por voz, texto a voz y herramientas de accesibilidad para la web.",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": BRAND_CONFIG.siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          }
        };

      case 'WebPage':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": config.name || BRAND_CONFIG.siteName,
          "description": config.description,
          "url": currentUrl,
          "datePublished": config.datePublished || currentDate,
          "dateModified": config.dateModified || currentDate,
          "author": {
            "@type": "Organization",
            "name": config.author || BRAND_CONFIG.siteName
          },
          "publisher": {
            "@type": "Organization",
            "name": BRAND_CONFIG.siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "mainEntity": {
            "@type": "Organization",
            "name": BRAND_CONFIG.siteName,
            "description": BRAND_CONFIG.seoDescription || "Estructura modular de alto rendimiento para tu negocio o startup con paneles de administración, facturación y soporte."
          }
        };

      case 'SoftwareApplication':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": config.name || `${BRAND_CONFIG.siteName} Portal`,
          "description": config.description || BRAND_CONFIG.seoDescription || "Estructura modular de alto rendimiento para tu negocio o startup con paneles de administración, facturación y soporte.",
          "url": currentUrl,
          "image": config.image || `${baseUrl}/og-image.png`,
          "applicationCategory": config.appData?.applicationCategory || "BusinessApplication",
          "operatingSystem": config.appData?.operatingSystem || "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Organization",
            "name": config.author || BRAND_CONFIG.siteName
          }
        };

      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": BRAND_CONFIG.siteName,
          "description": BRAND_CONFIG.seoDescription || "Plataforma SaaS premium modular con paneles de administración, facturación y soporte.",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "image": `${baseUrl}/og-image.png`,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "Spanish"
          },
          "sameAs": SHOW_SOCIAL_LINKS ? [SOCIAL_X_URL, SOCIAL_INSTAGRAM_URL] : []
        };

      case 'BreadcrumbList':
        if (!config.breadcrumbs) return null;
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": config.breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${baseUrl}${crumb.url}`
          }))
        };

      case 'FAQPage':
        if (!config.faqs) return null;
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": config.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      case 'LocalBusiness':
      case 'PastasShop':
        return {
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "FoodEstablishment", "WholesaleStore"],
          "@id": `${baseUrl}/#localbusiness`,
          "name": BRAND_CONFIG.siteName,
          "image": `${baseUrl}/assets/images/logo.png`,
          "description": BRAND_CONFIG.seoDescription,
          "url": baseUrl,
          "telephone": "+541141921222",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "San Luis 1263",
            "addressLocality": "Bernal",
            "addressRegion": "Provincia de Buenos Aires",
            "postalCode": "B1876",
            "addressCountry": "AR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -34.706110,
            "longitude": -58.281110
          },
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Bernal"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Quilmes"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Zona Sur"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Buenos Aires"
            }
          ],
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "08:00",
              "closes": "18:00"
            }
          ],
          "hasMenu": {
            "@type": "Menu",
            "name": "Catálogo de Pastas Congeladas",
            "hasMenuSection": [
              {
                "@type": "MenuSection",
                "name": "Pastas Rellenas Artesanales",
                "description": "Elaboradas con ingredientes seleccionados y congeladas en origen en prácticas cajas.",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Sorrentinos",
                    "description": "Pastas rellenas redondas de producción artesanal."
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Ravioles",
                    "description": "Clásicos ravioles caseros con rellenos seleccionados."
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Panzottis",
                    "description": "Pastas rellenas de formato premium y gran tamaño."
                  }
                ]
              },
              {
                "@type": "MenuSection",
                "name": "Especialidades Rellenas",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Empanadas de Bondiola",
                    "description": "Empanadas gourmet congeladas rellenas de bondiola desmechada."
                  }
                ]
              }
            ]
          }
        };

      default:
        return null;
    }
  }, [config, location.pathname, baseUrl]);

  return structuredData;
};

// Hook específico para páginas de la aplicación
export const useAppStructuredData = (appName: string, appDescription: string, appImage?: string) => {
  return useStructuredData({
    type: 'SoftwareApplication',
    name: appName,
    description: appDescription,
    image: appImage,
    appData: {
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Chrome'
    }
  });
};

// Hook específico para breadcrumbs
export const useBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return useStructuredData({
    type: 'BreadcrumbList',
    breadcrumbs
  });
};

// Hook específico para FAQ
export const useFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return useStructuredData({
    type: 'FAQPage',
    faqs
  });
};

// Hook específico para LocalBusiness (Pastas Simón)
export const useLocalBusinessStructuredData = () => {
  return useStructuredData({
    type: 'LocalBusiness'
  });
};

