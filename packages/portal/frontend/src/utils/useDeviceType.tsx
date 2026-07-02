// src/utils/useDeviceType.ts
import { useMemo, useState, useEffect } from "react";

interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useDeviceType = (): DeviceType => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deviceType = useMemo(() => {
    const { width, height } = windowSize;

    // Define rangos claros para cada tipo de dispositivo
    const mobileMaxWidth = 767; // hasta 767px es mobile
    const tabletMaxWidth = 1024; // hasta 1024px es tablet
    // desktop es mayor a tabletMaxWidth

    const isMobile = width <= mobileMaxWidth || height < 600;
    const isTablet = width > mobileMaxWidth && width <= tabletMaxWidth;
    const isDesktop = width > tabletMaxWidth;

    return { isMobile, isTablet, isDesktop };
  }, [windowSize]);

  return deviceType;
};
