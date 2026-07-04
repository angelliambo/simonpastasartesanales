import styled, { keyframes } from "styled-components";
import Card from '@design-sys/atoms/Card';
import Button from '@design-sys/atoms/Button';
import { ZnIcon } from "@design-sys/atoms/ZnIcon";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
`;

export const WelcomeCard = styled(Card)`
  width: 100%;
  max-width: 700px;
  background: ${({ theme }) =>
    theme.colors.background.primary === "#ffffff"
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(15, 23, 42, 0.98)"
  };
  border: 1px solid ${({ theme }) => theme.effects.glassBorder};
  box-shadow: ${({ theme }) => theme.effects.glassShadow};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.glass});
  border-radius: 20px;
  padding: 40px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const WelcomeHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const Logo = styled.img`
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 8px 0;

  span {
    background: ${({ theme }) => theme.gradients?.brand || "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const StepsProgress = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.border.normal};
    z-index: 0;
    transform: translateY(-50%);
  }
`;

export const ProgressLine = styled.div<{ $progress: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: ${({ $progress }) => $progress}%;
  height: 2px;
  background: ${({ theme }) => theme.gradients.brand};
  z-index: 0;
  transform: translateY(-50%);
  transition: width 0.3s ease;
`;

export const StepDot = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, $active, $completed }) =>
    $active || $completed ? theme.colors.primary[500] : theme.colors.background.secondary};
  border: 2px solid
    ${({ theme, $active, $completed }) =>
      $active || $completed ? "transparent" : theme.colors.border.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, $active, $completed }) =>
    $active || $completed ? "#fff" : theme.colors.text.tertiary};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  ${({ theme, $active }) =>
    $active &&
    `
    box-shadow: 0 0 0 4px ${theme.highlight.glow};
    transform: scale(1.1);
  `}
`;

export const StepLabel = styled.span<{ $active: boolean }>`
  position: absolute;
  top: 36px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ theme, $active }) => ($active ? theme.colors.text.primary : theme.colors.text.tertiary)};
`;

export const StepContent = styled.div`
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  position: relative;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  background: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 15px;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  margin: 24px 0;
  max-width: 500px;
`;

export const CheckboxInput = styled.input`
  margin-top: 4px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

export const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 8px 0;
`;

export const FeatureDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;

    button {
      width: 100%;
    }
  }
`;

export const ActionButton = styled(Button)`
  min-width: 120px;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
  margin-top: 10px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  margin-bottom: 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
    opacity: 0.6;
  }
`;

export const FormMessage = styled.p<{ $error?: boolean }>`
  font-size: 13px;
  color: ${({ $error }) => ($error ? "#ef4444" : "#10b981")};
  margin: 8px 0 0 0;
  text-align: center;
  line-height: 1.4;
`;

export const FormButton = styled(Button)`
  width: 100%;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 12px;
`;

export const ToggleLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: color 0.2s;
  padding: 4px 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;

export const InfoAlertText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 16px 0;
  line-height: 1.5;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 12px;
  max-width: 500px;
`;

export const WelcomeCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

export const LanguageSelectorWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LanguageSelectorLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Divider = styled.hr`
  width: 100%;
  max-width: 450px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light || "rgba(255, 255, 255, 0.1)"};
  margin: 10px 0;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const StatusTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.success?.[500] || "#10b981"};
`;

export const StatusDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  text-align: center;
  max-width: 400px;
  margin: 0;
  line-height: 1.5;
`;

export const PendingTermsDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 14px;
  text-align: center;
  max-width: 400px;
  margin: 0;
  line-height: 1.5;
`;

export const AuthDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  text-align: center;
  margin: 0 0 16px 0;
  max-width: 450px;
  line-height: 1.6;
`;

export const AuthButtonsWrapper = styled.div<{ $termsAccepted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 280px;
  opacity: ${({ $termsAccepted }) => ($termsAccepted ? 1 : 0.5)};
  pointer-events: ${({ $termsAccepted }) => ($termsAccepted ? "auto" : "none")};
  transition: all 0.3s ease;
`;

export const GoogleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ManualLoginTrigger = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FormLoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FormInstructionText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  margin: 0 0 12px 0;
  text-align: center;
`;

export const TermsWarningText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error?.[500] || "#ef4444"};
  margin-top: 12px;
`;

export const GlobalIcon = styled(ZnIcon)`
  margin-right: 6px;
`;

export const StatusIcon = styled(ZnIcon)``;

export const StartIcon = styled(ZnIcon)`
  margin-left: 6px;
`;

export const KeyIcon = styled(ZnIcon)`
  margin-right: 6px;
`;


