import React, { useEffect, useRef, useState } from "react";
import { AdSenseProps } from "./AdSense.types";
import { AdContainer, AdLabel, StyledIns } from "./AdSense.styles";
import { GOOGLE_ADSENSE_CLIENT_ID } from "../../../config/ads";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const DEFAULT_CLIENT_ID = GOOGLE_ADSENSE_CLIENT_ID;
const KNOWN_PLACEHOLDER_SLOTS = new Set([
  "1000000001",
  "0000000000",
  "1234567890",
  "1000000000",
  "test",
  "placeholder",
  "demo",
  "0",
]);

/**
 * Normaliza el Publisher/Client ID asegurando el prefijo ca-pub-
 */
function normalizeClientId(rawClient?: string): string {
  const envClient = process?.env?.VITE_GOOGLE_ADSENSE_CLIENT_ID || process?.env?.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID || rawClient || DEFAULT_CLIENT_ID;
  if (!envClient) return "";

  const trimmed = envClient.trim();
  if (trimmed.startsWith("ca-pub-")) {
    return trimmed;
  }
  if (trimmed.startsWith("pub-")) {
    return `ca-${trimmed}`;
  }
  return `ca-pub-${trimmed}`;
}

/**
 * Valida si un slot ID es válido y no un ID de prueba/placeholder
 */
function isValidSlot(slot?: string): boolean {
  if (!slot) return true;
  const trimmed = slot.trim();
  if (KNOWN_PLACEHOLDER_SLOTS.has(trimmed.toLowerCase())) {
    return false;
  }
  return /^\d{5,}$/.test(trimmed);
}

export const AdSense: React.FC<AdSenseProps> = ({
  client,
  slot,
  format = "auto",
  layoutKey,
  responsive = true,
  minHeight = "90px",
  lazyLoad = true,
  className,
  label = "Publicidad",
  testMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(!lazyLoad);
  const isPushedRef = useRef<boolean>(false);

  const effectiveClient = normalizeClientId(client);
  const isSlotValid = isValidSlot(slot);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const scriptId = "google-adsense-sdk-script";
    if (!document.getElementById(scriptId) && effectiveClient) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${effectiveClient}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [effectiveClient]);

  useEffect(() => {
    if (!lazyLoad) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazyLoad]);

  useEffect(() => {
    if (!isVisible || isPushedRef.current) return;
    if (!isSlotValid || testMode) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isPushedRef.current = true;
      }
    } catch {
      // Capturar silenciosamente bloqueadores de red
    }
  }, [isVisible, isSlotValid, testMode]);

  if (!isSlotValid || !effectiveClient || effectiveClient === "ca-pub-") {
    return null;
  }

  return (
    <AdContainer ref={containerRef} $minHeight={minHeight} className={className}>
      {label && <AdLabel>{label}</AdLabel>}
      {isVisible && (
        <StyledIns
          className="adsbygoogle"
          $responsive={responsive}
          data-ad-client={effectiveClient}
          {...(slot ? { "data-ad-slot": slot } : {})}
          {...(format ? { "data-ad-format": format } : {})}
          {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
          {...(responsive ? { "data-full-width-responsive": "true" } : {})}
        />
      )}
    </AdContainer>
  );
};

export const GoogleAdUnit = AdSense;
