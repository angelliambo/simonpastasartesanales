import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "../services/analytics";

/**
 * Hook personalizado para inicializar Google Analytics (GA4) y realizar
 * el tracking automático de vistas de página (pageviews) ante cambios de ruta.
 */
export const usePageTracking = (): void => {
  const location = useLocation();

  // Inicializar GA4 al montar la aplicación
  useEffect(() => {
    initGA();
  }, []);

  // Trackear pageviews al cambiar de ruta
  useEffect(() => {
    // Un pequeño delay de 100ms permite que componentes como <SEO> o react-helmet
    // actualicen el document.title antes de que enviemos el evento a GA4.
    const timer = setTimeout(() => {
      trackPageView(location.pathname + location.search);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);
};
export default usePageTracking;
