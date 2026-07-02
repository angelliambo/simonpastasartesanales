import { useEffect } from "react";

function useResetZoomOnPinch(delay: number = 300): void {
  useEffect(() => {
    let lastScale: number = 1;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleTouchMove = (event: TouchEvent): void => {
      const scale = (event as any).scale as number | undefined;

      if (scale && scale !== 1) {
        if (lastScale !== 1) return;
        lastScale = scale;

        // Limpiamos timeout previo si existe para evitar resets múltiples
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Aplicamos la transición suave
        document.body.style.transition = "transform 0.4s ease";

        // Esperamos el delay antes de reiniciar el zoom
        timeoutId = setTimeout(() => {
          document.body.style.transform = "scale(1)";

          // Después de la transición, limpiamos estilos para evitar efectos secundarios
          setTimeout(() => {
            document.body.style.transform = "";
            document.body.style.transition = "";
            lastScale = 1;
            timeoutId = null;
          }, 400); // debe coincidir con la duración de la transición
        }, delay);

        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.transform = "";
      document.body.style.transition = "";
    };
  }, [delay]);
}

export default useResetZoomOnPinch;
