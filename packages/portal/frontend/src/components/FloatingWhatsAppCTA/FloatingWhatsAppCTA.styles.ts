import styled, { keyframes } from "styled-components";

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.3);
  }
  50% {
    opacity: 1;
    transform: translateY(-10px) scale(1.08);
  }
  70% {
    transform: translateY(5px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(37, 211, 102, 0), 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const FloatingCTAContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: ${props => props.theme.spacing.lg};
  left: ${props => props.theme.spacing.lg};
  z-index: 1050;
  display: ${props => (props.$isVisible ? "flex" : "none")};
  align-items: center;
  animation: ${bounceIn} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: ${props => props.theme.spacing.md};
    left: ${props => props.theme.spacing.md};
  }
`;

export const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: #ffffff;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 50px;
  text-decoration: none;
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  animation: ${pulseGlow} 2.5s infinite;
  transition: transform 0.25s ease, background 0.25s ease;
  user-select: none;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    background: linear-gradient(135deg, #28e16f 0%, #159e8e 100%);
    color: #ffffff;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSize.lg};
  line-height: 1;
`;

export const BadgeText = styled.span`
  white-space: nowrap;
  letter-spacing: 0.2px;
`;
