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

export const Value = styled.span<{ $isMonospace?: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
  ${({ $isMonospace }) => $isMonospace && `font-family: monospace;`}
`;

export const CustomBadge = styled.span<{ $plan: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
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

export const DangerRequestButton = styled(Button)<{ $isSemiOpaque?: boolean }>`
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  ${({ $isSemiOpaque }) => $isSemiOpaque && `opacity: 0.5;`}
  
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

// Nuevos componentes de estilos del dashboard para eliminar inline-styles
export const StatusTextWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const ActiveStatusIconWrapper = styled.span`
  color: #22c55e;
  display: inline-flex;
`;

export const InactiveStatusIconWrapper = styled.span`
  color: #ef4444;
  display: inline-flex;
`;

export const NoTicketsMessage = styled.div`
  color: rgba(255, 255, 255, 0.4);
  padding: 1rem 0;
`;

export const ActionLink = styled.span<{ $fontSize?: string }>`
  color: #818cf8;
  cursor: pointer;
  text-decoration: underline;
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize};`}
`;

export const TicketsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const TicketListItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

export const TicketInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const TicketHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TicketIdText = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
  color: #818cf8;
`;

export const NewResponseBadge = styled.span`
  background: #10b981;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const TicketSubjectText = styled.span<{ $unread: boolean }>`
  font-weight: ${({ $unread }) => ($unread ? 700 : 500)};
  font-size: 0.95rem;
`;

export const TicketDateText = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
`;

export const TicketStatusBadge = styled.span<{ $status: string }>`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  background: ${({ $status }) => $status === "open" ? "rgba(59, 130, 246, 0.15)" : $status === "in_progress" ? "rgba(245, 158, 11, 0.15)" : "rgba(107, 114, 128, 0.15)"};
  color: ${({ $status }) => $status === "open" ? "#60a5fa" : $status === "in_progress" ? "#fbbf24" : "#9ca3af"};
  border: 1px solid ${({ $status }) => $status === "open" ? "rgba(59, 130, 246, 0.25)" : $status === "in_progress" ? "rgba(245, 158, 11, 0.25)" : "rgba(107, 114, 128, 0.25)"};
`;

export const FooterAlignWrapper = styled.div`
  text-align: right;
  margin-top: 0.5rem;
`;
