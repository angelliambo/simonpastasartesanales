import styled from "styled-components";

export const MapWrapper = styled.div`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.light};
  background-color: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border || 'rgba(0, 0, 0, 0.1)'};
  aspect-ratio: 16 / 9;
  
  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
  }
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

export const LeafletContainer = styled.div`
  width: 100%;
  height: 100%;
  
  .leaflet-container {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

export const CustomPinImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: ${props => props.theme.shadows?.medium || '0 2px 8px rgba(0,0,0,0.3)'};
  display: block;
`;

export const DefaultPin = styled.div`
  background-color: ${props => props.theme.colors?.primary?.[600] || '#4f46e5'};
  color: #ffffff;
  padding: 8px;
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadows?.medium || '0 2px 6px rgba(0,0,0,0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const MapErrorFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: ${props => props.theme.colors?.background?.secondary || 'rgba(0,0,0,0.05)'};
  color: ${props => props.theme.colors?.text?.secondary || '#6b7280'};
  font-family: ${props => props.theme.typography?.fontFamily?.primary || 'inherit'};
  font-size: 14px;
`;

export const StaticMapLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  &::after {
    content: "Ver en Google Maps ↗";
    position: absolute;
    bottom: 16px;
    right: 16px;
    background-color: rgba(0, 0, 0, 0.75);
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-family: inherit;
    font-weight: 500;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }
  
  &:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StaticMapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
  
  ${StaticMapLink}:hover & {
    transform: scale(1.03);
  }
`;


