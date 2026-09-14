import styled from "styled-components";

export const MapWrapper = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.light};
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 350px;
    height: 600px;
    margin: 0 auto;
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
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: block;
`;

export const DefaultPin = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: #ffffff;
  padding: 8px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.medium};
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
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
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
  display: block;
  transition: transform 0.5s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: auto;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 100%;
    object-fit: cover;
  }
  
  ${StaticMapLink}:hover & {
    transform: scale(1.03);
  }
`;



