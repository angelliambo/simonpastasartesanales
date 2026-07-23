export interface MapProps {
  $address?: string;
  $latitude?: number;
  $longitude?: number;
  $zoom?: number;
  $provider?: 'google-iframe' | 'leaflet' | 'google-js' | 'static-image';
  $markerIconUrl?: string;
  $apiKey?: string;
  $mapId?: string;
  $mapImageUrl?: string;
  $mapMobileImageUrl?: string;
  $mapLinkUrl?: string;
  className?: string;
}
