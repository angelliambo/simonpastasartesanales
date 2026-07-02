import styled from "styled-components";
import Button from "../../components/ui/atoms/Button";
import { Card } from "../../components/ui/atoms/Card";
import Text from "../../components/ui/atoms/Text";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 4px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledSubtitle = styled(Text)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0 0 1.5rem;
  display: block;
`;

export const CustomCard = styled(Card)`
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px !important;
  overflow: visible !important;
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
`;



export const StatsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const StatBox = styled.div`
  flex: 1;
  min-width: 120px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.25rem 1rem;
  text-align: center;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

export const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: 4px;
`;

export const TableContainer = styled.div`
  overflow: visible;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.01);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.8rem;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.8rem 0.6rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.02);
`;

export const ThSortable = styled(Th)`
  cursor: pointer;
  user-select: none;
  &:hover { color: ${({ theme }) => theme.colors.text.primary}; }
`;

export const Td = styled.td`
  padding: 0.8rem 0.6rem;
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: middle;
`;

export const Tr = styled.tr`
  transition: background-color 0.15s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export const DeleteBtn = styled(Button)`
  padding: 4px 10px;
`;

export const CreateForm = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0;
  align-items: center;
  max-width: 400px;
  width: 100%;
`;

export const CreateBtn = styled(Button)`
  padding: 0.65rem 1.25rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: center;
`;

export const FilterBtn = styled(Button)`
  padding: 8px 14px;
`;

export const PlanBadge = styled.span<{ $plan: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
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

export const Msg = styled.div<{ $type: "success" | "error" }>`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1rem;
  background: ${({ $type }) => $type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  border: 1px solid ${({ $type }) => $type === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"};
  color: ${({ $type, theme }) => $type === "success" ? theme.colors.success[500] : theme.colors.error[500]};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 13px;
`;

export const PagInfo = styled.span`
  color: rgba(255,255,255,0.6);
`;

export const PagTotal = styled.span`
  color: rgba(255,255,255,0.4);
  font-size: 11px;
`;

export const MonospaceText = styled.span`
  font-family: monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  font-size: 11px;
  margin-left: 4px;
`;

export const EmailContainer = styled.span`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  text-decoration: underline dotted;
  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.05)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.1)" : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.text.primary : theme.colors.text.tertiary)};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: rgba(20, 20, 25, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  box-sizing: border-box;
  animation: slideUp 0.2s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const ModalTitle = styled.h3`
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
`;

export const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const ModalLabel = styled.label`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.75rem;
  color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #818cf8;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
`;
