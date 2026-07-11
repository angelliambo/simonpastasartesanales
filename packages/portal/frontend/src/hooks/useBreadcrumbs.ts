import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../i18n/I18nProvider";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

export interface BreadcrumbItem {
  name: string;
  url: string;
  icon?: string;
}

// Configuración de rutas para breadcrumbs
const ROUTE_CONFIG: Record<
  string,
  { name: string; icon: string; parent?: string }
> = {
  dashboard: { name: "Dashboard", icon: "📊" },
  juegos: { name: "Juegos Educativos", icon: "🎮" },
  abcencastra: { name: "ABC Encastra", icon: "🔤", parent: "juegos" },
  "pizarra-magica": { name: "Pizarra Mágica", icon: "🖍️", parent: "juegos" },
  puzzle: { name: "Puzzle Interactivo", icon: "🧩", parent: "juegos" },
  rutinas: { name: "Juego de Rutinas", icon: "⏰", parent: "juegos" },
  emotions: { name: "Gestión de Emociones", icon: "😊", parent: "juegos" },
  memory: { name: "Juego de Memoria", icon: "🧠", parent: "juegos" },
  canciones: { name: "Canciones Infantiles", icon: "🎵" },
  acciones: { name: "Acciones y Comandos", icon: "🎯" },
  settings: { name: "Configuración", icon: "⚙️" },
  personalization: { name: "Personalización", icon: "🎨" },
  progress: { name: "Progreso", icon: "📈" },
  communication: { name: "Comunicación", icon: "💬" },
  accessibility: { name: "Accesibilidad", icon: "♿" },
  notifications: { name: "Notificaciones", icon: "🔔" },
};

export const useBreadcrumbs = () => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Siempre agregar "Inicio" como primer elemento
    breadcrumbItems.push({
      name: "Inicio",
      url: "/",
      icon: "🏠",
    });

    // Construir breadcrumbs basado en la ruta actual
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = ROUTE_CONFIG[segment];

      if (routeInfo) {
        breadcrumbItems.push({
          name: routeInfo.name,
          url: currentPath,
          icon: routeInfo.icon,
        });
      } else {
        // Si no hay configuración específica, usar el segmento como nombre
        breadcrumbItems.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          url: currentPath,
        });
      }
    });

    return breadcrumbItems;
  }, [location.pathname]);

  // Generar structured data para breadcrumbs
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${window.location.origin}${item.url}`,
      })),
    };
  }, [breadcrumbs]);

  return {
    breadcrumbs,
    structuredData,
    currentPage:
      breadcrumbs[breadcrumbs.length - 1]?.name || "Home",
  };
};

// Hook para obtener información SEO específica de la página actual
export const usePageSEO = () => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();
  const location = useLocation();
  const { t } = useTranslation();

  const seoData = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentSegment = pathSegments[pathSegments.length - 1] || "";

    // Mapear segmentos especiales a sus llaves de traducción correctas
    let pageKey = currentSegment;
    if (!pageKey) {
      pageKey = "home";
    } else if (pageKey === "terms" || pageKey === "terminos") {
      pageKey = "legal";
    } else if (pageKey === "privacy" || pageKey === "privacidad") {
      pageKey = "privacy";
    } else if (pageKey === "welcome") {
      pageKey = "wellcome";
    }

    const routeInfo = ROUTE_CONFIG[currentSegment];

    // Obtener valores traducidos
    const translatedTitle = t(`pages.${pageKey}.seoTitle`);
    const translatedDescription = t(`pages.${pageKey}.seoDescription`);
    const translatedKeywords = t(`pages.${pageKey}.seoKeywords`);

    const title = translatedTitle || (routeInfo ? `${routeInfo.name} | ${BRAND_CONFIG.siteName}` : BRAND_CONFIG.seoTitle);
    const description = translatedDescription || BRAND_CONFIG.seoDescription;
    const keywords = translatedKeywords
      ? translatedKeywords.split(",").map(k => k.trim())
      : (BRAND_CONFIG.seoKeywords ? BRAND_CONFIG.seoKeywords.split(",").map(k => k.trim()) : ["fabrica de pastas simon", "pastas artesanales", "pastas congeladas"]);

    return {
      title,
      description,
      keywords,
      canonicalUrl: `${window.location.origin}${location.pathname}`,
      ogImage: `/og-image.png`,
    };
  }, [location.pathname, currentPage, t]);

  return {
    ...seoData,
    breadcrumbs,
    currentPage,
  };
};
