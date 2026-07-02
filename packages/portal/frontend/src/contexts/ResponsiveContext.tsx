import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";

interface ResponsiveState {
  windowSize: {
    width: number;
    height: number;
  };
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface ResponsiveContextType extends ResponsiveState {
  // Métodos adicionales si se necesitan en el futuro
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

// Función helper para detectar el tipo de dispositivo de forma segura (SSR-safe)
const getInitialWindowSize = () => {
  if (typeof window === "undefined") {
    // SSR: retornar valores por defecto (desktop)
    return { width: 1024, height: 768 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Función helper para calcular breakpoints de forma consistente
const calculateBreakpoints = (width: number, height: number) => {
  const mobileMaxWidth = 767; // hasta 767px es mobile
  const tabletMaxWidth = 1024; // hasta 1024px es tablet
  
  const isMobile = width <= mobileMaxWidth || height < 600;
  const isTablet = width > mobileMaxWidth && width <= tabletMaxWidth;
  const isDesktop = width > tabletMaxWidth;
  
  return { isMobile, isTablet, isDesktop };
};

interface ResponsiveProviderProps {
  children: ReactNode;
}

/**
 * ResponsiveProvider - Provider unificado para detección responsive
 * 
 * Características:
 * - Valor inicial correcto basado en window.innerWidth (no hardcoded)
 * - Debounce en resize events para evitar re-renders excesivos
 * - Memoización para evitar re-renders innecesarios
 * - SSR-safe (funciona en server-side rendering)
 * - Un solo listener de resize compartido
 */
export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  // Estado inicial basado en window.innerWidth real (no hardcoded)
  const [windowSize, setWindowSize] = useState(getInitialWindowSize);
  
  // Calcular breakpoints de forma memoizada
  const breakpoints = useMemo(
    () => calculateBreakpoints(windowSize.width, windowSize.height),
    [windowSize.width, windowSize.height]
  );
  
  // Handler de resize con debounce
  const handleResize = useCallback(() => {
    // Usar requestAnimationFrame para sincronizar con el render
    requestAnimationFrame(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);
  
  // Efecto para agregar listener de resize con debounce
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === "undefined") {
      return;
    }
    
    // Debounce function
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150); // 150ms debounce
    };
    
    // Agregar listener
    window.addEventListener("resize", debouncedResize, { passive: true });
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleResize]);
  
  // Actualizar windowSize inicial después del mount (para asegurar valor correcto)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialSize = getInitialWindowSize();
      // Solo actualizar si es diferente (evitar re-render innecesario)
      if (
        initialSize.width !== windowSize.width ||
        initialSize.height !== windowSize.height
      ) {
        setWindowSize(initialSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez después del mount
  
  // Valor del contexto memoizado
  const contextValue = useMemo<ResponsiveContextType>(
    () => ({
      windowSize,
      ...breakpoints,
    }),
    [windowSize, breakpoints]
  );
  
  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
};

/**
 * Hook para usar el contexto responsive
 * 
 * @throws Error si se usa fuera del ResponsiveProvider
 */
export const useResponsiveContext = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  
  if (context === undefined) {
    throw new Error(
      "useResponsiveContext must be used within a ResponsiveProvider"
    );
  }
  
  return context;
};

