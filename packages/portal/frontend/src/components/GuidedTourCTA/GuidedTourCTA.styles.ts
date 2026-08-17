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
  z-index: 999;
  top: 75px;
  right: 16px;

  @media (min-width: 769px) {
    top: 85px;
    right: 24px;
  }
`;

export const FloatingTourButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: 8px 16px;
  background: ${props => (props.$isActive ? props.theme.colors.primary[600] : props.theme.colors.background.card)};
  color: ${props => (props.$isActive ? "#FFFFFF" : props.theme.colors.text.primary)};
  border: 1px solid ${props => (props.$isActive ? props.theme.colors.primary[500] : props.theme.colors.border.normal)};
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.medium};
  backdrop-filter: blur(10px);
  transition: all ${props => props.theme.transitions.normal};
  animation: ${props => (props.$isActive ? "none" : css`${pulseGlow} 2.5s infinite`)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
    background: ${props => (props.$isActive ? props.theme.colors.primary[700] : props.theme.colors.background.cardHover)};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TourIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary[500]};
`;

export const TourBadgeLabel = styled.span`
  letter-spacing: 0.2px;
  white-space: nowrap;
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
  background-color: ${props => props.theme.colors.primary[500]};
  border-radius: 2px;
  animation: ${waveAnimation} 0.8s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

export const FloatingSpeechCard = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 130px;
  right: 24px;
  width: 380px;
  max-width: calc(100vw - 32px);
  background: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.large};
  backdrop-filter: blur(16px);
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? "visible" : "hidden")};
  transform: ${props => (props.$isOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)")};
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
  border-bottom: 1px solid ${props => props.theme.colors.border.light};
  padding-bottom: ${props => props.theme.spacing.xs};
`;

export const CardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary[600]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StepCounterBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primary[200]};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const CloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
    background: ${props => props.theme.colors.background.cardHover};
  }
`;

export const CardBody = styled.div`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const SpeechTextContainer = styled.p`
  margin: ${props => props.theme.spacing.xs} 0 0 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text.primary};
  min-height: 60px;
  max-height: 120px;
  overflow-y: auto;

  @media (min-width: 769px) {
    font-size: 0.9rem;
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.xs};
`;

export const PlayControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

export const ControlButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => (props.$primary ? props.theme.colors.primary[500] : props.theme.colors.background.card)};
  color: ${props => (props.$primary ? "#FFFFFF" : props.theme.colors.text.primary)};
  border: 1px solid ${props => (props.$primary ? props.theme.colors.primary[500] : props.theme.colors.border.normal)};

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
  margin-top: ${props => props.theme.spacing.xs};
`;
