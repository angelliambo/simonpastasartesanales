import styled, { keyframes, css } from "styled-components";

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.4);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(229, 9, 20, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(229, 9, 20, 0);
  }
`;

const waveAnimation = keyframes`
  0%, 100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
`;

export const FloatingTourContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex?.sticky || 999};
  top: 75px;
  right: ${({ theme }) => theme.spacing?.md || "16px"};

  @media (min-width: ${({ theme }) => theme.breakpoints?.md || "769px"}) {
    top: 85px;
    right: ${({ theme }) => theme.spacing?.lg || "24px"};
  }
`;

export const FloatingTourButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.sm || "10px"};
  padding: ${({ theme }) => theme.spacing?.xs || "8px"} ${({ theme }) => theme.spacing?.md || "16px"};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors?.primary?.[500] || "#2D323B" : theme.colors?.background?.surface || "#1E232A"};
  color: #FFFFFF;
  border: 1px solid ${({ theme }) => theme.colors?.border?.light || "rgba(255, 255, 255, 0.22)"};
  border-radius: ${({ theme }) => theme.borderRadius?.xl || "30px"};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm || "0.88rem"};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows?.medium || "0 6px 20px rgba(0, 0, 0, 0.35)"};
  backdrop-filter: blur(12px);
  transition: all ${({ theme }) => theme.transitions?.normal || "0.3s ease"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows?.heavy || "0 8px 24px rgba(0, 0, 0, 0.45)"};
    border-color: rgba(229, 9, 20, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TourIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography?.fontSize?.md || "1.15rem"};
  color: #E50914;
  flex-shrink: 0;
  min-width: 20px;
`;

export const TourBadgeLabel = styled.span`
  letter-spacing: 0.2px;
  white-space: nowrap;
  color: #FFFFFF;
`;

export const AudioWavesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 14px;
`;

export const AudioWaveBar = styled.div<{ $delay: number }>`
  width: 3px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors?.primary?.[500] || "#E50914"};
  border-radius: 2px;
  animation: ${waveAnimation} 0.8s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export const FloatingSpeechCard = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex?.modal || 1000};
  top: 130px;
  right: 24px;
  width: 380px;
  max-width: calc(100vw - 32px);
  background: ${({ theme }) => theme.colors?.background?.card || theme.colors?.background?.surface};
  color: ${({ theme }) => theme.colors?.text?.primary};
  border: 1px solid ${({ theme }) => theme.colors?.border?.light || theme.colors?.border?.normal};
  border-radius: ${({ theme }) => theme.borderRadius?.xl || "16px"};
  padding: ${({ theme }) => theme.spacing?.md};
  box-shadow: ${({ theme }) => theme.shadows?.heavy};
  backdrop-filter: blur(16px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)")};
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints?.md || "768px"}) {
    display: none;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing?.xs};
  margin-bottom: ${({ theme }) => theme.spacing?.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border?.light};
  padding-bottom: ${({ theme }) => theme.spacing?.xs};
`;

export const CardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs};
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm || "0.88rem"};
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary?.[600] || theme.colors?.primary?.[500]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StepCounterBadge = styled.span`
  font-size: ${({ theme }) => theme.typography?.fontSize?.xs || "0.75rem"};
  font-weight: 600;
  background: ${({ theme }) => theme.colors?.primary?.[50] || theme.colors?.background?.secondary};
  color: ${({ theme }) => theme.colors?.primary?.[700] || theme.colors?.text?.secondary};
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.border?.light};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const CloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors?.text?.secondary};
  font-size: ${({ theme }) => theme.typography?.fontSize?.md || "1.1rem"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.text?.primary};
    background: ${({ theme }) => theme.colors?.background?.tertiary || "rgba(0, 0, 0, 0.05)"};
  }
`;

export const CardBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing?.sm};
`;

export const SpeechTextContainer = styled.p`
  margin: ${({ theme }) => theme.spacing?.xs} 0 0 0;
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm || "0.88rem"};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors?.text?.primary};
  min-height: 60px;
  max-height: 120px;
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints?.md || "769px"}) {
    font-size: ${({ theme }) => theme.typography?.fontSize?.md || "0.9rem"};
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing?.xs};
`;

export const PlayControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing?.xs};
`;

export const ControlButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.typography?.fontSize?.xs || "0.82rem"};
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors?.primary?.[500] : theme.colors?.background?.surface};
  color: ${({ $primary, theme }) =>
    $primary ? "#FFFFFF" : theme.colors?.text?.primary};
  border: 1px solid ${({ $primary, theme }) =>
    $primary ? theme.colors?.primary?.[500] : theme.colors?.border?.light};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TourWhatsAppWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing?.xs};
`;
