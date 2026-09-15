import React from "react";

export type AdFormat = "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";

export interface AdSenseProps {
  /**
   * Google AdSense Client ID (ej. ca-pub-6167435415786243)
   */
  client?: string;
  /**
   * Google AdSense Ad Slot ID
   */
  slot?: string;
  /**
   * Formato del anuncio
   */
  format?: AdFormat;
  /**
   * Layout Key para anuncios In-feed o In-article
   */
  layoutKey?: string;
  /**
   * Indica si el anuncio es adaptativo / responsive
   */
  responsive?: boolean;
  /**
   * Altura mínima del contenedor para evitar Cumulative Layout Shift (CLS)
   */
  minHeight?: string;
  /**
   * Indica si debe usar IntersectionObserver para Lazy Loading
   */
  lazyLoad?: boolean;
  /**
   * Clase CSS opcional
   */
  className?: string;
  /**
   * Etiqueta / título accesible opcional sobre el anuncio
   */
  label?: string;
  /**
   * Modo de prueba explicito
   */
  testMode?: boolean;
}
