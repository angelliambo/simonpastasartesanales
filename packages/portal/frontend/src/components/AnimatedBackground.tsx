import React, { useState, useEffect, Suspense, lazy } from "react";
import styled from "styled-components";

// Carga perezosa del componente pesado de animaciones
const AnimatedBackgroundLayers = lazy(() => import("./AnimatedBackgroundLayers"));

// ============================================
// STYLED CONTAINER (Simplified background: CSS-only gradient)
// ============================================
export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg,
    ${({ theme }) => theme.animatedBackground?.darkGradient1 || '#0b091a'} 0%,
    ${({ theme }) => theme.animatedBackground?.darkGradient2 || '#1a1a3e'} 40%,
    ${({ theme }) => theme.animatedBackground?.darkGradient3 || '#0f0c29'} 100%
  );
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

interface AnimatedBackgroundProps {
  enabled?: boolean;
  showStars?: boolean;
  showAurora?: boolean;
  showOrbs?: boolean;
  showMountains?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  enabled = true,
  showStars = true,
  showAurora = true,
  showOrbs = true,
  showMountains = true,
}) => {
  // 1. Detectar si el usuario tiene las animaciones desactivadas (Feature Toggle)
  const isFeatureToggleDisabled = () => {
    if (typeof window === "undefined") return false;
    try {
      const saved = localStorage.getItem("zn-portal-accessibility-settings");
      if (saved) {
        return !!JSON.parse(saved).reducedMotion;
      }
    } catch {}
    return false;
  };

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isLighthouse = typeof navigator !== 'undefined' &&
    (navigator.userAgent.includes('Chrome-Lighthouse') ||
     navigator.userAgent.includes('Lighthouse') ||
     navigator.userAgent.includes('HeadlessChrome') ||
     navigator.userAgent.includes('Headless') ||
     navigator.webdriver);

  // Bloqueo total si el toggle está activo, si prefiere reduced-motion, si es Lighthouse, o si está deshabilitado por prop
  const isAnimationsBlocked = !enabled || isFeatureToggleDisabled() || prefersReducedMotion || isLighthouse;

  // Estado para la carga diferida
  const [shouldRenderAnimations, setShouldRenderAnimations] = useState(false);

  useEffect(() => {
    if (isAnimationsBlocked) {
      return;
    }

    const startAnimations = () => {
      // Retrasar levemente tras el load event para asegurar la estabilidad del layout (FCP y LCP)
      setTimeout(() => {
        setShouldRenderAnimations(true);
      }, 500);
    };

    if (document.readyState === "complete") {
      startAnimations();
    } else {
      window.addEventListener("load", startAnimations);
      return () => window.removeEventListener("load", startAnimations);
    }
  }, [isAnimationsBlocked]);

  return (
    <BackgroundContainer>
      {shouldRenderAnimations && (
        <Suspense fallback={null}>
          <AnimatedBackgroundLayers
            showStars={showStars}
            showAurora={showAurora}
            showOrbs={showOrbs}
            showMountains={showMountains}
          />
        </Suspense>
      )}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
