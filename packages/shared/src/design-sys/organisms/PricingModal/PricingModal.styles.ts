import styled from 'styled-components';

export const Wrapper = styled.div`
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 0 4px;
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<{ $popular?: boolean }>`
  background: ${({ theme }) => theme.effects.glassBackground};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  border: 1px solid ${({ $popular, theme }) =>
    $popular ? theme.colors.tertiary[400] + '80' : theme.effects.glassBorder};
  border-radius: 1.5rem;
  padding: ${({ theme }) => theme.spacing.lg} 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.normal} ${({ theme }) => theme.animations.easing.spring};
  transform: ${({ $popular }) => ($popular ? 'scale(1.04)' : 'none')};
  z-index: ${({ $popular }) => ($popular ? 1 : 0)};

  &:hover {
    transform: ${({ $popular }) => ($popular ? 'scale(1.06)' : 'translateY(-4px)')};
    border-color: ${({ $popular, theme }) =>
      $popular ? theme.colors.tertiary[300] : theme.colors.primary[400] + '66'};
    box-shadow: 0 16px 32px -12px rgba(0, 0, 0, 0.5);
  }
`;

export const PopularBadge = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.gradients.premium};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.effects.glow.premium};
`;

export const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const PlanIcon = styled.span`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.background.tertiary}33;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const PlanName = styled.div`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlanPrice = styled.div`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0 12px;
  letter-spacing: -0.02em;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FeatureItem = styled.li`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.success[500]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: 0.9rem;
    flex-shrink: 0;
  }
`;

export const FeatureBlocked = styled.li`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.neutral[600]};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '✕';
    color: ${({ theme }) => theme.colors.error[500]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: 0.9rem;
    flex-shrink: 0;
  }
`;
