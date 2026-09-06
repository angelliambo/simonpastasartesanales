import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { isUserEligibleForAds } from '@factory/shared/hooks/useAdEligibility';
import { GOOGLE_ADSENSE_CLIENT_ID, ADS_ENABLED } from '@factory/shared/config/ads';
import { trackAdImpression, trackAdBlocked } from '../../../services/analytics';
import { GoogleAdUnitProps } from './GoogleAdUnit.types';
import { AdWrapper, AdHeader, InsElement } from './GoogleAdUnit.styles';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const GoogleAdUnit: React.FC<GoogleAdUnitProps> = ({
  slot,
  format = 'auto',
  layout,
  responsive = true,
  style,
  className,
  label = 'Publicidad',
}) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  const isPlaceholderSlot = /^100000000\d$/.test(slot);

  const shouldShowAds =
    ADS_ENABLED &&
    isUserEligibleForAds({
      isAuthenticated,
      plan: user?.plan,
    });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !shouldShowAds) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [shouldShowAds]);

  useEffect(() => {
    if (!isVisible || adLoaded || !shouldShowAds) return;

    if (isPlaceholderSlot) {
      if (process.env.NODE_ENV === 'development') {
        console.info(`[AdSense] Slot ID de prueba (${slot}) omitido para evitar errores de SDK.`);
      }
      setAdLoaded(true);
      return;
    }

    try {
      const scriptId = 'google-adsense-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT_ID}`;
        script.crossOrigin = 'anonymous';
        script.onerror = () => {
          trackAdBlocked(slot, window.location.pathname);
        };
        document.head.appendChild(script);
      }

      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdLoaded(true);
      trackAdImpression(slot, window.location.pathname);
    } catch (err) {
      console.warn('[AdSense] Error inicializando unidad publicitaria:', err);
      trackAdBlocked(slot, window.location.pathname);
    }
  }, [isVisible, adLoaded, slot, shouldShowAds, isPlaceholderSlot]);

  if (!shouldShowAds) {
    return null;
  }

  return (
    <AdWrapper ref={containerRef} $responsive={responsive} style={style} className={className}>
      <AdHeader>
        <span>{label}</span>
      </AdHeader>
      <InsElement
        className="adsbygoogle"
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </AdWrapper>
  );
};

export default GoogleAdUnit;
