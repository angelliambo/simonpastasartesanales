import React, { useEffect, useRef } from "react";
import { MapProps } from "./Map.types";
import { useResponsive } from "../../hooks/useResponsive";
import { 
  MapWrapper, 
  StyledIframe, 
  LeafletContainer,
  CustomPinImage,
  DefaultPin,
  MapErrorFallback,
  StaticMapLink,
  StaticMapImage
} from "./Map.styles";

export const Map: React.FC<MapProps> = ({
  $address = "Obelisco, Av. 9 de Julio s/n, C1043 Buenos Aires, Argentina",
  $latitude = -34.6037389,
  $longitude = -58.3815704,
  $zoom = 15,
  $provider = "static-image",
  $markerIconUrl,
  $apiKey,
  $mapId = "DEMO_MAP_ID",
  $mapImageUrl = "/assets/images/map.webp",
  $mapMobileImageUrl = "/assets/images/map-mobile.webp",
  $mapLinkUrl = "https://www.google.com/maps/search/?api=1&query=-34.6037389,-58.3815704",
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<any>(null);
  const { isMobile } = useResponsive();

  const finalImageUrl = isMobile && $mapMobileImageUrl ? $mapMobileImageUrl : $mapImageUrl;

  useEffect(() => {
    if ($provider !== "leaflet" || !mapRef.current) return;

    let isMounted = true;

    const initLeaflet = async () => {
      try {
        const L = await import("leaflet");
        
        try {
          require("leaflet/dist/leaflet.css");
        } catch (cssErr) {
          console.warn("Leaflet CSS could not be loaded via require, ensure it is imported in the application.");
        }

        if (!isMounted || !mapRef.current) return;

        if (leafletMapInstance.current) {
          leafletMapInstance.current.remove();
        }

        const map = L.map(mapRef.current).setView([$latitude, $longitude], $zoom);
        leafletMapInstance.current = map;

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        const iconUrl = $markerIconUrl || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
        const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

        const customIcon = L.icon({
          iconUrl,
          shadowUrl,
          iconSize: $markerIconUrl ? [40, 40] : [25, 41],
          iconAnchor: $markerIconUrl ? [20, 40] : [12, 41],
          popupAnchor: $markerIconUrl ? [0, -40] : [1, -34],
          shadowSize: [41, 41],
        });

        const marker = L.marker([$latitude, $longitude], { icon: customIcon }).addTo(map);
        
        if ($address) {
          marker.bindPopup(`<b>${$address}</b>`).openPopup();
        }
      } catch (err) {
        console.error("Error al inicializar Leaflet Map:", err);
      }
    };

    initLeaflet();

    return () => {
      isMounted = false;
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [$provider, $latitude, $longitude, $zoom, $markerIconUrl, $address]);

  // Si el proveedor es una imagen estática (100% gratis de por vida e ilimitado)
  if ($provider === "static-image") {
    return (
      <MapWrapper className={className}>
        <StaticMapLink href={$mapLinkUrl} target="_blank" rel="noopener noreferrer">
          <StaticMapImage src={finalImageUrl} alt={$address} loading="lazy" />
        </StaticMapLink>
      </MapWrapper>
    );
  }

  // Si el proveedor es Leaflet
  if ($provider === "leaflet") {
    return (
      <MapWrapper className={className}>
        <LeafletContainer ref={mapRef} />
      </MapWrapper>
    );
  }

  // Si el proveedor es Google Maps JS API (caer al iframe estándar para optimizar dependencias)
  if ($provider === "google-js") {
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
      $address
    )}&t=&z=${$zoom}&ie=UTF8&iwloc=&output=embed`;

    return (
      <MapWrapper className={className}>
        <StyledIframe
          title="Ubicación"
          src={embedUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </MapWrapper>
    );
  }

  // Google Maps Iframe por defecto (antiguo)
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    $address
  )}&t=&z=${$zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <MapWrapper className={className}>
      <StyledIframe
        title="Ubicación"
        src={embedUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </MapWrapper>
  );
};

export type { MapProps };
export default Map;
