import styled from "styled-components";
import Text from "../../components/ui/atoms/Text";
import Button from "../../components/ui/atoms/Button";
import { Input } from "../../components/ui/atoms/Input";
import { Card } from "../../components/ui/atoms/Card";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 4px;
  background: ${({ theme }) => theme.gradients?.brand || "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledSubtitle = styled(Text)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0 0 2rem;
  display: block;
`;

export const CustomCard = styled(Card)`
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px !important;
  padding: 1.5rem !important;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:last-child { border-bottom: none; }
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.9rem;
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const CustomBadge = styled.span<{ $plan: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $plan }) =>
    $plan === "god_mode" ? "rgba(168, 85, 247, 0.2)" :
      $plan === "trial" ? "rgba(34, 197, 94, 0.2)" :
        $plan === "6_meses" || $plan === "1_ano" ? "rgba(59, 130, 246, 0.2)" :
          "rgba(100, 116, 139, 0.2)"};
  color: ${({ $plan, theme }) =>
    $plan === "god_mode" ? theme.colors.tertiary[400] :
      $plan === "trial" ? theme.colors.success[500] :
        $plan === "6_meses" || $plan === "1_ano" ? theme.colors.primary[400] :
          theme.colors.text.tertiary};
`;


export const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  padding: 4rem 0;
`;

export const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.error[500]};
  padding: 4rem 0;
`;

export const ActionButton = styled(Button)`
  width: 100%;
`;

export const UpgradeButtonWrapper = styled.div`
  margin-top: 16px;
`;

export const RedCardTitle = styled(Text)`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: #ef4444;
  display: block;
`;

export const RedSubtitle = styled(Text)`
  margin-bottom: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  display: block;
`;

export const DangerRequestButton = styled(Button)`
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: none;
  
  &:hover {
    background: rgba(239, 68, 68, 0.25);
  }
`;

export const DeleteMsgText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-bottom: 12px;
`;

export const DeleteConfirmInput = styled(Input)`
  margin-bottom: 12px;
  
  input {
    text-align: center;
    letter-spacing: 4px;
  }
`;

export const DeleteErrorText = styled.p`
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 8px;
`;

export const SuccessMsgText = styled.p`
  color: #22c55e;
  font-size: 14px;
`;
