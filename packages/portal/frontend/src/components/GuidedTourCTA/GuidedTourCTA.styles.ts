import styled, { keyframes, css } from "styled-components";

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(20, 184, 166, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
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
  z-index: ${({ theme }) => theme.zIndex.sticky};
  top: 75px;
  right: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 80px;
    right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const FloatingTourButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[500] : theme.colors.background.surface};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text.inverse : theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  backdrop-filter: blur(10px);
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${({ $isActive }) => ($isActive ? "none" : css`${pulseGlow} 2.5s infinite`)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.heavy};
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary[600] : theme.colors.background.tertiary};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TourIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.primary[500]};
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
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 2px;
  animation: ${waveAnimation} 0.8s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export const FloatingSpeechCard = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 130px;
  right: 68px;
  width: 380px;
  max-width: calc(100vw - 32px);
  background: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  backdrop-filter: blur(16px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)")};
  transition: opacity ${({ theme }) => theme.transitions.normal}, transform ${({ theme }) => theme.transitions.normal}, visibility ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const CardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StepCounterBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const CloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const CardBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SpeechTextContainer = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 60px;
  max-height: 120px;
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PlayControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ControlButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary[500] : theme.colors.background.secondary};
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.text.inverse : theme.colors.text.primary};
  border: 1px solid ${({ $primary, theme }) =>
    $primary ? theme.colors.primary[500] : theme.colors.border.light};

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
